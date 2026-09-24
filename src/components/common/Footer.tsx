import React from 'react';
import { Link } from 'react-router-dom';
import { JOURNAL_METADATA } from '../../data/mockJournalData';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-secondary)] text-sm transition-colors mt-20">
      {/* Main Footer Links */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Info (Col 1-2) */}
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
              <span className="text-[11px] font-mono text-[var(--accent-gold)] font-bold">
                Online ISSN {JOURNAL_METADATA.issnOnline} • Print ISSN {JOURNAL_METADATA.issnPrint}
              </span>
            </div>
          </div>
        </div>

        {/* Col 3: Journal Sections */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] mb-3 font-mono">
            Journal Sections
          </h4>
          <ul className="space-y-2 text-xs font-serif">
            <li><Link to="/" className="hover:text-[var(--accent-navy)] transition-colors">1. Home</Link></li>
            <li><Link to="/editorial-board" className="hover:text-[var(--accent-navy)] transition-colors">2. Editorial Board</Link></li>
            <li><Link to="/about" className="hover:text-[var(--accent-navy)] transition-colors">3. About the Journal</Link></li>
            <li><Link to="/aims-scope" className="hover:text-[var(--accent-navy)] transition-colors">4. Aims &amp; Scope</Link></li>
            <li><Link to="/rashomon-approach" className="hover:text-[var(--accent-navy)] transition-colors font-medium text-[var(--accent-gold)]">5. Rashomon Approach</Link></li>
            <li><Link to="/contact" className="hover:text-[var(--accent-navy)] transition-colors">6. Contact Us</Link></li>
          </ul>
        </div>

        {/* Col 4: Quick Overview */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] mb-3 font-mono">
            Key Highlights
          </h4>
          <ul className="space-y-1.5 text-xs text-[var(--text-secondary)] font-serif">
            <li>• Interdisciplinary Legal Focus</li>
            <li>• 6 Analytical Lenses</li>
            <li>• 20 Research Subject Areas</li>
            <li>• Continuous Rolling Publication</li>
            <li>• Non-Profit Publisher Infrastructure</li>
          </ul>
        </div>

      </div>

      {/* Bottom Legal bar */}
      <div className="border-t border-[var(--border-subtle)] bg-[var(--bg-card-hover)] py-4 px-4 text-xs">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-[var(--text-muted)]">
          <div>
            © {new Date().getFullYear()} The Crime &amp; Society Review. Open Access CC BY 4.0.
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="hover:text-[var(--text-primary)]">Home</Link>
            <span>•</span>
            <Link to="/editorial-board" className="hover:text-[var(--text-primary)]">Editorial Board</Link>
            <span>•</span>
            <Link to="/about" className="hover:text-[var(--text-primary)]">About</Link>
            <span>•</span>
            <Link to="/aims-scope" className="hover:text-[var(--text-primary)]">Aims &amp; Scope</Link>
            <span>•</span>
            <Link to="/rashomon-approach" className="hover:text-[var(--text-primary)]">Rashomon Approach</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-[var(--text-primary)]">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
