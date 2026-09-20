import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Compass, 
  BookOpen, 
  ArrowRight, 
  Award, 
  ShieldCheck,
  Landmark
} from 'lucide-react';
import { JOURNAL_HISTORY_TIMELINE, JOURNAL_METADATA } from '../data/mockJournalData';

export const HistoryPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-16 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-[var(--border-subtle)] pb-8 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-[var(--accent-gold)]">
          <Clock className="w-4 h-4" />
          <span>Institutional Milestones • Our Journey</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[var(--text-primary)] tracking-tight">
          History of The Crime &amp; Society Review
        </h1>
        <p className="font-serif italic text-base sm:text-xl text-[var(--accent-gold)]">
          Conception, Founding Charter, and the Evolution of an Interdisciplinary Publishing Forum
        </p>
      </div>

      {/* Historical Genesis Narrative */}
      <section className="p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)]">
          The Genesis: Responding to Statutory Transformation in India
        </h2>
        <div className="prose prose-slate dark:prose-invert max-w-none text-sm sm:text-base text-[var(--text-secondary)] font-serif leading-relaxed space-y-4">
          <p>
            The Crime &amp; Society Review was conceived during a pivotal historical juncture in Indian legal history: the legislative repeal of the colonial Indian Penal Code of 1860, the Code of Criminal Procedure of 1973, and the Indian Evidence Act of 1872, and their replacement by the <strong>Bharatiya Nyaya Sanhita, 2023 (BNS)</strong>, the <strong>Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS)</strong>, and the <strong>Bharatiya Sakshya Adhiniyam, 2023 (BSA)</strong>.
          </p>
          <p>
            As these historic statutes transformed the architecture of Indian criminal justice, legal academicians, forensic practitioners, and police administrators realized that Indian scholarship remained deeply fractured. Doctrinal legal scholars were unaware of laboratory calibration dilemmas in CFSLs; forensic examiners lacked training in constitutional Article 21 due process; and police officials operated under severe infrastructural constraints.
          </p>
          <p>
            To overcome these institutional silos, a collective of senior jurists, forensic scientists from the National Forensic Sciences University (NFSU), and legal scholars from National Law Universities founded <em>The Crime &amp; Society Review</em> as an independent, diamond open-access forum anchored in the <strong>Rashomon Approach</strong>.
          </p>
        </div>
      </section>

      {/* Timeline Journey (Conception -> Establishment -> First Publications -> Growth -> Future) */}
      <section className="space-y-8">
        <div className="border-b border-[var(--border-subtle)] pb-2">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
            Chronological Journey
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1 font-mono">
            Conception • Establishment • First Publications • Growth • Future
          </p>
        </div>

        <div className="relative border-l-2 border-[var(--accent-gold)]/30 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-12">
          {JOURNAL_HISTORY_TIMELINE.map((step, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Pin */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-[var(--bg-page)] border-2 border-[var(--accent-gold)] text-[var(--accent-gold)] flex items-center justify-center group-hover:scale-125 transition-transform shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-gold)]"></span>
              </div>

              {/* Step Content */}
              <div className="p-6 sm:p-7 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] group-hover:border-[var(--accent-gold)]/40 transition-all space-y-3 shadow-2xs">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase bg-[var(--accent-navy)]/10 text-[var(--accent-navy)]">
                    Phase {idx + 1}: {step.phase}
                  </span>
                  <span className="font-mono text-[11px] text-[var(--accent-gold)] font-bold flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {step.period}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-[var(--text-primary)]">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-serif leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Institutional Registrations & DOIs */}
      <section className="p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] space-y-4">
        <h3 className="font-serif text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
          <Landmark className="w-5 h-5 text-[var(--accent-gold)]" />
          <span>Statutory &amp; Bibliographic Registry</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
            <span className="text-[var(--text-muted)] block text-[10px] uppercase">Online ISSN</span>
            <strong className="text-[var(--text-primary)] text-sm">{JOURNAL_METADATA.issnOnline}</strong>
          </div>
          <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
            <span className="text-[var(--text-muted)] block text-[10px] uppercase">Print ISSN</span>
            <strong className="text-[var(--text-primary)] text-sm">{JOURNAL_METADATA.issnPrint}</strong>
          </div>
          <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
            <span className="text-[var(--text-muted)] block text-[10px] uppercase">DOI Prefix</span>
            <strong className="text-[var(--text-primary)] text-sm">{JOURNAL_METADATA.doiPrefix}</strong>
          </div>
          <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
            <span className="text-[var(--text-muted)] block text-[10px] uppercase">Assigning Agency</span>
            <strong className="text-[var(--text-primary)] text-sm">Crossref &amp; CSIR-NIScPR</strong>
          </div>
        </div>
      </section>

      {/* Next Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--border-subtle)]">
        <Link
          to="/about"
          className="text-xs font-semibold text-[var(--accent-navy)] hover:underline flex items-center gap-1"
        >
          <span>About the Journal Profile</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          to="/publisher"
          className="text-xs font-semibold text-[var(--accent-navy)] hover:underline flex items-center gap-1"
        >
          <span>About the Publisher</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
