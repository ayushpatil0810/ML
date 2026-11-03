import React, { useState, useMemo } from 'react';
import { practicalsData } from '../data/practicals';
import { PracticalCard } from '../components/PracticalCard';
import { Search, X } from 'lucide-react';

export const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPracticals = useMemo(() => {
    if (!searchQuery.trim()) return practicalsData;
    const query = searchQuery.toLowerCase().trim();
    return practicalsData.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        String(p.number).includes(query) ||
        p.description?.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <main className="main-content home-view">
      {/* Header Section */}
      <section className="hero-section">
        <h1 className="hero-title">ML Practical Hub</h1>
        <p className="hero-subtitle">Machine Learning Practical Codes</p>
      </section>

      {/* Search and Filter Bar */}
      <div className="list-controls">
        <div className="search-input-wrapper">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search practicals (e.g. 1, 2, regression)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => setSearchQuery('')}
              title="Clear search"
            >
              <X size={15} />
            </button>
          )}
        </div>

        <div className="count-info">
          {filteredPracticals.length} practical{filteredPracticals.length === 1 ? '' : 's'}
        </div>
      </div>

      {/* Practical Cards Grid */}
      <section className="practicals-grid" aria-label="Machine Learning Practicals">
        {filteredPracticals.length > 0 ? (
          filteredPracticals.map((practical) => (
            <PracticalCard key={practical.id} practical={practical} />
          ))
        ) : (
          <div className="empty-state">
            <p>No practicals found matching "{searchQuery}"</p>
            <button
              type="button"
              className="reset-search-btn"
              onClick={() => setSearchQuery('')}
            >
              Reset search
            </button>
          </div>
        )}
      </section>
    </main>
  );
};
