import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Scale, ExternalLink, BookmarkCheck, Globe, Award, FileText, Mail } from 'lucide-react';
import { JOURNAL_METADATA, PUBLISHER_PROFILE, CONTACT_DETAILS } from '../../data/mockJournalData';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-secondary)] text-sm transition-colors mt-20">
      {/* Top Academic Standards Banner */}
      <div className="border-b border-[var(--border-subtle)] bg-[var(--bg-card-hover)] py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 text-xs">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded bg-[var(--accent-navy)]/10 text-[var(--accent-navy)] shrink-0">
              <ShieldCheck className="w-5 h-5 text-[var(--accent-gold)]" />
            </div>
            <div>
              <span className="font-semibold text-[var(--text-primary)] block">COPE &amp; ICMR Ethics</span>
              <p className="text-[var(--text-muted)] mt-0.5">
                Full compliance with COPE Core Practices and Indian Council of Medical Research (ICMR) ethical guidelines.
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

          <div className="flex items-start gap-3">
            <div className="p-2 rounded bg-[var(--accent-crimson)]/10 text-[var(--accent-crimson)] shrink-0">
              <BookmarkCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-semibold text-[var(--text-primary)] block">UGC-CARE &amp; ICI Aligned</span>
              <p className="text-[var(--text-muted)] mt-0.5">
                Structured for academic career advancement (CAS) and doctoral research validation across Indian universities.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-5 gap-8">
        
        {/* Brand & Publisher Info (Col 1-2) */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-3.5">
            <img 
              src="/logo.png" 
              alt="The Crime & Society Review Logo" 
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-contain bg-white shadow-xs border border-[var(--border-strong)] p-1 shrink-0" 
            />
            <div>
              <span className="font-serif font-bold text-lg text-[var(--text-primary)] block leading-tight">
                The Crime &amp; Society Review
              </span>
              <span className="text-[11px] font-mono text-[var(--accent-gold)] font-bold">
                ISSN {JOURNAL_METADATA.issnOnline}
              </span>
            </div>
          </div>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed max-w-md">
            An interdisciplinary Indian scholarly rolling publication dedicated to advancing critical, evidence-informed, and multi-perspective scholarship on the Bharatiya Nyaya Sanhita (BNS), BNSS, BSA, forensics, policing, and societal justice.
          </p>
          <div className="font-mono text-xs text-[var(--text-muted)] space-y-1 break-words">
            <div><span className="text-[var(--text-primary)] font-semibold">Online ISSN:</span> {JOURNAL_METADATA.issnOnline} (CSIR-NIScPR New Delhi)</div>
            <div><span className="text-[var(--text-primary)] font-semibold">Print ISSN:</span> {JOURNAL_METADATA.issnPrint}</div>
            <div><span className="text-[var(--text-primary)] font-semibold">Publisher:</span> {PUBLISHER_PROFILE.name}</div>
            <div><span className="text-[var(--text-primary)] font-semibold">Crossref DOI:</span> {JOURNAL_METADATA.doiPrefix}</div>
            <div><span className="text-[var(--text-primary)] font-semibold">Licensing:</span> Creative Commons Attribution 4.0 (CC BY 4.0)</div>
          </div>
        </div>

        {/* Col 3: Institutional & About */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] mb-3 font-mono">
            About the Journal
          </h4>
          <ul className="space-y-2 text-xs font-serif">
            <li><Link to="/about" className="hover:text-[var(--accent-navy)] transition-colors">About Journal</Link></li>
            <li><Link to="/aims-scope" className="hover:text-[var(--accent-navy)] transition-colors">Aims &amp; Scope (20 Disciplines)</Link></li>
            <li><Link to="/editorial-philosophy" className="hover:text-[var(--accent-navy)] transition-colors">Editorial Philosophy</Link></li>
            <li><Link to="/rashomon-approach" className="hover:text-[var(--accent-navy)] transition-colors font-medium text-[var(--accent-gold)]">Rashomon Approach</Link></li>
            <li><Link to="/editorial-board" className="hover:text-[var(--accent-navy)] transition-colors">Editorial Board Directory</Link></li>
            <li><Link to="/history" className="hover:text-[var(--accent-navy)] transition-colors">Journal History &amp; Journey</Link></li>
            <li><Link to="/publisher" className="hover:text-[var(--accent-navy)] transition-colors">About the Publisher</Link></li>
          </ul>
        </div>

        {/* Col 4: Publications & Discovery */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] mb-3 font-mono">
            Publications &amp; Research
          </h4>
          <ul className="space-y-2 text-xs font-serif">
            <li><Link to="/articles" className="hover:text-[var(--accent-navy)] transition-colors">Articles &amp; Repository</Link></li>
            <li><Link to="/issues" className="hover:text-[var(--accent-navy)] transition-colors">Issues &amp; Archive</Link></li>
            <li><Link to="/explore" className="hover:text-[var(--accent-navy)] transition-colors">Research Discovery Engine</Link></li>
            <li><Link to="/articles?discipline=legal" className="hover:text-[var(--accent-navy)] transition-colors">Law &amp; Jurisprudence</Link></li>
            <li><Link to="/articles?discipline=forensic" className="hover:text-[var(--accent-navy)] transition-colors">Forensic Science</Link></li>
            <li><Link to="/articles?discipline=policing" className="hover:text-[var(--accent-navy)] transition-colors">Policing &amp; Enforcement</Link></li>
          </ul>
        </div>

        {/* Col 5: Authors, Reviewers & Contact */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] mb-3 font-mono">
            Scholarly Services
          </h4>
          <ul className="space-y-2 text-xs font-serif">
            <li><Link to="/submit" className="hover:text-[var(--accent-navy)] transition-colors font-semibold text-[var(--accent-gold)]">Submit Manuscript</Link></li>
            <li><Link to="/for-authors" className="hover:text-[var(--accent-navy)] transition-colors">Author Guidelines &amp; ₹0 APC</Link></li>
            <li><Link to="/for-reviewers" className="hover:text-[var(--accent-navy)] transition-colors">Become a Reviewer</Link></li>
            <li><Link to="/contact" className="hover:text-[var(--accent-navy)] transition-colors">Contact Editorial Chambers</Link></li>
            <li><a href={`mailto:${CONTACT_DETAILS.submissions.email}`} className="hover:text-[var(--accent-navy)] transition-colors font-mono text-[11px] block pt-1 text-[var(--text-muted)] break-all">{CONTACT_DETAILS.submissions.email}</a></li>
          </ul>
        </div>

      </div>

      {/* Bottom Legal bar */}
      <div className="border-t border-[var(--border-subtle)] bg-[var(--bg-card-hover)] py-4 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-[var(--text-muted)]">
          <div>
            © {new Date().getFullYear()} The Crime &amp; Society Review. All articles published under Open Access Creative Commons Attribution 4.0 International License (CC BY 4.0).
          </div>
          <div className="flex items-center gap-4">
            <Link to="/contact" className="hover:text-[var(--text-primary)]">Editorial Office</Link>
            <span>•</span>
            <Link to="/publisher" className="hover:text-[var(--text-primary)]">The CSR Press</Link>
            <span>•</span>
            <Link to="/aims-scope" className="hover:text-[var(--text-primary)]">Aims &amp; Scope</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
