import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { authService } from '../services/auth';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setError('');
    setLoading(true);

    try {
      await authService.forgotPassword(email);
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to request password reset.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>
            <ArrowLeft size={14} /> Back to login
          </Link>
          <h1 className="auth-title">Reset password</h1>
          <p className="auth-subtitle">Enter your email and we'll send reset instructions</p>
        </div>

        {success ? (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <CheckCircle2 size={40} style={{ color: 'var(--success)', margin: '0 auto 12px auto' }} />
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>Check your inbox</h3>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 20 }}>
              If an account matches <strong>{email}</strong>, instructions to reset your password have been generated.
            </p>
            <Link to="/login" className="btn btn-secondary" style={{ width: '100%' }}>
              Return to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', backgroundColor: 'var(--danger-bg)', border: '1px solid var(--danger-border)', borderRadius: 8, color: 'var(--danger)', fontSize: 13, marginBottom: 18 }}>
                <AlertCircle size={16} style={{ flexShrink: 0 }} />
                <span>{error}</span>
              </div>
            )}

            <div className="form-group">
              <label className="form-label" htmlFor="email">Account Email</label>
              <input
                id="email"
                type="email"
                className="form-input"
                placeholder="developer@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ width: '100%', marginTop: 8 }}
              disabled={loading}
            >
              {loading ? <Loader2 size={16} className="spin" /> : 'Send Reset Link'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
