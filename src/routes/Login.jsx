import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Login() {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const from = location.state?.from?.pathname || '/app';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide your email address and password.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      showToast('Welcome back to BuilderOS!', 'success');
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('demo@hackwave.dev');
    setPassword('hackwave2026');
    setError('');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <div className="sidebar-brand-mark">H</div>
            <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              BuilderOS
            </span>
          </Link>
          <h1 className="auth-title">Log in to BuilderOS</h1>
          <p className="auth-subtitle">Manage your local development environment</p>
        </div>

        {error && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', backgroundColor: 'var(--danger-bg)', border: '1px solid var(--danger-border)', borderRadius: 8, color: 'var(--danger)', fontSize: 13, marginBottom: 18 }}>
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="developer@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="form-label" htmlFor="password">Password</label>
              <Link to="/forgot-password" style={{ fontSize: 12, color: 'var(--accent-primary)' }}>
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg"
            style={{ width: '100%', marginTop: 8 }}
            disabled={loading}
          >
            {loading ? <Loader2 size={16} className="spin" /> : 'Log In'}
          </button>
        </form>

        {/* Demo Credentials Quick Fill Helper */}
        <div style={{ marginTop: 20, padding: 12, backgroundColor: 'var(--bg-secondary)', borderRadius: 8, border: '1px solid var(--border-default)', textAlign: 'center' }}>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>
            Testing or reviewing the application?
          </div>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={handleFillDemo}
            style={{ width: '100%' }}
          >
            <Sparkles size={13} />
            Use Demo Account (demo@hackwave.dev)
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: 24, fontSize: 13, color: 'var(--text-secondary)' }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ fontWeight: 600 }}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
