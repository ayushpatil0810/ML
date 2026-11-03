import React, { useState, useMemo } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import { Copy, Check, Terminal } from 'lucide-react';
import { copyToClipboard } from '../utils/clipboard';

interface CodeBlockViewProps {
  code: string;
  language?: string;
  title?: string;
  description?: string;
  blockNumber?: number;
  output?: string;
}

export const CodeBlockView: React.FC<CodeBlockViewProps> = ({
  code,
  language = 'python',
  title,
  description,
  blockNumber,
  output,
}) => {
  const [copied, setCopied] = useState(false);

  // Compute line count
  const lineCount = useMemo(() => {
    return code ? code.trim().split('\n').length : 0;
  }, [code]);

  // Syntax highlighting
  const highlightedCode = useMemo(() => {
    try {
      const grammar = Prism.languages[language] || Prism.languages.python;
      return Prism.highlight(code, grammar, language);
    } catch {
      return code;
    }
  }, [code, language]);

  const handleCopy = async () => {
    const success = await copyToClipboard(code);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="code-block-container">
      {/* Code Header Bar */}
      <div className="code-block-header">
        <div className="code-block-info">
          {blockNumber && (
            <span className="code-block-badge">Block #{blockNumber}</span>
          )}
          <span className="code-block-lang">
            {language.toUpperCase()}
          </span>
          {title && <span className="code-block-title">{title}</span>}
          {lineCount > 0 && (
            <span className="code-block-meta">
              {lineCount} {lineCount === 1 ? 'line' : 'lines'}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className={`copy-btn ${copied ? 'copied' : ''}`}
          aria-label="Copy entire code to clipboard"
          title="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check size={14} className="copy-icon" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy size={14} className="copy-icon" />
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>

      {description && (
        <div className="code-block-desc">
          <p>{description}</p>
        </div>
      )}

      {/* Code Viewport with Syntax Highlighting */}
      <div className="code-scroll-area">
        <pre className="code-pre">
          <code
            className={`language-${language}`}
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </pre>
      </div>

      {/* Optional Output Terminal Box */}
      {output && (
        <div className="code-output-box">
          <div className="output-header">
            <Terminal size={12} className="output-icon" />
            <span className="output-title">Expected Output</span>
          </div>
          <pre className="output-pre">
            <code>{output}</code>
          </pre>
        </div>
      )}
    </div>
  );
};
