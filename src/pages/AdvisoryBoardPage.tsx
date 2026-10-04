import React from 'react';
import { 
  Building2, 
  Award 
} from 'lucide-react';

export const AdvisoryBoardPage: React.FC = () => {
  const advisoryBoardMembers = [
    {
      name: "Prof. (Dr) Priya Sepaha",
      designation: "Professor",
      institution: "National Law Institute University (NLIU), Bhopal",
      photo: "/advisory-board/Prof.(Dr)PriyaSepaha.jpeg"
    },
    {
      name: "Prof. Arvind Tiwari",
      designation: "Professor, School of Law, Rights and Constitutional Governance",
      institution: "Tata Institute of Social Sciences (TISS), Mumbai",
      photo: "/advisory-board/Prof.ArvindTiwari.jpeg"
    },
    {
      name: "Dr. Hassan Imam",
      designation: "Professor",
      institution: "Aligarh Muslim University (AMU)",
      photo: "/advisory-board/Dr.HassanImam.jpeg"
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
      <section className="space-y-4">
        <div className="pb-1 text-center space-y-1">
          <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)] inline-flex items-center gap-2">
            <Award className="w-5 h-5 text-[var(--accent-gold)]" />
            <span>Distinguished Advisory Board Members</span>
          </h2>
          <p className="text-xs font-mono text-[var(--text-muted)]">
            {advisoryBoardMembers.length} Appointed Members
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-5">
          {advisoryBoardMembers.map((member, idx) => (
            <div
              key={idx}
              className="w-[calc(50%-6px)] sm:w-[calc(33.333%-14px)] lg:w-[calc(25%-15px)] p-3 sm:p-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--accent-gold)]/40 transition-[border-color,box-shadow] duration-200 flex flex-col justify-between space-y-3 shadow-2xs group"
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
                  <h3 className="font-serif font-bold text-xs sm:text-base lg:text-lg text-[var(--text-primary)] group-hover:text-[var(--accent-navy)] transition-colors leading-snug">
                    {member.name}
                  </h3>
                  <p className="text-[10px] sm:text-xs font-serif text-[var(--accent-gold)] font-medium leading-tight line-clamp-2">
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
    </div>
  );
};

export default AdvisoryBoardPage;
