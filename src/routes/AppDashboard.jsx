import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Compass, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  Cpu,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import PRESET_STACKS from '../data/stacksData';

export default function AppDashboard({ 
  technologies = [], 
  detectedInstalls = {}, 
  onInstallTech 
}) {
  const { user } = useAuth();

  const totalDetected = Object.values(detectedInstalls).filter((d) => d?.installed).length;
  const freeToolsCount = technologies.filter((t) => (t.pricing || 'free') === 'free').length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {/* Top Banner */}
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 className="page-title">Welcome back, {user?.name || 'Developer'}</h1>
          <p className="page-subtitle">
            Your centralized workstation environment overview, AI tools, and package management hub.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <Link to="/ai" className="btn btn-secondary btn-sm">
            <Sparkles size={14} />
            Ask AI Assistant
          </Link>
          <Link to="/explore" className="btn btn-primary btn-sm">
            <Compass size={14} />
            Explore Catalog
          </Link>
        </div>
      </div>

      {/* Stats Summary Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 32 }}>
        <motion.div 
          style={{ padding: 20, backgroundColor: '#FFFFFF', border: '1px solid var(--border-default)', borderRadius: 12 }}
          whileHover={{ y: -2 }}
        >
          <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: 6 }}>
            Detected Tools
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-primary)' }}>
            {totalDetected}{' '}
            <span style={{ fontSize: 14, fontWeight: 400, color: 'var(--text-secondary)' }}>
              of {technologies.length} catalog items
            </span>
          </div>
          <Link to="/installed" style={{ fontSize: 12, display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 8 }}>
            Manage installed tools <ArrowRight size={12} />
          </Link>
        </motion.div>

        <motion.div 
          style={{ padding: 20, backgroundColor: '#FFFFFF', border: '1px solid var(--border-default)', borderRadius: 12 }}
          whileHover={{ y: -2 }}
        >
          <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: 6 }}>
            Free & Open Source
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-primary)' }}>
            {freeToolsCount}{' '}
            <span style={{ fontSize: 14, fontWeight: 400, color: 'var(--text-secondary)' }}>
              100% Free / FOSS
            </span>
          </div>
          <Link to="/explore" style={{ fontSize: 12, display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 8 }}>
            Browse Free Tools <ArrowRight size={12} />
          </Link>
        </motion.div>

        <motion.div 
          style={{ padding: 20, backgroundColor: '#FFFFFF', border: '1px solid var(--border-default)', borderRadius: 12 }}
          whileHover={{ y: -2 }}
        >
          <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: 6 }}>
            Host Environment
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Cpu size={20} style={{ color: 'var(--accent-primary)' }} />
            Windows 11 (x64)
          </div>
          <div style={{ fontSize: 12, color: 'var(--success)', marginTop: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
            <CheckCircle2 size={13} />
            Background installer agent connected
          </div>
        </motion.div>

        <motion.div 
          style={{ padding: 20, backgroundColor: '#FFFFFF', border: '1px solid var(--border-default)', borderRadius: 12 }}
          whileHover={{ y: -2 }}
        >
          <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: 6 }}>
            Featherless AI
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Sparkles size={20} style={{ color: 'var(--accent-primary)' }} />
            Assistant Ready
          </div>
          <Link to="/ai" style={{ fontSize: 12, display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 8 }}>
            Plan a custom stack <ArrowRight size={12} />
          </Link>
        </motion.div>
      </div>

      {/* Suggested Stacks Grid */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700 }}>Popular Development Stacks</h2>
          <Link to="/stacks" style={{ fontSize: 13 }}>
            View all stacks →
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
          {PRESET_STACKS.slice(0, 3).map((stack) => {
            const stackTechs = technologies.filter((t) => stack.slugs.includes(t.slug));
            const installedCount = stack.slugs.filter((s) => detectedInstalls[s]?.installed).length;
            const allReady = installedCount === stack.slugs.length;

            return (
              <motion.div
                key={stack.id}
                whileHover={{ y: -3, boxShadow: '0 8px 24px -4px rgba(15, 23, 42, 0.08)' }}
                transition={{ duration: 0.16 }}
                style={{
                  padding: 20,
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border-default)',
                  borderRadius: 12,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-xs)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600 }}>{stack.name}</h3>
                    {allReady ? (
                      <span className="badge badge-installed">✓ Configured</span>
                    ) : (
                      <span className="badge badge-neutral">
                        {installedCount}/{stack.slugs.length} Installed
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>
                    {stack.description}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                    {stackTechs.map((t) => (
                      <span
                        key={t.slug}
                        className={`badge ${detectedInstalls[t.slug]?.installed ? 'badge-installed' : 'badge-neutral'}`}
                      >
                        {detectedInstalls[t.slug]?.installed ? '✓ ' : ''}{t.name}
                      </span>
                    ))}
                  </div>
                </div>

                <Link to="/stacks" className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
                  Inspect & Install Stack
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Quick Technology Spotlights */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700 }}>Essential Developer Runtimes</h2>
          <Link to="/explore" style={{ fontSize: 13 }}>
            Explore all {technologies.length} tools →
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {technologies.slice(0, 4).map((tech) => {
            const detection = detectedInstalls[tech.slug];
            const isInstalled = detection?.installed;
            const version = detection?.version;
            const hasUpdate = detection?.hasUpdate;
            const latestVersion = detection?.latestVersion;

            return (
              <motion.div
                key={tech.slug}
                whileHover={{ y: -2, boxShadow: '0 6px 20px -3px rgba(15, 23, 42, 0.06)' }}
                transition={{ duration: 0.15 }}
                style={{
                  padding: 18,
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border-default)',
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                    {tech.name}
                    {tech.verified && <ShieldCheck size={14} style={{ color: 'var(--accent-primary)' }} />}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                    {isInstalled ? (
                      hasUpdate ? (
                        <span style={{ color: '#D97706', fontWeight: 600 }}>v{version} • Update to v{latestVersion}</span>
                      ) : (
                        <span style={{ color: '#16A34A', fontWeight: 600 }}>v{version || tech.version} • Up to date</span>
                      )
                    ) : (
                      `Available • ${tech.version}`
                    )}
                  </div>
                </div>

                <motion.button
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  className={`btn btn-sm ${isInstalled ? (hasUpdate ? 'btn-primary' : 'btn-secondary') : 'btn-primary'}`}
                  style={hasUpdate ? { backgroundColor: '#D97706', borderColor: '#D97706', color: '#FFFFFF' } : {}}
                  onClick={() => onInstallTech?.(hasUpdate ? { ...tech, isUpgrade: true, hasUpdate: true } : tech)}
                >
                  <Zap size={13} />
                  {isInstalled ? (hasUpdate ? 'Update' : 'Reinstall') : 'Install'}
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
