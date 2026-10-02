import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  BookOpen, 
  Target, 
  Award, 
  FileText
} from 'lucide-react';
import { JOURNAL_METADATA } from '../data/mockJournalData';
import { GlobalNetworkSection } from '../components/common/GlobalNetworkSection';
import Feature from '@/components/ui/block-feature';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-6 sm:space-y-10 pb-12 animate-fadeIn">

      {/* ========================================================
          HERO SECTION: Journal Name, Intro, Interdisciplinary Focus
      ======================================================== */}
      <section className="relative w-full overflow-hidden bg-[var(--bg-card)]">
        {/* Background Artwork - Shifted right and fully visible */}
        <img 
          src="/hero-bg.png" 
          alt="The Crime & Society Review Scholarly Artwork" 
          className="absolute inset-y-0 right-0 w-full h-full object-cover object-right translate-x-[5%] sm:translate-x-[8%] lg:translate-x-[12%] select-none pointer-events-none"
        />
        {/* Ambient Overlay - Solid white on left for text legibility, transparent on right for full image visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent dark:from-slate-950 dark:via-slate-950/85 dark:to-transparent pointer-events-none"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 space-y-7">
          <div className="max-w-xl sm:max-w-2xl space-y-6 text-left">
            
            {/* Badges */}
            <div className="flex flex-wrap items-center justify-start gap-2.5 text-xs">
              <span className="px-3 py-1 rounded-full font-mono text-[11px] font-bold bg-amber-500/15 text-amber-900 dark:text-[var(--accent-gold)] border border-amber-500/30 flex items-center gap-1.5 shadow-2xs">
                <Award className="w-3.5 h-3.5 text-amber-600 dark:text-[var(--accent-gold)]" /> Academic Journal
              </span>
              <span className="px-3 py-1 rounded-full font-mono text-[11px] font-semibold bg-amber-500/20 text-amber-900 dark:text-amber-300 border border-amber-500/40 flex items-center gap-1.5 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                <span>ISSN: Coming Soon</span>
              </span>
              <div className="px-3 py-1 rounded-full bg-white/95 dark:bg-slate-900/90 border border-orange-500/30 flex items-center shadow-2xs">
                <img 
                  src="/openaccess.png" 
                  alt="Open Access" 
                  className="h-7 sm:h-8 w-auto object-contain dark:bg-white dark:px-2 dark:py-1 dark:rounded-md" 
                />
              </div>
            </div>

            {/* 1. Journal Name */}
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
                The Crime &amp;
                <br />
                Society Review
              </h1>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                to="/about"
                className="px-5 py-3 rounded-xl bg-[var(--accent-navy)] text-white font-semibold text-xs sm:text-sm hover:opacity-90 transition-all flex items-center gap-2 shadow-sm"
              >
                <BookOpen className="w-4 h-4" />
                <span>About the Journal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/aims-scope"
                className="px-5 py-3 rounded-xl border border-slate-300 dark:border-[var(--border-subtle)] hover:border-[var(--accent-navy)] text-slate-900 dark:text-[var(--text-primary)] font-semibold text-xs sm:text-sm transition-colors flex items-center gap-2 bg-white/90 dark:bg-slate-900/90 shadow-2xs"
              >
                <Target className="w-4 h-4 text-[var(--accent-gold)]" />
                <span>Aims &amp; Scope</span>
              </Link>
              <Link
                to="/submit"
                className="px-5 py-3 rounded-xl bg-[var(--accent-gold)] hover:bg-[var(--accent-gold-hover)] text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>Submit Manuscript</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          INTERDISCIPLINARY PILLARS (ANIMATED FEATURE)
      ======================================================== */}
      <Feature />

      {/* ========================================================
          FAST ACCESS TO CORE JOURNAL SECTIONS
      ======================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: About */}
          <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--accent-gold)] transition-colors flex flex-col justify-between space-y-4 shadow-2xs">
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-navy)]/10 text-[var(--accent-navy)] flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-[var(--accent-gold)]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[var(--text-primary)]">
                About the Journal
              </h3>
              <p className="text-xs text-[var(--text-secondary)] font-serif leading-relaxed text-justify">
                Discover the institutional profile, mission, editorial philosophy, historical founding journey, and publisher governance of The Crime &amp; Society Review.
              </p>
            </div>
            <Link
              to="/about"
              className="text-xs font-semibold text-[var(--accent-navy)] hover:text-[var(--accent-gold)] transition-colors flex items-center gap-1.5 pt-2 border-t border-[var(--border-subtle)]"
            >
              <span>Read Journal Profile</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 2: Aims & Scope */}
          <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--accent-gold)] transition-colors flex flex-col justify-between space-y-4 shadow-2xs">
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-navy)]/10 text-[var(--accent-navy)] flex items-center justify-center">
                <Target className="w-5 h-5 text-[var(--accent-gold)]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[var(--text-primary)]">
                Aims &amp; Scope
              </h3>
              <p className="text-xs text-[var(--text-secondary)] font-serif leading-relaxed text-justify">
                Explore the journal's mandate, 20 research subject areas, interdisciplinary disciplines covered, and accepted formats of scholarly contributions.
              </p>
            </div>
            <Link
              to="/aims-scope"
              className="text-xs font-semibold text-[var(--accent-navy)] hover:text-[var(--accent-gold)] transition-colors flex items-center gap-1.5 pt-2 border-t border-[var(--border-subtle)]"
            >
              <span>Explore Research Scope</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 3: Manuscript Submissions (Author Guidelines & Submission) */}
          <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--accent-gold)] transition-colors flex flex-col justify-between space-y-4 shadow-2xs">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent-navy)]/10 text-[var(--accent-navy)] flex items-center justify-center">
                  <FileText className="w-5 h-5 text-[var(--accent-gold)]" />
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                  ₹0 APC
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-[var(--text-primary)]">
                Author Guidelines &amp; Submission
              </h3>
              <p className="text-xs text-[var(--text-secondary)] font-serif leading-relaxed text-justify">
                Word files (.doc/.docx up to 20 MB), Garamond 12pt, APA 7th edition referencing, ₹0 APC Diamond Open Access model.
              </p>
            </div>
            <Link
              to="/submit"
              className="text-xs font-semibold text-[var(--accent-navy)] hover:text-[var(--accent-gold)] transition-colors flex items-center gap-1.5 pt-2 border-t border-[var(--border-subtle)]"
            >
              <span>View Guidelines &amp; Submit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* ========================================================
          GLOBAL EDGE NETWORK / INTERACTIVE GLOBE SECTION
      ======================================================== */}
      <GlobalNetworkSection />

    </div>
  );
};

export default HomePage;
