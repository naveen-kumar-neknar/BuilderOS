import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { 
  Search, 
  X, 
  Sparkles, 
  DollarSign, 
  Layers, 
  Code, 
  Server, 
  Boxes, 
  ArrowUp, 
  LayoutGrid, 
  ListFilter,
  Clock
} from 'lucide-react';
import TechnologyCard from '../components/technologies/TechnologyCard';
import { 
  CATEGORIES, 
  DOMAINS, 
  ERAS, 
  getTechDomain, 
  getTechEra 
} from '../data/categoriesData';

export default function Explore({
  technologies = [],
  detectedInstalls = {},
  onSelectTech,
  onInstallTech
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPricing, setSelectedPricing] = useState('all'); // 'all' | 'free' | 'paid'
  const [selectedDomain, setSelectedDomain] = useState('all'); // 'all' | 'frontend' | 'backend' | 'integration'
  const [selectedEra, setSelectedEra] = useState('all'); // 'all' | 'new' | 'current' | 'classic'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grouped'); // 'grouped' | 'grid'
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll progress for top indicator
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setShowScrollTop(latest > 350);
    });
  }, [scrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Pricing statistics
  const pricingStats = useMemo(() => {
    const freeCount = technologies.filter(t => (t.pricing || 'free') === 'free').length;
    const paidCount = technologies.filter(t => t.pricing === 'paid' || t.pricing === 'freemium').length;
    return { freeCount, paidCount, totalCount: technologies.length };
  }, [technologies]);

  // Filtered technologies
  const filteredTechnologies = useMemo(() => {
    return technologies.filter((tech) => {
      // 1. Top-level Free vs. Paid filter
      if (selectedPricing === 'free') {
        if ((tech.pricing || 'free') !== 'free') return false;
      } else if (selectedPricing === 'paid') {
        if (tech.pricing !== 'paid' && tech.pricing !== 'freemium') return false;
      }

      // 2. Domain filter (Frontend vs Backend vs Integration)
      const domain = getTechDomain(tech);
      if (selectedDomain !== 'all' && domain !== selectedDomain) {
        return false;
      }

      // 3. Era filter (New vs Current vs Classic/Old)
      const era = getTechEra(tech);
      if (selectedEra !== 'all' && era !== selectedEra) {
        return false;
      }

      // 4. Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'vcs' && !['vcs', 'containers'].includes(tech.category)) {
          return false;
        } else if (selectedCategory !== 'vcs' && tech.category !== selectedCategory) {
          return false;
        }
      }

      // 5. Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = tech.name?.toLowerCase().includes(q);
        const matchDesc = tech.description?.toLowerCase().includes(q);
        const matchCategory = tech.category?.toLowerCase().includes(q);
        const matchEcosystem = tech.ecosystem?.toLowerCase().includes(q);
        const matchType = tech.type?.toLowerCase().includes(q);
        if (!matchName && !matchDesc && !matchCategory && !matchEcosystem && !matchType) {
          return false;
        }
      }

      return true;
    });
  }, [technologies, selectedPricing, selectedDomain, selectedEra, selectedCategory, searchQuery]);

  // Group filtered technologies into Frontend, Backend, and Integration
  const groupedTechnologies = useMemo(() => {
    return {
      frontend: filteredTechnologies.filter(t => getTechDomain(t) === 'frontend'),
      backend: filteredTechnologies.filter(t => getTechDomain(t) === 'backend'),
      integration: filteredTechnologies.filter(t => getTechDomain(t) === 'integration')
    };
  }, [filteredTechnologies]);

  const hasActiveFilters = searchQuery || selectedPricing !== 'all' || selectedDomain !== 'all' || selectedEra !== 'all' || selectedCategory !== 'all';

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedPricing('all');
    setSelectedDomain('all');
    setSelectedEra('all');
    setSelectedCategory('all');
  };

  return (
    <div style={{ position: 'relative', paddingBottom: 60 }}>
      {/* Top Sliding Scroll Progress Indicator */}
      <motion.div
        style={{
          scaleX,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: 'linear-gradient(90deg, #10B981 0%, #0284C7 50%, #06B6D4 100%)',
          zIndex: 9999,
          transformOrigin: '0%'
        }}
      />

      {/* Page Header */}
      <motion.div 
        className="page-header"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span>Developer Technologies & Architectures</span>
            </h1>
            <p className="page-subtitle">
              Configure your workstation with native tools across frontend, backend, and integration options.
            </p>
          </div>

          {/* View Mode Switcher (Grouped vs Grid) */}
          <div style={{ display: 'flex', gap: 6, backgroundColor: '#FFFFFF', padding: 4, borderRadius: 8, border: '1px solid var(--border-default)' }}>
            <button
              type="button"
              className={`btn btn-xs ${viewMode === 'grouped' ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setViewMode('grouped')}
              style={{ fontSize: 12, borderRadius: 6 }}
              title="View separated by Frontend, Backend, and Integration layers"
            >
              <ListFilter size={13} />
              Separated Architecture
            </button>
            <button
              type="button"
              className={`btn btn-xs ${viewMode === 'grid' ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setViewMode('grid')}
              style={{ fontSize: 12, borderRadius: 6 }}
              title="Standard Unified Grid"
            >
              <LayoutGrid size={13} />
              Grid
            </button>
          </div>
        </div>
      </motion.div>

      {/* ==================================================================== */}
      {/* 1. PROMINENT TOP-LEVEL FREE VS PAID SELECTION BUTTON BAR            */}
      {/* ==================================================================== */}
      <motion.div 
        style={{
          marginBottom: 20,
          padding: '16px 20px',
          background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
          border: '1px solid var(--border-default)',
          borderRadius: 14,
          boxShadow: '0 4px 20px -4px rgba(15, 23, 42, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          gap: 12
        }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg, #0284C7, #06B6D4)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(79, 70, 229, 0.3)' }}>
              <DollarSign size={16} />
            </div>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text-primary)' }}>
                Pricing & Licensing Access
              </div>
              <div style={{ fontSize: 11.5, color: 'var(--text-secondary)' }}>
                Filter instantly between 100% Free / FOSS and Commercial Cloud models
              </div>
            </div>
          </div>

          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            <span style={{ color: '#059669', fontWeight: 600 }}>{pricingStats.freeCount} Free Tools</span> • <span style={{ color: '#0F172A', fontWeight: 700 }}>{pricingStats.paidCount} Commercial / Cloud</span>
          </div>
        </div>

        {/* Free vs Paid Segmented Toggle Buttons on Top */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {[
            { 
              id: 'all', 
              label: '🌟 All Technologies', 
              count: pricingStats.totalCount, 
              selectedBg: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
              glow: 'rgba(15, 23, 42, 0.25)' 
            },
            { 
              id: 'free', 
              label: '🟢 100% Free / Open Source (FOSS)', 
              count: pricingStats.freeCount, 
              selectedBg: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
              glow: 'rgba(16, 185, 129, 0.35)' 
            },
            { 
              id: 'paid', 
              label: '💳 Paid & Commercial Cloud APIs', 
              count: pricingStats.paidCount, 
              selectedBg: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
              glow: 'rgba(15, 23, 42, 0.35)' 
            }
          ].map((item) => {
            const isSelected = selectedPricing === item.id;
            return (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => setSelectedPricing(item.id)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  padding: '9px 16px',
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: isSelected ? 700 : 500,
                  background: isSelected ? item.selectedBg : '#FFFFFF',
                  color: isSelected ? '#FFFFFF' : 'var(--text-primary)',
                  border: isSelected ? 'none' : '1px solid var(--border-default)',
                  boxShadow: isSelected ? `0 4px 14px ${item.glow}` : 'var(--shadow-xs)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>{item.label}</span>
                <span 
                  style={{
                    fontSize: 11,
                    padding: '2px 7px',
                    borderRadius: 9999,
                    backgroundColor: isSelected ? 'rgba(255,255,255,0.25)' : 'var(--bg-tertiary)',
                    color: isSelected ? '#FFFFFF' : 'var(--text-secondary)',
                    fontWeight: 600
                  }}
                >
                  {item.count}
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* ==================================================================== */}
      {/* 2. SEARCH BAR & DUAL SELECTORS: DOMAINS & ERAS (OLD/CURRENT/NEW)     */}
      {/* ==================================================================== */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 14, marginBottom: 16 }}>
        {/* Prominent Search Bar */}
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#6366F1' }}>
            <Search size={18} />
          </div>
          <input
            type="text"
            className="form-input"
            style={{
              padding: '12px 38px 12px 42px',
              fontSize: 14,
              borderRadius: 10,
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-default)',
              boxShadow: 'var(--shadow-xs)'
            }}
            placeholder="Search technologies, AI models, libraries... (e.g. PyTorch, React, Bun, Python)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="btn-icon"
              style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)' }}
              onClick={() => setSearchQuery('')}
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Old vs Current vs New Era Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', backgroundColor: '#FFFFFF', border: '1px solid var(--border-default)', borderRadius: 10 }}>
          <Clock size={15} style={{ color: '#F59E0B', flexShrink: 0 }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>Generation:</span>
          <div style={{ display: 'flex', gap: 4, overflowX: 'auto', flex: 1 }}>
            {ERAS.map((era) => {
              const isSelected = selectedEra === era.id;
              return (
                <button
                  key={era.id}
                  type="button"
                  className={`btn btn-xs ${isSelected ? 'btn-primary' : 'btn-ghost'}`}
                  onClick={() => setSelectedEra(era.id)}
                  style={{
                    fontSize: 11,
                    fontWeight: isSelected ? 700 : 500,
                    borderRadius: 6,
                    padding: '4px 8px',
                    whiteSpace: 'nowrap'
                  }}
                  title={era.desc}
                >
                  {era.shortLabel || era.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 3. ARCHITECTURAL DOMAIN SELECTOR: FRONTEND, BACKEND, INTEGRATION      */}
      {/* ==================================================================== */}
      <div style={{ marginBottom: 16, padding: '12px 16px', backgroundColor: '#FFFFFF', border: '1px solid var(--border-default)', borderRadius: 10, boxShadow: 'var(--shadow-xs)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, flexWrap: 'wrap', gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-secondary)' }}>
            Architecture Layer:
          </span>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
            Filter or inspect by component responsibility
          </span>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {DOMAINS.map((domain) => {
            const isSelected = selectedDomain === domain.id;
            const count = domain.id === 'all' 
              ? technologies.length 
              : technologies.filter(t => getTechDomain(t) === domain.id).length;

            const domainColors = {
              all: { bg: '#0F172A', text: '#FFFFFF', border: '#0F172A' },
              frontend: { bg: '#10B981', text: '#FFFFFF', border: '#10B981' },
              backend: { bg: '#F97316', text: '#FFFFFF', border: '#F97316' },
              integration: { bg: '#0284C7', text: '#FFFFFF', border: '#0284C7' }
            };

            const activeColor = domainColors[domain.id] || domainColors.all;

            return (
              <motion.button
                key={domain.id}
                type="button"
                onClick={() => setSelectedDomain(domain.id)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: isSelected ? 700 : 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '6px 12px',
                  backgroundColor: isSelected ? activeColor.bg : 'var(--bg-secondary)',
                  color: isSelected ? '#FFFFFF' : 'var(--text-primary)',
                  border: isSelected ? `1px solid ${activeColor.border}` : '1px solid var(--border-default)',
                  boxShadow: isSelected ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
                  cursor: 'pointer'
                }}
                title={domain.desc}
              >
                {domain.id === 'frontend' && <Code size={13} />}
                {domain.id === 'backend' && <Server size={13} />}
                {domain.id === 'integration' && <Boxes size={13} />}
                {domain.id === 'all' && <Layers size={13} />}
                <span>{domain.label}</span>
                <span 
                  style={{
                    fontSize: 10,
                    padding: '1px 5px',
                    borderRadius: 9999,
                    backgroundColor: isSelected ? 'rgba(255,255,255,0.25)' : 'var(--bg-tertiary)'
                  }}
                >
                  {count}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Category Pills Strip */}
      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 10, marginBottom: 16 }}>
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              className={`btn btn-xs ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                borderRadius: 9999,
                flexShrink: 0,
                fontSize: 11,
                padding: '4px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: 4
              }}
            >
              {cat.id === 'ai' && <Sparkles size={11} />}
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Filter Status Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, fontSize: 13, color: 'var(--text-secondary)' }}>
        <span>
          Showing <strong>{filteredTechnologies.length}</strong> {filteredTechnologies.length === 1 ? 'technology' : 'technologies'}
          {selectedPricing !== 'all' && ` • ${selectedPricing === 'free' ? '100% Free / FOSS' : 'Paid / Commercial'}`}
          {selectedDomain !== 'all' && ` • ${DOMAINS.find(d => d.id === selectedDomain)?.label}`}
          {selectedEra !== 'all' && ` • ${ERAS.find(e => e.id === selectedEra)?.label}`}
        </span>

        {hasActiveFilters && (
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={resetFilters}
            style={{ fontSize: 12 }}
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* ==================================================================== */}
      {/* 4. TECHNOLOGIES PRESENTATION: GROUPED ARCHITECTURE OR UNIFIED GRID   */}
      {/* ==================================================================== */}
      {filteredTechnologies.length === 0 ? (
        <motion.div 
          style={{ textAlign: 'center', padding: '64px 20px', backgroundColor: '#FFFFFF', border: '1px solid var(--border-default)', borderRadius: 12 }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>No matching technologies found</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 16 }}>
            Try resetting your pricing, domain, or generation filters to view available tools.
          </p>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={resetFilters}
          >
            Reset Filters
          </button>
        </motion.div>
      ) : viewMode === 'grouped' && selectedDomain === 'all' ? (
        /* Grouped View: Separate Frontend, Backend, and Integration Sections */
        <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
          {/* Section A: Frontend Technologies */}
          {groupedTechnologies.frontend.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{
                padding: '24px 24px 28px 24px',
                borderRadius: '20px',
                border: '1.5px solid rgba(16, 185, 129, 0.3)',
                backgroundColor: 'rgba(16, 185, 129, 0.02)',
                boxShadow: '0 8px 30px -6px rgba(16, 185, 129, 0.08)',
                marginBottom: 36
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, paddingBottom: 12, borderBottom: '1.5px solid rgba(16, 185, 129, 0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #10B981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)' }}>
                    <Code size={19} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>
                      Frontend Technologies ({groupedTechnologies.frontend.length})
                    </h2>
                    <p style={{ fontSize: 12.5, color: 'var(--text-secondary)' }}>
                      Client-side web libraries, React meta-frameworks, and utility-first design systems.
                    </p>
                  </div>
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 9999, backgroundColor: '#ECFDF5', color: '#047857', border: '1px solid #A7F3D0' }}>
                  Layer 01 • Client & UI
                </span>
              </div>

              <div className="tech-grid">
                {groupedTechnologies.frontend.map((tech) => (
                  <TechnologyCard
                    key={tech.slug}
                    tech={tech}
                    isInstalled={Boolean(detectedInstalls[tech.slug]?.installed)}
                    installedVersion={detectedInstalls[tech.slug]?.version}
                    hasUpdate={Boolean(detectedInstalls[tech.slug]?.hasUpdate)}
                    latestVersion={detectedInstalls[tech.slug]?.latestVersion}
                    onSelect={onSelectTech}
                    onInstall={onInstallTech}
                  />
                ))}
              </div>
            </motion.section>
          )}

          {/* Section B: Backend Technologies */}
          {groupedTechnologies.backend.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{
                padding: '24px 24px 28px 24px',
                borderRadius: '20px',
                border: '1.5px solid rgba(249, 115, 22, 0.3)',
                backgroundColor: 'rgba(249, 115, 22, 0.02)',
                boxShadow: '0 8px 30px -6px rgba(249, 115, 22, 0.08)',
                marginBottom: 36
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, paddingBottom: 12, borderBottom: '1.5px solid rgba(249, 115, 22, 0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #F97316, #EA580C)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', boxShadow: '0 4px 14px rgba(249, 115, 22, 0.3)' }}>
                    <Server size={19} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>
                      Backend & Server Runtimes ({groupedTechnologies.backend.length})
                    </h2>
                    <p style={{ fontSize: 12.5, color: 'var(--text-secondary)' }}>
                      Asynchronous application runtimes, REST API engines, and package manager foundations.
                    </p>
                  </div>
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 9999, backgroundColor: '#FFF7ED', color: '#C2410C', border: '1px solid #FED7AA' }}>
                  Layer 02 • Server & Runtimes
                </span>
              </div>

              <div className="tech-grid">
                {groupedTechnologies.backend.map((tech) => (
                  <TechnologyCard
                    key={tech.slug}
                    tech={tech}
                    isInstalled={Boolean(detectedInstalls[tech.slug]?.installed)}
                    installedVersion={detectedInstalls[tech.slug]?.version}
                    hasUpdate={Boolean(detectedInstalls[tech.slug]?.hasUpdate)}
                    latestVersion={detectedInstalls[tech.slug]?.latestVersion}
                    onSelect={onSelectTech}
                    onInstall={onInstallTech}
                  />
                ))}
              </div>
            </motion.section>
          )}

          {/* Section C: Integration, AI & Infrastructure Options */}
          {groupedTechnologies.integration.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{
                padding: '24px 24px 28px 24px',
                borderRadius: '20px',
                border: '1.5px solid rgba(2, 132, 199, 0.3)',
                backgroundColor: 'rgba(2, 132, 199, 0.02)',
                boxShadow: '0 8px 30px -6px rgba(2, 132, 199, 0.08)',
                marginBottom: 36
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, paddingBottom: 12, borderBottom: '1.5px solid rgba(2, 132, 199, 0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #0284C7, #06B6D4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', boxShadow: '0 4px 14px rgba(2, 132, 199, 0.3)' }}>
                    <Boxes size={19} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>
                      Integration, AI Models & Infrastructure Options ({groupedTechnologies.integration.length})
                    </h2>
                    <p style={{ fontSize: 12.5, color: 'var(--text-secondary)' }}>
                      Databases, local & cloud LLM pipelines, vector databases, DevOps, and container tools.
                    </p>
                  </div>
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 9999, backgroundColor: '#F0F9FF', color: '#0369A1', border: '1px solid #BAE6FD' }}>
                  Layer 03 • Integration & AI
                </span>
              </div>

              <div className="tech-grid">
                {groupedTechnologies.integration.map((tech) => (
                  <TechnologyCard
                    key={tech.slug}
                    tech={tech}
                    isInstalled={Boolean(detectedInstalls[tech.slug]?.installed)}
                    installedVersion={detectedInstalls[tech.slug]?.version}
                    hasUpdate={Boolean(detectedInstalls[tech.slug]?.hasUpdate)}
                    latestVersion={detectedInstalls[tech.slug]?.latestVersion}
                    onSelect={onSelectTech}
                    onInstall={onInstallTech}
                  />
                ))}
              </div>
            </motion.section>
          )}
        </div>
      ) : (
        /* Unified Grid View (or when single domain selected) */
        <motion.div 
          className="tech-grid"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.03 } }
          }}
        >
          {filteredTechnologies.map((tech) => (
            <TechnologyCard
              key={tech.slug}
              tech={tech}
              isInstalled={Boolean(detectedInstalls[tech.slug]?.installed)}
              installedVersion={detectedInstalls[tech.slug]?.version}
              hasUpdate={Boolean(detectedInstalls[tech.slug]?.hasUpdate)}
              latestVersion={detectedInstalls[tech.slug]?.latestVersion}
              onSelect={onSelectTech}
              onInstall={onInstallTech}
            />
          ))}
        </motion.div>
      )}

      {/* Floating Scroll-to-Top Button with Slide-Up Animation */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            type="button"
            className="btn btn-primary"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 25, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            style={{
              position: 'fixed',
              bottom: 28,
              right: 28,
              width: 44,
              height: 44,
              borderRadius: '50%',
              padding: 0,
              background: 'linear-gradient(135deg, #1D4ED8, #0284C7)',
              boxShadow: '0 8px 24px rgba(2, 132, 199, 0.4)',
              zIndex: 999
            }}
            title="Slide to top"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
