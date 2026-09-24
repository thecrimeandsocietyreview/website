import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Eye, 
  Scale, 
  Microscope, 
  Brain, 
  Users, 
  ShieldAlert, 
  HeartHandshake, 
  Sparkles, 
  ArrowRight, 
  BookOpen,
  Layers,
  History,
  Cpu,
  Globe2,
  FileText
} from 'lucide-react';

interface LensData {
  id: string;
  name: string;
  discipline: string;
  coreQuestion: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgLight: string;
  borderLight: string;
}

const PERSPECTIVES: LensData[] = [
  {
    id: 'law',
    name: 'Law & Jurisprudence',
    discipline: 'Legal Doctrine',
    coreQuestion: 'How do statutory codes, procedural due process, and constitutional rights govern this issue?',
    description: 'Statutory provisions (BNS, BNSS, BSA), constitutional fair trial safeguards under Article 21, evidentiary burdens, and judicial precedents.',
    icon: Scale,
    color: 'text-amber-600 dark:text-amber-400',
    bgLight: 'bg-amber-500/10',
    borderLight: 'border-amber-500/30'
  },
  {
    id: 'sociology',
    name: 'Sociology & Criminology',
    discipline: 'Social Structures',
    coreQuestion: 'How do socioeconomic status, caste, gender, and marginalisation shape criminalisation and justice?',
    description: 'Systemic inequalities, carceral penology, institutional biases, victimisation patterns, and community restorative justice.',
    icon: Users,
    color: 'text-blue-600 dark:text-blue-400',
    bgLight: 'bg-blue-500/10',
    borderLight: 'border-blue-500/30'
  },
  {
    id: 'psychology',
    name: 'Psychology & Behaviour',
    discipline: 'Human Cognition',
    coreQuestion: 'What cognitive biases, trauma responses, or coercive factors influenced the actors?',
    description: 'Forensic psychology, eyewitness reliability, trauma-informed courtroom procedures, custodial coercion, and decision-making under stress.',
    icon: Brain,
    color: 'text-purple-600 dark:text-purple-400',
    bgLight: 'bg-purple-500/10',
    borderLight: 'border-purple-500/30'
  },
  {
    id: 'science',
    name: 'Forensic Science',
    discipline: 'Physical & Natural Evidence',
    coreQuestion: 'What does scientific and empirical validation substantiate beyond human perception?',
    description: 'DNA phenotyping, forensic pathology, toxicology calibration limits, chain of custody verification, and forensic error rates.',
    icon: Microscope,
    color: 'text-emerald-600 dark:text-emerald-400',
    bgLight: 'bg-emerald-500/10',
    borderLight: 'border-emerald-500/30'
  },
  {
    id: 'technology',
    name: 'Technology & Cyber',
    discipline: 'Digital Diagnostics',
    coreQuestion: 'How do algorithmic systems, biometric scanners, and digital extractions alter evidentiary truth?',
    description: 'Section 63 BSA electronic hash verification, facial recognition accuracy, digital surveillance, automated policing, and cyber forensics.',
    icon: Cpu,
    color: 'text-cyan-600 dark:text-cyan-400',
    bgLight: 'bg-cyan-500/10',
    borderLight: 'border-cyan-500/30'
  },
  {
    id: 'policy',
    name: 'Policy & Governance',
    discipline: 'Institutional Reform',
    coreQuestion: 'What institutional, budgetary, and operational reforms are required to implement justice?',
    description: 'Police reforms, prison infrastructure, legal aid delivery, public accountability, and evidence-informed administrative policymaking.',
    icon: ShieldAlert,
    color: 'text-rose-600 dark:text-rose-400',
    bgLight: 'bg-rose-500/10',
    borderLight: 'border-rose-500/30'
  }
];

