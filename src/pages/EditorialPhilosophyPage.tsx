import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, 
  ShieldCheck, 
  CheckCircle2, 
  Scale, 
  Search, 
  Sparkles, 
  BookOpen, 
  Eye, 
  ArrowRight,
  Target,
  FileCheck,
  Microscope
} from 'lucide-react';

export const EditorialPhilosophyPage: React.FC = () => {
  const PHILOSOPHY_TENETS = [
    {
      num: "01",
      title: "Intellectual Rigour",
      summary: "Unyielding theoretical discipline and analytical depth in interrogating criminal justice problems.",
      desc: "Every claim submitted to the review must withstand strict logical scrutiny. We reject superficial doctrinal surveys that simply reproduce statutory sections without probing underlying tensions, constitutional precedents, or operational hurdles."
    },
    {
      num: "02",
      title: "Methodological Integrity",
      summary: "Sound, transparent, and reproducible empirical methods across quantitative, qualitative, and forensic inquiries.",
      desc: "Whether conducting court docket audits across Indian subordinate courts, qualitative interviews in central prisons, or chromatographic evaluations of evidentiary traces, methodologies must be explained in full reproducible detail with explicit error bounds."
    },
    {
      num: "03",
      title: "Interdisciplinarity",
      summary: "Breaking institutional silos between the bench, the bar, the forensic laboratory, and the academy.",
      desc: "Crime cannot be understood through isolated compartments. The journal prioritizes scholarship that bridges statutory criminal law with forensic pathology, cognitive psychology, policing realities, and carceral sociology via the Rashomon Paradigm."
    },
    {
      num: "04",
      title: "Critical Inquiry",
      summary: "Unflinching examination of institutional power, state authority, and systemic disparities.",
      desc: "We encourage research that critically assesses state practices, law enforcement technologies (such as automated facial recognition and predictive beat tools), and structural inequalities across caste, gender, and economic marginality in the Indian justice system."
    },
    {
      num: "05",
      title: "Scholarly Openness",
      summary: "Diamond Open Access as an ethical imperative for democratic knowledge dissemination.",
      desc: "Knowledge regarding fundamental rights, trial procedures, and forensic validity must not be trapped behind corporate paywalls. The journal operates with zero reader subscription fees and zero Article Processing Charges (₹0 APC) for authors."
    },
    {
      num: "06",
      title: "Evidence & Reason",
      summary: "Grounding policy and judicial reforms in empirical proof rather than intuition or public outrage.",
      desc: "In an era of televised sensationalism, the journal insists that statutory revisions, punitive sentencing measures, and forensic evidentiary rules be anchored in verifiable data, judicial statistics, and rigorous scientific consensus."
    },
    {
      num: "07",
      title: "Transparency & Open Science",
      summary: "Complete disclosure of data sources, analytical code, peer review conflicts, and institutional affiliations.",
      desc: "Authors must disclose datasets, calibration limits, ROR institutional affiliations, and potential conflicts of interest. Referees are held to strict COPE-aligned double-blind peer review guidelines."
    },
    {
      num: "08",
      title: "Originality & Novelty",
      summary: "Substantive advancement of human knowledge rather than repetitive restatement of existing canons.",
      desc: "We evaluate whether a manuscript changes how jurists interpret a section of the BNS, how forensic scientists calibrate a biological trace, or how society conceives of restorative justice. Plagiarism threshold is strictly set below 10%."
    },
    {
      num: "09",
      title: "Relevance to Practice & Justice",
      summary: "Scholarly insight that directly informs courtrooms, investigating officers, and policy architects.",
      desc: "We reject ivory-tower abstractions that have no bearing on human reality. Articles are expected to include actionable policy and judicial matrices capable of guiding Sessions Judges, High Courts, and police training academies."
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-16 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-[var(--border-subtle)] pb-8 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-[var(--accent-gold)]">
          <Compass className="w-4 h-4" />
          <span>Institutional Manifesto • Editorial Philosophy</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[var(--text-primary)] tracking-tight">
          Editorial Philosophy &amp; Standards
        </h1>
        <p className="font-serif italic text-base sm:text-xl text-[var(--accent-gold)]">
          The Nine Scholarly Pillars Guiding Assessment, Review, and Publication
        </p>
      </div>

      {/* Core Epistemic Stance */}
      <section className="p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)]">
          Quality Beyond Disciplinary Labels
        </h2>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] font-serif leading-relaxed">
          At <em>The Crime &amp; Society Review</em>, editorial assessment is guided strictly by <strong>substantive quality, empirical originality, constitutional relevance, transparency, and scholarly contribution</strong> rather than academic titles, institutional prestige, or disciplinary orthodoxy.
        </p>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] font-serif leading-relaxed">
          A groundbreaking empirical docket audit by a doctoral researcher receives the exact same rigorous peer-review evaluation as a theoretical treatise by a retired Supreme Court judge. We judge the work solely on the strength of its evidence, legal coherence, and societal consequence.
        </p>
      </section>

      {/* The 9 Tenets Grid */}
      <section className="space-y-6">
        <div className="border-b border-[var(--border-subtle)] pb-2">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
            The Nine Pillars of Our Review Process
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
            Every manuscript undergoing double-blind peer review is appraised against these nine criteria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PHILOSOPHY_TENETS.map((tenet) => (
            <div
              key={tenet.num}
              className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--accent-gold)]/50 transition-all space-y-3 shadow-2xs flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="font-mono text-xs font-bold text-[var(--accent-gold)] block">
                  Pillar {tenet.num}
                </span>
                <h3 className="font-serif text-lg font-bold text-[var(--text-primary)]">
                  {tenet.title}
                </h3>
                <p className="text-xs font-mono text-[var(--accent-navy)] leading-snug">
                  {tenet.summary}
                </p>
                <p className="text-xs text-[var(--text-secondary)] font-serif leading-relaxed pt-1">
                  {tenet.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Editorial Screening & Decision Protocol */}
      <section className="p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
          <Scale className="w-5 h-5 text-[var(--accent-gold)]" />
          <span>Double-Blind Assessment &amp; Conflict Insulation</span>
        </h2>
        <div className="prose prose-slate dark:prose-invert max-w-none text-sm text-[var(--text-secondary)] font-serif leading-relaxed space-y-3">
          <p>
            To guarantee fairness, all manuscripts are evaluated under a strict <strong>double-blind protocol</strong>: referees do not know the identities or affiliations of the authors, and authors do not know the identities of their peer reviewers.
          </p>
          <p>
            Editors recuse themselves from decisions involving manuscripts authored by current or recent departmental colleagues, co-authors within the preceding three years, or individuals with whom they share financial or institutional ties.
          </p>
        </div>
        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--text-muted)]">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>COPE Core Practices Aligned</span>
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>UGC Academic Integrity Regulations 2018</span>
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>ICMR Ethical Guidelines for Human Inquiries</span>
          </span>
        </div>
      </section>

      {/* Author Navigation Action */}
      <section className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-serif font-bold text-base text-[var(--text-primary)]">
            Ready to align your scholarship with our editorial standards?
          </h3>
          <p className="text-xs text-[var(--text-secondary)] font-serif">
            Review the detailed submission guidelines, article types, and formatting templates.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Link
            to="/for-authors"
            className="px-4 py-2 rounded-lg bg-[var(--accent-navy)] text-white text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            Author Guidelines
          </Link>
          <Link
            to="/submit"
            className="px-4 py-2 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-card)] text-[var(--text-primary)] text-xs font-semibold hover:bg-[var(--bg-card-hover)]"
          >
            Submit Manuscript
          </Link>
        </div>
      </section>
    </div>
  );
};
