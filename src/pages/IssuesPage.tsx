import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Download, 
  Calendar, 
  FileText, 
  ExternalLink, 
  CheckCircle2, 
  Layers, 
  Sparkles, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  Award
} from 'lucide-react';
import { MOCK_ISSUES, MOCK_ARTICLES, JOURNAL_METADATA } from '../data/mockJournalData';

export const IssuesPage: React.FC = () => {
  const [selectedIssueId, setSelectedIssueId] = useState<string>(MOCK_ISSUES[0].id);

  const currentIssue = MOCK_ISSUES.find(i => i.id === selectedIssueId) || MOCK_ISSUES[0];

  // Articles belonging to current issue
  const issueArticles = MOCK_ARTICLES.filter(a => currentIssue.articleIds.includes(a.id));

  // Partition articles by contribution type
  const researchPapers = issueArticles.filter(a => 
    a.articleType.toLowerCase().includes('empirical') || 
    a.articleType.toLowerCase().includes('original') ||
    a.articleType.toLowerCase().includes('research')
  );

  const reviewsAndDoctrinal = issueArticles.filter(a => 
    a.articleType.toLowerCase().includes('theoretical') || 
    a.articleType.toLowerCase().includes('review') ||
    a.articleType.toLowerCase().includes('methodological')
  );

  const commentariesAndOther = issueArticles.filter(a => 
    !researchPapers.includes(a) && !reviewsAndDoctrinal.includes(a)
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-12 animate-fadeIn">
      {/* Page Header */}
      <div className="border-b border-[var(--border-subtle)] pb-6 space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-[var(--accent-gold)]">
          <Layers className="w-4 h-4" />
          <span>Archival Repository • Journal Issues</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
              Journal Issues & Archive
            </h1>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] font-serif mt-1">
              Curated volumes examining criminal law reforms, forensic advances, and social justice in India.
            </p>
          </div>
          <div className="text-xs font-mono text-[var(--text-muted)] bg-[var(--bg-card)] px-3 py-2 rounded-lg border border-[var(--border-subtle)] flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Continuous Rolling Volumes</span>
          </div>
        </div>
      </div>

      {/* Issue Selector Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[var(--border-subtle)] pb-4">
        {MOCK_ISSUES.map((issue) => {
          const isSelected = issue.id === currentIssue.id;
          return (
            <button
              key={issue.id}
              onClick={() => setSelectedIssueId(issue.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-serif font-medium transition-all text-left border cursor-pointer ${
                isSelected
                  ? 'bg-[var(--accent-navy)] text-white border-[var(--accent-navy)] shadow-md'
                  : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="font-bold">{issue.title}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-[var(--bg-page)] text-[var(--text-muted)]'
                }`}>
                  {issue.date}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Issue Spotlight Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Issue Cover & Meta (4 cols) */}
        <div className="lg:col-span-4 bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border-subtle)] space-y-6 shadow-xs">
          {/* Simulated Scholarly Issue Cover */}
          <div className="relative aspect-3/4 rounded-xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 p-6 text-white flex flex-col justify-between border border-amber-500/30 shadow-xl overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px] opacity-15"></div>
            
            <div className="relative z-10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="inline-block text-[10px] font-mono font-bold tracking-widest text-[var(--accent-gold)] uppercase border border-[var(--accent-gold)]/40 px-2 py-0.5 rounded-sm">
                  {currentIssue.coverTag}
                </span>
                <img 
                  src="/logo.png" 
                  alt="The Crime & Society Review Logo" 
                  className="w-14 h-14 rounded-xl object-contain bg-white p-1 shadow-lg border border-amber-500/40" 
                />
              </div>
              <h3 className="font-serif text-lg font-bold tracking-tight text-white leading-snug">
                The Crime &amp; Society Review
              </h3>
              <p className="text-[10px] text-slate-300 font-mono">
                ISSN {JOURNAL_METADATA.issnOnline} • New Delhi
              </p>
            </div>

            <div className="relative z-10 border-t border-white/20 pt-4 space-y-1">
              <span className="text-[11px] font-mono text-[var(--accent-gold)] font-bold">
                {currentIssue.title}
              </span>
              <p className="text-xs font-serif italic text-slate-200 line-clamp-3">
                "{currentIssue.theme}"
              </p>
            </div>

            <div className="relative z-10 pt-2 flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-white/10">
              <span>{currentIssue.date}</span>
              <span>{currentIssue.articlesCount} Articles</span>
            </div>
          </div>

          {/* Quick Stats & Actions */}
          <div className="space-y-3 pt-2">
            <div className="text-xs space-y-2 text-[var(--text-secondary)] font-mono">
              <div className="flex justify-between">
                <span>Publication Period:</span>
                <strong className="text-[var(--text-primary)]">{currentIssue.date}</strong>
              </div>
              <div className="flex justify-between">
                <span>Total Contributions:</span>
                <strong className="text-[var(--text-primary)]">{currentIssue.articlesCount} items</strong>
              </div>
              <div className="flex justify-between">
                <span>Total Downloads:</span>
                <strong className="text-[var(--text-primary)]">{currentIssue.downloadsCount.toLocaleString()}</strong>
              </div>
              <div className="flex justify-between">
                <span>Archive PDF Size:</span>
                <strong className="text-[var(--text-primary)]">{currentIssue.pdfSize}</strong>
              </div>
            </div>

            <button
              onClick={() => alert(`Initiating full volume bundle download for ${currentIssue.title} (${currentIssue.pdfSize}). Includes official Prelims, Editorial, all Articles, and Index.`)}
              className="w-full py-2.5 px-4 rounded-xl bg-[var(--accent-navy)] text-white text-xs font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Full Issue PDF ({currentIssue.pdfSize})</span>
            </button>
          </div>
        </div>

        {/* Issue Details & Content (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Issue Editorial */}
          <section className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-[var(--accent-gold)]">
              <Award className="w-3.5 h-3.5" />
              <span>Issue Editorial</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
              {currentIssue.editorialTitle}
            </h2>
            <div className="text-xs font-mono text-[var(--text-muted)]">
              By {currentIssue.editorialAuthor}
            </div>
            <p className="text-sm text-[var(--text-secondary)] font-serif leading-relaxed italic border-l-2 border-[var(--accent-gold)] pl-4 my-2">
              "{currentIssue.editorialExcerpt}"
            </p>
          </section>

          {/* Research Articles Section */}
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
              <h3 className="font-serif text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                <FileText className="w-4 h-4 text-[var(--accent-gold)]" />
                <span>Original Research & Empirical Inquiries</span>
              </h3>
              <span className="text-xs font-mono text-[var(--text-muted)]">
                {researchPapers.length} articles
              </span>
            </div>

            {researchPapers.length === 0 ? (
              <p className="text-xs text-[var(--text-muted)] font-serif py-4">
                Articles in this category are currently in rolling peer-review production.
              </p>
            ) : (
              <div className="space-y-4">
                {researchPapers.map((art) => (
                  <div 
                    key={art.id}
                    className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--accent-gold)]/50 transition-all space-y-2 group shadow-2xs"
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
                      <span className="text-[var(--accent-navy)] font-bold">{art.articleType}</span>
                      <span>DOI: {art.doi}</span>
                    </div>
                    <h4 className="font-serif text-base sm:text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-navy)] transition-colors">
                      <Link to={`/article/${art.id}`}>
                        {art.title}
                      </Link>
                    </h4>
                    <p className="text-xs text-[var(--text-secondary)] font-serif line-clamp-2">
                      {art.abstract}
                    </p>
                    <div className="flex items-center justify-between pt-2 text-xs">
                      <span className="text-[11px] text-[var(--text-muted)]">
                        {art.authors.map(a => a.name).join(', ')}
                      </span>
                      <Link
                        to={`/article/${art.id}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent-navy)] hover:underline"
                      >
                        <span>Read Article</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Doctrinal Reviews & Syntheses */}
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
              <h3 className="font-serif text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[var(--accent-gold)]" />
                <span>Doctrinal Reviews & Methodological Syntheses</span>
              </h3>
              <span className="text-xs font-mono text-[var(--text-muted)]">
                {reviewsAndDoctrinal.length} articles
              </span>
            </div>

            {reviewsAndDoctrinal.length === 0 ? (
              <p className="text-xs text-[var(--text-muted)] font-serif py-4">
                No doctrinal reviews assigned to this specific issue folder.
              </p>
            ) : (
              <div className="space-y-4">
                {reviewsAndDoctrinal.map((art) => (
                  <div 
                    key={art.id}
                    className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--accent-gold)]/50 transition-all space-y-2 group shadow-2xs"
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
                      <span className="text-[var(--accent-navy)] font-bold">{art.articleType}</span>
                      <span>DOI: {art.doi}</span>
                    </div>
                    <h4 className="font-serif text-base sm:text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-navy)] transition-colors">
                      <Link to={`/article/${art.id}`}>
                        {art.title}
                      </Link>
                    </h4>
                    <p className="text-xs text-[var(--text-secondary)] font-serif line-clamp-2">
                      {art.abstract}
                    </p>
                    <div className="flex items-center justify-between pt-2 text-xs">
                      <span className="text-[11px] text-[var(--text-muted)]">
                        {art.authors.map(a => a.name).join(', ')}
                      </span>
                      <Link
                        to={`/article/${art.id}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent-navy)] hover:underline"
                      >
                        <span>Read Article</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Commentaries, Blogs & Briefs */}
          {commentariesAndOther.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
                <h3 className="font-serif text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[var(--accent-gold)]" />
                  <span>Scholarly Commentaries & Case Notes</span>
                </h3>
                <span className="text-xs font-mono text-[var(--text-muted)]">
                  {commentariesAndOther.length} articles
                </span>
              </div>
              <div className="space-y-4">
                {commentariesAndOther.map((art) => (
                  <div 
                    key={art.id}
                    className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--accent-gold)]/50 transition-all space-y-2 group shadow-2xs"
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
                      <span className="text-[var(--accent-navy)] font-bold">{art.articleType}</span>
                      <span>DOI: {art.doi}</span>
                    </div>
                    <h4 className="font-serif text-base sm:text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-navy)] transition-colors">
                      <Link to={`/article/${art.id}`}>
                        {art.title}
                      </Link>
                    </h4>
                    <p className="text-xs text-[var(--text-secondary)] font-serif line-clamp-2">
                      {art.abstract}
                    </p>
                    <div className="flex items-center justify-between pt-2 text-xs">
                      <span className="text-[11px] text-[var(--text-muted)]">
                        {art.authors.map(a => a.name).join(', ')}
                      </span>
                      <Link
                        to={`/article/${art.id}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent-navy)] hover:underline"
                      >
                        <span>Read Article</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>

      </div>
    </div>
  );
};
