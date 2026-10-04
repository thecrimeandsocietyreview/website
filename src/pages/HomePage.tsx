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
import { ShaderBackground } from '@/components/ui/shader-state';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-6 sm:space-y-10 pb-12 animate-fadeIn">

      {/* ========================================================
          HERO SECTION: Container with WebGL Shader Background
      ======================================================== */}
      <div className="w-full px-3.5 sm:px-6 pt-2 sm:pt-4">
        <div className="mx-auto w-full max-w-7xl">
          <section className="relative w-full rounded-[22px] sm:rounded-[28px] overflow-hidden border border-slate-200/80 dark:border-white/10 shadow-xl bg-slate-950">
            {/* WebGL Shader Background Animation */}
            <ShaderBackground className="absolute inset-0 w-full h-full pointer-events-none" />

            {/* Hero Background Artwork - 100% Crisp & Clear, right-aligned, text safe */}
            <img 
              src="/hero-bg.png" 
              alt="The Crime &amp; Society Review Artwork" 
              className="absolute inset-y-0 right-0 w-full sm:w-4/5 lg:w-3/5 h-full object-cover object-right translate-x-[3%] sm:translate-x-[6%] lg:translate-x-[8%] select-none pointer-events-none" 
            />

            {/* Ambient Contrast Gradient ensuring Text Legibility on Left & Shader Brilliance */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-transparent pointer-events-none" />

            <div className="relative z-10 max-w-2xl px-6 sm:px-10 lg:px-12 py-16 sm:py-20 lg:py-24 space-y-7 text-left">
            
            {/* Badges */}
            <div className="flex flex-wrap items-center justify-start gap-2.5 text-xs">
              <span className="px-3 py-1 rounded-full font-mono text-[11px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center gap-1.5 shadow-2xs backdrop-blur-sm">
                <Award className="w-3.5 h-3.5 text-amber-400" /> Academic Journal
              </span>
              <span className="px-3 py-1 rounded-full font-mono text-[11px] font-semibold bg-white/10 text-slate-200 border border-white/20 flex items-center gap-1.5 shadow-2xs backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                <span>ISSN: Coming Soon</span>
              </span>
              <div className="px-3 py-1 rounded-full bg-white/95 border border-white/40 flex items-center shadow-2xs">
                <img 
                  src="/openaccess.png" 
                  alt="Open Access" 
                  className="h-7 sm:h-8 w-auto object-contain" 
                />
              </div>
            </div>

            {/* 1. Journal Name & Tagline */}
            <div className="space-y-2">
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight drop-shadow-sm">
                The Crime &amp;
                <br />
                Society Review
              </h1>
              <p className="text-xs sm:text-sm font-sans tracking-wide text-amber-200/90 font-medium">
                {JOURNAL_METADATA.tagline}
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                to="/about"
                className="px-5 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-md"
              >
                <BookOpen className="w-4 h-4 text-amber-600" />
                <span>About the Journal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/aims-scope"
                className="px-5 py-3 rounded-xl border border-white/25 hover:border-white/50 text-white font-semibold text-xs sm:text-sm transition-colors flex items-center gap-2 bg-white/10 hover:bg-white/15 backdrop-blur-md shadow-2xs"
              >
                <Target className="w-4 h-4 text-amber-400" />
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
        </section>
      </div>
    </div>

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
