import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Award, 
  BookOpen, 
  ExternalLink, 
  Mail, 
  ShieldCheck, 
  Search, 
  GraduationCap, 
  Building2, 
  Globe, 
  CheckCircle2,
  Scale
} from 'lucide-react';
import { MOCK_BOARD_MEMBERS, JOURNAL_METADATA } from '../data/mockJournalData';

export const EditorialBoardPage: React.FC = () => {
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');

  // Additional advisory board luminaries
  const advisoryMembers = [
    {
      id: "adv-1",
      name: "Prof. (Dr.) Upendra Baxi",
      role: "Advisory Board Member",
      institution: "Emeritus Professor of Law, University of Delhi & Warwick Law School",
      discipline: "Constitutional Theory, Human Rights & Sociology of Law",
      bio: "Internationally renowned scholar of constitutionalism, human rights jurisprudence, and transformative judicial activism in South Asia."
    },
    {
      id: "adv-2",
      name: "Dr. J.M. Vyas",
      role: "Advisory Board Member",
      institution: "Vice-Chancellor, National Forensic Sciences University (NFSU), Gandhinagar",
      discipline: "Forensic Chemistry, Ballistics & National Forensic Infrastructure",
      bio: "Pioneer of modern institutional forensic science education and laboratory modernization in India."
    },
    {
      id: "adv-3",
      name: "Prof. (Dr.) Nicole Westmarland",
      role: "International Advisory Board",
      institution: "Durham University, United Kingdom",
      discipline: "Gender Violence, Criminology & Restorative Justice",
      bio: "Leading comparative researcher on gender-based violence, sexual offence court experiences, and victim advocacy."
    },
    {
      id: "adv-4",
      name: "Hon. Justice (Retd.) Madan B. Lokur",
      role: "Advisory Board Member",
      institution: "Former Judge, Supreme Court of India",
      discipline: "Juvenile Justice, Prison Reforms & Legal Aid Access",
      bio: "Architect of landmark Indian prison monitoring directives, Juvenile Justice Committee reforms, and legal services empowerment."
    }
  ];

  const filteredBoard = MOCK_BOARD_MEMBERS.filter(member => {
    const matchesQuery = member.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      member.affiliation.toLowerCase().includes(filterQuery.toLowerCase()) ||
      member.discipline.toLowerCase().includes(filterQuery.toLowerCase());
    
    if (selectedRole === 'all') return matchesQuery;
    return matchesQuery && member.role.toLowerCase().includes(selectedRole.toLowerCase());
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-16 animate-fadeIn">
      {/* Page Header */}
      <div className="border-b border-[var(--border-subtle)] pb-8 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-[var(--accent-gold)]">
          <Users className="w-4 h-4" />
          <span>Editorial Governance • Peer Leadership</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[var(--text-primary)] tracking-tight">
          Editorial Board &amp; Advisory Council
        </h1>
        <p className="font-serif italic text-base sm:text-xl text-[var(--accent-gold)]">
          Distinguished Jurists, Forensic Scientists, and Criminologists Guiding The Crime &amp; Society Review
        </p>
      </div>

      {/* Editorial Independence Charter Notice */}
      <section className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="font-serif font-bold text-base text-[var(--text-primary)] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <span>COPE-Aligned Editorial Independence &amp; Integrity</span>
          </h3>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-serif">
            Editorial decision-making is insulated from publisher, financial, or political influence. Board members evaluate all submissions on scholarly merit, empirical rigour, and statutory relevance.
          </p>
        </div>
        <Link
          to="/editorial-philosophy"
          className="shrink-0 px-4 py-2 rounded-lg bg-[var(--accent-navy)] text-white text-xs font-semibold hover:opacity-90 transition-opacity"
        >
          Editorial Philosophy
        </Link>
      </section>

      {/* Primary Editorial Board */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Award className="w-5 h-5 text-[var(--accent-gold)]" />
              <span>Editorial Leadership</span>
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              Editors-in-Chief, Senior Associate Editors, and Section Editors.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[var(--text-muted)]" />
              <input
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder="Filter by name, institution..."
                className="pl-8 pr-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-hidden focus:ring-1 focus:ring-[var(--accent-navy)]"
              />
            </div>
          </div>
        </div>

        {/* Board Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBoard.map((member) => (
            <div
              key={member.id}
              className="p-6 sm:p-7 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--accent-gold)]/50 transition-all space-y-4 shadow-2xs group flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Role badge & ORCID */}
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wide bg-[var(--accent-navy)]/10 text-[var(--accent-navy)]">
                    {member.role}
                  </span>
                  {member.orcid && (
                    <a
                      href={`https://orcid.org/${member.orcid}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      <span>ORCID: {member.orcid}</span>
                    </a>
                  )}
                </div>

                {/* Name & Title */}
                <div>
                  <h3 className="font-serif text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-navy)] transition-colors">
                    {member.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] mt-1 font-mono">
                    <Building2 className="w-3.5 h-3.5 shrink-0 text-[var(--accent-gold)]" />
                    <span>{member.affiliation}</span>
                  </div>
                </div>

                {/* Discipline Tag */}
                <div className="inline-block px-2.5 py-1 rounded-md bg-[var(--bg-page)] text-[var(--text-secondary)] text-xs font-medium border border-[var(--border-subtle)]">
                  Discipline: <strong className="text-[var(--text-primary)]">{member.discipline}</strong>
                </div>

                {/* Biography */}
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-serif leading-relaxed">
                  {member.bio}
                </p>

                {/* Editorial Focus */}
                {member.editorialFocus && (
                  <div className="text-xs text-[var(--text-muted)] font-serif pt-1 border-t border-[var(--border-subtle)]">
                    <strong className="text-[var(--text-primary)] font-mono">Editorial Focus:</strong> {member.editorialFocus}
                  </div>
                )}
              </div>

              {/* Recent Publications / Links */}
              {member.recentPublications && member.recentPublications.length > 0 && (
                <div className="pt-2 border-t border-[var(--border-subtle)] text-[11px] text-[var(--text-muted)] font-serif space-y-1">
                  <span className="font-mono font-bold text-[10px] uppercase block text-[var(--accent-gold)]">
                    Selected Scholarship:
                  </span>
                  {member.recentPublications.map((pub, idx) => (
                    <div key={idx} className="line-clamp-1 italic text-[var(--text-secondary)]">
                      • {pub}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Advisory Board Council */}
      <section className="space-y-6 pt-6 border-t border-[var(--border-subtle)]">
        <div className="space-y-1">
          <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-[var(--accent-gold)]" />
            <span>Advisory Council &amp; Senior Fellows</span>
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-serif">
            Distinguished senior jurists, former appellate judges, and forensic institutional leaders providing strategic and ethical counsel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {advisoryMembers.map((adv) => (
            <div
              key={adv.id}
              className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-2 shadow-2xs"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-serif font-bold text-base text-[var(--text-primary)]">
                  {adv.name}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--bg-page)] text-[var(--text-muted)] border border-[var(--border-subtle)]">
                  {adv.role}
                </span>
              </div>
              <div className="text-xs font-mono text-[var(--accent-gold)]">
                {adv.institution}
              </div>
              <div className="text-xs text-[var(--text-secondary)] font-serif">
                <strong>Area:</strong> {adv.discipline}
              </div>
              <p className="text-xs text-[var(--text-muted)] font-serif pt-1">
                {adv.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Institutional Join Notice */}
      <section className="p-8 rounded-2xl bg-[var(--bg-card-hover)] border border-[var(--border-subtle)] text-center space-y-4">
        <h3 className="font-serif text-xl font-bold text-[var(--text-primary)]">
          Join the Peer Reviewer &amp; Editorial Pool
        </h3>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-serif max-w-xl mx-auto">
          We welcome expressions of interest from active legal academics, forensic examiners at CFSL/FSLs, and criminological researchers holding a PhD or substantive institutional trial experience.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link
            to="/for-reviewers"
            className="px-5 py-2.5 rounded-lg bg-[var(--accent-navy)] text-white text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            Reviewer Guidelines &amp; Registration
          </Link>
          <Link
            to="/contact"
            className="px-5 py-2.5 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-card)] text-[var(--text-primary)] text-xs font-semibold hover:bg-[var(--bg-card-hover)]"
          >
            Contact Editorial Office
          </Link>
        </div>
      </section>
    </div>
  );
};
