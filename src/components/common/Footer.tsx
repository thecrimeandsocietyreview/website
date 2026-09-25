import React from 'react';
import { Link } from 'react-router-dom';
import { JOURNAL_METADATA } from '../../data/mockJournalData';
import { VisitorCounter } from './VisitorCounter';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-secondary)] text-sm transition-colors mt-20">
      {/* Main Footer Links */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Info & Visitor Metrics (Col 1-2) */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-3.5">
            <img 
              src="/logo.png" 
              alt="The Crime & Society Review Logo" 
              className="w-16 h-16 object-contain bg-transparent shrink-0" 
            />
            <div>
              <span className="font-serif font-bold text-base sm:text-lg text-[var(--text-primary)] block leading-tight">
                {JOURNAL_METADATA.name}
              </span>
              <p className="text-xs text-[var(--text-muted)] font-serif mt-1">
                {JOURNAL_METADATA.tagline}
              </p>
            </div>
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-sans pr-4">
            {JOURNAL_METADATA.subtagline}
          </p>

          {/* Visitor Counter */}
          <div className="pt-1">
            <VisitorCounter />
          </div>
        </div>

        {/* Col 3: Journal Sections */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] mb-3 font-mono">
            Journal Sections
          </h4>
          <ul className="space-y-2 text-xs font-serif">
            <li><Link to="/" className="hover:text-[var(--accent-navy)] transition-colors">1. Home</Link></li>
            <li><Link to="/submit" className="hover:text-[var(--accent-navy)] transition-colors font-semibold text-[var(--accent-gold)]">2. Submission Guidelines</Link></li>
            <li><Link to="/about" className="hover:text-[var(--accent-navy)] transition-colors">3. About the Journal</Link></li>
            <li><Link to="/editorial-board" className="hover:text-[var(--accent-navy)] transition-colors">4. Editorial Board</Link></li>
            <li><Link to="/rashomon-approach" className="hover:text-[var(--accent-navy)] transition-colors font-medium text-[var(--accent-gold)]">5. The Rashomon Approach</Link></li>
            <li><Link to="/current-issue" className="hover:text-[var(--accent-navy)] transition-colors">6. Current Issue</Link></li>
            <li><Link to="/aims-scope" className="hover:text-[var(--accent-navy)] transition-colors">7. Aims &amp; Scope</Link></li>
            <li><Link to="/contact" className="hover:text-[var(--accent-navy)] transition-colors">8. Contact Us</Link></li>
          </ul>
        </div>

        {/* Col 4: Quick Overview */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] mb-3 font-mono">
            Key Highlights
          </h4>
          <ul className="space-y-1.5 text-xs text-[var(--text-secondary)] font-serif">
            <li>• Multidisciplinary Analytical Scope</li>
            <li>• Continuous Rolling Publication</li>
            <li>• ₹0 Article Processing Charges</li>
            <li>• Double-Blind Peer Review</li>
            <li>• ISSN: Coming Soon</li>
          </ul>
        </div>

      </div>

      {/* Bottom Legal bar */}
      <div className="border-t border-[var(--border-subtle)] bg-[var(--bg-card-hover)] py-4 px-4 text-xs">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-[var(--text-muted)]">
          <div>
            © {new Date().getFullYear()} The Crime &amp; Society Review. ISSN: Coming Soon • Open Access CC BY 4.0.
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <Link to="/" className="hover:text-[var(--text-primary)]">Home</Link>
            <span>•</span>
            <Link to="/submit" className="hover:text-[var(--text-primary)]">Submission</Link>
            <span>•</span>
            <Link to="/about" className="hover:text-[var(--text-primary)]">About</Link>
            <span>•</span>
            <Link to="/editorial-board" className="hover:text-[var(--text-primary)]">Editorial Board</Link>
            <span>•</span>
            <Link to="/rashomon-approach" className="hover:text-[var(--text-primary)]">The Rashomon Approach</Link>
            <span>•</span>
            <Link to="/current-issue" className="hover:text-[var(--text-primary)]">Current Issue</Link>
            <span>•</span>
            <Link to="/aims-scope" className="hover:text-[var(--text-primary)]">Aims &amp; Scope</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-[var(--text-primary)]">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
