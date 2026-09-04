import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MarkdownMessage({ content = '' }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (codeText, idx) => {
    navigator.clipboard.writeText(codeText.trim());
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Split content by code blocks
  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="markdown-body" style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text-primary)' }}>
      {parts.map((part, index) => {
        if (part.startsWith('```') && part.endsWith('```')) {
          const lines = part.slice(3, -3).trim().split('\n');
          const lang = lines[0].trim().toLowerCase();
          const hasLang = ['powershell', 'bash', 'sh', 'json', 'javascript', 'python', 'cmd'].includes(lang);
          const codeLines = hasLang ? lines.slice(1).join('\n') : lines.join('\n');
          const codeLanguage = hasLang ? lang : 'code';

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                margin: '12px 0',
                borderRadius: 8,
                overflow: 'hidden',
                backgroundColor: '#0F172A',
                border: '1px solid #1E293B',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
              }}
            >
              {/* Terminal Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  backgroundColor: '#1E293B',
                  borderBottom: '1px solid #334155'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#EF4444' }} />
                  <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#F59E0B' }} />
                  <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#10B981' }} />
                  <span
                    style={{
                      marginLeft: 8,
                      fontSize: 11,
                      fontFamily: 'var(--font-mono)',
                      color: '#94A3B8',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}
                  >
                    {codeLanguage}
                  </span>
                </div>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCopy(codeLines, index)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    padding: '3px 8px',
                    borderRadius: 4,
                    fontSize: 11,
                    fontWeight: 600,
                    backgroundColor: copiedIndex === index ? '#065F46' : 'rgba(255,255,255,0.1)',
                    color: copiedIndex === index ? '#34D399' : '#E2E8F0',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {copiedIndex === index ? (
                    <>
                      <Check size={12} />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>Copy</span>
                    </>
                  )}
                </motion.button>
              </div>

              {/* Code Content */}
              <pre
                style={{
                  padding: '12px 14px',
                  margin: 0,
                  fontSize: 13,
                  fontFamily: 'var(--font-mono)',
                  color: '#F8FAFC',
                  overflowX: 'auto',
                  lineHeight: 1.5
                }}
              >
                <code>{codeLines}</code>
              </pre>
            </motion.div>
          );
        }

        // Render formatted text
        return <FormattedTextBlock key={index} text={part} />;
      })}
    </div>
  );
}

function FormattedTextBlock({ text }) {
  const lines = text.split('\n');

  return (
    <div>
      {lines.map((line, lIdx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={lIdx} style={{ height: 8 }} />;
        }

        // Heading 3
        if (trimmed.startsWith('### ')) {
          return (
            <h3
              key={lIdx}
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginTop: 14,
                marginBottom: 6,
                letterSpacing: '-0.01em'
              }}
            >
              {renderInlineStyles(trimmed.slice(4))}
            </h3>
          );
        }

        // Heading 4
        if (trimmed.startsWith('#### ')) {
          return (
            <h4
              key={lIdx}
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginTop: 10,
                marginBottom: 4
              }}
            >
              {renderInlineStyles(trimmed.slice(5))}
            </h4>
          );
        }

        // Blockquote
        if (trimmed.startsWith('> ')) {
          return (
            <blockquote
              key={lIdx}
              style={{
                borderLeft: '3px solid var(--accent-primary)',
                paddingLeft: 12,
                margin: '8px 0',
                color: 'var(--text-secondary)',
                fontStyle: 'italic',
                backgroundColor: 'var(--bg-secondary)',
                padding: '6px 12px',
                borderRadius: '0 6px 6px 0'
              }}
            >
              {renderInlineStyles(trimmed.slice(2))}
            </blockquote>
          );
        }

        // Bullet point
        if (trimmed.startsWith('• ') || trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          return (
            <div
              key={lIdx}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 8,
                margin: '3px 0 3px 6px'
              }}
            >
              <span style={{ color: 'var(--accent-primary)', fontSize: 14, fontWeight: 700 }}>•</span>
              <span style={{ flex: 1 }}>{renderInlineStyles(trimmed.replace(/^[•\-*]\s+/, ''))}</span>
            </div>
          );
        }

        // Numbered list
        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
        if (numMatch) {
          return (
            <div
              key={lIdx}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 8,
                margin: '3px 0 3px 6px'
              }}
            >
              <span style={{ color: 'var(--accent-primary)', fontSize: 12, fontWeight: 700, minWidth: 16 }}>
                {numMatch[1]}.
              </span>
              <span style={{ flex: 1 }}>{renderInlineStyles(numMatch[2])}</span>
            </div>
          );
        }

        // Normal paragraph
        return (
          <p key={lIdx} style={{ margin: '4px 0' }}>
            {renderInlineStyles(line)}
          </p>
        );
      })}
    </div>
  );
}

function renderInlineStyles(text) {
  if (!text) return null;

  // Split by inline code `code`
  const codeParts = text.split(/(`[^`]+`)/g);

  return codeParts.map((part, pIdx) => {
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return (
        <code
          key={pIdx}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            padding: '1px 5px',
            borderRadius: 4,
            backgroundColor: 'var(--bg-hover)',
            border: '1px solid var(--border-default)',
            color: 'var(--accent-primary)',
            fontWeight: 500
          }}
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    // Split by bold **text**
    const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
    return boldParts.map((bPart, bIdx) => {
      if (bPart.startsWith('**') && bPart.endsWith('**') && bPart.length > 4) {
        return (
          <strong key={`${pIdx}-${bIdx}`} style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
            {bPart.slice(2, -2)}
          </strong>
        );
      }
      return bPart;
    });
  });
}
