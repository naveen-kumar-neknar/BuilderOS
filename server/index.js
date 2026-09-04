import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import crypto from 'node:crypto';
import { MongoClient } from 'mongodb';
import { TECHNOLOGY_REGISTRY } from './registry.js';
import { 
  chatCompletion, 
  troubleshootInstallation, 
  getFeatherlessStatus 
} from './featherlessService.js';

const app = express();
const PORT = Number(process.env.PORT || 4000);
const AGENT_URL = process.env.HACKWAVE_AGENT_URL || 'http://127.0.0.1:7331';
app.use(cors());
app.use(express.json({ limit: '64kb' }));

let db = null;
let mongoClient = null;
if (process.env.MONGODB_URI) {
  try {
    mongoClient = new MongoClient(process.env.MONGODB_URI);
    await mongoClient.connect();
    db = mongoClient.db(process.env.MONGODB_DB || 'hackwave');
    await db.collection('technologies').createIndex({ slug: 1 }, { unique: true });
    await db.collection('technologies').bulkWrite(
      TECHNOLOGY_REGISTRY.map(t => ({ updateOne: { filter: { slug: t.slug }, update: { $set: t }, upsert: true } }))
    );
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    await db.collection('sessions').createIndex({ token: 1 }, { unique: true });
    console.log('MongoDB connected and technology registry synchronized.');
  } catch (e) {
    console.warn('MongoDB unavailable; using registry & memory fallback:', e.message);
  }
}

// In-memory fallback stores when MongoDB is not connected
const inMemoryUsers = new Map();
const inMemorySessions = new Map();
const inMemoryActivity = [];

// Helper to hash password using Node crypto
function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return { hash, salt };
}

function verifyPassword(password, hash, salt) {
  const check = crypto.scryptSync(password, salt, 64).toString('hex');
  return check === hash;
}

// Seed a default developer account in memory
const demoSalt = 'hackwave-salt-2026';
const demoHash = crypto.scryptSync('hackwave2026', demoSalt, 64).toString('hex');
inMemoryUsers.set('demo@hackwave.dev', {
  id: 'usr_demo_1',
  name: 'Developer',
  email: 'demo@hackwave.dev',
  passwordHash: demoHash,
  salt: demoSalt,
  createdAt: new Date('2026-01-01').toISOString()
});

const registryMap = new Map(TECHNOLOGY_REGISTRY.map(t => [t.slug, t]));
const publicTech = t => ({ ...t, commands: undefined, verify: undefined });

// ==========================================
// HEALTH CHECK
// ==========================================
app.get('/api/health', async (_req, res) => {
  let agent = false;
  try {
    const r = await fetch(`${AGENT_URL}/health`);
    agent = r.ok;
  } catch {}
  res.json({
    ok: true,
    mongo: Boolean(db),
    agent,
    platform: process.platform,
    featherless: getFeatherlessStatus()
  });
});

