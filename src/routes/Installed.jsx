import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  RotateCcw, 
  Cpu, 
  Zap, 
  Loader2,
  ShieldCheck,
  Share2,
  Check,
  Search,
  Terminal,
  RefreshCw,
  Server,
  Code2,
  Boxes
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { getTechEraBadge, getTechDomain } from '../data/categoriesData';

const DOMAIN_STYLES = {
  frontend: {
    name: 'Frontend',
    gradient: 'linear-gradient(90deg, #10B981 0%, #06B6D4 100%)',
    badgeBg: '#ECFDF5',
    badgeColor: '#047857',
    badgeBorder: '#A7F3D0',
    icon: Code2
  },
  backend: {
    name: 'Backend',
    gradient: 'linear-gradient(90deg, #F97316 0%, #F43F5E 100%)',
    badgeBg: '#FFF7ED',
    badgeColor: '#C2410C',
    badgeBorder: '#FED7AA',
    icon: Server
  },
  integration: {
    name: 'Integration & AI',
    gradient: 'linear-gradient(90deg, #0284C7 0%, #06B6D4 100%)',
    badgeBg: '#F0F9FF',
    badgeColor: '#0369A1',
    badgeBorder: '#BAE6FD',
    icon: Boxes
  }
};

export default function Installed({
  technologies = [],
  detectedInstalls = {},
  onRefreshDetection,
  onInstallTech
}) {
  const { showToast } = useToast();
  const [refreshing, setRefreshing] = useState(false);
  const [filterQuery, setFilterQuery] = useState('');
  const [copiedSpec, setCopiedSpec] = useState(false);
  const [copiedSlug, setCopiedSlug] = useState(null);

  const handleCopyCmd = (tech) => {
    let cmd = '';
    if (tech.slug === 'chromadb') {
      cmd = 'chromadb -V';
    } else if (tech.ecosystem === 'python') {
      cmd = `python -m pip show ${tech.slug}`;
    } else if (tech.ecosystem === 'javascript' && tech.installMethod === 'package-manager') {
      cmd = `npm list -g ${tech.slug}`;
    } else {
      cmd = `${tech.slug} --version`;
    }
    navigator.clipboard.writeText(cmd);
    setCopiedSlug(tech.slug);
    showToast(`Command copied: "${cmd}"`, 'info');
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await onRefreshDetection?.();
    setRefreshing(false);
    showToast('Environment detection refreshed.', 'success');
  };

  // Group technologies into installed vs not installed
  const installedTechs = useMemo(() => {
    return technologies.filter((t) => detectedInstalls[t.slug]?.installed);
  }, [technologies, detectedInstalls]);

  const availableTechs = useMemo(() => {
    return technologies.filter((t) => !detectedInstalls[t.slug]?.installed);
  }, [technologies, detectedInstalls]);

  const updateCount = useMemo(() => {
    return installedTechs.filter((t) => detectedInstalls[t.slug]?.hasUpdate).length;
  }, [installedTechs, detectedInstalls]);

  const filteredInstalled = useMemo(() => {
    if (!filterQuery.trim()) return installedTechs;
    const q = filterQuery.toLowerCase().trim();
    return installedTechs.filter(
      (t) => t.name.toLowerCase().includes(q) || t.category?.toLowerCase().includes(q) || (t.domain && t.domain.toLowerCase().includes(q))
    );
  }, [installedTechs, filterQuery]);

  const handleExportSpec = () => {
    const spec = {
      platform: 'Windows 11 (x64)',
      exportedAt: new Date().toISOString(),
      tools: installedTechs.map((t) => ({
        name: t.name,
        slug: t.slug,
        version: detectedInstalls[t.slug]?.version || t.version,
        category: t.category,
        domain: getTechDomain(t)
      }))
    };

    navigator.clipboard.writeText(JSON.stringify(spec, null, 2));
    setCopiedSpec(true);
    showToast('Environment specification copied to clipboard.', 'success');
    setTimeout(() => setCopiedSpec(false), 2000);
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      {/* Header */}
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <h1 className="page-title" style={{ margin: 0 }}>Your environment</h1>
            <span style={{ 
              padding: '3px 10px', 
              fontSize: 12, 
              fontWeight: 700, 
              borderRadius: 9999, 
              background: 'linear-gradient(135deg, #10B981 0%, #06B6D4 100%)', 
              color: '#FFFFFF' 
            }}>
              Active
            </span>
          </div>
          <p className="page-subtitle">
            Live genuine verification of tools, runtimes, and packages installed on your Windows operating system.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={handleExportSpec}
            title="Export environment as JSON manifest"
          >
            {copiedSpec ? <Check size={14} className="text-success" /> : <Share2 size={14} />}
            Export Spec
          </button>

          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={handleRefresh}
            disabled={refreshing}
            style={{ fontWeight: 600 }}
          >
            {refreshing ? <Loader2 size={14} className="spin" /> : <RotateCcw size={14} />}
            Refresh Detection
          </button>
        </div>
      </div>

      {/* System Summary Bar with vibrant accents */}
      <div style={{ 
        padding: '20px 24px', 
        background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.05) 0%, rgba(16, 185, 129, 0.04) 50%, rgba(249, 115, 22, 0.03) 100%)', 
        border: '1px solid rgba(79, 70, 229, 0.18)', 
        borderRadius: 16, 
        marginBottom: 32, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        flexWrap: 'wrap', 
        gap: 20,
        boxShadow: '0 4px 20px -4px rgba(0, 0, 0, 0.03)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ 
            width: 46, 
            height: 46, 
            borderRadius: 12, 
            background: 'linear-gradient(135deg, #1D4ED8 0%, #0284C7 100%)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            color: '#FFFFFF',
            boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)'
          }}>
            <Cpu size={22} />
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
              Windows 11 (x64 Architecture)
              <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 6, backgroundColor: '#ECFDF5', color: '#047857', border: '1px solid #A7F3D0' }}>
                Online
              </span>
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span className="status-dot green-pulse" />
              OS Native Package Agent connected at <code>127.0.0.1:7331</code>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <div style={{ 
            padding: '10px 16px', 
            backgroundColor: '#FFFFFF', 
            border: '1px solid #E2E8F0', 
            borderRadius: 10,
            textAlign: 'center',
            minWidth: 100
          }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#10B981' }}>{installedTechs.length}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.04em' }}>Installed</div>
          </div>

          {updateCount > 0 && (
            <div style={{ 
              padding: '10px 16px', 
              backgroundColor: '#FFFBEB', 
              border: '1px solid #FDE68A', 
              borderRadius: 10,
              textAlign: 'center',
              minWidth: 100
            }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#D97706' }}>{updateCount}</div>
              <div style={{ fontSize: 11, color: '#92400E', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.04em' }}>Updates</div>
            </div>
          )}

          <div style={{ 
            padding: '10px 16px', 
            backgroundColor: '#FFFFFF', 
            border: '1px solid #E2E8F0', 
            borderRadius: 10,
            textAlign: 'center',
            minWidth: 100
          }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#0284C7' }}>{availableTechs.length}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.04em' }}>Available</div>
          </div>
        </div>
      </div>

      {/* Installed Tools Section */}
      <div style={{ marginBottom: 44 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              Installed Tools & Packages
            </h2>
            <span style={{ 
              backgroundColor: '#ECFDF5', 
              color: '#047857', 
              border: '1px solid #A7F3D0',
              fontWeight: 700, 
              fontSize: 12, 
              padding: '2px 8px', 
              borderRadius: 9999 
            }}>
              {installedTechs.length} verified
            </span>
          </div>

          {installedTechs.length > 2 && (
            <div style={{ position: 'relative', width: 240 }}>
              <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                className="form-input"
                style={{ padding: '8px 12px 8px 34px', fontSize: 13, height: 36, borderRadius: 8 }}
                placeholder="Filter installed..."
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
              />
            </div>
          )}
        </div>

        {installedTechs.length === 0 ? (
          <div style={{ padding: 48, textAlign: 'center', backgroundColor: '#FFFFFF', border: '1px dashed var(--border-default)', borderRadius: 16 }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: 15, marginBottom: 8 }}>
              No catalog tools currently detected on your system.
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>
              Explore the catalog below to install developer runtimes, frameworks, and AI libraries.
            </p>
          </div>
        ) : (
          <div style={{ 
            backgroundColor: '#FFFFFF', 
            border: '1.5px solid rgba(2, 132, 199, 0.25)', 
            borderRadius: 16, 
            overflow: 'hidden',
            boxShadow: '0 8px 30px -4px rgba(2, 132, 199, 0.08)'
          }}>
            {filteredInstalled.map((tech, idx) => {
              const detection = detectedInstalls[tech.slug];
              const version = detection?.version || tech.version;
              const domain = getTechDomain(tech);
              const domainStyle = DOMAIN_STYLES[domain] || DOMAIN_STYLES.integration;
              const era = getTechEraBadge(tech);

              return (
                <motion.div
                  key={tech.slug}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15, delay: idx * 0.03 }}
                  style={{
                    padding: '16px 22px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: idx === filteredInstalled.length - 1 ? 'none' : '1px solid var(--border-default)',
                    backgroundColor: detection?.hasUpdate ? '#FFFDF5' : '#FFFFFF',
                    transition: 'background-color 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    {/* Status live pulsing indicator */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span className={`status-dot ${detection?.hasUpdate ? 'amber-pulse' : 'green-pulse'}`} />
                    </div>

                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-primary)' }}>
                        {tech.name}
                        {tech.verified && (
                          <ShieldCheck size={14} style={{ color: '#0284C7' }} title="Verified Windows Package" />
                        )}
                        <span style={{ 
                          fontSize: 10, 
                          fontWeight: 700, 
                          padding: '1px 7px', 
                          borderRadius: 4, 
                          backgroundColor: domainStyle.badgeBg, 
                          color: domainStyle.badgeColor,
                          border: `1px solid ${domainStyle.badgeBorder}`
                        }}>
                          {domainStyle.name}
                        </span>
                        {era && (
                          <span style={{ 
                            fontSize: 10, 
                            fontWeight: 600, 
                            padding: '1px 6px', 
                            borderRadius: 4, 
                            backgroundColor: era.bg, 
                            color: era.color,
                            border: `1px solid ${era.border}`
                          }}>
                            {era.emoji} {era.label}
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 3, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span>{tech.type || tech.category}</span>
                        <span>•</span>
                        <span style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--text-primary)' }}>
                          v{version}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    {detection?.hasUpdate ? (
                      <span className="badge-status-update">
                        <span className="status-dot amber-pulse" />
                        Update to v{detection.latestVersion || tech.latestVersion || tech.version}
                      </span>
                    ) : (
                      <span className="badge-status-installed">
                        <span className="status-dot green-pulse" />
                        Up to date
                      </span>
                    )}

                    <button
                      type="button"
                      className="btn-cli-terminal"
                      onClick={() => handleCopyCmd(tech)}
                      title="Copy command to test this tool in CMD / PowerShell"
                    >
                      {copiedSlug === tech.slug ? <Check size={13} className="text-success" /> : <Terminal size={13} />}
                      {copiedSlug === tech.slug ? 'Copied' : '>_ CMD'}
                    </button>

                    {detection?.hasUpdate ? (
                      <button
                        type="button"
                        className="btn-update-vibrant btn-sm"
                        onClick={() => onInstallTech?.({ ...tech, isUpgrade: true, latestVersion: detection.latestVersion || tech.latestVersion })}
                      >
                        <RefreshCw size={13} />
                        Update Now
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => onInstallTech?.(tech)}
                        title="Reinstall or verify package integrity"
                      >
                        <RotateCcw size={13} />
                        Reinstall
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Available but Not Installed - Colorful Card Grid */}
      {availableTechs.length > 0 && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              Recommended to Complete Your Environment
            </h2>
            <span style={{ 
              backgroundColor: '#F1F5F9', 
              color: '#475569', 
              border: '1px solid #E2E8F0',
              fontWeight: 700, 
              fontSize: 12, 
              padding: '2px 8px', 
              borderRadius: 9999 
            }}>
              {availableTechs.length} available
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 18 }}>
            {availableTechs.slice(0, 8).map((tech) => {
              const domain = getTechDomain(tech);
              const domainStyle = DOMAIN_STYLES[domain] || DOMAIN_STYLES.integration;

              return (
                <div
                  key={tech.slug}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: `1.5px solid ${domainStyle.badgeBorder}`,
                    borderRadius: 16,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 6px 20px -4px rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {/* Domain Accent Top Stripe */}
                  <div style={{ height: 4, width: '100%', background: domainStyle.gradient }} />

                  <div style={{ padding: '18px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, marginBottom: 10 }}>
                      <div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>{tech.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{tech.category}</div>
                      </div>
                      <span style={{ 
                        fontSize: 10, 
                        fontWeight: 700, 
                        padding: '2px 6px', 
                        borderRadius: 4, 
                        backgroundColor: domainStyle.badgeBg, 
                        color: domainStyle.badgeColor,
                        border: `1px solid ${domainStyle.badgeBorder}`
                      }}>
                        {domainStyle.name}
                      </span>
                    </div>

                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.4, margin: '0 0 14px 0', flex: 1 }}>
                      {tech.description?.length > 70 ? `${tech.description.slice(0, 70)}...` : tech.description}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid var(--border-subtle)', marginTop: 'auto' }}>
                      <span style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: 4, 
                        fontSize: 11, 
                        fontWeight: 600, 
                        padding: '2px 7px', 
                        borderRadius: 4, 
                        backgroundColor: tech.pricingTier === 'paid' ? '#FAF5FF' : '#ECFDF5', 
                        color: tech.pricingTier === 'paid' ? '#6B21A8' : '#047857', 
                        border: tech.pricingTier === 'paid' ? '1px solid #E9D5FF' : '1px solid #A7F3D0' 
                      }}>
                        {tech.pricingTier === 'paid' ? '🟣 Freemium' : '🟢 Free FOSS'}
                      </span>

                      <button
                        type="button"
                        className="btn-install-vibrant btn-sm"
                        onClick={() => onInstallTech?.(tech)}
                      >
                        <Zap size={13} fill="#FCD34D" color="#F59E0B" />
                        Install Now
                      </button>
                    </div>
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
