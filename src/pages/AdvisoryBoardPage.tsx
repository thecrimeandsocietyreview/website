import React from 'react';
import { 
  Building2, 
  Award, 
  BookOpen,
  MapPin,
  Mail
} from 'lucide-react';

interface AdvisoryMember {
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

// Member Photo with fallback to DummyPhoto (exact match to Editorial Board)
const MemberPhoto: React.FC<{
  photo?: string;
  name: string;
}> = ({
  photo,
  name
}) => {
  const [imgError, setImgError] = React.useState(false);

  if (!photo || imgError) {
    return <DummyPhoto label="Photo Pending" />;
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

const AdvisoryMemberCard: React.FC<{ member: AdvisoryMember }> = ({ member }) => {
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

export const AdvisoryBoardPage: React.FC = () => {
  // Chief Advisor
  const chiefAdvisor: AdvisoryMember = {
    name: "Prof. Arvind Tiwari",
    designation: "Professor, School of Law, Rights and Constitutional Governance",
    institution: "Tata Institute of Social Sciences (TISS)",
    address: "TISS, Deonar, Mumbai, Maharashtra, 400088",
    email: "tiwari_a@tiss.ac.in",
    photo: "/advisory-board/Prof.ArvindTiwari.jpeg",
    roleBadge: "Chief Advisor"
  };

  // Associate Advisors: Dr. Hassan Imam, Prof. (Dr.) Sony Kunjappan, Prof. (Dr.) Priya Sepaha, Dr. Md. Shabbir Alam
  const associateAdvisors: AdvisoryMember[] = [
    {
      name: "Dr. Hassan Imam",
      designation: "Professor & Chairperson, CAS, Department of History",
      institution: "Aligarh Muslim University (AMU)",
      address: "Department of History, AMU, Aligarh, Uttar Pradesh, 202002",
      email: "hassanimam_alig@yahoo.co.in",
      photo: "/advisory-board/Dr.HassanImam.jpeg"
    },
    {
      name: "Prof. (Dr.) Sony Kunjappan",
      designation: "Professor & Head, Department of Studies in Social Management",
      institution: "Central University of Gujarat (CUG)",
      address: "Central University of Gujarat, Kundhela, Vadodara, Gujarat – 391107, India",
      email: "sony@cug.ac.in",
      photo: "/advisory-board/Prof.(Dr.)SonyKunjappan.jpg"
    },
    {
      name: "Prof. (Dr.) Priya Sepaha",
      designation: "Professor of Law",
      institution: "National Law Institute University (NLIU), Bhopal",
      photo: "/advisory-board/Prof.(Dr)PriyaSepaha.jpeg"
    },
    {
      name: "Dr. Md. Shabbir Alam",
      designation: "Professor of Finance & Economics",
      institution: "Dhofar University, Oman",
      address: "P.O. Box 2509, Postal Code 211, Salalah, Sultanate of Oman",
      email: "mdshabbir@du.edu.om",
      photo: "/advisory-board/Dr.MdShabbirAlam.jpeg"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* Page Header - Centered */}
      <div className="pb-1 text-center">
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[var(--text-primary)] tracking-tight">
          Advisory Board
        </h1>
      </div>

      {/* TIER 1: CHIEF ADVISOR */}
      <section className="space-y-4">
        <div className="pb-1 text-center space-y-1">
          <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)] inline-flex items-center gap-2">
            <Award className="w-5 h-5 text-[var(--accent-gold)]" />
            <span>Chief Advisor</span>
          </h2>
        </div>

        <div className="flex justify-center">
          <AdvisoryMemberCard member={chiefAdvisor} />
        </div>
      </section>

      {/* TIER 2: ASSOCIATE ADVISORS */}
      <section className="space-y-4">
        <div className="pb-1 text-center space-y-1">
          <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)] inline-flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[var(--accent-gold)]" />
            <span>Associate Advisors</span>
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-5">
          {associateAdvisors.map((member, idx) => (
            <AdvisoryMemberCard key={idx} member={member} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdvisoryBoardPage;
