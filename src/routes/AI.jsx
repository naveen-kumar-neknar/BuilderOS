import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Loader2, 
  Cpu, 
  Zap, 
  RotateCcw,
  Bot,
  User,
  Key,
  ChevronDown,
  Terminal
} from 'lucide-react';
import { aiService } from '../services/ai';
import { useToast } from '../context/ToastContext';
import StackInstallPlanModal from '../components/installation/StackInstallPlanModal';
import MarkdownMessage from '../components/ui/MarkdownMessage';
import { motion, AnimatePresence } from 'framer-motion';

export default function AI({ 
  technologies = [], 
  detectedInstalls = {}, 
  onInstallTech,
  onInstalled 
}) {
  const { showToast } = useToast();

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I am your BuilderOS Machine & Stack Assistant.\n\nI can analyze your system environment, recommend compatible developer toolchains across classic, modern and cutting-edge eras (including NumPy, Pandas, Matplotlib, Scikit-Learn with TF-IDF vectorization, Ollama, and Bun), filter between 100% Free/FOSS vs Commercial tools, and generate 1-click installation plans.\n\nWhat toolchain or technology stack are you configuring today?",
      recommendations: []
    }
  ]);

  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [activePlanTechs, setActivePlanTechs] = useState(null);
  const [aiStatus, setAiStatus] = useState(null);
  const [pricingPreference, setPricingPreference] = useState('all'); // 'all' | 'free_only' | 'commercial'
  const [userScrolledUp, setUserScrolledUp] = useState(false);

  // Custom API Key Management
  const [customApiKey, setCustomApiKey] = useState(() => localStorage.getItem('hackwave_custom_ai_key') || '');
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [tempApiKey, setTempApiKey] = useState('');

  const messagesContainerRef = useRef(null);

  const promptSuggestions = [
    "Set up a complete Python Data Science stack (NumPy, Pandas, Matplotlib, Scikit-Learn with TF-IDF, Seaborn).",
    "Recommend a 100% Free local AI stack (Ollama + PyTorch + ChromaDB).",
    "Compare Polars vs Pandas for high-throughput columnar processing.",
    "Explain DuckDB vs SQLite for in-process analytical data science.",
    "Modern Backend: Node.js vs Bun vs FastAPI."
  ];

  // Fetch backend inference status
  useEffect(() => {
    async function checkStatus() {
      try {
        const s = await aiService.getStatus();
        setAiStatus(s);
      } catch {}
    }
    checkStatus();
  }, []);

  // Precise Internal Container Scrolling (Never touches parent/window)
  const scrollToBottom = (behavior = 'smooth') => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior
      });
    }
  };

  // Scroll listener to detect if user manually scrolled up to read history
  const handleMessagesScroll = () => {
    if (!messagesContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 120;
    setUserScrolledUp(!isNearBottom);
  };

  // Auto-scroll only when appropriate (e.g. user near bottom or new user message)
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === 'user' || !userScrolledUp) {
      scrollToBottom('smooth');
    }
  }, [messages, loading, userScrolledUp]);

  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputValue).trim();
    if (!text || loading) return;

    const userMessage = { role: 'user', content: text };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInputValue('');
    setLoading(true);
    setUserScrolledUp(false);

    const installedNames = Object.entries(detectedInstalls)
      .filter(([, d]) => d?.installed)
      .map(([slug]) => {
        const t = technologies.find(x => x.slug === slug);
        return t ? t.name : slug;
      });

    try {
      const response = await aiService.sendMessage(
        nextMessages, 
        {
          os: 'Windows 11 (x64)',
          installedTools: installedNames,
          pricingPreference: pricingPreference === 'free_only' 
            ? 'STRICT REQUIREMENT: Recommend ONLY 100% Free & Open-Source (FOSS) tools. Do not recommend paid APIs or subscriptions.' 
            : pricingPreference === 'commercial' 
            ? 'Include top commercial and enterprise cloud tools alongside open-source.' 
            : 'Any suitable tools (free or commercial).'
        },
        customApiKey || null
      );

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: response.message?.content || 'Here are my recommendations.',
          recommendations: response.recommendations || []
        }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Communication notice: ${err.message}. Showing verified catalog guidance.`,
          recommendations: []
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSaveApiKey = () => {
    const trimmed = tempApiKey.trim();
    setCustomApiKey(trimmed);
    if (trimmed) {
      localStorage.setItem('hackwave_custom_ai_key', trimmed);
      showToast?.('Custom AI API key saved successfully.', 'success');
    } else {
      localStorage.removeItem('hackwave_custom_ai_key');
      showToast?.('Switched to default catalog mode.', 'info');
    }
    setShowApiKeyModal(false);
  };

  const installedList = Object.entries(detectedInstalls)
    .filter(([, d]) => d?.installed)
    .map(([slug, d]) => {
      const t = technologies.find(x => x.slug === slug);
      return { slug, name: t?.name || slug, version: d.version };
    });

  return (
    <div style={{ height: '100%', width: '100%', overflow: 'hidden' }}>
      <div className="ai-workspace" style={{ height: '100%' }}>
        {/* Left Topics / History */}
        <aside className="ai-sidebar">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 12, borderBottom: '1px solid var(--border-default)' }}>
            <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-primary)' }}>
              Stack Inquiries
            </span>
            <button
              type="button"
              className="btn btn-ghost btn-xs"
              onClick={() => setMessages([messages[0]])}
              title="Reset conversation"
            >
              <RotateCcw size={12} />
              Reset
            </button>
          </div>

          {/* Quick Prompts List */}
          <div style={{ marginTop: 8 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8 }}>
              Curated Architecture Prompts
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {promptSuggestions.map((prompt, i) => (
                <button
                  key={i}
                  type="button"
                  className="btn btn-ghost btn-sm"
                  style={{
                    justifyContent: 'flex-start',
                    textAlign: 'left',
                    fontSize: 12,
                    lineHeight: 1.4,
                    whiteSpace: 'normal',
                    height: 'auto',
                    padding: '8px 10px',
                    borderRadius: 6,
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--border-default)',
                    color: 'var(--text-secondary)'
                  }}
                  onClick={() => handleSendMessage(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Center Conversation */}
        <div className="ai-main" style={{ height: '100%', minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Preference Strip & API Key Status */}
          <div 
            style={{ 
              padding: '10px 18px', 
              backgroundColor: '#FFFFFF', 
              borderBottom: '1px solid var(--border-default)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              flexWrap: 'wrap', 
              gap: 10, 
              fontSize: 12 
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Filter Recommendation:</span>
              <div style={{ display: 'flex', gap: 4 }}>
                <button
                  type="button"
                  className={`btn btn-xs ${pricingPreference === 'all' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setPricingPreference('all')}
                  style={{ fontSize: 11, padding: '3px 8px', borderRadius: 4 }}
                >
                  All Tools
                </button>
                <button
                  type="button"
                  className={`btn btn-xs ${pricingPreference === 'free_only' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setPricingPreference('free_only')}
                  style={{ fontSize: 11, padding: '3px 8px', borderRadius: 4, color: pricingPreference === 'free_only' ? '#FFFFFF' : '#15803D' }}
                >
                  🟢 100% Free / FOSS Only
                </button>
                <button
                  type="button"
                  className={`btn btn-xs ${pricingPreference === 'commercial' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setPricingPreference('commercial')}
                  style={{ fontSize: 11, padding: '3px 8px', borderRadius: 4 }}
                >
                  Include Commercial APIs
                </button>
              </div>
            </div>

            {/* API Key Configure Button */}
            <button
              type="button"
              onClick={() => {
                setTempApiKey(customApiKey);
                setShowApiKeyModal(true);
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '4px 10px',
                borderRadius: 6,
                fontSize: 11,
                fontWeight: 600,
                backgroundColor: customApiKey ? '#F0FDF4' : 'var(--bg-secondary)',
                color: customApiKey ? '#15803D' : 'var(--text-secondary)',
                border: customApiKey ? '1px solid #BBF7D0' : '1px solid var(--border-default)',
                cursor: 'pointer'
              }}
            >
              <Key size={12} />
              {customApiKey ? 'Custom API Key Active' : 'Configure API Key'}
            </button>
          </div>

          {/* Messages Container with Independent Smooth Scrolling */}
          <div 
            className="ai-messages" 
            ref={messagesContainerRef}
            onScroll={handleMessagesScroll}
            style={{ 
              flex: '1 1 0%', 
              minHeight: 0, 
              overflowY: 'auto', 
              overscrollBehavior: 'contain',
              padding: '24px 28px',
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              position: 'relative'
            }}
          >
            <AnimatePresence initial={false}>
              {messages.map((msg, index) => {
                const isUser = msg.role === 'user';
                return (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: isUser ? 'flex-end' : 'flex-start' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4, fontSize: 12, color: 'var(--text-muted)' }}>
                      {isUser ? <User size={13} /> : <Bot size={13} style={{ color: 'var(--accent-primary)' }} />}
                      <span style={{ fontWeight: 600 }}>{isUser ? 'You' : 'BuilderOS Machine Assistant'}</span>
                    </div>

                    <div className={isUser ? 'ai-bubble-user' : 'ai-bubble-assistant'}>
                      {isUser ? (
                        <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>{msg.content}</div>
                      ) : (
                        <MarkdownMessage content={msg.content} />
                      )}

                      {/* Render Structured Recommendation Cards */}
                      {msg.recommendations && msg.recommendations.length > 0 && (
                        <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--border-default)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                              Recommended Toolchain ({msg.recommendations.length})
                            </span>

                            <button
                              type="button"
                              className="btn btn-primary btn-sm"
                              onClick={() => setActivePlanTechs(msg.recommendations)}
                            >
                              <Zap size={13} />
                              Review & Install Plan
                            </button>
                          </div>

                          <div className="ai-recommendations-row">
                            {msg.recommendations.map((rec, rIdx) => {
                              const isInstalled = detectedInstalls[rec.slug]?.installed;
                              const targetTech = technologies.find((t) => t.slug === rec.slug);

                              return (
                                <div 
                                  key={rec.slug || rIdx} 
                                  className="ai-rec-card"
                                >
                                  <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                                      <strong style={{ fontSize: 14, color: 'var(--text-primary)' }}>{rec.name}</strong>
                                      {isInstalled ? (
                                        <span className="badge badge-installed" style={{ fontSize: 10 }}>Installed</span>
                                      ) : (
                                        <span className="badge badge-neutral" style={{ fontSize: 10 }}>Available</span>
                                      )}
                                    </div>
                                    {targetTech?.pricing && (
                                      <div style={{ marginBottom: 6 }}>
                                        <span 
                                          className={`badge ${targetTech.pricing === 'free' ? 'badge-installed' : 'badge-neutral'}`} 
                                          style={{ fontSize: 10, padding: '1px 6px' }}
                                        >
                                          {targetTech.pricingTier || (targetTech.pricing === 'free' ? '🟢 100% Free' : '💳 Commercial')}
                                        </span>
                                      </div>
                                    )}
                                    <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                                      {rec.reason}
                                    </p>
                                  </div>

                                  <button
                                    type="button"
                                    className={`btn btn-sm ${isInstalled ? 'btn-secondary' : 'btn-primary'}`}
                                    style={{ width: '100%', marginTop: 8 }}
                                    onClick={() => {
                                      if (targetTech) onInstallTech?.(targetTech);
                                      else onInstallTech?.({ slug: rec.slug, name: rec.name, description: rec.reason, version: 'latest' });
                                    }}
                                  >
                                    <Zap size={12} />
                                    {isInstalled ? 'Reinstall' : 'Install Recipe'}
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {loading && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontSize: 13, padding: 8 }}>
                <Loader2 size={16} className="spin" />
                <span>BuilderOS Machine Assistant is analyzing compatibility and dependencies...</span>
              </div>
            )}
          </div>

          {/* Floating Scroll to Bottom Indicator if user scrolled up */}
          <AnimatePresence>
            {userScrolledUp && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                type="button"
                onClick={() => {
                  setUserScrolledUp(false);
                  scrollToBottom('smooth');
                }}
                style={{
                  position: 'absolute',
                  bottom: 120,
                  right: 320,
                  padding: '6px 14px',
                  borderRadius: 20,
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border-default)',
                  boxShadow: 'var(--shadow-md)',
                  color: 'var(--text-primary)',
                  fontSize: 12,
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  cursor: 'pointer',
                  zIndex: 20
                }}
              >
                <span>Scroll to latest</span>
                <ChevronDown size={14} />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Quick Clickable Chips Bar */}
          <div className="quick-prompts-bar">
            {[
              "NumPy + Pandas + Matplotlib",
              "Scikit-Learn (TF-IDF)",
              "Polars vs Pandas",
              "DuckDB Analytics",
              "100% Free AI (Ollama)",
              "Node.js vs Bun"
            ].map((chipText, cIdx) => (
              <button
                key={cIdx}
                type="button"
                className="quick-prompt-pill"
                onClick={() => handleSendMessage(chipText)}
              >
                <Terminal size={11} style={{ color: 'var(--text-muted)' }} />
                <span>{chipText}</span>
              </button>
            ))}
          </div>

          {/* Bottom Prompt Bar */}
          <div className="ai-input-bar">
            <textarea
              placeholder="Ask about technologies, compatibility, or stack setup... (Press Enter to send)"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleSendMessage()}
              disabled={loading || !inputValue.trim()}
              style={{ height: 44, width: 44, padding: 0 }}
              title="Send message"
            >
              {loading ? <Loader2 size={16} className="spin" /> : <Send size={16} />}
            </button>
          </div>
        </div>

        {/* Right Live Context Panel */}
        <aside className="ai-context-panel">
          <div className="context-section">
            <div className="context-title">Machine Runtime Environment</div>
            <div style={{ padding: 12, backgroundColor: '#FFFFFF', border: '1px solid var(--border-default)', borderRadius: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-primary)' }}>
                <Cpu size={15} style={{ color: 'var(--accent-primary)' }} />
                Windows 11 (x64)
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
                Package Managers: winget / pip / npm
              </div>
            </div>
          </div>

          <div className="context-section">
            <div className="context-title">Detected Installed Tools ({installedList.length})</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 180, overflowY: 'auto' }}>
              {installedList.length === 0 ? (
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>No installed packages detected yet</div>
              ) : (
                installedList.map((item) => (
                  <div key={item.slug} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '6px 8px', backgroundColor: '#FFFFFF', border: '1px solid var(--border-default)', borderRadius: 6 }}>
                    <span style={{ fontWeight: 500 }}>{item.name}</span>
                    <span style={{ color: 'var(--success)', fontWeight: 600 }}>✓</span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="context-section">
            <div className="context-title">Inference Engine</div>
            <div style={{ padding: 12, backgroundColor: '#FFFFFF', border: '1px solid var(--border-default)', borderRadius: 8, fontSize: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ color: 'var(--text-secondary)' }}>Provider:</span>
                <span style={{ fontWeight: 600 }}>
                  {customApiKey ? 'Custom Featherless / OpenAI' : aiStatus?.configured ? 'Featherless Cloud' : 'Verified Catalog Engine'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ color: 'var(--text-secondary)' }}>Model:</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>{aiStatus?.model || 'Qwen2.5-7B'}</span>
              </div>
              <button
                type="button"
                className="btn btn-secondary btn-xs"
                style={{ width: '100%', marginTop: 4, justifyContent: 'center' }}
                onClick={() => {
                  setTempApiKey(customApiKey);
                  setShowApiKeyModal(true);
                }}
              >
                <Key size={11} />
                {customApiKey ? 'Manage Custom Key' : 'Add Featherless API Key'}
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* API Key Modal */}
      {showApiKeyModal && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: 20
          }}
          onClick={() => setShowApiKeyModal(false)}
        >
          <div 
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 12,
              border: '1px solid var(--border-default)',
              boxShadow: 'var(--shadow-modal)',
              maxWidth: 480,
              width: '100%',
              padding: 24
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <Key size={20} style={{ color: 'var(--accent-primary)' }} />
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>Configure AI Inference Key</h3>
            </div>
            
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 16 }}>
              Enter your <strong>Featherless.ai</strong> API key or custom OpenAI-compatible endpoint key. It will be stored locally in your browser and used for live model completions. If left blank, BuilderOS uses the built-in verified technology knowledge engine.
            </p>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 6, color: 'var(--text-primary)' }}>
                API Key:
              </label>
              <input
                type="password"
                placeholder="Enter your Featherless.ai key (e.g. featherless_... or sk-...)"
                value={tempApiKey}
                onChange={(e) => setTempApiKey(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: 6,
                  border: '1px solid var(--border-default)',
                  fontSize: 13,
                  fontFamily: 'var(--font-mono)'
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setShowApiKeyModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={handleSaveApiKey}
              >
                Save & Apply Key
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review & Install Plan Modal */}
      {activePlanTechs && (
        <StackInstallPlanModal
          title="Install Recommended Environment"
          description="Review the tools suggested by the BuilderOS Assistant before installing."
          technologies={activePlanTechs}
          detectedInstalls={detectedInstalls}
          onClose={() => setActivePlanTechs(null)}
          onInstalled={onInstalled}
          onShowToast={showToast}
        />
      )}
    </div>
  );
}
