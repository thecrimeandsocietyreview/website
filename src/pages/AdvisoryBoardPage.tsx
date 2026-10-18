import React from 'react';
import { 
  Building2, 
  Award 
} from 'lucide-react';

interface AdvisoryMember {
  name: string;
  designation: string;
  institution: string;
  photo: string;
}

const AdvisoryMemberCard: React.FC<{ member: AdvisoryMember }> = ({ member }) => {
  return (
    <div
      className="w-full sm:w-[280px] lg:w-[290px] p-3.5 sm:p-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--accent-gold)]/40 transition-[border-color,box-shadow] duration-200 flex flex-col justify-between space-y-3 shadow-2xs group"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '200px 320px' }}
    >
      <div className="space-y-2.5">
        <div className="w-full aspect-[4/5] rounded-xl border border-[var(--border-strong)] overflow-hidden shrink-0 shadow-xs bg-neutral-100 dark:bg-neutral-800">
          <img
            src={member.photo}
            alt={member.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-top will-change-auto"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </div>
        <div className="space-y-1 min-w-0 text-center">
          <h3 className="font-serif font-bold text-xs sm:text-base lg:text-lg text-[var(--text-primary)] group-hover:text-[var(--accent-navy)] transition-colors leading-snug text-center">
            {member.name}
          </h3>
          <p className="text-[10px] sm:text-xs font-serif text-[var(--accent-gold)] font-medium leading-tight line-clamp-2 text-center">
            {member.designation}
          </p>
        </div>
      </div>

      <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-center gap-1.5 text-[10px] sm:text-xs text-[var(--text-secondary)] font-mono text-center">
        <Building2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[var(--accent-gold)] shrink-0" />
        <span className="leading-snug">{member.institution}</span>
      </div>
    </div>
  );
};

export const AdvisoryBoardPage: React.FC = () => {
  // First row center: Prof. Arvind Tiwari
  const primaryMember: AdvisoryMember = {
    name: "Prof. Arvind Tiwari",
    designation: "Professor, School of Law, Rights and Constitutional Governance",
    institution: "Tata Institute of Social Sciences (TISS), Mumbai",
    photo: "/advisory-board/Prof.ArvindTiwari.jpeg"
  };

  // Row 2: Hasan, Priya and Shabir
  const secondaryMembers: AdvisoryMember[] = [
    {
      name: "Dr. Hassan Imam",
      designation: "Professor & Chairperson, CAS, Department of History",
      institution: "Aligarh Muslim University (AMU)",
      photo: "/advisory-board/Dr.HassanImam.jpeg"
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

      {/* Appointed Advisory Board Members */}
      <section className="space-y-6">
        <div className="pb-1 text-center space-y-1">
          <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)] inline-flex items-center gap-2">
            <Award className="w-5 h-5 text-[var(--accent-gold)]" />
            <span>Distinguished Advisory Board Members</span>
          </h2>
          <p className="text-xs font-mono text-[var(--text-muted)]">
            4 Appointed Members
          </p>
        </div>

        {/* Row 1: First row center - Arvind Tiwari */}
        <div className="flex justify-center w-full">
          <div className="w-full max-w-[280px] sm:max-w-none sm:w-[280px] lg:w-[290px] flex justify-center">
            <AdvisoryMemberCard member={primaryMember} />
          </div>
        </div>

        {/* Row 2: Below him - Hasan, Priya and Shabir */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-5 w-full">
          {secondaryMembers.map((member, idx) => (
            <div key={idx} className="w-full max-w-[280px] sm:max-w-none sm:w-[280px] lg:w-[290px] flex justify-center">
              <AdvisoryMemberCard member={member} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdvisoryBoardPage;
