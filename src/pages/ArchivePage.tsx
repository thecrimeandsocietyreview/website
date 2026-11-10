import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Archive as ArchiveIcon, 
  Sparkles, 
  BookOpen, 
  ArrowRight, 
  FileText, 
  Download, 
  Calendar, 
  Check, 
  Copy, 
  Quote, 
  Search, 
  ShieldCheck, 
  Unlock, 
  Layers, 
  Globe, 
  Building,
  ExternalLink
} from 'lucide-react';
import { ARTICLES_DATA, ArticleData } from '../data/articlesData';

export const ArchivePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrack, setSelectedTrack] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filter articles for Volume 01, Issue 01
  const filteredArticles = ARTICLES_DATA.filter((article) => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.authors.some(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.institution.toLowerCase().includes(searchQuery.toLowerCase())) ||
      article.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTrack = selectedTrack === 'All' || article.trackCategory.toLowerCase().includes(selectedTrack.toLowerCase());
    return matchesSearch && matchesTrack;
  });

  const handleCopyCitation = (article: ArticleData) => {
    const citation = `${article.authors.map(a => a.name).join(', ')} (${article.year}). ${article.title}. The Crime & Society Review, Vol. 01, Issue 01 (Oct–Dec 2026), pp. ${article.pages}.`;
    navigator.clipboard.writeText(citation);
    setCopiedId(article.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 animate-fadeIn text-[var(--text-primary)]">
      
      {/* Page Header with Journal Identity & Metadata */}
      <div className="border-b border-[var(--border-subtle)] pb-8 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-amber-500/10 text-[var(--accent-gold)] border border-amber-500/20">
            <ArchiveIcon className="w-3.5 h-3.5" />
            <span>Digital Repository &amp; Archives</span>
          </span>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            Permanent Open Access Index
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight">
            The Crime &amp; Society Review Archive
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] font-serif max-w-4xl leading-relaxed">
            Retrospective repository of published volumes, issues, and peer-reviewed scholarly manuscripts. Every archived record carries complete bibliographic metadata—including journal title, volume, issue number, month, year, and pagination.
          </p>
        </div>

        {/* Official Journal Metadata Badges (ISSN / Indexing Compliance) */}
        <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-mono">
          <div className="px-3 py-1 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]">
            <span className="text-[var(--text-muted)]">Journal: </span>
            <span className="font-serif font-bold text-[var(--text-primary)]">The Crime &amp; Society Review</span>
          </div>
          <div className="px-3 py-1 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]">
            <span className="text-[var(--text-muted)]">Format: </span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">Online</span>
          </div>
          <div className="px-3 py-1 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]">
            <span className="text-[var(--text-muted)]">Frequency: </span>
            <span className="font-semibold text-[var(--text-primary)]">Fortnightly</span>
          </div>
          <div className="px-3 py-1 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]">
            <span className="text-[var(--text-muted)]">Subject: </span>
            <span className="font-semibold text-[var(--text-primary)]">Multidisciplinary</span>
          </div>
          <div className="px-3 py-1 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]">
            <span className="text-[var(--text-muted)]">Language: </span>
            <span className="font-semibold text-[var(--text-primary)]">English</span>
          </div>
          <div className="px-3 py-1 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]">
            <span className="text-[var(--text-muted)]">Starting Year: </span>
            <span className="font-semibold text-[var(--text-primary)]">2026</span>
          </div>
          <div className="px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 font-semibold">
            <span>Diamond Open Access (₹0 APC)</span>
          </div>
        </div>
      </div>

      {/* ========================================================
          VOLUME 01 (2026) — OFFICIAL ARCHIVE ENTRY
      ======================================================== */}
      <section className="space-y-6">
        
        {/* Year & Volume Heading */}
        <div className="flex items-center justify-between gap-4 border-b-2 border-amber-500/30 pb-3">
          <div className="flex items-center gap-3">
            <span className="font-serif text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">
              Volume 01 (2026)
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono text-xs font-bold border border-amber-500/20">
              Active Volume
            </span>
          </div>
          <span className="text-xs font-mono text-[var(--text-muted)] hidden sm:inline">
            The Crime &amp; Society Review • 2026 Archive
          </span>
        </div>

        {/* Issue 01 (Inaugural Issue) Official Record Card */}
        <div className="rounded-3xl border border-[var(--border-strong)] bg-[var(--bg-card)] shadow-lg overflow-hidden">
          
          {/* Issue Header / Bibliographic Banner */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-amber-500/10 via-slate-900/5 to-indigo-500/10 border-b border-[var(--border-subtle)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Cover Artwork Thumbnail */}
              <div className="lg:col-span-3 flex justify-center lg:justify-start">
                <div className="relative rounded-2xl overflow-hidden shadow-xl border border-amber-500/30 bg-slate-950 w-40 sm:w-48 shrink-0">
                  <img
                    src="/currentissue/vol-1-oct-dec-2026.jpeg"
                    alt="The Crime & Society Review - Volume 01 Issue 01 Cover"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-xs text-[9px] font-mono text-amber-300 font-bold uppercase border border-white/20">
                    Vol 01 • Iss 01
                  </div>
                </div>
              </div>

              {/* Mandatory Bibliographic Details */}
              <div className="lg:col-span-9 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-0.5 rounded-full bg-amber-500 text-slate-950 text-xs font-bold uppercase tracking-wider font-mono">
                    Inaugural Issue
                  </span>
                  <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <Unlock className="w-3.5 h-3.5" />
                    <span>Open Access</span>
                  </span>
                  <span className="text-[var(--text-muted)]">•</span>
                  <span className="text-xs font-mono text-[var(--text-secondary)]">
                    Published: October – December 2026
                  </span>
                </div>

                {/* Issue Title & Subtitle */}
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)] leading-tight">
                    The Crime &amp; Society Review: Volume 01, Issue 01
                  </h2>
                  <p className="font-serif text-base sm:text-lg text-[var(--accent-gold)] italic pt-1">
                    Rethinking Crime, Justice &amp; Society: Emerging Perspectives for the 21st Century
                  </p>
                </div>

                {/* Bibliographic Metadata Table */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 text-xs font-mono">
                  <div className="p-2.5 rounded-xl bg-[var(--bg-page)] border border-[var(--border-subtle)] space-y-0.5">
                    <span className="text-[10px] uppercase text-[var(--text-muted)] block">Journal Title</span>
                    <span className="font-serif font-bold text-[var(--text-primary)] truncate block">
                      The Crime &amp; Society Review
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[var(--bg-page)] border border-[var(--border-subtle)] space-y-0.5">
                    <span className="text-[10px] uppercase text-[var(--text-muted)] block">Volume &amp; Issue</span>
                    <span className="font-bold text-[var(--text-primary)] block">
                      Volume 01, Issue 01
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[var(--bg-page)] border border-[var(--border-subtle)] space-y-0.5">
                    <span className="text-[10px] uppercase text-[var(--text-muted)] block">Month &amp; Year</span>
                    <span className="font-bold text-[var(--text-primary)] block">
                      October – December 2026
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[var(--bg-page)] border border-[var(--border-subtle)] space-y-0.5">
                    <span className="text-[10px] uppercase text-[var(--text-muted)] block">Total Output</span>
                    <span className="font-bold text-amber-600 dark:text-amber-400 block">
                      5 Articles • 89 Pages
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-serif leading-relaxed text-justify pt-1">
                  Priority Editorial Tracks for Vol-I ; Issue-I ; October-December/2026 (Inaugural Issue). The journal invites high-quality empirical studies, doctrinal evaluations, forensic methodologies, and critical policy perspectives across six structured tracks. Accepted papers receive continuous publication.
                </p>

                {/* Issue Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    to="/current-issue"
                    className="px-4 py-2 rounded-xl bg-[var(--accent-gold)] hover:bg-[var(--accent-gold-hover)] text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>View Current Issue Display</span>
                  </Link>

                  <a
                    href="/currentissue/Content-vol-1-oct-dec-2026.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-page)] hover:bg-[var(--bg-card-hover)] text-[var(--text-primary)] font-semibold text-xs flex items-center gap-1.5 shadow-2xs transition-all"
                    title="Open PDF in new tab"
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-500" />
                    <span>View Issue Contents (PDF)</span>
                  </a>
                </div>

              </div>
            </div>
          </div>

          {/* Search & Subject Track Filter Bar */}
          <div className="p-4 sm:p-5 border-b border-[var(--border-subtle)] bg-[var(--bg-card)] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search archived articles by title, author, institution, keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-page)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-hidden focus:border-amber-500 transition-colors"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs font-mono">
              <span className="text-[var(--text-muted)] text-[11px] uppercase mr-1">Filter Track:</span>
              {['All', 'Criminal Justice', 'Social Justice', 'Interdisciplinary', 'Security', 'Environmental'].map((track) => (
                <button
                  key={track}
                  type="button"
                  onClick={() => setSelectedTrack(track)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer shrink-0 ${
                    selectedTrack === track
                      ? 'bg-[var(--accent-gold)] text-slate-950 font-bold'
                      : 'border border-[var(--border-subtle)] hover:bg-[var(--bg-card-hover)] text-[var(--text-secondary)]'
                  }`}
                >
                  {track}
                </button>
              ))}
            </div>
          </div>

          {/* Table of Articles for Volume 01, Issue 01 */}
          <div className="divide-y divide-[var(--border-subtle)]">
            {filteredArticles.length === 0 ? (
              <div className="p-8 text-center text-xs font-serif text-[var(--text-muted)]">
                No archived articles match your search or track filter in Volume 01, Issue 01.
              </div>
            ) : (
              filteredArticles.map((article, idx) => (
                <article key={article.id} className="p-5 sm:p-6 space-y-3 hover:bg-[var(--bg-card-hover)]/40 transition-colors">
                  
                  {/* Mandatory Bibliographic Citation Line */}
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-mono text-[var(--text-muted)]">
                    <span className="font-bold text-amber-600 dark:text-amber-400">
                      The Crime &amp; Society Review
                    </span>
                    <span className="opacity-50">•</span>
                    <span className="text-[var(--text-primary)] font-semibold">
                      Vol. 01, Issue 01
                    </span>
                    <span className="opacity-50">•</span>
                    <span>October – December 2026</span>
                    <span className="opacity-50">•</span>
                    <span className="text-amber-600 dark:text-amber-400 font-semibold">
                      pp. {article.pages}
                    </span>
                    <span className="opacity-50">•</span>
                    <span>Accepted: {article.acceptanceDate}</span>
                    <span className="opacity-50">•</span>
                    <span>Published: {article.firstPublished}</span>
                    <span className="opacity-50">•</span>
                    <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-sans font-medium">
                      <Unlock className="w-3 h-3" />
                      <span>Open Access</span>
                    </span>
                  </div>

                  {/* Article Title */}
                  <h3 className="font-serif text-base sm:text-lg lg:text-xl font-bold leading-snug">
                    <Link
                      to={`/article/${article.slug}`}
                      className="text-sky-700 dark:text-sky-400 hover:text-sky-900 dark:hover:text-sky-300 hover:underline transition-colors"
                    >
                      {article.title}
                    </Link>
                  </h3>

                  {/* Authors & Institutional Affiliation */}
                  <div className="space-y-1 text-xs font-serif text-[var(--text-secondary)]">
                    {article.authors.map((author, aIdx) => (
                      <div key={aIdx} className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                        <span className="font-bold text-[var(--text-primary)]">{author.name}</span>
                        <span className="text-[var(--text-muted)]">—</span>
                        <span>{author.designation}, {author.institution} ({author.location})</span>
                      </div>
                    ))}
                  </div>

                  {/* Abstract preview */}
                  <p className="text-xs font-serif text-[var(--text-secondary)] leading-relaxed text-justify line-clamp-2">
                    {article.abstract.fullText}
                  </p>

                  {/* Action Links */}
                  <div className="flex flex-wrap items-center justify-end gap-2 pt-2 text-xs border-t border-[var(--border-subtle)] font-sans font-medium">
                    <Link
                      to={`/article/${article.slug}`}
                      className="px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] hover:bg-[var(--bg-card-hover)] text-sky-700 dark:text-sky-400 hover:underline inline-flex items-center gap-1"
                    >
                      <span>Read Full Text (HTML)</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>

                    <a
                      href={article.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-[var(--accent-gold)] hover:bg-[var(--accent-gold-hover)] text-slate-950 font-bold inline-flex items-center gap-1 shadow-2xs transition-colors"
                      title="Open PDF in new tab"
                    >
                      <FileText className="w-3 h-3" />
                      <span>View PDF ({article.pages} pp.)</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => handleCopyCitation(article)}
                      className="px-2.5 py-1.5 rounded-lg border border-[var(--border-subtle)] hover:bg-[var(--bg-card-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] inline-flex items-center gap-1 cursor-pointer"
                      title="Copy Official Citation"
                    >
                      {copiedId === article.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-600 font-semibold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Quote className="w-3 h-3 text-amber-500" />
                          <span>Cite</span>
                        </>
                      )}
                    </button>
                  </div>

                </article>
              ))
            )}
          </div>

        </div>

      </section>

      {/* ========================================================
          VOLUME 01, ISSUE 02 (UPCOMING / CALL FOR PAPERS)
      ======================================================== */}
      <section className="p-6 sm:p-8 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                Call for Papers Active
              </span>
              <span className="text-xs font-mono text-[var(--text-muted)]">
                Fortnightly Publication Model
              </span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
              The Crime &amp; Society Review: Volume 01, Issue 02
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-serif max-w-2xl leading-relaxed">
              Submissions are currently invited across all six priority tracks for the forthcoming issue. Manuscripts undergo double-blind peer review with zero article processing charges (₹0 APC).
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 pt-2 sm:pt-0">
            <Link
              to="/submit"
              className="px-5 py-2.5 rounded-xl bg-[var(--accent-gold)] hover:bg-[var(--accent-gold-hover)] text-slate-950 text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
            >
              <span>Submit Manuscript Online</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Digital Preservation & Archival Standards Notice */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[var(--bg-page)] border border-[var(--border-subtle)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs font-serif text-[var(--text-secondary)]">
        <div className="space-y-1 max-w-3xl">
          <span className="font-sans font-bold text-xs uppercase tracking-wider text-[var(--text-primary)] flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            <span>Digital Preservation &amp; Repository Commitment</span>
          </span>
          <p className="leading-relaxed">
            The Crime &amp; Society Review guarantees permanent open-access preservation of all published volumes. All manuscripts are archived in open repositories to ensure uninterrupted scholarly discovery and perpetual citation integrity.
          </p>
        </div>
        <Link
          to="/about"
          className="text-sky-700 dark:text-sky-400 hover:underline font-sans font-semibold shrink-0 text-xs flex items-center gap-1"
        >
          <span>Journal Archival Policy</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  );
};

export default ArchivePage;
