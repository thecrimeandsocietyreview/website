import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Award, 
  ShieldCheck, 
  BookOpen, 
  Mail, 
  UserCheck,
  Code2,
  Cpu,
  GraduationCap
} from 'lucide-react';

// Academic Silhouette Dummy Photo Component for members without photos
const DummyPhoto: React.FC<{ size?: 'lg' | 'md' | 'sm'; label?: string }> = ({ 
  size = 'md', 
  label = 'Photo Pending' 
}) => {
  const sizeClasses = size === 'lg' 
    ? 'w-32 h-40 sm:w-40 sm:h-48' 
    : size === 'sm'
    ? 'w-16 h-20 sm:w-20 sm:h-24'
    : 'w-24 h-28 sm:w-28 sm:h-32';

  return (
    <div 
      className={`relative rounded-xl border border-[var(--border-strong)] bg-neutral-100 dark:bg-neutral-800/80 flex flex-col items-center justify-center shrink-0 overflow-hidden shadow-2xs group ${sizeClasses}`}
      aria-label="Official photo placeholder"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-200/20 to-neutral-300/40 dark:from-transparent dark:via-neutral-700/20 dark:to-neutral-900/40" />
      <svg
        className="w-full h-full p-2 text-neutral-300 dark:text-neutral-600 transition-transform group-hover:scale-105"
        viewBox="0 0 120 130"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="60" cy="45" r="25" opacity="0.9" />
        <path d="M16 122c0-24.3 19.7-44 44-44s44 19.7 44 44v8H16v-8z" opacity="0.9" />
      </svg>
      <div className="absolute bottom-1 inset-x-1.5 text-center">
        <span className="inline-block text-[8px] sm:text-[9px] font-mono tracking-wider uppercase text-neutral-500 dark:text-neutral-400 bg-white/90 dark:bg-neutral-900/90 px-1.5 py-0.5 rounded border border-neutral-200 dark:border-neutral-700">
          {label}
        </span>
      </div>
    </div>
  );
};

