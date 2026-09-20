import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  UploadCloud, 
  FileText, 
  ShieldCheck, 
  Scale, 
  UserCheck, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  AlertCircle,
  Copy,
  Check,
  Award,
  Download,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DisciplinaryLens, ArticleType, SubmissionDraft } from '../types/journal';

export const SubmitPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isParsingFile, setIsParsingFile] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  const [copiedTracking, setCopiedTracking] = useState(false);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [plagiarismChecked, setPlagiarismChecked] = useState(false);

  // Form State
  const [authorName, setAuthorName] = useState('Dr. Devika Ranade');
  const [authorEmail, setAuthorEmail] = useState('d.ranade@nlsiu.ac.in');
  const [authorOrcid, setAuthorOrcid] = useState('0000-0002-7711-3091');
  const [authorAffiliation, setAuthorAffiliation] = useState('National Law School of India University (NLSIU), Bengaluru');
  const [creditRoles, setCreditRoles] = useState<string[]>(['Conceptualization', 'Methodology', 'Writing – original draft']);

  const [manuscriptTitle, setManuscriptTitle] = useState('');
  const [abstractText, setAbstractText] = useState('');
  const [keywords, setKeywords] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');

  const [primaryLens, setPrimaryLens] = useState<DisciplinaryLens>('legal');
  const [secondaryLenses, setSecondaryLenses] = useState<DisciplinaryLens[]>(['forensic']);
  const [articleType, setArticleType] = useState<ArticleType>('Original Empirical Research');

  const [ethicsApproved, setEthicsApproved] = useState(false);
  const [conflictDeclared, setConflictDeclared] = useState(false);
  const [openAccessAgreed, setOpenAccessAgreed] = useState(false);

  // Simulated drag-and-drop parsing
  const handleSimulateFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setFileSize(`${(file.size / (1024 * 1024)).toFixed(2)} MB`);
    setIsParsingFile(true);

    // Simulate front-matter extraction
    setTimeout(() => {
      setIsParsingFile(false);
      if (!manuscriptTitle) {
        setManuscriptTitle("Electronic Evidence Certification Under Section 63 BSA: Assessing Hash-Log Integrity Across Indian Sessions Trials");
        setAbstractText("This empirical investigation audits Section 63 Bharatiya Sakshya Adhiniyam compliance across 150 trial court proceedings, demonstrating practical chain-of-custody vulnerabilities.");
        setKeywords("Bharatiya Sakshya Adhiniyam, Section 63 BSA, Article 21, Digital Evidence, Hash Verification, Indian Criminal Procedure");
      }
    }, 1200);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTracking = `CSR-IND-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setTrackingId(newTracking);
    setIsSubmitted(true);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {}

    // Save to localStorage for author dashboard simulation
    const newSubmission: SubmissionDraft = {
      id: `sub-${Date.now()}`,
      trackingNumber: newTracking,
      title: manuscriptTitle || "Forensic Epistemology and the Challenge of Probabilistic Due Process",
      abstract: abstractText,
      primaryLens,
      secondaryLenses,
      articleType,
      authorName,
      authorEmail,
      authorOrcid,
      authorAffiliation,
      creditRoles,
      ethicsApproved,
      conflictDeclared,
      openDataAccessAccepted: openAccessAgreed,
      fileName: fileName || "manuscript_draft.docx",
      fileSize: fileSize || "2.1 MB",
      submittedAt: new Date().toISOString().split('T')[0],
      status: 'Submitted',
      currentStageNumber: 1
    };

    const existing = localStorage.getItem('csr_user_submissions');
    const list = existing ? JSON.parse(existing) : [];
    localStorage.setItem('csr_user_submissions', JSON.stringify([newSubmission, ...list]));
  };

  const handleCopyTracking = () => {
    navigator.clipboard.writeText(trackingId);
    setCopiedTracking(true);
    setTimeout(() => setCopiedTracking(false), 2000);
  };

  const steps = [
    { num: 1, label: 'Identity & ORCID' },
    { num: 2, label: 'Front-Matter Ingestion' },
    { num: 3, label: 'Rashomon Lenses' },
    { num: 4, label: 'COPE Ethics' },
    { num: 5, label: 'File Upload' },
    { num: 6, label: 'Confirm & Submit' },
  ];

  if (isSubmitted) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6 animate-fadeIn">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-500/30">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <h1 className="font-serif text-3xl font-bold text-[var(--text-primary)]">
          Manuscript Successfully Ingested
        </h1>

        <p className="text-sm text-[var(--text-secondary)] max-w-lg mx-auto leading-relaxed">
          Your manuscript has been logged into <em>The Crime & Society Review</em> continuous editorial triage pipeline. The corresponding author has been notified via email.
        </p>

        {/* Tracking Card */}
        <div className="p-6 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-card)] max-w-md mx-auto space-y-3 shadow-sm">
          <span className="font-mono text-xs uppercase font-bold text-[var(--text-muted)]">
            Permanent Submission Tracking Number
          </span>
          <div className="flex items-center justify-center gap-3">
            <span className="font-mono text-2xl font-bold text-[var(--accent-navy)]">
              {trackingId}
            </span>
            <button
              onClick={handleCopyTracking}
              className="p-1.5 rounded border border-[var(--border-subtle)] hover:bg-[var(--bg-card-hover)] text-xs text-[var(--text-secondary)] flex items-center gap-1"
            >
              {copiedTracking ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
            ● Stage 1 of 6: Editorial Screening (2–4 Days Expected)
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 pt-4">
          <button
            onClick={() => {
              setIsSubmitted(false);
              setCurrentStep(1);
            }}
            className="px-4 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] text-xs font-semibold hover:bg-[var(--bg-card-hover)]"
          >
            Submit Another Manuscript
          </button>

          <a
            href="/dashboard"
            className="px-5 py-2 rounded-lg bg-[var(--accent-navy)] text-white text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            Track in Author Dashboard →
          </a>
        </div>
      </div>
    );
  }

  const handleDownloadTemplate = (format: 'docx' | 'tex') => {
    const textContent = format === 'docx'
      ? `THE CRIME & SOCIETY REVIEW — OFFICIAL MANUSCRIPT TEMPLATE\n\nTitle: [Insert Manuscript Title]\nAuthors: [Author Name, Affiliation, ORCID]\nAbstract: [250-300 words]\nKeywords: [5-8 keywords]\n\n1. Introduction & Constitutional/Statutory Problem\n2. Literature Review & Precedential Analysis\n3. Empirical / Forensic Methodology\n4. Findings & Procedural Implications\n5. Institutional Policy Recommendations\n6. References (Bluebook 21st / APA 7th)`
      : `% The Crime & Society Review LaTeX Template\n\\documentclass[11pt,a4paper]{article}\n\\usepackage{amsmath,amsfonts,amssymb}\n\\title{Your Title Here}\n\\author{Author Name}\n\\begin{document}\n\\maketitle\n\\begin{abstract}\nYour abstract here...\n\\end{abstract}\n\\section{Introduction}\n\\end{document}`;

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TCSR_Manuscript_Template.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8 animate-fadeIn">
      {/* Title & Author Toolkit */}
      <div className="border-b border-[var(--border-subtle)] pb-6 space-y-4">
        <div>
          <span className="text-xs font-mono uppercase font-bold text-[var(--accent-gold)] flex items-center gap-1.5">
            <Send className="w-3.5 h-3.5" /> Direct Scholarly Submission Portal
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mt-1">
            Manuscript Ingestion Wizard
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
            Continuous rolling peer review for the Bharatiya Nyaya Sanhita (BNS), BNSS, BSA, and forensic sciences.
          </p>
        </div>

        {/* Author Resources Quick Action Strip (Nature + Veredas style) */}
        <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[var(--text-secondary)]">
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold text-[10px]">
              ₹0 APC (Diamond OA)
            </span>
            <span className="text-[var(--text-muted)]">•</span>
            <span className="font-mono text-[11px]">Turnitin Plagiarism &lt; 10%</span>
            <span className="text-[var(--text-muted)]">•</span>
            <span className="font-mono text-[11px]">Review: 14–21 Days</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleDownloadTemplate('docx')}
              className="px-2.5 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--accent-navy)] text-[11px] font-medium text-[var(--text-primary)] flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3 h-3 text-[var(--accent-navy)]" />
              <span>Template (.docx)</span>
            </button>

            <button
              type="button"
              onClick={() => handleDownloadTemplate('tex')}
              className="px-2.5 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--accent-navy)] text-[11px] font-medium text-[var(--text-primary)] flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3 h-3 text-[var(--accent-navy)]" />
              <span>LaTeX (.tex)</span>
            </button>

            <button
              type="button"
              onClick={() => setIsCertificateModalOpen(true)}
              className="px-2.5 py-1.5 rounded-lg border border-[var(--accent-gold)] bg-[var(--accent-gold)]/10 text-[11px] font-bold text-[var(--accent-gold)] flex items-center gap-1.5 cursor-pointer hover:bg-[var(--accent-gold)]/20"
            >
              <Award className="w-3 h-3" />
              <span>Certificate Specimen</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stepper Bar */}
      <div className="grid grid-cols-6 gap-2 text-center text-xs font-mono">
        {steps.map(step => (
          <div
            key={step.num}
            onClick={() => setCurrentStep(step.num)}
            className={`p-2 rounded-lg border transition-all cursor-pointer ${
              currentStep === step.num
                ? 'border-[var(--accent-navy)] bg-[var(--accent-navy)]/10 font-bold text-[var(--accent-navy)]'
                : currentStep > step.num
                ? 'border-emerald-500/40 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400'
                : 'border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-muted)]'
            }`}
          >
            <div className="text-[10px]">{step.num < currentStep ? '✓' : `0${step.num}`}</div>
            <div className="truncate hidden sm:block mt-0.5">{step.label}</div>
          </div>
        ))}
      </div>

      {/* STEP 1: Contributor Identity & ORCID */}
      {currentStep === 1 && (
        <div className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-6 animate-fadeIn">
          <div className="border-b border-[var(--border-subtle)] pb-3">
            <h2 className="font-serif font-bold text-lg text-[var(--text-primary)]">
              Step 1: Corresponding Author & Persistent Identifiers
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              ORCID integration ensures permanent attribution across the global research graph.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-[var(--text-primary)]">Full Name (with Honorifics)</label>
              <input
                type="text"
                value={authorName}
                onChange={e => setAuthorName(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[var(--text-primary)]">Institutional Email</label>
              <input
                type="email"
                value={authorEmail}
                onChange={e => setAuthorEmail(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[var(--text-primary)]">Primary Institutional Affiliation</label>
              <input
                type="text"
                value={authorAffiliation}
                onChange={e => setAuthorAffiliation(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[var(--text-primary)] flex items-center justify-between">
                <span>ORCID iD (Validated via OAuth)</span>
                <span className="text-[10px] text-emerald-600 font-mono">● Verified</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={authorOrcid}
                  onChange={e => setAuthorOrcid(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] font-mono text-[var(--text-primary)] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* CRediT Roles */}
          <div className="space-y-2 pt-2 border-t border-[var(--border-subtle)]">
            <label className="text-xs font-semibold text-[var(--text-primary)] block">
              CRediT Contributor Roles (Select all that apply)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {[
                'Conceptualization', 'Methodology', 'Formal Analysis', 
                'Investigation', 'Data curation', 'Writing – original draft',
                'Writing – review & editing', 'Supervision', 'Project administration'
              ].map(role => (
                <label key={role} className="flex items-center gap-2 p-2 rounded bg-[var(--bg-card-hover)] border border-[var(--border-subtle)] cursor-pointer text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                  <input
                    type="checkbox"
                    checked={creditRoles.includes(role)}
                    onChange={e => {
                      if (e.target.checked) setCreditRoles([...creditRoles, role]);
                      else setCreditRoles(creditRoles.filter(r => r !== role));
                    }}
                    className="accent-[var(--accent-navy)]"
                  />
                  <span>{role}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: Front-Matter Parsing & Metadata */}
      {currentStep === 2 && (
        <div className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-6 animate-fadeIn">
          <div className="border-b border-[var(--border-subtle)] pb-3">
            <h2 className="font-serif font-bold text-lg text-[var(--text-primary)]">
              Step 2: Manuscript Front-Matter
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              Enter title and abstract or drop your document below to auto-extract.
            </p>
          </div>

          {/* Simulated Extraction Dropzone */}
          <div className="p-6 rounded-xl border-2 border-dashed border-[var(--border-strong)] bg-[var(--bg-card-hover)] text-center space-y-2">
            <UploadCloud className="w-8 h-8 text-[var(--accent-gold)] mx-auto" />
            <div className="text-xs font-semibold text-[var(--text-primary)]">
              Drag & Drop your Manuscript (.docx, .tex, .pdf) for Auto-Parsing
            </div>
            <p className="text-[11px] text-[var(--text-muted)]">
              Our client-side parser automatically detects title, abstract, and keywords.
            </p>
            <label className="inline-block px-4 py-1.5 rounded-lg bg-[var(--accent-navy)] text-white text-xs font-semibold cursor-pointer hover:opacity-90">
              Browse Files
              <input type="file" onChange={handleSimulateFileUpload} className="hidden" accept=".docx,.pdf,.tex" />
            </label>
            {isParsingFile && (
              <div className="text-xs text-[var(--accent-gold)] font-mono animate-pulse pt-2">
                Extracting semantic front-matter...
              </div>
            )}
          </div>

          <div className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-[var(--text-primary)]">Manuscript Full Title</label>
              <input
                type="text"
                value={manuscriptTitle}
                onChange={e => setManuscriptTitle(e.target.value)}
                placeholder="e.g., Forensic Epistemology in Trial Systems..."
                className="w-full p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] font-serif text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[var(--text-primary)]">Abstract (Max 300 words)</label>
              <textarea
                rows={4}
                value={abstractText}
                onChange={e => setAbstractText(e.target.value)}
                placeholder="Provide a comprehensive summary of the research questions, methodology, empirical findings, and implications..."
                className="w-full p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] font-serif text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)] leading-relaxed"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[var(--text-primary)]">Keywords (Comma separated)</label>
              <input
                type="text"
                value={keywords}
                onChange={e => setKeywords(e.target.value)}
                placeholder="Digital Forensics, Sixth Amendment, Evidence, Daubert Standard..."
                className="w-full p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] font-mono text-xs text-[var(--text-primary)] focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: Rashomon Disciplinary Lenses */}
      {currentStep === 3 && (
        <div className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-6 animate-fadeIn">
          <div className="border-b border-[var(--border-subtle)] pb-3">
            <h2 className="font-serif font-bold text-lg text-[var(--text-primary)]">
              Step 3: The Rashomon Multi-Perspective Taxonomy
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              Select which disciplinary lenses your manuscript bridges. This informs peer-reviewer matching.
            </p>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-semibold text-[var(--text-primary)] block">
              Primary Disciplinary Pillar
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {[
                { id: 'legal', label: '⚖️ Law & Legal Studies' },
                { id: 'forensic', label: '🔬 Forensic Science' },
                { id: 'psychological', label: '🧠 Behavioral Psychology' },
                { id: 'sociological', label: '🏛️ Sociology & Society' },
                { id: 'policing', label: '🛡️ Policing & Technology' },
                { id: 'victimology', label: '🤝 Victimology & Redress' },
              ].map(lens => (
                <button
                  type="button"
                  key={lens.id}
                  onClick={() => setPrimaryLens(lens.id as DisciplinaryLens)}
                  className={`p-3 rounded-lg border text-left transition-colors cursor-pointer ${
                    primaryLens === lens.id
                      ? 'border-[var(--accent-gold)] bg-[var(--accent-gold)]/10 font-bold text-[var(--text-primary)]'
                      : 'border-[var(--border-subtle)] bg-[var(--bg-card-hover)] text-[var(--text-secondary)]'
                  }`}
                >
                  {lens.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-[var(--border-subtle)]">
            <label className="text-xs font-semibold text-[var(--text-primary)] block">
              Article Submission Category
            </label>
            <select
              value={articleType}
              onChange={e => setArticleType(e.target.value as ArticleType)}
              className="w-full p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] text-xs text-[var(--text-primary)] focus:outline-none"
            >
              <option value="Original Empirical Research">Original Empirical Research (5,000–10,000 words)</option>
              <option value="Theoretical Synthesis">Theoretical Synthesis (4,000–8,000 words)</option>
              <option value="Methodological Innovation">Methodological Innovation (3,500–7,000 words)</option>
              <option value="Forensic Case Commentary">Forensic Case Commentary (2,500–5,000 words)</option>
              <option value="Policy & Practice Brief">Policy & Practice Brief (2,000–4,000 words)</option>
            </select>
          </div>
        </div>
      )}

      {/* STEP 4: COPE Ethics & Malpractice */}
      {currentStep === 4 && (
        <div className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-6 animate-fadeIn">
          <div className="border-b border-[var(--border-subtle)] pb-3">
            <h2 className="font-serif font-bold text-lg text-[var(--text-primary)]">
              Step 4: Research Ethics & Integrity Declarations (COPE)
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              All submissions undergo double-blind review and automated Crossref Similarity screening.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-start gap-3 p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] cursor-pointer">
              <input
                type="checkbox"
                checked={ethicsApproved}
                onChange={e => setEthicsApproved(e.target.checked)}
                className="mt-0.5 accent-[var(--accent-navy)]"
              />
              <div>
                <span className="font-semibold text-[var(--text-primary)] block">Institutional Ethics Committee (IEC / IHEC) Approval</span>
                <span className="text-[var(--text-muted)]">I certify that all empirical human participant research was approved by an institutional ethics committee in compliance with Indian Council of Medical Research (ICMR) ethical guidelines.</span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] cursor-pointer">
              <input
                type="checkbox"
                checked={conflictDeclared}
                onChange={e => setConflictDeclared(e.target.checked)}
                className="mt-0.5 accent-[var(--accent-navy)]"
              />
              <div>
                <span className="font-semibold text-[var(--text-primary)] block">Conflict of Interest & Funding Disclosure</span>
                <span className="text-[var(--text-muted)]">All financial support, consulting relationships, and forensic software associations have been fully disclosed in accordance with Bar Council and UGC guidelines.</span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] cursor-pointer">
              <input
                type="checkbox"
                checked={plagiarismChecked}
                onChange={e => setPlagiarismChecked(e.target.checked)}
                className="mt-0.5 accent-[var(--accent-navy)]"
              />
              <div>
                <span className="font-semibold text-[var(--text-primary)] block">UGC Academic Integrity & Turnitin Plagiarism Declaration</span>
                <span className="text-[var(--text-muted)]">I certify that the manuscript similarity index is strictly below 10% (excluding references, quotations, and statutory provisions) in full compliance with UGC (Promotion of Academic Integrity and Prevention of Plagiarism in Higher Educational Institutions) Regulations, 2018.</span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] cursor-pointer">
              <input
                type="checkbox"
                checked={openAccessAgreed}
                onChange={e => setOpenAccessAgreed(e.target.checked)}
                className="mt-0.5 accent-[var(--accent-navy)]"
              />
              <div>
                <span className="font-semibold text-[var(--text-primary)] block">Diamond Open Access Agreement (CC-BY 4.0)</span>
                <span className="text-[var(--text-muted)]">I agree that the Version of Record will be licensed under CC-BY 4.0 and accessible to all Indian researchers, judges, police cadres, and students without paywalls.</span>
              </div>
            </label>
          </div>
        </div>
      )}

      {/* STEP 5: File & Galley Upload */}
      {currentStep === 5 && (
        <div className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-6 animate-fadeIn">
          <div className="border-b border-[var(--border-subtle)] pb-3">
            <h2 className="font-serif font-bold text-lg text-[var(--text-primary)]">
              Step 5: File Package Upload
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              Attach the blinded manuscript, high-resolution figures, and tabular datasets.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-[var(--accent-navy)]" />
                <div>
                  <div className="font-semibold text-[var(--text-primary)]">
                    {fileName || 'manuscript_anonymized_core.docx'}
                  </div>
                  <div className="text-[10px] font-mono text-[var(--text-muted)]">
                    {fileSize || '2.4 MB'} • Primary Anonymized Narrative
                  </div>
                </div>
              </div>
              <span className="text-emerald-600 font-mono text-xs font-bold">✓ Attached</span>
            </div>

            <div className="p-4 rounded-lg border border-dashed border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-between">
              <div className="flex items-center gap-3 text-[var(--text-muted)]">
                <UploadCloud className="w-5 h-5 text-[var(--accent-gold)]" />
                <span>Optional: Supplementary Forensic Datasets (.csv, .xlsx, .json)</span>
              </div>
              <button type="button" className="text-xs text-[var(--accent-navy)] font-semibold hover:underline">
                Upload Data
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 6: Review & Final Submit */}
      {currentStep === 6 && (
        <div className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-6 animate-fadeIn text-xs">
          <div className="border-b border-[var(--border-subtle)] pb-3">
            <h2 className="font-serif font-bold text-lg text-[var(--text-primary)]">
              Step 6: Final Pre-Flight Verification
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              Review your submission package details before committing to the editorial queue.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-[var(--bg-card-hover)] space-y-1">
              <div className="text-[10px] font-mono uppercase text-[var(--text-muted)]">Corresponding Author</div>
              <div className="font-bold text-[var(--text-primary)]">{authorName}</div>
              <div className="text-[var(--text-secondary)]">{authorAffiliation}</div>
              <div className="font-mono text-emerald-600">ORCID: {authorOrcid}</div>
            </div>

            <div className="p-3 rounded-lg bg-[var(--bg-card-hover)] space-y-1">
              <div className="text-[10px] font-mono uppercase text-[var(--text-muted)]">Category & Pillars</div>
              <div className="font-bold text-[var(--text-primary)]">{articleType}</div>
              <div className="text-[var(--text-secondary)]">Primary: <span className="capitalize font-semibold">{primaryLens}</span></div>
              <div className="text-[var(--text-secondary)]">Continuous Publication: Vol. 1 (2026)</div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[var(--bg-card-hover)] space-y-1">
            <div className="text-[10px] font-mono uppercase text-[var(--text-muted)]">Manuscript Title</div>
            <div className="font-serif font-bold text-sm text-[var(--text-primary)] leading-snug">
              {manuscriptTitle || "Forensic Epistemology and the Challenge of Probabilistic Due Process in Appellate Review"}
            </div>
          </div>
        </div>
      )}

      {/* Nav Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
        <button
          type="button"
          disabled={currentStep === 1}
          onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
          className="px-4 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] text-xs font-semibold text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Previous Step
        </button>

        {currentStep < 6 ? (
          <button
            type="button"
            onClick={() => setCurrentStep(prev => Math.min(6, prev + 1))}
            className="px-5 py-2 rounded-lg bg-[var(--accent-navy)] text-white text-xs font-semibold hover:opacity-90 transition-opacity flex items-center gap-1.5 shadow-sm"
          >
            <span>Next: {steps[currentStep].label}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleFinalSubmit}
            className="px-6 py-2 rounded-lg bg-[var(--accent-gold)] hover:bg-[var(--accent-gold-hover)] text-slate-950 font-bold text-xs shadow-md flex items-center gap-2 transition-transform hover:scale-102"
          >
            <Send className="w-4 h-4" />
            <span>Submit to Editorial Triage</span>
          </button>
        )}
      </div>

      {/* OFFICIAL DIGITAL PUBLICATION CERTIFICATE SPECIMEN MODAL */}
      {isCertificateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[var(--bg-card)] border border-[var(--border-strong)] rounded-2xl max-w-3xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase font-bold text-[var(--accent-gold)]">
                  Specimen Copy • UGC CAS & PhD API Compliant
                </span>
                <h3 className="font-serif text-xl font-bold text-[var(--text-primary)] mt-1">
                  Official Digital Certificate of Publication
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCertificateModalOpen(false)}
                className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Rendered Certificate Specimen Card */}
            <div className="p-8 rounded-xl border-4 border-double border-[var(--accent-gold)] bg-gradient-to-b from-[#FFFDF9] via-[#FAF7F0] to-[#FFFDF9] text-slate-900 shadow-inner relative space-y-6 text-center">
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-slate-900 text-[var(--accent-gold)] flex items-center justify-center border-2 border-[var(--accent-gold)] shadow-sm">
                  <Scale className="w-6 h-6" />
                </div>
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#8C6D37] font-bold block">
                  COUNCIL OF SCIENTIFIC & LEGAL EDITORS • REGISTERED ISSN 2998-4122
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1 tracking-tight">
                  The Crime & Society Review
                </h2>
                <div className="text-xs font-serif italic text-slate-600 mt-0.5">
                  An Interdisciplinary Indian Scholarly Journal of Law, Forensics & Criminology
                </div>
              </div>

              <div className="py-1">
                <div className="inline-block border-y-2 border-[#8C6D37]/40 py-1 px-8 text-xs font-mono font-bold tracking-widest text-[#8C6D37] uppercase">
                  CERTIFICATE OF SCHOLARLY PUBLICATION
                </div>
              </div>

              <p className="text-sm font-serif text-slate-800 max-w-xl mx-auto leading-relaxed">
                This is to certify that the original research manuscript submitted by
              </p>

              <div className="p-3 bg-[#F4EFE6] rounded-lg border border-[#DCD3C1] max-w-xl mx-auto">
                <span className="font-bold text-slate-950 text-base">
                  {authorName || "Dr. Devika Ranade"}
                </span>
                <div className="text-xs text-slate-600 mt-0.5 font-sans">
                  {authorAffiliation || "National Law School of India University (NLSIU), Bengaluru"}
                </div>
              </div>

              <p className="text-sm font-serif text-slate-800 max-w-xl mx-auto">
                entitled <em>"{manuscriptTitle || "Electronic Evidence Certification Under Section 63 BSA: Assessing Hash-Log Integrity Across Indian Sessions Trials"}"</em> has successfully completed double-blind peer review and will be issued with a verified Crossref DOI and elocation-id upon final publication.
              </p>

              {/* Bottom Signatures & Seal */}
              <div className="pt-6 border-t border-[#DCD3C1] grid grid-cols-3 items-center gap-4 text-xs font-serif text-slate-700">
                <div>
                  <div className="font-script text-lg text-slate-900 font-bold italic">Hon. Devendra Pathak</div>
                  <div className="border-t border-slate-400 mt-1 pt-1 text-[10px] font-sans font-medium text-slate-600">
                    Chief Editor & Former Judge
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full border-2 border-emerald-700 flex items-center justify-center p-1 bg-emerald-50 text-emerald-800">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <span className="text-[9px] font-mono text-emerald-800 font-bold mt-1">UGC-CARE VERIFIED</span>
                </div>

                <div>
                  <div className="font-script text-lg text-slate-900 font-bold italic">Dr. Aarav Sengupta</div>
                  <div className="border-t border-slate-400 mt-1 pt-1 text-[10px] font-sans font-medium text-slate-600">
                    Managing Registrar
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <span className="text-xs text-[var(--text-muted)] font-mono">
                Official certificates include a live cryptographic QR code validating UGC-CARE compliance.
              </span>
              <button
                type="button"
                onClick={() => setIsCertificateModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-[var(--accent-navy)] text-white font-medium text-xs hover:opacity-90 cursor-pointer"
              >
                Close Specimen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
