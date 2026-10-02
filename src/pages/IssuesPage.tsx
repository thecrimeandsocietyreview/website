import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Calendar, 
  FileText, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { JOURNAL_METADATA } from '../data/mockJournalData';

export const IssuesPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* Page Header */}
      <div className="pb-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
            Volume 01 Issue 01 (Inaugural Issue) (Oct – Dec 2026)
          </h1>
        </div>
        <div className="text-xs font-mono text-[var(--text-muted)] bg-[var(--bg-card)] px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] flex items-center gap-2 w-fit">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          <span>Call for Papers Open</span>
        </div>
      </div>

      {/* Main Container Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Issue Cover & Meta (4 cols) */}
        <div className="lg:col-span-4 bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border-subtle)] space-y-6 shadow-xs">
          {/* Scholarly Issue Cover */}
          <div className="relative aspect-3/4 rounded-xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 p-6 text-white flex flex-col justify-between border border-amber-500/30 shadow-xl overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px] opacity-15"></div>
            
            <div className="relative z-10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="inline-block text-[10px] font-mono font-bold tracking-widest text-[var(--accent-gold)] uppercase border border-[var(--accent-gold)]/40 px-2 py-0.5 rounded-sm">
                  INAUGURAL ISSUE
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
                ISSN: Coming Soon • New Delhi
              </p>
            </div>

            <div className="relative z-10 border-t border-white/20 pt-4 space-y-1">
              <span className="text-[11px] font-mono text-[var(--accent-gold)] font-bold">
                Volume 01 — Issue 01
              </span>
              <p className="text-xs font-serif italic text-slate-200">
                "Foundational Paradigms in Criminal Law, Forensic Sciences &amp; Societal Justice"
              </p>
            </div>

            <div className="relative z-10 pt-2 flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-white/10">
              <span>Oct – Dec 2026</span>
              <span>Inaugural Issue</span>
            </div>
          </div>

          {/* Quick Issue Stats */}
          <div className="space-y-3 pt-2">
            <div className="text-xs space-y-2 text-[var(--text-secondary)] font-mono">
              <div className="flex justify-between">
                <span>Publication Period:</span>
                <strong className="text-[var(--text-primary)]">October – December 2026</strong>
              </div>
              <div className="flex justify-between">
                <span>Publication Model:</span>
                <strong className="text-[var(--text-primary)]">Continuous Rolling Volume</strong>
              </div>
              <div className="flex justify-between">
                <span>Review Model:</span>
                <strong className="text-[var(--text-primary)]">Double-Blind Peer Review</strong>
              </div>
              <div className="flex justify-between">
                <span>Article Processing Charges:</span>
                <strong className="text-emerald-600 dark:text-emerald-400">₹0 (Diamond Open Access)</strong>
              </div>
            </div>

            <Link
              to="/submit"
              className="w-full py-2.5 px-4 rounded-xl bg-[var(--accent-navy)] text-white text-xs font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-sm"
            >
              <FileText className="w-4 h-4" />
              <span>Submit Manuscript for This Issue</span>
            </Link>
          </div>
        </div>

        {/* Right Side: COMING SOON CONTAINER (8 cols - FEATURED DARK CARD) */}
        <div className="lg:col-span-8 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          
          {/* Coming Soon Spotlight */}
          <div className="space-y-3 text-center sm:text-left relative z-10">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Inaugural Issue In Preparation
            </h2>

            <p className="text-sm text-slate-300 font-serif leading-relaxed">
              The inaugural issue of <em>The Crime &amp; Society Review</em> (Volume 01, Issue 01) is scheduled for formal publication in <strong className="text-white">October – December 2026</strong>. Submissions are currently open for empirical articles, theoretical inquiries, methodological reviews, and policy perspectives across criminal law, forensics, and criminological sciences.
            </p>
          </div>

          {/* Issue Thematic Tracks in Peer Review */}
          <div className="space-y-3 pt-2 border-t border-slate-800 relative z-10">
            <h3 className="font-serif font-bold text-base text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Priority Editorial Tracks for Inaugural Issue:</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-serif">
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/90 text-slate-300 hover:border-amber-400/40 transition-colors space-y-1">
                <strong className="text-white block font-sans">1. Statutory Criminal Law Reforms</strong>
                <p className="text-slate-400 text-[11px]">
                  Doctrinal &amp; empirical evaluations under Bharatiya Nyaya Sanhita (BNS), BNSS procedure, and BSA evidentiary rules.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/90 text-slate-300 hover:border-amber-400/40 transition-colors space-y-1">
                <strong className="text-white block font-sans">2. Forensic Science &amp; Digital Hash Proof</strong>
                <p className="text-slate-400 text-[11px]">
                  Electronic evidence certification under Section 63 BSA, DNA mixture reliability, and scientific error rates.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/90 text-slate-300 hover:border-amber-400/40 transition-colors space-y-1">
                <strong className="text-white block font-sans">3. Frontline Policing &amp; Audio-Visual Records</strong>
                <p className="text-slate-400 text-[11px]">
                  Section 105 BNSS videography implementation, forensic custody chains, and law enforcement technologies.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/90 text-slate-300 hover:border-amber-400/40 transition-colors space-y-1">
                <strong className="text-white block font-sans">4. Undertrial Justice &amp; Due Process</strong>
                <p className="text-slate-400 text-[11px]">
                  Carceral sociology, undertrial pendency, Article 21 constitutional safeguards, and restorative penology models.
                </p>
              </div>
            </div>
          </div>

          {/* Submission Call to Action */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 relative z-10">
            <h4 className="font-serif font-bold text-base text-white">
              Submit Your Research for the Inaugural Issue
            </h4>
            <p className="text-xs text-slate-300 font-serif leading-relaxed">
              Manuscripts received will undergo double-blind peer review on a rolling continuous basis. Accepted papers will be assigned persistent identifiers and published immediately upon copyediting completion.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                to="/submit"
                className="px-5 py-2.5 rounded-xl bg-[var(--accent-gold)] hover:bg-[var(--accent-gold-hover)] text-slate-950 text-xs font-bold transition-all flex items-center gap-1.5 shadow-md"
              >
                <span>Submit Manuscript</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/contact"
                className="px-5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-xs font-semibold text-slate-200 hover:border-amber-400 hover:text-white transition-all"
              >
                Contact Editorial Office
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default IssuesPage;
