import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';
import { JOURNAL_METADATA } from '../../data/mockJournalData';
import { VisitorCounter } from './VisitorCounter';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-secondary)] text-sm transition-colors mt-12 sm:mt-14 relative">
      {/* Subtle Top Gold Accent Line */}
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[var(--accent-gold)] to-transparent opacity-30" />

      {/* Main Footer Container (Reduced height & compact spacing) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-7 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Column 1: Brand, Identity & Interactive Controls (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <img 
                src="/logo.png" 
                alt="The Crime & Society Review Logo" 
                className="w-12 h-12 object-contain shrink-0" 
              />
              <div>
                <span className="font-serif font-bold text-lg text-[var(--text-primary)] block leading-snug">
                  {JOURNAL_METADATA.name}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-serif leading-relaxed max-w-md">
              An interdisciplinary scholarly platform advancing rigorous inquiry across criminal jurisprudence, forensic sciences, policing, and societal justice.
            </p>

            {/* Social Media Channels */}
            <div className="pt-1 space-y-1.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] block font-semibold">
                Official Channels
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {/* LinkedIn Button */}
                <a 
                  href="https://www.linkedin.com/company/146605282/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="The Crime & Society Review LinkedIn Profile"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] hover:border-[#0A66C2] hover:text-[#0A66C2] hover:shadow-2xs transition-all text-xs font-mono text-[var(--text-secondary)] group"
                >
                  <svg className="w-3.5 h-3.5 fill-current text-[#0A66C2] group-hover:scale-110 transition-transform" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.62 1.62 0 1 0 0-3.24 1.62 1.62 0 0 0 0 3.24M7.86 18.5V10.13H5.07V18.5h2.79Z"/>
                  </svg>
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                </a>

                {/* X (formerly Twitter) */}
                <a 
                  href="https://x.com/the_csrjournal" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="The Crime & Society Review X Profile"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] hover:border-[var(--text-primary)] hover:text-[var(--text-primary)] hover:shadow-2xs transition-all text-xs font-mono text-[var(--text-secondary)] group"
                >
                  <svg className="w-3.5 h-3.5 fill-current text-[var(--text-primary)] group-hover:scale-110 transition-transform" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span>X (Twitter)</span>
                  <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                </a>

                {/* Instagram */}
                <a 
                  href="https://www.instagram.com/the_csrjournal?stkn=MTY0bGEwdHBhM3I5YQ==" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="The Crime & Society Review Instagram Profile"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] hover:border-[#E1306C] hover:text-[#E1306C] hover:shadow-2xs transition-all text-xs font-mono text-[var(--text-secondary)] group"
                >
                  <svg className="w-3.5 h-3.5 fill-current text-[#E1306C] group-hover:scale-110 transition-transform" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>Instagram</span>
                  <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                </a>
              </div>
            </div>

            {/* Visitor Counter */}
            <div className="pt-0.5">
              <VisitorCounter />
            </div>
          </div>

          {/* Column 2: Journal Directory (4 cols) */}
          <div className="lg:col-span-4 space-y-2.5">
            <div className="flex items-center gap-2 border-b border-[var(--border-subtle)] pb-2">
              <Compass className="w-4 h-4 text-[var(--accent-gold)]" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] font-mono">
                Journal Directory
              </h4>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs font-serif">
              <Link to="/" className="text-[var(--text-secondary)] hover:text-[var(--accent-navy)] hover:translate-x-0.5 transition-all flex items-center gap-1.5">
                <span className="text-[var(--accent-gold)] text-[11px]">›</span> Home
              </Link>
              <Link to="/about" className="text-[var(--text-secondary)] hover:text-[var(--accent-navy)] hover:translate-x-0.5 transition-all flex items-center gap-1.5">
                <span className="text-[var(--accent-gold)] text-[11px]">›</span> About Journal
              </Link>
              <Link to="/aims-scope" className="text-[var(--text-secondary)] hover:text-[var(--accent-navy)] hover:translate-x-0.5 transition-all flex items-center gap-1.5">
                <span className="text-[var(--accent-gold)] text-[11px]">›</span> Aim &amp; Scope
              </Link>
              <Link to="/editorial-board" className="text-[var(--text-secondary)] hover:text-[var(--accent-navy)] hover:translate-x-0.5 transition-all flex items-center gap-1.5">
                <span className="text-[var(--accent-gold)] text-[11px]">›</span> Editorial Board
              </Link>
              <Link to="/advisory-board" className="text-[var(--text-secondary)] hover:text-[var(--accent-navy)] hover:translate-x-0.5 transition-all flex items-center gap-1.5">
                <span className="text-[var(--accent-gold)] text-[11px]">›</span> Advisory Board
              </Link>
              <Link to="/rashomon-approach" className="text-[var(--text-secondary)] hover:text-[var(--accent-navy)] hover:translate-x-0.5 transition-all flex items-center gap-1.5">
                <span className="text-[var(--accent-gold)] text-[11px]">›</span> Rashomon Lens
              </Link>
              <Link to="/current-issue" className="text-[var(--text-secondary)] hover:text-[var(--accent-navy)] hover:translate-x-0.5 transition-all flex items-center gap-1.5">
                <span className="text-[var(--accent-gold)] text-[11px]">›</span> Current Issue
              </Link>
              <Link to="/submit" className="text-[var(--text-secondary)] hover:text-[var(--accent-navy)] hover:translate-x-0.5 transition-all flex items-center gap-1.5 font-medium text-[var(--accent-navy)]">
                <span className="text-[var(--accent-gold)] text-[11px]">›</span> Submission
              </Link>
              <Link to="/track" className="text-[var(--text-secondary)] hover:text-[var(--accent-navy)] hover:translate-x-0.5 transition-all flex items-center gap-1.5 font-medium text-[var(--accent-gold)]">
                <span className="text-[var(--accent-gold)] text-[11px]">›</span> Track Manuscript
              </Link>
              <Link to="/contact" className="text-[var(--text-secondary)] hover:text-[var(--accent-navy)] hover:translate-x-0.5 transition-all flex items-center gap-1.5 col-span-2">
                <span className="text-[var(--accent-gold)] text-[11px]">›</span> Contact &amp; Inquiries
              </Link>
            </div>
          </div>

          {/* Column 3: Standards & Highlights (3 cols) */}
          <div className="lg:col-span-3 space-y-2.5">
            <div className="flex items-center gap-2 border-b border-[var(--border-subtle)] pb-2">
              <ShieldCheck className="w-4 h-4 text-[var(--accent-gold)]" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] font-mono">
                Scholarly Standards
              </h4>
            </div>

            <ul className="space-y-1.5 text-xs font-serif">
              <li className="flex items-center gap-2 text-[var(--text-secondary)]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Double-Blind Peer Review</span>
              </li>
              <li className="flex items-center gap-2 text-[var(--text-secondary)]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Zero APC (₹0 Author Fees)</span>
              </li>
              <li className="flex items-center gap-2 text-[var(--text-secondary)]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Continuous Publication Model</span>
              </li>
              <li className="flex items-center gap-2 text-[var(--text-secondary)] pt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] shrink-0 ml-1 mr-1" />
                <span>Google Scholar: <span className="font-mono text-[10px] text-[var(--accent-gold)] font-medium">Coming Soon</span></span>
              </li>
              <li className="flex items-center gap-2 text-[var(--text-secondary)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] shrink-0 ml-1 mr-1" />
                <span>ISSN: <span className="font-mono text-[10px] text-[var(--accent-gold)] font-medium">Coming Soon</span></span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Legal bar (Compact) */}
      <div className="border-t border-[var(--border-subtle)] bg-[var(--bg-page)]/80 py-3 px-4 text-xs">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 text-center sm:text-left font-mono text-[11px] text-[var(--text-muted)]">
          <div>
            © {new Date().getFullYear()} The Crime &amp; Society Review. All rights reserved.
          </div>
          <div className="flex items-center gap-2 text-[11px]">
            <span>Continuous Rolling Scholarly Publication</span>
            <span>•</span>
            <span className="text-[var(--accent-gold)]">ISSN: Coming Soon</span>
            <span>•</span>
            <Link to="/admin" className="text-[var(--text-muted)] hover:text-[var(--accent-gold)] transition-colors">
              Editorial Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
