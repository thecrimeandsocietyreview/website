import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FileText, 
  Download, 
  Quote, 
  Share2, 
  CheckCircle2, 
  Eye, 
  Scale, 
  Microscope, 
  Brain, 
  Landmark, 
  ShieldAlert, 
  Clock, 
  Sparkles, 
  GitCompare, 
  MessageSquare, 
  Bookmark, 
  Copy, 
  Check, 
  ExternalLink, 
  Maximize2, 
  Sliders, 
  Volume2, 
  Play, 
  Pause, 
  X,
  Layers
} from 'lucide-react';
import { MOCK_ARTICLES, JOURNAL_METADATA } from '../data/mockJournalData';
import { DisciplinaryLens, Citation, FigureData, Annotation } from '../types/journal';
import { useTheme } from '../context/ThemeContext';

export const ArticleReaderPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { theme, setTheme } = useTheme();

  const article = MOCK_ARTICLES.find(a => a.id === id) || MOCK_ARTICLES[0];

  // State controls
  const [activeLens, setActiveLens] = useState<DisciplinaryLens>('all');
  const [activeInspectorTab, setActiveInspectorTab] = useState<'citation' | 'figure' | 'annotations' | 'policy'>('citation');
  const [selectedCitation, setSelectedCitation] = useState<Citation | null>(article.citations[0] || null);
  const [selectedFigure, setSelectedFigure] = useState<FigureData | null>(article.figures[0] || null);
  const [isDiffMode, setIsDiffMode] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string>('sec-intro');
  const [fontSizeScale, setFontSizeScale] = useState<number>(100); // percentage
  const [copiedCitationFormat, setCopiedCitationFormat] = useState<string | null>(null);
  const [isCiteModalOpen, setIsCiteModalOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // User annotations stored in localStorage
  const [annotations, setAnnotations] = useState<Annotation[]>(() => {
    const saved = localStorage.getItem(`csr_annotations_${article.id}`);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return article.annotations; }
    }
    return article.annotations;
  });

  const [newAnnotationText, setNewAnnotationText] = useState('');
  const [newAnnotationAuthor, setNewAnnotationAuthor] = useState('Dr. Guest Scholar (Verified via ORCID)');

  const handleAddAnnotation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnotationText.trim()) return;

    const newAnn: Annotation = {
      id: `user-ann-${Date.now()}`,
      author: newAnnotationAuthor,
      orcid: "0000-0002-8819-0012",
      affiliation: "Visiting Academic Researcher",
      role: "Verified Scholar",
      date: new Date().toISOString().split('T')[0],
      paragraphId: "p2",
      text: newAnnotationText.trim(),
      lens: activeLens === 'all' ? 'legal' : activeLens,
    };

    const updated = [newAnn, ...annotations];
    setAnnotations(updated);
    localStorage.setItem(`csr_annotations_${article.id}`, JSON.stringify(updated));
    setNewAnnotationText('');
  };

  // Handle citation click without scroll jump
  const handleCitationClick = (citationNum: number) => {
    const found = article.citations.find(c => c.num === citationNum);
    if (found) {
      setSelectedCitation(found);
      setActiveInspectorTab('citation');
    }
  };

  // Handle figure click
  const handleFigureClick = (figureId: string) => {
    const found = article.figures.find(f => f.id === figureId);
    if (found) {
      setSelectedFigure(found);
      setActiveInspectorTab('figure');
    }
  };

  // Copy citation formats
  const handleCopyCitation = (format: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCitationFormat(format);
    setTimeout(() => setCopiedCitationFormat(null), 2000);
  };

  const citationAPA = `${article.authors.map(a => a.name).join(', ')} (${article.year}). ${article.title}. The Crime & Society Review, ${article.volume}, ${article.elocationId}. https://doi.org/${article.doi}`;
  const citationBibTeX = `@article{csr_${article.year}_${article.elocationId},
  author = {${article.authors.map(a => a.name).join(' and ')}},
  title = {${article.title}},
  journal = {The Crime & Society Review},
  volume = {${article.volume}},
  pages = {${article.elocationId}},
  year = {${article.year}},
  doi = {${article.doi}}
}`;

  return (
    <div className="w-full min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] transition-colors animate-fadeIn">
      {/* Article Top Navigation & Utility Header */}
      <div className="sticky top-16 z-30 border-b border-[var(--border-subtle)] bg-[var(--bg-card)]/95 backdrop-blur-md px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Breadcrumbs & Metadata */}
          <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--text-muted)]">
            <Link to="/archive" className="hover:text-[var(--accent-navy)]">Vol. {article.volume} ({article.year})</Link>
            <span>/</span>
            <span className="text-[var(--accent-gold)] font-bold">{article.elocationId}</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">DOI: {article.doi}</span>
          </div>

          {/* Reader Preferences & Action Toolbar */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Rashomon Lens Selector Pill */}
            <div className="flex items-center rounded-lg border border-[var(--border-subtle)] p-0.5 bg-[var(--bg-card-hover)]">
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase text-[var(--accent-gold)] hidden sm:inline">
                Lens:
              </span>
              {(['all', 'legal', 'forensic', 'psychological', 'sociological'] as DisciplinaryLens[]).map(lens => (
                <button
                  key={lens}
                  onClick={() => setActiveLens(lens)}
                  className={`px-2 py-1 rounded text-xs capitalize transition-colors cursor-pointer ${
                    activeLens === lens 
                      ? 'bg-[var(--accent-navy)] text-white font-semibold shadow-xs' 
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {lens === 'all' ? 'All' : lens}
                </button>
              ))}
            </div>

            {/* Living Document Diff Toggle */}
            <button
              onClick={() => setIsDiffMode(!isDiffMode)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors flex items-center gap-1.5 cursor-pointer ${
                isDiffMode 
                  ? 'bg-emerald-600 text-white border-emerald-600 font-bold' 
                  : 'border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:border-[var(--accent-gold)]'
              }`}
              title="Toggle Git-Style Living Document Version Differences"
            >
              <GitCompare className="w-3.5 h-3.5" />
              <span>{isDiffMode ? 'Diff Active (v1.1)' : 'Living Diff'}</span>
            </button>

            {/* Font Size Adjuster */}
            <div className="hidden md:flex items-center border border-[var(--border-subtle)] rounded-md px-1.5 py-0.5 bg-[var(--bg-card)] text-[11px] gap-1">
              <button 
                onClick={() => setFontSizeScale(prev => Math.max(85, prev - 5))}
                className="px-1 hover:text-[var(--accent-gold)] font-serif font-bold"
                title="Decrease Font Size"
              >
                A-
              </button>
              <span className="font-mono text-[10px] text-[var(--text-muted)]">{fontSizeScale}%</span>
              <button 
                onClick={() => setFontSizeScale(prev => Math.min(130, prev + 5))}
                className="px-1 hover:text-[var(--accent-gold)] font-serif font-bold text-sm"
                title="Increase Font Size"
              >
                A+
              </button>
            </div>

            {/* Cite Button */}
            <button
              onClick={() => setIsCiteModalOpen(true)}
              className="px-2.5 py-1 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--accent-gold)] text-[var(--text-primary)] font-medium text-xs flex items-center gap-1"
            >
              <Quote className="w-3 h-3 text-[var(--accent-gold)]" />
              <span>Cite</span>
            </button>

            {/* PDF Galley Button */}
            <button
              onClick={() => setIsPdfModalOpen(true)}
              className="px-2.5 py-1 rounded-md bg-[var(--accent-navy)] text-white font-semibold text-xs hover:opacity-90 flex items-center gap-1"
            >
              <Download className="w-3 h-3" />
              <span>PDF Galley</span>
            </button>
          </div>
        </div>
      </div>

      {/* Living Document Revision Alert Banner (When Diff Mode is active) */}
      {isDiffMode && (
        <div className="bg-emerald-500/10 border-b border-emerald-500/30 px-4 py-2.5 text-xs text-emerald-800 dark:text-emerald-300">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 font-mono">
            <div className="flex items-center gap-2">
              <GitCompare className="w-4 h-4 text-emerald-600" />
              <span className="font-bold">Living Document Diff Mode Active:</span>
              <span>Comparing Version of Record (v1.0) with Approved Peer Revision (v1.1, Released 18 Mar 2026).</span>
            </div>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="diff-added">+ Added / Expanded</span>
              <span className="diff-removed">- Deprecated</span>
            </div>
          </div>
        </div>
      )}

      {/* Tri-Pane Responsive Article Container */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ========================================================================= */}
        {/* LEFT PANE: Document Map, TOC & Review Milestones (Col Span 3) */}
        {/* ========================================================================= */}
        <aside className="lg:col-span-3 space-y-6 lg:sticky lg:top-32 self-start">
          {/* Reading Time & Status */}
          <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-3">
            <div className="flex items-center justify-between text-xs text-[var(--text-muted)] font-mono">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                <span>{article.readingTime} min read</span>
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">Version of Record</span>
            </div>

            {/* Quick 3-min audio scholar button */}
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className="w-full py-2 px-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] hover:border-[var(--accent-navy)] text-xs font-medium flex items-center justify-center gap-2 text-[var(--text-primary)] transition-colors"
            >
              <Volume2 className="w-4 h-4 text-[var(--accent-navy)]" />
              <span>{isPlayingAudio ? 'Pause Audio Brief' : '3-Min Audio Briefing'}</span>
            </button>
          </div>

          {/* Dynamic Scroll-Spy Table of Contents */}
          <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)]">
              Document Map
            </h4>
            <nav className="space-y-1 text-xs">
              <a 
                href="#sec-abstract"
                className="block py-1 px-2 rounded hover:bg-[var(--bg-card-hover)] text-[var(--text-secondary)] font-medium"
              >
                Abstract & Lay Summary
              </a>
              {article.sections.map(sec => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className="block py-1.5 px-2 rounded hover:bg-[var(--bg-card-hover)] text-[var(--text-secondary)] hover:text-[var(--accent-navy)] transition-colors font-serif leading-snug"
                >
                  {sec.title}
                </a>
              ))}
              <a 
                href="#sec-policy-matrix"
                className="block py-1 px-2 rounded hover:bg-[var(--bg-card-hover)] text-[var(--accent-gold)] font-medium font-sans"
              >
                Policy & Practice Matrix
              </a>
              <a 
                href="#sec-references"
                className="block py-1 px-2 rounded hover:bg-[var(--bg-card-hover)] text-[var(--text-secondary)] font-medium font-sans"
              >
                References ({article.citations.length})
              </a>
            </nav>
          </div>

          {/* Peer-Review Transparent Audit Trail */}
          <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Peer Review Timeline
            </h4>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between text-[var(--text-muted)]">
                <span>Received:</span>
                <span>{article.receivedDate}</span>
              </div>
              <div className="flex items-center justify-between text-[var(--text-muted)]">
                <span>Revised:</span>
                <span>{article.revisedDate}</span>
              </div>
              <div className="flex items-center justify-between text-[var(--text-muted)]">
                <span>Accepted:</span>
                <span>{article.acceptedDate}</span>
              </div>
              <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                <span>Published:</span>
                <span>{article.publishedDate}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* ========================================================================= */}
        {/* CENTER PANE: Typographic Scholarly Narrative Column (Col Span 6) */}
        {/* ========================================================================= */}
        <main className="lg:col-span-6 space-y-8">
          {/* Article Header & Title */}
          <div className="border-b border-[var(--border-subtle)] pb-6 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-mono font-semibold bg-[var(--accent-navy)]/10 text-[var(--accent-navy)]">
                {article.articleType}
              </span>
              <span className="text-xs font-mono text-[var(--text-muted)]">
                elocation-id: {article.elocationId}
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-primary)] leading-tight">
              {article.title}
            </h1>

            {/* Author Byline */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-sm text-[var(--text-secondary)]">
              {article.authors.map((auth, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span className="font-semibold text-[var(--text-primary)]">{auth.name}</span>
                  <a
                    href={`https://orcid.org/${auth.orcid}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-600 hover:text-emerald-700 font-mono text-xs inline-flex items-center"
                    title={`ORCID: ${auth.orcid}`}
                  >
                    iD
                  </a>
                  {idx < article.authors.length - 1 && <span className="text-[var(--border-strong)]">;</span>}
                </div>
              ))}
            </div>

            <div className="text-xs text-[var(--text-muted)] space-y-1">
              {article.authors.map((auth, i) => (
                <div key={i}>{auth.name}: <span className="italic">{auth.affiliation}</span></div>
              ))}
            </div>
          </div>

          {/* Abstract & Lay Summary Box */}
          <div id="sec-abstract" className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-4">
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent-gold)] mb-2">
                Abstract
              </h3>
              <p className="font-serif text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
                {article.abstract}
              </p>
            </div>

            {article.laySummary && (
              <div className="pt-3 border-t border-[var(--border-subtle)]">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent-navy)] mb-1">
                  Lay / Executive Summary
                </h4>
                <p className="font-serif text-xs sm:text-sm leading-relaxed text-[var(--text-muted)] italic">
                  {article.laySummary}
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-1.5 pt-2">
              {article.keywords.map((kw, i) => (
                <span key={i} className="px-2 py-0.5 rounded-full text-xs bg-[var(--bg-card-hover)] border border-[var(--border-subtle)] text-[var(--text-muted)] font-mono">
                  #{kw}
                </span>
              ))}
            </div>
          </div>

          {/* Main Narrative Body */}
          <div 
            className="scholarly-prose"
            style={{ fontSize: `${fontSizeScale}%` }}
          >
            {article.sections.map((section) => (
              <section key={section.id} id={section.id} className="space-y-4">
                <h2>{section.title}</h2>
                {section.paragraphs.map((para) => {
                  const isHighlightedLens = activeLens !== 'all' && para.lensTag === activeLens;
                  const isDimmed = activeLens !== 'all' && para.lensTag && para.lensTag !== activeLens;

                  return (
                    <div 
                      key={para.id}
                      className={`relative transition-all duration-200 ${
                        isHighlightedLens ? `lens-highlight-${activeLens}` : ''
                      } ${isDimmed ? 'lens-dimmed' : ''}`}
                    >
                      <p>
                        {/* If in Diff Mode, check if there's a diff modification */}
                        {isDiffMode && article.revisions?.changes.some(c => c.paragraphId === para.id) ? (
                          <>
                            {para.text.split('revealing')[0]}
                            <span className="diff-removed">
                              revealing a documented 3.2% demographic disparity in secondary algorithmic confidence scores
                            </span>
                            {' '}
                            <span className="diff-added">
                              revealing an escalated 4.8% demographic disparity in secondary algorithmic confidence scores across complex low-template mixtures
                            </span>
                            {para.text.split('revealing a documented 3.2% demographic disparity in secondary algorithmic confidence scores')[1] || ''}
                          </>
                        ) : (
                          para.text
                        )}

                        {/* In-text Citation Badges */}
                        {para.citationIds?.map((citNum) => (
                          <button
                            key={citNum}
                            onClick={() => handleCitationClick(citNum)}
                            className="citation-ref"
                            title={`Inspect citation [${citNum}] in right dock`}
                          >
                            [{citNum}]
                          </button>
                        ))}
                      </p>

                      {/* In-text Figure Docking Callout */}
                      {para.figureId && (
                        <div className="my-4 p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-[var(--accent-gold)]">
                              Figure Callout:
                            </span>
                            <span className="text-xs font-serif italic text-[var(--text-secondary)]">
                              {article.figures.find(f => f.id === para.figureId)?.title}
                            </span>
                          </div>
                          <button
                            onClick={() => handleFigureClick(para.figureId!)}
                            className="px-2 py-1 rounded text-xs bg-[var(--accent-navy)]/10 text-[var(--accent-navy)] font-semibold hover:bg-[var(--accent-navy)]/20 transition-colors"
                          >
                            Dock in Inspector →
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </section>
            ))}

            {/* Policy & Practice Matrix Section */}
            <section id="sec-policy-matrix" className="mt-12 pt-6 border-t border-[var(--border-subtle)]">
              <h2>Policy & Operational Impact Matrix</h2>
              <p className="text-sm text-[var(--text-muted)] font-sans mb-4">
                Actionable translations for criminal justice practitioners, jurists, and reform advocates.
              </p>

              <div className="space-y-4 font-sans text-xs">
                {/* For Law Enforcement */}
                <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
                  <div className="flex items-center gap-2 font-bold text-[var(--text-primary)] text-sm mb-2 text-blue-700 dark:text-blue-400">
                    <ShieldAlert className="w-4 h-4" /> For Law Enforcement & Investigators
                  </div>
                  <ul className="list-disc list-inside space-y-1.5 text-[var(--text-secondary)]">
                    {article.policyMatrix.lawEnforcement.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* For Judiciary */}
                <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
                  <div className="flex items-center gap-2 font-bold text-[var(--text-primary)] text-sm mb-2 text-purple-700 dark:text-purple-400">
                    <Scale className="w-4 h-4" /> For Judiciary & Defense Jurists
                  </div>
                  <ul className="list-disc list-inside space-y-1.5 text-[var(--text-secondary)]">
                    {article.policyMatrix.judiciary.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* For Policy Makers */}
                <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
                  <div className="flex items-center gap-2 font-bold text-[var(--text-primary)] text-sm mb-2 text-emerald-700 dark:text-emerald-400">
                    <Landmark className="w-4 h-4" /> For Legislative Reformers & NGOs
                  </div>
                  <ul className="list-disc list-inside space-y-1.5 text-[var(--text-secondary)]">
                    {article.policyMatrix.policyMakers.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* References Section */}
            <section id="sec-references" className="mt-12 pt-6 border-t border-[var(--border-subtle)] font-sans">
              <h2>References ({article.citations.length})</h2>
              <div className="space-y-4 text-xs">
                {article.citations.map((cit) => (
                  <div 
                    key={cit.id}
                    onClick={() => handleCitationClick(cit.num)}
                    className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                      selectedCitation?.id === cit.id
                        ? 'border-[var(--accent-navy)] bg-[var(--accent-navy)]/5'
                        : 'border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--border-strong)]'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <span className="font-mono font-bold text-[var(--accent-gold)]">[{cit.num}]</span>
                      <div className="flex-1">
                        <div className="font-medium text-[var(--text-primary)]">{cit.authors} ({cit.year}).</div>
                        <div className="text-[var(--text-secondary)] font-serif italic">{cit.title}.</div>
                        <div className="text-[var(--text-muted)]">{cit.journal}, {cit.volume}.</div>
                        <div className="mt-1 flex items-center gap-3 font-mono text-[11px]">
                          <span className="text-emerald-600 font-bold">{cit.scite.supporting} Supporting</span>
                          <span className="text-[var(--text-muted)]">•</span>
                          <span className="text-[var(--accent-navy)] hover:underline">{cit.doi}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>

        {/* ========================================================================= */}
        {/* RIGHT PANE: Dynamic Context-Sensitive Inspector Dock (Col Span 3) */}
        {/* ========================================================================= */}
        <aside className="lg:col-span-3 space-y-4 lg:sticky lg:top-32 self-start">
          {/* Tab Selector Buttons */}
          <div className="flex items-center rounded-lg border border-[var(--border-subtle)] p-0.5 bg-[var(--bg-card)] text-xs">
            <button
              onClick={() => setActiveInspectorTab('citation')}
              className={`flex-1 py-1.5 rounded-md font-semibold transition-colors flex items-center justify-center gap-1 ${
                activeInspectorTab === 'citation'
                  ? 'bg-[var(--accent-navy)] text-white'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Quote className="w-3.5 h-3.5" />
              <span>Cite</span>
            </button>

            <button
              onClick={() => setActiveInspectorTab('figure')}
              className={`flex-1 py-1.5 rounded-md font-semibold transition-colors flex items-center justify-center gap-1 ${
                activeInspectorTab === 'figure'
                  ? 'bg-[var(--accent-navy)] text-white'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Media</span>
            </button>

            <button
              onClick={() => setActiveInspectorTab('annotations')}
              className={`flex-1 py-1.5 rounded-md font-semibold transition-colors flex items-center justify-center gap-1 ${
                activeInspectorTab === 'annotations'
                  ? 'bg-[var(--accent-navy)] text-white'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Notes ({annotations.length})</span>
            </button>

            <button
              onClick={() => setActiveInspectorTab('policy')}
              className={`flex-1 py-1.5 rounded-md font-semibold transition-colors flex items-center justify-center gap-1 ${
                activeInspectorTab === 'policy'
                  ? 'bg-[var(--accent-navy)] text-white'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Policy</span>
            </button>
          </div>

          {/* Inspector Panel Body */}
          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 shadow-sm min-h-[420px]">
            {/* TAB 1: Smart Citation (Scite Integration) */}
            {activeInspectorTab === 'citation' && selectedCitation && (
              <div className="space-y-4 animate-fadeIn text-xs">
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
                  <span className="font-mono font-bold text-[var(--accent-gold)]">
                    Citation [{selectedCitation.num}]
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--bg-card-hover)] text-[var(--text-muted)]">
                    Scite Smart Index
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-sm text-[var(--text-primary)] leading-snug">
                    {selectedCitation.title}
                  </h4>
                  <p className="text-[var(--text-secondary)]">{selectedCitation.authors} ({selectedCitation.year})</p>
                  <p className="text-[var(--text-muted)] italic">{selectedCitation.journal}, {selectedCitation.volume}</p>
                </div>

                {/* Scite Smart Badge Matrix */}
                <div className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] space-y-2">
                  <span className="font-mono font-bold text-[10px] uppercase text-[var(--text-muted)] block">
                    Contextual Citation Analysis (Scite)
                  </span>
                  <div className="grid grid-cols-3 gap-2 text-center font-mono">
                    <div className="p-1.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                      <div className="font-bold text-sm">{selectedCitation.scite.supporting}</div>
                      <div className="text-[9px] uppercase">Supporting</div>
                    </div>
                    <div className="p-1.5 rounded bg-slate-500/10 text-[var(--text-secondary)]">
                      <div className="font-bold text-sm">{selectedCitation.scite.mentioning}</div>
                      <div className="text-[9px] uppercase">Mentioning</div>
                    </div>
                    <div className="p-1.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400">
                      <div className="font-bold text-sm">{selectedCitation.scite.contrasting}</div>
                      <div className="text-[9px] uppercase">Contrasting</div>
                    </div>
                  </div>
                </div>

                {/* In-Text Excerpt */}
                <div className="space-y-1">
                  <span className="font-mono text-[10px] uppercase text-[var(--text-muted)]">
                    Cited Excerpt in CSR Paper:
                  </span>
                  <blockquote className="p-2.5 rounded bg-[var(--bg-card-hover)] border-l-2 border-[var(--accent-navy)] italic text-[var(--text-secondary)]">
                    "{selectedCitation.excerpt}"
                  </blockquote>
                </div>

                <div className="pt-2">
                  <a
                    href={`https://doi.org/${selectedCitation.doi}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[var(--accent-navy)] hover:underline font-mono text-[11px]"
                  >
                    <span>View Persistent DOI Record</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}

            {/* TAB 2: Media & Figures Dock */}
            {activeInspectorTab === 'figure' && selectedFigure && (
              <div className="space-y-4 animate-fadeIn text-xs">
                <div className="border-b border-[var(--border-subtle)] pb-2 flex items-center justify-between">
                  <span className="font-mono font-bold text-[var(--accent-gold)]">
                    {selectedFigure.label}
                  </span>
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">Interactive Figure</span>
                </div>

                <div>
                  <h4 className="font-semibold text-sm text-[var(--text-primary)] leading-tight">
                    {selectedFigure.title}
                  </h4>
                  <p className="mt-1 text-[var(--text-muted)] leading-relaxed">
                    {selectedFigure.caption}
                  </p>
                </div>

                {/* Metrics / Timeline Content */}
                {selectedFigure.metrics && (
                  <div className="grid grid-cols-2 gap-2">
                    {selectedFigure.metrics.map((m, i) => (
                      <div key={i} className="p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-hover)]">
                        <div className="font-mono text-base font-bold text-[var(--accent-navy)]">{m.value}</div>
                        <div className="text-[10px] text-[var(--text-muted)] leading-tight">{m.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Table Data Preview */}
                {selectedFigure.tableData && (
                  <div className="overflow-x-auto border border-[var(--border-subtle)] rounded-lg">
                    <table className="w-full text-left font-mono text-[10px]">
                      <thead className="bg-[var(--bg-card-hover)] border-b border-[var(--border-subtle)]">
                        <tr>
                          {selectedFigure.tableData.headers.map((h, i) => (
                            <th key={i} className="p-1.5 font-bold text-[var(--text-primary)]">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {selectedFigure.tableData.rows.map((r, ri) => (
                          <tr key={ri} className="border-b border-[var(--border-subtle)] hover:bg-[var(--bg-card-hover)]">
                            {r.map((c, ci) => (
                              <td key={ci} className="p-1.5">{c}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Timeline Events Preview */}
                {selectedFigure.timelineEvents && (
                  <div className="space-y-2">
                    {selectedFigure.timelineEvents.map((evt, i) => (
                      <div key={i} className="p-2 rounded border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] space-y-1">
                        <div className="flex items-center justify-between font-mono text-[10px]">
                          <span className="font-bold text-[var(--accent-gold)]">{evt.phase}</span>
                          <span className="text-[var(--text-muted)]">{evt.date}</span>
                        </div>
                        <p className="text-[11px] text-[var(--text-secondary)]">{evt.details}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: W3C Open Web Annotations (Hypothesis Style) */}
            {activeInspectorTab === 'annotations' && (
              <div className="space-y-4 animate-fadeIn text-xs">
                <div className="border-b border-[var(--border-subtle)] pb-2 flex items-center justify-between">
                  <span className="font-mono font-bold text-[var(--accent-gold)]">
                    W3C Scholarly Annotations
                  </span>
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                    ORCID Verified
                  </span>
                </div>

                {/* Annotations List */}
                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                  {annotations.map((ann) => (
                    <div key={ann.id} className="p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] space-y-1.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-[var(--text-primary)]">{ann.author}</span>
                        <span className="text-[10px] font-mono text-[var(--text-muted)]">{ann.date}</span>
                      </div>
                      <div className="text-[10px] text-[var(--text-muted)] italic">{ann.affiliation}</div>
                      <p className="text-[var(--text-secondary)] font-serif leading-relaxed">
                        "{ann.text}"
                      </p>
                    </div>
                  ))}
                </div>

                {/* New Annotation Form */}
                <form onSubmit={handleAddAnnotation} className="pt-2 border-t border-[var(--border-subtle)] space-y-2">
                  <span className="font-mono text-[10px] uppercase font-bold text-[var(--text-muted)]">
                    Add Post-Publication Commentary:
                  </span>
                  <textarea
                    rows={2}
                    value={newAnnotationText}
                    onChange={e => setNewAnnotationText(e.target.value)}
                    placeholder="Contribute scholarly peer commentary or methodological note..."
                    className="w-full p-2 rounded border border-[var(--border-subtle)] bg-transparent text-[var(--text-primary)] text-xs focus:outline-none focus:border-[var(--accent-gold)]"
                  />
                  <button
                    type="submit"
                    className="w-full py-1.5 rounded bg-[var(--accent-navy)] text-white font-semibold text-xs hover:opacity-90 transition-opacity"
                  >
                    Publish Verified Annotation
                  </button>
                </form>
              </div>
            )}

            {/* TAB 4: Policy Brief Overview */}
            {activeInspectorTab === 'policy' && (
              <div className="space-y-4 animate-fadeIn text-xs">
                <div className="border-b border-[var(--border-subtle)] pb-2 flex items-center justify-between">
                  <span className="font-mono font-bold text-[var(--accent-gold)]">
                    Policy Quick-Brief
                  </span>
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">CSR Synthesis</span>
                </div>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  The Rashomon Tri-Partite Due Process Protocol requires courts to mandate disclosure of probabilistic training data and blind laboratory replications before admitting machine-learning evidence.
                </p>
                <div className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] space-y-1 font-mono text-[11px]">
                  <div className="font-bold text-[var(--accent-navy)]">Key Takeaway for Courts:</div>
                  <div>Do not treat proprietary trade secrets as superior to constitutional Sixth Amendment confrontation guarantees.</div>
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* CITE MODAL */}
      {isCiteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-xl rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-card)] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
              <h3 className="font-serif font-bold text-lg text-[var(--text-primary)] flex items-center gap-2">
                <Quote className="w-5 h-5 text-[var(--accent-gold)]" /> Cite This Research
              </h3>
              <button onClick={() => setIsCiteModalOpen(false)} className="p-1 hover:bg-[var(--border-subtle)] rounded text-[var(--text-muted)]">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* APA 7th */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono font-semibold">
                <span>APA (7th Edition)</span>
                <button
                  onClick={() => handleCopyCitation('apa', citationAPA)}
                  className="text-[var(--accent-navy)] hover:underline flex items-center gap-1"
                >
                  {copiedCitationFormat === 'apa' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCitationFormat === 'apa' ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <p className="p-2.5 rounded bg-[var(--bg-card-hover)] border border-[var(--border-subtle)] text-xs font-serif leading-relaxed text-[var(--text-secondary)]">
                {citationAPA}
              </p>
            </div>

            {/* BibTeX */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono font-semibold">
                <span>BibTeX</span>
                <button
                  onClick={() => handleCopyCitation('bibtex', citationBibTeX)}
                  className="text-[var(--accent-navy)] hover:underline flex items-center gap-1"
                >
                  {copiedCitationFormat === 'bibtex' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCitationFormat === 'bibtex' ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-2.5 rounded bg-[var(--bg-card-hover)] border border-[var(--border-subtle)] text-[11px] font-mono leading-relaxed overflow-x-auto text-[var(--text-secondary)]">
                {citationBibTeX}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* TYPST PDF GALLEY VIEWER MODAL */}
      {isPdfModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-4xl h-[85vh] rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-card)] p-6 shadow-2xl flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[var(--accent-navy)]" />
                <span className="font-serif font-bold text-base text-[var(--text-primary)]">
                  Typst Compiled Galley PDF — {article.elocationId}.pdf
                </span>
              </div>
              <button onClick={() => setIsPdfModalOpen(false)} className="p-1 hover:bg-[var(--border-subtle)] rounded text-[var(--text-muted)]">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Simulated Typst PDF Render Preview */}
            <div className="flex-1 overflow-y-auto my-4 p-8 bg-white text-slate-900 shadow-inner rounded border border-slate-300 font-serif text-sm max-w-2xl mx-auto space-y-4">
              <div className="text-center border-b pb-4">
                <div className="text-xs font-mono tracking-widest uppercase font-bold text-slate-500">The Crime & Society Review • Vol. 1, 2026</div>
                <h1 className="text-xl font-bold mt-2 text-slate-900">{article.title}</h1>
                <div className="text-xs text-slate-600 mt-2">{article.authors.map(a => a.name).join(' • ')}</div>
                <div className="text-[10px] font-mono text-slate-500 mt-1">DOI: {article.doi} • ISSN: 2998-4122</div>
              </div>
              <div className="text-xs leading-relaxed text-slate-700 bg-slate-50 p-4 border rounded">
                <div className="font-bold font-sans text-xs uppercase mb-1">Abstract</div>
                {article.abstract}
              </div>
              <div className="text-xs leading-relaxed space-y-2">
                <div className="font-bold text-sm font-sans mt-3">1. Introduction</div>
                <p>{article.sections[0]?.paragraphs[0]?.text}</p>
                <p>{article.sections[0]?.paragraphs[1]?.text}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[var(--border-subtle)] text-xs font-mono">
              <span className="text-[var(--text-muted)]">Canonical JATS-to-Typst Compilation Complete</span>
              <a
                href={`#download`}
                onClick={(e) => { e.preventDefault(); alert("Downloaded publication galley: " + article.elocationId + ".pdf"); }}
                className="px-4 py-2 rounded bg-[var(--accent-navy)] text-white font-sans font-semibold hover:opacity-90 flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" /> Download Official PDF Galley
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
