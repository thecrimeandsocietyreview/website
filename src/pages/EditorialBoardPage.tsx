import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Award, 
  ShieldCheck, 
  Building2, 
  Scale,
  Microscope,
  Brain,
  Landmark,
  ShieldAlert,
  HeartHandshake,
  ArrowDown,
  BookOpen,
  Mail,
  UserCheck
} from 'lucide-react';

// Professional Academic Silhouette Dummy Photo Component
const DummyPhoto: React.FC<{ size?: 'lg' | 'md'; label?: string }> = ({ size = 'md', label = 'Photo Pending' }) => {
  const isLarge = size === 'lg';
  return (
    <div 
      className={`relative rounded-xl border border-[var(--border-strong)] bg-neutral-100 dark:bg-neutral-800/80 flex flex-col items-center justify-center shrink-0 overflow-hidden shadow-2xs group ${
        isLarge ? 'w-32 h-40 sm:w-40 sm:h-48' : 'w-24 h-28 sm:w-28 sm:h-32'
      }`}
      aria-label="Official photo placeholder"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-200/20 to-neutral-300/40 dark:from-transparent dark:via-neutral-700/20 dark:to-neutral-900/40" />

      {/* Academic Portrait Silhouette */}
      <svg
        className="w-full h-full p-2 text-neutral-300 dark:text-neutral-600 transition-transform group-hover:scale-105"
        viewBox="0 0 120 130"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="60" cy="45" r="25" opacity="0.9" />
        <path d="M16 122c0-24.3 19.7-44 44-44s44 19.7 44 44v8H16v-8z" opacity="0.9" />
      </svg>

      {/* Label Badge */}
      <div className="absolute bottom-1.5 inset-x-2 text-center">
        <span className="inline-block text-[9px] font-mono tracking-wider uppercase text-neutral-500 dark:text-neutral-400 bg-white/85 dark:bg-neutral-900/85 backdrop-blur-xs px-2 py-0.5 rounded border border-neutral-200 dark:border-neutral-700">
          {label}
        </span>
      </div>
    </div>
  );
};

