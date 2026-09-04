import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Zap, CheckCircle2, Circle, Loader2, AlertCircle } from 'lucide-react';
import { startInstall, getInstallJob } from '../../services/installer';

export default function StackInstallPlanModal({
  title = 'Installation Plan',
  description = 'Review the technologies in this plan before installing.',
  technologies = [],
  detectedInstalls = {},
  onClose,
  onInstalled,
  onShowToast
}) {
  // Map tech to selected status if not already installed
  const [selectedSlugs, setSelectedSlugs] = useState(() => {
    return technologies
      .filter((t) => !detectedInstalls[t.slug]?.installed)
      .map((t) => t.slug);
  });

  const [installingIndex, setInstallingIndex] = useState(-1);
  const [inProgress, setInProgress] = useState(false);
  const [progressStatus, setProgressStatus] = useState({});

  const toggleSelect = (slug) => {
    if (inProgress) return;
    setSelectedSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const handleInstallSelected = async () => {
    if (selectedSlugs.length === 0) return;
    setInProgress(true);

    for (let i = 0; i < selectedSlugs.length; i++) {
      const slug = selectedSlugs[i];
      setInstallingIndex(i);
      setProgressStatus((prev) => ({ ...prev, [slug]: 'installing' }));

      try {
        const job = await startInstall(slug);
        let finished = false;
        while (!finished) {
          await new Promise((r) => setTimeout(r, 1000));
          const current = await getInstallJob(job.id);
          if (current.status === 'completed') {
            finished = true;
            setProgressStatus((prev) => ({ ...prev, [slug]: 'completed' }));
            onInstalled?.(slug, current.version || 'installed');
          } else if (current.status === 'error') {
            finished = true;
            setProgressStatus((prev) => ({ ...prev, [slug]: 'error' }));
          }
        }
      } catch {
        setProgressStatus((prev) => ({ ...prev, [slug]: 'error' }));
      }
    }

    setInProgress(false);
    onShowToast?.('Batch installation finished.', 'success');
  };

  return (
    <motion.div 
      className="sheet-overlay" 
      onClick={onClose} 
      style={{ justifyContent: 'center', alignItems: 'center' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.16 }}
    >
      <motion.div 
        className="sheet-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxWidth: 600, height: 'auto', maxHeight: '90vh', borderRadius: 12, boxShadow: 'var(--shadow-modal)' }}
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ type: 'spring', damping: 26, stiffness: 300 }}
      >
        <div className="sheet-header">
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700 }}>{title}</h2>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{description}</p>
          </div>
          <motion.button 
            type="button" 
            className="btn-icon" 
            onClick={onClose} 
            disabled={inProgress}
            whileTap={{ scale: 0.9 }}
          >
            <X size={18} />
          </motion.button>
        </div>

        <div className="sheet-body">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {technologies.map((t, idx) => {
              const isDetected = detectedInstalls[t.slug]?.installed;
              const isSelected = selectedSlugs.includes(t.slug);
              const status = progressStatus[t.slug];

              return (
                <motion.div
                  key={t.slug}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04, duration: 0.18 }}
                  whileHover={!isDetected && !inProgress ? { scale: 1.01, backgroundColor: '#FAFAFB' } : {}}
                  whileTap={!isDetected && !inProgress ? { scale: 0.99 } : {}}
                  onClick={() => !isDetected && toggleSelect(t.slug)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderRadius: 8,
                    border: '1px solid var(--border-default)',
                    backgroundColor: isDetected ? 'var(--bg-secondary)' : '#FFFFFF',
                    cursor: isDetected ? 'default' : inProgress ? 'not-allowed' : 'pointer',
                    transition: 'border-color 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    {isDetected ? (
                      <CheckCircle2 size={18} style={{ color: 'var(--success)' }} />
                    ) : status === 'installing' ? (
                      <Loader2 size={18} className="spin" style={{ color: 'var(--accent-primary)', animation: 'spin 1s linear infinite' }} />
                    ) : status === 'completed' ? (
                      <CheckCircle2 size={18} style={{ color: 'var(--success)' }} />
                    ) : status === 'error' ? (
                      <AlertCircle size={18} style={{ color: 'var(--danger)' }} />
                    ) : isSelected ? (
                      <motion.div 
                        initial={{ scale: 0.7 }}
                        animate={{ scale: 1 }}
                        style={{ width: 18, height: 18, borderRadius: 4, backgroundColor: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontSize: 12 }}
                      >
                        ✓
                      </motion.div>
                    ) : (
                      <Circle size={18} style={{ color: 'var(--text-muted)' }} />
                    )}

                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>
                        {t.name}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                        {t.reason || t.description || t.category}
                      </div>
                    </div>
                  </div>

                  <div>
                    {isDetected ? (
                      <span className="badge badge-installed">Already installed</span>
                    ) : status === 'installing' ? (
                      <span className="badge badge-warning">Installing...</span>
                    ) : status === 'completed' ? (
                      <span className="badge badge-installed">Installed</span>
                    ) : status === 'error' ? (
                      <span className="badge badge-warning" style={{ color: 'var(--danger)', backgroundColor: 'var(--danger-bg)' }}>Failed</span>
                    ) : isSelected ? (
                      <span className="badge badge-verified">Selected</span>
                    ) : (
                      <span className="badge badge-neutral">Skipped</span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
            <motion.button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={inProgress}
              whileTap={{ scale: 0.96 }}
            >
              Cancel
            </motion.button>

            <motion.button
              type="button"
              className="btn btn-primary"
              onClick={handleInstallSelected}
              disabled={inProgress || selectedSlugs.length === 0}
              whileTap={{ scale: 0.96 }}
            >
              {inProgress ? (
                <>
                  <Loader2 size={15} className="spin" />
                  Installing {installingIndex + 1} of {selectedSlugs.length}...
                </>
              ) : (
                <>
                  <Zap size={15} />
                  Install Selected ({selectedSlugs.length})
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
