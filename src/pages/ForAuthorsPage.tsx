import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  CheckCircle2, 
  Download, 
  HelpCircle, 
  ShieldCheck, 
  ArrowRight, 
  Layers, 
  Clock, 
  Scale, 
  ChevronDown,
  Sparkles,
  Lock,
  BookOpen
} from 'lucide-react';
import { ACCEPTED_ARTICLE_TYPES_8 } from '../data/mockJournalData';

export const ForAuthorsPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const FAQS = [
    {
      q: "Are there any Article Processing Charges (APCs) or submission fees?",
      a: "No. The Crime & Society Review operates on a pure Diamond Open Access model funded by non-profit institutional foundations. Neither authors nor readers are charged any fee at any stage (₹0 APC)."
    },
    {
      q: "What citation and referencing style is required?",
      a: "For legal doctrinal contributions, use the standard Indian Law Institute (ILI) or Bluebook (21st ed.) style, citing Supreme Court Cases (SCC) and All India Reporter (AIR) accurately. For empirical, forensic, and psychological contributions, APA 7th edition is accepted. Always include persistent DOIs for cited literature."
    },
    {
      q: "How should the new Indian criminal laws (BNS, BNSS, BSA 2023) be cited?",
      a: "Always cite provisions by their exact statutory designations: Bharatiya Nyaya Sanhita, 2023 (Act No. 45 of 2023); Bharatiya Nagarik Suraksha Sanhita, 2023 (Act No. 46 of 2023); and Bharatiya Sakshya Adhiniyam, 2023 (Act No. 47 of 2023). When comparing with repealed colonial enactments (IPC, CrPC, IEA), provide parallel cross-reference tables."
    },
    {
      q: "What is the acceptable similarity index / plagiarism threshold?",
      a: "The journal adheres strictly to UGC Academic Integrity Regulations 2018. All submissions are screened using Turnitin and iThenticate. Submissions must exhibit an overall similarity index below 10%, excluding statutory quotations and properly attributed bibliographies."
    },
    {
      q: "How long does the double-blind peer review process take?",
      a: "Initial editorial desk screening takes 3–5 working days. The standard double-blind peer review cycle requires 14–21 calendar days. Fast-track review is available for urgent constitutional commentaries."
    },
    {
      q: "Who retains copyright to the published Version of Record?",
      a: "Authors retain full copyright under the Creative Commons Attribution 4.0 International License (CC BY 4.0). You are free to share, repository-archive (on SSRN, ResearchGate, Institutional Repositories), and adapt your work with proper credit."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-16 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-[var(--border-subtle)] pb-8 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-[var(--accent-gold)]">
          <FileText className="w-4 h-4" />
          <span>Author Hub • Submission &amp; Publishing Guide</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[var(--text-primary)] tracking-tight">
              Information for Authors
            </h1>
            <p className="font-serif italic text-base sm:text-xl text-[var(--accent-gold)] mt-1">
              Guidelines, Article Typologies, Ethics, and Diamond Open Access
            </p>
          </div>
          <Link
            to="/submit"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--accent-navy)] text-white text-xs font-bold hover:opacity-90 transition-opacity shadow-md"
          >
            <span>Submit Manuscript</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Quick Info Badges Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-1">
          <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase block">Publication Fee</span>
          <span className="font-serif font-bold text-lg text-emerald-600 dark:text-emerald-400">₹0 APC (Free)</span>
          <span className="text-[11px] text-[var(--text-secondary)] block">Diamond Open Access</span>
        </div>
        <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-1">
          <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase block">Review Standard</span>
          <span className="font-serif font-bold text-lg text-[var(--text-primary)]">Double-Blind</span>
          <span className="text-[11px] text-[var(--text-secondary)] block">Rigorous 2-3 Referees</span>
        </div>
        <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-1">
          <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase block">Decision Window</span>
          <span className="font-serif font-bold text-lg text-[var(--text-primary)]">14–21 Days</span>
          <span className="text-[11px] text-[var(--text-secondary)] block">Rapid Turnaround</span>
        </div>
        <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-1">
          <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase block">Licensing</span>
          <span className="font-serif font-bold text-lg text-[var(--text-primary)]">CC BY 4.0</span>
          <span className="text-[11px] text-[var(--text-secondary)] block">Author Retains Copyright</span>
        </div>
      </div>

      {/* 1. Accepted Article Types (8 Distinct Categories) */}
      <section className="space-y-6">
        <div className="border-b border-[var(--border-subtle)] pb-2">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
            1. Accepted Article Types &amp; Word Limits
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 font-serif">
            Derived directly from the journal’s interdisciplinary charter. Word counts exclude abstract, footnotes, references, and tables.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ACCEPTED_ARTICLE_TYPES_8.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-2 hover:border-[var(--accent-gold)]/40 transition-colors shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-base text-[var(--text-primary)]">
                  {item.type}
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[var(--accent-navy)]/10 text-[var(--accent-navy)]">
                  {item.wordCount}
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] font-serif leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Formatting & Manuscript Guidelines */}
      <section className="p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-6">
        <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)]">
          2. Manuscript Preparation &amp; Formatting Guidelines
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm font-serif text-[var(--text-secondary)]">
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-[var(--text-primary)] font-mono uppercase">
              Typography &amp; Layout
            </h3>
            <ul className="space-y-2 list-disc list-inside">
              <li>Document format: Microsoft Word (.docx) or LaTeX (.tex / .pdf).</li>
              <li>Font: Times New Roman or Georgia, 12pt font, 1.5 line spacing.</li>
              <li>Margins: Standard 1-inch (2.54 cm) margins on all sides.</li>
              <li>Continuous line numbering and page numbers must be enabled for review.</li>
              <li>Include structured abstract of 200–300 words and 5–8 indexed keywords.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-sm text-[var(--text-primary)] font-mono uppercase">
              Anonymization for Double-Blind Review
            </h3>
            <ul className="space-y-2 list-disc list-inside">
              <li>Do NOT include author names, affiliations, or email IDs in main manuscript.</li>
              <li>Submit a separate <strong>Title Page File</strong> containing full author details, ORCID IDs, and CRediT roles.</li>
              <li>Replace direct self-references (e.g., "In our previous study...") with anonymous third-person phrasing.</li>
              <li>Ensure document file metadata / author properties are stripped.</li>
            </ul>
          </div>
        </div>

        <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-wrap items-center gap-3">
          <a
            href="#download-template"
            onClick={(e) => {
              e.preventDefault();
              alert("Downloading The Crime & Society Review Official Manuscript Template (.docx).");
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--accent-navy)] text-white text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Manuscript Template (.docx)</span>
          </a>
          <Link
            to="/aims-scope"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-card)] text-[var(--text-primary)] text-xs font-semibold hover:bg-[var(--bg-card-hover)]"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Review Full Aims &amp; Scope</span>
          </Link>
        </div>
      </section>

      {/* 3. The 7-Step Publishing Lifecycle */}
      <section className="space-y-6">
        <div className="border-b border-[var(--border-subtle)] pb-2">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
            3. Submission to Publication Workflow
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-serif mt-1">
            Our systematic 7-stage editorial lifecycle designed for scholarly speed and uncompromising rigour.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
          {[
            { step: "1", label: "Prepare", sub: "Format against style sheet & anonymize" },
            { step: "2", label: "Check Reqs", sub: "Plagiarism <10% & ICMR/ethics check" },
            { step: "3", label: "Submit", sub: "Upload manuscript & title page via portal" },
            { step: "4", label: "Screening", sub: "Editor-in-Chief triage (3–5 days)" },
            { step: "5", label: "Peer Review", sub: "Double-blind evaluation by 2–3 referees" },
            { step: "6", label: "Revision", sub: "Author revisions & response matrix" },
            { step: "7", label: "Publication", sub: "Immediate Version of Record & Crossref DOI" },
          ].map((s) => (
            <div
              key={s.step}
              className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-1.5 text-center"
            >
              <span className="w-6 h-6 rounded-full bg-[var(--accent-gold)] text-slate-950 font-bold text-xs flex items-center justify-center mx-auto">
                {s.step}
              </span>
              <span className="font-serif font-bold text-sm text-[var(--text-primary)] block">
                {s.label}
              </span>
              <p className="text-[10px] text-[var(--text-muted)] leading-tight">
                {s.sub}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Ethics, Plagiarism & Copyright */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-[var(--text-primary)]">
            Ethics &amp; Malpractice
          </h3>
          <p className="text-xs text-[var(--text-secondary)] font-serif leading-relaxed">
            Full compliance with COPE Core Practices. Strict zero-tolerance for data fabrication, falsification, uncredited authorship, or dual submission.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
            <Scale className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-[var(--text-primary)]">
            Plagiarism (&lt;10%)
          </h3>
          <p className="text-xs text-[var(--text-secondary)] font-serif leading-relaxed">
            Every submission is screened through Turnitin and iThenticate prior to peer review. Submissions exceeding 10% similarity are returned immediately.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-[var(--text-primary)]">
            CC BY 4.0 Copyright
          </h3>
          <p className="text-xs text-[var(--text-secondary)] font-serif leading-relaxed">
            Authors retain full copyright. The Creative Commons Attribution 4.0 International license permits anyone to read, quote, and build upon your research.
          </p>
        </div>
      </section>

      {/* 5. Frequently Asked Questions (Accordion) */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[var(--accent-gold)]" />
          <span>Frequently Asked Questions for Authors</span>
        </h2>

        <div className="space-y-2">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 cursor-pointer hover:bg-[var(--bg-card-hover)] transition-colors"
                >
                  <span className="font-serif font-bold text-sm sm:text-base text-[var(--text-primary)]">
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-[var(--text-muted)] transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-[var(--text-secondary)] font-serif leading-relaxed border-t border-[var(--border-subtle)]/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Direct CTA */}
      <section className="p-8 rounded-3xl bg-[var(--accent-navy)] text-white text-center space-y-4 shadow-xl">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold">
          Submit Your Manuscript to The Crime &amp; Society Review
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 font-serif max-w-xl mx-auto">
          Take part in shaping constitutional jurisprudence, empirical forensic science, and police modernization across India.
        </p>
        <div className="pt-2">
          <Link
            to="/submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--accent-gold)] text-slate-950 text-xs font-bold hover:brightness-110 transition-all shadow-md"
          >
            <span>Proceed to Submission Portal</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};
