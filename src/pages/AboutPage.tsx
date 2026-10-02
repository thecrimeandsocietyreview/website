import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Scale, 
  Target, 
  Compass, 
  BookOpen, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { JOURNAL_METADATA } from '../data/mockJournalData';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="pb-1">
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[var(--text-primary)] tracking-tight">
          About The Crime &amp; Society Review
        </h1>
      </div>

      {/* 1. PURPOSE OF THE JOURNAL (FEATURED DARK CARD) */}
      <section className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white space-y-4 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Purpose of the Journal
          </h2>
          <div className="max-w-none text-sm sm:text-base text-slate-300 font-serif leading-relaxed space-y-4">
            <p>
              The Crime &amp; Society Review is dedicated to advancing multidisciplinary scholarship that transcends conventional academic boundaries and examines complex phenomena through diverse intellectual perspectives. Inspired by the Rashomon Approach, the journal recognises that a single phenomenon may reveal different dimensions when examined through different disciplines, methodologies, forms of evidence, and positions of observation.
            </p>
            <p>
              The journal provides a scholarly platform for research that connects disciplines, brings diverse forms of knowledge into dialogue, and encourages the examination of subjects from multiple perspectives. Rather than approaching a phenomenon from a single vantage point, the journal seeks to examine the whole scene—from every corner—to develop a more comprehensive, nuanced, and meaningful understanding.
            </p>
            <p>
              Through this multidisciplinary orientation, The Crime &amp; Society Review welcomes rigorous and original scholarship that challenges conventional boundaries, encourages critical inquiry, connects perspectives, and brings to light dimensions of knowledge that may remain overlooked within a single discipline.
            </p>
          </div>
        </div>
      </section>

      {/* 2. JOURNAL MISSION */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="p-5 sm:p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-[var(--accent-navy)]/10 text-[var(--accent-navy)] flex items-center justify-center">
            <Target className="w-4.5 h-4.5 text-[var(--accent-gold)]" />
          </div>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-[var(--text-primary)]">
            Journal Mission
          </h3>
          <p className="text-sm text-[var(--text-secondary)] font-serif leading-relaxed">
            To dismantle disciplinary silos in the study of crime and justice by providing a rigorous, open-access platform that unifies statutory criminal law, empirical forensic validation, behavioural psychology, and carceral sociology to inform judicial rulings, policy reforms, and frontline policing practices.
          </p>
        </div>

        <div className="p-5 sm:p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-[var(--accent-navy)]/10 text-[var(--accent-navy)] flex items-center justify-center">
            <Compass className="w-4.5 h-4.5 text-[var(--accent-gold)]" />
          </div>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-[var(--text-primary)]">
            Journal Vision
          </h3>
          <p className="text-sm text-[var(--text-secondary)] font-serif leading-relaxed">
            To serve as the premier reference journal in India and the Global South for multi-perspective criminological and legal scholarship, anchoring statutory transformation under the Bharatiya Nyaya Sanhita (BNS), BNSS, and BSA to constitutional due process and forensic integrity.
          </p>
        </div>
      </section>

      {/* 3. EDITORIAL PHILOSOPHY */}
      <section className="p-6 sm:p-7 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] space-y-4">
        <div className="space-y-1">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
            Editorial Philosophy
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-serif">
            Editorial assessment is guided strictly by substantive quality, empirical integrity, and constitutional relevance rather than institutional prestige or disciplinary orthodoxy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "Intellectual Rigour",
              desc: "Unyielding theoretical discipline and analytical depth in interrogating criminal justice problems. We reject superficial restatements without probing constitutional precedents or operational hurdles."
            },
            {
              title: "Methodological Integrity",
              desc: "Sound, transparent, and reproducible empirical methods across quantitative, qualitative, and forensic inquiries with clear disclosure of calibration limits and data sources."
            },
            {
              title: "Interdisciplinarity",
              desc: "Breaking institutional silos between the bench, the bar, the forensic laboratory, and the academy through integrated scholarly inquiry."
            },
            {
              title: "Critical Inquiry",
              desc: "Unflinching examination of state authority, law enforcement technologies (such as facial recognition algorithms), and systemic disparities across caste, class, and gender."
            },
            {
              title: "Scholarly Openness",
              desc: "Diamond Open Access as an ethical imperative for democratic knowledge dissemination, ensuring ₹0 Article Processing Charges and unhindered public access."
            },
            {
              title: "Evidence & Reason",
              desc: "Grounding policy and judicial reforms in empirical proof, verified judicial statistics, and scientific reproducibility rather than media sensationalism."
            }
          ].map((pillar, i) => (
            <div key={i} className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-2">
              <span className="font-mono text-[10px] font-bold text-[var(--accent-gold)] uppercase block">
                Principle 0{i + 1}
              </span>
              <h4 className="font-serif font-bold text-sm text-[var(--text-primary)]">
                {pillar.title}
              </h4>
              <p className="text-xs text-[var(--text-secondary)] font-serif leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>


      </section>

      {/* Navigation Footer */}
      <div className="pt-6 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-4">
        <Link
          to="/"
          className="text-xs font-semibold text-[var(--accent-navy)] hover:underline flex items-center gap-1"
        >
          ← Return to Home
        </Link>
        <Link
          to="/aims-scope"
          className="px-5 py-2.5 rounded-xl bg-[var(--accent-gold)] text-slate-950 font-bold text-xs hover:bg-[var(--accent-gold-hover)] transition-all flex items-center gap-1.5"
        >
          <span>Continue to Aims &amp; Scope</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  );
};

export default AboutPage;
