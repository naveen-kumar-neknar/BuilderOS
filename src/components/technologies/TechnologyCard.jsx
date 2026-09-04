import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Terminal, 
  Zap, 
  Check, 
  Code, 
  Package, 
  Braces, 
  Table2, 
  Atom, 
  Globe, 
  Server, 
  GitBranch, 
  Container, 
  Database, 
  BookOpen, 
  Calculator, 
  Layers, 
  Sparkles, 
  ArrowUpRight,
  BarChart2,
  PieChart,
  Activity,
  Cpu,
  RefreshCw,
  Boxes
} from 'lucide-react';
import { getTechEraBadge, getTechDomain } from '../../data/categoriesData';

const ICON_MAP = {
  Code,
  Package,
  Braces,
  Table2,
  Atom,
  Globe,
  Server,
  GitBranch,
  Container,
  Database,
  BookOpen,
  Calculator,
  Layers,
  Sparkles,
  Zap,
  BarChart2,
  PieChart,
  Activity,
  Cpu,
  Boxes
};

// VIBRANT DOMAIN THEMES - ZERO PURPLE
const DOMAIN_THEMES = {
  frontend: {
    gradient: 'linear-gradient(90deg, #10B981 0%, #06B6D4 100%)',
    accent: '#059669',
    lightBg: 'rgba(16, 185, 129, 0.08)',
    borderColor: 'rgba(16, 185, 129, 0.35)',
    shadowGlow: 'rgba(16, 185, 129, 0.16)',
    tagBg: '#ECFDF5',
    tagColor: '#047857',
    tagBorder: '#A7F3D0'
  },
  backend: {
    gradient: 'linear-gradient(90deg, #F97316 0%, #EA580C 100%)',
    accent: '#EA580C',
    lightBg: 'rgba(249, 115, 22, 0.08)',
    borderColor: 'rgba(249, 115, 22, 0.35)',
    shadowGlow: 'rgba(249, 115, 22, 0.16)',
    tagBg: '#FFF7ED',
    tagColor: '#C2410C',
    tagBorder: '#FED7AA'
  },
  integration: {
    gradient: 'linear-gradient(90deg, #0284C7 0%, #06B6D4 100%)',
    accent: '#0284C7',
    lightBg: 'rgba(2, 132, 199, 0.08)',
    borderColor: 'rgba(2, 132, 199, 0.35)',
    shadowGlow: 'rgba(2, 132, 199, 0.16)',
    tagBg: '#F0F9FF',
    tagColor: '#0369A1',
    tagBorder: '#BAE6FD'
  }
};

