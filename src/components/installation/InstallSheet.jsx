import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Zap, 
  Copy, 
  Check, 
  RotateCcw, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck,
  Terminal
} from 'lucide-react';
import { startInstall, getInstallJob } from '../../services/installer';
import { aiService } from '../../services/ai';

export default function InstallSheet({ 
  tech, 
  autoStart = true,
  onClose, 
  onInstalled, 
  onShowToast 
}) {
  const [phase, setPhase] = useState('ready'); // 'ready' | 'starting' | 'installing' | 'verifying' | 'completed' | 'error'
  const [job, setJob] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [cmdCopied, setCmdCopied] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const [aiDiagnosis, setAiDiagnosis] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [hasAutoStarted, setHasAutoStarted] = useState(false);

  const getCmdVerify = (targetTech, currentJob) => {
    if (currentJob?.cmdVerify) return currentJob.cmdVerify;
    if (targetTech.slug === 'chromadb') return 'python -m pip show chromadb';
    if (targetTech.ecosystem === 'python' || targetTech.category === 'data' || targetTech.category === 'ai') {
      const pyMod = targetTech.slug.replace(/-/g, '_');
      return `python -c "import ${pyMod}; print(${pyMod}.__version__)"`;
    }
    if (targetTech.installMethod === 'system-package-manager' || targetTech.category === 'runtime' || targetTech.category === 'database' || targetTech.category === 'vcs') {
      return `${targetTech.slug} --version`;
    }
    if (targetTech.installMethod === 'package-manager' && targetTech.ecosystem === 'javascript') {
      return `npm list -g ${targetTech.slug}`;
    }
    return targetTech.cli?.windows || `where ${targetTech.slug}`;
  };

  const handleCopyCmd = (cmd) => {
    navigator.clipboard.writeText(cmd);
    setCmdCopied(true);
    setTimeout(() => setCmdCopied(false), 2000);
    onShowToast?.('CMD command copied! Paste it into Command Prompt or PowerShell.', 'info');
  };

  const detectedSystem = useMemo(() => {
    const platform = typeof navigator !== 'undefined' && navigator.userAgent.includes('Mac') 
      ? 'macOS' 
      : typeof navigator !== 'undefined' && navigator.userAgent.includes('Linux') 
      ? 'Linux' 
      : 'Windows 11';

    const method = platform.startsWith('Windows') 
      ? (tech.installMethod === 'package-manager' ? 'Python Pip' : tech.installMethod === 'npm-package' ? 'Node Package Manager (npm)' : 'Windows Package Manager (winget)')
      : platform === 'macOS' ? 'Homebrew' : 'Distribution Package Manager (apt/dnf)';

    return {
      os: platform,
      arch: 'x64',
      method
    };
  }, [tech.installMethod]);

  const defaultCli = tech.cli?.windows || tech.cli?.macos || tech.cli?.linux || `npm install -g ${tech.slug}`;

  const handleCopyCli = () => {
    navigator.clipboard.writeText(defaultCli);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onShowToast?.('CLI installation command copied to clipboard', 'info');
  };

  const handleRunInstall = useCallback(async () => {
    setError('');
    setAiDiagnosis(null);
    setPhase('starting');

    try {
      const isUpgrade = Boolean(tech.isUpgrade || tech.hasUpdate);
      const created = await startInstall(tech.slug, isUpgrade);
      setJob(created);
      setPhase('installing');
      onShowToast?.(isUpgrade ? `Updating ${tech.name} to latest release...` : `Starting background installation of ${tech.name}...`, 'info');
    } catch (err) {
      setError(err.message || 'Failed to start installation.');
      setPhase('error');
    }
  }, [tech.isUpgrade, tech.hasUpdate, tech.slug, tech.name, onShowToast]);

  // Auto-start installation on open if requested
  useEffect(() => {
    if (autoStart && !hasAutoStarted && phase === 'ready') {
      setHasAutoStarted(true);
      handleRunInstall();
    }
  }, [autoStart, hasAutoStarted, phase, handleRunInstall]);

  // Cancel running job
  const handleCancelInstall = async () => {
    if (job?.id) {
      try {
        await fetch(`http://127.0.0.1:7331/cancel/${job.id}`, { method: 'POST' });
        setPhase('error');
        setError('Installation canceled by user.');
        onShowToast?.('Installation canceled.', 'info');
      } catch {}
    }
  };

  // Poll real job status
  useEffect(() => {
    if (!job?.id || ['completed', 'error'].includes(phase)) return;

    const timer = setInterval(async () => {
      try {
        const next = await getInstallJob(job.id);
        setJob(next);

        if (next.status === 'installing') {
          setPhase('installing');
        } else if (next.status === 'verifying') {
          setPhase('verifying');
        } else if (next.status === 'completed') {
          setPhase('completed');
          const realVer = next.verifiedVersion || tech.version;
          onInstalled?.(tech.slug, realVer);
          onShowToast?.(`✓ ${tech.name} (${realVer}) installed and verified on system!`, 'success');
        } else if (next.status === 'error') {
          setPhase('error');
          setError(next.error || 'The installer reported a non-zero exit status.');
        }
      } catch (err) {
        setPhase('error');
        setError(err.message || 'Connection to local installer was lost.');
      }
    }, 750);

    return () => clearInterval(timer);
  }, [job?.id, phase, tech.slug, tech.version, tech.name, onInstalled, onShowToast]);

  const handleAskAI = async () => {
    setAiLoading(true);
    try {
      const logs = (job?.output || []).join('');
      const res = await aiService.troubleshoot({
        slug: tech.slug,
        error: error || 'Installation exited with error.',
        logs,
        os: detectedSystem.os
      });
      setAiDiagnosis(res.diagnosis);
    } catch (err) {
      setAiDiagnosis(`Unable to consult AI assistant: ${err.message}`);
    } finally {
      setAiLoading(false);
    }
  };

  const rawLogs = (job?.output || []).join('');
  const progressPercent = job?.percent ?? (phase === 'installing' ? 45 : phase === 'verifying' ? 90 : phase === 'completed' ? 100 : 0);

  return (
    <motion.div 
      className="sheet-overlay" 
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      <motion.div 
        className="sheet-content" 
        onClick={(e) => e.stopPropagation()}
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
      >
        {/* Header */}
        <div className="sheet-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: 20, fontWeight: 700 }}>
                {tech.isUpgrade || tech.hasUpdate ? `Update ${tech.name}` : `Install ${tech.name}`}
              </h2>
              {tech.verified && (
                <span className="badge badge-verified">
                  <ShieldCheck size={12} /> Verified
                </span>
              )}
              {tech.pricing && (
                <span className={`badge ${tech.pricing === 'free' ? 'badge-installed' : tech.pricing === 'freemium' ? 'badge-neutral' : 'badge-danger'}`}>
                  {tech.pricingTier || (tech.pricing === 'free' ? 'Free & Open Source' : tech.pricing === 'freemium' ? 'Freemium' : 'Commercial')}
                </span>
              )}
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              {tech.description}
            </p>
          </div>
          <button type="button" className="btn-icon" onClick={onClose} aria-label="Close sheet">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="sheet-body">
          {/* Machine Detection Specs */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ padding: 12, backgroundColor: 'var(--bg-secondary)', borderRadius: 8, border: '1px solid var(--border-default)' }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, marginBottom: 2 }}>System</div>
              <div style={{ fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                <CheckCircle2 size={13} style={{ color: 'var(--success)' }} />
                {detectedSystem.os} ({detectedSystem.arch})
              </div>
            </div>

            <div style={{ padding: 12, backgroundColor: 'var(--bg-secondary)', borderRadius: 8, border: '1px solid var(--border-default)' }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, marginBottom: 2 }}>
                {tech.isUpgrade || tech.hasUpdate ? 'Target Release' : 'Target Version'}
              </div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{tech.latestVersion || tech.version}</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ padding: 12, backgroundColor: 'var(--bg-secondary)', borderRadius: 8, border: '1px solid var(--border-default)' }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, marginBottom: 2 }}>Installation Method</div>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{detectedSystem.method}</div>
            </div>

            <div style={{ padding: 12, backgroundColor: 'var(--bg-secondary)', borderRadius: 8, border: '1px solid var(--border-default)' }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, marginBottom: 2 }}>Pricing & Cost</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
                {tech.costDescription || (tech.pricing === 'free' ? '100% Free & Open Source' : tech.pricing === 'freemium' ? 'Freemium' : 'Commercial')}
              </div>
            </div>
          </div>

          {/* Stepper Status When In Progress or Completed */}
          {phase !== 'ready' && (
            <div className="install-stepper">
              {/* Animated Progress Bar */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  <span>Progress</span>
                  <span>{progressPercent}%</span>
                </div>
                <div style={{ height: 6, backgroundColor: 'var(--bg-tertiary)', borderRadius: 9999, overflow: 'hidden' }}>
                  <motion.div 
                    style={{ height: '100%', backgroundColor: phase === 'error' ? 'var(--danger)' : phase === 'completed' ? 'var(--success)' : 'var(--accent-primary)', borderRadius: 9999 }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>

              <div className="stepper-row done">
                <CheckCircle2 size={16} />
                <span>Environment detected ({detectedSystem.os})</span>
              </div>

              <div className="stepper-row done">
                <CheckCircle2 size={16} />
                <span>Local installer agent connected (127.0.0.1:7331)</span>
              </div>

              <div className={`stepper-row ${phase === 'installing' ? 'active' : ['verifying', 'completed'].includes(phase) ? 'done' : phase === 'error' ? 'error' : ''}`}>
                {phase === 'installing' ? (
                  <Loader2 size={16} className="spin" style={{ animation: 'spin 1s linear infinite' }} />
                ) : ['verifying', 'completed'].includes(phase) ? (
                  <CheckCircle2 size={16} />
                ) : phase === 'error' ? (
                  <AlertCircle size={16} />
                ) : (
                  <div style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid var(--border-strong)' }} />
                )}
                <span>
                  {phase === 'installing' 
                    ? (tech.isUpgrade ? `Updating ${tech.name} to latest release...` : `Installing ${tech.name} from background...`)
                    : ['verifying', 'completed'].includes(phase)
                    ? (tech.isUpgrade ? `Updated ${tech.name}` : `Installed ${tech.name}`)
                    : `Process failed`}
                </span>
              </div>

              <div className={`stepper-row ${phase === 'verifying' ? 'active' : phase === 'completed' ? 'done' : ''}`}>
                {phase === 'verifying' ? (
                  <Loader2 size={16} className="spin" style={{ animation: 'spin 1s linear infinite' }} />
                ) : phase === 'completed' ? (
                  <CheckCircle2 size={16} />
                ) : (
                  <div style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid var(--border-strong)' }} />
                )}
                <span>Verifying binary PATH & runtime version</span>
              </div>
            </div>
          )}

          {/* Success Box */}
          {phase === 'completed' && (
            <motion.div 
              style={{ padding: 18, backgroundColor: 'var(--success-bg)', border: '1px solid var(--success-border)', borderRadius: 10, display: 'flex', flexDirection: 'column', gap: 14 }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--success)', fontWeight: 700, fontSize: 16, marginBottom: 4 }}>
                  <CheckCircle2 size={20} />
                  {tech.isUpgrade ? `${tech.name} Successfully Updated!` : `${tech.name} Physically Installed on Windows!`}
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                  Genuine verified version on machine: <strong style={{ color: 'var(--text-primary)' }}>{job?.verifiedVersion || tech.version}</strong>
                </p>
              </div>

              {/* Terminal Verification Guidance Card */}
              <div style={{ padding: 12, backgroundColor: '#090d16', borderRadius: 8, border: '1px solid #1e293b' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, flexWrap: 'wrap', gap: 6 }}>
                  <span style={{ fontWeight: 600, color: '#38bdf8', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Terminal size={14} /> Verify in Windows CMD / PowerShell:
                  </span>
                  <button
                    type="button"
                    style={{ 
                      fontSize: 11, 
                      padding: '4px 10px', 
                      backgroundColor: cmdCopied ? '#15803d' : '#1e293b', 
                      color: '#ffffff', 
                      border: '1px solid #334155', 
                      borderRadius: 6,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4
                    }}
                    onClick={() => handleCopyCmd(getCmdVerify(tech, job))}
                  >
                    {cmdCopied ? <Check size={12} /> : <Copy size={12} />}
                    {cmdCopied ? 'Copied to Clipboard!' : 'Copy CMD Command'}
                  </button>
                </div>

                <div style={{ fontFamily: 'Consolas, monospace', fontSize: 12, color: '#4ade80', backgroundColor: '#020617', padding: '10px 12px', borderRadius: 6, overflowX: 'auto', whiteSpace: 'pre-wrap', border: '1px solid #0f172a' }}>
                  {getCmdVerify(tech, job)}
                </div>

                {tech.slug === 'chromadb' && (
                  <div style={{ marginTop: 8, fontSize: 11, color: '#94a3b8' }}>
                    💡 Also available in CMD: <code style={{ color: '#f8fafc', background: '#1e293b', padding: '1px 5px', borderRadius: 4 }}>chromadb -V</code> or <code style={{ color: '#f8fafc', background: '#1e293b', padding: '1px 5px', borderRadius: 4 }}>chroma -V</code>
                  </div>
                )}
                {tech.ecosystem === 'python' && tech.slug !== 'chromadb' && (
                  <div style={{ marginTop: 8, fontSize: 11, color: '#94a3b8' }}>
                    💡 Installed to Python 3.12 site-packages. You can also run: <code style={{ color: '#f8fafc', background: '#1e293b', padding: '1px 5px', borderRadius: 4 }}>python -m pip show {tech.slug}</code>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Error Box */}
          {phase === 'error' && (
            <motion.div 
              style={{ padding: 16, backgroundColor: 'var(--danger-bg)', border: '1px solid var(--danger-border)', borderRadius: 8 }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--danger)', fontWeight: 600, fontSize: 15, marginBottom: 4 }}>
                <AlertCircle size={18} />
                Installation couldn't complete.
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>
                {error}
              </p>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={handleRunInstall}
                >
                  <RotateCcw size={13} />
                  Retry Installation
                </button>

                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={handleAskAI}
                  disabled={aiLoading}
                >
                  {aiLoading ? <Loader2 size={13} className="spin" /> : <Sparkles size={13} />}
                  Ask AI to Troubleshoot
                </button>
              </div>
            </motion.div>
          )}

          {/* AI Troubleshooting Diagnosis */}
          {aiDiagnosis && (
            <motion.div 
              style={{ padding: 16, backgroundColor: '#FFFFFF', border: '1px solid var(--accent-border)', borderRadius: 8, boxShadow: 'var(--shadow-sm)' }}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, color: 'var(--accent-primary)', marginBottom: 8, fontSize: 14 }}>
                <Sparkles size={15} />
                BuilderOS AI Assistant Diagnosis
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-primary)', whiteSpace: 'pre-line', lineHeight: 1.6 }}>
                {aiDiagnosis}
              </div>
            </motion.div>
          )}

          {/* Expandable Real Terminal Logs */}
          <div>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => setShowLogs(!showLogs)}
              style={{ width: '100%', justifyContent: 'space-between', padding: '8px 0' }}
            >
              <span>Live Console & Installation Output</span>
              {showLogs ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {showLogs && (
              <div className="log-box" style={{ marginTop: 8 }}>
                {rawLogs || 'Waiting for installer command output...'}
              </div>
            )}
          </div>

          {/* Actions Bar */}
          <div style={{ marginTop: 'auto', paddingTop: 20, borderTop: '1px solid var(--border-default)', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {phase === 'ready' && (
              <>
                <motion.button
                  type="button"
                  className="btn btn-primary btn-lg"
                  onClick={handleRunInstall}
                  whileTap={{ scale: 0.98 }}
                >
                  <Zap size={16} />
                  Install {tech.name}
                </motion.button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCopyCli}
                >
                  {copied ? <Check size={15} /> : <Copy size={15} />}
                  Install via CLI (Copy)
                </button>
              </>
            )}

            {phase === 'installing' && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancelInstall}
              >
                Cancel Installation
              </button>
            )}

            {phase === 'completed' && (
              <motion.button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={onClose}
                whileTap={{ scale: 0.98 }}
              >
                Done
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
