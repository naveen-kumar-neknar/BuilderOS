import React, { useState, useEffect, useCallback } from 'react';
import { 
  Cpu, 
  Sparkles, 
  Database, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw, 
  Loader2, 
  ShieldCheck
} from 'lucide-react';
import { getHealth } from '../services/installer';
import { useToast } from '../context/ToastContext';

export default function Settings() {
  const { showToast } = useToast();
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchHealth = useCallback(async (isManual = false) => {
    setLoading(true);
    try {
      const data = await getHealth();
      setHealth(data);
      if (isManual) {
        showToast('Environment health checked successfully.', 'success');
      }
    } catch {
      if (isManual) {
        showToast('Failed to reach backend server.', 'error');
      }
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchHealth(false);
  }, [fetchHealth]);

  return (
    <div style={{ maxWidth: 800 }}>
      <div className="page-header">
        <h1 className="page-title">Platform Settings</h1>
        <p className="page-subtitle">
          Manage local installer connections, database sync, and AI provider configurations.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Local Installer Agent Status */}
        <div style={{ padding: 24, backgroundColor: '#FFFFFF', border: '1px solid var(--border-default)', borderRadius: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Cpu size={20} style={{ color: 'var(--accent-primary)' }} />
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600 }}>BuilderOS Local Installer Agent</h3>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                  Native background daemon executing OS recipes (winget, brew, apt) with path verification.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => fetchHealth(true)}
              disabled={loading}
            >
              {loading ? <Loader2 size={13} className="spin" /> : <RotateCcw size={13} />}
              Test Connection
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, padding: 14, backgroundColor: 'var(--bg-secondary)', borderRadius: 8, fontSize: 13 }}>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: 11, textTransform: 'uppercase', fontWeight: 600 }}>Endpoint</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}>http://127.0.0.1:7331</div>
            </div>

            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: 11, textTransform: 'uppercase', fontWeight: 600 }}>Daemon Status</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, color: health?.agent ? 'var(--success)' : 'var(--danger)' }}>
                {health?.agent ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                {health?.agent ? 'Connected & Ready' : 'Offline (Run npm run agent)'}
              </div>
            </div>

            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: 11, textTransform: 'uppercase', fontWeight: 600 }}>Platform</div>
              <div style={{ fontWeight: 500, textTransform: 'capitalize' }}>{health?.platform || 'win32'}</div>
            </div>
          </div>
        </div>

        {/* Featherless AI Status */}
        <div style={{ padding: 24, backgroundColor: '#FFFFFF', border: '1px solid var(--border-default)', borderRadius: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <Sparkles size={20} style={{ color: 'var(--accent-primary)' }} />
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 600 }}>Featherless AI Inference</h3>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                Server-side OpenAI-compatible API client powering intelligent recommendations and troubleshooting.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, padding: 14, backgroundColor: 'var(--bg-secondary)', borderRadius: 8, fontSize: 13 }}>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: 11, textTransform: 'uppercase', fontWeight: 600 }}>Active Model</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}>
                {health?.featherless?.model || 'Qwen/Qwen2.5-7B-Instruct'}
              </div>
            </div>

            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: 11, textTransform: 'uppercase', fontWeight: 600 }}>Configuration</div>
              <div style={{ fontWeight: 600, color: health?.featherless?.configured ? 'var(--success)' : 'var(--text-secondary)' }}>
                {health?.featherless?.configured ? '✓ API Key Configured' : 'Fallback Catalog Mode'}
              </div>
            </div>

            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: 11, textTransform: 'uppercase', fontWeight: 600 }}>Security</div>
              <div style={{ color: 'var(--success)', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 500 }}>
                <ShieldCheck size={14} /> Server-side proxy
              </div>
            </div>
          </div>
        </div>

        {/* MongoDB Database Status */}
        <div style={{ padding: 24, backgroundColor: '#FFFFFF', border: '1px solid var(--border-default)', borderRadius: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <Database size={20} style={{ color: 'var(--accent-primary)' }} />
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 600 }}>Database Integration</h3>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                MongoDB synchronization for persistent accounts, installation records, and stack definitions.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 14, backgroundColor: 'var(--bg-secondary)', borderRadius: 8, fontSize: 13 }}>
            <div>
              <div style={{ fontWeight: 600 }}>
                {health?.mongo ? 'MongoDB Connected' : 'In-Memory / Local Storage Fallback Mode'}
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: 12, marginTop: 2 }}>
                {health?.mongo
                  ? 'Active connection to MongoDB Atlas / Local MongoDB instance.'
                  : 'Platform is operating with persistent local storage and in-memory registry fallback.'}
              </div>
            </div>
            <span className={`badge ${health?.mongo ? 'badge-installed' : 'badge-neutral'}`}>
              {health?.mongo ? 'Online' : 'Active Fallback'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
