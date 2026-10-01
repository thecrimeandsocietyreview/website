import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Scale, 
  ArrowRight, 
  BookOpen, 
  Target, 
  Sparkles,
  Microscope,
  Brain,
  Landmark,
  ShieldAlert,
  HeartHandshake,
  Award,
  FileText
} from 'lucide-react';
import { JOURNAL_METADATA } from '../data/mockJournalData';
import { GlobalNetworkSection } from '../components/common/GlobalNetworkSection';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-16 pb-16 animate-fadeIn">

      {/* ========================================================
          HERO SECTION: Journal Name, Intro, Interdisciplinary Focus
      ======================================================== */}
      <section className="relative w-full overflow-hidden bg-[var(--bg-card)] border-b border-[var(--border-subtle)]">
        {/* Background Artwork */}
        <img 
          src="/hero-bg.png" 
          alt="The Crime & Society Review Scholarly Artwork" 
          className="absolute inset-0 w-full h-full object-cover object-right sm:object-center select-none"
        />
        {/* Ambient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/90 to-white/40 dark:from-slate-950/95 dark:via-slate-950/90 dark:to-slate-950/50"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 space-y-8">
          <div className="max-w-4xl lg:max-w-5xl space-y-6 text-left">
            
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

            {/* 1. Journal Name - Single Line */}
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight sm:whitespace-nowrap">
                {JOURNAL_METADATA.name}
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
          4. INTERDISCIPLINARY PILLARS HIGHLIGHT (DARK LUXURY CARD)
      ======================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-10 shadow-xl space-y-8 text-white relative overflow-hidden">
          {/* Subtle gold ambient glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6 relative z-10">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Multidisciplinary Synthesis</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Interdisciplinary Pillars: Law, Forensics &amp; Society
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-serif leading-relaxed">
                Complex criminal justice phenomena cannot be resolved through one discipline alone. We synthesize statutory criminal codes, digital forensics, constitutional safeguards, and empirical realities.
              </p>
            </div>

            <Link
              to="/aims-scope"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--accent-gold)] hover:bg-[var(--accent-gold-hover)] text-slate-950 text-xs font-bold transition-all shrink-0 shadow-md"
            >
              <span>Explore Scholarly Scope</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 6 Lenses Preview Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 relative z-10">
            {[
              {
                name: 'Legal',
                icon: Scale,
                color: 'text-amber-400',
                bg: 'bg-amber-500/15 border border-amber-500/30',
                desc: 'BNS provisions, BSA evidentiary proof, Article 21 due process'
              },
              {
                name: 'Psychological',
                icon: Brain,
                color: 'text-purple-400',
                bg: 'bg-purple-500/15 border border-purple-500/30',
                desc: 'Cognitive bias, interrogation trauma, memory reliability'
              },
              {
                name: 'Forensic',
                icon: Microscope,
                color: 'text-blue-400',
                bg: 'bg-blue-500/15 border border-blue-500/30',
                desc: 'Digital hash validation, DNA mixtures, scientific error rates'
              },
              {
                name: 'Sociological',
                icon: Landmark,
                color: 'text-emerald-400',
                bg: 'bg-emerald-500/15 border border-emerald-500/30',
                desc: 'Structural harms, undertrial pendency, carceral dynamics'
              },
              {
                name: 'Policing',
                icon: ShieldAlert,
                color: 'text-rose-400',
                bg: 'bg-rose-500/15 border border-rose-500/30',
                desc: 'Section 105 BNSS videography, frontline field constraints'
              },
              {
                name: 'Victimology',
                icon: HeartHandshake,
                color: 'text-teal-400',
                bg: 'bg-teal-500/15 border border-teal-500/30',
                desc: 'Secondary victimization, witness protection, restitution'
              },
            ].map((lens, i) => {
              const Icon = lens.icon;
              return (
                <div 
                  key={i} 
                  className="p-3.5 rounded-2xl border border-slate-800 bg-slate-900/90 hover:border-amber-400/50 hover:bg-slate-850 transition-all flex flex-col justify-between space-y-2 group shadow-sm"
                >
                  <div>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${lens.bg} ${lens.color} mb-2 group-hover:scale-105 transition-transform`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-serif font-bold text-xs sm:text-sm text-white group-hover:text-amber-400 transition-colors">
                      {lens.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-1 leading-tight font-serif">
                      {lens.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

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
              <p className="text-xs text-[var(--text-secondary)] font-serif leading-relaxed">
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
              <p className="text-xs text-[var(--text-secondary)] font-serif leading-relaxed">
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

          {/* Card 3: Manuscript Submissions (Featured Dark Card) */}
          <div className="p-6 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white hover:border-amber-400/60 transition-all flex flex-col justify-between space-y-4 shadow-md relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="space-y-2.5 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-amber-400" />
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  ₹0 APC
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                Author Guidelines &amp; Submission
              </h3>
              <p className="text-xs text-slate-300 font-serif leading-relaxed">
                Word files (.doc/.docx up to 20 MB), Garamond 12pt, APA 7th edition referencing, ₹0 APC Diamond Open Access model.
              </p>
            </div>
            <Link
              to="/submit"
              className="text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1.5 pt-2 border-t border-slate-800 relative z-10"
            >
              <span>View Guidelines &amp; Submit</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
