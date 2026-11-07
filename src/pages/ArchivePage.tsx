import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Archive as ArchiveIcon, 
  Sparkles, 
  BookOpen, 
  ArrowRight, 
  FileText, 
  Clock, 
  CheckCircle2,
  Calendar
} from 'lucide-react';

export const ArchivePage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10 animate-fadeIn">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-amber-500/10 text-[var(--accent-gold)] border border-amber-500/20">
          <ArchiveIcon className="w-3.5 h-3.5" />
          <span>Digital Repository &amp; Volumes</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight">
          Journal Archive
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-serif leading-relaxed">
          Comprehensive repository of retrospective volumes, issues, and peer-reviewed scholarly articles published by The Crime &amp; Society Review.
        </p>
      </div>

      {/* Main Coming Soon Scholarly Card */}
      <div className="relative rounded-3xl border border-[var(--border-strong)] bg-gradient-to-br from-[var(--bg-card)] via-[var(--bg-card)] to-[var(--bg-card-hover)] p-8 sm:p-14 text-center space-y-6 shadow-xl overflow-hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-5">
          {/* Animated Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent-navy)]/10 text-[var(--accent-navy)] dark:text-amber-300 border border-[var(--accent-navy)]/20 dark:border-amber-400/30 font-mono text-xs font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span>Coming Soon</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight">
            Volume &amp; Issue Archive Coming Soon
          </h2>

          <p className="text-xs sm:text-base text-[var(--text-secondary)] font-serif leading-relaxed text-justify sm:text-center">
            Our inaugural issue—<strong>Volume 01, Issue 01 (October – December 2026)</strong>—is presently accepting submissions under continuous rolling publication. Following the release of the inaugural issue, all published volumes, curated symposia, and persistent DOI records will be permanently archived here for open-access discovery and citation indexing.
          </p>

          {/* Facts / Attributes */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 text-left">
            <div className="p-3 rounded-xl bg-[var(--bg-page)] border border-[var(--border-subtle)] space-y-1">
              <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] block">Format</span>
              <span className="text-xs font-semibold font-serif text-[var(--text-primary)]">Online</span>
            </div>
            <div className="p-3 rounded-xl bg-[var(--bg-page)] border border-[var(--border-subtle)] space-y-1">
              <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] block">Frequency</span>
              <span className="text-xs font-semibold font-serif text-[var(--text-primary)]">Fortnightly</span>
            </div>
            <div className="p-3 rounded-xl bg-[var(--bg-page)] border border-[var(--border-subtle)] space-y-1">
              <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] block">Starting Year</span>
              <span className="text-xs font-semibold font-serif text-[var(--text-primary)]">2026</span>
            </div>
            <div className="p-3 rounded-xl bg-[var(--bg-page)] border border-[var(--border-subtle)] space-y-1">
              <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] block">Access Model</span>
              <span className="text-xs font-semibold font-serif text-emerald-600 dark:text-emerald-400">Diamond Open Access</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <Link
              to="/current-issue"
              className="px-5 py-2.5 rounded-xl bg-[var(--accent-navy)] text-white text-xs font-bold hover:opacity-90 transition-opacity flex items-center gap-2 shadow-sm"
            >
              <BookOpen className="w-4 h-4 text-amber-300" />
              <span>Explore Current Issue</span>
            </Link>
            <Link
              to="/submit"
              className="px-5 py-2.5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] text-[var(--text-primary)] text-xs font-semibold transition-colors flex items-center gap-2 shadow-2xs"
            >
              <FileText className="w-4 h-4 text-[var(--accent-gold)]" />
              <span>Submit Manuscript</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchivePage;

