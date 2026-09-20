import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  FileText, 
  Download, 
  Eye, 
  Quote, 
  Calendar, 
  User, 
  CheckCircle2, 
  X,
  ExternalLink,
  BookOpen,
  Sparkles,
  Share2
} from 'lucide-react';
import { MOCK_ARTICLES, MOCK_ISSUES, SCOPE_CATEGORIES_20 } from '../data/mockJournalData';
import { Article } from '../types/journal';

export const ArticlesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedIssue, setSelectedIssue] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'latest' | 'views' | 'citations' | 'featured'>('latest');

  // Available Filter Options
  const years = useMemo(() => {
    const set = new Set(MOCK_ARTICLES.map(a => a.year.toString()));
    return Array.from(set).sort((a, b) => Number(b) - Number(a));
  }, []);

  const articleTypes = useMemo(() => {
    const set = new Set(MOCK_ARTICLES.map(a => a.articleType));
    return Array.from(set);
  }, []);

  // Filter & Search Logic
  const filteredArticles = useMemo(() => {
    return MOCK_ARTICLES.filter(article => {
      // Search matches title, author name, keyword, or DOI
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchTitle = article.title.toLowerCase().includes(query);
        const matchAuthor = article.authors.some(a => a.name.toLowerCase().includes(query) || a.affiliation.toLowerCase().includes(query));
        const matchKeyword = article.keywords.some(k => k.toLowerCase().includes(query));
        const matchDoi = article.doi.toLowerCase().includes(query);
        const matchAbstract = article.abstract.toLowerCase().includes(query);
        if (!matchTitle && !matchAuthor && !matchKeyword && !matchDoi && !matchAbstract) {
          return false;
        }
      }

      // Discipline filter
      if (selectedDiscipline !== 'all') {
        const matchMain = article.discipline === selectedDiscipline;
        const matchSec = article.secondaryDisciplines?.includes(selectedDiscipline as any);
        if (!matchMain && !matchSec) return false;
      }

      // Year filter
      if (selectedYear !== 'all' && article.year.toString() !== selectedYear) {
        return false;
      }

      // Article type filter
      if (selectedType !== 'all' && article.articleType !== selectedType) {
        return false;
      }

      // Issue filter
      if (selectedIssue !== 'all') {
        const issue = MOCK_ISSUES.find(i => i.id === selectedIssue);
        if (issue && !issue.articleIds.includes(article.id)) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'latest') {
        return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
      }
      if (sortBy === 'views') {
        return (b.metrics?.views || 0) - (a.metrics?.views || 0);
      }
      if (sortBy === 'citations') {
        return (b.metrics?.citations || 0) - (a.metrics?.citations || 0);
      }
      if (sortBy === 'featured') {
        return (b.metrics?.altmetric || 0) - (a.metrics?.altmetric || 0);
      }
      return 0;
    });
  }, [searchQuery, selectedDiscipline, selectedYear, selectedType, selectedIssue, sortBy]);

  const hasActiveFilters = searchQuery !== '' || selectedDiscipline !== 'all' || selectedYear !== 'all' || selectedType !== 'all' || selectedIssue !== 'all';

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedDiscipline('all');
    setSelectedYear('all');
    setSelectedType('all');
    setSelectedIssue('all');
    setSortBy('latest');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10 animate-fadeIn">
      {/* Page Header */}
      <div className="border-b border-[var(--border-subtle)] pb-6 space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-[var(--accent-gold)]">
          <FileText className="w-4 h-4" />
          <span>Publications & Repository • Discovery Engine</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
              Publications & Articles
            </h1>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] font-serif mt-1">
              Peer-reviewed open-access empirical research, doctrinal commentaries, and forensic studies.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] bg-[var(--bg-card)] px-3 py-2 rounded-lg border border-[var(--border-subtle)]">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>100% Diamond Open Access (CC BY 4.0)</span>
          </div>
        </div>
      </div>

      {/* Global Search Bar */}
      <div className="relative">
        <Search className="w-5 h-5 absolute left-4 top-3.5 text-[var(--text-muted)]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by article title, author name, keyword, topic, or DOI (e.g., 10.59821, BNS, forensic)..."
          className="w-full pl-12 pr-10 py-3 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-card)] text-sm sm:text-base text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-hidden focus:ring-2 focus:ring-[var(--accent-navy)] transition-all shadow-xs"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-3.5 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Filters Bar & Sorting */}
      <div className="bg-[var(--bg-card)] p-4 rounded-xl border border-[var(--border-subtle)] space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          
          {/* Discipline Filter */}
          <div>
            <label className="block text-[11px] font-mono text-[var(--text-muted)] uppercase mb-1">
              Discipline
            </label>
            <select
              value={selectedDiscipline}
              onChange={(e) => setSelectedDiscipline(e.target.value)}
              className="w-full text-xs rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-[var(--text-primary)] px-2.5 py-1.5 focus:outline-hidden focus:ring-1 focus:ring-[var(--accent-navy)]"
            >
              <option value="all">All Disciplines</option>
              <option value="forensic">Forensic Science</option>
              <option value="legal">Law & Jurisprudence</option>
              <option value="policing">Policing & Enforcement</option>
              <option value="psychological">Psychology & Behaviour</option>
              <option value="sociological">Sociology of Crime</option>
              <option value="victimology">Victimology</option>
            </select>
          </div>

          {/* Publication Year */}
          <div>
            <label className="block text-[11px] font-mono text-[var(--text-muted)] uppercase mb-1">
              Publication Year
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full text-xs rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-[var(--text-primary)] px-2.5 py-1.5 focus:outline-hidden focus:ring-1 focus:ring-[var(--accent-navy)]"
            >
              <option value="all">All Years</option>
              {years.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          {/* Article Type */}
          <div>
            <label className="block text-[11px] font-mono text-[var(--text-muted)] uppercase mb-1">
              Article Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full text-xs rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-[var(--text-primary)] px-2.5 py-1.5 focus:outline-hidden focus:ring-1 focus:ring-[var(--accent-navy)]"
            >
              <option value="all">All Contribution Types</option>
              {articleTypes.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Issue Filter */}
          <div>
            <label className="block text-[11px] font-mono text-[var(--text-muted)] uppercase mb-1">
              Journal Issue
            </label>
            <select
              value={selectedIssue}
              onChange={(e) => setSelectedIssue(e.target.value)}
              className="w-full text-xs rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-[var(--text-primary)] px-2.5 py-1.5 focus:outline-hidden focus:ring-1 focus:ring-[var(--accent-navy)]"
            >
              <option value="all">All Issues</option>
              {MOCK_ISSUES.map(iss => (
                <option key={iss.id} value={iss.id}>{iss.title}</option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-[11px] font-mono text-[var(--text-muted)] uppercase mb-1 flex items-center gap-1">
              <ArrowUpDown className="w-3 h-3 text-[var(--accent-gold)]" />
              <span>Sort Order</span>
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full text-xs rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-[var(--text-primary)] px-2.5 py-1.5 font-medium focus:outline-hidden focus:ring-1 focus:ring-[var(--accent-navy)]"
            >
              <option value="latest">Latest Published First</option>
              <option value="views">Most Viewed</option>
              <option value="citations">Most Cited</option>
              <option value="featured">Featured / Impact</option>
            </select>
          </div>

        </div>

        {/* Status Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
          <div>
            Showing <strong className="text-[var(--text-primary)]">{filteredArticles.length}</strong> {filteredArticles.length === 1 ? 'article' : 'articles'}
            {hasActiveFilters && <span> matching selected criteria</span>}
          </div>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs text-[var(--accent-navy)] hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear all filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Articles Grid / List */}
      {filteredArticles.length === 0 ? (
        <div className="text-center py-16 bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] space-y-4">
          <BookOpen className="w-12 h-12 text-[var(--text-muted)] mx-auto" />
          <h3 className="font-serif text-xl font-bold text-[var(--text-primary)]">
            No articles match your search criteria
          </h3>
          <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto">
            Try adjusting your search terms, changing disciplinary filters, or resetting all options.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-lg bg-[var(--accent-navy)] text-white text-xs font-semibold hover:opacity-90"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredArticles.map((article) => (
            <article 
              key={article.id}
              className="p-6 sm:p-7 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--accent-gold)]/50 transition-all space-y-4 group shadow-2xs hover:shadow-md"
            >
              {/* Meta Top Line */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[var(--accent-navy)]/10 text-[var(--accent-navy)]">
                    {article.articleType}
                  </span>
                  <span className="text-[var(--text-muted)] font-mono text-[11px] flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {article.publishedDate}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[var(--text-muted)]">
                  DOI: <span className="text-[var(--accent-gold)] font-medium">{article.doi}</span>
                </span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-navy)] transition-colors leading-snug">
                <Link to={`/article/${article.id}`}>
                  {article.title}
                </Link>
              </h2>

              {/* Authors & Affiliations */}
              <div className="text-xs sm:text-sm text-[var(--text-secondary)] flex flex-wrap items-center gap-y-1 gap-x-2">
                <User className="w-3.5 h-3.5 text-[var(--accent-gold)] shrink-0" />
                {article.authors.map((author, i) => (
                  <span key={author.name} className="inline-flex items-center gap-1">
                    <span className="font-medium text-[var(--text-primary)]">{author.name}</span>
                    {author.orcid && (
                      <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                        [ORCID]
                      </span>
                    )}
                    {i < article.authors.length - 1 && <span className="text-[var(--text-muted)]">•</span>}
                  </span>
                ))}
              </div>

              {/* Abstract Preview */}
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-serif line-clamp-3 leading-relaxed">
                {article.abstract}
              </p>

              {/* Keywords Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {article.keywords.slice(0, 5).map((kw) => (
                  <span
                    key={kw}
                    onClick={() => setSearchQuery(kw)}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[var(--bg-page)] text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)] cursor-pointer transition-colors"
                  >
                    #{kw}
                  </span>
                ))}
                {article.keywords.length > 5 && (
                  <span className="text-[10px] font-mono text-[var(--text-muted)] self-center">
                    +{article.keywords.length - 5} more
                  </span>
                )}
              </div>

              {/* Bottom Metrics & Actions */}
              <div className="pt-3 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                {/* Metrics */}
                <div className="flex items-center gap-4 text-[var(--text-muted)] font-mono text-[11px]">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-blue-500" />
                    <span>{article.metrics?.views.toLocaleString()} views</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Download className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{article.metrics?.downloads.toLocaleString()} downloads</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Quote className="w-3.5 h-3.5 text-amber-500" />
                    <span>{article.metrics?.citations} citations</span>
                  </span>
                </div>

                {/* Read & Download Buttons */}
                <div className="flex items-center gap-2">
                  <Link
                    to={`/article/${article.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--accent-navy)] text-white text-xs font-semibold hover:opacity-90 transition-opacity shadow-xs"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Read Full Text</span>
                  </Link>
                  <a
                    href={`#download-${article.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`Downloading Official Version of Record PDF for Article DOI: ${article.doi} (UGC-CARE Compliant CC BY 4.0)`);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-card)] text-[var(--text-primary)] text-xs font-medium hover:bg-[var(--bg-card-hover)] transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>PDF</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
