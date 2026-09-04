import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { 
  ArrowRight, 
  ChevronUp,
  Layers,
  Coins,
  ShieldCheck,
  ArrowUpRight,
  Terminal
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { TECHNOLOGIES } from '../data/technologiesData';
import { ERAS, getTechDomain, getTechEra, getTechEraBadge } from '../data/categoriesData';

export default function Landing() {
  const { isAuthenticated } = useAuth();

  // Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Floating Back to Top Button
  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 320);
    };
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Interactive Architecture & Pricing Showcase State
  const [selectedPricing, setSelectedPricing] = useState('all'); // 'all', 'free', 'paid'
  const [selectedDomain, setSelectedDomain] = useState('all'); // 'all', 'frontend', 'backend', 'integration'
  const [selectedEra, setSelectedEra] = useState('all'); // 'all', 'new', 'current', 'classic'

  // Filtered preview technologies
  const previewTechs = TECHNOLOGIES.filter(tech => {
    if (selectedPricing === 'free' && tech.pricing !== 'free') return false;
    if (selectedPricing === 'paid' && tech.pricing === 'free') return false;

    const domain = getTechDomain(tech);
    if (selectedDomain !== 'all' && domain !== selectedDomain) return false;

    const era = getTechEra(tech);
    if (selectedEra !== 'all' && era !== selectedEra) return false;

    return true;
  });

  const freeCount = TECHNOLOGIES.filter(t => t.pricing === 'free').length;
  const paidCount = TECHNOLOGIES.filter(t => t.pricing !== 'free').length;

  const trustedTools = [
    { name: 'NumPy', type: 'Numerical arrays', slug: 'numpy', era: 'Classic' },
    { name: 'Pandas', type: 'DataFrames & analysis', slug: 'pandas', era: 'Classic' },
    { name: 'Matplotlib', type: 'Plotting & visualization', slug: 'matplotlib', era: 'Classic' },
    { name: 'Scikit-Learn', type: 'ML & TF-IDF vectorizer', slug: 'scikit-learn', era: 'Classic' },
    { name: 'Node.js', type: 'JavaScript runtime', slug: 'nodejs', era: 'Classic' },
    { name: 'Python', type: 'Data & backend runtime', slug: 'python', era: 'Classic' },
    { name: 'React', type: 'UI library', slug: 'react', era: 'Current' },
    { name: 'Polars', type: 'Rust DataFrame engine', slug: 'polars', era: 'New' },
    { name: 'DuckDB', type: 'Analytical SQL OLAP', slug: 'duckdb', era: 'New' },
    { name: 'Ollama', type: 'Local AI LLM engine', slug: 'ollama', era: 'New' }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', position: 'relative' }}>
      {/* Top Precision Scroll Progress Bar */}
      <motion.div
        style={{
          scaleX,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          backgroundColor: '#0F172A',
          transformOrigin: '0%',
          zIndex: 9999
        }}
      />

      {/* Header */}
      <header className="landing-header">
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0284C7 100%)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: 18,
            letterSpacing: '-0.03em',
            boxShadow: '0 4px 14px rgba(2, 132, 199, 0.25)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            B
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.03em', color: '#0F172A' }}>
              Builder<span style={{ color: '#0284C7' }}>OS</span>
            </span>
            <span style={{ 
              fontSize: 10, 
              fontWeight: 700, 
              padding: '2px 7px', 
              borderRadius: 4, 
              background: 'linear-gradient(135deg, #ECFDF5 0%, #E0F2FE 100%)', 
              color: '#0369A1', 
              border: '1px solid #BAE6FD',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}>
              v2.4
            </span>
          </div>
        </Link>

        <nav className="landing-nav">
          <Link to="/about">About</Link>
          <Link to="/how-it-works">How It Works</Link>
          <a href="#directory" onClick={() => setSelectedPricing('all')}>
            Directory
          </a>
          <a 
            href="#directory" 
            onClick={() => setSelectedPricing('free')} 
            className="nav-link-free"
          >
            <span className="status-dot green-pulse" style={{ width: 6, height: 6 }} />
            100% Free Tools
          </a>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {isAuthenticated ? (
            <Link to="/app" className="btn-nav-signup">
              Open Dashboard <ArrowRight size={14} />
            </Link>
          ) : (
            <>
              <Link to="/login" className="btn-nav-login">
                Log In
              </Link>
              <Link to="/signup" className="btn-nav-signup">
                Get Started Free <ArrowRight size={14} />
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <motion.section 
        className="landing-hero"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ padding: '80px 24px 60px 24px', textAlign: 'center' }}
      >
        <div 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '5px 14px',
            borderRadius: 20,
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-default)',
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--text-secondary)',
            marginBottom: 20
          }}
        >
          <span>Native Package Management & Machine Verification</span>
        </div>

        <h1 
          style={{
            fontSize: 'clamp(32px, 5vw, 54px)',
            fontWeight: 800,
            letterSpacing: '-0.035em',
            color: '#09090B',
            lineHeight: 1.15,
            maxWidth: 860,
            margin: '0 auto 20px auto'
          }}
        >
          The developer technology directory & installation engine.
        </h1>

        <p 
          style={{
            fontSize: 17,
            color: 'var(--text-secondary)',
            maxWidth: 680,
            margin: '0 auto 28px auto',
            lineHeight: 1.6
          }}
        >
          Inspect, configure and install developer toolchains directly on your machine.
          Filter between 100% Free/FOSS packages and commercial cloud models across classic, standard, and cutting-edge generations.
        </p>

        {/* Free vs. Paid Quick Selector Pills */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 32, flexWrap: 'wrap' }}>
          <a
            href="#directory"
            onClick={() => setSelectedPricing('free')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 16px',
              borderRadius: 8,
              backgroundColor: '#F0FDF4',
              color: '#15803D',
              border: '1px solid #BBF7D0',
              fontWeight: 600,
              fontSize: 13,
              textDecoration: 'none'
            }}
          >
            <span>🟢 100% Free / FOSS Tools ({freeCount})</span>
          </a>
          <a
            href="#directory"
            onClick={() => setSelectedPricing('paid')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 16px',
              borderRadius: 8,
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-default)',
              fontWeight: 600,
              fontSize: 13,
              textDecoration: 'none'
            }}
          >
            <span>💳 Commercial & Cloud APIs ({paidCount})</span>
          </a>
        </div>

        <div className="hero-cta-group" style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 56 }}>
          <Link to={isAuthenticated ? '/app' : '/signup'} className="btn btn-primary btn-lg">
            {isAuthenticated ? 'Open Dashboard' : 'Get Started Free'} <ArrowRight size={16} />
          </Link>
          <a href="#directory" className="btn btn-secondary btn-lg" style={{ textDecoration: 'none' }}>
            Browse All {TECHNOLOGIES.length} Technologies
          </a>
        </div>

        {/* Product Terminal Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.65 }}
          style={{
            maxWidth: 980,
            margin: '0 auto',
            border: '1.5px solid rgba(2, 132, 199, 0.28)',
            borderRadius: 16,
            backgroundColor: '#FFFFFF',
            boxShadow: '0 25px 60px -15px rgba(2, 132, 199, 0.18), 0 0 0 1px rgba(2, 132, 199, 0.08)',
            overflow: 'hidden',
            textAlign: 'left'
          }}
        >
          {/* Top Multi-Color Domain Accent Stripe */}
          <div style={{ height: 3.5, width: '100%', background: 'linear-gradient(90deg, #10B981 0%, #0284C7 45%, #F97316 100%)' }} />

          {/* Header Bar with Vibrant Control Dots & Colored Address Capsule */}
          <div
            style={{
              padding: '12px 20px',
              background: 'linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%)',
              borderBottom: '1.5px solid rgba(2, 132, 199, 0.18)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 12
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              {/* Vibrant Control Dots (Red, Amber, Green) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <div style={{ width: 11, height: 11, borderRadius: '50%', backgroundColor: '#EF4444', boxShadow: '0 0 8px rgba(239, 68, 68, 0.6)' }} title="Close" />
                <div style={{ width: 11, height: 11, borderRadius: '50%', backgroundColor: '#F59E0B', boxShadow: '0 0 8px rgba(245, 158, 11, 0.6)' }} title="Minimize" />
                <div style={{ width: 11, height: 11, borderRadius: '50%', backgroundColor: '#10B981', boxShadow: '0 0 8px rgba(16, 185, 129, 0.6)' }} title="Expand" />
              </div>

              {/* Colored Address Capsule */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                backgroundColor: '#FFFFFF',
                border: '1.5px solid rgba(2, 132, 199, 0.25)',
                borderRadius: 8,
                padding: '4px 12px',
                fontSize: 12,
                fontFamily: 'var(--font-mono)',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)'
              }}>
                <span style={{ color: '#059669', fontSize: 11 }}>🔒</span>
                <span style={{ color: '#0F172A', fontWeight: 700 }}>builderos.dev</span>
                <span style={{ color: '#0284C7', fontWeight: 600 }}>/environment</span>
              </div>
            </div>

            {/* Glowing Live Daemon Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              padding: '4px 12px',
              borderRadius: 9999,
              background: 'linear-gradient(135deg, #ECFDF5 0%, #E0F2FE 100%)',
              border: '1.5px solid #A7F3D0',
              color: '#047857',
              fontSize: 12,
              fontWeight: 700,
              boxShadow: '0 2px 10px rgba(16, 185, 129, 0.18)'
            }}>
              <span className="status-dot green-pulse" style={{ width: 7, height: 7 }} />
              <span>Local Installer Daemon Online (Port 7331)</span>
            </div>
          </div>

          {/* Three Colorful Stack Columns */}
          <div style={{ padding: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {/* Col 1: Data Science */}
            <div style={{ 
              padding: 20, 
              border: '1.5px solid rgba(2, 132, 199, 0.3)', 
              borderRadius: 12, 
              backgroundColor: '#FFFFFF',
              boxShadow: '0 6px 20px -4px rgba(2, 132, 199, 0.12)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#0369A1', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  📊 Data Science Stack
                </span>
                <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 4, backgroundColor: '#F0F9FF', color: '#0369A1', fontWeight: 700, border: '1px solid #BAE6FD' }}>
                  Classic & New
                </span>
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', marginBottom: 6 }}>NumPy, Pandas, Scikit-Learn</div>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16, lineHeight: 1.45, flex: 1 }}>
                Full scientific stack with TF-IDF vectorization, Matplotlib figures, and fast Polars execution.
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTop: '1px solid #F1F5F9' }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#047857', backgroundColor: '#ECFDF5', padding: '2px 8px', borderRadius: 9999, border: '1px solid #A7F3D0' }}>✓ 100% Free FOSS</span>
                <span style={{ fontSize: 11, color: '#64748B', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>pip install</span>
              </div>
            </div>

            {/* Col 2: Backend */}
            <div style={{ 
              padding: 20, 
              border: '1.5px solid rgba(249, 115, 22, 0.3)', 
              borderRadius: 12, 
              backgroundColor: '#FFFFFF',
              boxShadow: '0 6px 20px -4px rgba(249, 115, 22, 0.12)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#C2410C', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  ⚙️ Backend Runtimes
                </span>
                <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 4, backgroundColor: '#FFF7ED', color: '#C2410C', fontWeight: 700, border: '1px solid #FED7AA' }}>
                  LTS & Modern
                </span>
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', marginBottom: 6 }}>Node.js, Bun, Python & FastAPI</div>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16, lineHeight: 1.45, flex: 1 }}>
                Reliable production servers with verified native package recipes via winget and powershell.
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTop: '1px solid #F1F5F9' }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#047857', backgroundColor: '#ECFDF5', padding: '2px 8px', borderRadius: 9999, border: '1px solid #A7F3D0' }}>✓ 100% Free FOSS</span>
                <span style={{ fontSize: 11, color: '#64748B', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>native exe</span>
              </div>
            </div>

            {/* Col 3: AI & Integrations */}
            <div style={{ 
              padding: 20, 
              border: '1.5px solid rgba(16, 185, 129, 0.3)', 
              borderRadius: 12, 
              backgroundColor: '#FFFFFF',
              boxShadow: '0 6px 20px -4px rgba(16, 185, 129, 0.12)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#047857', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  🧠 AI & Vector Engines
                </span>
                <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 4, backgroundColor: '#ECFDF5', color: '#047857', fontWeight: 700, border: '1px solid #A7F3D0' }}>
                  🚀 Cutting-Edge
                </span>
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', marginBottom: 6 }}>
                PyTorch, ChromaDB & LangChain
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16, lineHeight: 1.45, flex: 1 }}>
                Local GPU/CPU inference without API keys, plus vector storage and OpenAI cloud integrations.
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTop: '1px solid #F1F5F9' }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#0369A1', backgroundColor: '#F0F9FF', padding: '2px 8px', borderRadius: 9999, border: '1px solid #BAE6FD' }}>
                  Free Local + Cloud
                </span>
                <span style={{ fontSize: 11, color: '#059669', fontWeight: 700 }}>✓ Verified</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Trusted Developer Tools Grid Strip */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        style={{ 
          borderTop: '1px solid var(--border-default)', 
          borderBottom: '1px solid var(--border-default)', 
          backgroundColor: 'var(--bg-secondary)', 
          padding: '40px 24px' 
        }}
      >
        <div style={{ maxWidth: 1120, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: 20 }}>
            Curated Across Technology Generations & Architectural Layers
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
            {trustedTools.map((tool) => (
              <div
                key={tool.slug}
                style={{
                  padding: '12px 14px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: 8,
                  border: '1px solid var(--border-default)',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{tool.name}</span>
                  <span style={{ fontSize: 10, padding: '2px 5px', borderRadius: 4, backgroundColor: 'var(--bg-secondary)', color: 'var(--text-muted)', fontWeight: 600 }}>
                    {tool.era}
                  </span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {tool.type}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* =========================================================================
          HOW IT WORKS SECTION (Public)
          ========================================================================= */}
      <section id="how-it-works" style={{ maxWidth: 1160, margin: '0 auto', padding: '60px 24px 40px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: 20, backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-default)', marginBottom: 12 }}>
            <Terminal size={14} color="var(--text-secondary)" />
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              How It Works
            </span>
          </div>
          <h2 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.025em', color: '#09090B', marginBottom: 10 }}>
            Real Machine Execution, Zero Simulation
          </h2>
          <p style={{ fontSize: 15, color: 'var(--text-secondary)', maxWidth: 640, margin: '0 auto' }}>
            Unlike web dashboards that simulate package status, BuilderOS directly interfaces with your local Windows environment.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 28 }}>
          <div style={{ backgroundColor: '#FFFFFF', padding: 20, borderRadius: 10, border: '1px solid var(--border-default)' }}>
            <div style={{ width: 32, height: 32, borderRadius: 6, backgroundColor: '#09090B', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, marginBottom: 12 }}>1</div>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>Real Environment Audit</h3>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
              Queries <code>python pip list</code>, <code>npm list -g</code>, and system PATH from your user profile with zero false positives.
            </p>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: 20, borderRadius: 10, border: '1px solid var(--border-default)' }}>
            <div style={{ width: 32, height: 32, borderRadius: 6, backgroundColor: '#09090B', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, marginBottom: 12 }}>2</div>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>Direct Native Install</h3>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
              Spawns <code>pip install --user</code>, <code>winget install</code>, or <code>npm i -g</code> streaming stdout/stderr in real time.
            </p>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: 20, borderRadius: 10, border: '1px solid var(--border-default)' }}>
            <div style={{ width: 32, height: 32, borderRadius: 6, backgroundColor: '#09090B', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, marginBottom: 12 }}>3</div>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>Windows PATH Wrappers</h3>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
              Auto-generates <code>.cmd</code> wrappers in your system PATH so CLI commands execute in any terminal immediately.
            </p>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: 20, borderRadius: 10, border: '1px solid var(--border-default)' }}>
            <div style={{ width: 32, height: 32, borderRadius: 6, backgroundColor: '#09090B', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, marginBottom: 12 }}>4</div>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>Exit 0 & Update Check</h3>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
              Requires exit code 0 verification. Detects if packages are <strong>Up to date</strong> or have an <strong>Update Available</strong>.
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link to="/how-it-works" style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            Read complete technical walkthrough <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* =========================================================================
          ABOUT PLATFORM SECTION (Public)
          ========================================================================= */}
      <section id="about" style={{ maxWidth: 1160, margin: '0 auto', padding: '20px 24px 60px 24px' }}>
        <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 16, padding: '36px 32px', display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ maxWidth: 680 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>
              <ShieldCheck size={16} /> About BuilderOS
            </div>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: '#09090B', marginBottom: 10 }}>
              Honest Developer Tooling Built for Windows
            </h3>
            <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.6, margin: 0 }}>
              BuilderOS was built to eliminate broken PATHs, fake installation progress bars, and missing terminal tools. We give developers an honest, real-time mirror of what is actually installed on disk, complete with 1-click CMD test commands and semantic upgrade detection.
            </p>
          </div>
          <Link to="/about" className="btn btn-secondary btn-md" style={{ whiteSpace: 'nowrap', textDecoration: 'none' }}>
            Learn More About BuilderOS <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE ARCHITECTURE & PRICING DIRECTORY (Requested by User)
          ========================================================================= */}
      <motion.section 
        id="directory"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.6 }}
        style={{ maxWidth: 1160, margin: '0 auto', padding: '40px 24px 80px 24px' }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: 20, backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-default)', marginBottom: 12 }}>
            <Layers size={14} color="var(--text-secondary)" />
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Full Architecture & Pricing Directory
            </span>
          </div>
          <h2 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.025em', color: '#09090B', marginBottom: 10 }}>
            Choose Your Architecture & Model Tier
          </h2>
          <p style={{ fontSize: 15, color: 'var(--text-secondary)', maxWidth: 640, margin: '0 auto' }}>
            Toggle between 100% Free / FOSS models and commercial paid APIs. Inspect Frontend, Backend, and Integration options separately across Old, Current, and New generations.
          </p>
        </div>

        {/* TOP BUTTONS: Free vs. Paid */}
        <div 
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--border-default)',
            borderRadius: 14,
            padding: '20px 24px',
            marginBottom: 24,
            boxShadow: 'var(--shadow-xs)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Coins size={18} color="var(--text-primary)" />
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>Pricing & Access Model:</span>
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Select open source tools or commercial cloud APIs</span>
            </div>
            <Link to="/explore" style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent-interactive)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              Open Full Explorer <ArrowUpRight size={14} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            <button
              onClick={() => setSelectedPricing('all')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: 8,
                border: selectedPricing === 'all' ? '2px solid #0F172A' : '1px solid var(--border-default)',
                backgroundColor: selectedPricing === 'all' ? '#F8FAFC' : '#FFFFFF',
                color: selectedPricing === 'all' ? '#0F172A' : 'var(--text-secondary)',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 16 }}>🌟</span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 13 }}>All Pricing Tiers</div>
                  <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-muted)' }}>Free & Commercial</div>
                </div>
              </div>
              <span style={{ fontSize: 12, padding: '2px 8px', borderRadius: 12, backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-default)' }}>
                {TECHNOLOGIES.length}
              </span>
            </button>

            <button
              onClick={() => setSelectedPricing('free')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: 8,
                border: selectedPricing === 'free' ? '2px solid #16A34A' : '1px solid var(--border-default)',
                backgroundColor: selectedPricing === 'free' ? '#F0FDF4' : '#FFFFFF',
                color: selectedPricing === 'free' ? '#15803D' : 'var(--text-secondary)',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 16 }}>🟢</span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 13 }}>100% Free / FOSS Only</div>
                  <div style={{ fontSize: 11, fontWeight: 500, color: '#16A34A' }}>Zero Cost • MIT/Apache/BSD</div>
                </div>
              </div>
              <span style={{ fontSize: 12, padding: '2px 8px', borderRadius: 12, backgroundColor: '#DCFCE7', color: '#15803D', fontWeight: 700 }}>
                {freeCount} Free
              </span>
            </button>

            <button
              onClick={() => setSelectedPricing('paid')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: 8,
                border: selectedPricing === 'paid' ? '2px solid #0F172A' : '1px solid var(--border-default)',
                backgroundColor: selectedPricing === 'paid' ? '#F8FAFC' : '#FFFFFF',
                color: selectedPricing === 'paid' ? '#0F172A' : 'var(--text-secondary)',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 16 }}>💳</span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 13 }}>Commercial Cloud APIs</div>
                  <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-muted)' }}>Pay-per-token / Hosted</div>
                </div>
              </div>
              <span style={{ fontSize: 12, padding: '2px 8px', borderRadius: 12, backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-default)' }}>
                {paidCount} Paid
              </span>
            </button>
          </div>
        </div>

        {/* SUB-CONTROLS: Domain Tabs & Era Filters */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14, marginBottom: 24 }}>
          {/* Architecture Domain Tabs */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <button
              onClick={() => setSelectedDomain('all')}
              style={{
                padding: '7px 14px',
                borderRadius: 6,
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                border: selectedDomain === 'all' ? '1.5px solid #0F172A' : '1px solid var(--border-default)',
                backgroundColor: selectedDomain === 'all' ? '#0F172A' : '#FFFFFF',
                color: selectedDomain === 'all' ? '#FFFFFF' : 'var(--text-secondary)'
              }}
            >
              All Architecture
            </button>
            <button
              onClick={() => setSelectedDomain('frontend')}
              style={{
                padding: '7px 14px',
                borderRadius: 6,
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                border: selectedDomain === 'frontend' ? '1.5px solid #0F172A' : '1px solid var(--border-default)',
                backgroundColor: selectedDomain === 'frontend' ? '#0F172A' : '#FFFFFF',
                color: selectedDomain === 'frontend' ? '#FFFFFF' : 'var(--text-secondary)'
              }}
            >
              💻 Frontend
            </button>
            <button
              onClick={() => setSelectedDomain('backend')}
              style={{
                padding: '7px 14px',
                borderRadius: 6,
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                border: selectedDomain === 'backend' ? '1.5px solid #0F172A' : '1px solid var(--border-default)',
                backgroundColor: selectedDomain === 'backend' ? '#0F172A' : '#FFFFFF',
                color: selectedDomain === 'backend' ? '#FFFFFF' : 'var(--text-secondary)'
              }}
            >
              ⚙️ Backend
            </button>
            <button
              onClick={() => setSelectedDomain('integration')}
              style={{
                padding: '7px 14px',
                borderRadius: 6,
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                border: selectedDomain === 'integration' ? '1.5px solid #0F172A' : '1px solid var(--border-default)',
                backgroundColor: selectedDomain === 'integration' ? '#0F172A' : '#FFFFFF',
                color: selectedDomain === 'integration' ? '#FFFFFF' : 'var(--text-secondary)'
              }}
            >
              🔗 Integration, Data & AI
            </button>
          </div>

          {/* Era / Generation Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)' }}>Era:</span>
            {ERAS.map((era) => (
              <button
                key={era.id}
                onClick={() => setSelectedEra(era.id)}
                style={{
                  padding: '5px 10px',
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: selectedEra === era.id ? 700 : 500,
                  cursor: 'pointer',
                  border: selectedEra === era.id ? '1.5px solid #0F172A' : '1px solid var(--border-default)',
                  backgroundColor: selectedEra === era.id ? '#FFFFFF' : 'var(--bg-secondary)',
                  color: selectedEra === era.id ? '#0F172A' : 'var(--text-secondary)'
                }}
              >
                {era.shortLabel || era.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live Filtered Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: 18 }}>
          {previewTechs.slice(0, 8).map((tech) => {
            const eraBadge = getTechEraBadge(tech);
            const domain = getTechDomain(tech);
            const isFree = tech.pricing === 'free';

            return (
              <motion.div
                key={tech.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.35 }}
                whileHover={{ y: -3, boxShadow: 'var(--shadow-md)' }}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 10,
                  border: '1px solid var(--border-default)',
                  padding: 18,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                    <span 
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: 4,
                        backgroundColor: eraBadge.bg,
                        color: eraBadge.color,
                        border: `1px solid ${eraBadge.border}`
                      }}
                    >
                      {eraBadge.emoji} {eraBadge.label}
                    </span>

                    <span 
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: 4,
                        backgroundColor: isFree ? '#F0FDF4' : 'var(--bg-secondary)',
                        color: isFree ? '#15803D' : 'var(--text-primary)',
                        border: isFree ? '1px solid #BBF7D0' : '1px solid var(--border-default)'
                      }}
                    >
                      {isFree ? '🟢 100% Free' : '💳 Paid API'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <div 
                      style={{ 
                        width: 34, 
                        height: 34, 
                        borderRadius: 6, 
                        backgroundColor: tech.iconBg || '#0F172A',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: 15,
                        color: '#FFFFFF'
                      }}
                    >
                      {tech.name.charAt(0)}
                    </div>
                    <div>
                      <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                        {tech.name}
                      </h3>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                        {domain === 'frontend' ? 'Frontend' : domain === 'backend' ? 'Backend Runtime' : 'Integration & Data'}
                      </span>
                    </div>
                  </div>

                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.45, marginBottom: 14 }}>
                    {tech.tagline || tech.description}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--border-default)', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {tech.version || 'Latest'}
                  </span>
                  <Link
                    to={isAuthenticated ? `/technology/${tech.slug}` : `/login`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      fontSize: 12,
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      padding: '4px 10px',
                      borderRadius: 6,
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border-default)'
                    }}
                  >
                    {isAuthenticated ? 'Details & Install' : 'Sign in to Install'} <ArrowRight size={12} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <Link 
            to={isAuthenticated ? "/explore" : "/signup"}
            className="btn btn-secondary btn-md"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 600 }}
          >
            {isAuthenticated ? `Explore All ${TECHNOLOGIES.length} Verified Technologies` : `Create Free Account to Access All ${TECHNOLOGIES.length} Tools`} <ArrowRight size={15} />
          </Link>
        </div>
      </motion.section>

      {/* How BuilderOS Works */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.6 }}
        style={{ maxWidth: 1080, margin: '0 auto', padding: '60px 24px 80px 24px' }}
      >
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Execution Model
          </span>
          <h2 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.025em', marginTop: 6, color: '#09090B' }}>
            How BuilderOS Operates
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
          <div style={{ padding: 20, border: '1px solid var(--border-default)', borderRadius: 10, backgroundColor: '#FFFFFF' }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8 }}>01</div>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>Discover</h3>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Browse runtimes, data science tools, databases, and frameworks with genuine package compatibility info.
            </p>
          </div>

          <div style={{ padding: 20, border: '1px solid var(--border-default)', borderRadius: 10, backgroundColor: '#FFFFFF' }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8 }}>02</div>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>Evaluate Stacks</h3>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Use the machine assistant to formulate complete environments tailored to your operating system.
            </p>
          </div>

          <div style={{ padding: 20, border: '1px solid var(--border-default)', borderRadius: 10, backgroundColor: '#FFFFFF' }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8 }}>03</div>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>Native Install</h3>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Execute recipes through your local package manager (winget, brew, pip, npm) with real machine verification.
            </p>
          </div>

          <div style={{ padding: 20, border: '1px solid var(--border-default)', borderRadius: 10, backgroundColor: '#FFFFFF' }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8 }}>04</div>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>Build</h3>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Verify installed binaries in your system PATH and start coding without configuration roadblocks.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border-default)', padding: '28px 36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13, color: 'var(--text-muted)' }}>
        <div>© 2026 BuilderOS. Developer toolchain & environment platform.</div>
        <div style={{ display: 'flex', gap: 20 }}>
          <Link to="/about">About</Link>
          <Link to="/how-it-works">How It Works</Link>
          <a href="#directory" style={{ color: 'inherit', textDecoration: 'none' }}>Directory</a>
          <Link to="/signup">Get Started</Link>
        </div>
      </footer>

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 16 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            style={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              width: 42,
              height: 42,
              borderRadius: '50%',
              backgroundColor: '#0F172A',
              color: '#FFFFFF',
              border: 'none',
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 999
            }}
            title="Return to top"
            aria-label="Return to top"
          >
            <ChevronUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
