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
  CheckCircle2, 
  BookOpen,
  Layers,
  Network
} from 'lucide-react';
import { DisciplinaryLens } from '../types/journal';

interface LensData {
  id: DisciplinaryLens;
  name: string;
  definition: string;
  coreQuestion: string;
  icon: React.ElementType;
  color: string;
  bgLight: string;
  borderLight: string;
  institutionalSite: string;
  statutoryAnchor: string;
  caseIllustration: string;
}

const PERSPECTIVES: LensData[] = [
  {
    id: 'legal',
    name: 'Legal Perspective',
    definition: 'Crime as a formal Criminal Act defined by statutory provisions and procedural boundaries.',
    coreQuestion: 'Has the state met the standard of proof beyond reasonable doubt within constitutional Article 21 due process?',
    icon: Scale,
    color: 'text-amber-600 dark:text-amber-400',
    bgLight: 'bg-amber-500/10',
    borderLight: 'border-amber-500/30',
    institutionalSite: 'High Courts & Sessions Trials',
    statutoryAnchor: 'Bharatiya Nyaya Sanhita (BNS) & Section 63 BSA',
    caseIllustration: 'Scrutinizing whether digital logs satisfy statutory Section 63 certification requirements without violating Article 20(3) right against self-incrimination.'
  },
  {
    id: 'psychological',
    name: 'Behavioural / Psychological Perspective',
    definition: 'Crime as a Behavioural Phenomenon shaped by human cognition, impulsivity, stress, or trauma.',
    coreQuestion: 'What cognitive biases, trauma responses, or coercive factors influenced the suspect, witness, or investigator?',
    icon: Brain,
    color: 'text-purple-600 dark:text-purple-400',
    bgLight: 'bg-purple-500/10',
    borderLight: 'border-purple-500/30',
    institutionalSite: 'Forensic Psychology Laboratories & Clinical Settings',
    statutoryAnchor: 'Selvi v. State of Karnataka Doctrine & Competency',
    caseIllustration: 'Evaluating confession reliability under custodial sleep deprivation, cross-racial eyewitness misidentification, and police interrogation pressures.'
  },
  {
    id: 'forensic',
    name: 'Forensic Perspective',
    definition: 'Crime as an Evidentiary Problem of physical, biological, chemical, or algorithmic traces.',
    coreQuestion: 'What is the objective scientific reproducibility, hash validity, and error rate of the recovered evidence?',
    icon: Microscope,
    color: 'text-blue-600 dark:text-blue-400',
    bgLight: 'bg-blue-500/10',
    borderLight: 'border-blue-500/30',
    institutionalSite: 'CFSL & State Forensic Science Laboratories',
    statutoryAnchor: 'Scientific Expert Evidence (Section 39 BSA)',
    caseIllustration: 'Measuring automated facial recognition false match rates, cryptographic SHA-256 chain of custody, and DNA mixture deconvolution limits.'
  },
  {
    id: 'sociological',
    name: 'Sociological Perspective',
    definition: 'Crime as a Social Process rooted in structural inequalities, economic marginality, and social stigma.',
    coreQuestion: 'How do caste, class, spatial segregation, and institutional power determine who gets criminalized?',
    icon: Users,
    color: 'text-emerald-600 dark:text-emerald-400',
    bgLight: 'bg-emerald-500/10',
    borderLight: 'border-emerald-500/30',
    institutionalSite: 'Communities, Prisons, and Informal Settlements',
    statutoryAnchor: 'Socio-Economic Justice & Article 14 Equality',
    caseIllustration: 'Analyzing why the vast majority of Indian prison inmates are undertrials from economically weaker and marginalized communities.'
  },
  {
    id: 'policing',
    name: 'Policing Perspective',
    definition: 'Crime as an Institutional Challenge of public order, investigation logistics, and state enforcement.',
    coreQuestion: 'How do frontline investigating officers execute arrest, search, and videography under acute resource deficits?',
    icon: ShieldAlert,
    color: 'text-rose-600 dark:text-rose-400',
    bgLight: 'bg-rose-500/10',
    borderLight: 'border-rose-500/30',
    institutionalSite: 'Police Stations & Specialized Cyber/Crime Cells',
    statutoryAnchor: 'Section 105 BNSS (Mandatory Videography)',
    caseIllustration: 'Operationalizing mandatory crime scene videography under Section 105 BNSS without secure cloud storage infrastructure or training.'
  },
  {
    id: 'victimology',
    name: 'Victimological Perspective',
    definition: 'Crime as an Experience of Harm, loss of human dignity, secondary trauma, and restitution deficit.',
    coreQuestion: 'How can the justice process repair psychological and material injury without subjecting the victim to court trauma?',
    icon: HeartHandshake,
    color: 'text-teal-600 dark:text-teal-400',
    bgLight: 'bg-teal-500/10',
    borderLight: 'border-teal-500/30',
    institutionalSite: 'Victim Compensation Boards & Restorative Tribunals',
    statutoryAnchor: 'Section 395 BNSS & Witness Protection Scheme',
    caseIllustration: 'Addressing institutional re-victimization during adversarial trial cross-examinations and administrative delay in disbursing victim compensation.'
  }
];

