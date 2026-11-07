import React from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Award,
  BookOpen,
  Mail,
  Code2,
  Cpu,
  GraduationCap,
  MapPin
} from 'lucide-react';

interface EditorialMember {
  name: string;
  designation: string;
  institution: string;
  address?: string;
  email?: string;
  photo?: string;
  roleBadge?: string;
}

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
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover object-top will-change-auto"
        onError={() => setImgError(true)}
      />
    </div>
  );
};

// Reusable Editorial Member Card Component
const EditorialMemberCard: React.FC<{ member: EditorialMember }> = ({ member }) => {
  return (
    <div
      className="w-[calc(50%-6px)] sm:w-[calc(33.333%-14px)] lg:w-[calc(25%-15px)] p-3 sm:p-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--accent-gold)]/50 transition-[border-color,box-shadow] duration-200 flex flex-col justify-between space-y-3 shadow-2xs group"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '200px 340px' }}
    >
      <div className="space-y-2.5">
        <MemberPhoto photo={member.photo} name={member.name} />

        <div className="space-y-1 min-w-0 text-center">
          {member.roleBadge && (
            <span className="text-[10px] font-mono text-[var(--accent-gold)] font-bold uppercase tracking-wider block text-center">
              {member.roleBadge}
            </span>
          )}
          <h3 className="font-serif font-bold text-xs sm:text-base text-[var(--text-primary)] group-hover:text-[var(--accent-navy)] transition-colors leading-snug text-center">
            {member.name}
          </h3>
          <p className="text-[10px] sm:text-xs font-serif text-[var(--accent-gold)] leading-tight line-clamp-2 text-center">
            {member.designation}
          </p>
        </div>
      </div>

      <div className="space-y-2 pt-2 border-t border-[var(--border-subtle)]">
        {/* Institution */}
        <div className="flex items-center justify-center gap-1 text-[10px] sm:text-xs text-[var(--text-secondary)] font-mono text-center">
          <Building2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[var(--accent-gold)] shrink-0" />
          <span className="leading-snug truncate sm:whitespace-normal">{member.institution}</span>
        </div>

        {/* Postal Address (if provided) */}
        {member.address && (
          <div className="flex items-start justify-center gap-1 text-[9px] sm:text-[10px] text-[var(--text-muted)] font-serif text-center leading-tight">
            <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[var(--accent-gold)] shrink-0 mt-0.5" />
            <span className="line-clamp-2">{member.address}</span>
          </div>
        )}

        {/* Official Email */}
        {member.email && (
          <div className="pt-1.5 border-t border-[var(--border-subtle)]/70 flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] font-mono text-[var(--accent-navy)] dark:text-[var(--accent-gold)]">
            <Mail className="w-3 h-3 text-[var(--accent-gold)] shrink-0" />
            <a 
              href={`mailto:${member.email}`} 
              className="truncate hover:underline" 
              title={member.email}
            >
              {member.email}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export const EditorialBoardPage: React.FC = () => {
  // Chief Editors List
  const chiefEditors: EditorialMember[] = [
    {
      name: "Dr. Shahanshah Gulpham",
      designation: "Assistant Professor",
      institution: "Rashtriya Raksha University",
      address: "Rashtriya Raksha University, Gandhinagar, Gujarat, 382305",
      email: "shahanshah.gulpham@rru.ac.in",
      photo: "/editorial-board/chief-editor.jpeg",
      roleBadge: "Editor-in-Chief"
    },
    {
      name: "Mr. Pravesh Shekhar",
      designation: "Senior Research Fellow, Criminology",
      institution: "Rashtriya Raksha University",
      address: "Rashtriya Raksha University, Gandhinagar, Gujarat, 382305",
      email: "pravesh.shekhar@rru.ac.in",
      photo: "/editorial-board/co-editor-in-chief.jpeg",
      roleBadge: "Co-Editor-in-Chief"
    }
  ];

  // Associate Editors List (Chronology: Professors -> Associate Professors -> Assistant Professors -> Analysts)
  const associateEditors: EditorialMember[] = [
    // 1. Professors
    {
      name: "Dr. J. R. Gaur",
      designation: "Lifetime Professor & Emeritus Resource Faculty",
      institution: "Rashtriya Raksha University",
      address: "Rashtriya Raksha University, Gandhinagar, Gujarat, 382305",
      email: "ltp.jrg@rru.ac.in",
      photo: "/editorial-board/Dr.J.R.Gaur.jpeg"
    },
    // 2. Associate Professors
    {
      name: "Dr. Mahesh A. Tripathi",
      designation: "Associate Professor",
      institution: "Rashtriya Raksha University",
      address: "Rashtriya Raksha University, Gandhinagar, Gujarat, 382305",
      email: "mahesh.tripathi@rru.ac.in",
      photo: "/editorial-board/Dr.MaheshA.Tripathi.jpeg"
    },
    {
      name: "Dr. Dimple T. Raval",
      designation: "Associate Professor of Law",
      institution: "Rashtriya Raksha University",
      address: "Rashtriya Raksha University, Gandhinagar, Gujarat, 382305",
      email: "dimple.raval@rru.ac.in",
      photo: "/editorial-board/Dr.DimpleT.Raval.jpeg"
    },
    // 3. Assistant Professors & Faculty
    {
      name: "Dr. Sheetal Arora",
      designation: "Assistant Professor (Senior Scale), Criminology",
      institution: "Sardar Patel University of Police, Security and Criminal Justice (SPUP)",
      address: "SPUP, Jodhpur, Rajasthan, 342037",
      email: "sheetalmakhija@policeuniversity.ac.in",
      photo: "/editorial-board/Dr.SheetalArora.jpeg"
    },
    {
      name: "Dr. Sushil Goswami",
      designation: "Head, External Affairs & Assistant Professor of Law",
      institution: "Gujarat National Law University (GNLU)",
      address: "GNLU, Gandhinagar, Gujarat, 382426",
      email: "sgoswami@gnlu.ac.in",
      photo: "/editorial-board/Dr.SushilGoswami.jpeg"
    },
    {
      name: "Mr. Gaurav Kumar Mishra",
      designation: "Senior Analyst (Public Policy)",
      institution: "Policy Samvad",
      address: "7/18, Gali No. 6, Block-C, Kamal Vihar, New Delhi, 110084",
      email: "policysannmvad@gmail.com",
      photo: "/editorial-board/Mr.GauravKumarMishra.jpeg"
    },
    {
      name: "Dr. Santosh Patel",
      designation: "Assistant Registrar",
      institution: "Delhi Skill and Entrepreneurship University (DSEU)",
      address: "DSEU, Dwarka, New Delhi – 110077",
      photo: "/editorial-board/Dr.SantoshPatel.jpeg"
    },
    {
      name: "Dr. Shekh Belal Ahmad",
      designation: "Assistant Professor",
      institution: "Aligarh Muslim University (AMU)",
      address: "AMU, Aligarh, 202002, Uttar Pradesh",
      email: "sbahmad.so@amu.ac.in",
      photo: "/editorial-board/Dr.ShekhBelalAhmad.jpeg"
    },
    {
      name: "Mohit Charan",
      designation: "Assistant Professor",
      institution: "Hemvati Nandan Bahuguna Garhwal University (HNBGU)",
      address: "HNBGU, Srinagar, Pauri Garhwal – 246174, Uttarakhand",
      email: "mohit.defencestudies@gmail.com",
      photo: "/editorial-board/MohitCharan.jpeg"
    },
    {
      name: "Dr. Kanika Gaur",
      designation: "Assistant Professor",
      institution: "Chitkara University, Punjab",
      address: "Chitkara University, NH-7, Punjab – 140401",
      photo: "/editorial-board/Ms.KanikaGaur.jpeg"
    },
    {
      name: "Dr. Asif Hasan",
      designation: "Assistant Professor, Department of Psychology",
      institution: "Aligarh Muslim University (AMU)",
      address: "AMU, Aligarh, 202002, Uttar Pradesh",
      email: "ahasan.py@amu.ac.in",
      photo: "/editorial-board/Dr.AsifHasan.jpeg"
    },
    {
      name: "Ms. Anshu Singh",
      designation: "Assistant Professor of Research in Forensic Accounting & Financial Investigations",
      institution: "Rashtriya Raksha University",
      address: "Rashtriya Raksha University, Gandhinagar, Gujarat, 382305",
      email: "anshu.singh@rru.ac.in",
      photo: "/editorial-board/Ms.AnshuSingh.jpeg"
    },
    {
      name: "Dr. Neha Tanwar",
      designation: "Assistant Professor",
      institution: "IILM University, Gurugram",
      address: "IILM University, 1, Knowledge Center, Golf Course Road, Sector 53, Gurugram – 122003, Haryana",
      email: "neha.tanwar@iilm.edu",
      photo: "/editorial-board/Dr.NehaTanwar.jpeg"
    }
  ];

  // Editors List
  const editors: EditorialMember[] = [
    {
      name: "Mr. Renjith Thamarakshan",
      designation: "Senior Research Fellow, Criminology",
      institution: "Indian Institute of Technology (IIT), Gandhinagar",
      address: "IIT, Gandhinagar, Gujarat, 382055",
      email: "renjith.thamarakshan@iitgn.ac.in",
      photo: "/editorial-board/Mr.RenjithThamarakshan.jpeg"
    },
    {
      name: "Mr. Gopal Nath Karna",
      designation: "Junior Research Fellow, Criminology",
      institution: "Sardar Patel University of Police, Security and Criminal Justice (SPUP)",
      address: "SPUP, Village Lordi Panditji, Jodhpur, Rajasthan, 342037",
      photo: "/editorial-board/GopalNathKarna.jpeg"
    },
    {
      name: "Ms. Sushree Saswati Mishra",
      designation: "Junior Research Fellow (Ph.D. Scholar)",
      institution: "The West Bengal National University of Juridical Sciences (WBNUJS), Kolkata",
      address: "WBNUJS, Sector III, Salt Lake City, Kolkata, West Bengal, 700106",
      email: "sushreephd2023@nujs.edu",
      photo: "/editorial-board/Ms.SushreeSaswatiMishra.jpeg"
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
          TIER 1: CHIEF EDITORS
      ======================================================== */}
      <section className="space-y-4">
        <div className="pb-1 text-center">
          <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)] inline-flex items-center gap-2">
            <Award className="w-5 h-5 text-[var(--accent-gold)]" />
            <span>Chief Editors</span>
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-5">
          {chiefEditors.map((member, idx) => (
            <EditorialMemberCard key={idx} member={member} />
          ))}
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
            <EditorialMemberCard key={idx} member={member} />
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
            <EditorialMemberCard key={idx} member={editor} />
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
          <div
            className="w-[calc(50%-6px)] sm:w-[calc(33.333%-14px)] lg:w-[calc(25%-15px)] p-3 sm:p-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--accent-gold)]/50 transition-[border-color,box-shadow] duration-200 flex flex-col justify-between space-y-3 shadow-2xs group"
            style={{ contentVisibility: 'auto', containIntrinsicSize: '200px 340px' }}
          >
            <div className="space-y-2.5">
              <MemberPhoto photo="/editorial-board/abhinavkumar.jpeg" name="Abhinav Kumar" />
              <div className="space-y-1 min-w-0 text-center">
                <h3 className="font-serif font-bold text-xs sm:text-base text-[var(--text-primary)] group-hover:text-[var(--accent-navy)] transition-colors leading-snug text-center">
                  Abhinav Kumar
                </h3>
                <p className="text-[10px] sm:text-xs font-serif text-[var(--accent-gold)] leading-tight line-clamp-2 text-center">
                  Technical &amp; Web Systems Lead • Digital Production Editor
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-[var(--border-subtle)]">
              <div className="flex items-center justify-center gap-1 text-[10px] sm:text-xs text-[var(--text-secondary)] font-mono text-center">
                <Cpu className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[var(--accent-gold)] shrink-0" />
                <span className="leading-snug truncate sm:whitespace-normal">Digital Systems &amp; Web Architecture</span>
              </div>
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
