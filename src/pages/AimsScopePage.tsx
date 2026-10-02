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
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* Header - Centered */}
      <div className="pb-1 text-center">
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[var(--text-primary)] tracking-tight">
          Aims &amp; Scope
        </h1>
      </div>

      {/* 1. AIMS & SCOPE OF THE JOURNAL */}
      <section className="p-6 sm:p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
        <div className="prose prose-slate dark:prose-invert max-w-none text-sm sm:text-base text-[var(--text-secondary)] font-serif leading-relaxed text-justify">
          <p>
            <em>The Crime &amp; Society Review</em> is a peer-reviewed, multidisciplinary journal dedicated to advancing critical, empirical, and doctrinal scholarship across criminal jurisprudence, statutory legal reforms under the Bharatiya Nyaya Sanhita (BNS), BNSS, and BSA, forensic sciences, behavioural psychology, and carceral sociology. The journal aims to bridge the gap between academic theory and frontline justice administration by providing a rigorous platform for research that connects diverse disciplines, evaluates evidentiary integrity, and fosters holistic inquiry into crime, criminal policy, and societal reform.
          </p>
        </div>
      </section>

      {/* 2. RESEARCH AREAS */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
              Core Research Areas
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] font-serif">
              Key thematic domains actively investigated within the journal's publication scope.
            </p>
          </div>

          {/* Quick Search - Right-aligned straight with heading */}
          <div className="relative w-full sm:w-72 shrink-0">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredCategories.map((cat) => (
            <div 
              key={cat.id}
              className="p-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--accent-gold)] transition-all flex flex-col justify-between shadow-2xs hover:shadow-md group"
            >
              <div className="space-y-3">
                {/* Handcrafted Illustration without container, no hover zoom */}
                <img 
                  src={`/core-research-areas/${cat.id}.png`}
                  alt={cat.name}
                  className="w-full h-32 object-contain"
                  loading="lazy"
                />

                <div>
                  <h3 className="font-serif font-bold text-base text-[var(--text-primary)] group-hover:text-[var(--accent-navy)] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-1.5 leading-relaxed font-serif text-justify">
                    {cat.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. DISCIPLINES COVERED (FEATURED DARK CONTAINER) */}
      <section className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white space-y-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-1 relative z-10 pb-2 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Disciplines Covered
          </h2>
          <p className="text-xs sm:text-sm text-slate-100 font-serif leading-relaxed max-w-2xl mx-auto">
            The journal spans six primary disciplinary pillars and their multidisciplinary intersections.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
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
            <div key={idx} className="p-5 rounded-2xl border border-slate-800 bg-slate-900/80 hover:border-amber-400/50 hover:bg-slate-850 transition-all space-y-2 group shadow-sm">
              <span className="font-mono text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                Discipline 0{idx + 1}
              </span>
              <h4 className="font-serif font-bold text-sm text-white group-hover:text-amber-400 transition-colors">
                {disc.title}
              </h4>
              <p className="text-xs text-slate-100 font-serif leading-relaxed">
                {disc.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. ARTICLES ACCEPTED */}
      <section className="space-y-6">
        <div className="space-y-1 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
            Articles Accepted
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-serif max-w-2xl mx-auto">
            The Crime &amp; Society Review welcomes submissions across the following scholarly article formats:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            "Original Research Articles",
            "Review Articles",
            "Systematic and Scoping Review Articles",
            "Theoretical Articles",
            "Conceptual Articles",
            "Methodological Articles",
            "Interdisciplinary and Multidisciplinary Articles",
            "Empirical Articles",
            "Case Study Articles",
            "Comparative Research Articles",
            "Short Research Articles",
            "Research Notes",
            "Critical Analysis Articles",
            "Scholarly Commentary Articles",
            "Policy and Practice Articles",
            "Perspective Articles",
            "Emerging and Contemporary Issues Articles",
            "Literature Review Articles",
            "Book Review Articles",
            "Theoretical and Applied Research Articles",
            "Interdisciplinary Review and Synthesis Articles"
          ].map((item, idx) => (
            <div 
              key={idx}
              className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center gap-3 hover:border-[var(--accent-gold)] transition-colors shadow-2xs"
            >
              <div className="w-7 h-7 rounded-lg bg-[var(--accent-navy)]/10 text-[var(--accent-navy)] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent-gold)]" />
              </div>
              <span className="font-serif font-bold text-xs sm:text-sm text-[var(--text-primary)]">
                {item}
              </span>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] text-xs text-[var(--text-secondary)] font-serif leading-relaxed">
          <p>
            The journal may also consider other scholarly article formats that demonstrate originality, academic rigour, sound methodology or analysis, and a meaningful contribution to knowledge within its multidisciplinary scope.
          </p>
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
          to="/submit"
          className="px-5 py-2.5 rounded-xl bg-[var(--accent-gold)] text-slate-950 font-bold text-xs hover:bg-[var(--accent-gold-hover)] transition-all flex items-center gap-1.5"
        >
          <span>Submit a Manuscript</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  );
};

export default AimsScopePage;
