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
  FileText,
  Layers,
  HelpCircle,
  BookOpen
} from 'lucide-react';
import { MOCK_ARTICLES } from '../data/mockJournalData';
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
    name: 'Legal Lens',
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
    id: 'forensic',
    name: 'Forensic Lens',
    definition: 'Crime as an Evidentiary Problem of physical, biological, chemical, or algorithmic traces.',
    coreQuestion: 'What is the objective scientific reproducibility, hash validity, and error rate of the recovered evidence?',
    icon: Microscope,
    color: 'text-blue-600 dark:text-blue-400',
    bgLight: 'bg-blue-500/10',
    borderLight: 'border-blue-500/30',
    institutionalSite: 'CFSL & State Forensic Science Laboratories',
    statutoryAnchor: 'Scientific Expert Evidence (Section 39 BSA)',
    caseIllustration: 'Measuring algorithmic facial recognition false match rates, cryptographic SHA-256 chain of custody, and DNA mixture deconvolution.'
  },
  {
    id: 'psychological',
    name: 'Psychological Lens',
    definition: 'Crime as a Behavioural Phenomenon shaped by human cognition, impulsivity, stress, or pathology.',
    coreQuestion: 'What cognitive biases, trauma responses, or coercive factors influenced the suspect, witness, or investigator?',
    icon: Brain,
    color: 'text-purple-600 dark:text-purple-400',
    bgLight: 'bg-purple-500/10',
    borderLight: 'border-purple-500/30',
    institutionalSite: 'Forensic Psychology Laboratories & Clinical Settings',
    statutoryAnchor: 'Selvi v. State of Karnataka Doctrine & Competency',
    caseIllustration: 'Evaluating confession reliability under custodial sleep deprivation and cross-racial eyewitness misidentification.'
  },
  {
    id: 'sociological',
    name: 'Sociological Lens',
    definition: 'Crime as a Social Process rooted in structural inequalities, economic marginality, and social stigma.',
    coreQuestion: 'How do caste, class, spatial segregation, and institutional power determine who gets criminalized?',
    icon: Users,
    color: 'text-emerald-600 dark:text-emerald-400',
    bgLight: 'bg-emerald-500/10',
    borderLight: 'border-emerald-500/30',
    institutionalSite: 'Communities, Prisons, and Informal Settlements',
    statutoryAnchor: 'Socio-Economic Justice & Article 14 Equality',
    caseIllustration: 'Analyzing why 76% of Indian prison inmates are undertrials from economically weaker and marginalized communities.'
  },
  {
    id: 'policing',
    name: 'Policing Lens',
    definition: 'Crime as an Institutional Challenge of public order, investigation logistics, and state enforcement.',
    coreQuestion: 'How do frontline investigating officers execute arrest, search, and videography under acute resource deficits?',
    icon: ShieldAlert,
    color: 'text-rose-600 dark:text-rose-400',
    bgLight: 'bg-rose-500/10',
    borderLight: 'border-rose-500/30',
    institutionalSite: 'Police Stations & Specialized Cyber/Crime Cells',
    statutoryAnchor: 'Section 105 BNSS (Mandatory Videography)',
    caseIllustration: 'Operationalizing mandatory crime scene videography under Section 105 BNSS without cloud forensic storage budgets.'
  },
  {
    id: 'victimology',
    name: 'Victimological Lens',
    definition: 'Crime as an Experience of Harm, loss of human dignity, secondary trauma, and restitution deficit.',
    coreQuestion: 'How can the justice process repair psychological and material injury without subjecting the victim to court trauma?',
    icon: HeartHandshake,
    color: 'text-teal-600 dark:text-teal-400',
    bgLight: 'bg-teal-500/10',
    borderLight: 'border-teal-500/30',
    institutionalSite: 'Victim Compensation Boards & Restorative Tribunals',
    statutoryAnchor: 'Section 395 BNSS & Witness Protection Scheme',
    caseIllustration: 'Addressing institutional re-victimization during adversarial trial cross-examinations and delay in victim compensation funds.'
  }
];

