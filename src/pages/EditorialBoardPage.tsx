import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Award, 
  BookOpen, 
  Mail, 
  UserCheck,
  Code2,
  Cpu,
  GraduationCap
} from 'lucide-react';

// Academic Silhouette Dummy Photo Component for members without photos
const DummyPhoto: React.FC<{ label?: string }> = ({ 
  label = 'Photo Pending' 
}) => {
  return (
    <div 
      className="w-full aspect-[4/5] rounded-xl border border-[var(--border-strong)] bg-neutral-100 dark:bg-neutral-800/80 flex flex-col items-center justify-center shrink-0 overflow-hidden shadow-2xs relative"
      aria-label="Official photo placeholder"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-200/20 to-neutral-300/40 dark:from-transparent dark:via-neutral-700/20 dark:to-neutral-900/40" />
      <svg
        className="w-2/5 h-2/5 text-neutral-300 dark:text-neutral-600"
        viewBox="0 0 120 130"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="60" cy="45" r="25" opacity="0.9" />
        <path d="M16 122c0-24.3 19.7-44 44-44s44 19.7 44 44v8H16v-8z" opacity="0.9" />
      </svg>
      <div className="absolute bottom-2 inset-x-2 text-center">
        <span className="inline-block text-[8px] sm:text-[9px] font-mono tracking-wider uppercase text-neutral-500 dark:text-neutral-400 bg-white/90 dark:bg-neutral-900/90 px-1.5 py-0.5 rounded border border-neutral-200 dark:border-neutral-700">
          {label}
        </span>
      </div>
    </div>
  );
};

// Member Photo with fallback to DummyPhoto
const MemberPhoto: React.FC<{ 
  photo?: string; 
  name: string; 
}> = ({ 
  photo, 
  name 
}) => {
  const [imgError, setImgError] = React.useState(false);

  if (!photo || imgError) {
    return <DummyPhoto label="Photo" />;
  }

  return (
    <div className="w-full aspect-[4/5] rounded-xl border border-[var(--border-strong)] overflow-hidden shrink-0 shadow-2xs bg-neutral-100 dark:bg-neutral-800">
      <img
        src={photo}
        alt={name}
        className="w-full h-full object-cover object-top"
        onError={() => setImgError(true)}
      />
    </div>
  );
};

