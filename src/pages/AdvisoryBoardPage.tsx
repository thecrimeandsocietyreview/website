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
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12 animate-fadeIn">
      {/* Page Header */}
      <div className="border-b border-[var(--border-subtle)] pb-6">
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[var(--text-primary)] tracking-tight">
          Advisory Board
        </h1>
      </div>

      {/* Advisory Mandate Overview */}
      <section className="p-6 sm:p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-4 shadow-xs">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
          Scholarly Counsel &amp; Strategic Oversight
        </h2>
        <div className="text-xs sm:text-sm text-[var(--text-secondary)] font-serif leading-relaxed space-y-3">
          <p>
            The Advisory Board of <em>The Crime &amp; Society Review</em> brings together distinguished jurists, legal scholars, criminologists, forensic examiners, and policy leaders. Members of the Advisory Board provide non-executive strategic counsel on journal priorities, special thematic issues, peer-review standards, and international indexing benchmarks.
          </p>
          <p>
            Operating in alignment with the Committee on Publication Ethics (COPE) core practices, the Board ensures the journal remains insulated from external commercial or partisan influences while maintaining academic excellence across multidisciplinary inquiries.
          </p>
        </div>
      </section>

      {/* Advisory Tracks & Constitution */}
      <section className="space-y-6">
        <div className="border-b border-[var(--border-subtle)] pb-3">
          <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)]">
            Advisory Council Tracks (2026–2028 Tenure)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                <p className="text-xs text-[var(--text-secondary)] font-serif leading-relaxed">
                  {track.focus}
                </p>

                <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[var(--text-muted)]">Target Profile:</span>
                  <span className="text-[var(--text-primary)] font-medium text-right max-w-[65%] truncate">
                    {track.targetProfile}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Nomination & Invitation Notice */}
      <section className="p-8 rounded-2xl bg-[var(--bg-card-hover)] border border-[var(--border-subtle)] text-center space-y-4">
        <h3 className="font-serif text-xl font-bold text-[var(--text-primary)]">
          Advisory Nominations &amp; Academic Expressions of Interest
        </h3>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-serif max-w-xl mx-auto leading-relaxed">
          Nominations and expressions of interest for the Advisory Board are invited from senior professors, research directors, and institutional heads across law, forensic sciences, and criminology.
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
            to="/editorial-board"
            className="px-5 py-2.5 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-card)] text-[var(--text-primary)] text-xs font-semibold hover:bg-[var(--bg-card-hover)]"
          >
            View Editorial Board
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AdvisoryBoardPage;
