import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Copy, 
  CheckCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function HowItWorks() {
  const { isAuthenticated } = useAuth();
  const [copiedStep, setCopiedStep] = React.useState(null);

  const handleCopy = (cmd, step) => {
    navigator.clipboard.writeText(cmd);
    setCopiedStep(step);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAFAFA', color: '#09090B' }}>
      {/* Header */}
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
          <Link to="/about" style={{ color: '#71717A', fontWeight: 500, textDecoration: 'none' }}>About</Link>
          <Link to="/how-it-works" style={{ color: '#09090B', fontWeight: 600, textDecoration: 'none' }}>How It Works</Link>
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

      {/* Main Container */}
      <main style={{ maxWidth: 960, margin: '0 auto', padding: '64px 24px 100px 24px' }}>
        {/* Breadcrumb */}
        <div style={{ fontSize: 13, color: '#71717A', marginBottom: 20 }}>
          <Link to="/" style={{ color: '#71717A', textDecoration: 'none' }}>Home</Link> &nbsp;/&nbsp; <span style={{ color: '#09090B', fontWeight: 500 }}>How It Works</span>
        </div>

        {/* Hero */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ marginBottom: 56 }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 12px', borderRadius: 20, backgroundColor: '#F4F4F5', border: '1px solid #E4E4E7', fontSize: 12, fontWeight: 600, color: '#52525B', marginBottom: 16 }}>
            <span>Transparent Operating System Integration</span>
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: 16 }}>
            How BuilderOS Installs & Verifies on Windows
          </h1>
          <p style={{ fontSize: 18, color: '#52525B', lineHeight: 1.65, maxWidth: 780 }}>
            BuilderOS runs as a native local daemon directly on your machine. Every tool installation is physically executed via your operating system package managers, placed on your system PATH, and checked against real binary execution.
          </p>
        </motion.div>

        {/* 4 Steps Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginBottom: 64 }}>
          {/* Step 1 */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 14, border: '1px solid #E4E4E7', padding: 32, display: 'flex', gap: 24, alignItems: 'flex-start' }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, backgroundColor: '#09090B', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, flexShrink: 0 }}>
              1
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: '#71717A', letterSpacing: '0.05em' }}>Phase 1</span>
                <span style={{ color: '#E4E4E7' }}>•</span>
                <span style={{ fontSize: 12, color: '#16A34A', fontWeight: 600 }}>Zero False Positives</span>
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Hardware & Disk Inventory Audit</h3>
              <p style={{ fontSize: 15, color: '#52525B', lineHeight: 1.65, marginBottom: 16 }}>
                When you load BuilderOS, the local engine runs isolated scans strictly inside your user profile to detect physical installations across your machine. It checks:
              </p>
              <ul style={{ fontSize: 14, color: '#52525B', lineHeight: 1.8, paddingLeft: 20, marginBottom: 16 }}>
                <li><strong>Python Site-Packages</strong>: Reads your environment metadata via <code>python -m pip list --format=json</code>.</li>
                <li><strong>Global NPM Packages</strong>: Scans globally installed tools via <code>npm list -g --depth=0 --json</code>.</li>
                <li><strong>System PATH Binaries</strong>: Directly checks executable binaries (e.g. <code>docker</code>, <code>git</code>, <code>python</code>, <code>ollama</code>).</li>
              </ul>
              <div style={{ padding: '10px 14px', borderRadius: 8, backgroundColor: '#F4F4F5', border: '1px solid #E4E4E7', fontSize: 13, fontFamily: 'monospace', color: '#09090B' }}>
                C:\Users\vnekn&gt; python -m pip list --format=json
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 14, border: '1px solid #E4E4E7', padding: 32, display: 'flex', gap: 24, alignItems: 'flex-start' }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, backgroundColor: '#09090B', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, flexShrink: 0 }}>
              2
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: '#71717A', letterSpacing: '0.05em' }}>Phase 2</span>
                <span style={{ color: '#E4E4E7' }}>•</span>
                <span style={{ fontSize: 12, color: '#2563EB', fontWeight: 600 }}>Real Native Spawning</span>
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>1-Click Native Command Execution</h3>
              <p style={{ fontSize: 15, color: '#52525B', lineHeight: 1.65, marginBottom: 16 }}>
                When you click <strong>"Install Now"</strong>, BuilderOS does not download arbitrary pre-compiled blobs. It launches the trusted, native Windows package manager in a child process:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 16 }}>
                <div style={{ padding: 12, borderRadius: 8, border: '1px solid #E4E4E7', backgroundColor: '#FAFAFA' }}>
                  <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>Python Tools</div>
                  <code style={{ fontSize: 12, color: '#09090B' }}>pip install --user &lt;pkg&gt;</code>
                </div>
                <div style={{ padding: 12, borderRadius: 8, border: '1px solid #E4E4E7', backgroundColor: '#FAFAFA' }}>
                  <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>System Runtimes</div>
                  <code style={{ fontSize: 12, color: '#09090B' }}>winget install &lt;id&gt;</code>
                </div>
                <div style={{ padding: 12, borderRadius: 8, border: '1px solid #E4E4E7', backgroundColor: '#FAFAFA' }}>
                  <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>Node CLI Tools</div>
                  <code style={{ fontSize: 12, color: '#09090B' }}>npm install -g &lt;pkg&gt;</code>
                </div>
              </div>
              <p style={{ fontSize: 14, color: '#71717A', margin: 0 }}>
                Every line of output streams live into your browser in real time so you can inspect wheel downloads, extraction, and compilation.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 14, border: '1px solid #E4E4E7', padding: 32, display: 'flex', gap: 24, alignItems: 'flex-start' }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, backgroundColor: '#09090B', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, flexShrink: 0 }}>
              3
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: '#71717A', letterSpacing: '0.05em' }}>Phase 3</span>
                <span style={{ color: '#E4E4E7' }}>•</span>
                <span style={{ fontSize: 12, color: '#D97706', fontWeight: 600 }}>Immediate Terminal Usability</span>
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Windows PATH & Command Prompt Wrappers</h3>
              <p style={{ fontSize: 15, color: '#52525B', lineHeight: 1.65, marginBottom: 16 }}>
                In Windows, Python packages installed into <code>AppData\Roaming\Python\Scripts</code> often fail to run because the folder isn't in PATH. BuilderOS permanently adds this to your User PATH and automatically writes batch wrappers (<code>.cmd</code>) into your global npm directory:
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                {['chromadb.cmd', 'fastapi.cmd', 'uvicorn.cmd', 'jupyter.cmd', 'openai.cmd', 'huggingface-cli.cmd', 'pytest.cmd', 'torchrun.cmd'].map(tool => (
                  <span key={tool} style={{ padding: '4px 10px', borderRadius: 6, backgroundColor: '#F4F4F5', border: '1px solid #E4E4E7', fontSize: 12, fontFamily: 'monospace' }}>
                    {tool}
                  </span>
                ))}
              </div>
              <p style={{ fontSize: 14, color: '#71717A', margin: 0 }}>
                This means you can open any Command Prompt or PowerShell and run <code>chromadb -V</code> or <code>fastapi dev</code> immediately without manual PATH editing.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 14, border: '1px solid #E4E4E7', padding: 32, display: 'flex', gap: 24, alignItems: 'flex-start' }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, backgroundColor: '#09090B', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, flexShrink: 0 }}>
              4
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: '#71717A', letterSpacing: '0.05em' }}>Phase 4</span>
                <span style={{ color: '#E4E4E7' }}>•</span>
                <span style={{ fontSize: 12, color: '#16A34A', fontWeight: 600 }}>Exit-Code 0 Guarantee</span>
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Independent Verification & Version Tracking</h3>
              <p style={{ fontSize: 15, color: '#52525B', lineHeight: 1.65, marginBottom: 16 }}>
                Once installation exits, BuilderOS spawns an independent verification process to test runtime import and extract the version directly from your operating system:
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: 8, backgroundColor: '#09090B', color: '#F4F4F5', fontSize: 13, fontFamily: 'monospace', marginBottom: 16 }}>
                <span>python -c &quot;import duckdb; print(duckdb.__version__)&quot;</span>
                <button 
                  onClick={() => handleCopy('python -c "import duckdb; print(duckdb.__version__)"', 4)}
                  style={{ background: 'none', border: 'none', color: '#A1A1AA', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}
                >
                  {copiedStep === 4 ? <CheckCheck size={14} color="#22C55E" /> : <Copy size={14} />}
                  <span>{copiedStep === 4 ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <p style={{ fontSize: 14, color: '#71717A', margin: 0 }}>
                If the verification check fails, BuilderOS marks the job as an error with troubleshooting logs. If it succeeds, it checks whether your version is <strong>Up to date</strong> or if an <strong>Update is Available</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div style={{ textAlign: 'center', padding: '48px 24px', backgroundColor: '#FFFFFF', borderRadius: 16, border: '1px solid #E4E4E7' }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Ready to manage your toolchains with zero mock data?</h3>
          <p style={{ fontSize: 15, color: '#71717A', maxWidth: 520, margin: '0 auto 24px auto' }}>
            Sign in to access the full interactive environment dashboard, catalog filters, and live terminal streaming.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
            <Link to={isAuthenticated ? '/app' : '/signup'} className="btn btn-primary btn-md">
              {isAuthenticated ? 'Open Dashboard' : 'Create Free Account'} <ArrowRight size={15} />
            </Link>
            <Link to="/about" className="btn btn-secondary btn-md">
              About the Platform
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
