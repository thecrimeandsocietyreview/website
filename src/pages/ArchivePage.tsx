import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Archive, Search, FileText, Download, Filter, Calendar, BookOpen, ArrowRight } from 'lucide-react';
import { MOCK_ARTICLES, JOURNAL_METADATA } from '../data/mockJournalData';
import { ArticleType } from '../types/journal';

export const ArchivePage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const articleTypes: { id: string; label: string }[] = [
    { id: 'all', label: 'All Article Types' },
    { id: 'Original Empirical Research', label: 'Original Empirical Research' },
    { id: 'Theoretical Synthesis', label: 'Theoretical Synthesis' },
    { id: 'Methodological Innovation', label: 'Methodological Innovation' },
    { id: 'Forensic Case Commentary', label: 'Forensic Case Commentary' },
  ];

  const filteredArticles = MOCK_ARTICLES.filter(art => {
    const matchesType = selectedType === 'all' || art.articleType === selectedType;
    const matchesSearch = searchQuery === '' ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.authors.some(a => a.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      art.elocationId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-[var(--border-subtle)] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase font-bold text-[var(--accent-gold)] flex items-center gap-1.5">
            <Archive className="w-3.5 h-3.5" /> Permanent Scholarly Record
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mt-1">
            Rolling Publication Archive
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1 max-w-xl">
            Under our continuous publication model, finalized manuscripts are assigned an elocation-id and published permanently to the annual active volume.
          </p>
        </div>

        {/* Volume Status Badge */}
        <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] font-mono text-xs text-right">
          <div className="font-bold text-[var(--accent-navy)]">Volume 1 (2026)</div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400">● Open Rolling Volume</div>
          <div className="text-[10px] text-[var(--text-muted)]">Permanent DOI Archive: Portico/CLOCKSS</div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 absolute left-3 top-3 text-[var(--text-muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by title, author, elocation-id..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)]"
          />
        </div>

        {/* Article Type Filter */}
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {articleTypes.map(t => (
            <button
              key={t.id}
              onClick={() => setSelectedType(t.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                selectedType === t.id
                  ? 'bg-[var(--accent-navy)] text-white font-semibold'
                  : 'border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Articles List */}
      <div className="space-y-4">
        <h2 className="text-sm font-mono uppercase font-bold text-[var(--text-muted)]">
          Volume 1 (2026) Articles ({filteredArticles.length})
        </h2>

        <div className="space-y-4">
          {filteredArticles.map(art => (
            <div
              key={art.id}
              className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--accent-gold)] transition-all shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2 max-w-4xl">
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                  <span className="font-bold text-[var(--accent-gold)]">{art.elocationId}</span>
                  <span className="text-[var(--text-muted)]">•</span>
                  <span className="text-[var(--text-muted)]">Published: {art.publishedDate}</span>
                  <span className="text-[var(--text-muted)]">•</span>
                  <span className="px-2 py-0.5 rounded bg-[var(--bg-card-hover)] text-[var(--text-secondary)] font-sans">
                    {art.articleType}
                  </span>
                </div>

                <Link to={`/article/${art.id}`}>
                  <h3 className="font-serif text-xl font-bold text-[var(--text-primary)] hover:text-[var(--accent-navy)] transition-colors leading-snug">
                    {art.title}
                  </h3>
                </Link>

                <p className="text-xs text-[var(--text-secondary)]">
                  {art.authors.map(a => a.name).join(', ')}
                </p>

                <p className="text-xs text-[var(--text-muted)] line-clamp-2 font-serif leading-relaxed">
                  {art.abstract}
                </p>
              </div>

              {/* Actions */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-[var(--border-subtle)]">
                <Link
                  to={`/article/${art.id}`}
                  className="px-4 py-2 rounded-lg bg-[var(--accent-navy)] text-white text-xs font-semibold hover:opacity-90 transition-opacity flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Interactive Paper</span>
                </Link>

                <Link
                  to={`/article/${art.id}?tab=pdf`}
                  className="px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] hover:border-[var(--accent-navy)] text-xs text-[var(--text-secondary)] flex items-center gap-1 bg-[var(--bg-card)]"
                >
                  <Download className="w-3.5 h-3.5 text-[var(--accent-navy)]" />
                  <span>PDF Galley</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
