import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ShieldCheck, 
  Scale, 
  BookOpen, 
  Users, 
  FileText, 
  ExternalLink, 
  Award, 
  BookmarkCheck,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { OFFICIAL_DOCUMENT_TEXTS, MOCK_BOARD_MEMBERS, JOURNAL_METADATA } from '../data/mockJournalData';

export const AboutGovernancePages: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  // Determine section by route
  const isAimsScope = path.includes('aims-scope');
  const isPhilosophy = path.includes('editorial-philosophy');
  const isRashomon = path.includes('rashomon-approach');
  const isBoard = path.includes('editorial-board');
  const isEthics = path.includes('ethics');
  const isAbout = !isAimsScope && !isPhilosophy && !isRashomon && !isBoard && !isEthics;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* Top Banner Navigation */}
      <div className="border-b border-[var(--border-subtle)] pb-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase font-bold text-[var(--accent-gold)] flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5" /> Institutional Governance & Charters
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mt-1">
            {isAbout && "About The Crime & Society Review"}
            {isAimsScope && "Aims & Scope"}
            {isPhilosophy && "Editorial Philosophy"}
            {isRashomon && "The Rashomon Multidisciplinary Approach"}
            {isBoard && "Editorial Board & Governance Directory"}
            {isEthics && "Publication Ethics, Integrity & Retraction Protocols"}
          </h1>
        </div>

        {/* Quick Nav Links */}
        <div className="flex flex-wrap gap-1 text-xs">
          <Link
            to="/aims-scope"
            className={`px-3 py-1.5 rounded-md border transition-colors ${
              isAimsScope ? 'bg-[var(--accent-navy)] text-white font-semibold' : 'border-[var(--border-subtle)] hover:bg-[var(--bg-card-hover)] text-[var(--text-secondary)]'
            }`}
          >
            Aims & Scope
          </Link>
          <Link
            to="/editorial-philosophy"
            className={`px-3 py-1.5 rounded-md border transition-colors ${
              isPhilosophy ? 'bg-[var(--accent-navy)] text-white font-semibold' : 'border-[var(--border-subtle)] hover:bg-[var(--bg-card-hover)] text-[var(--text-secondary)]'
            }`}
          >
            Philosophy
          </Link>
          <Link
            to="/rashomon-approach"
            className={`px-3 py-1.5 rounded-md border transition-colors ${
              isRashomon ? 'bg-[var(--accent-navy)] text-white font-semibold' : 'border-[var(--border-subtle)] hover:bg-[var(--bg-card-hover)] text-[var(--text-secondary)]'
            }`}
          >
            Rashomon Approach
          </Link>
          <Link
            to="/editorial-board"
            className={`px-3 py-1.5 rounded-md border transition-colors ${
              isBoard ? 'bg-[var(--accent-navy)] text-white font-semibold' : 'border-[var(--border-subtle)] hover:bg-[var(--bg-card-hover)] text-[var(--text-secondary)]'
            }`}
          >
            Board Directory
          </Link>
          <Link
            to="/ethics"
            className={`px-3 py-1.5 rounded-md border transition-colors ${
              isEthics ? 'bg-[var(--accent-navy)] text-white font-semibold' : 'border-[var(--border-subtle)] hover:bg-[var(--bg-card-hover)] text-[var(--text-secondary)]'
            }`}
          >
            COPE Ethics
          </Link>
        </div>
      </div>

      {/* VIEW: ABOUT */}
      {isAbout && (
        <div className="max-w-4xl space-y-6 text-[var(--text-secondary)] font-serif text-base leading-relaxed">
          <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-4">
            <h2 className="font-serif font-bold text-xl text-[var(--text-primary)]">
              Journal Vision & Rolling Architecture
            </h2>
            <p>{OFFICIAL_DOCUMENT_TEXTS.about}</p>
          </div>

          <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-4 font-sans text-xs">
            <h3 className="font-serif font-bold text-base text-[var(--text-primary)]">
              Publisher Statement & Institutional Independence
            </h3>
            <p className="leading-relaxed font-serif text-sm">{OFFICIAL_DOCUMENT_TEXTS.publisher}</p>
          </div>
        </div>
      )}

      {/* VIEW: AIMS & SCOPE */}
      {isAimsScope && (
        <div className="max-w-4xl space-y-6 text-[var(--text-secondary)] font-serif text-base leading-relaxed">
          <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-4">
            <h2 className="font-serif font-bold text-xl text-[var(--text-primary)]">
              Scope of Systematic Scholarly Inquiry
            </h2>
            <p>{OFFICIAL_DOCUMENT_TEXTS.aimsAndScope}</p>
          </div>

          <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-3 font-sans text-xs">
            <h3 className="font-serif font-bold text-base text-[var(--text-primary)]">
              Welcomed Methodological Formats
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[var(--text-secondary)]">
              <div className="p-3 rounded-lg bg-[var(--bg-card-hover)] border border-[var(--border-subtle)]">
                <span className="font-bold text-[var(--text-primary)] block">Original Empirical Research</span>
                Quantitative, qualitative, and mixed-method criminological and forensic investigations.
              </div>
              <div className="p-3 rounded-lg bg-[var(--bg-card-hover)] border border-[var(--border-subtle)]">
                <span className="font-bold text-[var(--text-primary)] block">Theoretical Contributions</span>
                Conceptual frameworks analyzing crime causation, punishment philosophy, and social regulation.
              </div>
              <div className="p-3 rounded-lg bg-[var(--bg-card-hover)] border border-[var(--border-subtle)]">
                <span className="font-bold text-[var(--text-primary)] block">Methodological Innovations</span>
                Novel forensic diagnostics, machine learning validation, and crime mapping protocols.
              </div>
              <div className="p-3 rounded-lg bg-[var(--bg-card-hover)] border border-[var(--border-subtle)]">
                <span className="font-bold text-[var(--text-primary)] block">Policy & Practice Briefs</span>
                Actionable empirical translations for judiciary, police executives, and social reformers.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: EDITORIAL PHILOSOPHY */}
      {isPhilosophy && (
        <div className="max-w-4xl space-y-6 text-[var(--text-secondary)] font-serif text-base leading-relaxed">
          <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-4">
            <h2 className="font-serif font-bold text-xl text-[var(--text-primary)]">
              Principles of Rigor, Integrity, and Pluralism
            </h2>
            <p>{OFFICIAL_DOCUMENT_TEXTS.editorialPhilosophy}</p>
          </div>
        </div>
      )}

      {/* VIEW: THE RASHOMON APPROACH */}
      {isRashomon && (
        <div className="max-w-4xl space-y-6 text-[var(--text-secondary)] font-serif text-base leading-relaxed">
          <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold uppercase bg-[var(--accent-gold)] text-slate-950">
                Signature Epistemic Framework
              </span>
            </div>
            <h2 className="font-serif font-bold text-2xl text-[var(--text-primary)]">
              The Rashomon Approach to Crime, Justice, and Society
            </h2>
            <p>{OFFICIAL_DOCUMENT_TEXTS.rashomonApproach}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-xs">
            <div className="p-4 rounded-xl border border-blue-500/30 bg-blue-500/5 space-y-1">
              <span className="font-bold text-blue-700 dark:text-blue-400 block text-sm">⚖️ Legal Lens</span>
              <p className="text-[var(--text-secondary)]">Statutory violations, admissibility of evidence, Sixth Amendment confrontation, and due process thresholds.</p>
            </div>

            <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/5 space-y-1">
              <span className="font-bold text-red-700 dark:text-red-400 block text-sm">🔬 Forensic Lens</span>
              <p className="text-[var(--text-secondary)]">Chain-of-custody integrity, chemical analysis, probabilistic genotyping calibration, and error rates.</p>
            </div>

            <div className="p-4 rounded-xl border border-purple-500/30 bg-purple-500/5 space-y-1">
              <span className="font-bold text-purple-700 dark:text-purple-400 block text-sm">🧠 Psychological Lens</span>
              <p className="text-[var(--text-secondary)]">Behavioral motivation, trauma impact, eyewitness confidence calibration, and cognitive bias.</p>
            </div>

            <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 space-y-1">
              <span className="font-bold text-emerald-700 dark:text-emerald-400 block text-sm">🏛️ Sociological Lens</span>
              <p className="text-[var(--text-secondary)]">Structural harms, carceral expansion, community displacement, and institutional power dynamics.</p>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: EDITORIAL BOARD */}
      {isBoard && (
        <div className="space-y-6">
          <div className="max-w-3xl space-y-2">
            <h2 className="font-serif font-bold text-2xl text-[var(--text-primary)]">
              Editorial Leadership Directory
            </h2>
            <p className="text-xs text-[var(--text-muted)]">
              All editors maintain authenticated ORCID IDs and institutional ROR registry mappings to ensure transparency and conflict-of-interest prevention.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_BOARD_MEMBERS.map((member) => (
              <div
                key={member.id}
                className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex flex-col justify-between space-y-4 shadow-sm hover:border-[var(--accent-gold)] transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-[var(--accent-navy)]/10 text-[var(--accent-navy)]">
                      {member.role}
                    </span>
                    <a
                      href={`https://orcid.org/${member.orcid}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-600 hover:text-emerald-700 font-mono text-xs flex items-center gap-1"
                      title="Verified ORCID Profile"
                    >
                      <span>iD</span>
                      <span className="text-[10px]">{member.orcid.slice(-4)}</span>
                    </a>
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-lg text-[var(--text-primary)]">
                      {member.name}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] italic mt-0.5">
                      {member.discipline}
                    </p>
                    <p className="text-xs font-semibold text-[var(--text-secondary)] mt-1">
                      {member.affiliation}
                    </p>
                  </div>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-serif">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-3 border-t border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-muted)]">
                  <span className="text-[var(--accent-gold)] font-bold">Focus:</span> {member.editorialFocus}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW: ETHICS & RETRACTION PROTOCOLS */}
      {isEthics && (
        <div className="max-w-4xl space-y-8 text-xs font-sans text-[var(--text-secondary)] leading-relaxed">
          {/* COPE Alignment */}
          <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h2 className="font-serif font-bold text-xl text-[var(--text-primary)]">
                COPE Core Practices Compliance
              </h2>
            </div>
            <p className="text-sm font-serif">
              The Crime & Society Review strictly adheres to the core practices formulated by the <strong>Committee on Publication Ethics (COPE)</strong>. Our editorial team investigates all allegations of data falsification, image manipulation, undisclosed conflicts of interest, and redundant publication.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
              <div className="p-3 rounded-lg bg-[var(--bg-card-hover)] border border-[var(--border-subtle)]">
                <span className="font-bold text-[var(--text-primary)] block">Plagiarism & Similarity Screening</span>
                Every submission is screened via Crossref Similarity Check prior to peer assignment. An overlap score exceeding 15% triggers immediate editorial triage inquiry.
              </div>
              <div className="p-3 rounded-lg bg-[var(--bg-card-hover)] border border-[var(--border-subtle)]">
                <span className="font-bold text-[var(--text-primary)] block">Double-Blind Peer Review</span>
                Reviewer identities remain confidential from authors, and author identities are anonymized from referee manuscripts to eradicate reputational bias.
              </div>
            </div>
          </div>

          {/* Crossmark & Retraction Registry */}
          <div id="retractions" className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <h2 className="font-serif font-bold text-xl text-[var(--text-primary)]">
                Corrections, Corrigenda, and Retraction Registry
              </h2>
            </div>
            <p className="text-sm font-serif">
              Maintaining the integrity of the scholarly record requires transparent, immutable public notice when errors or misconduct occur. We follow the COPE Retraction Guidelines.
            </p>
            <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 font-mono text-xs text-emerald-800 dark:text-emerald-300">
              <span className="font-bold block">Crossmark Status: ACTIVE (Version of Record Integrity Verified)</span>
              <div>Total Corrigenda in Vol. 1 (2026): 0 notices</div>
              <div>Total Retractions in Vol. 1 (2026): 0 notices</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
