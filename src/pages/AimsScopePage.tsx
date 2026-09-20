import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Target, 
  Layers, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Search,
  Filter,
  Download
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
          <span>Editorial Mandate • Research Parameters</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[var(--text-primary)] tracking-tight">
          Aims & Scope
        </h1>
        <p className="font-serif italic text-base sm:text-xl text-[var(--accent-gold)]">
          The Comprehensive Scholarly Domain of The Crime & Society Review
        </p>
      </div>

      {/* 1. Aim Statement */}
      <section className="p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)]">
          1. Journal Aim Statement
        </h2>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] font-serif leading-relaxed">
          <strong>The Crime & Society Review</strong> is committed to advancing the systematic, critical, and evidence-informed study of crime, policing, forensic sciences, criminal law, and their complex societal manifestations across India and the Global South. The journal seeks to provide a premier scholarly forum for research examining the implementation, impact, and constitutional validity of the <strong>Bharatiya Nyaya Sanhita (BNS, 2023)</strong>, the <strong>Bharatiya Nagarik Suraksha Sanhita (BNSS, 2023)</strong>, and the <strong>Bharatiya Sakshya Adhiniyam (BSA, 2023)</strong> alongside established forensic and sociological doctrines.
        </p>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] font-serif leading-relaxed">
          Particular priority is accorded to scholarship that translates empirical research into concrete institutional implications for Indian trial courts, High Courts, the Supreme Court of India, state police cadres, forensic science laboratories, and prison directorates.
        </p>
      </section>

      {/* 2. Scope & Research Areas (20 Distinct Categories) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
              2. Research Areas & Subject Scope (20 Core Categories)
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
              Directly derived from the journal’s interdisciplinary charter.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[var(--text-muted)]" />
            <input
              type="text"
              value={filterQuery}
              onChange={e => setFilterQuery(e.target.value)}
              placeholder="Filter research areas..."
              className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {filteredCategories.map((cat, idx) => (
            <div 
              key={cat.id}
              className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--accent-gold)] transition-colors flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)] mb-1.5">
                  <span className="font-bold text-[var(--accent-gold)]">#{String(idx + 1).padStart(2, '0')}</span>
                  <span className="group-hover:text-[var(--accent-navy)] transition-colors">Category</span>
                </div>
                <h3 className="font-serif font-bold text-sm text-[var(--text-primary)] group-hover:text-[var(--accent-navy)] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-1.5 leading-relaxed font-serif">
                  {cat.desc}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-[var(--border-subtle)]/60">
                <Link
                  to={`/explore?category=${encodeURIComponent(cat.name)}`}
                  className="text-[11px] font-semibold text-[var(--accent-navy)] hover:underline flex items-center gap-1"
                >
                  <span>Explore Articles</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Accepted Contribution Types (8 Types) */}
      <section className="space-y-6">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
            3. Accepted Contribution Types (8 Formats)
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
            Authors may submit scholarship under any of the following eight established formats:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ACCEPTED_ARTICLE_TYPES_8.map((item, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] flex flex-col justify-between space-y-2 hover:border-[var(--border-strong)] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-serif font-bold text-sm text-[var(--text-primary)]">
                    {item.type}
                  </span>
                  <FileText className="w-4 h-4 text-[var(--accent-gold)] shrink-0" />
                </div>
                <span className="inline-block px-2 py-0.5 rounded bg-[var(--bg-card)] border border-[var(--border-subtle)] font-mono text-[10px] text-[var(--accent-gold)] font-bold mt-1">
                  {item.wordCount}
                </span>
                <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="pt-2 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Continuous Rolling Review</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Interdisciplinary & Emerging Criminality Mandate */}
      <section className="p-8 rounded-2xl border border-[var(--border-subtle)] bg-gradient-to-br from-[var(--bg-card)] via-[var(--bg-card-hover)] to-[var(--bg-card)] space-y-6">
        <div>
          <span className="text-xs font-mono uppercase font-bold text-[var(--accent-gold)] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> Focus Areas
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mt-1">
            Interdisciplinary Research & Emerging Crime Fronts
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm font-serif text-[var(--text-secondary)] leading-relaxed">
          <div className="space-y-2">
            <h3 className="font-bold text-[var(--text-primary)] font-sans text-sm">
              Cross-Disciplinary Methodological Synthesis
            </h3>
            <p>
              The journal actively encourages manuscripts co-authored across disciplines—such as a computer scientist and criminal defense advocate auditing algorithmic bias, or a forensic toxicologist and constitutional jurist analyzing evidentiary chain-of-custody standards under Section 63 BSA.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-[var(--text-primary)] font-sans text-sm">
              Frontier & Emerging Criminality
            </h3>
            <p>
              Special priority tracks evaluate emergent harms: artificial intelligence forensic tampering, deepfake child sexual abuse material, transnational mule banking syndicates, biometric data theft, and neuro-technological interrogation ethics.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs font-mono text-[var(--text-muted)]">
            Manuscripts are evaluated through double-blind peer review within 14–21 days.
          </span>
          <Link
            to="/submit"
            className="px-5 py-2.5 rounded-xl bg-[var(--accent-gold)] text-slate-950 font-bold text-xs hover:bg-[var(--accent-gold-hover)] transition-all shadow-sm flex items-center gap-1.5"
          >
            <span>Submit Manuscript Under Scope</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
};
