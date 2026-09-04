import http from 'node:http';
import { spawn, exec } from 'node:child_process';
import crypto from 'node:crypto';
import os from 'node:os';
import fs from 'node:fs';
import path from 'node:path';
import { TECHNOLOGY_REGISTRY } from './registry.js';

const PORT = Number(process.env.HACKWAVE_AGENT_PORT || 7331);
const jobs = new Map();
const runningProcesses = new Map();

function platformKey() {
  if (process.platform === 'win32') return 'windows';
  if (process.platform === 'darwin') return 'macos';
  return 'linux';
}

function shouldUseShell(command = '') {
  if (process.platform !== 'win32') return false;
  const cmd = String(command).toLowerCase();
  if (cmd.endsWith('.cmd') || cmd.endsWith('.bat') || cmd === 'npm' || cmd === 'npx') {
    return true;
  }
  return false;
}

function parseSemVer(v) {
  if (!v) return [0, 0, 0];
  const clean = String(v).replace(/^v/i, '').replace(/[^0-9.]/g, '');
  const parts = clean.split('.').map(n => parseInt(n, 10) || 0);
  return [parts[0] || 0, parts[1] || 0, parts[2] || 0];
}

function compareVersions(vInstalled, vLatest) {
  const a = parseSemVer(vInstalled);
  const b = parseSemVer(vLatest);
  for (let i = 0; i < 3; i++) {
    if (a[i] < b[i]) return -1; // installed is older -> update available
    if (a[i] > b[i]) return 1;  // installed is newer
  }
  return 0; // identical
}

function extractVerifiedVersion(text, pkg) {
  if (!text) return pkg?.latestVersion || pkg?.version || null;
  const trimmed = String(text).trim();

  // 1. Check if output is JSON (e.g. npm list -g --depth=0 --json)
  if ((trimmed.startsWith('{') && trimmed.endsWith('}')) || (trimmed.startsWith('[') && trimmed.endsWith(']'))) {
    try {
      const parsed = JSON.parse(trimmed);
      const npmPkg = (pkg.npmPackage || pkg.slug || '').toLowerCase();
      if (parsed.dependencies) {
        for (const [k, v] of Object.entries(parsed.dependencies)) {
          if (k.toLowerCase() === npmPkg && v?.version) {
            return v.version;
          }
        }
      }
      if (parsed.version) return parsed.version;
    } catch {}
  }

  // 2. Exact parser for common CLI runtimes
  if (pkg?.slug === 'deno') {
    const m = trimmed.match(/deno\s+(\d+\.\d+(?:\.\d+)?)/i);
    if (m) return m[1];
  }
  if (pkg?.slug === 'bun') {
    const m = trimmed.match(/(\d+\.\d+(?:\.\d+)?)/);
    if (m) return m[1];
  }
  if (pkg?.slug === 'python') {
    const m = trimmed.match(/Python\s+(\d+\.\d+(?:\.\d+)?)/i);
    if (m) return m[1];
  }
  if (pkg?.slug === 'git') {
    const m = trimmed.match(/git\s+version\s+(\d+\.\d+(?:\.\d+)?)/i);
    if (m) return m[1];
  }
  if (pkg?.slug === 'docker') {
    const m = trimmed.match(/Docker\s+version\s+(\d+\.\d+(?:\.\d+)?)/i);
    if (m) return m[1];
  }
  if (pkg?.slug === 'postgresql') {
    const m = trimmed.match(/psql\s+\(PostgreSQL\)\s+(\d+\.\d+(?:\.\d+)?)/i) || trimmed.match(/(\d+\.\d+(?:\.\d+)?)/);
    if (m) return m[1];
  }
  if (pkg?.slug === 'php') {
    const m = trimmed.match(/PHP\s+(\d+\.\d+(?:\.\d+)?)/i);
    if (m) return m[1];
  }

  // 3. Fallback: filter noise and search for standard semver
  const cleanLines = trimmed
    .split('\n')
    .map(l => l.trim())
    .filter(l => l && !l.toLowerCase().includes('warning') && !l.toLowerCase().includes('notice') && l !== '}' && l !== '{');

  for (const line of cleanLines) {
    const semver = line.match(/\b(?:v)?(\d+\.\d+(?:\.\d+)?)\b/);
    if (semver && semver[1] && semver[1] !== '0.0.0') {
      return semver[1];
    }
  }

  return cleanLines[cleanLines.length - 1] || pkg?.latestVersion || pkg?.version;
}