export const EditorialBoardPage: React.FC = () => {
  const editorialBoardMembers = [
    {
      discipline: "Criminal Jurisprudence & Statutory Review",
      focus: "Bharatiya Nyaya Sanhita (BNS), BNSS procedural codification, and BSA evidentiary standards.",
      icon: Scale,
      institution: "Faculty of Law / University Department",
      status: "Inaugural Appointment Underway"
    },
    {
      discipline: "Forensic Sciences & Evidentiary Proof",
      focus: "Digital hashes, DNA profiling, electronic records validation under Section 63 BSA, and laboratory protocols.",
      icon: Microscope,
      institution: "Forensic Science Institute / Laboratory",
      status: "Inaugural Appointment Underway"
    },
    {
      discipline: "Behavioural Psychology & Cognitive Science",
      focus: "Interrogation psychology, witness reliability, memory decay, and suspect examination safeguards.",
      icon: Brain,
      institution: "Department of Psychology / Behavioural Science",
      status: "Inaugural Appointment Underway"
    },
    {
      discipline: "Carceral Sociology & Penology",
      focus: "Undertrial pendency, prison reform directives, carceral sociology, and rehabilitative justice models.",
      icon: Landmark,
      institution: "Centre for Criminology & Social Justice",
      status: "Inaugural Appointment Underway"
    },
    {
      discipline: "Frontline Policing & Cyber Intelligence",
      focus: "Section 105 BNSS videography protocols, automated law enforcement technologies, and cyber forensic standards.",
      icon: ShieldAlert,
      institution: "Police Academy / Cyber Crime Research Centre",
      status: "Inaugural Appointment Underway"
    },
    {
      discipline: "Victimology & Constitutional Due Process",
      focus: "Article 21 fair trial guarantees, vulnerable witness protection, and restorative justice mechanisms.",
      icon: HeartHandshake,
      institution: "Human Rights & Constitutional Law Centre",
      status: "Inaugural Appointment Underway"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12 animate-fadeIn">
      {/* Page Header */}
      <div className="border-b border-[var(--border-subtle)] pb-8 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-[var(--accent-gold)]">
          <Users className="w-4 h-4" />
          <span>Editorial Governance • Peer Leadership</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[var(--text-primary)] tracking-tight">
          Editorial Board
        </h1>
        <p className="font-serif italic text-base sm:text-xl text-[var(--accent-gold)]">
          Scholarly Governance &amp; Multi-Perspective Peer Review Leadership
        </p>
      </div>

      {/* COPE Editorial Independence Charter Notice */}
      <section className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="font-serif font-bold text-base text-[var(--text-primary)] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <span>COPE-Aligned Editorial Independence &amp; Integrity</span>
          </h3>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-serif leading-relaxed">
            Editorial decision-making is insulated from publisher, financial, or institutional influence. Board members evaluate all manuscripts solely on scholarly merit, empirical rigour, and constitutional relevance.
          </p>
        </div>
        <Link
          to="/about"
          className="shrink-0 px-4 py-2 rounded-lg bg-[var(--accent-navy)] text-white text-xs font-semibold hover:opacity-90 transition-opacity"
        >
          About Journal
        </Link>
      </section>

      {/* Editorial Governance Hierarchy Flow */}
      <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-mono text-[var(--text-secondary)]">
        <span className="font-bold text-[var(--accent-navy)]">Governance Hierarchy:</span>
        <span className="px-3 py-1 rounded-md bg-[var(--bg-card)] border border-[var(--border-subtle)] font-semibold text-[var(--text-primary)]">
          1. Editor-in-Chief
        </span>
        <span className="text-[var(--accent-gold)] font-bold">↓</span>
        <span className="px-3 py-1 rounded-md bg-[var(--bg-card)] border border-[var(--border-subtle)] font-semibold text-[var(--text-primary)]">
          2. Managing Editor
        </span>
        <span className="text-[var(--accent-gold)] font-bold">↓</span>
        <span className="px-3 py-1 rounded-md bg-[var(--bg-card)] border border-[var(--border-subtle)] font-semibold text-[var(--text-primary)]">
          3. Editorial Board Members
        </span>
      </div>

      {/* ========================================================
          TIER 1: EDITOR-IN-CHIEF
      ======================================================== */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-[var(--border-subtle)] pb-3">
          <Award className="w-5 h-5 text-[var(--accent-gold)]" />
          <div>
            <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)]">
              Editor-in-Chief
            </h2>
            <p className="text-xs text-[var(--text-muted)]">
              Chief Academic Oversight, Editorial Integrity &amp; Scholarly Direction
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-card)] shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Dummy Photo */}
            <DummyPhoto size="lg" label="Photo Pending" />

            {/* Profile Info */}
            <div className="flex-1 text-center sm:text-left space-y-3">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="px-3 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[var(--accent-navy)] text-white">
                  Editor-in-Chief
                </span>
                <span className="px-3 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                  Appointment Under Finalization
                </span>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold text-[var(--text-primary)]">
                  To Be Announced
                </h3>
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-[var(--text-muted)] mt-1 font-mono">
                  <Building2 className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                  <span>Institutional Affiliation (Under Formal Confirmation)</span>
                </div>
              </div>

              <div className="inline-block px-3 py-1 rounded-md bg-[var(--bg-page)] text-[var(--text-secondary)] text-xs font-medium border border-[var(--border-subtle)]">
                Discipline: <strong className="text-[var(--text-primary)]">Criminal Jurisprudence &amp; Multidisciplinary Legal Studies</strong>
              </div>

              <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-serif leading-relaxed max-w-3xl">
                The Editor-in-Chief provides overall editorial leadership, presides over scholarly governance, ensures strict adherence to COPE publishing ethics and double-blind peer review protocols, and directs the multidisciplinary academic vision of <em>The Crime &amp; Society Review</em>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Downward Hierarchy Connector 1 */}
      <div className="flex flex-col items-center justify-center -my-4" aria-hidden="true">
        <div className="w-0.5 h-6 bg-[var(--border-strong)]" />
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] text-xs font-mono text-[var(--accent-gold)] shadow-2xs">
          <ArrowDown className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
          <span className="font-semibold uppercase text-[10px] tracking-wider">Reports &amp; Coordinates</span>
        </div>
        <div className="w-0.5 h-6 bg-[var(--border-strong)]" />
      </div>

      {/* ========================================================
          TIER 2: MANAGING EDITOR
      ======================================================== */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-[var(--border-subtle)] pb-3">
          <UserCheck className="w-5 h-5 text-[var(--accent-gold)]" />
          <div>
            <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)]">
              Managing Editor
            </h2>
            <p className="text-xs text-[var(--text-muted)]">
              Desk Intake Triage, Peer Review Operations &amp; Production Management
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-card)] shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Dummy Photo */}
            <DummyPhoto size="lg" label="Photo Pending" />

            {/* Profile Info */}
            <div className="flex-1 text-center sm:text-left space-y-3">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="px-3 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[var(--accent-navy)]/10 text-[var(--accent-navy)] border border-[var(--accent-navy)]/20">
                  Managing Editor
                </span>
                <span className="px-3 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                  Appointment Under Finalization
                </span>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold text-[var(--text-primary)]">
                  To Be Announced
                </h3>
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-[var(--text-muted)] mt-1 font-mono">
                  <Building2 className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                  <span>Editorial Secretariat / Institutional Affiliation</span>
                </div>
              </div>

              <div className="inline-block px-3 py-1 rounded-md bg-[var(--bg-page)] text-[var(--text-secondary)] text-xs font-medium border border-[var(--border-subtle)]">
                Focus: <strong className="text-[var(--text-primary)]">Editorial Workflow, Compliance Screening &amp; Peer Review Coordination</strong>
              </div>

              <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-serif leading-relaxed max-w-3xl">
                The Managing Editor oversees daily journal operations, preliminary manuscript triage, plagiarism and similarity screening (&lt;10% threshold), assignment of manuscripts to disciplinary review pools, and seamless communication with authors and peer reviewers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Downward Hierarchy Connector 2 */}
      <div className="flex flex-col items-center justify-center -my-4" aria-hidden="true">
        <div className="w-0.5 h-6 bg-[var(--border-strong)]" />
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] text-xs font-mono text-[var(--accent-gold)] shadow-2xs">
          <ArrowDown className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
          <span className="font-semibold uppercase text-[10px] tracking-wider">Disciplinary Subject Reviewers</span>
        </div>
        <div className="w-0.5 h-6 bg-[var(--border-strong)]" />
      </div>

      {/* ========================================================
          TIER 3: EDITORIAL BOARD MEMBERS
      ======================================================== */}
      <section className="space-y-6">
        <div className="border-b border-[var(--border-subtle)] pb-3">
          <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[var(--accent-gold)]" />
            <span>Editorial Board Members</span>
          </h2>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            Subject Matter Specialists, Track Convenors &amp; Disciplinary Peer Leaders
          </p>
        </div>

        {/* Member Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {editorialBoardMembers.map((member, idx) => {
            const Icon = member.icon;
            return (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--accent-gold)]/50 transition-all space-y-4 shadow-2xs group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    {/* Dummy Photo */}
                    <DummyPhoto size="md" label="Photo Pending" />

                    {/* Member Details */}
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wide bg-[var(--accent-navy)]/10 text-[var(--accent-navy)]">
                          Board Member
                        </span>
                        <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400">
                          Slot #{idx + 1}
                        </span>
                      </div>

                      <h3 className="font-serif text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-navy)] transition-colors">
                        To Be Announced
                      </h3>

                      <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-mono">
                        <Building2 className="w-3.5 h-3.5 shrink-0 text-[var(--accent-gold)]" />
                        <span className="truncate">{member.institution}</span>
                      </div>
                    </div>
                  </div>

                  {/* Discipline Badge & Focus */}
                  <div className="space-y-2 pt-2 border-t border-[var(--border-subtle)]">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[var(--accent-navy)]">
                      <Icon className="w-4 h-4 text-[var(--accent-gold)] shrink-0" />
                      <span>{member.discipline}</span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] font-serif leading-relaxed">
                      {member.focus}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[var(--accent-gold)] font-medium">
                    {member.status}
                  </span>
                  <span className="text-[var(--text-muted)] text-[10px]">
                    Track Appointment
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Institutional Join Notice */}
      <section className="p-8 rounded-2xl bg-[var(--bg-card-hover)] border border-[var(--border-subtle)] text-center space-y-4">
        <h3 className="font-serif text-xl font-bold text-[var(--text-primary)]">
          Join the Peer Reviewer &amp; Editorial Pool
        </h3>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-serif max-w-xl mx-auto leading-relaxed">
          We welcome expressions of interest from active legal academics, forensic examiners, criminological researchers, and criminal justice scholars holding doctoral qualifications or substantive institutional trial expertise.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--accent-navy)] text-white text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact Editorial Office</span>
          </Link>
          <Link
            to="/about"
            className="px-5 py-2.5 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-card)] text-[var(--text-primary)] text-xs font-semibold hover:bg-[var(--bg-card-hover)]"
          >
            Read Journal Mission
          </Link>
        </div>
      </section>
    </div>
  );
};

export default EditorialBoardPage;
