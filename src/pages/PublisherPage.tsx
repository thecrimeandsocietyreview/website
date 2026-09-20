import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  Award, 
  Globe, 
  BookOpen, 
  FileText, 
  Lock, 
  Scale, 
  ArrowRight,
  HeartHandshake
} from 'lucide-react';
import { PUBLISHER_PROFILE, JOURNAL_METADATA } from '../data/mockJournalData';

export const PublisherPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-16 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-[var(--border-subtle)] pb-8 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-[var(--accent-gold)]">
          <Building2 className="w-4 h-4" />
          <span>Institutional Publisher Profile</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[var(--text-primary)] tracking-tight">
          About the Publisher
        </h1>
        <p className="font-serif italic text-base sm:text-xl text-[var(--accent-gold)]">
          {PUBLISHER_PROFILE.name} • Non-Profit Scholarly Infrastructure
        </p>
      </div>

      {/* 1. Publisher Identity & Entity Overview */}
      <section className="p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)]">
          1. Publisher Identity &amp; Corporate Form
        </h2>
        <div className="prose prose-slate dark:prose-invert max-w-none text-sm sm:text-base text-[var(--text-secondary)] font-serif leading-relaxed space-y-3">
          <p>
            <strong>{PUBLISHER_PROFILE.name}</strong> is an independent non-profit academic publishing entity registered under Indian educational trust statutes in New Delhi. The Press was established specifically to maintain the technological, archival, and editorial infrastructure of <em>The Crime &amp; Society Review</em> without commercial shareholder obligations or paywall incentives.
          </p>
          <p>
            Unlike commercial journal conglomerates that levy exorbitant Article Processing Charges (APCs) on authors, the Press operates under a strictly sustained <strong>Diamond Open Access endowment framework</strong> funded by non-profit philanthropic grants and academic consortium agreements.
          </p>
        </div>
        <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
          <div className="p-3 rounded-lg bg-[var(--bg-page)] border border-[var(--border-subtle)]">
            <span className="text-[var(--text-muted)] block text-[10px] uppercase">Entity Classification</span>
            <strong className="text-[var(--text-primary)]">{PUBLISHER_PROFILE.entityType}</strong>
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-page)] border border-[var(--border-subtle)]">
            <span className="text-[var(--text-muted)] block text-[10px] uppercase">Registered Offices</span>
            <strong className="text-[var(--text-primary)]">{PUBLISHER_PROFILE.location}</strong>
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-page)] border border-[var(--border-subtle)]">
            <span className="text-[var(--text-muted)] block text-[10px] uppercase">Financial Model</span>
            <strong className="text-emerald-600 dark:text-emerald-400">100% Non-Commercial / ₹0 APC</strong>
          </div>
        </div>
      </section>

      {/* 2. Institutional Framework */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
          <Globe className="w-5 h-5 text-[var(--accent-navy)]" />
          <span>2. Institutional Cooperation Framework</span>
        </h2>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] font-serif leading-relaxed">
          {PUBLISHER_PROFILE.framework}
        </p>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] font-serif leading-relaxed">
          While operating under total academic independence, the publisher maintains collaborative linkages with major national institutions, including the <strong>National Forensic Sciences University (NFSU)</strong>, leading <strong>National Law Universities (NLUs)</strong>, and the <strong>Bureau of Police Research and Development (BPR&amp;D)</strong>, ensuring that research published in the review is directly accessible to judges, forensic examiners, and state police training academies.
        </p>
      </section>

      {/* 3. Publisher Mission */}
      <section className="p-8 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white border border-amber-500/30 space-y-3 shadow-xl">
        <span className="text-xs font-mono uppercase font-bold text-[var(--accent-gold)] tracking-widest block">
          Institutional Mandate
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
          Our Publishing Mission
        </h2>
        <p className="font-serif text-base sm:text-lg text-slate-200 italic leading-relaxed">
          "{PUBLISHER_PROFILE.mission}"
        </p>
      </section>

      {/* 4. Publishing Principles & Research Integrity */}
      <section className="space-y-6">
        <div className="border-b border-[var(--border-subtle)] pb-2">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
            4. Core Publishing Principles &amp; Ethics
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-serif mt-1">
            The non-negotiable commitments governing all publication and dissemination activities of the Press.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PUBLISHER_PROFILE.publishingPrinciples.map((principle, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-2 shadow-2xs"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <h3 className="font-serif font-bold text-base text-[var(--text-primary)]">
                  {principle.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-serif leading-relaxed">
                {principle.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Academic Independence & COPE Governance */}
      <section className="p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-500" />
          <span>5. Academic Independence &amp; Firewall</span>
        </h2>
        <div className="prose prose-slate dark:prose-invert max-w-none text-sm text-[var(--text-secondary)] font-serif leading-relaxed space-y-3">
          <p>
            The publisher strictly enforces an institutional firewall between business administration and editorial judgment. Neither the Board of Trustees nor funding patrons possess authority over manuscript acceptance, rejection, or editorial policy.
          </p>
          <p>
            The Editor-in-Chief and empanelled peer reviewers exercise unfettered scientific autonomy, guided exclusively by the Committee on Publication Ethics (COPE) Core Practices and UGC Academic Integrity Regulations.
          </p>
        </div>
      </section>

      {/* Contact Publisher */}
      <section className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-serif font-bold text-base text-[var(--text-primary)]">
            Institutional Consortium &amp; Library Enquiries
          </h3>
          <p className="text-xs text-[var(--text-secondary)] font-serif">
            For university library repository harvesting, OAI-PMH feeds, or institutional partnerships.
          </p>
        </div>
        <Link
          to="/contact"
          className="shrink-0 px-5 py-2.5 rounded-lg bg-[var(--accent-navy)] text-white text-xs font-semibold hover:opacity-90 transition-opacity"
        >
          Contact Publisher Office
        </Link>
      </section>
    </div>
  );
};