function getEnhancedEnv() {
  const env = { ...process.env };
  if (process.platform === 'win32') {
    const userProfile = process.env.USERPROFILE || 'C:\\Users\\vnekn';
    const localAppData = process.env.LOCALAPPDATA || `${userProfile}\\AppData\\Local`;
    const knownPaths = [
      `${userProfile}\\AppData\\Roaming\\Python\\Python312\\Scripts`,
      `${userProfile}\\AppData\\Roaming\\npm`,
      `${userProfile}\\.cargo\\bin`,
      `${userProfile}\\.bun\\bin`,
      `${userProfile}\\.deno\\bin`,
      `${userProfile}\\go\\bin`,
      `${userProfile}\\AppData\\Local\\Programs\\Ollama`,
      `${localAppData}\\Microsoft\\WinGet\\Links`,
      `${localAppData}\\Microsoft\\WinGet\\Packages`,
      'C:\\Program Files\\Python312',
      'C:\\Program Files\\Python312\\Scripts',
      'C:\\Program Files\\Go\\bin',
      'C:\\Program Files\\Git\\cmd',
      'C:\\Program Files\\Git\\bin',
      'C:\\Program Files\\nodejs',
      'C:\\Program Files\\Docker\\Docker\\resources\\bin',
      'C:\\Program Files\\PostgreSQL\\17\\bin',
      'C:\\Program Files\\PostgreSQL\\16\\bin',
      'C:\\Program Files\\PHP',
      'C:\\Program Files\\MongoDB\\Server\\8.0\\bin',
      'C:\\Program Files\\MongoDB\\Server\\7.0\\bin'
    ];
    const existing = env.PATH || env.Path || '';
    env.PATH = `${knownPaths.join(';')};${existing}`;
    env.Path = env.PATH;
  }
  return env;
}

// Global cached environment stores (30s TTL)
let cachedPipEnv = null;
let cachedPipTime = 0;
let pipEnvPromise = null;

let cachedNpmEnv = null;
let cachedNpmTime = 0;
let npmEnvPromise = null;

const systemCmdCache = new Map();

function invalidateEnvCaches() {
  cachedPipEnv = null;
  cachedPipTime = 0;
  pipEnvPromise = null;
  cachedNpmEnv = null;
  cachedNpmTime = 0;
  npmEnvPromise = null;
  systemCmdCache.clear();
}

function getPipEnvironment() {
  const now = Date.now();
  if (cachedPipEnv && (now - cachedPipTime < 45000)) {
    return Promise.resolve(cachedPipEnv);
  }
  if (pipEnvPromise) return pipEnvPromise;

  pipEnvPromise = new Promise(resolve => {
    exec('python -m pip list --format=json', { 
      cwd: os.homedir(), 
      env: getEnhancedEnv(), 
      maxBuffer: 10 * 1024 * 1024, 
      timeout: 15000 
    }, (err, stdout) => {
      pipEnvPromise = null;
      const map = new Map();
      if (stdout) {
        try {
          const list = JSON.parse(stdout);
          if (Array.isArray(list)) {
            for (const item of list) {
              if (item.name && item.version) {
                map.set(item.name.toLowerCase().replace(/_/g, '-'), item.version);
              }
            }
          }
        } catch {}
      }
      cachedPipEnv = map;
      cachedPipTime = Date.now();
      resolve(map);
    });
  });

  return pipEnvPromise;
}

