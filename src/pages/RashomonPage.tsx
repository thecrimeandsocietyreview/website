import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Scale, 
  Microscope, 
  Brain, 
  Users, 
  ShieldAlert, 
  Cpu,
  ArrowRight, 
  FileText
} from 'lucide-react';

interface LensData {
  id: string;
  name: string;
  discipline: string;
  focus: string;
  icon: React.ElementType;
  color: string;
  bgLight: string;
}

const PERSPECTIVES: LensData[] = [
  {
    id: 'law',
    name: 'Law & Jurisprudence',
    discipline: 'Legal Doctrine',
    focus: 'Statutory codes (BNS, BNSS, BSA), Article 21 due process, evidentiary rules & judicial precedent.',
    icon: Scale,
    color: 'text-amber-600 dark:text-amber-400',
    bgLight: 'bg-amber-500/10'
  },
  {
    id: 'sociology',
    name: 'Sociology & Criminology',
    discipline: 'Social Structures',
    focus: 'Systemic inequalities, carceral penology, institutional bias, victimology & restorative justice.',
    icon: Users,
    color: 'text-blue-600 dark:text-blue-400',
    bgLight: 'bg-blue-500/10'
  },
  {
    id: 'psychology',
    name: 'Psychology & Behaviour',
    discipline: 'Human Cognition',
    focus: 'Eyewitness reliability, custodial interrogation psychology, trauma response & cognitive bias.',
    icon: Brain,
    color: 'text-purple-600 dark:text-purple-400',
    bgLight: 'bg-purple-500/10'
  },
  {
    id: 'science',
    name: 'Forensic Science',
    discipline: 'Empirical Evidence',
    focus: 'DNA phenotyping, toxicology calibration limits, chain of custody verification & forensic error rates.',
    icon: Microscope,
    color: 'text-emerald-600 dark:text-emerald-400',
    bgLight: 'bg-emerald-500/10'
  },
  {
    id: 'technology',
    name: 'Technology & Cyber',
    discipline: 'Digital Diagnostics',
    focus: 'Section 63 BSA electronic hash verification, facial recognition accuracy, digital surveillance & cyber forensics.',
    icon: Cpu,
    color: 'text-cyan-600 dark:text-cyan-400',
    bgLight: 'bg-cyan-500/10'
  },
  {
    id: 'policy',
    name: 'Policy & Governance',
    discipline: 'Institutional Reform',
    focus: 'Section 105 BNSS audio-visual protocols, police modernization, prison capacity & legal aid access.',
    icon: ShieldAlert,
    color: 'text-rose-600 dark:text-rose-400',
    bgLight: 'bg-rose-500/10'
  }
];

export const RashomonPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-12 animate-fadeIn">
      {/* Page Header (Clean title without above/under heading clutter) */}
      <div className="border-b border-[var(--border-subtle)] pb-6">
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[var(--text-primary)] tracking-tight">
          The Rashomon Approach
        </h1>
      </div>

      {/* 1. SIMPLE STARTING PARAGRAPH (DARK CONTEMPLATIVE CARD) */}
      <section className="p-7 sm:p-9 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block">
            Theoretical Epistemology
          </span>
          <p className="text-sm sm:text-base text-slate-200 font-serif leading-relaxed">
            At the intellectual heart of <em>The Crime &amp; Society Review</em> is the <strong className="text-amber-400">Rashomon Approach</strong>—the recognition that complex criminal justice phenomena cannot be adequately investigated from a single perspective. Like observing an event from every corner, the journal encourages researchers to examine subjects through diverse disciplines, viewpoints, methodologies, and forms of evidence to develop a comprehensive, nuanced, and meaningful understanding.
          </p>
        </div>
      </section>

      {/* 2. DIVERSE LENSES BOXES (Boxes only, no dropdown or expanded detail card below) */}
      <section className="space-y-6">
        <div className="border-b border-[var(--border-subtle)] pb-3">
          <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)]">
            Diverse Lenses in Scholarly Dialogue
          </h2>
        </div>

        {/* Diverse Lenses Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PERSPECTIVES.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.id}
                className="p-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--accent-gold)]/50 transition-all flex flex-col justify-between space-y-3 shadow-2xs group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${p.bgLight} ${p.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-[var(--accent-gold)] uppercase font-semibold">
                      {p.discipline}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-base text-[var(--text-primary)] group-hover:text-[var(--accent-navy)] transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] font-serif leading-relaxed mt-1.5">
                      {p.focus}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. MULTIDISCIPLINARY SYNTHESIS CALLOUT (DARK FEATURE CARD) */}
      <section className="p-8 sm:p-10 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white space-y-4 shadow-xl relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
            <span>Interdisciplinary Synergy</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-white tracking-tight">
            Connecting Disciplines, Broadening Inquiry
          </h3>
          <p className="text-sm text-slate-300 font-serif leading-relaxed max-w-3xl">
            Rather than approaching a phenomenon from a single vantage point, <em>The Crime &amp; Society Review</em> seeks to examine the whole scene—from every corner—to develop a more comprehensive, nuanced, and meaningful understanding. We encourage authors to bridge disciplines and bring diverse empirical, doctrinal, and conceptual perspectives into collaborative synthesis.
          </p>
          <div className="pt-3 flex flex-wrap items-center gap-3">
            <Link
              to="/submit"
              className="px-6 py-2.5 rounded-xl bg-[var(--accent-gold)] hover:bg-[var(--accent-gold-hover)] text-slate-950 text-xs font-bold transition-all flex items-center gap-2 shadow-md"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Submit Manuscript</span>
            </Link>
            <Link
              to="/aims-scope"
              className="px-5 py-2.5 rounded-xl border border-slate-700 bg-slate-900/90 text-xs font-semibold text-slate-200 hover:border-amber-400 hover:text-white transition-all flex items-center gap-2"
            >
              <span>Explore Aims &amp; Scope</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RashomonPage;
