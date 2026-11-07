import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Download, 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  Scale, 
  Binary, 
  Users, 
  Layers, 
  Globe, 
  ShieldCheck,
  X,
  BookOpen
} from 'lucide-react';

interface PriorityTrack {
  id: number;
  trackNumber: string;
  title: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  topics: string[];
}

const PRIORITY_TRACKS: PriorityTrack[] = [
  {
    id: 1,
    trackNumber: 'Track 01',
    category: 'Criminology',
    icon: TrendingUp,
    title: 'Emerging Trends and Contemporary Perspectives in Criminology',
    description: 'Contemporary theoretical frameworks, evolving criminal typologies, digital illicit networks, and predictive global trends in criminal behavior.',
    topics: [
      'Crime and Criminality',
      'Contemporary Criminological Theory',
      'Emerging Crimes',
      'Criminal Behaviour',
      'Victimology',
      'Crime Prevention and Control',
      'Organised and Transnational Crime',
      'White-Collar and Corporate Crime',
      'Cyber Criminology',
      'AI-Enabled Crime',
      'Cybercrime and Digital Exploitation',
      'Deepfake and Synthetic Media Crime',
      'Dark-Web Criminality',
      'Cryptocurrency and Financial Crime',
      'Technology-Facilitated Sexual Crime',
      'Terrorism and Violent Extremism',
      'Environmental and Wildlife Crime',
      'Gender-Based Violence',
      'Crimes Against Children',
      'Predictive and Future Criminology',
      'Global Crime Trends'
    ]
  },
  {
    id: 2,
    trackNumber: 'Track 02',
    category: 'Criminal Justice & Law',
    icon: Scale,
    title: 'Criminal Justice, Law, Policing and Institutional Responses',
    description: 'Substantive criminal law doctrines, statutory procedural reforms, evidence governance, custodial penology, and police oversight.',
    topics: [
      'Criminal Law and Legal Reform',
      'Criminal Justice Systems',
      'Policing and Law Enforcement',
      'Police Accountability',
      'Investigative Practices',
      'Community and Intelligence-Led Policing',
      'Smart Policing',
      'Criminal Justice Administration',
      'Corrections and Prisons',
      'Courts and Judicial Processes',
      'Access to Justice',
      'Victim-Centred Justice',
      'Institutional Governance and Reform'
    ]
  },
  {
    id: 3,
    trackNumber: 'Track 03',
    category: 'Forensic Science',
    icon: Binary,
    title: 'Forensic Science, Technology and the Transformation of Justice',
    description: 'Scientific methodologies in forensic chemistry, biological markers, chain of custody verification, and artificial intelligence in digital forensics.',
    topics: [
      'Forensic Science',
      'Forensic Investigation',
      'Digital and Cyber Forensics',
      'Artificial Intelligence in Justice',
      'Machine Learning and Crime Analytics',
      'Digital Evidence',
      'DNA and Biological Forensics',
      'Fingerprint and Trace Evidence',
      'Biometrics',
      'Surveillance and Security Technologies',
      'Blockchain and Evidence Integrity',
      'Technology-Enabled Investigation',
      'Data-Driven Policing',
      'Emerging Forensic Technologies'
    ]
  },
  {
    id: 4,
    trackNumber: 'Track 04',
    category: 'Social Justice',
    icon: Users,
    title: 'Crime, Society, Victimisation and Social Justice',
    description: 'Structural roots of deviance, gendered victimization, marginalized communities, carceral sociology, and transformative victim restoration.',
    topics: [
      'Crime and Society',
      'Sociology of Crime',
      'Victimisation and Victim Experiences',
      'Gender and Crime',
      'Children and Youth',
      'Vulnerability and Marginalisation',
      'Inequality and Crime',
      'Social Control',
      'Community Safety',
      'Crime and Culture',
      'Media and Crime',
      'Criminal Psychology',
      'Behavioural Dimensions of Crime',
      'Human Rights and Justice',
      'Victim Support and Rehabilitation'
    ]
  },
  {
    id: 5,
    trackNumber: 'Track 05',
    category: 'Interdisciplinary Studies',
    icon: Layers,
    title: 'Innovative, Interdisciplinary and Critical Approaches to Crime and Justice',
    description: 'Critical criminology, behavioral economics, systematic methodologies, interdisciplinary policy synthesis, and empirical legal analyses.',
    topics: [
      'Critical Criminology',
      'Interdisciplinary Crime Research',
      'Comparative Crime Studies',
      'Criminological Policy Analysis',
      'Conceptual and Theoretical Scholarship',
      'Systematic and Scoping Reviews',
      'Methodological Innovations',
      'Empirical and Mixed-Methods Research',
      'Case-Based Inquiry',
      'Evidence-Informed Criminal Justice',
      'Psychology and Crime',
      'Sociology and Crime',
      'Law and Criminology',
      'Technology and Society',
      'Public Policy and Justice'
    ]
  },
  {
    id: 6,
    trackNumber: 'Track 06',
    category: 'Transnational Security',
    icon: Globe,
    title: 'International Crime, Diplomacy, Geopolitics and Transnational Security',
    description: 'Cross-border criminal cartels, illicit global financial flows, international human rights law, extradition treaties, and multilateral policing diplomacy.',
    topics: [
      'Transnational Organised Crime',
      'Cross-Border Criminality',
      'Terrorism and Violent Extremism',
      'Human Trafficking and Migrant Smuggling',
      'Transnational Cybercrime',
      'Money Laundering and Illicit Financial Flows',
      'Drug and Arms Trafficking',
      'Maritime and Border Crime',
      'Crime and Foreign Policy',
      'Crime and Geopolitical Conflict',
      'International Criminal Justice',
      'International Law Enforcement Cooperation',
      'Extradition and Mutual Legal Assistance',
      'Intelligence Sharing',
      'Sanctions and Illicit Networks',
      'Global Crime Governance and Emerging Security Threats'
    ]
  }
];

