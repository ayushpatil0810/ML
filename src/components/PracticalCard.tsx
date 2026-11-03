import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Practical } from '../types/practical';

interface PracticalCardProps {
  practical: Practical;
}

export const PracticalCard: React.FC<PracticalCardProps> = ({ practical }) => {
  const codeBlockCount = practical.codeBlocks?.length || 0;

  return (
    <Link
      to={`/practical/${practical.id}`}
      className="practical-card-grid"
      title={`Open Practical ${practical.number}: ${practical.title}`}
    >
      <div className="card-top">
        <div className="card-top-left">
          <span className="card-index">
            {String(practical.number).padStart(2, '0')}
          </span>
          {practical.topic && (
            <span className="card-topic-tag">{practical.topic}</span>
          )}
        </div>
        <div className="card-arrow">
          <ArrowUpRight size={16} />
        </div>
      </div>

      <div className="card-content">
        <h2 className="card-title">{practical.title}</h2>
      </div>

      <div className="card-footer-meta">
        <span className="card-meta-tag">Python</span>
        {practical.dataset && (
          <span className="card-meta-dataset">
            {practical.dataset.split('(')[0].trim()}
          </span>
        )}
        <span className="card-meta-count">
          {codeBlockCount > 0
            ? `${codeBlockCount} ${codeBlockCount === 1 ? 'code' : 'codes'}`
            : 'No code yet'}
        </span>
      </div>
    </Link>
  );
};
