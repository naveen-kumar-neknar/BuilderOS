import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Calendar, Key, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Profile() {
  const { user, token, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    showToast('Signed out successfully.', 'info');
    navigate('/login');
  };

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
    : '2026';

  return (
    <div style={{ maxWidth: 640 }}>
      <div className="page-header">
        <h1 className="page-title">Developer Profile</h1>
        <p className="page-subtitle">Your BuilderOS account and session information.</p>
      </div>

      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-default)', borderRadius: 12, padding: 28, boxShadow: 'var(--shadow-xs)', marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: 'var(--accent-subtle)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 700 }}>
            {user?.name ? user.name[0].toUpperCase() : 'U'}
          </div>

          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700 }}>{user?.name || 'Developer'}</h2>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{user?.email || 'developer@hackwave.dev'}</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingTop: 16, borderTop: '1px solid var(--border-default)', fontSize: 13 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text-secondary)' }}>
            <Mail size={15} />
            <span>Email: </span>
            <strong style={{ color: 'var(--text-primary)' }}>{user?.email}</strong>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text-secondary)' }}>
            <Calendar size={15} />
            <span>Member since: </span>
            <strong style={{ color: 'var(--text-primary)' }}>{memberSince}</strong>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text-secondary)' }}>
            <Key size={15} />
            <span>Session Token: </span>
            <code style={{ fontSize: 12, padding: '2px 6px', backgroundColor: 'var(--bg-secondary)', borderRadius: 4 }}>
              {token ? `${token.slice(0, 16)}...` : 'Active'}
            </code>
          </div>
        </div>

        <div style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid var(--border-default)' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleLogout}
            style={{ color: 'var(--danger)' }}
          >
            <LogOut size={15} />
            Sign Out of BuilderOS
          </button>
        </div>
      </div>
    </div>
  );
}
