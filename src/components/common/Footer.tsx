import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Scale, Globe, BookOpen, Target } from 'lucide-react';
import { JOURNAL_METADATA, PUBLISHER_PROFILE } from '../../data/mockJournalData';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-secondary)] text-sm transition-colors mt-20">
      {/* Top Academic Standards Banner */}
      <div className="border-b border-[var(--border-subtle)] bg-[var(--bg-card-hover)] py-6 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded bg-[var(--accent-navy)]/10 text-[var(--accent-navy)] shrink-0">
              <ShieldCheck className="w-5 h-5 text-[var(--accent-gold)]" />
            </div>
            <div>
              <span className="font-semibold text-[var(--text-primary)] block">COPE &amp; ICMR Ethics</span>
              <p className="text-[var(--text-muted)] mt-0.5">
                Full compliance with Committee on Publication Ethics (COPE) Core Practices and ICMR ethical guidelines.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <span className="font-semibold text-[var(--text-primary)] block">Diamond Open Access</span>
              <p className="text-[var(--text-muted)] mt-0.5">
                100% free for scholars, advocates, judges, and students with zero Article Processing Charges (₹0 APC).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] shrink-0">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <span className="font-semibold text-[var(--text-primary)] block">The Rashomon Approach</span>
              <p className="text-[var(--text-muted)] mt-0.5">
                Interdisciplinary triangulation: Legal, Forensic, Psychological, Sociological, Policing, and Victimological.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand & Publisher Info (Col 1-2) */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-3.5">
            <img 
              src="/logo.png" 
              alt="The Crime & Society Review Logo" 
              className="w-12 h-12 rounded-xl object-contain bg-white shadow-xs border border-[var(--border-strong)] p-1 shrink-0" 
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
          <p className="text-xs text-[var(--text-muted)] leading-relaxed max-w-md">
            An interdisciplinary Indian scholarly publication dedicated to advancing critical, evidence-informed, and multi-perspective scholarship on the Bharatiya Nyaya Sanhita (BNS), BNSS, BSA, forensics, policing, and societal justice.
          </p>
          <div className="font-mono text-xs text-[var(--text-muted)] space-y-1">
            <div><span className="text-[var(--text-primary)] font-semibold">Publisher:</span> {PUBLISHER_PROFILE.name}</div>
            <div><span className="text-[var(--text-primary)] font-semibold">Licensing:</span> Creative Commons Attribution 4.0 (CC BY 4.0)</div>
          </div>
        </div>

        {/* Col 3: Journal Sections */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] mb-3 font-mono">
            Journal Sections
          </h4>
          <ul className="space-y-2 text-xs font-serif">
            <li><Link to="/" className="hover:text-[var(--accent-navy)] transition-colors">1. Home</Link></li>
            <li><Link to="/about" className="hover:text-[var(--accent-navy)] transition-colors">2. About the Journal</Link></li>
            <li><Link to="/aims-scope" className="hover:text-[var(--accent-navy)] transition-colors">3. Aims &amp; Scope</Link></li>
            <li><Link to="/rashomon-approach" className="hover:text-[var(--accent-navy)] transition-colors font-medium text-[var(--accent-gold)]">4. Rashomon Approach</Link></li>
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
            <Link to="/about" className="hover:text-[var(--text-primary)]">About</Link>
            <span>•</span>
            <Link to="/aims-scope" className="hover:text-[var(--text-primary)]">Aims &amp; Scope</Link>
            <span>•</span>
            <Link to="/rashomon-approach" className="hover:text-[var(--text-primary)]">Rashomon Approach</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
