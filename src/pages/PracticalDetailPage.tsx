import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  AlertCircle,
  Code2,
  Database,
  ListOrdered,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { practicalsData, getPracticalById, getNeighborPracticals } from '../data/practicals';
import { CodeBlockView } from '../components/CodeBlockView';
import { copyToClipboard } from '../utils/clipboard';

export const PracticalDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedAlgo, setCopiedAlgo] = useState(false);
  const [algoOpen, setAlgoOpen] = useState(true);

  const practical = id ? getPracticalById(id) : undefined;
  const { prev, next } = id ? getNeighborPracticals(id) : { prev: null, next: null };

  if (!practical) {
    return (
      <main className="main-content">
        <div className="not-found-card">
          <AlertCircle size={40} className="error-icon" />
          <h1>Practical Not Found</h1>
          <p>We couldn't find practical "{id}".</p>
          <Link to="/" className="back-home-link">
            <ArrowLeft size={16} />
            <span>Back to Practicals</span>
          </Link>
        </div>
      </main>
    );
  }

  const hasMultipleBlocks = practical.codeBlocks.length > 1;

  // Handler to copy all code blocks combined
  const handleCopyAll = async () => {
    const allCode = practical.codeBlocks
      .map((block) => {
        const header = block.title ? `# === ${block.title} ===\n` : '';
        return `${header}${block.code}`;
      })
      .join('\n\n');

    const success = await copyToClipboard(allCode);
    if (success) {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    }
  };

  // Handler to copy algorithm steps
  const handleCopyAlgo = async () => {
    if (!practical.algorithm) return;
    const text = practical.algorithm.join('\n');
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedAlgo(true);
      setTimeout(() => setCopiedAlgo(false), 2000);
    }
  };

  return (
    <main className="main-content detail-view">
      {/* Top Navigation Row */}
      <div className="detail-top-bar">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="back-btn"
          aria-label="Back to practicals"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>

        <div className="practical-pager">
          {prev ? (
            <Link
              to={`/practical/${prev.id}`}
              className="pager-btn"
              title={`Practical ${prev.number}: ${prev.topic || prev.title}`}
            >
              <ChevronLeft size={14} />
              <span className="pager-text">P{prev.number}</span>
            </Link>
          ) : (
            <span className="pager-btn disabled">
              <ChevronLeft size={14} />
              <span className="pager-text">Prev</span>
            </span>
          )}

          <span className="pager-current">
            {practical.number} / {practicalsData.length}
          </span>

          {next ? (
            <Link
              to={`/practical/${next.id}`}
              className="pager-btn"
              title={`Practical ${next.number}: ${next.topic || next.title}`}
            >
              <span className="pager-text">P{next.number}</span>
              <ChevronRight size={14} />
            </Link>
          ) : (
            <span className="pager-btn disabled">
              <span className="pager-text">Next</span>
              <ChevronRight size={14} />
            </span>
          )}
        </div>
      </div>

      {/* Practical Header */}
      <section className="practical-header">
        <div className="header-meta-row">
          <div className="practical-num-tag">
            <span>PRACTICAL {String(practical.number).padStart(2, '0')}</span>
            {practical.topic && (
              <>
                <span className="num-tag-divider">&bull;</span>
                <span className="practical-topic-highlight">{practical.topic}</span>
              </>
            )}
          </div>

          <div className="header-actions">
            {hasMultipleBlocks && (
              <button
                type="button"
                onClick={handleCopyAll}
                className={`copy-all-btn ${copiedAll ? 'copied' : ''}`}
                title="Copy all code blocks combined into clipboard"
              >
                {copiedAll ? (
                  <>
                    <Check size={14} />
                    <span>All Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy All Code</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        <h1 className="practical-main-title">{practical.title}</h1>

        {practical.dataset && (
          <div className="dataset-badge-container">
            <span className="dataset-badge">
              <Database size={13} />
              <span>Dataset: <strong>{practical.dataset}</strong></span>
            </span>
          </div>
        )}

        {practical.description && (
          <p className="practical-main-desc">{practical.description}</p>
        )}
      </section>

      {/* Algorithm / Procedure Section */}
      {practical.algorithm && practical.algorithm.length > 0 && (
        <section className="algorithm-card">
          <div className="algorithm-header">
            <button
              type="button"
              className="algorithm-toggle-btn"
              onClick={() => setAlgoOpen(!algoOpen)}
              aria-expanded={algoOpen}
            >
              <ListOrdered size={15} />
              <span className="algorithm-heading">Algorithm / Procedure</span>
              <span className="algo-steps-count">({practical.algorithm.length} steps)</span>
              {algoOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            </button>

            <button
              type="button"
              onClick={handleCopyAlgo}
              className={`copy-algo-btn ${copiedAlgo ? 'copied' : ''}`}
              title="Copy all algorithm steps"
            >
              {copiedAlgo ? (
                <>
                  <Check size={13} />
                  <span>Steps Copied</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>Copy Steps</span>
                </>
              )}
            </button>
          </div>

          {algoOpen && (
            <ol className="algorithm-steps-list">
              {practical.algorithm.map((step, idx) => {
                const cleanedText = step.replace(/^Step\s*\d+\s*:\s*/i, '');
                return (
                  <li key={idx} className="algorithm-step-item">
                    <span className="step-num">{idx + 1}</span>
                    <span className="step-text">{cleanedText}</span>
                  </li>
                );
              })}
            </ol>
          )}
        </section>
      )}

      {/* Code Blocks Section */}
      <section className="code-blocks-list" aria-label="Practical Code Blocks">
        {practical.codeBlocks.length > 0 ? (
          practical.codeBlocks.map((block, index) => (
            <CodeBlockView
              key={block.id || `block-${index}`}
              code={block.code}
              language={block.language || 'python'}
              title={block.title}
              description={block.description}
              blockNumber={hasMultipleBlocks ? index + 1 : undefined}
              output={block.output}
            />
          ))
        ) : (
          <div className="empty-code-notice">
            <Code2 size={24} className="empty-code-icon" />
            <h3 className="empty-code-heading">No code added yet</h3>
            <p className="empty-code-sub">Python code for Practical {practical.number} will appear here.</p>
          </div>
        )}
      </section>

      {/* Bottom Pager */}
      <nav className="detail-bottom-nav">
        {prev ? (
          <Link to={`/practical/${prev.id}`} className="bottom-nav-card prev">
            <span className="nav-sub">Previous</span>
            <span className="nav-main">
              <ChevronLeft size={16} />
              P{prev.number}: {prev.topic || prev.title}
            </span>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link to={`/practical/${next.id}`} className="bottom-nav-card next">
            <span className="nav-sub">Next</span>
            <span className="nav-main">
              P{next.number}: {next.topic || next.title}
              <ChevronRight size={16} />
            </span>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </main>
  );
};