export const RashomonPage: React.FC = () => {
  const [activeLensId, setActiveLensId] = useState<DisciplinaryLens>('legal');
  const [compareLensId, setCompareLensId] = useState<DisciplinaryLens | null>('forensic');

  const activeLens = PERSPECTIVES.find(p => p.id === activeLensId) || PERSPECTIVES[0];
  const compareLens = compareLensId ? PERSPECTIVES.find(p => p.id === compareLensId) : null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-16 animate-fadeIn">
      {/* Page Header */}
      <div className="border-b border-[var(--border-subtle)] pb-8 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-[var(--accent-gold)]">
          <Sparkles className="w-4 h-4" />
          <span>Signature Epistemological Framework</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[var(--text-primary)] tracking-tight">
          The Rashomon Approach
        </h1>
        <p className="font-serif italic text-base sm:text-xl text-[var(--accent-gold)]">
          One Crime — Six Disciplinary Realities: Moving Beyond Fragmented Criminology
        </p>
      </div>

      {/* 1. MULTIDISCIPLINARY PERSPECTIVE FRAMEWORK */}
      <section className="p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-[var(--accent-gold)]">
          <Layers className="w-4 h-4" /> Section 1
        </div>
        <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)]">
          1. Multidisciplinary Perspective: The Intellectual Concept
        </h2>
        <div className="prose prose-slate dark:prose-invert max-w-none text-sm sm:text-base text-[var(--text-secondary)] font-serif leading-relaxed space-y-4">
          <p>
            In Akira Kurosawa’s cinematic masterpiece <em>Rashomon</em>, a single violent encounter in a forest is recounted through four contradictory yet sincere narratives. In modern Indian criminal jurisprudence, every crime undergoes an identical fragmentation:
          </p>
          <p>
            When an automated facial recognition alert or digital hash certificate is presented in an Indian Sessions Court under Section 63 of the Bharatiya Sakshya Adhiniyam (BSA), the judge cannot resolve justice by consulting a single discipline alone. A computer scientist views it as mathematical probability; a defense counsel views it as an opaque black box; an investigating police officer views it as objective truth; and the accused may be trapped by socioeconomic marginality.
          </p>
          <p>
            The <strong>Rashomon Approach</strong> provides an epistemological framework to examine how these multiple realities intersect, collide, and synthesize to arrive at holistic truth and constitutional justice.
          </p>
        </div>
      </section>

      {/* 2. THE 6 PERSPECTIVES DETAILED */}
      <section className="space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-[var(--accent-gold)]">
            <Eye className="w-4 h-4" /> Section 2
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
            2. The Six Core Perspectives
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] font-serif">
            Click any lens below to view its epistemic definition, core inquiry question, and pragmatic legal application.
          </p>
        </div>

        {/* 6 Lenses Selection Tabs */}
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
                    {p.name.replace(' Perspective', '')}
                  </span>
                  <span className={`text-[10px] font-mono mt-1 block ${isSelected ? 'text-slate-300' : 'text-[var(--text-muted)]'}`}>
                    {p.institutionalSite.split(' ')[0]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Lens Detail Card */}
        <div className="p-6 sm:p-8 rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-card)] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${activeLens.bgLight} ${activeLens.color}`}>
                <activeLens.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                  {activeLens.name}
                </h3>
                <span className="text-xs font-mono text-[var(--accent-gold)] font-semibold">
                  {activeLens.definition}
                </span>
              </div>
            </div>

            {/* Side-by-side comparison dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[var(--text-muted)] font-mono">Contrast with:</span>
              <select
                value={compareLensId || ''}
                onChange={(e) => setCompareLensId(e.target.value as DisciplinaryLens || null)}
                className="px-2.5 py-1 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-[var(--text-primary)] font-mono text-xs"
              >
                <option value="">None (Single Lens)</option>
                {PERSPECTIVES.filter(p => p.id !== activeLensId).map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className={`grid grid-cols-1 ${compareLens ? 'lg:grid-cols-2' : 'lg:grid-cols-3'} gap-6`}>
            {/* Primary Details */}
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-mono uppercase text-[var(--text-muted)] font-bold">
                  Core Epistemic Question:
                </span>
                <p className="font-serif text-sm sm:text-base font-semibold text-[var(--text-primary)] mt-1 italic">
                  "{activeLens.coreQuestion}"
                </p>
              </div>
              <div className="space-y-2 text-xs text-[var(--text-secondary)] font-serif leading-relaxed">
                <div>
                  <strong className="text-[var(--text-primary)] font-sans">Institutional Site:</strong> {activeLens.institutionalSite}
                </div>
                <div>
                  <strong className="text-[var(--text-primary)] font-sans">Statutory Anchor:</strong> {activeLens.statutoryAnchor}
                </div>
                <div>
                  <strong className="text-[var(--text-primary)] font-sans">Pragmatic Case Illustration:</strong> {activeLens.caseIllustration}
                </div>
              </div>
            </div>

            {/* Compare Details */}
            {compareLens && (
              <div className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] space-y-4">
                <div className="flex items-center gap-2">
                  <compareLens.icon className={`w-4 h-4 ${compareLens.color}`} />
                  <span className="font-serif font-bold text-base text-[var(--text-primary)]">
                    Contrasting: {compareLens.name}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase text-[var(--text-muted)] font-bold">
                    Counterpart Question:
                  </span>
                  <p className="font-serif text-sm font-semibold text-[var(--text-primary)] mt-1 italic">
                    "{compareLens.coreQuestion}"
                  </p>
                </div>
                <div className="space-y-2 text-xs text-[var(--text-secondary)] font-serif leading-relaxed">
                  <div>
                    <strong className="text-[var(--text-primary)] font-sans">Statutory Anchor:</strong> {compareLens.statutoryAnchor}
                  </div>
                  <div>
                    <strong className="text-[var(--text-primary)] font-sans">Distinct Tension:</strong> When {activeLens.name.toLowerCase()} seeks statutory certainty, {compareLens.name.toLowerCase()} exposes operational or cognitive variance.
                  </div>
                </div>
              </div>
            )}

            {!compareLens && (
              <div className="lg:col-span-2 p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] space-y-3">
                <h4 className="font-serif font-bold text-sm text-[var(--text-primary)] flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[var(--accent-gold)]" />
                  <span>How This Lens Informs Judicial Rulings &amp; Investigation Protocols</span>
                </h4>
                <p className="text-xs text-[var(--text-secondary)] font-serif leading-relaxed">
                  Under Indian trial procedure, judicial officers often receive forensic and police reports as unassailable facts. Applying the {activeLens.name} equips defence advocates and presiding magistrates to interrogate the hidden assumptions, institutional constraints, and human factors underlying the prosecution's narrative.
                </p>
                <div className="pt-1 flex items-center gap-2 text-xs font-mono text-[var(--accent-navy)]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Cross-disciplinary peer-review benchmark applied to all TCSR scholarship.</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. DIFFERENT PERSPECTIVES KO CONNECT KARNE KA CONCEPT */}
      <section className="p-8 rounded-2xl border border-[var(--border-subtle)] bg-gradient-to-br from-[var(--bg-card)] via-[var(--bg-card-hover)] to-[var(--bg-card)] space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-[var(--accent-gold)]">
            <Network className="w-4 h-4" /> Section 3
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
            3. Connecting Different Perspectives: The Triangulation Concept
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-serif">
            Why connecting perspectives is essential for criminal justice in India.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none text-sm sm:text-base text-[var(--text-secondary)] font-serif leading-relaxed space-y-4">
          <p>
            The core breakthrough of the Rashomon Approach is <strong>Interdisciplinary Triangulation</strong>: rather than treating law, forensics, and sociology as rival or separate silos, it connects them in a structured dialogue around the central event of crime and punishment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-serif">
          <div className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-2">
            <span className="font-mono text-[10px] font-bold text-[var(--accent-gold)] uppercase block">
              Connection Dimension 01
            </span>
            <h4 className="font-serif font-bold text-sm text-[var(--text-primary)]">
              Bridging Science &amp; Due Process
            </h4>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Forensic calibration limits (DNA probabilistic genotyping, hash mismatches) are directly tied to Article 21 constitutional due process and Section 63 BSA standards.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-2">
            <span className="font-mono text-[10px] font-bold text-[var(--accent-gold)] uppercase block">
              Connection Dimension 02
            </span>
            <h4 className="font-serif font-bold text-sm text-[var(--text-primary)]">
              Connecting Behaviour &amp; Policing Reality
            </h4>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Cognitive eyewitness vulnerability is harmonized with frontline policing challenges (Section 105 BNSS videography constraints, resource deficits) to reform investigation guidelines.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-2">
            <span className="font-mono text-[10px] font-bold text-[var(--accent-gold)] uppercase block">
              Connection Dimension 03
            </span>
            <h4 className="font-serif font-bold text-sm text-[var(--text-primary)]">
              Synthesizing Harm &amp; Carceral Sociology
            </h4>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Victim restitution under Section 395 BNSS is linked with carceral sociology, ensuring that restorative restitution does not perpetuate arbitrary undertrial incarceration.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 text-xs text-[var(--text-secondary)] font-serif leading-relaxed">
          <strong className="text-[var(--text-primary)] font-sans block mb-1">
            The Synthesis Principle:
          </strong>
          When all six lenses are connected, judicial decisions move beyond rigid procedural formalism and become evidence-based, constitutionally grounded, and socially just.
        </div>
      </section>

      {/* Navigation Footer */}
      <div className="pt-6 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-4">
        <Link
          to="/aims-scope"
          className="text-xs font-semibold text-[var(--accent-navy)] hover:underline flex items-center gap-1"
        >
          ← Return to Aims &amp; Scope
        </Link>
        <Link
          to="/"
          className="px-5 py-2.5 rounded-xl bg-[var(--accent-navy)] text-white font-semibold text-xs hover:opacity-90 transition-all flex items-center gap-1.5"
        >
          <span>Return to Home</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  );
};

export default RashomonPage;