export const IssuesPage: React.FC = () => {
  const [showTracksModal, setShowTracksModal] = useState(false);

  // Close modal on Escape key and lock body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowTracksModal(false);
    };
    if (showTracksModal) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showTracksModal]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 animate-fadeIn">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[var(--border-subtle)]">
        <div className="space-y-1">
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Inaugural Issue — Volume 01, Issue 01
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="text-xs font-mono text-[var(--text-muted)] bg-[var(--bg-card)] px-3.5 py-1.5 rounded-full border border-[var(--border-subtle)] flex items-center gap-2 shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">Call for Papers Open</span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Container Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ========================================================
            LEFT SIDE: Issue Cover Artwork & Metadata (4 cols)
        ======================================================== */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Issue Cover Artwork Container */}
          <div className="bg-[var(--bg-card)] p-4 sm:p-5 rounded-2xl border border-[var(--border-subtle)] shadow-md space-y-4">
            
            {/* Clean Static Image (Small, Compact) */}
            <div className="relative rounded-xl overflow-hidden shadow-lg border border-amber-500/20 bg-slate-950 max-w-[210px] sm:max-w-[230px] mx-auto">
              <img 
                src="/currentissue/vol-1-oct-dec-2026.jpeg" 
                alt="The Crime & Society Review - Volume I Issue I Cover: Rethinking Crime, Justice & Society" 
                className="w-full h-auto object-cover select-none"
                loading="eager"
              />
            </div>

            {/* Issue Title & Description Under Cover */}
            <div className="space-y-1.5 pt-1 text-center">
              <span className="inline-block text-[10px] font-mono font-bold tracking-widest text-[var(--accent-gold)] uppercase border border-[var(--accent-gold)]/40 px-2.5 py-0.5 rounded-full">
                INAUGURAL ISSUE COVER
              </span>
              <h3 className="font-serif text-base font-bold text-[var(--text-primary)] leading-snug">
                Rethinking Crime, Justice &amp; Society
              </h3>
              <p className="text-xs font-serif italic text-[var(--text-secondary)]">
                Emerging Perspectives for the 21st Century
              </p>
            </div>

            {/* Action Buttons Below Cover */}
            <div className="space-y-2 pt-2 border-t border-[var(--border-subtle)]">
              <Link
                to="/submit"
                className="w-full py-2.5 px-4 rounded-xl bg-[var(--accent-navy)] text-white text-xs font-bold hover:opacity-95 transition-opacity flex items-center justify-center gap-2 shadow-sm"
              >
                <FileText className="w-4 h-4 text-amber-300" />
                <span>Submit Manuscript for This Issue</span>
              </Link>

              <a
                href="/currentissue/Content-vol-1-oct-dec-2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Content-vol-1-oct-dec-2026.pdf"
                className="w-full py-2.5 px-4 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] text-[var(--text-primary)] text-xs font-semibold transition-colors flex items-center justify-center gap-2 shadow-2xs"
              >
                <Download className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                <span>Download Editorial Content (PDF)</span>
              </a>
            </div>

          </div>

          {/* Quick Issue Stats Card */}
          <div className="bg-[var(--bg-card)] p-5 rounded-2xl border border-[var(--border-subtle)] shadow-xs space-y-3.5">
            <h4 className="font-serif text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[var(--accent-gold)]" />
              <span>Issue Publication Facts</span>
            </h4>

            <div className="text-xs space-y-2.5 text-[var(--text-secondary)] font-mono">
              <div className="flex justify-between items-center py-1 border-b border-[var(--border-subtle)]/60">
                <span className="text-[var(--text-muted)]">Format:</span>
                <strong className="text-[var(--text-primary)] font-semibold">Online</strong>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[var(--border-subtle)]/60">
                <span className="text-[var(--text-muted)]">Publication Model/Frequency:</span>
                <strong className="text-[var(--text-primary)] font-semibold">Fortnightly</strong>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[var(--border-subtle)]/60">
                <span className="text-[var(--text-muted)]">Subject:</span>
                <strong className="text-[var(--text-primary)] font-semibold text-right">Multidisciplinary Subjects</strong>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[var(--border-subtle)]/60">
                <span className="text-[var(--text-muted)]">Language:</span>
                <strong className="text-[var(--text-primary)] font-semibold">English</strong>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[var(--border-subtle)]/60">
                <span className="text-[var(--text-muted)]">Starting Year:</span>
                <strong className="text-[var(--text-primary)] font-semibold">2026</strong>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[var(--border-subtle)]/60">
                <span className="text-[var(--text-muted)]">Volume &amp; Issue:</span>
                <strong className="text-[var(--text-primary)] font-semibold">Volume 01, Issue 01</strong>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[var(--border-subtle)]/60">
                <span className="text-[var(--text-muted)]">Publication Period:</span>
                <strong className="text-[var(--text-primary)] font-semibold">Oct – Dec 2026</strong>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[var(--border-subtle)]/60">
                <span className="text-[var(--text-muted)]">Peer Review:</span>
                <strong className="text-[var(--text-primary)] font-semibold">Double-Blind Peer Review</strong>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[var(--border-subtle)]/60">
                <span className="text-[var(--text-muted)]">Article Charges:</span>
                <strong className="text-emerald-600 dark:text-emerald-400 font-bold">₹0 APC (Open Access)</strong>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-[var(--text-muted)]">Target Length:</span>
                <strong className="text-[var(--text-primary)] font-semibold">4,000 – 10,000 Words</strong>
              </div>
            </div>
          </div>

        </div>

        {/* ========================================================
            RIGHT SIDE: Content From PDF & 6 Priority Editorial Tracks (8 cols)
        ======================================================== */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Main Thematic Banner (Extracted from PDF Header) */}
          <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden space-y-3">
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 space-y-2">
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                Rethinking Crime, Justice &amp; Society:
                <br />
                <span className="text-[var(--accent-gold)] dark:text-amber-400 font-serif italic text-xl sm:text-2xl font-normal">
                  Emerging Perspectives for the 21st Century
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 font-serif leading-relaxed pt-1">
                Priority Editorial Tracks for Vol-I ; Issue-I ; October-December/2026 (Inaugural Issue). The journal invites high-quality empirical studies, doctrinal evaluations, forensic methodologies, and critical policy perspectives across six structured tracks. Accepted papers receive DOI assignment and continuous publication.
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowTracksModal(true)}
                  className="text-xs sm:text-sm text-amber-300 hover:text-amber-200 underline underline-offset-4 decoration-amber-400/80 hover:decoration-amber-200 transition-colors cursor-pointer font-serif font-medium inline-flex items-center gap-1.5 group"
                >
                  <span>view full issue description</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* In place of tracks 1 to 6: Coming Soon section */}
          <div className="p-8 sm:p-12 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] text-center space-y-4 shadow-2xs">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-amber-500/10 text-[var(--accent-gold)] border border-amber-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span>Coming Soon</span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
              Inaugural Issue Articles — Coming Soon
            </h3>

            <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-serif max-w-lg mx-auto leading-relaxed text-justify sm:text-center">
              Manuscripts for Volume 01, Issue 01 are currently undergoing double-blind peer review and editorial production under our continuous rolling publication model. Accepted papers will be released continuously with persistent DOIs.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowTracksModal(true)}
                className="text-xs font-mono text-[var(--accent-gold)] hover:underline inline-flex items-center gap-1.5"
              >
                <span>Click here to view full issue description &amp; priority tracks</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Bottom Callout & Submission Info */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900/5 to-indigo-500/10 border border-[var(--border-strong)] space-y-3">
            <h4 className="font-serif font-bold text-base text-[var(--text-primary)] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[var(--accent-gold)]" />
              <span>Ready to Submit to the Inaugural Issue?</span>
            </h4>
            <p className="text-xs text-[var(--text-secondary)] font-serif leading-relaxed text-justify">
              All manuscripts received for Volume 01, Issue 01 undergo double-blind peer review on a rolling continuous basis. There are zero submission fees and zero publication charges (₹0 APC Open Access). Published papers are immediately made available online and assigned persistent digital identifiers.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to="/submit"
                className="px-5 py-2.5 rounded-xl bg-[var(--accent-gold)] hover:bg-[var(--accent-gold-hover)] text-slate-950 text-xs font-bold transition-all flex items-center gap-1.5 shadow-md"
              >
                <span>Submit Manuscript Online</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href="/currentissue/Content-vol-1-oct-dec-2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Content-vol-1-oct-dec-2026.pdf"
                className="px-4 py-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] text-xs font-semibold text-[var(--text-primary)] transition-all flex items-center gap-1.5 shadow-2xs"
              >
                <Download className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                <span>Download Call &amp; Topics PDF</span>
              </a>
              <Link
                to="/contact"
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:underline"
              >
                Inquire with Editorial Team
              </Link>
            </div>
          </div>

        </div>

      </div>

      {/* Full Issue Description & Priority Tracks Modal */}
      {showTracksModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm animate-fadeIn"
          onClick={() => setShowTracksModal(false)}
        >
          <div 
            className="relative w-full max-w-4xl max-h-[90vh] bg-[var(--bg-card)] border border-[var(--border-strong)] rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-[var(--border-subtle)] flex items-start justify-between gap-4 bg-[var(--bg-card)] sticky top-0 z-10">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-amber-500/10 text-[var(--accent-gold)] border border-amber-500/20">
                    Full Issue Description
                  </span>
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">
                    Volume 01 • Issue 01 (2026)
                  </span>
                </div>
                <h3 className="font-serif text-lg sm:text-2xl font-bold text-[var(--text-primary)] leading-snug">
                  Rethinking Crime, Justice &amp; Society: Emerging Perspectives for the 21st Century
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowTracksModal(false)}
                className="p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] transition-colors shrink-0 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body - Scrollable Tracks 1 to 6 */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
              {/* Comprehensive Description Banner */}
              <div className="p-4 sm:p-5 rounded-xl bg-[var(--bg-page)] border border-[var(--border-subtle)] space-y-2">
                <h4 className="font-serif font-bold text-sm text-[var(--text-primary)] flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[var(--accent-gold)]" />
                  <span>Inaugural Editorial Overview &amp; Call for Papers</span>
                </h4>
                <p className="text-xs text-[var(--text-secondary)] font-serif leading-relaxed text-justify">
                  Priority Editorial Tracks for Vol-I ; Issue-I ; October-December/2026 (Inaugural Issue). The journal invites high-quality empirical studies, doctrinal evaluations, forensic methodologies, and critical policy perspectives across six structured tracks. Accepted papers receive DOI assignment and continuous publication.
                </p>
              </div>

              {/* Six Priority Tracks */}
              <div className="space-y-4">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                  Six Priority Editorial Tracks
                </h4>

                {PRIORITY_TRACKS.map((track) => {
                  const IconComponent = track.icon;
                  return (
                    <div
                      key={track.id}
                      className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--accent-gold)]/60 transition-colors shadow-2xs space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--accent-gold)]">
                                {track.trackNumber}
                              </span>
                              <span className="text-[10px] font-mono text-[var(--text-muted)] bg-[var(--bg-page)] px-2 py-0.5 rounded border border-[var(--border-subtle)]">
                                {track.category}
                              </span>
                            </div>
                            <h5 className="font-serif text-sm sm:text-base font-bold text-[var(--text-primary)] leading-snug pt-0.5">
                              {track.title}
                            </h5>
                          </div>
                        </div>

                        <Link
                          to="/submit"
                          onClick={() => setShowTracksModal(false)}
                          className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-[var(--accent-gold)] hover:text-[var(--accent-gold-hover)] shrink-0 px-2.5 py-1 rounded-md border border-[var(--border-subtle)] hover:border-[var(--accent-gold)] transition-colors"
                        >
                          <span>Submit</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>

                      <p className="text-xs text-[var(--text-secondary)] font-serif leading-relaxed text-justify">
                        {track.description}
                      </p>

                      <div className="space-y-1.5 pt-2 border-t border-[var(--border-subtle)]">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] block">
                          Included Research Areas ({track.topics.length}):
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {track.topics.map((topic, i) => (
                            <span
                              key={i}
                              className="text-[11px] px-2 py-0.5 rounded-md border font-serif bg-[var(--bg-page)] text-[var(--text-primary)] border-[var(--border-subtle)]"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-[var(--border-subtle)] bg-[var(--bg-card)] flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-mono text-[var(--text-muted)]">
                ₹0 APC • Double-Blind Peer Review • Continuous Publication
              </span>
              <div className="flex items-center gap-2">
                <Link
                  to="/submit"
                  onClick={() => setShowTracksModal(false)}
                  className="px-4 py-2 rounded-xl bg-[var(--accent-gold)] text-slate-950 text-xs font-bold hover:bg-[var(--accent-gold-hover)] transition-colors flex items-center gap-1.5"
                >
                  <span>Submit to This Issue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  type="button"
                  onClick={() => setShowTracksModal(false)}
                  className="px-4 py-2 rounded-xl border border-[var(--border-strong)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssuesPage;
