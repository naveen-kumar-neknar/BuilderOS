import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, Clock, Loader2, Share2, Check } from 'lucide-react';
import { getActivity } from '../services/installer';
import { useToast } from '../context/ToastContext';

export default function Activity({ detectedInstalls = {} }) {
  const { showToast } = useToast();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'completed' | 'error'
  const [copiedLogs, setCopiedLogs] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadActivity() {
      try {
        const res = await getActivity();
        if (isMounted) {
          setHistory(res.history || []);
        }
      } catch {
        if (isMounted) {
          setHistory([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    loadActivity();
    return () => {
      isMounted = false;
    };
  }, []);

  const formatGroup = (dateStr) => {
    if (!dateStr) return 'Today';
    const date = new Date(dateStr);
    const today = new Date();
    if (date.toDateString() === today.toDateString()) return 'Today';
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const rawItems = useMemo(() => {
    if (history.length > 0) return history;
    const items = [];
    if (detectedInstalls.nodejs?.installed) {
      items.push({ slug: 'nodejs', name: 'Node.js', version: detectedInstalls.nodejs.version || '24.19.0', status: 'completed', createdAt: new Date().toISOString() });
    }
    if (detectedInstalls.git?.installed) {
      items.push({ slug: 'git', name: 'Git', version: detectedInstalls.git.version || '2.47.1', status: 'completed', createdAt: new Date().toISOString() });
    }
    return items;
  }, [history, detectedInstalls.nodejs, detectedInstalls.git]);

  const filteredItems = useMemo(() => {
    if (statusFilter === 'all') return rawItems;
    return rawItems.filter((i) => i.status === statusFilter);
  }, [rawItems, statusFilter]);

  const grouped = useMemo(() => {
    return filteredItems.reduce((acc, item) => {
      const group = formatGroup(item.createdAt);
      if (!acc[group]) acc[group] = [];
      acc[group].push(item);
      return acc;
    }, {});
  }, [filteredItems]);

  const handleExportLogs = () => {
    navigator.clipboard.writeText(JSON.stringify(filteredItems, null, 2));
    setCopiedLogs(true);
    showToast('Activity history copied to clipboard.', 'success');
    setTimeout(() => setCopiedLogs(false), 2000);
  };

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 className="page-title">Activity</h1>
          <p className="page-subtitle">
            Timeline of verified installations, upgrades, and local machine configuration.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={handleExportLogs}
          >
            {copiedLogs ? <Check size={14} className="text-success" /> : <Share2 size={14} />}
            Export Log
          </button>
        </div>
      </div>

      {/* Filter Chips */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        <button
          type="button"
          className={`btn btn-sm ${statusFilter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setStatusFilter('all')}
          style={{ borderRadius: 9999 }}
        >
          All Activity ({rawItems.length})
        </button>
        <button
          type="button"
          className={`btn btn-sm ${statusFilter === 'completed' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setStatusFilter('completed')}
          style={{ borderRadius: 9999 }}
        >
          Completed
        </button>
        <button
          type="button"
          className={`btn btn-sm ${statusFilter === 'error' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setStatusFilter('error')}
          style={{ borderRadius: 9999 }}
        >
          Failed
        </button>
      </div>

      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 32, color: 'var(--text-muted)' }}>
          <Loader2 size={16} className="spin" />
          <span>Loading activity history...</span>
        </div>
      ) : Object.keys(grouped).length === 0 ? (
        <div style={{ padding: 48, textAlign: 'center', backgroundColor: '#FFFFFF', border: '1px solid var(--border-default)', borderRadius: 12 }}>
          <Clock size={32} style={{ color: 'var(--text-muted)', margin: '0 auto 12px auto' }} />
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>No installation activity found</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
            {statusFilter !== 'all' ? 'Try changing the filter to view all events.' : 'As you install and verify tools through BuilderOS, the activity will appear on this timeline.'}
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {Object.entries(grouped).map(([groupTitle, items]) => (
            <div key={groupTitle}>
              <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: 12 }}>
                {groupTitle}
              </div>

              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-default)', borderRadius: 12, overflow: 'hidden' }}>
                {items.map((item, idx) => {
                  const isSuccess = item.status === 'completed';
                  const isError = item.status === 'error';

                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.15, delay: idx * 0.02 }}
                      style={{
                        padding: '16px 20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottom: idx === items.length - 1 ? 'none' : '1px solid var(--border-default)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        {isSuccess ? (
                          <CheckCircle2 size={18} style={{ color: 'var(--success)' }} />
                        ) : isError ? (
                          <AlertCircle size={18} style={{ color: 'var(--danger)' }} />
                        ) : (
                          <Loader2 size={18} className="spin" style={{ color: 'var(--accent-primary)' }} />
                        )}

                        <div>
                          <div style={{ fontSize: 15, fontWeight: 600 }}>
                            {item.name || item.slug} {isSuccess ? 'installed' : isError ? 'installation failed' : 'installing'}
                          </div>
                          <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>
                            Version {item.version || 'detected'} • Recipe executed by BuilderOS Agent
                          </div>
                        </div>
                      </div>

                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                        {item.createdAt ? new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recently'}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
