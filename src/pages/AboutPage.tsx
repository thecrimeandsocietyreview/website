import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Scale, 
  Target, 
  Compass, 
  Eye, 
  Users, 
  Award, 
  ShieldCheck, 
  BookOpen, 
  ArrowRight,
  Landmark,
  Microscope,
  Brain
} from 'lucide-react';
import { JOURNAL_METADATA } from '../data/mockJournalData';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-16 animate-fadeIn">
      {/* Header Banner */}
      <div className="border-b border-[var(--border-subtle)] pb-8 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-[var(--accent-gold)]">
          <Scale className="w-4 h-4" />
          <span>Institutional Profile • About the Journal</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[var(--text-primary)] tracking-tight">
          About The Crime & Society Review
        </h1>
        <p className="font-serif italic text-base sm:text-xl text-[var(--accent-gold)]">
          An Interdisciplinary Scholarly Forum for Law, Forensics, Policing, and Criminology
        </p>
      </div>

      {/* 1. About the Journal Overview */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[var(--accent-navy)]" />
          <span>1. About the Journal</span>
        </h2>
        <div className="prose prose-slate dark:prose-invert max-w-none text-sm sm:text-base text-[var(--text-secondary)] font-serif leading-relaxed space-y-4">
          <p>
            <strong>The Crime & Society Review</strong> (Online ISSN: {JOURNAL_METADATA.issnOnline}, Print ISSN: {JOURNAL_METADATA.issnPrint}) is an independent, peer-reviewed, open-access academic rolling publication dedicated to advancing critical, evidence-informed, and multidimensional understandings of crime, criminality, victimisation, institutional justice, and society within India and the Global South.
          </p>
          <p>
            The journal operates as a continuous publication forum, ensuring that validated scholarship on statutory reforms, forensic sciences, and constitutional criminal jurisprudence is published immediately as an official Version of Record with persistent Crossref DOIs.
          </p>
        </div>
      </section>

      {/* 2. Mission & Vision */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent-navy)]/10 text-[var(--accent-navy)] flex items-center justify-center">
            <Target className="w-5 h-5 text-[var(--accent-gold)]" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[var(--text-primary)]">Our Mission</h3>
          <p className="text-sm text-[var(--text-secondary)] font-serif leading-relaxed">
            To dismantle disciplinary silos in the study of crime and justice by providing a rigorous, diamond open-access platform that unifies statutory criminal law, empirical forensic validation, behavioural psychology, and carceral sociology to inform judicial rulings, policy reforms, and police practices.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent-navy)]/10 text-[var(--accent-navy)] flex items-center justify-center">
            <Compass className="w-5 h-5 text-[var(--accent-gold)]" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[var(--text-primary)]">Our Vision</h3>
          <p className="text-sm text-[var(--text-secondary)] font-serif leading-relaxed">
            To become the premier reference journal in India and the Global South for multi-perspective criminological and legal scholarship, anchoring statutory transformation under the Bharatiya Nyaya Sanhita (BNS), BNSS, and BSA to constitutional due process and forensic integrity.
          </p>
        </div>
      </section>

      {/* 3. Why the Journal Exists */}
      <section className="p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)]">
          3. Why the Journal Exists: The Challenge of Disciplinary Silos
        </h2>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] font-serif leading-relaxed">
          In contemporary India, legal scholars debate statutory provisions in law reviews without deep engagement with laboratory forensic calibration limits. Forensic scientists publish chemical and digital extraction methods without scrutinizing Article 21 due process standards. Police researchers study beat operationalization in isolation from carceral sociology.
        </p>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] font-serif leading-relaxed">
          <em>The Crime & Society Review</em> exists precisely to bridge these divides. When an algorithmic facial recognition alert or electronic hash log is contested in an Indian courtroom, justice requires that law, computational science, eyewitness psychology, and constitutional doctrine be examined concurrently.
        </p>
      </section>

      {/* 4. Interdisciplinary Philosophy: The Rashomon Paradigm */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)]">
          4. Interdisciplinary Philosophy
        </h2>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] font-serif leading-relaxed">
          The journal is grounded in the <strong>Rashomon Approach</strong>—the recognition that any single crime or justice event represents multiple simultaneous realities depending upon the disciplinary prism of the observer:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          {[
            { label: "Legal Lens", desc: "Statutory offence definition, elements of mens rea, and procedural admissibility." },
            { label: "Forensic Lens", desc: "Physical evidence calibration, DNA mixtures, and digital hash verification." },
            { label: "Psychological Lens", desc: "Behavioural motivations, trauma responses, and interrogation coercion risks." },
            { label: "Sociological Lens", desc: "Structural inequality, community deviance, and carceral undertrial pendency." },
            { label: "Policing Lens", desc: "Field constraints, Section 105 BNSS videography, and rapid cyber containment." },
            { label: "Victimological Lens", desc: "Lived harm, institutional secondary victimization, and restorative restitution." }
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
              <span className="font-mono text-xs font-bold text-[var(--accent-gold)] block">{item.label}</span>
              <p className="text-xs text-[var(--text-secondary)] mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Who We Publish For */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
          <Users className="w-5 h-5 text-[var(--accent-navy)]" />
          <span>5. Who We Publish For</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
            <span className="font-bold text-[var(--text-primary)] block">Academic Researchers & Professors</span>
            <p className="text-[var(--text-secondary)] mt-1 font-serif">Faculty across National Law Universities, Central/State Universities, NFSU, and IITs seeking UGC-CARE aligned CAS publication.</p>
          </div>
          <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
            <span className="font-bold text-[var(--text-primary)] block">Judiciary & Legal Advocates</span>
            <p className="text-[var(--text-secondary)] mt-1 font-serif">Judges, judicial law clerks, senior advocates, and legal aid attorneys requiring authoritative doctrinal analysis.</p>
          </div>
          <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
            <span className="font-bold text-[var(--text-primary)] block">Forensic Scientists & Laboratory Examiners</span>
            <p className="text-[var(--text-secondary)] mt-1 font-serif">Examiners at CFSLs, State FSLs, and private forensic digital investigators establishing evidentiary benchmarks.</p>
          </div>
          <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
            <span className="font-bold text-[var(--text-primary)] block">Law Enforcement & Policy Think Tanks</span>
            <p className="text-[var(--text-secondary)] mt-1 font-serif">Police officers, BPR&D analysts, cyber crime divisions, and Ministry of Home Affairs policy consultants.</p>
          </div>
        </div>
      </section>

      {/* 6. Academic Positioning & Indexing */}
      <section className="p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
          <Award className="w-5 h-5 text-[var(--accent-gold)]" />
          <span>6. Academic Positioning & Indexing</span>
        </h2>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] font-serif leading-relaxed">
          The journal adheres to the highest international editorial benchmarks:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 rounded-lg bg-[var(--bg-card-hover)] border border-[var(--border-subtle)]">
            <span className="font-bold text-[var(--accent-navy)] block">UGC-CARE</span>
            <span className="text-[var(--text-muted)]">Category II Aligned</span>
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-card-hover)] border border-[var(--border-subtle)]">
            <span className="font-bold text-[var(--accent-navy)] block">ICI</span>
            <span className="text-[var(--text-muted)]">Indian Citation Index</span>
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-card-hover)] border border-[var(--border-subtle)]">
            <span className="font-bold text-[var(--accent-navy)] block">CROSSREF</span>
            <span className="text-[var(--text-muted)]">DOI: 10.59821/csr</span>
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-card-hover)] border border-[var(--border-subtle)]">
            <span className="font-bold text-[var(--accent-navy)] block">DIAMOND OA</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">100% Free / ₹0 APC</span>
          </div>
        </div>

        <div className="pt-4 flex items-center justify-between gap-4 border-t border-[var(--border-subtle)]">
          <Link
            to="/aims-scope"
            className="text-xs font-semibold text-[var(--accent-navy)] hover:underline flex items-center gap-1"
          >
            <span>Explore Comprehensive Aims & Scope</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            to="/submit"
            className="px-4 py-2 rounded-lg bg-[var(--accent-gold)] text-slate-950 font-bold text-xs hover:bg-[var(--accent-gold-hover)] transition-colors"
          >
            Submit Manuscript
          </Link>
        </div>
      </section>
    </div>
  );
};
