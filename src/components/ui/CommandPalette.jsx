import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Layers, 
  Settings, 
  LogOut, 
  ArrowRight,
  Code
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function CommandPalette({ 
  isOpen, 
  onClose, 
  technologies = [], 
  onSelectTech 
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const defaultCommands = [
    { id: 'explore', label: 'Explore Technologies', icon: Search, action: () => navigate('/explore') },
    { id: 'ai', label: 'Ask AI Assistant', icon: Sparkles, action: () => navigate('/ai') },
    { id: 'installed', label: 'View Installed Tools', icon: CheckCircle2, action: () => navigate('/installed') },
    { id: 'activity', label: 'View Activity Timeline', icon: Clock, action: () => navigate('/activity') },
    { id: 'stacks', label: 'Open Development Stacks', icon: Layers, action: () => navigate('/stacks') },
    { id: 'settings', label: 'Platform Settings', icon: Settings, action: () => navigate('/settings') },
    { 
      id: 'logout', 
      label: 'Sign Out', 
      icon: LogOut, 
      action: async () => {
        await logout();
        navigate('/login');
      } 
    }
  ];

  // Filter commands and technologies
  const filteredCommands = query.trim()
    ? defaultCommands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()))
    : defaultCommands;

  const filteredTechs = query.trim()
    ? technologies.filter(
        (t) =>
          t.name.toLowerCase().includes(query.toLowerCase()) ||
          t.description?.toLowerCase().includes(query.toLowerCase()) ||
          t.category?.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  const combinedItems = [
    ...filteredTechs.map((t) => ({
      id: `tech-${t.slug}`,
      label: `Install ${t.name}`,
      category: t.category,
      icon: Code,
      action: () => {
        onSelectTech?.(t);
        navigate('/explore');
      }
    })),
    ...filteredCommands
  ];

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setQuery('');
        setSelectedIndex(0);
        inputRef.current?.focus();
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (combinedItems.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + combinedItems.length) % (combinedItems.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const current = combinedItems[selectedIndex];
      if (current) {
        current.action();
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div 
      className="palette-overlay" 
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <motion.div 
        className="palette-modal" 
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        transition={{ type: 'spring', damping: 25, stiffness: 320 }}
      >
        <div className="palette-search">
          <Search size={18} style={{ color: 'var(--text-muted)' }} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search technologies..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
          />
          <kbd className="header-kbd">ESC</kbd>
        </div>

        <div className="palette-results">
          {combinedItems.length === 0 ? (
            <div style={{ padding: '24px 16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 14 }}>
              No matching commands or technologies found.
            </div>
          ) : (
            combinedItems.map((item, index) => {
              const Icon = item.icon;
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  className={`palette-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => {
                    item.action();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Icon size={16} style={{ color: isSelected ? 'var(--accent-primary)' : 'var(--text-secondary)' }} />
                    <span style={{ fontWeight: isSelected ? 600 : 400 }}>{item.label}</span>
                    {item.category && (
                      <span className="badge badge-neutral" style={{ fontSize: 11, padding: '1px 6px' }}>
                        {item.category}
                      </span>
                    )}
                  </div>
                  {isSelected && <ArrowRight size={14} style={{ color: 'var(--accent-primary)' }} />}
                </div>
              );
            })
          )}
        </div>

        <div className="palette-footer">
          <span>Navigate with ↑ ↓</span>
          <span>Select with Enter</span>
          <span>Close with Esc</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