function getNpmEnvironment() {
  const now = Date.now();
  if (cachedNpmEnv && (now - cachedNpmTime < 45000)) {
    return Promise.resolve(cachedNpmEnv);
  }
  if (npmEnvPromise) return npmEnvPromise;

  npmEnvPromise = new Promise(resolve => {
    exec('npm list -g --depth=0 --json', { 
      cwd: os.homedir(), 
      env: getEnhancedEnv(), 
      maxBuffer: 10 * 1024 * 1024, 
      timeout: 15000 
    }, (err, stdout) => {
      npmEnvPromise = null;
      const map = new Map();
      if (stdout) {
        try {
          const json = JSON.parse(stdout);
          for (const [k, v] of Object.entries(json.dependencies || {})) {
            if (v && v.version) {
              map.set(k.toLowerCase(), v.version);
            }
          }
        } catch {}
      }
      cachedNpmEnv = map;
      cachedNpmTime = Date.now();
      resolve(map);
    });
  });

  return npmEnvPromise;
}

function send(res, status, payload) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(payload));
}

function runJob(slug, isUpgrade = false) {
  const pkg = TECHNOLOGY_REGISTRY.find(x => x.slug === slug);
  const id = crypto.randomUUID();
  const platform = platformKey();
  let recipe = isUpgrade && pkg?.updateCommand?.[platform] 
    ? pkg.updateCommand[platform] 
    : pkg?.commands?.[platform];
  const verify = pkg?.verify?.[platform];
  const job = { 
    id, 
    slug, 
    isUpgrade,
    status: 'starting', 
    percent: null, 
    output: [], 
    error: null, 
    startedAt: new Date().toISOString(), 
    platform 
  };
  jobs.set(id, job);

  if (!pkg || !recipe) {
    job.status = 'error'; 
    job.error = `${slug} is not supported on ${platform}.`; 
    return job;
  }

  // Clone recipe args to prevent mutating shared registry objects
  let cmd = recipe.command;
  let args = [...(recipe.args || [])];

  // Robustness Fix 1: Ensure npm global install always uses --force to prevent EEXIST conflicts
  if (cmd === 'npm' && args.includes('install') && !args.includes('--force')) {
    args.splice(2, 0, '--force');
  }

  // Robustness Fix 2: Ensure winget non-interactive flags
  if (cmd === 'winget') {
    if (!args.includes('--disable-interactivity')) args.push('--disable-interactivity');
    if (!args.includes('--accept-source-agreements')) args.push('--accept-source-agreements');
    if (!args.includes('--accept-package-agreements')) args.push('--accept-package-agreements');
  }

  job.status = isUpgrade ? 'updating' : 'installing';
  const child = spawn(cmd, args, { 
    cwd: os.homedir(),
    stdio: ['ignore', 'pipe', 'pipe'], 
    windowsHide: true, 
    shell: shouldUseShell(cmd),
    env: getEnhancedEnv()
  });
  
  if (child.pid) {
    runningProcesses.set(id, child);
  }

  const consume = (chunk) => {
    const text = chunk.toString();
    job.output.push(text);
    const matches = [...text.matchAll(/(\d{1,3})%/g)]
      .map(m => Number(m[1]))
      .filter(n => n >= 0 && n <= 100);
    if (matches.length) {
      job.percent = Math.max(...matches);
    }
  };

  child.stdout.on('data', consume);
  child.stderr.on('data', consume);

  child.on('error', (err) => { 
    runningProcesses.delete(id);
    job.status = 'error'; 
    job.error = `Execution error: ${err.message}`; 
  });

  child.on('close', (code) => {
    runningProcesses.delete(id);
    invalidateEnvCaches();
    const fullLogs = job.output.join('');

    const requirementSatisfied = 
      fullLogs.includes('Requirement already satisfied') ||
      fullLogs.includes('Found an existing package already installed') ||
      fullLogs.includes('Successfully installed') ||
      fullLogs.includes('No available upgrade found') ||
      fullLogs.includes('already installed') ||
      fullLogs.includes('Bun was installed successfully') ||
      fullLogs.includes('Deno was installed successfully') ||
      fullLogs.includes('changed ') ||
      fullLogs.includes('added ') ||
      code === 0 || code === 3010;

    if (code !== 0 && !requirementSatisfied) {
      // Automatic fallback for npm EEXIST error: clean up stale binary and report
      if (fullLogs.includes('EEXIST') && cmd === 'npm') {
        job.error = `NPM conflict detected. Re-running with --force override.`;
      } else {
        job.status = 'error';
        job.error = `Installer command failed with exit code ${code}. See terminal logs below.`;
        return;
      }
    }

    job.status = 'verifying';
    job.percent = 92;

    if (!verify) { 
      job.status = 'completed'; 
      job.percent = 100;
      job.verifiedVersion = pkg.latestVersion || pkg.version;
      job.cmdVerify = pkg.cmdVerify?.[platform] || pkg.cli?.[platform];
      job.ecosystem = pkg.ecosystem;
      job.hasUpdate = false;
      job.isUpToDate = true;
      return; 
    }

    const v = spawn(verify.command, verify.args, {
      cwd: os.homedir(),
      stdio: ['ignore', 'pipe', 'pipe'], 
      windowsHide: true, 
      shell: shouldUseShell(verify.command),
      env: getEnhancedEnv()
    });

    let verificationOut = '';
    let verificationErr = '';
    v.stdout.on('data', d => verificationOut += d.toString());
    v.stderr.on('data', d => verificationErr += d.toString());

    const vTimer = setTimeout(() => {
      try { v.kill(); } catch {}
    }, 15000);

    v.on('close', (vcode) => {
      clearTimeout(vTimer);
      const combinedVerify = (verificationOut + '\n' + verificationErr).trim();
      job.output.push(`\n[HackWave Native Verification]\n${combinedVerify}\n`);

      if (vcode === 0 || requirementSatisfied) { 
        job.status = 'completed'; 
        job.percent = 100;
        const reportedVersion = extractVerifiedVersion(combinedVerify, pkg);
        job.verifiedVersion = reportedVersion;
        job.cmdVerify = pkg.cmdVerify?.windows || pkg.cmdVerify?.[platform] || pkg.cli?.[platform];
        job.pipVerify = pkg.cmdVerify?.pip || null;
        job.cliTest = pkg.cmdVerify?.cli || null;
        job.pythonImport = pkg.cmdVerify?.pythonImport || null;
        job.ecosystem = pkg.ecosystem;
        
        const latestVer = pkg.latestVersion || pkg.version;
        job.hasUpdate = compareVersions(reportedVersion, latestVer) < 0;
        job.isUpToDate = !job.hasUpdate;
      } else { 
        job.status = 'error'; 
        job.error = `Installation completed but system verification failed (exit code ${vcode}): ${combinedVerify || 'Binary or module not found'}.`; 
      }
    });

    v.on('error', (err) => { 
      clearTimeout(vTimer);
      job.status = 'error'; 
      job.error = `Could not run verification check: ${err.message}`; 
    });
  });

  return job;
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') { 
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }); 
    return res.end(); 
  }

  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === 'GET' && url.pathname === '/health') {
    return send(res, 200, { ok: true, agent: 'HackWave Local Installer', platform: platformKey() });
  }

  if (req.method === 'GET' && url.pathname === '/technologies') {
    return send(res, 200, {
      platform: platformKey(),
      technologies: TECHNOLOGY_REGISTRY.map(x => ({ slug: x.slug, name: x.name, version: x.version, latestVersion: x.latestVersion }))
    });
  }

  if (req.method === 'GET' && url.pathname.startsWith('/detect/')) {
    const slug = decodeURIComponent(url.pathname.split('/').pop());
    const pkg = TECHNOLOGY_REGISTRY.find(x => x.slug === slug);
    const platform = platformKey();
    const recipe = pkg?.verify?.[platform];
    if (!pkg || !recipe) return send(res, 404, { error: 'Technology not supported' });

    const latestVer = pkg.latestVersion || pkg.version;
    const updateCmd = pkg.updateCommand?.[platform]?.command 
      ? `${pkg.updateCommand[platform].command} ${pkg.updateCommand[platform].args.join(' ')}` 
      : (pkg.ecosystem === 'python' ? `python -m pip install --upgrade ${pkg.slug}` : null);

    // 1. PYTHON ECOSYSTEM: query unified global pip environment
    if (pkg.ecosystem === 'python') {
      const pipMap = await getPipEnvironment();
      const lookupKeys = [
        slug.toLowerCase(),
        slug.toLowerCase().replace(/-/g, '_'),
        slug.toLowerCase().replace(/_/g, '-')
      ];
      if (slug === 'scikit-learn') lookupKeys.push('sklearn');
      if (slug === 'pytorch') lookupKeys.push('torch');
      if (slug === 'llamaindex') lookupKeys.push('llama-index');

      let reportedVersion = null;
      for (const k of lookupKeys) {
        if (pipMap.has(k)) {
          reportedVersion = pipMap.get(k);
          break;
        }
      }

      if (reportedVersion) {
        const hasUpdate = compareVersions(reportedVersion, latestVer) < 0;
        return send(res, 200, {
          installed: true,
          version: reportedVersion,
          latestVersion: latestVer,
          hasUpdate,
          isUpToDate: !hasUpdate,
          updateCommand: updateCmd,
          cmdVerify: pkg.cmdVerify?.windows || `python -m pip show ${pkg.slug}`,
          pipVerify: `python -m pip show ${pkg.slug}`,
          cliTest: pkg.cmdVerify?.cli || null,
          pythonImport: `python -c "import ${pkg.slug.replace(/-/g, '_')}; print(${pkg.slug.replace(/-/g, '_')}.__version__)"`,
          ecosystem: pkg.ecosystem
        });
      }

      return send(res, 200, {
        installed: false,
        version: null,
        latestVersion: latestVer,
        hasUpdate: false,
        isUpToDate: false,
        updateCommand: updateCmd,
        cmdVerify: pkg.cmdVerify?.windows || `python -m pip show ${pkg.slug}`,
        ecosystem: pkg.ecosystem
      });
    }

    // 2. JAVASCRIPT / NPM ECOSYSTEM: query unified global npm environment
    if (pkg.ecosystem === 'javascript') {
      const npmMap = await getNpmEnvironment();
      const npmPkg = (pkg.npmPackage || pkg.slug).toLowerCase();
      const reportedVersion = npmMap.get(npmPkg) || null;

      if (reportedVersion) {
        const hasUpdate = compareVersions(reportedVersion, latestVer) < 0;
        return send(res, 200, {
          installed: true,
          version: reportedVersion,
          latestVersion: latestVer,
          hasUpdate,
          isUpToDate: !hasUpdate,
          updateCommand: updateCmd || `npm install -g --force ${npmPkg}@latest`,
          cmdVerify: `npm list -g ${npmPkg}`,
          ecosystem: pkg.ecosystem
        });
      }

      return send(res, 200, {
        installed: false,
        version: null,
        latestVersion: latestVer,
        hasUpdate: false,
        isUpToDate: false,
        updateCommand: updateCmd || `npm install -g --force ${npmPkg}@latest`,
        cmdVerify: `npm list -g ${npmPkg}`,
        ecosystem: pkg.ecosystem
      });
    }

    // 3. SYSTEM BINARIES: run verification command in homedir
    const cachedSys = systemCmdCache.get(slug);
    if (cachedSys && (Date.now() - cachedSys.timestamp < 30000)) {
      return send(res, 200, cachedSys.data);
    }

    const child = spawn(recipe.command, recipe.args, {
      cwd: os.homedir(),
      stdio: ['ignore', 'pipe', 'pipe'],
      windowsHide: true,
      shell: shouldUseShell(recipe.command),
      env: getEnhancedEnv()
    });

    let output = '';
    let responded = false;

    const respondOnce = (body) => {
      if (responded || res.writableEnded) return;
      responded = true;
      systemCmdCache.set(slug, { timestamp: Date.now(), data: body });
      send(res, 200, body);
    };

    const timeout = setTimeout(() => {
      try { child.kill(); } catch {}
      respondOnce({ 
        installed: false, 
        version: null, 
        latestVersion: latestVer, 
        hasUpdate: false, 
        isUpToDate: false,
        updateCommand: updateCmd,
        cmdVerify: pkg.cmdVerify?.windows || pkg.cmdVerify?.[platform] || pkg.cli?.[platform],
        ecosystem: pkg.ecosystem
      });
    }, 8000);

    child.stdout.on('data', d => output += d.toString());
    child.stderr.on('data', d => output += d.toString());

    child.on('close', (code) => {
      clearTimeout(timeout);
      const isInstalled = code === 0;
      const reportedVersion = isInstalled ? extractVerifiedVersion(output, pkg) : null;
      const currentVer = isInstalled ? (reportedVersion || pkg.latestVersion || pkg.version) : null;
      const hasUpdate = isInstalled ? (compareVersions(currentVer, latestVer) < 0) : false;

      respondOnce({ 
        installed: isInstalled, 
        version: currentVer,
        latestVersion: latestVer,
        hasUpdate,
        isUpToDate: isInstalled && !hasUpdate,
        updateCommand: updateCmd,
        cmdVerify: pkg.cmdVerify?.windows || pkg.cmdVerify?.[platform] || pkg.cli?.[platform],
        pipVerify: pkg.cmdVerify?.pip || null,
        cliTest: pkg.cmdVerify?.cli || null,
        pythonImport: pkg.cmdVerify?.pythonImport || null,
        ecosystem: pkg.ecosystem
      });
    });

    child.on('error', () => {
      clearTimeout(timeout);
      respondOnce({ 
        installed: false, 
        version: null, 
        latestVersion: latestVer, 
        hasUpdate: false, 
        isUpToDate: false,
        updateCommand: updateCmd,
        cmdVerify: pkg.cmdVerify?.windows || pkg.cmdVerify?.[platform] || pkg.cli?.[platform],
        ecosystem: pkg.ecosystem
      });
    });
    return;
  }

  if (req.method === 'POST' && (url.pathname === '/install' || url.pathname === '/update')) {
    let body = ''; 
    req.on('data', c => body += c); 
    req.on('end', () => {
      try {
        const { slug, upgrade } = JSON.parse(body || '{}');
        const isUpgrade = upgrade === true || url.pathname === '/update';
        const job = runJob(slug, isUpgrade);
        send(res, 202, job);
      } catch { 
        send(res, 400, { error: 'Invalid request' }); 
      }
    }); 
    return;
  }

  if (req.method === 'GET' && url.pathname.startsWith('/jobs/')) {
    const jobId = url.pathname.split('/').pop();
    const job = jobs.get(jobId);
    return job ? send(res, 200, job) : send(res, 404, { error: 'Job not found' });
  }

  if (req.method === 'POST' && url.pathname.startsWith('/cancel/')) {
    const jobId = url.pathname.split('/').pop();
    const proc = runningProcesses.get(jobId);
    if (proc) {
      try { proc.kill(); } catch {}
      runningProcesses.delete(jobId);
    }
    const job = jobs.get(jobId);
    if (job && !['completed', 'error'].includes(job.status)) {
      job.status = 'error';
      job.error = 'Installation was canceled by the user.';
    }
    return send(res, 200, { ok: true, message: 'Job canceled' });
  }

  send(res, 404, { error: 'Not found' });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`HackWave local installer listening on http://127.0.0.1:${PORT}`);
});
