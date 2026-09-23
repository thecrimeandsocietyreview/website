import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Target, 
  Layers, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Search,
  BookOpen,
  Scale
} from 'lucide-react';
import { SCOPE_CATEGORIES_20, ACCEPTED_ARTICLE_TYPES_8 } from '../data/mockJournalData';

export const AimsScopePage: React.FC = () => {
  const [filterQuery, setFilterQuery] = useState('');

  const filteredCategories = SCOPE_CATEGORIES_20.filter(cat =>
    cat.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    cat.desc.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-16 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-[var(--border-subtle)] pb-8 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-[var(--accent-gold)]">
          <Target className="w-4 h-4" />
          <span>Mandate &amp; Research Parameters</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[var(--text-primary)] tracking-tight">
          Aims &amp; Scope
        </h1>
        <p className="font-serif italic text-base sm:text-xl text-[var(--accent-gold)]">
          The Comprehensive Scholarly Domain of The Crime &amp; Society Review
        </p>
      </div>

      {/* 1. JOURNAL KA PURPOSE (JOURNAL PURPOSE) */}
      <section className="p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-[var(--accent-gold)]">
          <Target className="w-4 h-4" /> Section 1
        </div>
        <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)]">
          1. Journal Purpose
        </h2>
        <div className="prose prose-slate dark:prose-invert max-w-none text-sm sm:text-base text-[var(--text-secondary)] font-serif leading-relaxed space-y-3">
          <p>
            <strong>The Crime &amp; Society Review</strong> is committed to advancing the systematic, critical, and evidence-informed study of crime, policing, forensic sciences, criminal jurisprudence, and their societal manifestations across India and the Global South.
          </p>
          <p>
            The fundamental purpose of the journal is to bridge the historical disconnect between statutory criminal law, empirical forensic validation, and social justice. In the era of the <strong>Bharatiya Nyaya Sanhita (BNS, 2023)</strong>, the <strong>Bharatiya Nagarik Suraksha Sanhita (BNSS, 2023)</strong>, and the <strong>Bharatiya Sakshya Adhiniyam (BSA, 2023)</strong>, the journal provides an objective platform where judicial precedents, laboratory science, police practices, and sociological insights converge.
          </p>
          <p>
            The journal aims to translate rigorous academic research into actionable insights for trial courts, High Courts, the Supreme Court of India, forensic science laboratories, police organizations, and policy architects.
          </p>
        </div>
      </section>

      {/* 2. RESEARCH AREAS */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-[var(--accent-gold)]">
              <Layers className="w-4 h-4" /> Section 2
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
              2. Core Research Areas
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] font-serif">
              Key thematic domains actively investigated within the journal's publication scope.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[var(--text-muted)]" />
            <input
              type="text"
              value={filterQuery}
              onChange={e => setFilterQuery(e.target.value)}
              placeholder="Search research areas..."
              className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {filteredCategories.map((cat, idx) => (
            <div 
              key={cat.id}
              className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--accent-gold)] transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)] mb-1.5">
                  <span className="font-bold text-[var(--accent-gold)]">#{String(idx + 1).padStart(2, '0')}</span>
                  <span>Research Area</span>
                </div>
                <h3 className="font-serif font-bold text-sm text-[var(--text-primary)]">
                  {cat.name}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-1.5 leading-relaxed font-serif">
                  {cat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. DISCIPLINES COVERED */}
      <section className="p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-[var(--accent-gold)]">
            <Sparkles className="w-4 h-4" /> Section 3
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
            3. Disciplines Covered
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-serif">
            The journal spans six primary disciplinary pillars and their multi-way intersections.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: "Criminal Law & Constitutional Jurisprudence",
              desc: "Statutory provisions of BNS, BNSS, and BSA; Article 21 due process; bail jurisprudence; precedent analysis; judicial sentencing."
            },
            {
              title: "Forensic Science & Digital Evidence",
              desc: "DNA profiling, forensic toxicology, ballistic analysis, electronic evidence hashes under Section 63 BSA, cyber forensics, AI facial recognition calibration."
            },
            {
              title: "Criminological Theory & Behavioural Psychology",
              desc: "Etiology of criminal behaviour, suspect interrogation psychology, cognitive bias in testimony, trauma response, psychiatric evaluations."
            },
            {
              title: "Sociology of Law & Carceral Studies",
              desc: "Structural inequality, caste and socio-economic profiling, prison overcrowding and undertrial pendency, deviance, restorative justice."
            },
            {
              title: "Policing Science & Law Enforcement Administration",
              desc: "Field investigation protocols, Section 105 BNSS mandatory audio-video recording, crime mapping, cybercrime containment, police reforms."
            },
            {
              title: "Victimology & Restorative Justice",
              desc: "Victim rights, compensation frameworks under Section 395 BNSS, vulnerable witness protection, POCSO trial safeguards, trauma-informed adjudication."
            }
          ].map((disc, idx) => (
            <div key={idx} className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-2">
              <span className="font-mono text-[10px] font-bold text-[var(--accent-gold)] uppercase block">
                Discipline 0{idx + 1}
              </span>
              <h4 className="font-serif font-bold text-sm text-[var(--text-primary)]">
                {disc.title}
              </h4>
              <p className="text-xs text-[var(--text-secondary)] font-serif leading-relaxed">
                {disc.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. TYPES OF SCHOLARSHIP ACCEPTED */}
      <section className="space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-[var(--accent-gold)]">
            <FileText className="w-4 h-4" /> Section 4
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
            4. Types of Scholarship Accepted
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] font-serif">
            Scholars may submit contributions across eight established formats:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ACCEPTED_ARTICLE_TYPES_8.map((item, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex flex-col justify-between space-y-2 hover:border-[var(--accent-gold)] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-serif font-bold text-sm text-[var(--text-primary)]">
                    {item.type}
                  </h4>
                  <FileText className="w-4 h-4 text-[var(--accent-gold)] shrink-0" />
                </div>
                <span className="inline-block px-2 py-0.5 rounded bg-[var(--bg-card-hover)] border border-[var(--border-subtle)] font-mono text-[10px] text-[var(--accent-gold)] font-bold mt-1">
                  {item.wordCount}
                </span>
                <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed font-serif">
                  {item.desc}
                </p>
              </div>
              <div className="pt-2 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 border-t border-[var(--border-subtle)]">
                <CheckCircle2 className="w-3 h-3" />
                <span>Double-Blind Peer Reviewed</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Navigation Footer */}
      <div className="pt-6 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-4">
        <Link
          to="/about"
          className="text-xs font-semibold text-[var(--accent-navy)] hover:underline flex items-center gap-1"
        >
          ← Return to About the Journal
        </Link>
        <Link
          to="/rashomon-approach"
          className="px-5 py-2.5 rounded-xl bg-[var(--accent-gold)] text-slate-950 font-bold text-xs hover:bg-[var(--accent-gold-hover)] transition-all flex items-center gap-1.5"
        >
          <span>Continue to Rashomon Approach</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  );
};

export default AimsScopePage;
