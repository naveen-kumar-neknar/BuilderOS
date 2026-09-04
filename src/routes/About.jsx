import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  ShieldCheck, 
  Terminal, 
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function About() {
  const { isAuthenticated } = useAuth();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAFAFA', color: '#09090B' }}>
      {/* Public Header */}
      <header className="landing-header" style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E4E4E7' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'inherit' }}>
            <div className="sidebar-brand-mark" style={{ backgroundColor: '#0F172A' }}>H</div>
            <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.025em', color: '#09090B' }}>
              BuilderOS
            </span>
          </Link>
        </div>

        <nav className="landing-nav">
          <Link to="/" style={{ color: '#71717A', fontWeight: 500, textDecoration: 'none' }}>Home</Link>
          <Link to="/about" style={{ color: '#09090B', fontWeight: 600, textDecoration: 'none' }}>About</Link>
          <Link to="/how-it-works" style={{ color: '#71717A', fontWeight: 500, textDecoration: 'none' }}>How It Works</Link>
          <Link to="/#directory" style={{ color: '#71717A', fontWeight: 500, textDecoration: 'none' }}>Directory</Link>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {isAuthenticated ? (
            <Link to="/app" className="btn btn-primary btn-sm">
              Dashboard <ArrowRight size={14} />
            </Link>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost btn-sm">
                Log In
              </Link>
              <Link to="/signup" className="btn btn-primary btn-sm">
                Get Started
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: 960, margin: '0 auto', padding: '64px 24px 100px 24px' }}>
        {/* Breadcrumb */}
        <div style={{ fontSize: 13, color: '#71717A', marginBottom: 20 }}>
          <Link to="/" style={{ color: '#71717A', textDecoration: 'none' }}>Home</Link> &nbsp;/&nbsp; <span style={{ color: '#09090B', fontWeight: 500 }}>About BuilderOS</span>
        </div>

        {/* Hero */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ marginBottom: 48 }}
        >
          <h1 style={{ fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: 16 }}>
            The Developer Environment Engine Built for Genuine Machine Execution
          </h1>
          <p style={{ fontSize: 18, color: '#52525B', lineHeight: 1.65, maxWidth: 780 }}>
            BuilderOS replaces simulated package managers with direct, native operating system execution. We inspect your physical disk, run genuine package managers, integrate executables into your system PATH, and verify installs with exit codes.
          </p>
        </motion.div>

        {/* Core Principles */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 56 }}>
          <div style={{ backgroundColor: '#FFFFFF', padding: 24, borderRadius: 12, border: '1px solid #E4E4E7' }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: '#F4F4F5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, color: '#09090B' }}>
              <ShieldCheck size={22} />
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Zero Mock Statuses</h3>
            <p style={{ fontSize: 14, color: '#71717A', lineHeight: 1.6, margin: 0 }}>
              If a tool is not installed on your physical Windows drive, we report <strong>Not Installed</strong>. We never simulate installs, fake progress percentages, or claim completion without exit code 0.
            </p>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: 24, borderRadius: 12, border: '1px solid #E4E4E7' }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: '#F4F4F5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, color: '#09090B' }}>
              <Terminal size={22} />
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Windows PATH Automation</h3>
            <p style={{ fontSize: 14, color: '#71717A', lineHeight: 1.6, margin: 0 }}>
              Python CLI binaries and tools are automatically linked to your system PATH with executable <code>.cmd</code> wrappers, enabling immediate execution in <code>cmd.exe</code> or PowerShell.
            </p>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: 24, borderRadius: 12, border: '1px solid #E4E4E7' }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: '#F4F4F5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, color: '#09090B' }}>
              <RefreshCw size={22} />
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Honest Update Tracking</h3>
            <p style={{ fontSize: 14, color: '#71717A', lineHeight: 1.6, margin: 0 }}>
              We compare your installed version against the latest production releases. Tools display <strong>Up to date</strong> or an actionable <strong>Update Available</strong> badge with a 1-click upgrade command.
            </p>
          </div>
        </div>

        {/* Why BuilderOS Section */}
        <section style={{ backgroundColor: '#FFFFFF', padding: 36, borderRadius: 12, border: '1px solid #E4E4E7', marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 16 }}>
            Why We Built BuilderOS
          </h2>
          <div style={{ fontSize: 15, color: '#52525B', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p style={{ margin: 0 }}>
              Modern software development requires managing dozens of heterogeneous tools across Python, Node.js, C++ binaries, and native services. Developers constantly run into environment conflicts, missing PATH variables, and web dashboards that claim a tool is "installed" when it doesn't even exist in the command line.
            </p>
            <p style={{ margin: 0 }}>
              BuilderOS bridges this gap by connecting an ultra-lightweight local engine directly to your operating system. When you click install, it spawns your native package manager (<code>pip</code>, <code>winget</code>, or <code>npm -g</code>) directly in your user environment, streams real-time stdout/stderr, and executes an independent verification check to confirm the binary is ready to use.
            </p>
          </div>
        </section>

        {/* Architecture Breakdown */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>
            Platform Architecture
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', gap: 16, padding: 20, backgroundColor: '#FFFFFF', borderRadius: 10, border: '1px solid #E4E4E7' }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: '#09090B', minWidth: 140 }}>1. Local Daemon</div>
              <div style={{ fontSize: 14, color: '#71717A', lineHeight: 1.6 }}>
                Listens on <code>http://127.0.0.1:7331</code>. Executes isolated child processes strictly in your user home directory to prevent picking up project-local dependencies.
              </div>
            </div>

            <div style={{ display: 'flex', gap: 16, padding: 20, backgroundColor: '#FFFFFF', borderRadius: 10, border: '1px solid #E4E4E7' }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: '#09090B', minWidth: 140 }}>2. Fast-Path Audit</div>
              <div style={{ fontSize: 14, color: '#71717A', lineHeight: 1.6 }}>
                Reads raw package metadata (<code>pip show</code>, <code>npm list -g --depth=0 --json</code>) in ~1.5s rather than loading heavy CUDA/C++ DLL import trees into memory.
              </div>
            </div>

            <div style={{ display: 'flex', gap: 16, padding: 20, backgroundColor: '#FFFFFF', borderRadius: 10, border: '1px solid #E4E4E7' }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: '#09090B', minWidth: 140 }}>3. Terminal Validation</div>
              <div style={{ fontSize: 14, color: '#71717A', lineHeight: 1.6 }}>
                Every tool provides a native Windows verification command that you can copy and test directly in Command Prompt (<code>cmd.exe</code>) or PowerShell.
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <div style={{ textAlign: 'center', padding: '48px 24px', backgroundColor: '#F4F4F5', borderRadius: 16, border: '1px solid #E4E4E7' }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Ready to audit your development environment?</h3>
          <p style={{ fontSize: 15, color: '#71717A', maxWidth: 520, margin: '0 auto 24px auto' }}>
            Create an account or log in to view your real-time machine inventory, install missing toolchains, and update outdated packages.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
            <Link to={isAuthenticated ? '/app' : '/signup'} className="btn btn-primary btn-md">
              {isAuthenticated ? 'Open Dashboard' : 'Get Started Free'} <ArrowRight size={15} />
            </Link>
            <Link to="/how-it-works" className="btn btn-secondary btn-md">
              See How It Works
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
