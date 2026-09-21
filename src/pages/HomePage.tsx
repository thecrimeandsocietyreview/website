import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Play, 
  Pause, 
  Volume2, 
  FileText, 
  Download, 
  Quote, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Eye, 
  Share2, 
  ShieldCheck, 
  CheckCircle2, 
  Scale, 
  Microscope, 
  Brain, 
  Landmark, 
  ShieldAlert, 
  HeartHandshake,
  Bookmark,
  Award,
  Globe,
  Database,
  Search,
  Check,
  Copy,
  X,
  Clock,
  Send,
  Calendar,
  ExternalLink,
  BookOpen,
  Info
} from 'lucide-react';
import { 
  MOCK_ARTICLES, 
  JOURNAL_METADATA, 
  MOCK_CONCEPT_NODES,
  INDEXING_CREDENTIALS,
  CALL_FOR_PAPERS_DATA,
  AUTHOR_BENEFITS,
  UNIVERSITY_AFFILIATES,
  generateCitationFormats
} from '../data/mockJournalData';
import { DisciplinaryLens, Article } from '../types/journal';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedLens, setSelectedLens] = useState<DisciplinaryLens>('all');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(32); // percentage

  // Modal States
  const [citationArticle, setCitationArticle] = useState<Article | null>(null);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);
  const [selectedCredential, setSelectedCredential] = useState<typeof INDEXING_CREDENTIALS[0] | null>(null);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [certificateAuthorName, setCertificateAuthorName] = useState("Dr. Aarav Sengupta");

  const [heroSearchQuery, setHeroSearchQuery] = useState('');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearchQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(heroSearchQuery.trim())}`);
    }
  };

  const featuredArticle = MOCK_ARTICLES.find(a => a.featured) || MOCK_ARTICLES[0];

  const filteredArticles = selectedLens === 'all'
    ? MOCK_ARTICLES
    : MOCK_ARTICLES.filter(a => a.discipline === selectedLens || a.secondaryDisciplines.includes(selectedLens));

  const lensButtons: { id: DisciplinaryLens; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'all', label: 'All Disciplines', icon: <Layers className="w-3.5 h-3.5" />, color: 'bg-slate-700' },
    { id: 'legal', label: 'Law & Legal Studies', icon: <Scale className="w-3.5 h-3.5" />, color: 'bg-blue-600' },
    { id: 'forensic', label: 'Forensic Science', icon: <Microscope className="w-3.5 h-3.5" />, color: 'bg-red-700' },
    { id: 'psychological', label: 'Behavioral Psychology', icon: <Brain className="w-3.5 h-3.5" />, color: 'bg-purple-600' },
    { id: 'sociological', label: 'Sociology & Society', icon: <Landmark className="w-3.5 h-3.5" />, color: 'bg-emerald-600' },
    { id: 'policing', label: 'Policing & Tech', icon: <ShieldAlert className="w-3.5 h-3.5" />, color: 'bg-amber-600' },
    { id: 'victimology', label: 'Victimology', icon: <HeartHandshake className="w-3.5 h-3.5" />, color: 'bg-rose-600' },
  ];

  const handleCopyCitation = (text: string, formatName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormat(formatName);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const handleDownloadTemplate = (format: 'docx' | 'tex') => {
    const textContent = format === 'docx'
      ? `THE CRIME & SOCIETY REVIEW — OFFICIAL MANUSCRIPT TEMPLATE\n\nTitle: [Insert Manuscript Title]\nAuthors: [Author Name, Affiliation, ORCID]\nAbstract: [250-300 words]\nKeywords: [5-8 keywords]\n\n1. Introduction & Constitutional/Statutory Problem\n2. Literature Review & Precedential Analysis\n3. Empirical / Forensic Methodology\n4. Findings & Procedural Implications\n5. Institutional Policy Recommendations\n6. References (Bluebook 21st / APA 7th)`
      : `% The Crime & Society Review LaTeX Template\n\\documentclass[11pt,a4paper]{article}\n\\usepackage{amsmath,amsfonts,amssymb}\n\\title{Your Title Here}\n\\author{Author Name}\n\\begin{document}\n\\maketitle\n\\begin{abstract}\nYour abstract here...\n\\end{abstract}\n\\section{Introduction}\n\\end{document}`;

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TCSR_Manuscript_Template.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-16 pb-16 animate-fadeIn">

      {/* ========================================================
          PREMIER JOURNAL HERO SECTION
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="relative rounded-3xl p-8 sm:p-12 lg:p-14 overflow-hidden bg-[var(--bg-card)]">
          {/* Panoramic Hero Artwork Background - Clearly Visible */}
          <img 
            src="/hero-bg.png" 
            alt="The Crime & Society Review Scholarly Artwork" 
            className="absolute inset-0 w-full h-full object-cover object-center select-none"
          />
          {/* Soft semi-transparent veil: preserves vibrant visibility of artwork while ensuring text readability */}
          <div className="absolute inset-0 bg-white/60 dark:bg-slate-950/70 transition-colors"></div>

          <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
            
            {/* Top Eyebrow Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="px-3 py-1 rounded-full font-mono text-[11px] font-bold bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] border border-[var(--accent-gold)]/30 flex items-center gap-1.5 shadow-2xs">
                <Award className="w-3.5 h-3.5" /> UGC-CARE Group II Aligned
              </span>
              <span className="px-3 py-1 rounded-full font-mono text-[11px] font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Diamond Open Access (₹0 APC)
              </span>
              <span className="px-3 py-1 rounded-full font-mono text-[11px] text-[var(--text-muted)] bg-[var(--bg-card)] border border-[var(--border-subtle)] hidden sm:flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-blue-500" /> Crossref Member (10.59821/csr)
              </span>
              <span className="px-3 py-1 rounded-full font-mono text-[11px] text-[var(--text-muted)] bg-[var(--bg-card)] border border-[var(--border-subtle)] hidden md:flex items-center gap-1">
                ISSN 2998-4122 (CSIR-NIScPR New Delhi)
              </span>
            </div>

            {/* Main Journal Title */}
            <div className="space-y-3">
              <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold text-[var(--text-primary)] tracking-tight leading-[1.15]">
                The Crime & Society Review
              </h1>
              <p className="font-serif italic text-base sm:text-xl md:text-2xl text-[var(--accent-gold)] font-medium max-w-3xl mx-auto leading-snug">
                Indian Journal of Interdisciplinary Criminology, Forensics & Criminal Jurisprudence
              </p>
            </div>

            {/* Core Mission Subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-[var(--text-secondary)] font-serif leading-relaxed max-w-3xl mx-auto">
              A peer-reviewed, open-access scholarly forum pioneering the <strong>Rashomon Approach</strong>—triangulating criminal justice under the <strong>Bharatiya Nyaya Sanhita (BNS)</strong>, <strong>BNSS</strong>, and <strong>BSA</strong> with <strong>NFSU forensic standards</strong>, Article 21 fair trial safeguards, and carceral sociology.
            </p>

            {/* Interactive Search & DOI Resolution Bar */}
            <form onSubmit={handleHeroSearch} className="max-w-2xl mx-auto pt-2">
              <div className="relative flex items-center rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-card)] p-1.5 shadow-md focus-within:border-[var(--accent-gold)] focus-within:ring-2 focus-within:ring-[var(--accent-gold)]/20 transition-all">
                <div className="pl-3 text-[var(--accent-gold)]">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={heroSearchQuery}
                  onChange={(e) => setHeroSearchQuery(e.target.value)}
                  placeholder="Search articles, keywords, statutes (e.g. Section 63 BSA, BNSS 105), or DOI..."
                  className="w-full bg-transparent px-3 py-2 text-xs sm:text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 sm:px-5 py-2.5 rounded-xl bg-[var(--accent-navy)] text-white font-semibold text-xs sm:text-sm hover:opacity-95 transition-opacity flex items-center gap-1.5 shrink-0 cursor-pointer shadow-sm"
                >
                  <span>Search</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Quick Topic Chips */}
              <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 text-xs text-[var(--text-muted)]">
                <span className="font-mono text-[11px]">Popular Searches:</span>
                {[
                  'BNS 2023 Statutory Analysis',
                  'Section 63 BSA Digital Evidence',
                  'Section 105 BNSS Videography',
                  'NFSU DNA Benchmarks',
                  'Article 21 Due Process',
                  'Undertrial Pendency',
                ].map((term, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setHeroSearchQuery(term);
                      navigate(`/explore?search=${encodeURIComponent(term)}`);
                    }}
                    className="px-2.5 py-0.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)] transition-colors text-[11px] font-mono cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </form>

            {/* Main Action CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
              <Link
                to="/submit"
                className="px-6 py-3 rounded-xl bg-[var(--accent-gold)] hover:bg-[var(--accent-gold-hover)] text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-102 flex items-center gap-2 group cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Manuscript Online</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="#cfp"
                className="px-5 py-3 rounded-xl border border-[var(--border-subtle)] hover:border-[var(--accent-navy)] text-[var(--text-primary)] font-semibold text-xs sm:text-sm transition-colors flex items-center gap-2 bg-[var(--bg-card)] cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Call for Papers (Vol. 1, Issue 2)</span>
              </a>

              <button
                onClick={() => handleDownloadTemplate('docx')}
                className="px-4 py-3 rounded-xl border border-[var(--border-subtle)] hover:border-[var(--border-strong)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-medium transition-colors flex items-center gap-1.5 bg-[var(--bg-card)] cursor-pointer"
              >
                <Download className="w-4 h-4 text-[var(--accent-gold)]" />
                <span>Author Toolkit (.docx)</span>
              </button>
            </div>

            {/* Quick Metrics Bar in Hero Footer */}
            <div className="pt-6 border-t border-[var(--border-subtle)] grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <div className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                  Continuous
                </div>
                <div className="text-[11px] font-mono text-[var(--text-muted)] mt-0.5">
                  Rolling Publication Model
                </div>
              </div>

              <div>
                <div className="font-serif text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  ₹0 / Free
                </div>
                <div className="text-[11px] font-mono text-[var(--text-muted)] mt-0.5">
                  Diamond Open Access (No APC)
                </div>
              </div>

              <div>
                <div className="font-serif text-xl sm:text-2xl font-bold text-[var(--accent-gold)]">
                  14–21 Days
                </div>
                <div className="text-[11px] font-mono text-[var(--text-muted)] mt-0.5">
                  Double-Blind Peer Review
                </div>
              </div>

              <div>
                <div className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                  6 Lenses
                </div>
                <div className="text-[11px] font-mono text-[var(--text-muted)] mt-0.5">
                  Rashomon Interdisciplinary Prism
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Hero Section: Landmark Featured Article (Nature style editorial elegance) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="relative rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-10 shadow-sm overflow-hidden group">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[var(--accent-gold)]/5 blur-3xl pointer-events-none"></div>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[var(--accent-crimson)] text-white flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" /> Editor's Landmark Choice
            </span>
            <span className="px-2.5 py-0.5 rounded text-xs font-mono bg-[var(--accent-navy)]/10 text-[var(--accent-navy)] border border-[var(--accent-navy)]/20 font-semibold">
              Article {featuredArticle.elocationId}
            </span>
            <span className="text-xs font-mono text-[var(--text-muted)]">
              DOI: {featuredArticle.doi}
            </span>
            <span className="ml-auto text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Double-Blind Peer Reviewed (NFSU & NLU Delhi)
            </span>
          </div>

          {/* Headline Title */}
          <Link to={`/article/${featuredArticle.id}`}>
            <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] leading-tight tracking-tight hover:text-[var(--accent-navy)] transition-colors max-w-5xl">
              {featuredArticle.title}
            </h1>
          </Link>

          {/* Authors with Affiliations & ORCID */}
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[var(--text-secondary)]">
            {featuredArticle.authors.map((auth, idx) => (
              <span key={idx} className="flex items-center gap-1.5">
                <span className="font-medium text-[var(--text-primary)]">{auth.name}</span>
                <span className="text-[11px] text-[var(--text-muted)]">({auth.affiliation.split(',')[0]})</span>
                <a 
                  href={`https://orcid.org/${auth.orcid}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:text-emerald-700 font-mono text-xs inline-flex items-center font-bold"
                  title={`ORCID: ${auth.orcid}`}
                >
                  iD
                </a>
                {idx < featuredArticle.authors.length - 1 && <span className="text-[var(--border-strong)]">;</span>}
              </span>
            ))}
          </div>

          {/* Abstract Excerpt */}
          <p className="mt-6 text-base sm:text-lg text-[var(--text-secondary)] font-serif leading-relaxed line-clamp-3 max-w-4xl">
            {featuredArticle.abstract}
          </p>

          {/* The 3-Minute Executive Scholar Audio Briefing Player */}
          <div className="mt-8 p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="w-11 h-11 rounded-full bg-[var(--accent-navy)] text-white flex items-center justify-center hover:scale-105 transition-transform shrink-0 shadow-md"
                aria-label={isPlayingAudio ? 'Pause Audio Brief' : 'Play 3-Minute Executive Audio Brief'}
              >
                {isPlayingAudio ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent-gold)] flex items-center gap-1">
                    <Volume2 className="w-3.5 h-3.5" /> 3-Minute Executive Scholar Briefing
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-[var(--border-subtle)] font-mono text-[var(--text-muted)]">
                    {featuredArticle.audioBriefMinutes} min
                  </span>
                </div>
                <div className="text-xs text-[var(--text-secondary)] mt-0.5 font-medium">
                  {featuredArticle.audioTitle}
                </div>
              </div>
            </div>

            {/* Audio Progress Simulator */}
            <div className="w-full sm:w-64 flex items-center gap-2">
              <span className="text-[10px] font-mono text-[var(--text-muted)]">01:12</span>
              <div className="flex-1 h-1.5 rounded-full bg-[var(--border-subtle)] overflow-hidden cursor-pointer">
                <div 
                  className={`h-full bg-[var(--accent-navy)] rounded-full transition-all duration-300 ${isPlayingAudio ? 'animate-pulse' : ''}`}
                  style={{ width: `${isPlayingAudio ? 55 : audioProgress}%` }}
                ></div>
              </div>
              <span className="text-[10px] font-mono text-[var(--text-muted)]">03:30</span>
            </div>
          </div>

          {/* Action CTAs & Metadata Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[var(--border-subtle)]">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to={`/article/${featuredArticle.id}`}
                className="px-5 py-2.5 rounded-lg bg-[var(--accent-gold)] hover:bg-[var(--accent-gold-hover)] text-slate-950 font-semibold text-sm transition-all shadow-sm flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>Read Interactive Tri-Pane Paper</span>
              </Link>
              
              <Link
                to={`/article/${featuredArticle.id}?tab=pdf`}
                className="px-4 py-2.5 rounded-lg border border-[var(--border-subtle)] hover:border-[var(--accent-navy)] text-[var(--text-primary)] font-medium text-sm transition-colors flex items-center gap-1.5 bg-[var(--bg-card)]"
              >
                <Download className="w-4 h-4 text-[var(--accent-navy)]" />
                <span>Typst PDF Galley</span>
              </Link>

              <button
                onClick={() => setCitationArticle(featuredArticle)}
                className="px-3.5 py-2 rounded-lg border border-[var(--border-subtle)] hover:border-[var(--accent-gold)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-medium transition-colors flex items-center gap-1.5 bg-[var(--bg-card)] cursor-pointer"
              >
                <Quote className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                <span>Cite Article</span>
              </button>
            </div>

            {/* Smart Citation & Altmetric summary */}
            <div className="flex items-center gap-3 text-xs font-mono">
              <div className="px-2.5 py-1 rounded border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center gap-1.5" title="Scite Smart Citations Breakdown">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">{featuredArticle.scite.supporting} Supporting</span>
                <span className="text-[var(--text-muted)]">•</span>
                <span className="text-amber-600 dark:text-amber-400 font-bold">{featuredArticle.scite.contrasting} Contrasting</span>
              </div>
              <div className="px-2.5 py-1 rounded border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-muted)] flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                <span>{featuredArticle.metrics.views.toLocaleString()} Reads</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prominent Indexing & Accreditation Showcase Bar (Inspired by Veredas & IJCA) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[var(--border-subtle)]">
            <div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[var(--accent-gold)]" />
                <span className="text-xs font-mono uppercase tracking-widest font-bold text-[var(--accent-gold)]">
                  Scholarly Accreditation & National Indexing Standards
                </span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-primary)] mt-1">
                Recognized for UGC-CARE, CAS Promotion & Indian Judicial Research
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
              <span className="px-2.5 py-1 rounded bg-[var(--bg-card-hover)] border border-[var(--border-subtle)] font-semibold text-[var(--text-primary)]">
                ISSN 2998-4122 (Online)
              </span>
              <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
                100% Diamond OA (₹0 APC)
              </span>
            </div>
          </div>

          {/* Indexing Badges Grid */}
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3">
            {INDEXING_CREDENTIALS.map((cred, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedCredential(cred)}
                className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] hover:border-[var(--accent-gold)] transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-[var(--accent-navy)] group-hover:text-[var(--accent-gold)] transition-colors">
                      {cred.acronym}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border-subtle)] font-mono">
                      {cred.status}
                    </span>
                  </div>
                  <div className="font-semibold text-xs text-[var(--text-primary)] mt-1.5 leading-snug">
                    {cred.name}
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)] mt-1 line-clamp-2 leading-relaxed">
                    {cred.description}
                  </p>
                </div>
                <div className="mt-2.5 pt-2 border-t border-[var(--border-subtle)]/60 flex items-center justify-between text-[10px] font-mono text-[var(--text-secondary)]">
                  <span>{cred.badge}</span>
                  <Info className="w-3 h-3 text-[var(--accent-gold)]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dedicated Call for Papers (CFP) Section (Inspired by IJCA & Veredas) */}
      <section id="cfp" className="max-w-7xl mx-auto px-4 scroll-mt-20">
        <div className="rounded-2xl border-2 border-[var(--accent-gold)]/40 bg-gradient-to-br from-[var(--bg-card)] via-[var(--bg-card-hover)] to-[var(--bg-card)] p-6 sm:p-10 shadow-lg relative overflow-hidden">
          {/* Top Live Badge Ribbon */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-[var(--border-subtle)]">
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-600 text-white flex items-center gap-1.5 shadow-sm animate-pulse">
                <Calendar className="w-3.5 h-3.5" /> SUBMISSIONS OPEN
              </span>
              <span className="font-mono text-xs font-bold text-[var(--accent-gold)]">
                {CALL_FOR_PAPERS_DATA.currentCall}
              </span>
            </div>
            <div className="text-xs font-mono text-[var(--text-muted)] flex items-center gap-2">
              <span>Submission Window:</span>
              <span className="font-bold text-[var(--text-primary)] bg-[var(--bg-card)] px-2.5 py-1 rounded border border-[var(--border-subtle)]">
                {CALL_FOR_PAPERS_DATA.submissionDeadline}
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Col: Main CFP Narrative & Tracks */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-mono uppercase font-bold text-[var(--accent-gold)] tracking-wider block">
                Official Thematic Call • Mid-Year 2026 Edition
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)] leading-snug">
                {CALL_FOR_PAPERS_DATA.theme}
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                The Crime & Society Review invites rigorous empirical research, statutory doctrinal analyses, forensic case studies, and institutional policy briefs from legal scholars, forensic scientists, judges, advocates, and police researchers across India.
              </p>

              {/* Priority Tracks Pills */}
              <div className="pt-2">
                <span className="text-xs font-mono font-bold text-[var(--text-primary)] block mb-2">
                  Key Submission Tracks & Areas:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {CALL_FOR_PAPERS_DATA.tracks.map((track, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[var(--text-secondary)] p-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="leading-tight">{track}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Publication Fee Banner */}
              <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/5 flex items-center gap-3 text-xs">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">
                    Article Processing Charge (APC): {CALL_FOR_PAPERS_DATA.charges.apc}
                  </span>
                  <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                    {CALL_FOR_PAPERS_DATA.charges.status}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Col: Timeline Card & Direct CTAs */}
            <div className="lg:col-span-5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-card)] p-6 shadow-sm space-y-6">
              <div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[var(--accent-gold)]" />
                  <h3 className="font-serif text-base font-bold text-[var(--text-primary)]">
                    Editorial Timetable Transparency
                  </h3>
                </div>
                <p className="text-[11px] text-[var(--text-muted)] mt-1">
                  Guaranteed review benchmarks to support Indian faculty promotion & PhD filing timelines.
                </p>
              </div>

              {/* Timelines List */}
              <div className="space-y-3">
                {CALL_FOR_PAPERS_DATA.timelines.map((t, idx) => (
                  <div key={idx} className="flex items-start justify-between gap-3 text-xs pb-2.5 border-b border-[var(--border-subtle)] last:border-none last:pb-0">
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-[var(--accent-navy)]/10 text-[var(--accent-navy)] flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-[var(--text-secondary)] font-medium leading-tight">
                        {t.stage}
                      </span>
                    </div>
                    <span className="font-mono font-bold text-[var(--accent-gold)] shrink-0">
                      {t.duration}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2.5">
                <Link
                  to="/submit"
                  className="w-full py-3 px-4 rounded-xl bg-[var(--accent-gold)] hover:bg-[var(--accent-gold-hover)] text-slate-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Manuscript Online</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => handleDownloadTemplate('docx')}
                    className="py-2 px-2.5 rounded-lg border border-[var(--border-subtle)] hover:border-[var(--accent-navy)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-medium text-[11px] transition-colors flex items-center justify-center gap-1.5 bg-[var(--bg-card-hover)] cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[var(--accent-navy)]" />
                    <span>Template (.docx)</span>
                  </button>

                  <button
                    onClick={() => handleDownloadTemplate('tex')}
                    className="py-2 px-2.5 rounded-lg border border-[var(--border-subtle)] hover:border-[var(--accent-navy)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-medium text-[11px] transition-colors flex items-center justify-center gap-1.5 bg-[var(--bg-card-hover)] cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[var(--accent-navy)]" />
                    <span>Template (.tex)</span>
                  </button>
                </div>

                <Link
                  to="/submit#guidelines"
                  className="block text-center text-xs text-[var(--accent-navy)] hover:underline font-semibold pt-1"
                >
                  Read Author Submission Guidelines & Compliance Checklist →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Author Benefits & Academic Impact (Inspired by Veredas & IJCA) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-mono uppercase font-bold text-[var(--accent-gold)] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Why Indian Scholars Choose TCSR
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mt-1">
                Author Credentials & Academic Advancement Benefits
              </h2>
            </div>
            <button
              onClick={() => setIsCertificateModalOpen(true)}
              className="px-3.5 py-2 rounded-lg border border-[var(--accent-gold)] bg-[var(--accent-gold)]/10 hover:bg-[var(--accent-gold)]/20 text-[var(--accent-gold)] font-bold text-xs flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>Preview Official Certificate of Publication</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {AUTHOR_BENEFITS.map((benefit, i) => (
              <div 
                key={i}
                className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] flex flex-col justify-between space-y-3 hover:border-[var(--accent-gold)] transition-colors"
              >
                <div>
                  <div className="w-9 h-9 rounded-lg bg-[var(--accent-navy)]/10 text-[var(--accent-navy)] flex items-center justify-center font-bold mb-3">
                    {benefit.icon === 'award' && <Award className="w-5 h-5 text-[var(--accent-gold)]" />}
                    {benefit.icon === 'shield-check' && <ShieldCheck className="w-5 h-5 text-emerald-600" />}
                    {benefit.icon === 'globe' && <Globe className="w-5 h-5 text-blue-600" />}
                    {benefit.icon === 'volume-2' && <Volume2 className="w-5 h-5 text-purple-600" />}
                  </div>
                  <h3 className="font-serif font-bold text-sm text-[var(--text-primary)] leading-snug">
                    {benefit.title}
                  </h3>
                  <div className="font-mono text-[10px] text-[var(--accent-gold)] font-semibold mt-0.5">
                    {benefit.subtitle}
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
                <div className="pt-2 border-t border-[var(--border-subtle)]/60 text-[10px] font-mono text-[var(--text-muted)] flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-500" />
                  <span>UGC Regulation 2018 Validated</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* University Affiliates & Institutional Reviewer Network (Inspired by IJCA & Nature) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-8">
          <div className="max-w-3xl mb-6">
            <span className="text-xs font-mono uppercase font-bold text-[var(--accent-gold)] flex items-center gap-1.5">
              <Landmark className="w-4 h-4" /> Institutional Network & Repository Affiliations
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mt-1">
              Scholarly Network Across Leading Indian & Global Academies
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">
              TCSR articles are peer-reviewed by faculty and researchers from premier Indian forensic, legal, and social institutions, with persistent metadata preservation across global library catalogs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {UNIVERSITY_AFFILIATES.map((univ, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] flex items-start gap-3.5 hover:border-[var(--accent-gold)] transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--accent-navy)] text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-[var(--accent-gold)]/40 shadow-xs">
                  {univ.logoText}
                </div>
                <div>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[var(--bg-card)] text-[var(--accent-gold)] border border-[var(--border-subtle)] font-semibold">
                    {univ.badge}
                  </span>
                  <h3 className="font-serif font-bold text-sm text-[var(--text-primary)] mt-1 leading-snug">
                    {univ.name}
                  </h3>
                  <div className="text-[11px] text-[var(--text-muted)] font-mono">
                    {univ.location}
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mt-1.5 leading-relaxed">
                    {univ.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Rashomon Multidisciplinary Paradigm Banner */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-gradient-to-br from-[var(--bg-card)] via-[var(--bg-card-hover)] to-[var(--bg-card)] p-6 sm:p-8">
          <div className="max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-gold)] font-bold flex items-center gap-1.5">
              <Scale className="w-4 h-4" /> The Rashomon Approach to Crime & Society
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mt-2">
              One Phenomenon. Multiple Perspectives. Connected Evidence.
            </h2>
            <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
              Complex criminal acts and institutional justice in India cannot be understood through an isolated disciplinary silo. In The Crime & Society Review, scholarship triangulates across six synchronized perspectives:
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { title: 'BNS & BSA Law', icon: <Scale className="w-4 h-4 text-blue-500" />, desc: 'Section 63 BSA electronic evidence, Article 21 due process, bail laws' },
              { title: 'Forensic Science', icon: <Microscope className="w-4 h-4 text-red-500" />, desc: 'NFSU benchmarks, CFSL validation, DNA mixtures, digital extractions' },
              { title: 'Behavioral Psy', icon: <Brain className="w-4 h-4 text-purple-500" />, desc: 'Selvi self-incrimination doctrine, eyewitness bias, forensic interrogation' },
              { title: 'Indian Society', icon: <Landmark className="w-4 h-4 text-emerald-500" />, desc: 'Undertrial pendency, carceral sociology, caste & structural harms' },
              { title: 'Policing & BNSS', icon: <ShieldAlert className="w-4 h-4 text-amber-500" />, desc: 'Section 105 BNSS videography, I4C cyber fraud containment, police reform' },
              { title: 'Victimology', icon: <HeartHandshake className="w-4 h-4 text-rose-500" />, desc: 'Special POCSO courts, witness protection schemes, victim compensation' },
            ].map((item, i) => (
              <div key={i} className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--accent-gold)] transition-colors">
                <div className="flex items-center gap-2 font-semibold text-xs text-[var(--text-primary)]">
                  {item.icon}
                  <span>{item.title}</span>
                </div>
                <p className="mt-1.5 text-[11px] text-[var(--text-muted)] leading-tight">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disciplinary Lens Filter & Continuous Rolling Articles Feed (Nature style card hierarchy) */}
      <section className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-mono uppercase font-bold text-[var(--accent-gold)]">
                Continuous Publication Feed
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mt-1">
              Volume 1 (2026) — Open Rolling Issue
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Filtering across {filteredArticles.length} published peer-reviewed investigations
            </p>
          </div>

          {/* Lens Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {lensButtons.map(btn => (
              <button
                key={btn.id}
                onClick={() => setSelectedLens(btn.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                  selectedLens === btn.id
                    ? 'bg-[var(--accent-navy)] text-white shadow-sm font-semibold'
                    : 'bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--accent-gold)]'
                }`}
              >
                {btn.icon}
                <span>{btn.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map(article => (
            <article 
              key={article.id}
              className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--accent-gold)] transition-all duration-200 flex flex-col justify-between group shadow-sm"
            >
              <div>
                {/* Meta Top Line */}
                <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] mb-3">
                  <span className="text-[var(--accent-gold)] font-bold">{article.elocationId}</span>
                  <span>{article.publishedDate}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] uppercase font-semibold bg-[var(--bg-card-hover)] border border-[var(--border-subtle)]">
                    {article.articleType}
                  </span>
                </div>

                {/* Article Title */}
                <Link to={`/article/${article.id}`}>
                  <h3 className="font-serif text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-navy)] transition-colors leading-snug">
                    {article.title}
                  </h3>
                </Link>

                {/* Authors with Affiliations */}
                <p className="text-xs text-[var(--text-secondary)] mt-2">
                  {article.authors.map(a => a.name).join(', ')}
                </p>

                {/* Lay Summary Preview */}
                <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-3 line-clamp-3 leading-relaxed font-serif">
                  {article.laySummary || article.abstract}
                </p>
              </div>

              {/* Card Footer: Lenses, Citations & Action CTAs */}
              <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3 text-xs">
                {/* Primary Lens Badge */}
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium uppercase bg-[var(--accent-navy)]/10 text-[var(--accent-navy)]">
                    {article.discipline}
                  </span>
                  {article.secondaryDisciplines.slice(0, 2).map((sec, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-mono text-[var(--text-muted)] bg-[var(--bg-card-hover)]">
                      +{sec}
                    </span>
                  ))}
                </div>

                {/* Scite Badge & Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCitationArticle(article)}
                    className="p-1.5 rounded border border-[var(--border-subtle)] hover:border-[var(--accent-gold)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1 cursor-pointer"
                    title="Cite this paper"
                  >
                    <Quote className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                    <span className="text-[11px] font-mono">Cite</span>
                  </button>

                  <Link
                    to={`/article/${article.id}`}
                    className="font-semibold text-[var(--accent-navy)] hover:text-[var(--accent-gold)] flex items-center gap-1 group/btn ml-1"
                  >
                    <span>Read Paper</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Concept Knowledge Graph Teaser */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl space-y-3">
            <span className="text-xs font-mono uppercase font-bold text-[var(--accent-gold)] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Discovery Visualization
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
              Interactive Interdisciplinary Concept Map
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              Move beyond keyword boundaries. Explore our force-directed knowledge network connecting algorithmic bias, due process precedents, DNA chain-of-custody protocols, and restorative justice models.
            </p>
            <div className="pt-2">
              <Link
                to="/explore?tab=graph"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--accent-navy)] text-white font-semibold text-xs hover:opacity-90 transition-opacity"
              >
                <span>Launch Concept Knowledge Graph</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Visual Concept Nodes Tag Cloud */}
          <div className="flex flex-wrap justify-center gap-2 max-w-md bg-[var(--bg-card-hover)] p-5 rounded-xl border border-[var(--border-subtle)]">
            {MOCK_CONCEPT_NODES.map((node) => (
              <Link
                key={node.id}
                to={`/explore?concept=${encodeURIComponent(node.label)}`}
                className="px-3 py-1 rounded-full text-xs font-medium border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)] transition-colors shadow-2xs flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)]"></span>
                <span>{node.label}</span>
                <span className="text-[10px] font-mono text-[var(--text-muted)]">({node.articlesCount})</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NATURE-STYLE CITATION MODAL */}
      {citationArticle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[var(--bg-card)] border border-[var(--border-strong)] rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase font-bold text-[var(--accent-gold)]">
                  Cite This Investigation
                </span>
                <h3 className="font-serif text-lg font-bold text-[var(--text-primary)] mt-1">
                  {citationArticle.title}
                </h3>
                <div className="text-xs text-[var(--text-muted)] font-mono mt-1">
                  DOI: {citationArticle.doi} • Vol. {citationArticle.volume} (2026)
                </div>
              </div>
              <button
                onClick={() => setCitationArticle(null)}
                className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Citation Formats */}
            <div className="space-y-4">
              {(() => {
                const formats = generateCitationFormats(citationArticle);
                return (
                  <>
                    {/* Bluebook 21st Edition (Indian Law Standard) */}
                    <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[var(--text-primary)]">
                          Bluebook 21st Edition (Standard for Indian Courts & Law Journals)
                        </span>
                        <button
                          onClick={() => handleCopyCitation(formats.bluebook, 'bluebook')}
                          className="px-2 py-1 rounded border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[11px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1 cursor-pointer"
                        >
                          {copiedFormat === 'bluebook' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedFormat === 'bluebook' ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                      <p className="text-xs font-serif text-[var(--text-secondary)] select-all leading-relaxed">
                        {formats.bluebook}
                      </p>
                    </div>

                    {/* APA 7th Edition */}
                    <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[var(--text-primary)]">APA 7th Edition</span>
                        <button
                          onClick={() => handleCopyCitation(formats.apa, 'apa')}
                          className="px-2 py-1 rounded border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[11px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1 cursor-pointer"
                        >
                          {copiedFormat === 'apa' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedFormat === 'apa' ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                      <p className="text-xs font-serif text-[var(--text-secondary)] select-all leading-relaxed">
                        {formats.apa}
                      </p>
                    </div>

                    {/* BibTeX Code Snippet */}
                    <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[var(--text-primary)]">BibTeX</span>
                        <button
                          onClick={() => handleCopyCitation(formats.bibtex, 'bibtex')}
                          className="px-2 py-1 rounded border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[11px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1 cursor-pointer"
                        >
                          {copiedFormat === 'bibtex' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedFormat === 'bibtex' ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                      <pre className="text-[11px] font-mono bg-[var(--bg-card)] p-2.5 rounded border border-[var(--border-subtle)] text-[var(--text-secondary)] overflow-x-auto">
                        {formats.bibtex}
                      </pre>
                    </div>
                  </>
                );
              })()}
            </div>

            <div className="flex justify-end pt-2 border-t border-[var(--border-subtle)]">
              <button
                onClick={() => setCitationArticle(null)}
                className="px-4 py-2 rounded-lg bg-[var(--accent-navy)] text-white font-medium text-xs hover:opacity-90 cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* INDEXING CREDENTIAL DETAIL MODAL */}
      {selectedCredential && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[var(--bg-card)] border border-[var(--border-strong)] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-[var(--accent-navy)]/10 text-[var(--accent-navy)] flex items-center justify-center font-mono font-bold text-xs">
                  {selectedCredential.acronym}
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[var(--text-primary)]">
                    {selectedCredential.name}
                  </h3>
                  <span className="text-[11px] font-mono text-[var(--accent-gold)] font-bold">
                    {selectedCredential.badge}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedCredential(null)}
                className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {selectedCredential.description}
            </p>

            <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/5 text-xs text-emerald-800 dark:text-emerald-300">
              <span className="font-bold block">Status: {selectedCredential.status}</span>
              <p className="text-[11px] mt-0.5 text-[var(--text-muted)]">
                Accepted for UGC Academic Performance Indicator (API) scores for faculty recruitment and Career Advancement Scheme (CAS) across Indian Central and State Universities.
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedCredential(null)}
                className="px-4 py-2 rounded-lg bg-[var(--accent-navy)] text-white font-medium text-xs hover:opacity-90 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OFFICIAL DIGITAL PUBLICATION CERTIFICATE PREVIEW MODAL */}
      {isCertificateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[var(--bg-card)] border border-[var(--border-strong)] rounded-2xl max-w-3xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase font-bold text-[var(--accent-gold)]">
                  Specimen Copy • UGC CAS & PhD API Compliant
                </span>
                <h3 className="font-serif text-xl font-bold text-[var(--text-primary)] mt-1">
                  Official Digital Certificate of Publication
                </h3>
              </div>
              <button
                onClick={() => setIsCertificateModalOpen(false)}
                className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Rendered Certificate Card */}
            <div className="p-8 rounded-xl border-4 border-double border-[var(--accent-gold)] bg-gradient-to-b from-[#FFFDF9] via-[#FAF7F0] to-[#FFFDF9] text-slate-900 shadow-inner relative space-y-6 text-center">
              {/* Top Watermark Crest */}
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-slate-900 text-[var(--accent-gold)] flex items-center justify-center border-2 border-[var(--accent-gold)] shadow-sm">
                  <Scale className="w-6 h-6" />
                </div>
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#8C6D37] font-bold block">
                  COUNCIL OF SCIENTIFIC & LEGAL EDITORS • REGISTERED ISSN 2998-4122
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1 tracking-tight">
                  The Crime & Society Review
                </h2>
                <div className="text-xs font-serif italic text-slate-600 mt-0.5">
                  An Interdisciplinary Indian Scholarly Journal of Law, Forensics & Criminology
                </div>
              </div>

              <div className="py-2">
                <div className="inline-block border-y-2 border-[#8C6D37]/40 py-1 px-8 text-xs font-mono font-bold tracking-widest text-[#8C6D37] uppercase">
                  CERTIFICATE OF SCHOLARLY PUBLICATION
                </div>
              </div>

              <p className="text-sm font-serif text-slate-800 max-w-xl mx-auto leading-relaxed">
                This is to certify that the peer-reviewed research manuscript entitled
              </p>

              <div className="p-3 bg-[#F4EFE6] rounded-lg border border-[#DCD3C1] max-w-xl mx-auto">
                <span className="font-serif text-base font-bold text-slate-950 italic">
                  "The Rashomon Paradigm in Indian Criminal Jurisprudence: Reconciling Algorithmic Forensics with Article 21 and the BSA (2023)"
                </span>
              </div>

              <p className="text-sm font-serif text-slate-800">
                authored by <span className="font-bold text-slate-950 underline">{certificateAuthorName}</span> et al., has undergone rigorous double-blind peer review and has been officially published in <strong>Volume 1, Article e10492 (2026)</strong> under persistent Crossref DOI: <span className="font-mono text-xs font-bold text-blue-800">10.59821/csr.2026.10492</span>.
              </p>

              {/* Bottom Signatures & Seal */}
              <div className="pt-6 border-t border-[#DCD3C1] grid grid-cols-3 items-center gap-4 text-xs font-serif text-slate-700">
                <div>
                  <div className="font-script text-lg text-slate-900 font-bold italic">Hon. Devendra Pathak</div>
                  <div className="border-t border-slate-400 mt-1 pt-1 text-[10px] font-sans font-medium text-slate-600">
                    Chief Editor & Former Judge
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full border-2 border-emerald-700 flex items-center justify-center p-1 bg-emerald-50 text-emerald-800">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <span className="text-[9px] font-mono text-emerald-800 font-bold mt-1">UGC-CARE VERIFIED</span>
                </div>

                <div>
                  <div className="font-script text-lg text-slate-900 font-bold italic">Dr. Aarav Sengupta</div>
                  <div className="border-t border-slate-400 mt-1 pt-1 text-[10px] font-sans font-medium text-slate-600">
                    Managing Registrar
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <span className="text-xs text-[var(--text-muted)] font-mono">
                Issued with instant QR-code verification for UGC Career Advancement Scheme (CAS).
              </span>
              <button
                onClick={() => setIsCertificateModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-[var(--accent-navy)] text-white font-medium text-xs hover:opacity-90 cursor-pointer"
              >
                Close Specimen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
