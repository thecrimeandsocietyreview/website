import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Award, 
  ShieldCheck, 
  Search, 
  GraduationCap, 
  Building2, 
  CheckCircle2,
  Scale,
  Microscope,
  Brain,
  Landmark,
  ShieldAlert,
  HeartHandshake,
  Clock
} from 'lucide-react';
import { MOCK_BOARD_MEMBERS } from '../data/mockJournalData';

export const EditorialBoardPage: React.FC = () => {
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');

  const editorialTracks = [
    {
      discipline: "Criminal Jurisprudence & Statutory Review",
      focus: "Bharatiya Nyaya Sanhita (BNS), BNSS procedural codification, and BSA evidentiary standards.",
      icon: Scale,
      status: "Inaugural Appointment Underway"
    },
    {
      discipline: "Forensic Sciences & Evidentiary Proof",
      focus: "Digital hashes, DNA profiling, electronic records validation under Section 63 BSA, and laboratory protocols.",
      icon: Microscope,
      status: "Inaugural Appointment Underway"
    },
    {
      discipline: "Behavioural Psychology & Cognitive Science",
      focus: "Interrogation psychology, witness reliability, memory decay, and suspect examination safeguards.",
      icon: Brain,
      status: "Inaugural Appointment Underway"
    },
    {
      discipline: "Carceral Sociology & Penology",
      focus: "Undertrial pendency, prison reform directives, carceral sociology, and rehabilitative justice models.",
      icon: Landmark,
      status: "Inaugural Appointment Underway"
    },
    {
      discipline: "Frontline Policing & Cyber Intelligence",
      focus: "Section 105 BNSS videography protocols, automated law enforcement technologies, and cyber forensic standards.",
      icon: ShieldAlert,
      status: "Inaugural Appointment Underway"
    },
    {
      discipline: "Victimology & Constitutional Due Process",
      focus: "Article 21 fair trial guarantees, vulnerable witness protection, and restorative justice mechanisms.",
      icon: HeartHandshake,
      status: "Inaugural Appointment Underway"
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
          Scholarly Governance &amp; Multi-Perspective Peer Review Leadership
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

      {/* Primary Editorial Board */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Award className="w-5 h-5 text-[var(--accent-gold)]" />
              <span>Editorial Leadership &amp; Subject Tracks</span>
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              Editors-in-Chief, Senior Associate Editors, Section Editors, and Track Convenors.
            </p>
          </div>

          {filteredBoard.length > 0 && (
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
          )}
        </div>

        {/* Board Profiles Grid (when members are present) */}
        {filteredBoard.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredBoard.map((member) => (
              <div
                key={member.id}
                className="p-6 sm:p-7 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--accent-gold)]/50 transition-all space-y-4 shadow-2xs group flex flex-col justify-between"
              >
                <div className="space-y-3">
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

                  <div>
                    <h3 className="font-serif text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-navy)] transition-colors">
                      {member.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] mt-1 font-mono">
                      <Building2 className="w-3.5 h-3.5 shrink-0 text-[var(--accent-gold)]" />
                      <span>{member.affiliation}</span>
                    </div>
                  </div>

                  <div className="inline-block px-2.5 py-1 rounded-md bg-[var(--bg-page)] text-[var(--text-secondary)] text-xs font-medium border border-[var(--border-subtle)]">
                    Discipline: <strong className="text-[var(--text-primary)]">{member.discipline}</strong>
                  </div>

                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-serif leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Formal Status: Board Under Constitution */
          <div className="space-y-6">
            <div className="p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-[var(--accent-gold)]">
                <Clock className="w-4 h-4" />
                <span>Notice of Governance</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[var(--text-primary)]">
                Editorial Board &amp; Advisory Council Under Constitution
              </h3>
              <p className="text-sm text-[var(--text-secondary)] font-serif leading-relaxed max-w-3xl">
                The inaugural Editorial Board and Advisory Council for <em>The Crime &amp; Society Review</em> are currently being formalized. The verified roster of jurists, forensic scientists, criminologists, and legal scholars will be officially published here following the confirmation of appointments.
              </p>
            </div>

            {/* Editorial Portfolios Breakdown */}
            <div className="space-y-3">
              <h3 className="font-serif text-lg font-bold text-[var(--text-primary)]">
                Editorial Subject Tracks &amp; Review Portfolios
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {editorialTracks.map((track, i) => {
                  const Icon = track.icon;
                  return (
                    <div 
                      key={i} 
                      className="p-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="w-8 h-8 rounded-lg bg-[var(--accent-navy)]/10 text-[var(--accent-navy)] flex items-center justify-center">
                          <Icon className="w-4 h-4 text-[var(--accent-gold)]" />
                        </div>
                        <h4 className="font-serif font-bold text-sm text-[var(--text-primary)]">
                          {track.discipline}
                        </h4>
                        <p className="text-xs text-[var(--text-secondary)] font-serif leading-relaxed">
                          {track.focus}
                        </p>
                      </div>
                      <div className="pt-2 border-t border-[var(--border-subtle)] font-mono text-[11px] text-[var(--accent-gold)] font-medium">
                        {track.status}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Institutional Join Notice */}
      <section className="p-8 rounded-2xl bg-[var(--bg-card-hover)] border border-[var(--border-subtle)] text-center space-y-4">
        <h3 className="font-serif text-xl font-bold text-[var(--text-primary)]">
          Join the Peer Reviewer &amp; Editorial Pool
        </h3>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-serif max-w-xl mx-auto">
          We welcome expressions of interest from active legal academics, forensic examiners, and criminological researchers holding doctoral qualifications or substantive institutional trial expertise.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link
            to="/contact"
            className="px-5 py-2.5 rounded-lg bg-[var(--accent-navy)] text-white text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            Contact Editorial Office
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
