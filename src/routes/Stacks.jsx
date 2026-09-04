import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, CheckCircle2, Circle, Plus, X, Trash2 } from 'lucide-react';
import PRESET_STACKS from '../data/stacksData';
import StackInstallPlanModal from '../components/installation/StackInstallPlanModal';

export default function Stacks({
  technologies = [],
  detectedInstalls = {},
  onInstalled,
  onShowToast
}) {
  const [activePlanStack, setActivePlanStack] = useState(null);
  const [isCreatingStack, setIsCreatingStack] = useState(false);
  const [customStacks, setCustomStacks] = useState(() => {
    try {
      const saved = localStorage.getItem('hw_custom_stacks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // New stack form state
  const [newStackName, setNewStackName] = useState('');
  const [newStackRole, setNewStackRole] = useState('');
  const [newStackDesc, setNewStackDesc] = useState('');
  const [newStackSlugs, setNewStackSlugs] = useState([]);

  const handleOpenPlan = (stack) => {
    setActivePlanStack(stack);
  };

  const handleCreateStack = (e) => {
    e.preventDefault();
    if (!newStackName.trim() || newStackSlugs.length === 0) {
      onShowToast?.('Please provide a stack name and select at least one technology.', 'error');
      return;
    }

    const newStack = {
      id: `custom-${Date.now()}`,
      name: newStackName.trim(),
      role: newStackRole.trim() || 'Custom Workflow',
      description: newStackDesc.trim() || 'User-defined developer technology stack.',
      slugs: newStackSlugs,
      isCustom: true
    };

    const updated = [newStack, ...customStacks];
    setCustomStacks(updated);
    try {
      localStorage.setItem('hw_custom_stacks', JSON.stringify(updated));
    } catch {}

    onShowToast?.(`Stack "${newStack.name}" created successfully!`, 'success');
    setIsCreatingStack(false);
    setNewStackName('');
    setNewStackRole('');
    setNewStackDesc('');
    setNewStackSlugs([]);
  };

  const handleDeleteCustomStack = (id) => {
    const updated = customStacks.filter((s) => s.id !== id);
    setCustomStacks(updated);
    try {
      localStorage.setItem('hw_custom_stacks', JSON.stringify(updated));
    } catch {}
    onShowToast?.('Custom stack deleted.', 'info');
  };

  const toggleSlug = (slug) => {
    setNewStackSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const allStacks = [...customStacks, ...PRESET_STACKS];

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 className="page-title">Development Stacks</h1>
          <p className="page-subtitle">
            Curated, multi-package environments engineered for specific development roles and workflows.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => setIsCreatingStack(true)}
        >
          <Plus size={14} />
          Create Custom Stack
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24 }}>
        {allStacks.map((stack) => {
          const stackTechs = technologies.filter((t) => stack.slugs.includes(t.slug));
          const installedCount = stack.slugs.filter((s) => detectedInstalls[s]?.installed).length;
          const allInstalled = installedCount === stack.slugs.length;

          return (
            <motion.div
              key={stack.id}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.15 }}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border-default)',
                borderRadius: 12,
                padding: 24,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 'var(--shadow-xs)',
                position: 'relative'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div>
                    <h3 style={{ fontSize: 18, fontWeight: 700 }}>{stack.name}</h3>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{stack.role}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {allInstalled ? (
                      <span className="badge badge-installed">✓ Fully Installed</span>
                    ) : (
                      <span className="badge badge-neutral">
                        {installedCount} of {stack.slugs.length} installed
                      </span>
                    )}

                    {stack.isCustom && (
                      <button
                        type="button"
                        className="btn-icon"
                        style={{ padding: 4 }}
                        onClick={() => handleDeleteCustomStack(stack.id)}
                        title="Delete custom stack"
                      >
                        <Trash2 size={14} style={{ color: 'var(--text-muted)' }} />
                      </button>
                    )}
                  </div>
                </div>

                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 20 }}>
                  {stack.description}
                </p>

                {/* Technology list inside stack */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
                  {stackTechs.map((tech) => {
                    const isInstalled = detectedInstalls[tech.slug]?.installed;
                    const version = detectedInstalls[tech.slug]?.version;

                    return (
                      <div
                        key={tech.slug}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '8px 12px',
                          borderRadius: 6,
                          backgroundColor: 'var(--bg-secondary)',
                          border: '1px solid var(--border-default)',
                          fontSize: 13
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          {isInstalled ? (
                            <CheckCircle2 size={15} style={{ color: 'var(--success)' }} />
                          ) : (
                            <Circle size={15} style={{ color: 'var(--text-muted)' }} />
                          )}
                          <span style={{ fontWeight: 500 }}>{tech.name}</span>
                        </div>
                        <span style={{ fontSize: 11, color: isInstalled ? 'var(--success)' : 'var(--text-muted)' }}>
                          {isInstalled ? `Installed (${version || tech.version})` : 'Missing'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

                <motion.button
                  type="button"
                  className="btn btn-primary btn-md"
                  style={{ width: '100%' }}
                  onClick={() => handleOpenPlan(stack)}
                  whileTap={{ scale: 0.96 }}
                >
                  <Zap size={14} />
                  {allInstalled ? 'Review & Reinstall Stack' : 'Customize & Install Stack'}
                </motion.button>
            </motion.div>
          );
        })}
      </div>

      {/* Plan & Install Modal */}
      <AnimatePresence>
        {activePlanStack && (
          <StackInstallPlanModal
            title={`Install ${activePlanStack.name}`}
            description={activePlanStack.description}
            technologies={technologies.filter((t) => activePlanStack.slugs.includes(t.slug))}
            detectedInstalls={detectedInstalls}
            onClose={() => setActivePlanStack(null)}
            onInstalled={onInstalled}
            onShowToast={onShowToast}
          />
        )}
      </AnimatePresence>

      {/* Create Custom Stack Modal */}
      <AnimatePresence>
        {isCreatingStack && (
          <motion.div 
            className="sheet-overlay" 
            onClick={() => setIsCreatingStack(false)} 
            style={{ justifyContent: 'center', alignItems: 'center' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
          >
            <motion.div 
              className="sheet-content" 
              onClick={(e) => e.stopPropagation()} 
              style={{ maxWidth: 540, height: 'auto', maxHeight: '90vh', borderRadius: 12, boxShadow: 'var(--shadow-modal)' }}
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            >
              <div className="sheet-header">
                <div>
                  <h2 style={{ fontSize: 18, fontWeight: 700 }}>Create Custom Stack</h2>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Assemble your preferred tools into a reusable template.</p>
                </div>
                <motion.button 
                  type="button" 
                  className="btn-icon" 
                  onClick={() => setIsCreatingStack(false)}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={18} />
                </motion.button>
              </div>

              <form onSubmit={handleCreateStack} className="sheet-body">
                <div className="form-group">
                  <label className="form-label">Stack Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Next.js Fullstack Cloud"
                    value={newStackName}
                    onChange={(e) => setNewStackName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Target Role / Specialty</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Senior Frontend Engineer"
                    value={newStackRole}
                    onChange={(e) => setNewStackRole(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Description</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Brief description of workflow..."
                    value={newStackDesc}
                    onChange={(e) => setNewStackDesc(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Select Technologies ({newStackSlugs.length} chosen)</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, maxHeight: 200, overflowY: 'auto', padding: 8, border: '1px solid var(--border-default)', borderRadius: 8 }}>
                    {technologies.map((t) => {
                      const selected = newStackSlugs.includes(t.slug);
                      return (
                        <div
                          key={t.slug}
                          onClick={() => toggleSlug(t.slug)}
                          style={{
                            padding: '6px 10px',
                            borderRadius: 6,
                            fontSize: 13,
                            cursor: 'pointer',
                            backgroundColor: selected ? 'var(--accent-subtle)' : '#FFFFFF',
                            border: `1px solid ${selected ? 'var(--accent-border)' : 'var(--border-default)'}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}
                        >
                          <span>{t.name}</span>
                          {selected && <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>✓</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 12 }}>
                  <motion.button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setIsCreatingStack(false)}
                    whileTap={{ scale: 0.96 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button 
                    type="submit" 
                    className="btn btn-primary"
                    whileTap={{ scale: 0.96 }}
                  >
                    Save Stack
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
