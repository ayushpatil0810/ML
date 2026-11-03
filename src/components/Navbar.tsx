import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Terminal, BookOpen } from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand-logo" title="ML Practical Hub - Home">
          <div className="logo-icon-box">
            <Terminal size={20} className="logo-icon" />
          </div>
          <div className="brand-text">
            <span className="brand-title">ML Practical Hub</span>
            <span className="brand-subtitle">Machine Learning Practical Codes</span>
          </div>
        </Link>

        <nav className="header-nav">
          {!isHome && (
            <Link to="/" className="nav-link home-btn">
              <BookOpen size={16} />
              <span>All Practicals</span>
            </Link>
          )}
          <span className="exam-mode-badge" title="Optimized for quick exam lookup">
            Exam Ready
          </span>
        </nav>
      </div>
    </header>
  );
};