export default function TechnologyCard({ 
  tech, 
  isInstalled, 
  installedVersion, 
  hasUpdate,
  latestVersion,
  onInstall 
}) {
  const [copied, setCopied] = useState(false);
  const IconComponent = ICON_MAP[tech.iconName] || Code;

  const defaultCli = tech.cli?.windows || tech.cli?.macos || tech.cli?.linux || `npm install ${tech.slug}`;

  const handleCopyCli = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(defaultCli);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const domain = getTechDomain(tech);
  const theme = DOMAIN_THEMES[domain] || DOMAIN_THEMES.integration;
  const eraBadge = getTechEraBadge(tech);

  // Dynamic pricing pills with vibrant colors (ZERO PURPLE)
  const isFree = tech.pricing === 'free' || tech.pricingTier === 'Free & Open Source';
  const isFreemium = tech.pricing === 'freemium' || tech.pricingTier === 'Freemium';
  const pricingLabel = isFree ? '🟢 100% Free / FOSS' : isFreemium ? '🔵 Freemium' : '🟠 Commercial API';

  const domainLabel = 
    domain === 'frontend' ? '💻 Frontend' : 
    domain === 'backend' ? '⚙️ Backend' : 
    (tech.category === 'ai' ? '🤖 AI & Data' : '🔗 Integration & DB');

  return (
    <motion.div 
      className="tech-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.12 }}
      whileHover={{ 
        y: -5, 
        borderColor: theme.accent,
        boxShadow: `0 16px 36px -4px ${theme.shadowGlow}` 
      }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      style={{ 
        overflow: 'hidden',
        border: `1.5px solid ${theme.borderColor}`,
        boxShadow: `0 4px 18px -2px ${theme.shadowGlow}`,
        backgroundColor: '#FFFFFF'
      }}
    >
      {/* Top Colorful Domain Stripe */}
      <div 
        className="tech-card-color-stripe" 
        style={{ background: theme.gradient }} 
      />

      <div>
        {/* Top Badges Row: Domain & Generation/Era */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
          <span 
            className="badge" 
            style={{ 
              fontSize: 11, 
              fontWeight: 600, 
              color: eraBadge.color, 
              backgroundColor: eraBadge.bg, 
              border: `1px solid ${eraBadge.border}`,
              padding: '3px 8px'
            }}
          >
            {eraBadge.emoji} {eraBadge.label}
          </span>

          <span 
            className="badge" 
            style={{ 
              fontSize: 11, 
              fontWeight: 600, 
              backgroundColor: theme.tagBg,
              color: theme.tagColor,
              border: `1px solid ${theme.tagBorder}`,
              padding: '3px 8px'
            }}
          >
            {domainLabel}
          </span>
        </div>

        {/* Card Header: Icon + Title + Meta */}
        <div className="tech-card-header">
          <div 
            className="tech-card-icon" 
            style={{ 
              backgroundColor: theme.lightBg,
              color: tech.iconBg || theme.accent,
              borderColor: theme.tagBorder,
              boxShadow: `0 4px 12px -2px ${theme.shadowGlow}`
            }}
          >
            <IconComponent size={22} />
          </div>

          <div className="tech-card-title-wrap">
            <Link 
              to={`/technology/${tech.slug}`}
              className="tech-card-title"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <span>{tech.name}</span>
              {tech.verified && (
                <ShieldCheck size={16} style={{ color: '#0EA5E9' }} title="Verified native recipe" />
              )}
              <ArrowUpRight size={14} style={{ color: 'var(--text-muted)', opacity: 0.6 }} />
            </Link>

            <div className="tech-card-meta" style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 500 }}>{tech.type || tech.category}</span>
              <span>•</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>v{tech.version}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="tech-card-desc">{tech.description}</p>

        {/* Pricing Badge & Platforms */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, marginBottom: 8, gap: 6, flexWrap: 'wrap' }}>
          <span 
            style={{ 
              fontSize: 11, 
              fontWeight: 600, 
              padding: '2px 8px', 
              borderRadius: 9999, 
              backgroundColor: isFree ? '#ECFDF5' : isFreemium ? '#F0F9FF' : '#FFFBEB', 
              color: isFree ? '#047857' : isFreemium ? '#0369A1' : '#B45309', 
              border: `1px solid ${isFree ? '#A7F3D0' : isFreemium ? '#BAE6FD' : '#FDE68A'}` 
            }}
          >
            {pricingLabel}
          </span>
          <div className="tech-card-platforms" style={{ marginTop: 0, marginBottom: 0 }}>
            {tech.platforms?.map((p) => (
              <span key={p} className="badge badge-neutral" style={{ textTransform: 'capitalize', fontSize: 10, padding: '2px 6px' }}>
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer: Status Badge + Actions */}
      <div className="tech-card-footer">
        <div>
          {isInstalled ? (
            hasUpdate ? (
              <span className="badge-status-update">
                <span className="status-dot amber-pulse" />
                Update to v{latestVersion}
              </span>
            ) : (
              <span className="badge-status-installed">
                <span className="status-dot green-pulse" />
                Up to date {installedVersion ? `(${installedVersion})` : ''}
              </span>
            )
          ) : (
            <span className="badge-status-uninstalled">
              <span className="status-dot gray-dot" />
              Not installed
            </span>
          )}
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <motion.button
            type="button"
            className="btn-cli-terminal"
            onClick={handleCopyCli}
            title={`Copy CLI: ${defaultCli}`}
            whileTap={{ scale: 0.95 }}
            style={{ padding: '5px 9px', borderRadius: 6 }}
          >
            {copied ? <Check size={13} style={{ color: '#10B981' }} /> : <Terminal size={13} style={{ color: '#0EA5E9' }} />}
            CLI
          </motion.button>

          {isInstalled && hasUpdate ? (
            <motion.button
              type="button"
              className="btn-update-vibrant"
              style={{ padding: '5px 12px', fontSize: 12.5, borderRadius: 6 }}
              onClick={() => onInstall?.({ ...tech, isUpgrade: true, latestVersion, hasUpdate: true })}
              whileTap={{ scale: 0.95 }}
            >
              <RefreshCw size={13} />
              Update
            </motion.button>
          ) : (
            <motion.button
              type="button"
              className={isInstalled ? 'btn-reinstall-subtle' : 'btn-install-vibrant'}
              style={{ padding: '5px 12px', fontSize: 12.5, borderRadius: 6 }}
              onClick={() => onInstall?.(tech)}
              whileTap={{ scale: 0.95 }}
            >
              <Zap size={13} fill={isInstalled ? 'none' : '#FCD34D'} color={isInstalled ? 'currentColor' : '#FCD34D'} />
              {isInstalled ? 'Reinstall' : 'Install Now'}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
