import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Lock, 
  Unlock, 
  FileText, 
  Download, 
  Share2, 
  Quote, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  Copy, 
  ArrowLeft, 
  ArrowRight, 
  Mail, 
  ExternalLink, 
  List, 
  BookOpen, 
  Printer,
  Sparkles,
  ShieldCheck,
  Building,
  MapPin,
  Calendar,
  Layers,
  CheckCircle2,
  X
} from 'lucide-react';
import { ArticleData, ARTICLES_DATA } from '../../data/articlesData';

interface ArticleReaderLayoutProps {
  article?: ArticleData;
}

export const ArticleReaderLayout: React.FC<ArticleReaderLayoutProps> = ({ article }) => {
  const [showAuthorsModal, setShowAuthorsModal] = useState(false);
  const [showCiteModal, setShowCiteModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showTocDropdown, setShowTocDropdown] = useState(false);
  const [citationFormat, setCitationFormat] = useState<'APA' | 'MLA' | 'Harvard' | 'BibTeX'>('APA');
  const [copiedCite, setCopiedCite] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="font-serif text-2xl font-bold text-[var(--text-primary)]">Article Not Found</h1>
        <p className="text-sm text-[var(--text-secondary)] font-serif">
          The requested scholarly manuscript could not be located in Volume 01, Issue 01.
        </p>
        <Link
          to="/current-issue"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--accent-gold)] text-slate-950 font-semibold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Current Issue</span>
        </Link>
      </div>
    );
  }

  // Find previous and next articles in the issue
  const currentIndex = ARTICLES_DATA.findIndex(a => a.id === article.id);
  const prevArticle = currentIndex > 0 ? ARTICLES_DATA[currentIndex - 1] : null;
  const nextArticle = currentIndex < ARTICLES_DATA.length - 1 ? ARTICLES_DATA[currentIndex + 1] : null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://thecrimeandsocietyreview.com/article/${article.slug}`;

  // Citations generator (without DOI)
  const authorNamesStr = article.authors.map(a => a.name).join(', ');
  const firstAuthorLastName = article.authors[0]?.name.split(' ').slice(-1)[0] || 'Author';
  
  const citations = {
    APA: `${article.authors.map(a => `${a.name.split(' ').slice(-1)[0]}, ${a.name.split(' ').slice(0, -1).map(n => n[0] + '.').join(' ')}`).join(', & ')} (${article.year}). ${article.title}. The Crime & Society Review, 1(1), ${article.pages}.`,
    MLA: `${article.authors[0]?.name}. "${article.title}." The Crime & Society Review, vol. 1, no. 1, ${article.year}, pp. ${article.pages}.`,
    Harvard: `${article.authors.map(a => `${a.name.split(' ').slice(-1)[0]}, ${a.name.split(' ').slice(0, -1).map(n => n[0] + '.').join('')}`).join(', ')} (${article.year}) '${article.title}', The Crime & Society Review, 1(1), pp. ${article.pages}.`,
    BibTeX: `@article{csr_${article.year}_${firstAuthorLastName.toLowerCase()},
  title={${article.title}},
  author={${authorNamesStr}},
  journal={The Crime & Society Review},
  volume={1},
  number={1},
  pages={${article.pages}},
  year={${article.year}}
}`
  };

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(citations[citationFormat]);
    setCopiedCite(true);
    setTimeout(() => setCopiedCite(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const scrollToSection = (id: string) => {
    setShowTocDropdown(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const yOffset = -90; // offset so sticky bar doesn't cover heading
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 60);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)]">
      {/* Reading Progress Indicator */}
      <div 
        className="fixed top-0 left-0 h-1 bg-[var(--accent-gold)] z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Top Academic Journal Banner (Matching Image 2) */}
      <header className="relative w-full overflow-hidden shadow-md">
        {/* Top Dark Minimalist Strip */}
        <div className="bg-[#1f1913] text-[#e0cfbe] px-4 sm:px-8 py-2 text-[11px] font-mono tracking-wider flex items-center justify-between border-b border-amber-900/40">
          <div className="flex items-center gap-3">
            <span className="font-serif font-bold text-amber-200">The Crime &amp; Society Review</span>
            <span className="opacity-40">|</span>
            <span className="hidden sm:inline">Volume 01 • Issue 01 (Oct–Dec 2026)</span>
            <span className="sm:hidden">Vol 01 • Iss 01</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden md:inline text-amber-300/80">ISSN: Coming Soon</span>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-sans font-medium">
              Open Access Scholarly Journal
            </span>
          </div>
        </div>

        {/* Main Golden/Amber Banner with Open Access Lock Watermark */}
        <div className="relative bg-gradient-to-r from-[#b37a1f] via-[#d6962e] to-[#b87c18] text-white px-4 sm:px-8 py-5 sm:py-6 overflow-hidden">
          {/* Subtle Watermark Lock Graphic in Right Corner */}
          <div className="absolute right-4 sm:right-12 -bottom-6 sm:-bottom-8 pointer-events-none opacity-20 select-none">
            <div className="w-36 h-36 sm:w-48 sm:h-48 rounded-full border-8 border-white flex items-center justify-center">
              <Unlock className="w-20 h-20 sm:w-28 sm:h-28 text-white stroke-[2.5]" />
            </div>
          </div>

          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
            {/* Volume 1 & Issue 1 Title & Description */}
            <div className="space-y-2 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono tracking-wider uppercase text-amber-200">
                <span className="font-bold">Volume 01 • Issue 01</span>
                <span>•</span>
                <span>October – December 2026</span>
                <span>•</span>
                <span className="px-2 py-0.5 rounded-full bg-black/25 text-white text-[10px] font-sans font-medium border border-white/20">
                  Inaugural Issue
                </span>
              </div>

              <h1 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight drop-shadow-xs">
                Rethinking Crime, Justice &amp; Society:
                <span className="block text-amber-200 font-serif italic text-base sm:text-lg font-normal pt-0.5">
                  Emerging Perspectives for the 21st Century
                </span>
              </h1>

              <p className="text-xs sm:text-sm text-amber-100/95 font-serif leading-relaxed text-justify sm:text-left">
                Priority Editorial Tracks for Vol-I ; Issue-I ; October-December/2026 (Inaugural Issue). The journal invites high-quality empirical studies, doctrinal evaluations, forensic methodologies, and critical policy perspectives across six structured tracks. Accepted papers receive DOI assignment and continuous publication.
              </p>
            </div>

            {/* Quick Action Navigation Buttons */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 shrink-0 pt-2 md:pt-0">
              <Link
                to="/current-issue"
                className="px-3.5 py-2 rounded-lg bg-white/95 hover:bg-white text-slate-900 text-xs font-semibold shadow-sm transition-all hover:shadow"
              >
                View Issue 01
              </Link>
              <Link
                to="/"
                className="px-3.5 py-2 rounded-lg bg-black/30 hover:bg-black/50 text-white text-xs font-semibold border border-white/25 shadow-sm transition-all"
              >
                Journal Home
              </Link>
              <Link
                to="/submit"
                className="px-3.5 py-2 rounded-lg bg-slate-950/90 hover:bg-slate-950 text-white text-xs font-semibold shadow-sm transition-all hover:bg-black"
              >
                Submission Guidelines
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* Article Meta Bar (Image 2 Top Line) */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-[var(--text-secondary)] font-sans border-b border-[var(--border-subtle)] pb-4">
          <div className="flex items-center gap-1.5 font-bold text-amber-600 dark:text-amber-400">
            <Unlock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>Open access</span>
          </div>
          <span className="text-[var(--text-muted)]">|</span>
          <span className="font-medium text-[var(--text-primary)]">{article.articleType}</span>
          <span className="text-[var(--text-muted)]">|</span>
          <div className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Accepted: {article.acceptanceDate}</span>
          </div>
          <span className="text-[var(--text-muted)]">|</span>
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[var(--text-muted)]" />
            <span>First published online: {article.firstPublished}</span>
          </div>
          <span className="text-[var(--text-muted)]">|</span>
          <span className="text-[var(--accent-gold)] font-medium">Vol 01, Issue 01 (2026), pp. {article.pages}</span>
        </div>

        {/* Article Title */}
        <div className="space-y-3">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--text-primary)] leading-tight tracking-tight">
            {article.title}
          </h2>
          {article.subtitle && (
            <p className="font-serif text-lg sm:text-xl text-[var(--text-secondary)] italic leading-relaxed">
              {article.subtitle}
            </p>
          )}
        </div>

        {/* Author Line with Affiliations Toggle */}
        <div className="space-y-3 pt-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm sm:text-base font-serif">
            {article.authors.map((author, idx) => (
              <span key={idx} className="inline-flex items-center gap-1.5 text-[var(--text-primary)]">
                <span className="font-semibold">{author.name}</span>
                {author.isCorresponding && (
                  <a
                    href={`mailto:${author.email}`}
                    title={`Corresponding Author: ${author.email}`}
                    className="text-amber-600 hover:text-amber-700"
                  >
                    <Mail className="w-3.5 h-3.5 inline" />
                  </a>
                )}
                {idx < article.authors.length - 1 && <span className="text-[var(--text-muted)]">,</span>}
              </span>
            ))}

            <button
              type="button"
              onClick={() => setShowAuthorsModal(!showAuthorsModal)}
              className="text-xs font-sans text-sky-700 dark:text-sky-400 hover:underline font-medium ml-1 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>{showAuthorsModal ? 'Hide author details' : 'View all authors and affiliations'}</span>
              {showAuthorsModal ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Expanded Authors and Affiliations Card */}
          {showAuthorsModal && (
            <div className="p-4 sm:p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-strong)] space-y-4 animate-fadeIn">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                Author Affiliations &amp; Contact Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {article.authors.map((author, idx) => (
                  <div key={idx} className="p-3.5 rounded-lg bg-[var(--bg-page)] border border-[var(--border-subtle)] space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-sm text-[var(--text-primary)]">{author.name}</span>
                    </div>
                    {author.designation && (
                      <p className="text-xs text-[var(--text-secondary)] font-medium">{author.designation}</p>
                    )}
                    <div className="text-xs text-[var(--text-muted)] space-y-0.5">
                      <p className="flex items-center gap-1.5">
                        <Building className="w-3 h-3 shrink-0" />
                        <span>{author.institution}</span>
                      </p>
                      {author.location && (
                        <p className="flex items-center gap-1.5">
                          <MapPin className="w-3 h-3 shrink-0" />
                          <span>{author.location}</span>
                        </p>
                      )}
                      {author.email && (
                        <p className="flex items-center gap-1.5 pt-1">
                          <Mail className="w-3 h-3 shrink-0 text-amber-600" />
                          <a href={`mailto:${author.email}`} className="text-sky-700 dark:text-sky-400 hover:underline">
                            {author.email}
                          </a>
                        </p>
                      )}
                    </div>
                    {author.bio && (
                      <p className="text-[11px] text-[var(--text-secondary)] font-serif italic pt-1 border-t border-[var(--border-subtle)] mt-2">
                        {author.bio}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Breadcrumb Navigation Line */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono py-2.5 px-3.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]">
          <Link
            to="/current-issue"
            className="text-sky-700 dark:text-sky-400 hover:underline inline-flex items-center gap-1.5 font-sans font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Articles in Volume 01, Issue 01</span>
          </Link>
          <span className="text-[var(--text-muted)] font-serif">
            The Crime &amp; Society Review • Volume 01, Issue 01
          </span>
        </div>

        {/* Sticky Action Navigation Toolbar */}
        <div className="sticky top-0 z-30 bg-[var(--bg-card)]/95 backdrop-blur-md border-y border-[var(--border-strong)] py-2 sm:py-2.5 -mx-4 px-4 sm:mx-0 sm:px-4 sm:rounded-xl shadow-xs">
          <div className="flex items-center justify-between gap-1 sm:gap-2 text-xs font-sans">
            <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar shrink-0 py-0.5">
              {/* Contents Button */}
              <button
                type="button"
                onClick={() => setShowTocDropdown(prev => !prev)}
                className={`px-3 py-1.5 rounded-lg border font-medium flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 ${
                  showTocDropdown
                    ? 'border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400'
                    : 'border-[var(--border-subtle)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-card-hover)] text-[var(--text-primary)]'
                }`}
                aria-expanded={showTocDropdown}
                aria-haspopup="true"
                title="Browse Table of Contents"
              >
                <List className="w-3.5 h-3.5 text-amber-600" />
                <span>Contents</span>
                <ChevronDown className={`w-3 h-3 text-[var(--text-muted)] transition-transform duration-200 ${showTocDropdown ? 'rotate-180' : ''}`} />
              </button>

              {/* PDF Download Button */}
              <a
                href={article.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="px-3 py-1.5 rounded-lg bg-[var(--accent-gold)] hover:bg-[var(--accent-gold-hover)] text-slate-950 font-semibold flex items-center gap-1.5 shadow-xs transition-colors shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PDF/EPUB</span>
              </a>

              {/* Cite Button */}
              <button
                type="button"
                onClick={() => setShowCiteModal(true)}
                className="px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-card-hover)] text-[var(--text-primary)] font-medium flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              >
                <Quote className="w-3.5 h-3.5 text-amber-600" />
                <span>Cite</span>
              </button>

              {/* Share Options */}
              <button
                type="button"
                onClick={() => setShowShareModal(true)}
                className="px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-card-hover)] text-[var(--text-primary)] font-medium flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              >
                <Share2 className="w-3.5 h-3.5 text-amber-600" />
                <span>Share options</span>
              </button>
            </div>
          </div>

          {/* Dedicated Contents Flyout Panel with Backdrop */}
          {showTocDropdown && (
            <div className="relative">
              {/* Click outside backdrop */}
              <div 
                className="fixed inset-0 bg-black/30 backdrop-blur-[1px] z-40 animate-fadeIn"
                onClick={() => setShowTocDropdown(false)}
              />

              {/* Dropdown Card */}
              <div 
                className="absolute left-0 top-full mt-2 w-80 sm:w-96 max-h-[70vh] flex flex-col bg-[var(--bg-card)] border border-[var(--border-strong)] rounded-2xl shadow-2xl z-50 animate-fadeIn overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Panel Header */}
                <div className="p-3.5 border-b border-[var(--border-subtle)] bg-[var(--bg-page)]/80 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <List className="w-4 h-4 text-amber-600" />
                    <div>
                      <span className="font-serif font-bold text-xs sm:text-sm text-[var(--text-primary)] block">
                        Table of Contents
                      </span>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">
                        {article.sections.length} Sections • {article.references.length} References
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowTocDropdown(false)}
                    className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] transition-colors cursor-pointer"
                    aria-label="Close contents"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Panel Links */}
                <div className="p-2 overflow-y-auto space-y-1 text-xs">
                  {/* Abstract */}
                  <button
                    type="button"
                    onClick={() => scrollToSection('abstract-section')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-[var(--bg-card-hover)] font-serif font-semibold text-sky-700 dark:text-sky-400 flex items-center justify-between group transition-colors cursor-pointer"
                  >
                    <span>Abstract &amp; Keywords</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-amber-500 shrink-0" />
                  </button>

                  {/* Sections */}
                  {article.sections.map((sec, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => scrollToSection(sec.id)}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-serif flex items-start justify-between gap-2 group transition-colors cursor-pointer"
                    >
                      <span className="line-clamp-2 leading-snug">{sec.title}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-amber-500 shrink-0 mt-0.5" />
                    </button>
                  ))}

                  {/* References */}
                  {article.references && article.references.length > 0 && (
                    <div className="pt-1 border-t border-[var(--border-subtle)] mt-1">
                      <button
                        type="button"
                        onClick={() => scrollToSection('references-section')}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-[var(--bg-card-hover)] font-serif font-semibold text-[var(--text-primary)] flex items-center justify-between group transition-colors cursor-pointer"
                      >
                        <span>References ({article.references.length} sources)</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-amber-500 shrink-0" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Unified Article Paper Container (Continuous Reading Mode - Joined, No Separate Boxes) */}
        <article className="rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] p-6 sm:p-10 lg:p-12 shadow-sm space-y-10">
          
          {/* Abstract Section */}
          <section id="abstract-section" className="scroll-mt-24 space-y-4">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-primary)] border-b border-[var(--border-subtle)] pb-2">
              Abstract
            </h3>

            <div className="space-y-4 font-serif text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
              {article.abstract.background && (
                <div className="space-y-1">
                  <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-[var(--text-primary)]">
                    Background
                  </h4>
                  <p className="text-justify">{article.abstract.background}</p>
                </div>
              )}

              {article.abstract.purpose && (
                <div className="space-y-1">
                  <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-[var(--text-primary)]">
                    Purpose
                  </h4>
                  <p className="text-justify">{article.abstract.purpose}</p>
                </div>
              )}

              {article.abstract.methods && (
                <div className="space-y-1">
                  <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-[var(--text-primary)]">
                    Materials and Methods
                  </h4>
                  <p className="text-justify">{article.abstract.methods}</p>
                </div>
              )}

              {article.abstract.results && (
                <div className="space-y-1">
                  <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-[var(--text-primary)]">
                    Results
                  </h4>
                  <p className="text-justify">{article.abstract.results}</p>
                </div>
              )}

              {article.abstract.conclusion && (
                <div className="space-y-1">
                  <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-[var(--text-primary)]">
                    Conclusion
                  </h4>
                  <p className="text-justify">{article.abstract.conclusion}</p>
                </div>
              )}

              {/* If no structured fields exist, render fullText */}
              {!article.abstract.background && article.abstract.fullText && (
                <p className="text-justify">{article.abstract.fullText}</p>
              )}
            </div>

            {/* Keywords */}
            {article.keywords && article.keywords.length > 0 && (
              <div className="pt-4 border-t border-[var(--border-subtle)] space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] block">
                  Keywords
                </span>
                <div className="flex flex-wrap gap-2">
                  {article.keywords.map((kw, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md text-xs font-serif bg-[var(--bg-page)] text-[var(--text-primary)] border border-[var(--border-subtle)]"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Full Text Sections - Seamlessly Flowing */}
          <div className="space-y-10 pt-2 border-t border-[var(--border-subtle)]">
            {article.sections.map((section, idx) => (
              <section
                key={idx}
                id={section.id}
                className="scroll-mt-24 space-y-4"
              >
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-primary)] border-b border-[var(--border-subtle)] pb-2 leading-snug">
                  {section.title}
                </h3>
                <div className="space-y-4 font-serif text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
                  {section.paragraphs.map((para, pIdx) => (
                    <p key={pIdx} className="text-justify leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* References Section - Continuous within the article */}
          {article.references && article.references.length > 0 && (
            <section
              id="references-section"
              className="scroll-mt-24 pt-6 border-t border-[var(--border-subtle)] space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                  References
                </h3>
                <span className="text-xs font-mono text-[var(--text-muted)]">
                  {article.references.length} Cited Sources
                </span>
              </div>

              <ol className="space-y-3 font-serif text-xs sm:text-sm text-[var(--text-secondary)] list-none pl-0">
                {article.references.map((ref, idx) => {
                  // Linkify DOIs and URLs in the reference
                  const urlRegex = /(https?:\/\/[^\s]+|doi:[^\s]+)/gi;
                  const parts = ref.split(urlRegex);

                  return (
                    <li
                      key={idx}
                      className="flex items-start gap-3 py-1.5 border-l-2 border-amber-500/30 hover:border-amber-500 pl-3 transition-colors leading-relaxed group"
                    >
                      <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 shrink-0 select-none min-w-[2.25rem] text-right pt-0.5 group-hover:text-amber-500">
                        [{idx + 1}]
                      </span>
                      <span className="block break-words flex-1 text-justify">
                        {parts.map((part, pIdx) => {
                          if (part.match(/^https?:\/\//i)) {
                            return (
                              <a
                                key={pIdx}
                                href={part}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sky-700 dark:text-sky-400 hover:underline break-all inline-flex items-center gap-0.5 ml-1"
                              >
                                <span>{part}</span>
                                <ExternalLink className="w-2.5 h-2.5 inline" />
                              </a>
                            );
                          } else if (part.match(/^doi:/i)) {
                            const doiUrl = `https://doi.org/${part.replace(/^doi:\s*/i, '')}`;
                            return (
                              <a
                                key={pIdx}
                                href={doiUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sky-700 dark:text-sky-400 hover:underline break-all inline-flex items-center gap-0.5 ml-1"
                              >
                                <span>{part}</span>
                                <ExternalLink className="w-2.5 h-2.5 inline" />
                              </a>
                            );
                          }
                          return <span key={pIdx}>{part}</span>;
                        })}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </section>
          )}

        </article>

        {/* Bottom Pagination & Navigation Between Articles */}
        <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-strong)] space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {prevArticle ? (
              <Link
                to={`/article/${prevArticle.slug}`}
                className="w-full sm:w-1/2 p-3.5 rounded-xl border border-[var(--border-subtle)] hover:border-amber-500/50 hover:bg-[var(--bg-card-hover)] transition-all group flex items-start gap-3"
              >
                <ArrowLeft className="w-4 h-4 text-amber-500 shrink-0 mt-0.5 group-hover:-translate-x-1 transition-transform" />
                <div className="space-y-1 overflow-hidden">
                  <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] block">Previous Article</span>
                  <p className="font-serif text-xs font-bold text-[var(--text-primary)] truncate group-hover:text-amber-500">
                    {prevArticle.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div className="hidden sm:block sm:w-1/2" />
            )}

            {nextArticle && (
              <Link
                to={`/article/${nextArticle.slug}`}
                className="w-full sm:w-1/2 p-3.5 rounded-xl border border-[var(--border-subtle)] hover:border-amber-500/50 hover:bg-[var(--bg-card-hover)] transition-all group flex items-start justify-end text-right gap-3"
              >
                <div className="space-y-1 overflow-hidden">
                  <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] block">Next Article</span>
                  <p className="font-serif text-xs font-bold text-[var(--text-primary)] truncate group-hover:text-amber-500">
                    {nextArticle.title}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-amber-500 shrink-0 mt-0.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>

          <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3 text-xs">
            <Link
              to="/current-issue"
              className="text-sky-700 dark:text-sky-400 hover:underline inline-flex items-center gap-1.5 font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Volume 01, Issue 01 Table of Contents</span>
            </Link>
            <a
              href={article.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--accent-gold)] text-slate-950 font-bold hover:bg-[var(--accent-gold-hover)]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Original PDF</span>
            </a>
          </div>
        </div>

      </main>

      {/* ================= MODALS ================= */}

      {/* Citation Modal */}
      {showCiteModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn"
          onClick={() => setShowCiteModal(false)}
        >
          <div 
            className="relative w-full max-w-xl bg-[var(--bg-card)] border border-[var(--border-strong)] rounded-2xl p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
              <h3 className="font-serif text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                <Quote className="w-4 h-4 text-amber-600" />
                <span>Cite this Article</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowCiteModal(false)}
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Format Selector */}
            <div className="flex items-center gap-2 border-b border-[var(--border-subtle)] pb-2 text-xs font-mono">
              {(['APA', 'MLA', 'Harvard', 'BibTeX'] as const).map(fmt => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => setCitationFormat(fmt)}
                  className={`px-3 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                    citationFormat === fmt 
                      ? 'bg-amber-500 text-slate-950' 
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>

            {/* Citation Output Box */}
            <div className="p-4 rounded-xl bg-[var(--bg-page)] border border-[var(--border-subtle)] font-serif text-xs leading-relaxed text-[var(--text-primary)] whitespace-pre-wrap select-all max-h-48 overflow-y-auto">
              {citations[citationFormat]}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] font-mono text-[var(--text-muted)]">
                Format: {citationFormat} (Standard Academic)
              </span>
              <button
                type="button"
                onClick={handleCopyCitation}
                className="px-4 py-2 rounded-lg bg-[var(--accent-gold)] hover:bg-[var(--accent-gold-hover)] text-slate-950 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                {copiedCite ? <Check className="w-4 h-4 text-emerald-800" /> : <Copy className="w-4 h-4" />}
                <span>{copiedCite ? 'Citation Copied!' : 'Copy Citation'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn"
          onClick={() => setShowShareModal(false)}
        >
          <div 
            className="relative w-full max-w-md bg-[var(--bg-card)] border border-[var(--border-strong)] rounded-2xl p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
              <h3 className="font-serif text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                <Share2 className="w-4 h-4 text-amber-600" />
                <span>Share Scholarly Article</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowShareModal(false)}
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-[var(--bg-page)] border border-[var(--border-subtle)] flex items-center justify-between gap-2">
                <span className="text-xs font-mono text-[var(--text-secondary)] truncate">
                  {currentUrl}
                </span>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="px-3 py-1 rounded bg-[var(--accent-gold)] text-slate-950 text-xs font-bold shrink-0 hover:bg-[var(--accent-gold-hover)] cursor-pointer"
                >
                  {copiedLink ? 'Copied' : 'Copy'}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 text-xs font-medium">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(currentUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg border border-[var(--border-subtle)] hover:bg-[var(--bg-card-hover)] flex items-center justify-center gap-2 text-[var(--text-primary)]"
                >
                  <span>Share on X / Twitter</span>
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg border border-[var(--border-subtle)] hover:bg-[var(--bg-card-hover)] flex items-center justify-center gap-2 text-[var(--text-primary)]"
                >
                  <span>Share on LinkedIn</span>
                </a>
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + ' ' + currentUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg border border-[var(--border-subtle)] hover:bg-[var(--bg-card-hover)] flex items-center justify-center gap-2 text-[var(--text-primary)]"
                >
                  <span>Share on WhatsApp</span>
                </a>
                <a
                  href={`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent('Read this research article published in The Crime & Society Review:\n\n' + currentUrl)}`}
                  className="p-2.5 rounded-lg border border-[var(--border-subtle)] hover:bg-[var(--bg-card-hover)] flex items-center justify-center gap-2 text-[var(--text-primary)]"
                >
                  <span>Share via Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ArticleReaderLayout;