export const EditorialBoardPage: React.FC = () => {
  // Associate Editors List
  const associateEditors = [
    {
      name: "Dr. J. R. Gaur",
      designation: "Lifetime Professor & Emeritus Resource Faculty",
      institution: "Rashtriya Raksha University"
    },
    {
      name: "Dr. Mahesh A. Tripathi",
      designation: "Associate Professor",
      institution: "Rashtriya Raksha University"
    },
    {
      name: "Dr. Dimple T. Raval",
      designation: "Associate Professor of Law",
      institution: "Rashtriya Raksha University"
    },
    {
      name: "Dr. Sheetal Arora",
      designation: "Assistant Professor (Senior Scale), Criminology",
      institution: "Sardar Patel University of Police, Security and Criminal Justice (SPUP)"
    },
    {
      name: "Dr. Sushil Goswami",
      designation: "Head, External Affairs & Assistant Professor of Law",
      institution: "Gujarat National Law University (GNLU)"
    },
    {
      name: "Ms. Kanika Gaur",
      designation: "Assistant Professor",
      institution: "Chitkara University, Punjab"
    },
    {
      name: "Dr. Asif Hasan",
      designation: "Assistant Professor, Department of Psychology",
      institution: "Aligarh Muslim University (AMU)"
    },
    {
      name: "Dr. Shekh Belal Ahmad",
      designation: "Assistant Professor",
      institution: "Aligarh Muslim University (AMU)"
    },
    {
      name: "Dr. Neha Tanwar",
      designation: "Assistant Professor",
      institution: "IILM University, Gurugram"
    },
    {
      name: "Mr. Gaurav Kumar Mishra",
      designation: "Senior Analyst (Public Policy)",
      institution: "Public Policy & Strategic Affairs"
    }
  ];

  // Advisory Board Members
  const advisoryBoardMembers = [
    {
      name: "Prof. (Dr) Priya Sepaha",
      designation: "Professor",
      institution: "National Law Institute University (NLIU), Bhopal"
    },
    {
      name: "Prof. Arvind Tiwari",
      designation: "Professor, School of Law, Rights and Constitutional Governance",
      institution: "Tata Institute of Social Sciences (TISS), Mumbai"
    },
    {
      name: "Dr. Hassan Imam",
      designation: "Professor",
      institution: "Aligarh Muslim University (AMU)"
    }
  ];

  // Editors List
  const editors = [
    {
      name: "Mr. Renjith Thamarakshan",
      designation: "PhD Research Scholar (SRF), Criminology",
      institution: "IIT Gandhinagar"
    },
    {
      name: "Mr. Gopal Nath Karna",
      designation: "PhD Research Scholar (JRF), Criminology",
      institution: "Sardar Patel University of Police, Security and Criminal Justice (SPUP)"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12 animate-fadeIn">
      {/* Page Header (Clean title without above/under heading clutter) */}
      <div className="border-b border-[var(--border-subtle)] pb-6">
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[var(--text-primary)] tracking-tight">
          Editorial Board
        </h1>
      </div>

      {/* COPE Editorial Independence Charter Notice (DARK BANNER) */}
      <section className="p-6 sm:p-7 rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-md relative overflow-hidden">
        <div className="space-y-1 relative z-10 max-w-3xl">
          <h3 className="font-serif font-bold text-base text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>COPE-Aligned Editorial Independence &amp; Academic Rigour</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 font-serif leading-relaxed">
            Editorial decision-making is insulated from commercial, political, or institutional influence. The Board assesses all manuscripts solely on scholarly merit, empirical integrity, and constitutional relevance through double-blind peer review.
          </p>
        </div>
        <Link
          to="/advisory-board"
          className="shrink-0 px-4 py-2 rounded-xl bg-[var(--accent-gold)] hover:bg-[var(--accent-gold-hover)] text-slate-950 text-xs font-bold transition-all shadow-sm relative z-10"
        >
          View Advisory Board
        </Link>
      </section>

      {/* ========================================================
          TIER 1: CHIEF EDITOR & CO-EDITOR-IN-CHIEF (SIDE BY SIDE)
      ======================================================== */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Chief Editor Card */}
        <div className="p-6 sm:p-7 rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-card)] shadow-xs flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div className="flex items-center gap-2 border-b border-[var(--border-subtle)] pb-3">
              <Award className="w-5 h-5 text-[var(--accent-gold)]" />
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                Chief Editor
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
              {/* Chief Editor Photo */}
              <div className="w-32 h-40 sm:w-36 sm:h-44 rounded-xl border border-[var(--border-strong)] overflow-hidden shrink-0 shadow-md bg-neutral-100 dark:bg-neutral-800">
                <img 
                  src="/chief-editor.jpeg" 
                  alt="Dr. Shahanshah Gulpham - Chief Editor"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>

              {/* Chief Editor Details */}
              <div className="flex-1 text-center sm:text-left space-y-2.5">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[var(--accent-navy)] text-white">
                    Chief Editor
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                    Faculty Leadership
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                    Dr. Shahanshah Gulpham
                  </h3>
                  <p className="text-sm font-serif text-[var(--accent-gold)] font-semibold mt-0.5">
                    Assistant Professor
                  </p>
                  <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-[var(--text-secondary)] mt-1 font-mono">
                    <Building2 className="w-3.5 h-3.5 text-[var(--accent-gold)] shrink-0" />
                    <span>Rashtriya Raksha University</span>
                  </div>
                </div>

                <p className="text-xs text-[var(--text-secondary)] font-serif leading-relaxed">
                  Provides chief academic oversight, scholarly governance, and editorial leadership for <em>The Crime &amp; Society Review</em>, directing the journal's multidisciplinary vision across statutory criminal laws (BNS, BNSS, BSA), forensic sciences, and policing scholarship.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Co-Editor-in-Chief Card */}
        <div className="p-6 sm:p-7 rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-card)] shadow-xs flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div className="flex items-center gap-2 border-b border-[var(--border-subtle)] pb-3">
              <UserCheck className="w-5 h-5 text-[var(--accent-gold)]" />
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                Co-Editor-in-Chief
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
              {/* Co-Editor-in-Chief Photo */}
              <div className="w-32 h-40 sm:w-36 sm:h-44 rounded-xl border border-[var(--border-strong)] overflow-hidden shrink-0 shadow-md bg-neutral-100 dark:bg-neutral-800">
                <img 
                  src="/co-editor-in-chief.jpeg" 
                  alt="Mr. Pravesh Shekhar - Co-Editor-in-Chief"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>

              {/* Co-Editor-in-Chief Details */}
              <div className="flex-1 text-center sm:text-left space-y-2.5">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[var(--accent-navy)]/10 text-[var(--accent-navy)] border border-[var(--accent-navy)]/30 font-semibold">
                    Co-Editor-in-Chief
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                    Research Leadership
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                    Mr. Pravesh Shekhar
                  </h3>
                  <p className="text-sm font-serif text-[var(--accent-gold)] font-semibold mt-0.5">
                    PhD Research Scholar (SRF), Criminology
                  </p>
                  <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-[var(--text-secondary)] mt-1 font-mono">
                    <Building2 className="w-3.5 h-3.5 text-[var(--accent-gold)] shrink-0" />
                    <span>Rashtriya Raksha University</span>
                  </div>
                </div>

                <p className="text-xs text-[var(--text-secondary)] font-serif leading-relaxed">
                  Coordinates editorial workflow, peer review triage, disciplinary track assignment, and scholarly outreach, ensuring high-standard empirical evaluation and ethical compliance in all published outputs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          TIER 2: ASSOCIATE EDITORS
      ======================================================== */}
      <section className="space-y-6">
        <div className="border-b border-[var(--border-subtle)] pb-3 flex items-center justify-between">
          <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[var(--accent-gold)]" />
            <span>Associate Editors</span>
          </h2>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            {associateEditors.length} Appointed Members
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {associateEditors.map((member, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--accent-gold)]/40 transition-all flex flex-col justify-between space-y-4 shadow-2xs group"
            >
              <div className="flex items-start gap-3.5">
                {/* Academic Avatar Placeholder */}
                <DummyPhoto size="sm" label="Photo" />

                <div className="space-y-1 min-w-0 flex-1">
                  <span className="inline-block px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider bg-[var(--accent-navy)]/10 text-[var(--accent-navy)]">
                    Associate Editor
                  </span>
                  <h3 className="font-serif font-bold text-base text-[var(--text-primary)] group-hover:text-[var(--accent-navy)] transition-colors leading-snug">
                    {member.name}
                  </h3>
                  <p className="text-xs font-serif text-[var(--accent-gold)] leading-tight">
                    {member.designation}
                  </p>
                </div>
              </div>

              <div className="pt-2.5 border-t border-[var(--border-subtle)] flex items-center gap-1.5 text-xs text-[var(--text-secondary)] font-mono">
                <Building2 className="w-3.5 h-3.5 text-[var(--accent-gold)] shrink-0" />
                <span className="truncate">{member.institution}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          TIER 3: EDITORS
      ======================================================== */}
      <section className="space-y-6">
        <div className="border-b border-[var(--border-subtle)] pb-3 flex items-center justify-between">
          <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-[var(--accent-gold)]" />
            <span>Editors</span>
          </h2>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            {editors.length} Appointed Members
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {editors.map((editor, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--accent-gold)]/40 transition-all flex flex-col justify-between space-y-4 shadow-2xs group"
            >
              <div className="flex items-start gap-4">
                <DummyPhoto size="sm" label="Photo" />
                <div className="space-y-1 min-w-0 flex-1">
                  <span className="inline-block px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                    Editor
                  </span>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-[var(--text-primary)] group-hover:text-[var(--accent-navy)] transition-colors">
                    {editor.name}
                  </h3>
                  <p className="text-xs font-serif text-[var(--accent-gold)] leading-tight">
                    {editor.designation}
                  </p>
                </div>
              </div>

              <div className="pt-2.5 border-t border-[var(--border-subtle)] flex items-center gap-1.5 text-xs text-[var(--text-secondary)] font-mono">
                <Building2 className="w-3.5 h-3.5 text-[var(--accent-gold)] shrink-0" />
                <span className="truncate">{editor.institution}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          TIER 4: ADVISORY BOARD
      ======================================================== */}
      <section className="space-y-6">
        <div className="border-b border-[var(--border-subtle)] pb-3 flex items-center justify-between">
          <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Award className="w-5 h-5 text-[var(--accent-gold)]" />
            <span>Advisory Board</span>
          </h2>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            {advisoryBoardMembers.length} Appointed Members
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {advisoryBoardMembers.map((member, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--accent-gold)]/40 transition-all flex flex-col justify-between space-y-4 shadow-2xs group"
            >
              <div className="flex items-start gap-3.5">
                <DummyPhoto size="sm" label="Advisory" />
                <div className="space-y-1 min-w-0 flex-1">
                  <span className="inline-block px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                    Advisory Board
                  </span>
                  <h3 className="font-serif font-bold text-base text-[var(--text-primary)] group-hover:text-[var(--accent-navy)] transition-colors leading-snug">
                    {member.name}
                  </h3>
                  <p className="text-xs font-serif text-[var(--accent-gold)] leading-tight">
                    {member.designation}
                  </p>
                </div>
              </div>

              <div className="pt-2.5 border-t border-[var(--border-subtle)] flex items-center gap-1.5 text-xs text-[var(--text-secondary)] font-mono">
                <Building2 className="w-3.5 h-3.5 text-[var(--accent-gold)] shrink-0" />
                <span className="truncate">{member.institution}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          TIER 5: TECHNICAL & WEB SYSTEMS LEAD (ABHINAV KUMAR)
      ======================================================== */}
      <section className="space-y-4">
        <div className="border-b border-[var(--border-subtle)] pb-3">
          <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Code2 className="w-5 h-5 text-[var(--accent-gold)]" />
            <span>Technical &amp; Web Systems Leadership</span>
          </h2>
        </div>

        <div className="p-6 sm:p-7 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white hover:border-amber-400/40 transition-all space-y-4 shadow-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <DummyPhoto size="md" label="Tech Lead" />

            <div className="flex-1 text-center sm:text-left space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Technical Lead &amp; Web Systems Editor
                </span>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  Digital Systems &amp; Web Architecture
                </span>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold text-white">
                  Abhinav Kumar
                </h3>
                <p className="text-xs sm:text-sm font-serif text-amber-400 font-semibold mt-0.5">
                  Technical &amp; Web Systems Lead • Digital Production Editor
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 font-serif leading-relaxed max-w-3xl">
                Oversees journal platform engineering, digital manuscript submission infrastructure, web security, content management, accessibility compliance, and technological implementation of <em>The Crime &amp; Society Review</em> digital publishing systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Join Notice */}
      <section className="p-8 rounded-2xl bg-[var(--bg-card-hover)] border border-[var(--border-subtle)] text-center space-y-4">
        <h3 className="font-serif text-xl font-bold text-[var(--text-primary)]">
          Join the Peer Reviewer Pool
        </h3>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-serif max-w-xl mx-auto leading-relaxed">
          We welcome expressions of interest from active researchers and academics in criminal law, forensic science, criminological inquiry, and behavioural psychology to join our double-blind peer review community.
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
            to="/advisory-board"
            className="px-5 py-2.5 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-card)] text-[var(--text-primary)] text-xs font-semibold hover:bg-[var(--bg-card-hover)]"
          >
            Advisory Board
          </Link>
        </div>
      </section>
    </div>
  );
};

export default EditorialBoardPage;
