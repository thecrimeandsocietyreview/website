import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Scale, 
  Target, 
  Compass, 
  Users, 
  Award, 
  ShieldCheck, 
  BookOpen, 
  ArrowRight,
  Clock,
  Calendar,
  Building2,
  Globe,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { JOURNAL_METADATA, PUBLISHER_PROFILE, JOURNAL_HISTORY_TIMELINE } from '../data/mockJournalData';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-16 animate-fadeIn">
      {/* Header Banner */}
      <div className="border-b border-[var(--border-subtle)] pb-8 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-[var(--accent-gold)]">
          <BookOpen className="w-4 h-4" />
          <span>Institutional Profile • About the Journal</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[var(--text-primary)] tracking-tight">
          About The Crime &amp; Society Review
        </h1>
        <p className="font-serif italic text-base sm:text-xl text-[var(--accent-gold)]">
          An Interdisciplinary Scholarly Forum for Law, Forensics, Policing, and Criminology
        </p>
      </div>

      {/* 1. ABOUT THE CRIME & SOCIETY REVIEW */}
      <section className="p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-[var(--accent-gold)]">
          <Scale className="w-4 h-4" /> Section 1
        </div>
        <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)]">
          About The Crime &amp; Society Review
        </h2>
        <div className="prose prose-slate dark:prose-invert max-w-none text-sm sm:text-base text-[var(--text-secondary)] font-serif leading-relaxed space-y-4">
          <p>
            <strong>The Crime &amp; Society Review</strong> (Online ISSN: {JOURNAL_METADATA.issnOnline}, Print ISSN: {JOURNAL_METADATA.issnPrint}) is an independent, peer-reviewed, open-access academic rolling publication dedicated to advancing critical, evidence-informed, and multidimensional understandings of crime, criminality, victimisation, institutional justice, and society within India and the Global South.
          </p>
          <p>
            The journal operates as an interdisciplinary continuous publication forum, ensuring that validated scholarship on statutory reforms, forensic sciences, and constitutional criminal jurisprudence is published as an authoritative, publicly accessible Version of Record.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 text-xs font-mono">
          <div className="p-3 rounded-lg bg-[var(--bg-card-hover)] border border-[var(--border-subtle)]">
            <span className="text-[var(--text-muted)] block text-[10px]">ONLINE ISSN</span>
            <span className="font-bold text-[var(--text-primary)]">{JOURNAL_METADATA.issnOnline}</span>
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-card-hover)] border border-[var(--border-subtle)]">
            <span className="text-[var(--text-muted)] block text-[10px]">PRINT ISSN</span>
            <span className="font-bold text-[var(--text-primary)]">{JOURNAL_METADATA.issnPrint}</span>
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-card-hover)] border border-[var(--border-subtle)]">
            <span className="text-[var(--text-muted)] block text-[10px]">ACCESS MODEL</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">Diamond Open Access</span>
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-card-hover)] border border-[var(--border-subtle)]">
            <span className="text-[var(--text-muted)] block text-[10px]">PUBLICATION</span>
            <span className="font-bold text-[var(--accent-gold)]">Continuous Rolling</span>
          </div>
        </div>
      </section>

      {/* 2. JOURNAL MISSION */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-7 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent-navy)]/10 text-[var(--accent-navy)] flex items-center justify-center">
            <Target className="w-5 h-5 text-[var(--accent-gold)]" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[var(--text-primary)]">
            Journal Mission
          </h3>
          <p className="text-sm text-[var(--text-secondary)] font-serif leading-relaxed">
            To dismantle disciplinary silos in the study of crime and justice by providing a rigorous, open-access platform that unifies statutory criminal law, empirical forensic validation, behavioural psychology, and carceral sociology to inform judicial rulings, policy reforms, and frontline policing practices.
          </p>
        </div>

        <div className="p-7 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent-navy)]/10 text-[var(--accent-navy)] flex items-center justify-center">
            <Compass className="w-5 h-5 text-[var(--accent-gold)]" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[var(--text-primary)]">
            Journal Vision
          </h3>
          <p className="text-sm text-[var(--text-secondary)] font-serif leading-relaxed">
            To serve as the premier reference journal in India and the Global South for multi-perspective criminological and legal scholarship, anchoring statutory transformation under the Bharatiya Nyaya Sanhita (BNS), BNSS, and BSA to constitutional due process and forensic integrity.
          </p>
        </div>
      </section>

      {/* 3. EDITORIAL PHILOSOPHY */}
      <section className="p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-[var(--accent-gold)]">
            <Compass className="w-4 h-4" /> Section 3
          </div>
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
              desc: "Breaking institutional silos between the bench, the bar, the forensic laboratory, and the academy through the Rashomon Approach."
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

        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--text-muted)] border-t border-[var(--border-subtle)]">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>COPE Core Practices Aligned</span>
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Double-Blind Peer Review</span>
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>ICMR Ethical Guidelines</span>
          </span>
        </div>
      </section>

      {/* 4. JOURNAL HISTORY */}
      <section className="space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-[var(--accent-gold)]">
            <Clock className="w-4 h-4" /> Section 4
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
            Journal History
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-serif">
            Conception, founding charter, and response to statutory transformation in Indian criminal law.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-4">
          <h3 className="font-serif text-lg font-bold text-[var(--text-primary)]">
            The Genesis: Responding to Historic Statutory Reform
          </h3>
          <p className="text-sm text-[var(--text-secondary)] font-serif leading-relaxed">
            The Crime &amp; Society Review was conceived during a pivotal historical juncture in Indian legal history: the legislative repeal of the colonial Indian Penal Code of 1860, the Code of Criminal Procedure of 1973, and the Indian Evidence Act of 1872, and their replacement by the <strong>Bharatiya Nyaya Sanhita, 2023 (BNS)</strong>, the <strong>Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS)</strong>, and the <strong>Bharatiya Sakshya Adhiniyam, 2023 (BSA)</strong>.
          </p>
          <p className="text-sm text-[var(--text-secondary)] font-serif leading-relaxed">
            As these historic statutes transformed the architecture of Indian criminal justice, legal scholars, forensic practitioners, and police researchers recognized that scholarly inquiry remained deeply fragmented. To bridge these divides, a collaborative collective founded <em>The Crime &amp; Society Review</em> as an independent, diamond open-access forum anchored in the <strong>Rashomon Approach</strong>.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative border-l-2 border-[var(--accent-gold)]/30 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-6">
          {JOURNAL_HISTORY_TIMELINE.map((step, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-[var(--bg-page)] border-2 border-[var(--accent-gold)] text-[var(--accent-gold)] flex items-center justify-center shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-gold)]"></span>
              </div>
              <div className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="px-2 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase bg-[var(--accent-navy)]/10 text-[var(--accent-navy)]">
                    Phase 0{idx + 1}: {step.phase}
                  </span>
                  <span className="font-mono text-[11px] text-[var(--accent-gold)] font-bold flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {step.period}
                  </span>
                </div>
                <h4 className="font-serif text-base font-bold text-[var(--text-primary)]">
                  {step.title}
                </h4>
                <p className="text-xs text-[var(--text-secondary)] font-serif leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PUBLISHER */}
      <section className="p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-[var(--accent-gold)]">
            <Building2 className="w-4 h-4" /> Section 5
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
            Publisher: {PUBLISHER_PROFILE.name}
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-serif">
            Non-Profit Scholarly Publishing Infrastructure &amp; Institutional Governance
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none text-sm text-[var(--text-secondary)] font-serif leading-relaxed space-y-3">
          <p>
            <strong>{PUBLISHER_PROFILE.name}</strong> is an independent non-profit academic publishing entity registered under Indian educational trust statutes in New Delhi. The Press was established specifically to maintain the technological, archival, and editorial infrastructure of <em>The Crime &amp; Society Review</em> without commercial shareholder obligations or paywall incentives.
          </p>
          <p>
            Unlike commercial journal conglomerates that levy high Article Processing Charges on scholars, the Press operates under a sustained <strong>Diamond Open Access endowment framework</strong> funded by non-profit philanthropic grants and academic consortium agreements.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-[var(--bg-card-hover)] border border-[var(--border-subtle)]">
            <span className="text-[var(--text-muted)] block text-[10px] uppercase">Entity Classification</span>
            <strong className="text-[var(--text-primary)]">{PUBLISHER_PROFILE.entityType}</strong>
          </div>
          <div className="p-3.5 rounded-xl bg-[var(--bg-card-hover)] border border-[var(--border-subtle)]">
            <span className="text-[var(--text-muted)] block text-[10px] uppercase">Registered Offices</span>
            <strong className="text-[var(--text-primary)]">{PUBLISHER_PROFILE.location}</strong>
          </div>
          <div className="p-3.5 rounded-xl bg-[var(--bg-card-hover)] border border-[var(--border-subtle)]">
            <span className="text-[var(--text-muted)] block text-[10px] uppercase">Financial Model</span>
            <strong className="text-emerald-600 dark:text-emerald-400">100% Non-Commercial / ₹0 APC</strong>
          </div>
        </div>

        <div className="p-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400">
            <ShieldCheck className="w-4 h-4" /> Academic Independence &amp; Editorial Firewall
          </div>
          <p className="text-xs text-[var(--text-secondary)] font-serif leading-relaxed">
            The publisher strictly enforces an institutional firewall between business administration and editorial judgment. Neither trustees nor funding patrons possess authority over manuscript acceptance, rejection, or editorial policy, which remains under the complete independence of the editorial board.
          </p>
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