export const EditorialBoardPage: React.FC = () => {
  // Associate Editors List (Chronology: Professors -> Associate Professors -> Assistant Professors -> Analysts)
  const associateEditors = [
    // 1. Professors
    {
      name: "Dr. J. R. Gaur",
      designation: "Lifetime Professor & Emeritus Resource Faculty",
      institution: "Rashtriya Raksha University",
      photo: "/editorial-board/Dr.J.R.Gaur.jpeg"
    },
    // 2. Associate Professors
    {
      name: "Dr. Mahesh A. Tripathi",
      designation: "Associate Professor",
      institution: "Rashtriya Raksha University",
      photo: "/editorial-board/Dr.MaheshA.Tripathi.jpeg"
    },
    {
      name: "Dr. Dimple T. Raval",
      designation: "Associate Professor of Law",
      institution: "Rashtriya Raksha University",
      photo: "/editorial-board/Dr.DimpleT.Raval.jpeg"
    },
    // 3. Assistant Professors
    {
      name: "Dr. Sheetal Arora",
      designation: "Assistant Professor (Senior Scale), Criminology",
      institution: "Sardar Patel University of Police, Security and Criminal Justice (SPUP)",
      photo: "/editorial-board/Dr.SheetalArora.jpeg"
    },
    {
      name: "Dr. Sushil Goswami",
      designation: "Head, External Affairs & Assistant Professor of Law",
      institution: "Gujarat National Law University (GNLU)",
      photo: "/editorial-board/Dr.SushilGoswami.jpeg"
    },
    {
      name: "Dr. Asif Hasan",
      designation: "Assistant Professor, Department of Psychology",
      institution: "Aligarh Muslim University (AMU)",
      photo: "/editorial-board/Dr.AsifHasan.jpeg"
    },
    {
      name: "Dr. Shekh Belal Ahmad",
      designation: "Assistant Professor",
      institution: "Aligarh Muslim University (AMU)",
      photo: "/editorial-board/Dr.ShekhBelalAhmad.jpeg"
    },
    {
      name: "Dr. Neha Tanwar",
      designation: "Assistant Professor",
      institution: "IILM University, Gurugram",
      photo: "/editorial-board/Dr.NehaTanwar.jpeg"
    },
    {
      name: "Mohit Charan",
      designation: "Assistant Professor",
      institution: "Hemvati Nandan Bahuguna Garhwal University"
    },
    {
      name: "Ms. Kanika Gaur",
      designation: "Assistant Professor",
      institution: "Chitkara University, Punjab"
    },
    // 4. Senior Analysts / Policy Fellows
    {
      name: "Mr. Gaurav Kumar Mishra",
      designation: "Senior Analyst (Public Policy)",
      institution: "Public Policy & Strategic Affairs",
      photo: "/editorial-board/Mr.GauravKumarMishra.jpeg"
    }
  ];

  // Editors List
  const editors = [
    {
      name: "Mr. Renjith Thamarakshan",
      designation: "Senior Research Fellow, Criminology",
      institution: "IIT Gandhinagar",
      photo: "/editorial-board/Mr.RenjithThamarakshan.jpeg"
    },
    {
      name: "Gopal Nath Karna",
      designation: "Junior Research Fellow, Criminology",
      institution: "Sardar Patel University of Police, Security and Criminal Justice (SPUP)",
      photo: "/editorial-board/GopalNathKarna.jpeg"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* Page Header - Centered */}
      <div className="pb-1 text-center">
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[var(--text-primary)] tracking-tight">
          Editorial Board
        </h1>
      </div>

      {/* ========================================================
          TIER 1: CHIEF EDITOR & CO-EDITOR-IN-CHIEF
      ======================================================== */}
      <section className="space-y-4">
        <div className="pb-1 text-center">
          <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)] inline-flex items-center gap-2">
            <Award className="w-5 h-5 text-[var(--accent-gold)]" />
            <span>Journal Leadership</span>
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-5">
          {/* Chief Editor Card */}
          <div className="w-[calc(50%-6px)] sm:w-[calc(33.333%-14px)] lg:w-[calc(25%-15px)] p-3 sm:p-5 rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-card)] hover:border-[var(--accent-gold)]/40 transition-all flex flex-col justify-between space-y-3 shadow-2xs group">
            <div className="space-y-2.5">
              <MemberPhoto photo="/chief-editor.jpeg" name="Dr. Shahanshah Gulpham" />

              <div className="space-y-1 min-w-0 text-center">
                <span className="text-[10px] font-mono text-[var(--accent-gold)] font-bold uppercase tracking-wider block">
                  Editor-in-Chief
                </span>
                <h3 className="font-serif font-bold text-xs sm:text-base text-[var(--text-primary)] group-hover:text-[var(--accent-navy)] transition-colors leading-snug">
                  Dr. Shahanshah Gulpham
                </h3>
                <p className="text-[10px] sm:text-xs font-serif text-[var(--accent-gold)] leading-tight line-clamp-2">
                  Assistant Professor
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-center gap-1 text-[10px] sm:text-xs text-[var(--text-secondary)] font-mono">
              <Building2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[var(--accent-gold)] shrink-0" />
              <span className="leading-snug truncate sm:whitespace-normal">Rashtriya Raksha University</span>
            </div>
          </div>

          {/* Co-Editor-in-Chief Card */}
          <div className="w-[calc(50%-6px)] sm:w-[calc(33.333%-14px)] lg:w-[calc(25%-15px)] p-3 sm:p-5 rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-card)] hover:border-[var(--accent-gold)]/40 transition-all flex flex-col justify-between space-y-3 shadow-2xs group">
            <div className="space-y-2.5">
              <MemberPhoto photo="/co-editor-in-chief.jpeg" name="Mr. Pravesh Shekhar" />

              <div className="space-y-1 min-w-0 text-center">
                <span className="text-[10px] font-mono text-[var(--accent-gold)] font-bold uppercase tracking-wider block">
                  Co-Editor-in-Chief
                </span>
                <h3 className="font-serif font-bold text-xs sm:text-base text-[var(--text-primary)] group-hover:text-[var(--accent-navy)] transition-colors leading-snug">
                  Mr. Pravesh Shekhar
                </h3>
                <p className="text-[10px] sm:text-xs font-serif text-[var(--accent-gold)] leading-tight line-clamp-2">
                  Senior Research Fellow, Criminology
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-center gap-1 text-[10px] sm:text-xs text-[var(--text-secondary)] font-mono">
              <Building2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[var(--accent-gold)] shrink-0" />
              <span className="leading-snug truncate sm:whitespace-normal">Rashtriya Raksha University</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          TIER 2: ASSOCIATE EDITORS - CENTERED HEADING
      ======================================================== */}
      <section className="space-y-4">
        <div className="pb-1 text-center space-y-1">
          <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)] inline-flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[var(--accent-gold)]" />
            <span>Associate Editors</span>
          </h2>
          <p className="text-xs font-mono text-[var(--text-muted)]">
            {associateEditors.length} Appointed Members
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-5">
          {associateEditors.map((member, idx) => (
            <div
              key={idx}
              className="w-[calc(50%-6px)] sm:w-[calc(33.333%-14px)] lg:w-[calc(25%-15px)] p-3 sm:p-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--accent-gold)]/40 transition-all flex flex-col justify-between space-y-3 shadow-2xs group"
            >
              <div className="space-y-2.5">
                {/* Academic Avatar / Official Photo - Big Portrait */}
                <MemberPhoto photo={member.photo} name={member.name} />

                <div className="space-y-1 min-w-0 text-center">
                  <h3 className="font-serif font-bold text-xs sm:text-base text-[var(--text-primary)] group-hover:text-[var(--accent-navy)] transition-colors leading-snug">
                    {member.name}
                  </h3>
                  <p className="text-[10px] sm:text-xs font-serif text-[var(--accent-gold)] leading-tight line-clamp-2">
                    {member.designation}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-center gap-1 text-[10px] sm:text-xs text-[var(--text-secondary)] font-mono">
                <Building2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[var(--accent-gold)] shrink-0" />
                <span className="leading-snug truncate sm:whitespace-normal">{member.institution}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          TIER 3: EDITORS - CENTERED HEADING
      ======================================================== */}
      <section className="space-y-4">
        <div className="pb-1 text-center space-y-1">
          <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)] inline-flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-[var(--accent-gold)]" />
            <span>Editors</span>
          </h2>
          <p className="text-xs font-mono text-[var(--text-muted)]">
            {editors.length} Appointed Members
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-5">
          {editors.map((editor, idx) => (
            <div
              key={idx}
              className="w-[calc(50%-6px)] sm:w-[calc(33.333%-14px)] lg:w-[calc(25%-15px)] p-3 sm:p-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--accent-gold)]/40 transition-all flex flex-col justify-between space-y-3 shadow-2xs group"
            >
              <div className="space-y-2.5">
                <MemberPhoto photo={editor.photo} name={editor.name} />
                <div className="space-y-1 min-w-0 text-center">
                  <h3 className="font-serif font-bold text-xs sm:text-base text-[var(--text-primary)] group-hover:text-[var(--accent-navy)] transition-colors leading-snug">
                    {editor.name}
                  </h3>
                  <p className="text-[10px] sm:text-xs font-serif text-[var(--accent-gold)] leading-tight line-clamp-2">
                    {editor.designation}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-center gap-1 text-[10px] sm:text-xs text-[var(--text-secondary)] font-mono">
                <Building2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[var(--accent-gold)] shrink-0" />
                <span className="leading-snug truncate sm:whitespace-normal">{editor.institution}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          TECHNICAL & WEB SYSTEMS LEADERSHIP - CENTERED HEADING
      ======================================================== */}
      <section className="space-y-4">
        <div className="pb-1 text-center">
          <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)] inline-flex items-center gap-2">
            <Code2 className="w-5 h-5 text-[var(--accent-gold)]" />
            <span>Technical &amp; Web Systems Leadership</span>
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-5">
          <div className="w-[calc(50%-6px)] sm:w-[calc(33.333%-14px)] lg:w-[calc(25%-15px)] p-3 sm:p-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--accent-gold)]/40 transition-all flex flex-col justify-between space-y-3 shadow-2xs group">
            <div className="space-y-2.5">
              <MemberPhoto photo="/editorial-board/abhinavkumar.jpeg" name="Abhinav Kumar" />
              <div className="space-y-1 min-w-0 text-center">
                <h3 className="font-serif font-bold text-xs sm:text-base text-[var(--text-primary)] group-hover:text-[var(--accent-navy)] transition-colors leading-snug">
                  Abhinav Kumar
                </h3>
                <p className="text-[10px] sm:text-xs font-serif text-[var(--accent-gold)] leading-tight line-clamp-2">
                  Technical &amp; Web Systems Lead • Digital Production Editor
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-center gap-1 text-[10px] sm:text-xs text-[var(--text-secondary)] font-mono">
              <Cpu className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[var(--accent-gold)] shrink-0" />
              <span className="leading-snug truncate sm:whitespace-normal">Digital Systems &amp; Web Architecture</span>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Join Notice */}
      <section className="p-8 rounded-2xl bg-[var(--bg-card-hover)] border border-[var(--border-subtle)] text-center space-y-4">
        <h3 className="font-serif text-xl font-bold text-[var(--text-primary)]">
          Join the Peer Reviewer Pool
        </h3>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-serif max-w-xl mx-auto leading-relaxed text-justify">
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
