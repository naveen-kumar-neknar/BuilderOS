import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Zap, 
  Copy, 
  Check, 
  CheckCircle2,
  ArrowRight,
  Terminal,
  RefreshCw,
  ArrowUpCircle
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function TechnologyDetail({ 
  technologies = [], 
  detectedInstalls = {}, 
  onInstallTech 
}) {
  const { slug } = useParams();
  const { showToast } = useToast();
  const [copiedKey, setCopiedKey] = useState(null);

  const tech = technologies.find((t) => t.slug === slug);
  const detection = detectedInstalls[slug] || {};
  const isInstalled = Boolean(detection.installed);
  const installedVersion = detection.version;

  // Find related technologies in same ecosystem or category
  const relatedTechs = technologies
    .filter((t) => t.slug !== slug && (t.ecosystem === tech?.ecosystem || t.category === tech?.category))
    .slice(0, 3);

  if (!tech) {
    return (
      <div>
        <Link to="/explore" className="btn btn-ghost btn-sm" style={{ marginBottom: 20 }}>
          <ArrowLeft size={14} /> Back to Explore
        </Link>
        <div style={{ padding: 48, textAlign: 'center', backgroundColor: '#FFFFFF', border: '1px solid var(--border-default)', borderRadius: 12 }}>
          <h2>Technology not found</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>
            The requested technology "{slug}" is not currently in the HackWave registry.
          </p>
        </div>
      </div>
    );
  }

  const handleCopy = (key, text) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showToast('Command copied to clipboard', 'info');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div>
      <Link to="/explore" className="btn btn-ghost btn-sm" style={{ marginBottom: 20 }}>
        <ArrowLeft size={14} /> Back to Explore
      </Link>

      {/* Main Detail Header Card */}
      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-default)', borderRadius: 12, padding: 32, marginBottom: 24, boxShadow: 'var(--shadow-xs)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em' }}>{tech.name}</h1>
              {tech.verified && (
                <span className="badge badge-verified">
                  <ShieldCheck size={13} /> Verified
                </span>
              )}
            </div>
            <p style={{ fontSize: 16, color: 'var(--text-secondary)', maxWidth: 640, lineHeight: 1.5 }}>
              {tech.description}
            </p>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            {detection?.hasUpdate ? (
              <button
                type="button"
                className="btn btn-primary btn-lg"
                style={{ backgroundColor: '#0F172A', color: '#FFFFFF' }}
                onClick={() => onInstallTech?.({ ...tech, isUpgrade: true, latestVersion: detection.latestVersion || tech.latestVersion })}
              >
                <RefreshCw size={16} />
                Update to v{detection.latestVersion || tech.latestVersion || tech.version}
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={() => onInstallTech?.(tech)}
              >
                <Zap size={16} />
                {isInstalled ? 'Reinstall' : `Install ${tech.name}`}
              </button>
            )}
          </div>
        </div>

        {/* Status & Pricing Strip */}
        <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border-default)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, fontSize: 13 }}>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Status: </span>
            {isInstalled ? (
              detection?.hasUpdate ? (
                <strong style={{ color: '#D97706', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <ArrowUpCircle size={14} /> Update Available (v{installedVersion} &rarr; v{detection.latestVersion || tech.latestVersion})
                </strong>
              ) : (
                <strong style={{ color: 'var(--success)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <CheckCircle2 size={14} /> Installed &amp; Up to date ({installedVersion || tech.version})
                </strong>
              )
            ) : (
              <strong style={{ color: 'var(--text-secondary)' }}>Not installed on this machine</strong>
            )}
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Pricing Model: </span>
            <span className={`badge ${tech.pricing === 'free' ? 'badge-installed' : tech.pricing === 'freemium' ? 'badge-neutral' : 'badge-danger'}`} style={{ marginLeft: 6 }}>
              {tech.pricingTier || (tech.pricing === 'free' ? 'Free & Open Source' : tech.pricing === 'freemium' ? 'Freemium' : 'Commercial')}
            </span>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>License: </span>
            <strong>{tech.license || 'Open Source'}</strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Catalog Version: </span>
            <strong>{tech.version}</strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Ecosystem: </span>
            <strong style={{ textTransform: 'capitalize' }}>{tech.ecosystem}</strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Category: </span>
            <strong style={{ textTransform: 'capitalize' }}>{tech.category}</strong>
          </div>
        </div>

        {/* Pricing & Cost Notice */}
        <div style={{ marginTop: 16, padding: '12px 16px', backgroundColor: 'var(--bg-secondary)', borderRadius: 8, border: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <div style={{ fontSize: 13, color: 'var(--text-primary)' }}>
            <strong>Pricing Details:</strong> {tech.costDescription || (tech.pricing === 'free' ? '100% Free & Open Source software' : tech.pricing === 'freemium' ? 'Free tier available for development' : 'Pay-per-use commercial API')}
          </div>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            Author: <strong>{tech.author || 'Open Source Community'}</strong>
          </span>
        </div>
      </div>

      {/* Official CLI Installation Commands */}
      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-default)', borderRadius: 12, padding: 24, marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>
          Command Line Recipes
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {tech.cli?.windows && (
            <div style={{ padding: 14, backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-default)', borderRadius: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)' }}>
                  {tech.cli.windows.startsWith('pip') || tech.cli.windows.startsWith('python') ? 'Windows (Python Pip)' : tech.cli.windows.startsWith('npm') || tech.cli.windows.startsWith('npx') ? 'Windows (npm)' : 'Windows (winget)'}
                </span>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => handleCopy('windows', tech.cli.windows)}
                >
                  {copiedKey === 'windows' ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                  Copy
                </button>
              </div>
              <code style={{ fontSize: 13, color: 'var(--text-primary)' }}>{tech.cli.windows}</code>
            </div>
          )}

          {/* CMD Verification Block when installed */}
          {isInstalled && (
            <div style={{ padding: 14, backgroundColor: '#090d16', border: '1px solid #1e293b', borderRadius: 8, color: '#e2e8f0', marginTop: 4 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6, flexWrap: 'wrap', gap: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#38bdf8', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Terminal size={14} /> Verify in Windows Command Prompt (CMD):
                </span>
                <button
                  type="button"
                  style={{
                    fontSize: 11,
                    padding: '3px 8px',
                    backgroundColor: copiedKey === 'verifyCmd' ? '#15803d' : '#1e293b',
                    color: '#ffffff',
                    border: '1px solid #334155',
                    borderRadius: 4,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4
                  }}
                  onClick={() => handleCopy('verifyCmd', tech.slug === 'chromadb' ? 'chromadb -V' : tech.ecosystem === 'python' ? `python -c "import ${tech.slug.replace(/-/g, '_')}; print(${tech.slug.replace(/-/g, '_')}.__version__)"` : `${tech.slug} --version`)}
                >
                  {copiedKey === 'verifyCmd' ? <Check size={12} /> : <Copy size={12} />}
                  {copiedKey === 'verifyCmd' ? 'Copied!' : 'Copy CMD Command'}
                </button>
              </div>
              <code style={{ fontSize: 12, color: '#4ade80', fontFamily: 'Consolas, monospace', display: 'block', backgroundColor: '#020617', padding: '8px 10px', borderRadius: 4 }}>
                {tech.slug === 'chromadb' ? 'chromadb -V' : tech.ecosystem === 'python' ? `python -c "import ${tech.slug.replace(/-/g, '_')}; print(${tech.slug.replace(/-/g, '_')}.__version__)"` : `${tech.slug} --version`}
              </code>
              {tech.slug === 'chromadb' && (
                <div style={{ marginTop: 6, fontSize: 11, color: '#94a3b8' }}>
                  Also check package metadata in CMD: <code style={{ color: '#f8fafc', background: '#1e293b', padding: '1px 4px', borderRadius: 3 }}>python -m pip show chromadb</code>
                </div>
              )}
            </div>
          )}

          {tech.cli?.macos && (
            <div style={{ padding: 14, backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-default)', borderRadius: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)' }}>macOS (Homebrew / pip)</span>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => handleCopy('macos', tech.cli.macos)}
                >
                  {copiedKey === 'macos' ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                  Copy
                </button>
              </div>
              <code style={{ fontSize: 13, color: 'var(--text-primary)' }}>{tech.cli.macos}</code>
            </div>
          )}

          {tech.cli?.linux && (
            <div style={{ padding: 14, backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-default)', borderRadius: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)' }}>Linux (apt / dnf / pip)</span>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => handleCopy('linux', tech.cli.linux)}
                >
                  {copiedKey === 'linux' ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                  Copy
                </button>
              </div>
              <code style={{ fontSize: 13, color: 'var(--text-primary)' }}>{tech.cli.linux}</code>
            </div>
          )}
        </div>
      </div>

      {/* Related Technologies */}
      {relatedTechs.length > 0 && (
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>
            Related Technologies
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {relatedTechs.map((r) => {
              const rInstalled = detectedInstalls[r.slug]?.installed;
              return (
                <div
                  key={r.slug}
                  style={{
                    padding: 18,
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--border-default)',
                    borderRadius: 12,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <h3 style={{ fontSize: 16, fontWeight: 600 }}>{r.name}</h3>
                      {rInstalled && <span className="badge badge-installed">Installed</span>}
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>
                      {r.description}
                    </p>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link to={`/technology/${r.slug}`} style={{ fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      View details <ArrowRight size={13} />
                    </Link>

                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => onInstallTech?.(r)}
                    >
                      <Zap size={13} />
                      Install
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
