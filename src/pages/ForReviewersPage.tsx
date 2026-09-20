import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Award, 
  Lock, 
  AlertTriangle, 
  Clock, 
  Send, 
  FileText, 
  HelpCircle,
  ArrowRight,
  UserCheck,
  Scale
} from 'lucide-react';
import { FOR_REVIEWERS_DATA } from '../data/mockJournalData';

export const ForReviewersPage: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    discipline: 'legal',
    orcid: '',
    bio: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-16 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-[var(--border-subtle)] pb-8 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-[var(--accent-gold)]">
          <ShieldCheck className="w-4 h-4" />
          <span>Peer Review Governance • Reviewer Hub</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[var(--text-primary)] tracking-tight">
          Information &amp; Guidelines for Reviewers
        </h1>
        <p className="font-serif italic text-base sm:text-xl text-[var(--accent-gold)]">
          Upholding Intellectual Rigour, Forensic Validity, and Constitutional Fidelity in Indian Criminology
        </p>
      </div>

      {/* Reviewer Role & Value */}
      <section className="p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)]">
          The Crucial Role of Scholarly Referees
        </h2>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] font-serif leading-relaxed">
          Peer reviewers are the cornerstone of <em>The Crime &amp; Society Review</em>'s scholarly excellence. Referees ensure that every published article represents verifiable empirical evidence, sound statutory analysis under the Bharatiya Nyaya Sanhita (BNS) and Bharatiya Sakshya Adhiniyam (BSA), and actionable insights for courtrooms and law enforcement.
        </p>
        <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-[var(--accent-navy)]">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Strict Double-Blind Anonymity</span>
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>14–21 Day Standard Turnaround</span>
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>COPE Ethical Compliance</span>
          </span>
        </div>
      </section>

      {/* 1. Core Principles for Reviewers */}
      <section className="space-y-6">
        <div className="border-b border-[var(--border-subtle)] pb-2">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
            1. Fundamental Review Principles
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-serif mt-1">
            Expected from all empanelled peer reviewers across legal, forensic, and social science disciplines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FOR_REVIEWERS_DATA.principles.map((pr, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-2 shadow-2xs"
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[var(--accent-navy)] text-white text-xs font-bold flex items-center justify-center font-mono">
                  {idx + 1}
                </span>
                <span className="font-serif font-bold text-base text-[var(--text-primary)]">
                  {pr.title}
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] font-serif leading-relaxed">
                {pr.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Review Criteria Checklist */}
      <section className="p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-6">
        <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
          <Scale className="w-5 h-5 text-[var(--accent-gold)]" />
          <span>2. Standard Review Assessment Criteria</span>
        </h2>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-serif">
          Referees evaluate manuscripts on the online portal using the following structured rubric:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {FOR_REVIEWERS_DATA.criteria.map((crit, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2.5 p-3 rounded-lg bg-[var(--bg-page)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] font-serif"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>{crit}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Confidentiality & Conflicts of Interest */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-3">
          <div className="flex items-center gap-2 text-[var(--accent-navy)]">
            <Lock className="w-5 h-5 text-[var(--accent-gold)]" />
            <h3 className="font-serif font-bold text-lg text-[var(--text-primary)]">
              Strict Confidentiality
            </h3>
          </div>
          <p className="text-xs text-[var(--text-secondary)] font-serif leading-relaxed">
            Manuscripts received for review must be treated as privileged confidential documents. Referees must not share, cite, or use unpublished findings or empirical datasets for their own research prior to formal publication.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-3">
          <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="font-serif font-bold text-lg text-[var(--text-primary)]">
              Conflict of Interest &amp; Recusal
            </h3>
          </div>
          <p className="text-xs text-[var(--text-secondary)] font-serif leading-relaxed">
            Referees must decline to review manuscripts authored by current departmental colleagues, recent co-authors within 36 months, or if financial or commercial conflicts exist regarding forensic products or commercial litigation.
          </p>
        </div>
      </section>

      {/* 4. Reviewer Recognition & Credit */}
      <section className="p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
          <Award className="w-5 h-5 text-[var(--accent-gold)]" />
          <span>4. Reviewer Recognition &amp; Academic Credit</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-serif text-[var(--text-secondary)]">
          <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-1">
            <span className="font-bold text-[var(--text-primary)] block">Annual Roll of Honor</span>
            <p>Annual publication of reviewer names in the final volume issue acknowledging their scholarly contribution.</p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-1">
            <span className="font-bold text-[var(--text-primary)] block">Web of Science / ORCID</span>
            <p>Direct sync with ORCID Peer Review profiles and Clarivate Web of Science Reviewer Recognition.</p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-1">
            <span className="font-bold text-[var(--text-primary)] block">Official Certificate</span>
            <p>Instant digital Certificate of Scholarly Contribution signed by the Editor-in-Chief for CAS/promotion.</p>
          </div>
        </div>
      </section>

      {/* 5. Become a Reviewer Form */}
      <section className="p-8 rounded-3xl border border-[var(--border-strong)] bg-[var(--bg-card)] space-y-6 shadow-md">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-[var(--accent-gold)]">
            <UserCheck className="w-4 h-4" />
            <span>Join Our Empanelled Peer Reviewer Pool</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
            Register as a Peer Reviewer
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-serif">
            We invite legal scholars, forensic practitioners, judges, and criminologists holding a PhD or substantive institutional research experience.
          </p>
        </div>

        {formSubmitted ? (
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
            <h3 className="font-serif font-bold text-lg text-[var(--text-primary)]">
              Thank You! Your Reviewer Expression of Interest Has Been Received.
            </h3>
            <p className="text-xs text-[var(--text-secondary)] max-w-md mx-auto font-serif">
              The Managing Editor will verify your ORCID and institutional profile and contact you within 5 working days with your reviewer credentials.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
                  Full Name &amp; Academic Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Dr. Meenakshi Sundaram, Assistant Professor"
                  className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-[var(--text-primary)] focus:outline-hidden focus:ring-1 focus:ring-[var(--accent-navy)]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
                  Official Institutional Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g., m.sundaram@nlu.ac.in"
                  className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-[var(--text-primary)] focus:outline-hidden focus:ring-1 focus:ring-[var(--accent-navy)]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
                  University / Forensic Lab / Court Affiliation *
                </label>
                <input
                  type="text"
                  required
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  placeholder="e.g., National Law University, Delhi / Central FSL"
                  className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-[var(--text-primary)] focus:outline-hidden focus:ring-1 focus:ring-[var(--accent-navy)]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
                  Primary Review Discipline *
                </label>
                <select
                  value={formData.discipline}
                  onChange={(e) => setFormData({ ...formData, discipline: e.target.value })}
                  className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-[var(--text-primary)] focus:outline-hidden focus:ring-1 focus:ring-[var(--accent-navy)]"
                >
                  <option value="legal">Law &amp; Statutory Jurisprudence (BNS / BSA)</option>
                  <option value="forensic">Forensic Science &amp; Digital Hash Logs</option>
                  <option value="policing">Policing &amp; Investigation Protocols (BNSS)</option>
                  <option value="psychology">Forensic Psychology &amp; Cognitive Bias</option>
                  <option value="sociology">Carceral Sociology &amp; Criminology</option>
                  <option value="victimology">Victimology &amp; Restorative Justice</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
                  ORCID iD (Recommended)
                </label>
                <input
                  type="text"
                  value={formData.orcid}
                  onChange={(e) => setFormData({ ...formData, orcid: e.target.value })}
                  placeholder="e.g., 0000-0002-1234-5678"
                  className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-[var(--text-primary)] focus:outline-hidden focus:ring-1 focus:ring-[var(--accent-navy)]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
                  Key Research Interests / Areas of Referee Expertise *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="e.g., Section 63 BSA electronic evidence, ballistics, undertrial rights, prison ethnography..."
                  className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-[var(--text-primary)] focus:outline-hidden focus:ring-1 focus:ring-[var(--accent-navy)]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[var(--accent-navy)] text-white text-xs font-bold hover:opacity-90 transition-opacity flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Reviewer Application</span>
            </button>
          </form>
        )}
      </section>
    </div>
  );
};