// ==========================================
// AUTHENTICATION ENDPOINTS
// ==========================================
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required.' });
  }
  const cleanEmail = email.trim().toLowerCase();
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters.' });
  }

  const { hash, salt } = hashPassword(password);
  const userId = `usr_${crypto.randomUUID().slice(0, 8)}`;
  const newUser = {
    id: userId,
    name: name.trim(),
    email: cleanEmail,
    createdAt: new Date().toISOString()
  };

  if (db) {
    try {
      const existing = await db.collection('users').findOne({ email: cleanEmail });
      if (existing) return res.status(409).json({ error: 'An account with this email already exists.' });
      await db.collection('users').insertOne({ ...newUser, passwordHash: hash, salt });
      const token = `hw_${crypto.randomBytes(32).toString('hex')}`;
      await db.collection('sessions').insertOne({ token, userId, createdAt: new Date() });
      return res.status(201).json({ ok: true, token, user: newUser });
    } catch (e) {
      return res.status(500).json({ error: 'Database error creating account.', detail: e.message });
    }
  }

  // Memory fallback
  if (inMemoryUsers.has(cleanEmail)) {
    return res.status(409).json({ error: 'An account with this email already exists.' });
  }
  inMemoryUsers.set(cleanEmail, { ...newUser, passwordHash: hash, salt });
  const token = `hw_${crypto.randomBytes(32).toString('hex')}`;
  inMemorySessions.set(token, { userId, email: cleanEmail, createdAt: new Date() });
  res.status(201).json({ ok: true, token, user: newUser });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }
  const cleanEmail = email.trim().toLowerCase();

  if (db) {
    try {
      const user = await db.collection('users').findOne({ email: cleanEmail });
      if (!user || !verifyPassword(password, user.passwordHash, user.salt)) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }
      const token = `hw_${crypto.randomBytes(32).toString('hex')}`;
      await db.collection('sessions').insertOne({ token, userId: user.id, createdAt: new Date() });
      const safeUser = { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt };
      return res.json({ ok: true, token, user: safeUser });
    } catch {
      return res.status(500).json({ error: 'Database error during login.' });
    }
  }

  // Memory fallback
  const user = inMemoryUsers.get(cleanEmail);
  if (!user || !verifyPassword(password, user.passwordHash, user.salt)) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }
  const token = `hw_${crypto.randomBytes(32).toString('hex')}`;
  inMemorySessions.set(token, { userId: user.id, email: user.email, createdAt: new Date() });
  const safeUser = { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt };
  res.json({ ok: true, token, user: safeUser });
});

app.get('/api/auth/me', async (req, res) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  if (!token) return res.status(401).json({ error: 'Authentication required.' });

  if (db) {
    try {
      const session = await db.collection('sessions').findOne({ token });
      if (!session) return res.status(401).json({ error: 'Session expired or invalid.' });
      const user = await db.collection('users').findOne({ id: session.userId });
      if (!user) return res.status(401).json({ error: 'User not found.' });
      return res.json({ ok: true, user: { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt } });
    } catch {
      return res.status(500).json({ error: 'Database error validating session.' });
    }
  }

  // Memory fallback
  const session = inMemorySessions.get(token);
  if (!session) return res.status(401).json({ error: 'Session expired or invalid.' });
  const user = inMemoryUsers.get(session.email);
  if (!user) return res.status(401).json({ error: 'User not found.' });
  res.json({ ok: true, user: { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt } });
});

app.post('/api/auth/logout', async (req, res) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  if (token) {
    if (db) {
      try { await db.collection('sessions').deleteOne({ token }); } catch {}
    } else {
      inMemorySessions.delete(token);
    }
  }
  res.json({ ok: true, message: 'Logged out successfully.' });
});

app.post('/api/auth/forgot-password', (req, res) => {
  const { email } = req.body || {};
  if (!email) return res.status(400).json({ error: 'Email is required.' });
  const resetToken = crypto.randomUUID();
  res.json({
    ok: true,
    message: 'If an account exists with this email, password reset instructions have been generated.',
    resetToken
  });
});

app.post('/api/auth/reset-password', async (req, res) => {
  const { token, newPassword } = req.body || {};
  if (!token || !newPassword || newPassword.length < 6) {
    return res.status(400).json({ error: 'Valid token and new password (min 6 characters) are required.' });
  }
  res.json({ ok: true, message: 'Password has been updated. You can now log in.' });
});

// ==========================================
// TECHNOLOGIES & DETECTION
// ==========================================
app.get('/api/technologies', async (_req, res) => {
  if (db) {
    try {
      const docs = await db.collection('technologies').find({}).project({ commands: 0, verify: 0 }).toArray();
      return res.json({ technologies: docs });
    } catch {}
  }
  res.json({ technologies: TECHNOLOGY_REGISTRY.map(publicTech) });
});

app.get('/api/technologies/:slug', async (req, res) => {
  const t = registryMap.get(req.params.slug);
  if (!t) return res.status(404).json({ error: 'Technology not supported' });
  let detection = { installed: false, version: null };
  try {
    const r = await fetch(`${AGENT_URL}/detect/${encodeURIComponent(t.slug)}`);
    if (r.ok) detection = await r.json();
  } catch {}
  res.json({ technology: publicTech(t), detection });
});

