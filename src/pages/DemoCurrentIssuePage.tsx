import React, { useState, useMemo } from 'react';
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
  Search,
  BookOpen,
  ExternalLink,
  Copy,
  Check,
  Share2,
  Eye,
  Quote,
  Filter,
  Calendar,
  Award,
  ChevronDown,
  ChevronUp,
  FileCheck2,
  X
} from 'lucide-react';

interface Author {
  name: string;
  affiliation: string;
  email?: string;
  orcid?: string;
  isCorresponding?: boolean;
}

interface Article {
  id: string;
  articleNumber: string;
  trackId: number;
  trackName: string;
  categoryBadge: string;
  articleType: string;
  title: string;
  authors: Author[];
  receivedDate: string;
  acceptedDate: string;
  publishedDate: string;
  doi: string;
  doiUrl: string;
  pages: string;
  pdfUrl: string;
  pdfFileName: string;
  pdfFileSize: string;
  abstract: string;
  keywords: string[];
  isFeatured?: boolean;
  metrics: {
    views: number;
    downloads: number;
    citations: number;
  };
  citations: {
    apa: string;
    mla: string;
    chicago: string;
    harvard: string;
    bibtex: string;
  };
}

const PUBLISHED_ARTICLES: Article[] = [
  {
    id: 'csr-2026-010101',
    articleNumber: 'Article 01',
    trackId: 6,
    trackName: 'Track 06: International Crime, Diplomacy, Geopolitics and Transnational Security',
    categoryBadge: 'Transnational Law & Governance',
    articleType: 'Original Research Article',
    title: 'Private International Law in Brazil: Overview and Recent Developments',
    authors: [
      {
        name: 'Carmen Tiburcio',
        affiliation: 'Law School, Rio de Janeiro State University, Rio de Janeiro, Brazil',
        email: 'carmen.tiburcio@bfbm.com.br',
        isCorresponding: true
      },
      {
        name: 'Ely Caetano Xavier Junior',
        affiliation: 'Department of Legal Sciences, Federal Rural University of Rio de Janeiro, Seropédica, Brazil',
        email: 'exavier@uerj.br'
      }
    ],
    receivedDate: 'August 5, 2026',
    acceptedDate: 'October 6, 2026',
    publishedDate: 'October 9, 2026',
    doi: '10.59265/csr.2026.010101',
    doiUrl: 'https://doi.org/10.59265/csr.2026.010101',
    pages: 'pp. 1106–1143',
    pdfUrl: '/currentissue/CSR-2026-01-Tiburcio-Private-International-Law.pdf',
    pdfFileName: 'CSR-2026-01-Tiburcio-Private-International-Law.pdf',
    pdfFileSize: '493 KB',
    isFeatured: true,
    abstract: `Private International Law governs legal relationships connected with more than one legal system, and the Brazilian tradition assigns to it four independent subject matters: nationality, the legal status of aliens, the determination of the applicable law, and jurisdiction in international litigation. This article offers an overview of the discipline as it currently stands in Brazil, organized around those four subject matters and addressed to readers trained in other legal systems. It first examines the attribution and loss of Brazilian nationality, from the international framework governing the matter to the constitutional rules on nationality by birth and by naturalization. It then turns to the legal status of aliens, covering entry into and departure from the territory, the rights of migrants once admitted, and the measures of compulsory removal. The third part addresses the determination of the applicable law, examining the classes of norms the discipline employs, the Brazilian connecting rules for persons, family, property, obligations, succession, and legal entities, and the principles that control their operation. The fourth part deals with jurisdiction, setting out the heads of Brazilian jurisdiction under the Code of Civil Procedure and the grounds on which jurisdiction may be expanded or restricted. The article argues that command of this body of rules and principles is strategic rather than merely technical, since cross-border relationships are settled at an intersection of legal systems, courts, and applicable laws, and the choices made at that intersection frequently determine substantive outcomes long before any dispute arises. It further shows that the four subject matters have been modernized at markedly different rates over the last decades: nationality, migration, and jurisdiction have all been considerably reformed, whereas conflict of laws remains governed by a statute of 1942, which a Draft General Law concluded in 2025 now proposes to replace.`,
    keywords: [
      'Private International Law',
      'Brazil',
      'Nationality',
      'Legal Status of Aliens',
      'Applicable Law',
      'International Jurisdiction',
      'Legislative Reforms'
    ],
    metrics: {
      views: 1428,
      downloads: 412,
      citations: 4
    },
    citations: {
      apa: `Tiburcio, C., & Xavier Junior, E. C. (2026). Private International Law in Brazil: Overview and Recent Developments. The Crime and Society Review, 1(1), 1106–1143. https://doi.org/10.59265/csr.2026.010101`,
      mla: `Tiburcio, Carmen, and Ely Caetano Xavier Junior. "Private International Law in Brazil: Overview and Recent Developments." The Crime and Society Review, vol. 1, no. 1, 2026, pp. 1106–1143.`,
      chicago: `Tiburcio, Carmen, and Ely Caetano Xavier Junior. 2026. "Private International Law in Brazil: Overview and Recent Developments." The Crime and Society Review 1 (1): 1106–1143.`,
      harvard: `Tiburcio, C. and Xavier Junior, E.C., 2026. Private International Law in Brazil: Overview and Recent Developments. The Crime and Society Review, 1(1), pp.1106–1143.`,
      bibtex: `@article{tiburcio2026private,
  title={Private International Law in Brazil: Overview and Recent Developments},
  author={Tiburcio, Carmen and Xavier Junior, Ely Caetano},
  journal={The Crime and Society Review},
  volume={1},
  number={1},
  pages={1106--1143},
  year={2026},
  doi={10.59265/csr.2026.010101}
}`
    }
  },
  {
    id: 'csr-2026-010102',
    articleNumber: 'Article 02',
    trackId: 3,
    trackName: 'Track 03: Forensic Science, Technology and the Transformation of Justice',
    categoryBadge: 'AI & Algorithmic Forensics',
    articleType: 'Doctrinal & Empirical Investigation',
    title: 'Algorithmic Surveillance and Procedural Due Process: Evaluating AI-Driven Predictive Policing Under the Rashomon Lens',
    authors: [
      {
        name: 'Dr. Arvind Tiwari',
        affiliation: 'School of Law, Rights and Constitutional Governance, Tata Institute of Social Sciences (TISS), Mumbai',
        isCorresponding: true
      },
      {
        name: 'Abhinav Kumar',
        affiliation: 'Centre for Criminology and Justice, TISS, Mumbai'
      }
    ],
    receivedDate: 'August 12, 2026',
    acceptedDate: 'October 14, 2026',
    publishedDate: 'October 22, 2026',
    doi: '10.59265/csr.2026.010102',
    doiUrl: 'https://doi.org/10.59265/csr.2026.010102',
    pages: 'pp. 1144–1172',
    pdfUrl: '/currentissue/Content-vol-1-oct-dec-2026.pdf',
    pdfFileName: 'CSR-2026-02-Tiwari-Kumar-Predictive-Policing.pdf',
    pdfFileSize: '385 KB',
    abstract: `Predictive policing models deployed in metropolitan urban spaces increasingly employ deep learning neural architectures to forecast spatial crime hot-spots and individual recidivism risk. This study investigates the friction between black-box algorithmic probability scores and the constitutional doctrine of procedural due process. Drawing upon the epistemological framework of the Rashomon effect, we demonstrate how algorithmic evidence constructs divergent realities across policing agencies, defense counsels, and marginalized civilian communities. Through empirical audits of algorithmic calibration data across five judicial districts, the authors argue for statutory evidentiary standards governing predictive indicators prior to prosecutorial reliance.`,
    keywords: [
      'Predictive Policing',
      'Artificial Intelligence',
      'Procedural Due Process',
      'Rashomon Approach',
      'Algorithmic Bias',
      'Evidentiary Integrity'
    ],
    metrics: {
      views: 942,
      downloads: 268,
      citations: 2
    },
    citations: {
      apa: `Tiwari, A., & Kumar, A. (2026). Algorithmic Surveillance and Procedural Due Process: Evaluating AI-Driven Predictive Policing Under the Rashomon Lens. The Crime and Society Review, 1(1), 1144–1172. https://doi.org/10.59265/csr.2026.010102`,
      mla: `Tiwari, Arvind, and Abhinav Kumar. "Algorithmic Surveillance and Procedural Due Process: Evaluating AI-Driven Predictive Policing Under the Rashomon Lens." The Crime and Society Review, vol. 1, no. 1, 2026, pp. 1144–1172.`,
      chicago: `Tiwari, Arvind, and Abhinav Kumar. 2026. "Algorithmic Surveillance and Procedural Due Process: Evaluating AI-Driven Predictive Policing Under the Rashomon Lens." The Crime and Society Review 1 (1): 1144–1172.`,
      harvard: `Tiwari, A. and Kumar, A., 2026. Algorithmic Surveillance and Procedural Due Process: Evaluating AI-Driven Predictive Policing Under the Rashomon Lens. The Crime and Society Review, 1(1), pp.1144–1172.`,
      bibtex: `@article{tiwari2026algorithmic,
  title={Algorithmic Surveillance and Procedural Due Process: Evaluating AI-Driven Predictive Policing Under the Rashomon Lens},
  author={Tiwari, Arvind and Kumar, Abhinav},
  journal={The Crime and Society Review},
  volume={1},
  number={1},
  pages={1144--1172},
  year={2026},
  doi={10.59265/csr.2026.010102}
}`
    }
  },
  {
    id: 'csr-2026-010103',
    articleNumber: 'Article 03',
    trackId: 2,
    trackName: 'Track 02: Criminal Justice, Law, Policing and Institutional Responses',
    categoryBadge: 'Penology & Institutional Reform',
    articleType: 'Critical Review & Empirical Study',
    title: 'Restorative Carceral Architectures: Recidivism Mitigation and Custodial Human Rights in Post-Colonial Jurisdictions',
    authors: [
      {
        name: 'Prof. (Dr.) Priya Sepaha',
        affiliation: 'School of Law, National Forensic Sciences University (NFSU)',
        isCorresponding: true
      },
      {
        name: 'Dr. Md. Shabbir Alam',
        affiliation: 'Centre for Penology and Criminal Justice Studies'
      }
    ],
    receivedDate: 'August 28, 2026',
    acceptedDate: 'October 18, 2026',
    publishedDate: 'October 28, 2026',
    doi: '10.59265/csr.2026.010103',
    doiUrl: 'https://doi.org/10.59265/csr.2026.010103',
    pages: 'pp. 1173–1204',
    pdfUrl: '/currentissue/Content-vol-1-oct-dec-2026.pdf',
    pdfFileName: 'CSR-2026-03-Sepaha-Alam-Carceral-Architectures.pdf',
    pdfFileSize: '410 KB',
    abstract: `Custodial facilities across post-colonial legal frameworks maintain punitive physical architectures inherited from nineteenth-century penal statutes. This article examines empirical longitudinal outcomes from transitional open-prison initiatives and restorative carceral design pilots. Analyzing recidivism data across a cohort of 1,200 non-violent offenders over a 36-month window, the authors establish a statistically significant correlation (p < 0.01) between architectural humanization, mental healthcare access, and sustained post-release social reintegration. Legal avenues for structural statutory amendments to model prison manuals are formulated in detail.`,
    keywords: [
      'Penology',
      'Prison Reform',
      'Custodial Human Rights',
      'Restorative Justice',
      'Recidivism Reduction',
      'Post-Colonial Law'
    ],
    metrics: {
      views: 785,
      downloads: 194,
      citations: 1
    },
    citations: {
      apa: `Sepaha, P., & Alam, M. S. (2026). Restorative Carceral Architectures: Recidivism Mitigation and Custodial Human Rights in Post-Colonial Jurisdictions. The Crime and Society Review, 1(1), 1173–1204. https://doi.org/10.59265/csr.2026.010103`,
      mla: `Sepaha, Priya, and Md. Shabbir Alam. "Restorative Carceral Architectures: Recidivism Mitigation and Custodial Human Rights in Post-Colonial Jurisdictions." The Crime and Society Review, vol. 1, no. 1, 2026, pp. 1173–1204.`,
      chicago: `Sepaha, Priya, and Md. Shabbir Alam. 2026. "Restorative Carceral Architectures: Recidivism Mitigation and Custodial Human Rights in Post-Colonial Jurisdictions." The Crime and Society Review 1 (1): 1173–1204.`,
      harvard: `Sepaha, P. and Alam, M.S., 2026. Restorative Carceral Architectures: Recidivism Mitigation and Custodial Human Rights in Post-Colonial Jurisdictions. The Crime and Society Review, 1(1), pp.1173–1204.`,
      bibtex: `@article{sepaha2026restorative,
  title={Restorative Carceral Architectures: Recidivism Mitigation and Custodial Human Rights in Post-Colonial Jurisdictions},
  author={Sepaha, Priya and Alam, Md. Shabbir},
  journal={The Crime and Society Review},
  volume={1},
  number={1},
  pages={1173--1204},
  year={2026},
  doi={10.59265/csr.2026.010103}
}`
    }
  },
  {
    id: 'csr-2026-010104',
    articleNumber: 'Article 04',
    trackId: 4,
    trackName: 'Track 04: Crime, Society, Victimisation and Social Justice',
    categoryBadge: 'Victimology & Cyber Protection',
    articleType: 'Socio-Legal Inquiry',
    title: 'Gendered Cyber-Victimisation and Digital Evidence Admissibility: Bridging Forensic Protocols with Victim-Centric Support',
    authors: [
      {
        name: 'Dr. Dimple T. Raval',
        affiliation: 'Department of Law, Gujarat National Law University (GNLU)',
        isCorresponding: true
      },
      {
        name: 'Ms. Sushree Saswati Mishra',
        affiliation: 'Centre for Women and Criminal Justice'
      }
    ],
    receivedDate: 'September 5, 2026',
    acceptedDate: 'October 24, 2026',
    publishedDate: 'October 30, 2026',
    doi: '10.59265/csr.2026.010104',
    doiUrl: 'https://doi.org/10.59265/csr.2026.010104',
    pages: 'pp. 1205–1232',
    pdfUrl: '/currentissue/Content-vol-1-oct-dec-2026.pdf',
    pdfFileName: 'CSR-2026-04-Raval-Mishra-Cyber-Victimisation.pdf',
    pdfFileSize: '340 KB',
    abstract: `Non-consensual image sharing, deepfake harassment, and digital stalking disproportionately target female internet users, yet conventional forensic electronic discovery mechanisms place acute revictimizing burdens upon complainants. This article explores procedural evidentiary barriers under electronic records certification doctrines. Proposing a dual-layer trauma-informed electronic chain-of-custody model, the inquiry illustrates how victim confidentiality can be preserved while upholding constitutional thresholds of defense cross-examination.`,
    keywords: [
      'Cyber-Victimology',
      'Digital Evidence',
      'Gender-Based Violence',
      'Electronic Certification',
      'Chain of Custody',
      'Trauma-Informed Justice'
    ],
    metrics: {
      views: 654,
      downloads: 147,
      citations: 0
    },
    citations: {
      apa: `Raval, D. T., & Mishra, S. S. (2026). Gendered Cyber-Victimisation and Digital Evidence Admissibility: Bridging Forensic Protocols with Victim-Centric Support. The Crime and Society Review, 1(1), 1205–1232. https://doi.org/10.59265/csr.2026.010104`,
      mla: `Raval, Dimple T., and Sushree Saswati Mishra. "Gendered Cyber-Victimisation and Digital Evidence Admissibility: Bridging Forensic Protocols with Victim-Centric Support." The Crime and Society Review, vol. 1, no. 1, 2026, pp. 1205–1232.`,
      chicago: `Raval, Dimple T., and Sushree Saswati Mishra. 2026. "Gendered Cyber-Victimisation and Digital Evidence Admissibility: Bridging Forensic Protocols with Victim-Centric Support." The Crime and Society Review 1 (1): 1205–1232.`,
      harvard: `Raval, D.T. and Mishra, S.S., 2026. Gendered Cyber-Victimisation and Digital Evidence Admissibility: Bridging Forensic Protocols with Victim-Centric Support. The Crime and Society Review, 1(1), pp.1205–1232.`,
      bibtex: `@article{raval2026gendered,
  title={Gendered Cyber-Victimisation and Digital Evidence Admissibility: Bridging Forensic Protocols with Victim-Centric Support},
  author={Raval, Dimple T. and Mishra, Sushree Saswati},
  journal={The Crime and Society Review},
  volume={1},
  number={1},
  pages={1205--1232},
  year={2026},
  doi={10.59265/csr.2026.010104}
}`
    }
  }
];

