import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <main className="main-content">
      <div className="not-found-card">
        <AlertTriangle size={52} className="error-icon" />
        <h1>404 - Page Not Found</h1>
        <p>The page or practical you are looking for does not exist.</p>
        <Link to="/" className="back-home-link">
          <Home size={18} />
          <span>Go to Home</span>
        </Link>
      </div>
    </main>
  );
};