// ==========================================
// INSTALLATION & JOBS
// ==========================================
app.post('/api/install', async (req, res) => {
  const { slug, upgrade } = req.body || {};
  const tech = registryMap.get(slug);
  if (!tech) return res.status(400).json({ error: 'Technology is not in the trusted installation registry.' });
  try {
    const r = await fetch(`${AGENT_URL}/install`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ slug, upgrade: Boolean(upgrade) })
    });
    const data = await r.json();
    if (!r.ok) return res.status(r.status).json(data);

    const logEntry = {
      slug,
      name: tech.name,
      version: tech.version,
      status: upgrade ? 'updating' : 'installing',
      jobId: data.id,
      createdAt: new Date().toISOString()
    };

    if (db) {
      await db.collection('installation_history').insertOne(logEntry);
    } else {
      inMemoryActivity.unshift(logEntry);
    }

    res.status(202).json(data);
  } catch {
    res.status(503).json({ error: 'HackWave Local Installer is not running. Start it with: npm run agent' });
  }
});

app.get('/api/install/:jobId', async (req, res) => {
  try {
    const r = await fetch(`${AGENT_URL}/jobs/${encodeURIComponent(req.params.jobId)}`);
    const data = await r.json();
    if (['completed', 'error'].includes(data.status)) {
      if (db) {
        await db.collection('installation_history').updateOne(
          { jobId: data.id },
          { $set: { status: data.status, finishedAt: new Date().toISOString(), error: data.error || null } }
        );
      } else {
        const item = inMemoryActivity.find(x => x.jobId === data.id);
        if (item) {
          item.status = data.status;
          item.finishedAt = new Date().toISOString();
          item.error = data.error || null;
        }
      }
    }
    res.status(r.status).json(data);
  } catch {
    res.status(503).json({ error: 'Local installer unavailable' });
  }
});

// ==========================================
// ACTIVITY TIMELINE
// ==========================================
app.get('/api/activity', async (_req, res) => {
  if (db) {
    try {
      const history = await db.collection('installation_history').find({}).sort({ createdAt: -1 }).limit(50).toArray();
      return res.json({ history });
    } catch {}
  }
  res.json({ history: inMemoryActivity });
});

// ==========================================
// FEATHERLESS AI & LEATHER.AI ENDPOINTS
// ==========================================
app.get('/api/ai/status', (_req, res) => {
  res.json(getFeatherlessStatus());
});

app.post('/api/ai/chat', async (req, res) => {
  try {
    const { messages, context, apiKey } = req.body || {};
    const result = await chatCompletion({ messages, context, apiKey });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/ai/troubleshoot', async (req, res) => {
  try {
    const { slug, error, logs, os } = req.body || {};
    const result = await troubleshootInstallation({ slug, error, logs, os });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Preserved Leather.ai fallback
app.post('/api/ai/assist', async (req, res) => {
  const key = process.env.LEATHER_AI_API_KEY;
  const endpoint = process.env.LEATHER_AI_API_URL;
  if (!key || !endpoint) return res.status(503).json({ error: 'Leather.ai integration is not configured. Set LEATHER_AI_API_KEY and LEATHER_AI_API_URL on the server.' });
  try {
    const upstream = await fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'authorization': `Bearer ${key}` },
      body: JSON.stringify(req.body || {})
    });
    const text = await upstream.text();
    res.status(upstream.status).type(upstream.headers.get('content-type') || 'application/json').send(text);
  } catch (e) {
    res.status(502).json({ error: 'Leather.ai request failed', detail: e.message });
  }
});

app.listen(PORT, () => console.log(`HackWave API listening on http://localhost:${PORT}`));

process.on('SIGTERM', async () => {
  if (mongoClient) await mongoClient.close();
  process.exit(0);
});
