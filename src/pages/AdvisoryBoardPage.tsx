import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Mail, 
  Globe2,
  Landmark,
  Scale,
  Microscope,
  Award,
  BookOpen
} from 'lucide-react';

export const AdvisoryBoardPage: React.FC = () => {
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

  const advisoryTracks = [
    {
      domain: "Constitutional Jurisprudence & Judicial Reforms",
      focus: "Judicial precedents under Article 21, constitutional fair trial guarantees, and statutory transition under BNS, BNSS, and BSA.",
      icon: Scale,
      targetProfile: "Senior Jurists, Former High Court Justices & Senior Legal Academics"
    },
    {
      domain: "Forensic Sciences & Technological Proof",
      focus: "Electronic evidence standards, DNA mixtures, digital forensic hash verification, and laboratory accreditation oversight.",
      icon: Microscope,
      targetProfile: "Directors of Forensic Science Laboratories & Forensic Medicine Professors"
    },
    {
      domain: "Theoretical Criminology & Carceral Penology",
      focus: "Undertrial pendency, penal sociology, custodial safeguards, and criminal justice policy formulation.",
      icon: Landmark,
      targetProfile: "Professors of Criminology, Penology & Criminal Sociology"
    },
    {
      domain: "Comparative Law & International Standards",
      focus: "Cross-jurisdictional best practices, UN Nelson Mandela Rules, international human rights law, and transnational crime inquiry.",
      icon: Globe2,
      targetProfile: "International Legal Scholars & Global Criminal Justice Fellows"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* Page Header */}
      <div className="pb-1">
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[var(--text-primary)] tracking-tight">
          Advisory Board
        </h1>
      </div>

      {/* Appointed Advisory Board Members */}
      <section className="space-y-4">
        <div className="pb-1 flex items-center justify-between">
          <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Award className="w-5 h-5 text-[var(--accent-gold)]" />
            <span>Distinguished Advisory Board Members</span>
          </h2>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            {advisoryBoardMembers.length} Appointed Members
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {advisoryBoardMembers.map((member, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--accent-gold)]/40 transition-all flex flex-col justify-between space-y-4 shadow-sm group"
            >
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-lg text-[var(--text-primary)] group-hover:text-[var(--accent-navy)] transition-colors leading-snug">
                  {member.name}
                </h3>
                <p className="text-xs font-serif text-[var(--accent-gold)] font-medium leading-tight">
                  {member.designation}
                </p>
              </div>

              <div className="pt-2.5 border-t border-[var(--border-subtle)] flex items-center gap-2 text-xs text-[var(--text-secondary)] font-mono">
                <Building2 className="w-4 h-4 text-[var(--accent-gold)] shrink-0" />
                <span className="leading-snug">{member.institution}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Advisory Tracks & Constitution */}
      <section className="space-y-4">
        <div className="pb-1">
          <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)]">
            Advisory Council Tracks (2026–2028 Tenure)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {advisoryTracks.map((track, idx) => {
            const Icon = track.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--accent-gold)]/40 transition-all space-y-4 shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent-navy)]/10 text-[var(--accent-navy)] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[var(--accent-gold)]" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-[var(--text-primary)]">
                      {track.domain}
                    </h3>
                    <span className="text-[10px] font-mono text-[var(--accent-gold)] uppercase font-semibold">
                      Track Advisory Panel
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[var(--text-secondary)] font-serif leading-relaxed text-justify">
                  {track.focus}
                </p>

                <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono gap-3">
                  <span className="text-[var(--text-muted)] shrink-0">Target Profile:</span>
                  <span className="text-[var(--text-primary)] font-medium text-right leading-snug">
                    {track.targetProfile}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Nomination & Invitation Notice (DARK CARD) */}
      <section className="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-4 shadow-lg text-white">
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
          Advisory Nominations &amp; Academic Expressions of Interest
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 font-serif max-w-xl mx-auto leading-relaxed text-justify">
          Nominations and expressions of interest for the Advisory Board are invited from senior professors, research directors, and institutional heads across law, forensic sciences, and criminology.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--accent-gold)] hover:bg-[var(--accent-gold-hover)] text-slate-950 text-xs font-bold transition-all shadow-sm"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact Editorial Office</span>
          </Link>
          <Link
            to="/editorial-board"
            className="px-5 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-slate-200 text-xs font-semibold hover:border-amber-400 hover:text-white transition-all"
          >
            View Editorial Board
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AdvisoryBoardPage;