export const DemoCurrentIssuePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrackFilter, setSelectedTrackFilter] = useState<number | 'all'>('all');
  const [expandedAbstracts, setExpandedAbstracts] = useState<Record<string, boolean>>({
    'csr-2026-010101': true // Featured article abstract open by default for immediate preview
  });

  // Citation Modal State
  const [citationModalArticle, setCitationModalArticle] = useState<Article | null>(null);
  const [selectedCitationFormat, setSelectedCitationFormat] = useState<'apa' | 'mla' | 'chicago' | 'harvard' | 'bibtex'>('apa');
  const [copiedFormat, setCopiedFormat] = useState(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleAbstract = (id: string) => {
    setExpandedAbstracts(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCopyCitation = () => {
    if (!citationModalArticle) return;
    const text = citationModalArticle.citations[selectedCitationFormat];
    navigator.clipboard.writeText(text);
    setCopiedFormat(true);
    setTimeout(() => setCopiedFormat(false), 2000);
  };

  const handleShare = (article: Article) => {
    const shareUrl = `${window.location.origin}/demo-current-issue#${article.id}`;
    navigator.clipboard.writeText(shareUrl);
    showToast(`Direct citation link copied to clipboard for: "${article.title.substring(0, 36)}..."`);
  };

  // Filter articles based on search & track
  const filteredArticles = useMemo(() => {
    return PUBLISHED_ARTICLES.filter(article => {
      const matchesTrack = selectedTrackFilter === 'all' || article.trackId === selectedTrackFilter;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesTrack;

      const inTitle = article.title.toLowerCase().includes(q);
      const inAuthors = article.authors.some(a => a.name.toLowerCase().includes(q) || a.affiliation.toLowerCase().includes(q));
      const inKeywords = article.keywords.some(k => k.toLowerCase().includes(q));
      const inAbstract = article.abstract.toLowerCase().includes(q);
      const inDoi = article.doi.toLowerCase().includes(q);

      return matchesTrack && (inTitle || inAuthors || inKeywords || inAbstract || inDoi);
    });
  }, [searchQuery, selectedTrackFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 animate-fadeIn">

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-amber-500/40 text-xs font-serif flex items-center gap-2.5 animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Interactive Mode Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-slate-900/10 to-indigo-500/15 border border-[var(--accent-gold)]/40 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-[var(--accent-gold)] flex items-center justify-center shrink-0 border border-amber-500/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-[var(--accent-gold)] bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                Interactive Post-Publication Demo
              </span>
              <span className="text-[10px] font-mono text-[var(--text-muted)] hidden sm:inline">
                Route: /demo-current-issue
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] font-serif leading-relaxed">
              This interactive demonstration page previews how manuscripts accepted by the Editorial Office are formally indexed, paginated, and published with DOI, downloadable full-text PDF, and academic citation formats.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            to="/current-issue"
            className="text-xs font-semibold px-4 py-2 rounded-xl bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-strong)] text-[var(--text-primary)] transition-all flex items-center gap-1.5 shadow-2xs"
          >
            <span>View Live Call for Papers</span>
            <ArrowRight className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
          </Link>
        </div>
      </div>

      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[var(--border-subtle)]">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[var(--accent-gold)]">
            <span>VOLUME 01</span>
            <span>•</span>
            <span>ISSUE 01</span>
            <span>•</span>
            <span className="font-semibold">OCTOBER – DECEMBER 2026</span>
            <span>•</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">CURRENT ISSUE</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Volume 01, Issue 01 (Oct–Dec 2026)
          </h1>
          <p className="text-sm font-serif italic text-[var(--text-secondary)]">
            Special Inaugural Volume: Rethinking Crime, Justice &amp; Society — Emerging Perspectives for the 21st Century
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="text-xs font-mono text-[var(--text-muted)] bg-[var(--bg-card)] px-3.5 py-1.5 rounded-full border border-[var(--border-subtle)] flex items-center gap-2 shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">Complete Issue Published</span>
          </div>

          <a
            href="/currentissue/CSR-2026-01-Tiburcio-Private-International-Law.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="CSR-2026-01-Tiburcio-Private-International-Law.pdf"
            className="text-xs font-semibold px-4 py-2 rounded-full bg-[var(--accent-navy)] text-white hover:opacity-90 transition-opacity flex items-center gap-1.5 shadow-2xs"
            title="Download Featured Paper PDF"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Featured Paper PDF (493 KB)</span>
          </a>
        </div>
      </div>

      {/* Main Two-Column Container Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* ========================================================
            LEFT SIDE: Issue Cover Artwork & Journal Metadata (4 cols)
        ======================================================== */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-20">

          {/* Issue Cover Artwork Container */}
          <div className="bg-[var(--bg-card)] p-4 sm:p-5 rounded-2xl border border-[var(--border-subtle)] shadow-md space-y-4">

            <div className="relative rounded-xl overflow-hidden shadow-lg border border-amber-500/20 bg-slate-950">
              <img
                src="/currentissue/vol-1-oct-dec-2026.jpeg"
                alt="The Crime & Society Review - Volume I Issue I Cover"
                className="w-full h-auto object-cover select-none"
                loading="eager"
              />
              <div className="absolute top-2 right-2 bg-emerald-600/90 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border border-emerald-400/30">
                Peer-Reviewed
              </div>
            </div>

            {/* Issue Title & Description Under Cover */}
            <div className="space-y-1.5 pt-1 text-center">
              <span className="inline-block text-[10px] font-mono font-bold tracking-widest text-[var(--accent-gold)] uppercase border border-[var(--accent-gold)]/40 px-2.5 py-0.5 rounded-full">
                INAUGURAL ISSUE CONTENTS
              </span>
              <h3 className="font-serif text-base font-bold text-[var(--text-primary)] leading-snug">
                Rethinking Crime, Justice &amp; Society
              </h3>
              <p className="text-xs font-serif italic text-[var(--text-secondary)]">
                Emerging Perspectives for the 21st Century
              </p>
            </div>

            {/* Fast Quick Links */}
            <div className="space-y-2 pt-2 border-t border-[var(--border-subtle)] text-xs">
              <a
                href="#csr-2026-010101"
                className="w-full py-2.5 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-[var(--text-primary)] font-semibold transition-colors flex items-center justify-between border border-amber-500/20"
              >
                <div className="flex items-center gap-2 truncate">
                  <Award className="w-3.5 h-3.5 text-[var(--accent-gold)] shrink-0" />
                  <span className="truncate">Featured: Private International Law in Brazil</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[var(--accent-gold)] shrink-0 ml-1" />
              </a>

              <a
                href="/currentissue/Content-vol-1-oct-dec-2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] text-[var(--text-primary)] font-semibold transition-colors flex items-center justify-center gap-2 shadow-2xs"
              >
                <FileText className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                <span>Download Issue Prelims &amp; Editorial (PDF)</span>
              </a>

              <Link
                to="/submit"
                className="w-full py-2.5 px-3 rounded-xl bg-[var(--accent-navy)] text-white font-bold hover:opacity-95 transition-opacity flex items-center justify-center gap-2 shadow-sm"
              >
                <FileCheck2 className="w-4 h-4 text-amber-300" />
                <span>Submit Paper for Next Issue (Vol 1, Iss 2)</span>
              </Link>
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
                <span className="text-[var(--text-muted)]">Volume &amp; Issue:</span>
                <strong className="text-[var(--text-primary)] font-semibold">Volume 01, Issue 01</strong>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[var(--border-subtle)]/60">
                <span className="text-[var(--text-muted)]">Publication Period:</span>
                <strong className="text-[var(--text-primary)] font-semibold">Oct – Dec 2026</strong>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[var(--border-subtle)]/60">
                <span className="text-[var(--text-muted)]">Articles Published:</span>
                <strong className="text-emerald-600 dark:text-emerald-400 font-bold">4 Peer-Reviewed Articles</strong>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[var(--border-subtle)]/60">
                <span className="text-[var(--text-muted)]">Total Issue Pages:</span>
                <strong className="text-[var(--text-primary)] font-semibold">128 Pages (pp. 1106–1232)</strong>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[var(--border-subtle)]/60">
                <span className="text-[var(--text-muted)]">Publication Model:</span>
                <strong className="text-emerald-600 dark:text-emerald-400 font-bold">Gold Open Access (CC BY 4.0)</strong>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[var(--border-subtle)]/60">
                <span className="text-[var(--text-muted)]">Peer Review Model:</span>
                <strong className="text-[var(--text-primary)] font-semibold">Double-Blind Peer Review</strong>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-[var(--text-muted)]">Issue DOI:</span>
                <a
                  href="https://doi.org/10.59265/csr.2026.0101"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[var(--accent-navy)] hover:underline font-semibold"
                >
                  10.59265/csr.2026.0101
                </a>
              </div>
            </div>
          </div>

          {/* Open Access & Indexing Statement */}
          <div className="bg-[var(--bg-card)] p-5 rounded-2xl border border-[var(--border-subtle)] shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <img src="/openaccess.png" alt="Open Access" className="h-6 w-auto" />
              <span className="text-xs font-serif font-bold text-[var(--text-primary)]">
                Unrestricted Open Access
              </span>
            </div>
            <p className="text-[11px] font-serif text-[var(--text-secondary)] leading-relaxed">
              All papers in this issue are published under the terms of the Creative Commons Attribution 4.0 International License (CC BY 4.0), permitting unrestricted use, distribution, and reproduction in any medium, provided the original work is properly cited.
            </p>
          </div>

        </div>

        {/* ========================================================
            RIGHT SIDE: Filter, Search, and Published Articles (8 cols)
        ======================================================== */}
        <div className="lg:col-span-8 space-y-6">

          {/* Issue Thematic Header Box */}
          <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden space-y-3">
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  Vol-I ; Issue-I ; October–December 2026
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Official Scholarly Articles
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                Table of Contents: Published Research
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 font-serif leading-relaxed pt-1">
                Explore the research papers published in Volume 01, Issue 01 of <em>The Crime and Society Review</em>. Each peer-reviewed manuscript includes verified author affiliations, structured abstracts, persistent Crossref DOIs, citation exports, and full-text PDF open-access downloads.
              </p>
            </div>
          </div>

          {/* Search & Filter Controls */}
          <div className="bg-[var(--bg-card)] p-4 sm:p-5 rounded-2xl border border-[var(--border-subtle)] shadow-2xs space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search articles by title, author, keyword, or DOI..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 text-xs rounded-xl bg-[var(--bg-page)] border border-[var(--border-subtle)] focus:border-[var(--accent-gold)] focus:outline-none transition-colors font-serif"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Track Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3" />
                <span>Filter:</span>
              </span>

              <button
                onClick={() => setSelectedTrackFilter('all')}
                className={`text-[11px] font-mono px-3 py-1 rounded-lg border transition-all ${selectedTrackFilter === 'all'
                    ? 'bg-[var(--accent-navy)] text-white border-[var(--accent-navy)] font-semibold shadow-2xs'
                    : 'bg-[var(--bg-page)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:border-[var(--accent-gold)]'
                  }`}
              >
                All Articles ({PUBLISHED_ARTICLES.length})
              </button>

              <button
                onClick={() => setSelectedTrackFilter(6)}
                className={`text-[11px] font-mono px-3 py-1 rounded-lg border transition-all ${selectedTrackFilter === 6
                    ? 'bg-[var(--accent-navy)] text-white border-[var(--accent-navy)] font-semibold shadow-2xs'
                    : 'bg-[var(--bg-page)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:border-[var(--accent-gold)]'
                  }`}
              >
                International &amp; Transnational (Track 06)
              </button>

              <button
                onClick={() => setSelectedTrackFilter(3)}
                className={`text-[11px] font-mono px-3 py-1 rounded-lg border transition-all ${selectedTrackFilter === 3
                    ? 'bg-[var(--accent-navy)] text-white border-[var(--accent-navy)] font-semibold shadow-2xs'
                    : 'bg-[var(--bg-page)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:border-[var(--accent-gold)]'
                  }`}
              >
                Forensic Tech &amp; AI (Track 03)
              </button>

              <button
                onClick={() => setSelectedTrackFilter(2)}
                className={`text-[11px] font-mono px-3 py-1 rounded-lg border transition-all ${selectedTrackFilter === 2
                    ? 'bg-[var(--accent-navy)] text-white border-[var(--accent-navy)] font-semibold shadow-2xs'
                    : 'bg-[var(--bg-page)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:border-[var(--accent-gold)]'
                  }`}
              >
                Penology &amp; Justice (Track 02)
              </button>

              <button
                onClick={() => setSelectedTrackFilter(4)}
                className={`text-[11px] font-mono px-3 py-1 rounded-lg border transition-all ${selectedTrackFilter === 4
                    ? 'bg-[var(--accent-navy)] text-white border-[var(--accent-navy)] font-semibold shadow-2xs'
                    : 'bg-[var(--bg-page)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:border-[var(--accent-gold)]'
                  }`}
              >
                Victimology &amp; Society (Track 04)
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] px-1">
            <span>Showing {filteredArticles.length} of {PUBLISHED_ARTICLES.length} published articles</span>
            {searchQuery && (
              <span>Matching search: &quot;{searchQuery}&quot;</span>
            )}
          </div>

          {/* Published Articles List */}
          <div className="space-y-6">
            {filteredArticles.map((article) => {
              const isExpanded = !!expandedAbstracts[article.id];

              return (
                <article
                  key={article.id}
                  id={article.id}
                  className={`p-6 sm:p-7 rounded-2xl border transition-all bg-[var(--bg-card)] shadow-2xs space-y-5 ${article.isFeatured
                      ? 'border-amber-500/50 ring-1 ring-amber-500/20 relative'
                      : 'border-[var(--border-subtle)] hover:border-[var(--border-strong)]'
                    }`}
                >
                  {/* Featured Paper Ribbon */}
                  {article.isFeatured && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-[10px] font-mono font-bold tracking-wider uppercase">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Featured Uploaded Research Paper • Open Access</span>
                    </div>
                  )}

                  {/* Article Metadata Top Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[var(--text-muted)] border-b border-[var(--border-subtle)]/70 pb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-[var(--accent-gold)]">
                        {article.articleNumber}
                      </span>
                      <span>•</span>
                      <span className="bg-[var(--bg-page)] px-2 py-0.5 rounded border border-[var(--border-subtle)] text-[10px]">
                        {article.categoryBadge}
                      </span>
                      <span>•</span>
                      <span className="text-[var(--text-secondary)] font-medium">
                        {article.pages}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>Peer-Reviewed</span>
                      </span>
                      <span className="text-[11px] text-[var(--text-muted)] flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{article.publishedDate}</span>
                      </span>
                    </div>
                  </div>

                  {/* Article Title */}
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl sm:text-2xl font-extrabold text-[var(--text-primary)] leading-snug tracking-tight">
                      {article.title}
                    </h3>

                    {/* Authors and Affiliations */}
                    <div className="space-y-1 pt-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-serif">
                        {article.authors.map((author, index) => (
                          <span key={index} className="inline-flex items-center gap-1">
                            <span className="font-bold text-[var(--text-primary)]">
                              {author.name}
                            </span>
                            {author.isCorresponding && (
                              <span
                                title="Corresponding Author"
                                className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-bold"
                              >
                                *
                              </span>
                            )}
                            {index < article.authors.length - 1 && (
                              <span className="text-[var(--text-muted)]">,</span>
                            )}
                          </span>
                        ))}
                      </div>

                      {/* Affiliations list */}
                      <div className="text-xs font-serif text-[var(--text-secondary)] space-y-0.5 pt-0.5">
                        {article.authors.map((author, i) => (
                          <div key={i} className="flex items-start gap-1.5 opacity-90">
                            <span className="font-mono text-[10px] text-[var(--accent-gold)] font-bold">{i + 1}.</span>
                            <span>{author.affiliation}</span>
                            {author.email && (
                              <span className="text-[var(--text-muted)] font-mono text-[11px] ml-1">
                                &lt;{author.email}&gt;
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* DOI & Timeline Pill Strip */}
                  <div className="p-3 rounded-xl bg-[var(--bg-page)] border border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="text-[var(--text-muted)]">DOI:</span>
                      <a
                        href={article.doiUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--accent-navy)] font-semibold hover:underline flex items-center gap-1"
                      >
                        <span>{article.doi}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-[var(--text-muted)]">
                      <span>Rec: {article.receivedDate}</span>
                      <span>•</span>
                      <span>Acc: {article.acceptedDate}</span>
                      <span>•</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Pub: {article.publishedDate}</span>
                    </div>
                  </div>

                  {/* Expandable Abstract Section */}
                  <div className="border-t border-[var(--border-subtle)]/70 pt-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => toggleAbstract(article.id)}
                        className="text-xs font-mono font-bold text-[var(--accent-gold)] hover:text-[var(--accent-gold-hover)] flex items-center gap-1.5 transition-colors"
                      >
                        <span>{isExpanded ? 'Hide Abstract & Keywords' : 'Read Abstract & Keywords'}</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>

                      {/* Read metrics */}
                      <div className="flex items-center gap-3 text-[11px] font-mono text-[var(--text-muted)]">
                        <span className="flex items-center gap-1" title="Article Views">
                          <Eye className="w-3.5 h-3.5" />
                          <span>{article.metrics.views}</span>
                        </span>
                        <span className="flex items-center gap-1" title="PDF Downloads">
                          <Download className="w-3.5 h-3.5" />
                          <span>{article.metrics.downloads}</span>
                        </span>
                        <span className="flex items-center gap-1" title="Citations">
                          <Quote className="w-3.5 h-3.5" />
                          <span>{article.metrics.citations} citations</span>
                        </span>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="space-y-4 pt-2 animate-fadeIn">
                        {/* Abstract text */}
                        <div className="p-4 rounded-xl bg-[var(--bg-page)] border border-[var(--border-subtle)] space-y-2">
                          <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--accent-gold)] font-bold">
                            Structured Abstract:
                          </div>
                          <p className="text-xs sm:text-sm font-serif text-[var(--text-primary)] leading-relaxed text-justify">
                            {article.abstract}
                          </p>
                        </div>

                        {/* Keywords */}
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] block">
                            Keywords:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {article.keywords.map((kw, idx) => (
                              <span
                                key={idx}
                                className="text-[11px] font-serif px-2.5 py-1 rounded-md bg-[var(--bg-page)] text-[var(--text-secondary)] border border-[var(--border-subtle)]"
                              >
                                {kw}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Primary Action Buttons (PDF, Online Reader, Cite, Share) */}
                  <div className="pt-2 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <a
                        href={article.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        download={article.pdfFileName}
                        className="px-4 py-2 rounded-xl bg-[var(--accent-navy)] text-white text-xs font-semibold hover:opacity-90 transition-opacity flex items-center gap-1.5 shadow-2xs"
                        title={`Download Full PDF (${article.pdfFileSize})`}
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download PDF ({article.pdfFileSize})</span>
                      </a>

                      <a
                        href={article.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 rounded-xl bg-[var(--bg-page)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-xs font-semibold transition-colors flex items-center gap-1.5"
                        title="View Full PDF in new tab"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                        <span>View PDF Online</span>
                      </a>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setCitationModalArticle(article);
                          setCopiedFormat(false);
                        }}
                        className="px-3 py-2 rounded-xl border border-[var(--border-subtle)] hover:border-[var(--accent-gold)] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] text-[var(--text-secondary)] text-xs font-semibold transition-colors flex items-center gap-1.5"
                        title="Generate and copy citation"
                      >
                        <Quote className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                        <span>Cite</span>
                      </button>

                      <button
                        onClick={() => handleShare(article)}
                        className="px-3 py-2 rounded-xl border border-[var(--border-subtle)] hover:border-[var(--accent-gold)] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] text-[var(--text-secondary)] text-xs font-semibold transition-colors flex items-center gap-1.5"
                        title="Copy direct link to article"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>

                </article>
              );
            })}

            {filteredArticles.length === 0 && (
              <div className="p-12 text-center rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-3">
                <Search className="w-8 h-8 text-[var(--text-muted)] mx-auto opacity-50" />
                <h4 className="font-serif text-base font-bold text-[var(--text-primary)]">
                  No articles matched your criteria
                </h4>
                <p className="text-xs text-[var(--text-secondary)] font-serif">
                  Try clearing your search query or selecting &quot;All Articles&quot; from the filter pills above.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedTrackFilter('all');
                  }}
                  className="px-4 py-2 rounded-xl bg-[var(--accent-navy)] text-white text-xs font-semibold"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>

          {/* Issue Editorial Note & Editorial Board Sign-off */}
          <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-2xs space-y-3.5">
            <h4 className="font-serif font-bold text-base text-[var(--text-primary)] flex items-center gap-2">
              <Award className="w-4 h-4 text-[var(--accent-gold)]" />
              <span>Inaugural Issue Editorial Foreword</span>
            </h4>
            <p className="text-xs sm:text-sm font-serif text-[var(--text-secondary)] leading-relaxed text-justify">
              Volume 01, Issue 01 marks the inaugural publication of <em>The Crime and Society Review</em>, establishing an open-access platform committed to cross-disciplinary scholarship across criminology, forensic psychology, digital criminality, and penal law. We extend our gratitude to the authors, reviewers, and advisory board whose dedication ensures the highest standard of double-blind scholarly scrutiny.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[var(--text-muted)] border-t border-[var(--border-subtle)]">
              <div>
                <span className="font-bold text-[var(--text-primary)]">Editorial Office</span> — The Crime and Society Review
              </div>
              <div className="flex items-center gap-3">
                <Link to="/editorial-board" className="text-[var(--accent-navy)] hover:underline">
                  Editorial Board
                </Link>
                <span>•</span>
                <Link to="/about" className="text-[var(--accent-navy)] hover:underline">
                  Publication Ethics
                </Link>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* ========================================================
          CITATION MODAL DIALOG
      ======================================================== */}
      {citationModalArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-strong)] shadow-2xl max-w-2xl w-full p-6 space-y-5 animate-fadeIn">

            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-[var(--border-subtle)] pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--accent-gold)]">
                  Cite This Article
                </span>
                <h3 className="font-serif text-lg font-bold text-[var(--text-primary)] leading-snug">
                  {citationModalArticle.title}
                </h3>
              </div>
              <button
                onClick={() => setCitationModalArticle(null)}
                className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-page)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Format Selection Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 border-b border-[var(--border-subtle)] pb-2 text-xs font-mono">
              {(['apa', 'mla', 'chicago', 'harvard', 'bibtex'] as const).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => {
                    setSelectedCitationFormat(fmt);
                    setCopiedFormat(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg uppercase tracking-wider font-semibold transition-all ${selectedCitationFormat === fmt
                      ? 'bg-[var(--accent-navy)] text-white shadow-2xs'
                      : 'bg-[var(--bg-page)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                    }`}
                >
                  {fmt}
                </button>
              ))}
            </div>

            {/* Citation Text Box */}
            <div className="p-4 rounded-xl bg-[var(--bg-page)] border border-[var(--border-subtle)] relative font-serif text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed select-all">
              {citationModalArticle.citations[selectedCitationFormat]}
            </div>

            {/* Modal Footer Actions */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <span className="text-[11px] font-mono text-[var(--text-muted)]">
                Format: {selectedCitationFormat.toUpperCase()}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCitationModalArticle(null)}
                  className="px-4 py-2 rounded-xl border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-secondary)] hover:bg-[var(--bg-page)] transition-colors"
                >
                  Close
                </button>

                <button
                  onClick={handleCopyCitation}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${copiedFormat
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[var(--accent-gold)] hover:bg-[var(--accent-gold-hover)] text-slate-950'
                    }`}
                >
                  {copiedFormat ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Citation</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default DemoCurrentIssuePage;