export const RashomonPage: React.FC = () => {
  const [activeLensId, setActiveLensId] = useState<string>('law');
  const activeLens = PERSPECTIVES.find(p => p.id === activeLensId) || PERSPECTIVES[0];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-16 animate-fadeIn">
      {/* Page Header */}
      <div className="border-b border-[var(--border-subtle)] pb-8 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-[var(--accent-gold)]">
          <Sparkles className="w-4 h-4" />
          <span>Multidisciplinary Analytical Inquiry</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[var(--text-primary)] tracking-tight">
          The Rashomon Approach
        </h1>
        <p className="font-serif italic text-base sm:text-xl text-[var(--accent-gold)]">
          Examining Complex Phenomena Through Diverse Intellectual Perspectives
        </p>
      </div>

      {/* 1. OFFICIAL STATEMENT: THE RASHOMON APPROACH */}
      <section className="p-8 sm:p-10 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-6 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-[var(--accent-gold)]">
          <Layers className="w-4 h-4" />
          <span>Intellectual Foundation</span>
        </div>
        
        <div className="prose prose-slate dark:prose-invert max-w-none text-base sm:text-lg text-[var(--text-primary)] font-serif leading-relaxed space-y-5">
          <p className="first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:text-[var(--accent-navy)] first-letter:leading-none">
            At the intellectual heart of <em>The Crime &amp; Society Review</em> is the <strong>Rashomon Approach</strong>—the idea that no complex phenomenon can always be fully understood from a single perspective. Like observing a scene from every corner, the approach encourages researchers to examine a subject through multiple disciplines, viewpoints, methods, experiences, and forms of evidence.
          </p>

          <p>
            A phenomenon may look different when viewed through the lenses of law, sociology, psychology, science, technology, history, philosophy, economics, culture, policy, or lived experience. These perspectives may complement, challenge, or deepen one another, revealing dimensions that a single disciplinary approach may overlook.
          </p>

          <p>
            The Rashomon Approach therefore represents the journal's commitment to multidisciplinary inquiry: bringing different ways of seeing into dialogue to develop a more comprehensive, nuanced, and meaningful understanding of complex subjects.
          </p>
        </div>
      </section>

      {/* 2. THE MULTIDISCIPLINARY LENSES IN DIALOGUE */}
      <section className="space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-[var(--accent-gold)]">
            <Eye className="w-4 h-4" />
            <span>Interactive Multi-Perspective Explorer</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
            Diverse Lenses in Scholarly Dialogue
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-serif">
            Select a disciplinary lens to examine how different perspectives reveal hidden dimensions of legal, criminological, and societal phenomena:
          </p>
        </div>

        {/* Lens Selectors */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {PERSPECTIVES.map((p) => {
            const Icon = p.icon;
            const isSelected = p.id === activeLensId;
            return (
              <button
                key={p.id}
                onClick={() => setActiveLensId(p.id)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? `border-amber-500 bg-[var(--accent-navy)] text-white shadow-md scale-102`
                    : `border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--border-strong)] text-[var(--text-primary)]`
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isSelected ? 'bg-white/15 text-[var(--accent-gold)]' : `${p.bgLight} ${p.color}`}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-[var(--accent-gold)] animate-pulse"></span>
                  )}
                </div>
                <div>
                  <span className="block font-serif font-bold text-xs sm:text-sm leading-tight">
                    {p.name.split(' & ')[0]}
                  </span>
                  <span className={`text-[10px] font-mono mt-0.5 block ${isSelected ? 'text-slate-300' : 'text-[var(--text-muted)]'}`}>
                    {p.discipline}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Lens Detail Card */}
        <div className="p-6 sm:p-8 rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-card)] shadow-sm space-y-5">
          <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] pb-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${activeLens.bgLight} ${activeLens.color}`}>
              <activeLens.icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                {activeLens.name}
              </h3>
              <span className="text-xs font-mono text-[var(--accent-gold)] font-semibold">
                Perspective Domain: {activeLens.discipline}
              </span>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            <div>
              <span className="text-[11px] font-mono uppercase text-[var(--text-muted)] font-bold block mb-1">
                Central Inquiry Question:
              </span>
              <p className="font-serif italic font-semibold text-[var(--text-primary)] text-sm sm:text-base bg-[var(--bg-card-hover)] p-3 rounded-xl border border-[var(--border-subtle)]">
                "{activeLens.coreQuestion}"
              </p>
            </div>

            <div>
              <span className="text-[11px] font-mono uppercase text-[var(--text-muted)] font-bold block mb-1">
                Scope &amp; Dimensions Analyzed:
              </span>
              <p className="font-serif text-[var(--text-secondary)] leading-relaxed">
                {activeLens.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MULTIDISCIPLINARY SYNTHESIS CALLOUT */}
      <section className="p-8 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] space-y-4">
        <h3 className="font-serif text-xl font-bold text-[var(--text-primary)]">
          Connecting Disciplines, Broadening Inquiry
        </h3>
        <p className="text-sm text-[var(--text-secondary)] font-serif leading-relaxed">
          Rather than approaching a phenomenon from a single vantage point, <em>The Crime &amp; Society Review</em> seeks to examine the whole scene—from every corner—to develop a more comprehensive, nuanced, and meaningful understanding. We encourage authors to bridge disciplines and bring diverse empirical, doctrinal, and conceptual perspectives into collaborative synthesis.
        </p>
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <Link
            to="/submit"
            className="px-5 py-2.5 rounded-xl bg-[var(--accent-navy)] text-white text-xs font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Submit Multidisciplinary Manuscript</span>
          </Link>
          <Link
            to="/aims-scope"
            className="px-5 py-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] flex items-center gap-2"
          >
            <span>Explore Aims &amp; Scope</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default RashomonPage;
