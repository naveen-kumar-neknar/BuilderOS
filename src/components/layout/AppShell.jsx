import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Clock, 
  Settings, 
  User, 
  LogOut, 
  Search
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getHealth } from '../../services/installer';
import CommandPalette from '../ui/CommandPalette';

export default function AppShell({ technologies = [], onSelectTech }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [agentConnected, setAgentConnected] = useState(false);
  const [agentPlatform, setAgentPlatform] = useState('win32');

  // Check agent health on mount
  useEffect(() => {
    let isMounted = true;
    async function checkAgent() {
      try {
        const health = await getHealth();
        if (isMounted) {
          setAgentConnected(Boolean(health.agent));
          setAgentPlatform(health.platform || 'win32');
        }
      } catch {
        if (isMounted) {
          setAgentConnected(false);
        }
      }
    }
    checkAgent();
    const interval = setInterval(checkAgent, 10000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="app-shell">
      {/* Desktop Sidebar */}
      <aside className="app-sidebar">
        <div>
          <NavLink to="/app" className="sidebar-brand">
            <div className="sidebar-brand-mark" style={{ background: 'linear-gradient(135deg, #0F172A 0%, #0284C7 100%)', color: '#FFFFFF', fontWeight: 800 }}>B</div>
            <span className="sidebar-brand-name">Builder<span style={{ color: '#0284C7' }}>OS</span></span>
          </NavLink>

          <nav className="sidebar-nav">
            <NavLink to="/explore" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <Compass size={18} />
              <span>Explore</span>
            </NavLink>

            <NavLink to="/ai" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <Sparkles size={18} />
              <span>AI Assistant</span>
            </NavLink>

            <NavLink to="/installed" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <CheckCircle2 size={18} />
              <span>Installed</span>
            </NavLink>

            <NavLink to="/stacks" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <Layers size={18} />
              <span>Stacks</span>
            </NavLink>

            <NavLink to="/activity" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <Clock size={18} />
              <span>Activity</span>
            </NavLink>
          </nav>
        </div>

        <div className="sidebar-footer">
          <NavLink to="/settings" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <Settings size={18} />
            <span>Settings</span>
          </NavLink>

          <NavLink to="/profile" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <User size={18} />
            <span>Profile</span>
          </NavLink>

          <button
            type="button"
            className="sidebar-link"
            onClick={handleLogout}
            style={{ width: '100%', textAlign: 'left', cursor: 'pointer' }}
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Application Area */}
      <div className="app-main">
        {/* Top Header */}
        <header className="app-header">
          <button
            type="button"
            className="header-search-btn"
            onClick={() => setIsPaletteOpen(true)}
            aria-label="Open command palette"
          >
            <Search size={15} />
            <span>Search or command...</span>
            <kbd className="header-kbd">Ctrl K</kbd>
          </button>

          <div className="header-actions">
            {/* Real Agent Indicator */}
            <div className="agent-indicator" title={agentConnected ? `Agent running on 127.0.0.1:7331 (${agentPlatform})` : 'Local installer offline. Run npm run agent'}>
              <span className={`agent-dot ${agentConnected ? 'online' : ''}`} />
              <span>{agentConnected ? 'Installer Active' : 'Installer Offline'}</span>
            </div>

            {/* Profile Pill */}
            <NavLink to="/profile" className="btn-icon" title="View profile" style={{ textDecoration: 'none' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: 'var(--accent-subtle)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>
                {user?.name ? user.name[0].toUpperCase() : 'U'}
              </div>
            </NavLink>
          </div>
        </header>

        {/* Content Outlet with smooth Framer Motion page transitions */}
        <main className={`app-content ${location.pathname === '/ai' ? 'app-content-ai' : ''}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              style={{ height: location.pathname === '/ai' ? '100%' : 'auto' }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="mobile-bottom-nav" aria-label="Mobile Navigation">
        <NavLink to="/explore" className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}>
          <Compass size={20} />
          <span>Explore</span>
        </NavLink>

        <NavLink to="/ai" className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}>
          <Sparkles size={20} />
          <span>AI</span>
        </NavLink>

        <NavLink to="/installed" className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}>
          <CheckCircle2 size={20} />
          <span>Installed</span>
        </NavLink>

        <NavLink to="/activity" className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}>
          <Clock size={20} />
          <span>Activity</span>
        </NavLink>
      </nav>

      {/* Global Command Palette with AnimatePresence */}
      <AnimatePresence>
        {isPaletteOpen && (
          <CommandPalette
            isOpen={isPaletteOpen}
            onClose={() => setIsPaletteOpen(false)}
            technologies={technologies}
            onSelectTech={onSelectTech}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