export const RashomonPage: React.FC = () => {
  const [activeLensId, setActiveLensId] = useState<DisciplinaryLens>('legal');
  const [compareLensId, setCompareLensId] = useState<DisciplinaryLens | null>('forensic');

  const activeLens = PERSPECTIVES.find(p => p.id === activeLensId) || PERSPECTIVES[0];
  const compareLens = compareLensId ? PERSPECTIVES.find(p => p.id === compareLensId) : null;

  // Filter articles tagged with active lens
  const relatedArticles = MOCK_ARTICLES.filter(a => 
    a.discipline === activeLensId || a.secondaryDisciplines?.includes(activeLensId)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-16 animate-fadeIn">
      {/* Page Header */}
      <div className="border-b border-[var(--border-subtle)] pb-8 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-[var(--accent-gold)]">
          <Sparkles className="w-4 h-4" />
          <span>Signature Epistemological Framework</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[var(--text-primary)] tracking-tight">
          The Rashomon Multidisciplinary Approach
        </h1>
        <p className="font-serif italic text-base sm:text-xl text-[var(--accent-gold)]">
          One Crime — Six Disciplinary Realities: Moving Beyond Fragmented Criminology
        </p>
      </div>

      {/* Epistemological Genesis */}
      <section className="p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)]">
          The Intellectual Core of The Crime &amp; Society Review
        </h2>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] font-serif leading-relaxed">
          In Akira Kurosawa’s cinematic masterpiece <em>Rashomon</em>, a single violent encounter in a forest is recounted through four contradictory yet entirely sincere narratives. In modern Indian criminal jurisprudence, every crime undergoes an identical fragmentation:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
          {PERSPECTIVES.map((p) => (
            <div key={p.id} className={`p-3 rounded-xl border ${p.borderLight} ${p.bgLight} text-center space-y-1`}>
              <span className="font-serif font-bold text-xs text-[var(--text-primary)] block">{p.name.split(' ')[0]}</span>
              <span className="text-[10px] font-mono text-[var(--text-muted)] block">→ {p.definition.split(' ')[3]} {p.definition.split(' ')[4] || ''}</span>
            </div>
          ))}
        </div>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] font-serif leading-relaxed pt-2">
          When an automated facial recognition alert or digital hash certificate is presented in an Indian Sessions Court under Section 63 of the Bharatiya Sakshya Adhiniyam (BSA), the judge cannot resolve justice by consulting a single discipline alone. True scholarship requires examining how these six lenses intersect, collide, and synthesize.
        </p>
      </section>

      {/* Signature Interactive Centerpiece: ONE CRIME -> 6 PERSPECTIVES */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase font-bold text-[var(--accent-gold)] tracking-widest">
            Interactive Epistemic Prism
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
            Explore How Each Discipline Deconstructs Crime
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
            Click any lens below to unveil its specific analytical questions, statutory anchors, and empirical studies.
          </p>
        </div>

        {/* Central Hub Visualization */}
        <div className="relative p-6 sm:p-10 rounded-3xl border border-[var(--border-strong)] bg-radial from-[var(--bg-card)] to-[var(--bg-page)] shadow-lg space-y-8">
          
          {/* Central Anchor Node */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent-navy)] text-white text-xs font-mono font-bold tracking-wider uppercase shadow-md">
              <Eye className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
              <span>THE CENTRAL EVENT: ONE CRIME / FORENSIC EPISODE</span>
            </div>
            <p className="text-xs text-[var(--text-muted)] font-serif italic">
              e.g., An Alleged Cyber Financial Fraud involving Automated Biometric Device Extraction
            </p>
          </div>

          {/* 6 Lenses Selection Grid */}
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
                      ? `border-amber-500 bg-[var(--accent-navy)] text-white shadow-lg scale-102`
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
                    <span className="block font-serif font-bold text-sm leading-tight">
                      {p.name}
                    </span>
                    <span className={`text-[10px] font-mono mt-1 block ${isSelected ? 'text-slate-300' : 'text-[var(--text-muted)]'}`}>
                      {p.institutionalSite.split(' ')[0]}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Lens Detail Spotlight */}
          <div className="p-6 sm:p-8 rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-card)] shadow-md space-y-6">
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

              {/* Side-by-side comparison selector */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-[var(--text-muted)] font-mono">Juxtapose with:</span>
                <select
                  value={compareLensId || ''}
                  onChange={(e) => setCompareLensId(e.target.value as DisciplinaryLens || null)}
                  className="px-2.5 py-1 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-[var(--text-primary)] font-mono text-xs focus:ring-1 focus:ring-[var(--accent-navy)]"
                >
                  <option value="">None (Single Lens)</option>
                  {PERSPECTIVES.filter(p => p.id !== activeLensId).map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Core Questions & Doctrinal Details */}
            <div className={`grid grid-cols-1 ${compareLens ? 'lg:grid-cols-2' : 'lg:grid-cols-3'} gap-6`}>
              
              {/* Primary Lens Column */}
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-mono uppercase text-[var(--text-muted)] font-bold">
                    Core Epistemic Question:
                  </span>
                  <p className="font-serif text-sm sm:text-base font-semibold text-[var(--text-primary)] mt-1 italic">
                    "{activeLens.coreQuestion}"
                  </p>
                </div>
                <div className="space-y-2 text-xs text-[var(--text-secondary)]">
                  <div>
                    <strong className="text-[var(--text-primary)] font-mono">Institutional Site:</strong> {activeLens.institutionalSite}
                  </div>
                  <div>
                    <strong className="text-[var(--text-primary)] font-mono">Statutory Anchor:</strong> {activeLens.statutoryAnchor}
                  </div>
                  <div>
                    <strong className="text-[var(--text-primary)] font-mono">Pragmatic Case Illustration:</strong> {activeLens.caseIllustration}
                  </div>
                </div>
              </div>

              {/* Comparison Column (If Selected) */}
              {compareLens && (
                <div className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-page)] space-y-4">
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
                  <div className="space-y-2 text-xs text-[var(--text-secondary)]">
                    <div>
                      <strong className="text-[var(--text-primary)] font-mono">Statutory Anchor:</strong> {compareLens.statutoryAnchor}
                    </div>
                    <div>
                      <strong className="text-[var(--text-primary)] font-mono">Distinct Tension:</strong> When {activeLens.name.toLowerCase()} seeks statutory certainty, {compareLens.name.toLowerCase()} exposes operational or cognitive variance.
                    </div>
                  </div>
                </div>
              )}

              {/* Lens Policy & Judicial Impact */}
              {!compareLens && (
                <div className="lg:col-span-2 p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-page)] space-y-3">
                  <h4 className="font-serif font-bold text-sm text-[var(--text-primary)] flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[var(--accent-gold)]" />
                    <span>How This Lens Informs Judicial Rulings & Police Protocols</span>
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] font-serif leading-relaxed">
                    Under Indian trial procedure, judges often receive forensic and police reports as unassailable facts. Applying the {activeLens.name} equips defence advocates and presiding magistrates to interrogate the hidden assumptions, institutional constraints, and human factors underlying the prosecution's narrative.
                  </p>
                  <div className="pt-1 flex items-center gap-2 text-xs font-mono text-[var(--accent-navy)]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Cross-disciplinary peer-review benchmark applied to all submissions.</span>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* Filtered Research Publications for Active Lens */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
              <FileText className="w-5 h-5 text-[var(--accent-navy)]" />
              <span>Research Publications Filtered by {activeLens.name}</span>
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5">
              Articles employing this disciplinary lens as primary or secondary prism.
            </p>
          </div>
          <Link
            to="/articles"
            className="text-xs font-semibold text-[var(--accent-navy)] hover:underline flex items-center gap-1"
          >
            <span>View All Repository Articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-4">
          {relatedArticles.map((article) => (
            <div
              key={article.id}
              className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--accent-gold)]/50 transition-all space-y-3 shadow-2xs group"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-[var(--accent-navy)]/10 text-[var(--accent-navy)]">
                  {article.articleType}
                </span>
                <span className="text-[11px] font-mono text-[var(--text-muted)]">
                  DOI: {article.doi}
                </span>
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-navy)] transition-colors">
                <Link to={`/article/${article.id}`}>
                  {article.title}
                </Link>
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-serif line-clamp-2">
                {article.abstract}
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-[var(--border-subtle)] text-xs">
                <span className="text-[11px] text-[var(--text-muted)]">
                  {article.authors.map(a => a.name).join(', ')}
                </span>
                <Link
                  to={`/article/${article.id}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--accent-navy)] text-white text-xs font-semibold hover:opacity-90 transition-opacity"
                >
                  <span>Read Article &amp; Lenses</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Authors for Multidisciplinary Papers */}
      <section className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="font-serif text-2xl font-bold text-white">
            Publish Your Multi-Perspective Research
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 font-serif max-w-xl">
            Does your research cross the boundaries of law, forensic pathology, digital evidence, or sociological inquiry? We invite you to submit your manuscript to <em>The Crime &amp; Society Review</em> under our Diamond Open Access policy.
          </p>
        </div>
        <Link
          to="/submit"
          className="shrink-0 px-6 py-3 rounded-xl bg-[var(--accent-gold)] text-slate-950 text-xs font-bold hover:brightness-110 transition-all shadow-md flex items-center gap-2"
        >
          <span>Submit Manuscript</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
};
