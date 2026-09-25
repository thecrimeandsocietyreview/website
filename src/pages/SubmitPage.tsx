import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  UploadCloud, 
  FileText, 
  AlertCircle,
  Copy,
  Check,
  Download,
  BookOpen,
  CheckSquare,
  Square,
  FileCheck,
  User,
  ShieldCheck,
  MessageSquare,
  Plus,
  Trash2,
  PenLine,
  FileUp,
  Users
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SubmissionDraft, AuthorSubmissionDetail } from '../types/journal';

export const SubmitPage: React.FC = () => {
  // Form State
  const [title, setTitle] = useState('');
  const [articleType, setArticleType] = useState('Research Article');
  const [keywords, setKeywords] = useState('');
  const [abstractText, setAbstractText] = useState('');
  const [editorMessage, setEditorMessage] = useState('');

  // Author Information Mode: 'manual' (form fill) or 'upload' (doc file)
  const [authorMode, setAuthorMode] = useState<'manual' | 'upload'>('manual');

  // Manual Authors List (First author + optional co-authors)
  const [manualAuthors, setManualAuthors] = useState<AuthorSubmissionDetail[]>([
    {
      fullName: '',
      email: '',
      affiliation: '',
      designation: '',
      department: '',
      cityCountry: '',
      qualification: '',
      orcid: '',
      isCorresponding: true,
      bio: ''
    }
  ]);

  // Author Information File (.doc/.docx only, max 5MB)
  const [authorInfoFile, setAuthorInfoFile] = useState<File | null>(null);
  const [authorInfoFileName, setAuthorInfoFileName] = useState('');
  const [authorInfoFileSize, setAuthorInfoFileSize] = useState('');
  const [authorInfoFileError, setAuthorInfoFileError] = useState('');

  // Blind Manuscript File (.doc/.docx only, max 5MB)
  const [blindManuscriptFile, setBlindManuscriptFile] = useState<File | null>(null);
  const [blindManuscriptFileName, setBlindManuscriptFileName] = useState('');
  const [blindManuscriptFileSize, setBlindManuscriptFileSize] = useState('');
  const [blindManuscriptFileError, setBlindManuscriptFileError] = useState('');

  // 4 Declarations
  const [declOriginal, setDeclOriginal] = useState(false);
  const [declApproved, setDeclApproved] = useState(false);
  const [declAccurate, setDeclAccurate] = useState(false);
  const [declBlind, setDeclBlind] = useState(false);

  // Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  const [copiedTracking, setCopiedTracking] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Interactive Checklist State (18 items from guidelines)
  const checklistItems = [
    "The manuscript falls within the journal's aims and scope.",
    "The manuscript is original and is not under consideration elsewhere.",
    "The manuscript has been checked for plagiarism/similarity (threshold < 10%).",
    "Substantive AI use has been appropriately disclosed.",
    "AI-generated content complies with the journal's stated limit (< 10%).",
    "Author information is provided (either filled in form or via separate file).",
    "The manuscript is submitted as a separate blinded file.",
    "Author identities and affiliations have been removed from the manuscript.",
    "The manuscript follows the prescribed formatting requirements (Garamond 12pt, 1.2 spacing, A4, 1-inch margins).",
    "APA 7th edition has been used consistently (Footnote or Endnote).",
    "All references have been cited in the manuscript and appear in reference list.",
    "Tables and figures are properly numbered, titled, and cited.",
    "Ethical approval/consent information has been provided where applicable.",
    "Conflict-of-interest information has been disclosed.",
    "Funding information has been disclosed (if applicable).",
    "Data-availability information has been provided where applicable.",
    "All authors have approved the final manuscript and agree to the order of authorship.",
    "The corresponding author has completed the submission declaration."
  ];

  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>({
    0: true,
    1: true,
    2: true,
    5: true,
    6: true,
    7: true,
    8: true,
    9: true,
    16: true,
    17: true
  });

  const toggleChecklist = (index: number) => {
    setCheckedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleSelectAllChecklist = () => {
    const allChecked: { [key: number]: boolean } = {};
    checklistItems.forEach((_, i) => {
      allChecked[i] = true;
    });
    setCheckedItems(allChecked);
  };

  // Word count helper for abstract
  const abstractWordCount = abstractText.trim() === '' ? 0 : abstractText.trim().split(/\s+/).length;

  // Author Management Handlers (Manual Mode)
  const handleAddAuthor = () => {
    setManualAuthors(prev => [
      ...prev,
      {
        fullName: '',
        email: '',
        affiliation: '',
        designation: '',
        department: '',
        cityCountry: '',
        qualification: '',
        orcid: '',
        isCorresponding: false,
        bio: ''
      }
    ]);
  };

  const handleRemoveAuthor = (index: number) => {
    if (manualAuthors.length <= 1) return;
    setManualAuthors(prev => prev.filter((_, i) => i !== index));
  };

  const handleAuthorChange = (index: number, field: keyof AuthorSubmissionDetail, value: any) => {
    setManualAuthors(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // Handle Author Information Upload (doc/docx only, max 5MB)
  const handleAuthorInfoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthorInfoFileError('');
    const file = e.target.files?.[0];
    if (!file) return;

    const extension = file.name.split('.').pop()?.toLowerCase();
    if (extension !== 'doc' && extension !== 'docx') {
      setAuthorInfoFileError('Only Word files (.doc, .docx) are allowed.');
      return;
    }

    const MAX_BYTES = 5 * 1024 * 1024;
    if (file.size > MAX_BYTES) {
      const mbSize = (file.size / (1024 * 1024)).toFixed(2);
      setAuthorInfoFileError(`File size is ${mbSize} MB. Maximum allowed size is 5 MB.`);
      return;
    }

    setAuthorInfoFile(file);
    setAuthorInfoFileName(file.name);
    setAuthorInfoFileSize(`${(file.size / (1024 * 1024)).toFixed(2)} MB`);
  };

  // Handle Blind Manuscript Upload (doc/docx only, max 5MB)
  const handleBlindManuscriptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlindManuscriptFileError('');
    const file = e.target.files?.[0];
    if (!file) return;

    const extension = file.name.split('.').pop()?.toLowerCase();
    if (extension !== 'doc' && extension !== 'docx') {
      setBlindManuscriptFileError('Only Word files (.doc, .docx) are allowed.');
      return;
    }

    const MAX_BYTES = 5 * 1024 * 1024;
    if (file.size > MAX_BYTES) {
      const mbSize = (file.size / (1024 * 1024)).toFixed(2);
      setBlindManuscriptFileError(`File size is ${mbSize} MB. Maximum allowed size is 5 MB.`);
      return;
    }

    setBlindManuscriptFile(file);
    setBlindManuscriptFileName(file.name);
    setBlindManuscriptFileSize(`${(file.size / (1024 * 1024)).toFixed(2)} MB`);
  };

  // Submit Handler
  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!title.trim()) {
      setValidationError('Please enter the Manuscript Title.');
      return;
    }

    if (!keywords.trim()) {
      setValidationError('Please provide 3–8 keywords.');
      return;
    }

    if (!abstractText.trim()) {
      setValidationError('Please enter the Abstract (maximum 300 words).');
      return;
    }

    if (abstractWordCount > 300) {
      setValidationError(`Abstract is currently ${abstractWordCount} words. Maximum allowed is 300 words.`);
      return;
    }

    // Author Information Validation
    if (authorMode === 'upload') {
      if (!authorInfoFile && !authorInfoFileName) {
        setValidationError('Please upload the Author Information file (.doc/.docx only).');
        return;
      }
    } else {
      // Manual author validation
      if (!manualAuthors[0].fullName.trim()) {
        setValidationError('Please enter the Full Name for Author 1 (Corresponding Author).');
        return;
      }
      if (!manualAuthors[0].email.trim()) {
        setValidationError('Please enter the Email Address for Author 1 (Corresponding Author).');
        return;
      }
      if (!manualAuthors[0].affiliation.trim()) {
        setValidationError('Please enter the Institutional Affiliation for Author 1.');
        return;
      }
      // Check co-authors
      for (let i = 1; i < manualAuthors.length; i++) {
        const a = manualAuthors[i];
        if (!a.fullName.trim() || !a.email.trim() || !a.affiliation.trim()) {
          setValidationError(`Please complete Full Name, Email, and Affiliation for Co-Author ${i + 1} (or click Remove).`);
          return;
        }
      }
    }

    if (!blindManuscriptFile && !blindManuscriptFileName) {
      setValidationError('Please upload the Blind Manuscript file (.doc/.docx only).');
      return;
    }

    if (!declOriginal || !declApproved || !declAccurate || !declBlind) {
      setValidationError('Please confirm all four mandatory declarations before submitting.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newTracking = `CSR-IND-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setTrackingId(newTracking);
      setIsSubmitted(true);
      setIsSubmitting(false);

      const correspondingAuthor = manualAuthors.find(a => a.isCorresponding) || manualAuthors[0];

      // Save to localStorage
      const newSubmission: SubmissionDraft = {
        id: `sub-${Date.now()}`,
        trackingNumber: newTracking,
        title: title,
        abstract: abstractText,
        primaryLens: 'legal',
        secondaryLenses: ['forensic'],
        articleType: articleType as any,
        authorName: authorMode === 'manual' ? correspondingAuthor.fullName : "Corresponding Author (In Separate File)",
        authorEmail: authorMode === 'manual' ? correspondingAuthor.email : "author@university.edu",
        authorOrcid: authorMode === 'manual' ? (correspondingAuthor.orcid || "Not specified") : "Included in author file",
        authorAffiliation: authorMode === 'manual' ? correspondingAuthor.affiliation : "Provided in author file",
        creditRoles: ['Author'],
        ethicsApproved: true,
        conflictDeclared: true,
        openDataAccessAccepted: true,
        fileName: blindManuscriptFileName || 'blind_manuscript.docx',
        fileSize: blindManuscriptFileSize || '2.1 MB',
        submittedAt: new Date().toISOString().split('T')[0],
        status: 'Submitted',
        currentStageNumber: 1,
        authorMode: authorMode,
        authorDetails: authorMode === 'manual' ? manualAuthors : undefined,
        authorInfoFileName: authorMode === 'upload' ? authorInfoFileName : undefined,
        authorInfoFileSize: authorMode === 'upload' ? authorInfoFileSize : undefined,
        keywords: keywords
      };

      try {
        const existing = localStorage.getItem('csr_user_submissions');
        const list = existing ? JSON.parse(existing) : [];
        localStorage.setItem('csr_user_submissions', JSON.stringify([newSubmission, ...list]));
      } catch (err) {}

      // Trigger Confetti
      try {
        confetti({
          particleCount: 85,
          spread: 75,
          origin: { y: 0.6 }
        });
      } catch (err) {}
    }, 850);
  };

  const handleCopyTracking = () => {
    navigator.clipboard.writeText(trackingId);
    setCopiedTracking(true);
    setTimeout(() => setCopiedTracking(false), 2000);
  };

  const handleDownloadSlip = () => {
    const authorSlipDetails = authorMode === 'manual'
      ? `AUTHOR INFORMATION (${manualAuthors.length} Author${manualAuthors.length > 1 ? 's' : ''} - Filled Manually):
` + manualAuthors.map((a, idx) => `  Author ${idx + 1}${a.isCorresponding ? ' [Corresponding Author]' : ''}:
    - Full Name: ${a.fullName}
    - Email: ${a.email}
    - Institutional Affiliation: ${a.affiliation}
    ${a.designation ? `- Designation: ${a.designation}\n    ` : ''}${a.department ? `- Department: ${a.department}\n    ` : ''}${a.cityCountry ? `- City/Country: ${a.cityCountry}\n    ` : ''}${a.qualification ? `- Highest Qualification: ${a.qualification}\n    ` : ''}${a.orcid ? `- ORCID: ${a.orcid}\n    ` : ''}`).join('\n')
      : `Author Information File: ${authorInfoFileName} (${authorInfoFileSize})`;

    const slipText = `THE CRIME & SOCIETY REVIEW
OFFICIAL MANUSCRIPT SUBMISSION RECEIPT
=====================================================
Submission Tracking ID: ${trackingId}
Date of Submission: ${new Date().toLocaleDateString('en-IN', { dateStyle: 'full' })}
Status: Stage 1 — Editorial Screening & Plagiarism Audit

MANUSCRIPT DETAILS:
Title: ${title}
Article Type: ${articleType}
Keywords: ${keywords}
Blind Manuscript File: ${blindManuscriptFileName} (${blindManuscriptFileSize})
${authorSlipDetails}
${editorMessage ? `\nMessage to Editor: ${editorMessage}\n` : ''}
CONFIRMATIONS:
- Originality & Exclusivity: Confirmed
- Author Approvals: Confirmed
- Accurate Author Order: Confirmed
- Blind Peer Review Preparation: Confirmed
- Open Access: Diamond Open Access (CC BY 4.0, ₹0 APC)
- ISSN: Coming Soon

Editorial Desk: submissions@thecrimeandsocietyreview.org
=====================================================`;

    const blob = new Blob([slipText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TCSR_Submission_Receipt_${trackingId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // If submitted successfully
  if (isSubmitted) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6 animate-fadeIn">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-500/30">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono uppercase font-bold text-[var(--accent-gold)]">
            Submission Received
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
            Manuscript Submitted Successfully
          </h1>
          <p className="text-sm text-[var(--text-secondary)] max-w-lg mx-auto leading-relaxed">
            Your manuscript and author information files have been logged into <em>The Crime &amp; Society Review</em> editorial queue.
          </p>
        </div>

        {/* Tracking Card */}
        <div className="p-6 rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-card)] max-w-md mx-auto space-y-4 shadow-sm text-left">
          <span className="font-mono text-xs uppercase font-bold text-[var(--text-muted)] block text-center">
            Permanent Submission Tracking Number
          </span>
          <div className="flex items-center justify-center gap-3">
            <span className="font-mono text-2xl font-bold text-[var(--accent-navy)]">
              {trackingId}
            </span>
            <button
              onClick={handleCopyTracking}
              className="p-1.5 rounded-lg border border-[var(--border-subtle)] hover:bg-[var(--bg-card-hover)] text-xs text-[var(--text-secondary)] flex items-center gap-1 cursor-pointer"
              title="Copy Tracking ID"
            >
              {copiedTracking ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          <div className="pt-3 border-t border-[var(--border-subtle)] space-y-2 text-xs">
            <div className="flex justify-between text-[var(--text-secondary)]">
              <span>Title:</span>
              <span className="font-medium text-[var(--text-primary)] truncate max-w-[240px]">{title}</span>
            </div>
            <div className="flex justify-between text-[var(--text-secondary)]">
              <span>Article Type:</span>
              <span className="font-medium text-[var(--text-primary)]">{articleType}</span>
            </div>
            <div className="flex justify-between text-[var(--text-secondary)]">
              <span>Blind Manuscript:</span>
              <span className="font-mono font-medium text-[var(--text-primary)]">{blindManuscriptFileName}</span>
            </div>
            <div className="flex justify-between text-[var(--text-secondary)]">
              <span>Author Details:</span>
              <span className="font-mono font-medium text-[var(--text-primary)]">
                {authorMode === 'manual'
                  ? `${manualAuthors[0].fullName || 'Author'} (${manualAuthors.length} Author${manualAuthors.length > 1 ? 's' : ''})`
                  : authorInfoFileName}
              </span>
            </div>
            <div className="flex justify-between text-[var(--text-secondary)]">
              <span>Status:</span>
              <span className="font-semibold text-amber-600 dark:text-amber-400">Stage 1: Editorial Screening</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <button
            onClick={handleDownloadSlip}
            className="px-5 py-2.5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] text-xs font-semibold text-[var(--text-primary)] flex items-center gap-2 cursor-pointer shadow-2xs"
          >
            <Download className="w-4 h-4 text-[var(--accent-navy)]" />
            <span>Download Submission Slip (.txt)</span>
          </button>

          <button
            onClick={() => {
              setIsSubmitted(false);
              setTitle('');
              setKeywords('');
              setAbstractText('');
              setEditorMessage('');
              setAuthorInfoFile(null);
              setAuthorInfoFileName('');
              setBlindManuscriptFile(null);
              setBlindManuscriptFileName('');
              setAuthorMode('manual');
              setManualAuthors([
                {
                  fullName: '',
                  email: '',
                  affiliation: '',
                  designation: '',
                  department: '',
                  cityCountry: '',
                  qualification: '',
                  orcid: '',
                  isCorresponding: true,
                  bio: ''
                }
              ]);
              setDeclOriginal(false);
              setDeclApproved(false);
              setDeclAccurate(false);
              setDeclBlind(false);
            }}
            className="px-5 py-2.5 rounded-xl bg-[var(--accent-navy)] text-white text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
          >
            Submit Another Manuscript
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-fadeIn">
      
      {/* 2-Column Desktop Grid: Left Guidelines (order-2 on mobile, order-1 on desktop), Right Form (order-1 on mobile, order-2 on desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* ========================================================
            GUIDELINES COLUMN: (7 cols on desktop, order-2 on mobile)
        ======================================================== */}
        <div className="order-2 lg:order-1 lg:col-span-7 space-y-10 text-[var(--text-secondary)] font-serif leading-relaxed text-sm">
          
          {/* Quick Jump Bar */}
          <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="text-[var(--text-muted)] font-bold uppercase text-[10px]">Jump to Section:</span>
            <a href="#general-policy" className="hover:text-[var(--accent-navy)] hover:underline">1. Policy</a>
            <span>•</span>
            <a href="#originality" className="hover:text-[var(--accent-navy)] hover:underline">2. Originality</a>
            <span>•</span>
            <a href="#plagiarism" className="hover:text-[var(--accent-navy)] hover:underline">3. Plagiarism &amp; AI</a>
            <span>•</span>
            <a href="#authorship" className="hover:text-[var(--accent-navy)] hover:underline">4. Authorship</a>
            <span>•</span>
            <a href="#separate-files" className="hover:text-[var(--accent-navy)] hover:underline">5. Separate Files</a>
            <span>•</span>
            <a href="#formatting" className="hover:text-[var(--accent-navy)] hover:underline">8. Formatting</a>
            <span>•</span>
            <a href="#referencing" className="hover:text-[var(--accent-navy)] hover:underline">9. APA 7th</a>
            <span>•</span>
            <a href="#checklist" className="text-[var(--accent-gold)] font-bold hover:underline">16. Checklist</a>
          </div>

          {/* Section 1: General Submission Policy */}
          <section id="general-policy" className="space-y-3 pt-1">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[var(--accent-gold)]">
              <span>Section 01</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)]">
              General Submission Policy
            </h2>
            <p>
              <em>The Crime &amp; Society Review</em> welcomes original, scholarly, and methodologically rigorous contributions that fall within the aims and scope of the journal. Manuscripts should make a clear and substantive contribution to the existing body of knowledge and should demonstrate appropriate engagement with relevant theoretical, empirical, methodological, or conceptual literature.
            </p>
            <p>
              Submissions may include original research articles, review articles, theoretical and conceptual papers, methodological contributions, and other scholarly contributions considered appropriate by the Editorial Board. Authors are expected to ensure that their manuscripts comply with the journal's formatting, ethical, citation, and publication requirements before submission.
            </p>
            <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-1 text-xs">
              <strong className="text-[var(--text-primary)] block font-sans">Official Intake Channel Only:</strong>
              <p>
                Manuscripts must be submitted exclusively through the journal's designated submission system. Submissions made through informal channels, including personal email or social-media platforms, may not be considered unless specifically requested by the Editorial Office.
              </p>
            </div>
          </section>

          {/* Section 2: Originality and Exclusivity */}
          <section id="originality" className="space-y-3 border-t border-[var(--border-subtle)] pt-8">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[var(--accent-gold)]">
              <span>Section 02</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)]">
              Originality and Exclusivity
            </h2>
            <p>
              Manuscripts submitted to <em>The Crime &amp; Society Review</em> must be <strong>Original and Unpublished</strong>. A manuscript, or substantially similar version of the manuscript, should not simultaneously be under consideration by another journal, edited volume, conference proceeding, or other publication outlet.
            </p>
            <p>
              Authors must confirm at the time of submission that the manuscript is not under simultaneous consideration elsewhere.
            </p>
          </section>

          {/* Section 3: Plagiarism and Academic Integrity */}
          <section id="plagiarism" className="space-y-3 border-t border-[var(--border-subtle)] pt-8">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[var(--accent-gold)]">
              <span>Section 03</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)]">
              Plagiarism and Academic Integrity
            </h2>
            <p>
              The journal maintains a zero-tolerance approach to plagiarism and other forms of academic misconduct. All submissions may be subjected to similarity and originality screening prior to or during the peer-review process. Authors must appropriately acknowledge and cite all ideas, arguments, data, language, figures, tables, and other material derived from previously published or unpublished sources.
            </p>
            <p>
              Plagiarism includes, but is not limited to, direct copying without attribution, inadequate paraphrasing, mosaic or patchwork plagiarism, self-plagiarism, duplicate publication, and appropriation of another person's ideas or intellectual contributions. The journal may use recognised plagiarism/similarity-detection software as part of its editorial screening process.
            </p>
            
            {/* Visual Callout for Thresholds */}
            <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-amber-700 dark:text-amber-400 font-sans">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Recommended Editorial Screening Thresholds</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)] pl-1">
                <li><strong>Similarity Level:</strong> Manuscripts should ordinarily demonstrate a similarity level of <strong>less than 10%</strong>.</li>
                <li><strong>AI-Generated Content:</strong> AI-generated substantive content should ordinarily <strong>not exceed 10%</strong> of the manuscript.</li>
              </ul>
              <p className="text-[11px] text-[var(--text-muted)] italic pt-1">
                The Editorial Board reserves the right to examine manuscripts exceeding or falling below this threshold where the nature of the identified overlap warrants further investigation. Where plagiarism or other academic misconduct is established, the journal may reject the manuscript, withdraw it from consideration, notify the relevant institution, or retract a published article where necessary.
              </p>
            </div>
          </section>

          {/* Section 4: Authorship */}
          <section id="authorship" className="space-y-3 border-t border-[var(--border-subtle)] pt-8">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[var(--accent-gold)]">
              <span>Section 04</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)]">
              Authorship
            </h2>
            <p>
              Authorship should be limited to individuals who have made a substantial intellectual or scholarly contribution to the work. All listed authors must have participated meaningfully in the research and/or preparation of the manuscript and must approve the final version submitted for publication.
            </p>
            <p>
              The corresponding author is responsible for communicating with the journal and confirming that:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-xs sm:text-sm">
              <li>All listed authors have approved the manuscript.</li>
              <li>All eligible contributors have been appropriately recognised.</li>
              <li>All authors agree to the order of authorship.</li>
              <li>The manuscript is original.</li>
              <li>The submission is not under consideration elsewhere.</li>
              <li>All required declarations have been provided.</li>
            </ul>
            <p className="text-xs text-[var(--text-muted)] italic">
              Any change in authorship after submission including addition, removal, or alteration of author order must be justified and approved by all authors and accepted by the Editorial Office.
            </p>
          </section>

          {/* Section 5: Separate Author Information and Manuscript Files */}
          <section id="separate-files" className="space-y-4 border-t border-[var(--border-subtle)] pt-8">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[var(--accent-gold)]">
              <span>Section 05</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)]">
              Separate Author Information and Manuscript Files
            </h2>
            <div className="p-3.5 rounded-xl bg-[var(--accent-navy)]/10 border border-[var(--accent-navy)]/20 text-xs flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[var(--accent-navy)] shrink-0 mt-0.5" />
              <span>
                To facilitate <strong>double-blind peer review</strong>, <em>The Crime &amp; Society Review</em> requires authors to submit author information <strong>separately</strong> from the manuscript file. Author identities, affiliations, email addresses, acknowledgements, and identifying footnotes must not appear in the blinded manuscript.
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* First Author Box */}
              <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-2 text-xs">
                <div className="flex items-center gap-2 font-sans font-bold text-[var(--text-primary)]">
                  <User className="w-4 h-4 text-[var(--accent-gold)]" />
                  <span>First Author Information Page</span>
                </div>
                <ul className="space-y-1 text-[var(--text-secondary)] font-mono text-[11px]">
                  <li>• Full name</li>
                  <li>• Institutional affiliation</li>
                  <li>• Department / School / Centre</li>
                  <li>• Institution</li>
                  <li>• City and country</li>
                  <li>• Email Address</li>
                  <li>• Highest academic qualification</li>
                  <li>• Designation / academic position</li>
                  <li>• Corresponding-author status</li>
                  <li>• Brief biographical note (if requested)</li>
                </ul>
              </div>

              {/* Co-Author Box */}
              <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-2 text-xs">
                <div className="flex items-center gap-2 font-sans font-bold text-[var(--text-primary)]">
                  <User className="w-4 h-4 text-[var(--accent-gold)]" />
                  <span>Second / Co-Author Information Page</span>
                </div>
                <ul className="space-y-1 text-[var(--text-secondary)] font-mono text-[11px]">
                  <li>• Full name</li>
                  <li>• Institutional affiliation</li>
                  <li>• Department / School / Centre</li>
                  <li>• Institution</li>
                  <li>• City and country</li>
                  <li>• Email Address</li>
                  <li>• Highest academic qualification</li>
                  <li>• Designation / academic position</li>
                  <li>• Corresponding-author status</li>
                  <li>• Brief biographical note (if requested)</li>
                </ul>
              </div>
            </div>
            <p className="text-xs text-[var(--text-muted)] italic">
              The same structure should be followed for additional authors.
            </p>
          </section>

          {/* Section 6: Manuscript File */}
          <section id="manuscript-file" className="space-y-3 border-t border-[var(--border-subtle)] pt-8">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[var(--accent-gold)]">
              <span>Section 06</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)]">
              Manuscript File (Blinded for Peer Review)
            </h2>
            <p>
              The manuscript must be uploaded as a separate file from the author-information pages. The manuscript should contain only the scholarly content necessary for peer review and should not disclose the identity or institutional affiliation of the authors.
            </p>
            <p>
              The manuscript should ordinarily include:
            </p>
            <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs font-mono">
                <div>1. Title of the article</div>
                <div>8. Results / Findings</div>
                <div>2. Abstract (250–300 words)</div>
                <div>9. Discussion</div>
                <div>3. Keywords (3–8 terms)</div>
                <div>10. Implications (where applicable)</div>
                <div>4. Introduction</div>
                <div>11. Limitations</div>
                <div>5. Review of Literature / Theoretical Framework</div>
                <div>12. Conclusion</div>
                <div>6. Research Questions / Hypotheses</div>
                <div>13. References (APA 7th)</div>
                <div>7. Methodology</div>
                <div>14. Tables and Figures (where applicable)</div>
              </div>
            </div>
          </section>

          {/* Section 7: Manuscript Length & Abstract */}
          <section id="length-abstract" className="space-y-4 border-t border-[var(--border-subtle)] pt-8">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[var(--accent-gold)]">
              <span>Section 07</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)]">
              Manuscript Length and Abstract
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-2">
                <strong className="text-sm font-sans font-bold text-[var(--text-primary)] block">
                  Manuscript Length
                </strong>
                <p className="text-xs">
                  Research articles should ordinarily contain approximately <strong>5,000–8,000 words</strong>, excluding references, tables, figures, and supplementary material.
                </p>
                <p className="text-[11px] text-[var(--text-muted)] italic">
                  Review articles, conceptual papers, methodological articles, and special contributions may have different length requirements subject to the approval of the Editorial Office.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-2">
                <strong className="text-sm font-sans font-bold text-[var(--text-primary)] block">
                  Abstract Specifications
                </strong>
                <p className="text-xs">
                  Each manuscript should include a structured or sufficiently informative abstract of approximately <strong>250–300 words (Maximum 300 words)</strong>. The abstract should be understandable independently of the main manuscript without unnecessary citations.
                </p>
                <div className="text-[11px] font-mono text-[var(--text-secondary)] space-y-0.5 pt-1">
                  <div>• Background / Context</div>
                  <div>• Purpose or Research Problem</div>
                  <div>• Methodology</div>
                  <div>• Key Findings &amp; Implications/Conclusion</div>
                </div>
              </div>
            </div>

            <p className="text-xs">
              <strong>Keywords:</strong> Please provide <strong>3–8 keywords</strong> that assist readers in discovering the article through academic databases.
            </p>
          </section>

          {/* Section 8: Formatting Requirements */}
          <section id="formatting" className="space-y-4 border-t border-[var(--border-subtle)] pt-8">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[var(--accent-gold)]">
              <span>Section 08</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)]">
              Formatting Requirements
            </h2>
            <p>
              Authors should avoid excessive formatting, decorative fonts, unnecessary text boxes, or design elements that may interfere with the review and production process. Unless otherwise specified by a particular article type, manuscripts should follow these basic formatting requirements:
            </p>

            <div className="rounded-xl border border-[var(--border-subtle)] overflow-hidden text-xs">
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-card-hover)]">
                    <td className="p-2.5 font-bold font-sans text-[var(--text-primary)] w-1/3">File format</td>
                    <td className="p-2.5 font-mono text-[var(--accent-navy)] font-semibold">Microsoft Word (.doc / .docx) — Max 5 MB</td>
                  </tr>
                  <tr className="border-b border-[var(--border-subtle)]">
                    <td className="p-2.5 font-bold font-sans text-[var(--text-primary)]">Font &amp; Size</td>
                    <td className="p-2.5 font-mono">Garamond, 12 pt</td>
                  </tr>
                  <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-card-hover)]">
                    <td className="p-2.5 font-bold font-sans text-[var(--text-primary)]">Line spacing &amp; Alignment</td>
                    <td className="p-2.5 font-mono">1.2 Spacing, Justified</td>
                  </tr>
                  <tr className="border-b border-[var(--border-subtle)]">
                    <td className="p-2.5 font-bold font-sans text-[var(--text-primary)]">Page size &amp; Margins</td>
                    <td className="p-2.5 font-mono">A4, 1 inch (2.54 cm) on all sides</td>
                  </tr>
                  <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-card-hover)]">
                    <td className="p-2.5 font-bold font-sans text-[var(--text-primary)]">Page numbers &amp; Paragraphs</td>
                    <td className="p-2.5 font-mono">Consecutive numbers, Consistently formatted paragraphs</td>
                  </tr>
                  <tr className="border-b border-[var(--border-subtle)]">
                    <td className="p-2.5 font-bold font-sans text-[var(--text-primary)]">Tables and figures</td>
                    <td className="p-2.5 font-mono">Numbered consecutively with titles and captions</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold font-sans text-[var(--text-primary)]">Headings</td>
                    <td className="p-2.5 font-mono">Clearly differentiated and consistently formatted</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 9: Referencing and Citation Style */}
          <section id="referencing" className="space-y-3 border-t border-[var(--border-subtle)] pt-8">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[var(--accent-gold)]">
              <span>Section 09</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)]">
              Referencing and Citation Style (APA 7th Edition)
            </h2>
            <p>
              <em>The Crime &amp; Society Review</em> follows the <strong>American Psychological Association (APA), 7th edition</strong> style for in-text citations and references.
            </p>
            <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold font-sans text-[var(--text-primary)]">
                <BookOpen className="w-4 h-4 text-[var(--accent-gold)]" />
                <span>Citation Placement: Footnote or Endnote</span>
              </div>
              <p>
                The citation should be placed in <strong>footnote or Endnote</strong>. Authors must ensure that every source cited in the manuscript appears in the reference list and that every reference listed is cited in the manuscript.
              </p>
            </div>
          </section>

          {/* Section 10: Tables, Figures, and Illustrations */}
          <section id="tables-figures" className="space-y-3 border-t border-[var(--border-subtle)] pt-8">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[var(--accent-gold)]">
              <span>Section 10</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)]">
              Tables, Figures, and Illustrations
            </h2>
            <p>
              Tables and figures should be relevant, necessary, clearly labelled, and appropriately referenced in the manuscript text. Each table should have a descriptive title, while figures should have an appropriate caption.
            </p>
            <p>
              Authors must ensure that all tables, figures, photographs, diagrams, maps, and other visual materials are either original, appropriately licensed, or reproduced with the necessary written permission.
            </p>
          </section>

          {/* Section 11: Research Methodology and Data Transparency */}
          <section id="methodology-transparency" className="space-y-3 border-t border-[var(--border-subtle)] pt-8">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[var(--accent-gold)]">
              <span>Section 11</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)]">
              Research Methodology and Data Transparency
            </h2>
            <p>
              Empirical manuscripts must provide sufficient methodological information to enable readers to understand how the research was conducted and how the findings were derived. Authors should not fabricate, manipulate, selectively report, or misrepresent research data.
            </p>
            <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
              <span className="text-xs font-bold font-sans text-[var(--text-primary)] block mb-2">
                Where applicable, empirical manuscripts must clearly report:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono text-[var(--text-secondary)]">
                <div>• Research design</div>
                <div>• Study setting</div>
                <div>• Population &amp; sample</div>
                <div>• Sampling strategy</div>
                <div>• Data collection</div>
                <div>• Instruments / measures</div>
                <div>• Variables analyzed</div>
                <div>• Analytical techniques</div>
                <div>• Ethical safeguards</div>
                <div>• Inclusion/exclusion</div>
                <div>• Study limitations</div>
                <div>• Validity &amp; reliability</div>
              </div>
            </div>
          </section>

          {/* Section 12: Research Ethics */}
          <section id="research-ethics" className="space-y-3 border-t border-[var(--border-subtle)] pt-8">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[var(--accent-gold)]">
              <span>Section 12</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)]">
              Research Ethics
            </h2>
            <p>
              Research involving human participants must comply with applicable ethical standards and institutional requirements. Where applicable, authors should provide information concerning ethical approval, informed consent, confidentiality, anonymity, data protection, and participant safeguards.
            </p>
            <p>
              For research involving vulnerable populations, additional safeguards should be clearly documented. Where ethical approval is not applicable, authors may be required to provide an appropriate statement explaining why.
            </p>
          </section>

          {/* Section 13: Declaration of Originality */}
          <section id="declaration-originality" className="space-y-3 border-t border-[var(--border-subtle)] pt-8">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[var(--accent-gold)]">
              <span>Section 13</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)]">
              Declaration of Originality
            </h2>
            <p>
              At submission, the corresponding author must confirm that:
            </p>
            <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] text-xs space-y-1.5">
              <p>• The manuscript is original and has not been published previously in substantially similar form.</p>
              <p>• The manuscript is not currently under consideration by another publication outlet.</p>
              <p>• All sources, quotations, data, and intellectual contributions have been appropriately cited and acknowledged.</p>
            </div>
          </section>

          {/* Section 14: Peer Review */}
          <section id="peer-review" className="space-y-3 border-t border-[var(--border-subtle)] pt-8">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[var(--accent-gold)]">
              <span>Section 14</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)]">
              Peer Review Process
            </h2>
            <p>
              All manuscripts that pass the journal's initial editorial screening may be subjected to <strong>double-blind peer review</strong>, unless the Editorial Board determines that another review model is appropriate for a particular contribution. Passing the initial screening does not guarantee peer review or publication.
            </p>
            <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
              <span className="text-xs font-bold font-sans text-[var(--text-primary)] block mb-2">
                During the initial screening, the Editorial Office assesses:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-[var(--text-secondary)]">
                <div>1. Relevance to aims &amp; scope</div>
                <div>6. Ethical compliance</div>
                <div>2. Originality of contribution</div>
                <div>7. Plagiarism &amp; similarity check</div>
                <div>3. Scholarly &amp; theoretical contribution</div>
                <div>8. AI-use compliance (&lt; 10%)</div>
                <div>4. Methodological quality &amp; rigor</div>
                <div>9. Citation and referencing (APA 7th)</div>
                <div>5. Academic writing &amp; coherence</div>
                <div>10. Adherence to formatting requirements</div>
              </div>
            </div>
          </section>

          {/* Section 15: Language and Academic Writing */}
          <section id="language" className="space-y-3 border-t border-[var(--border-subtle)] pt-8">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[var(--accent-gold)]">
              <span>Section 15</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)]">
              Language and Academic Writing
            </h2>
            <p>
              Manuscripts should be written in clear, precise, formal academic English. Authors are responsible for ensuring grammatical accuracy, coherence, terminology, and readability.
            </p>
            <p>
              The journal encourages inclusive and respectful scholarly language and discourages language that is unnecessarily discriminatory, stigmatising, sensationalist, or unsupported by evidence.
            </p>
          </section>

          {/* Section 16: Complete Interactive Submission Checklist */}
          <section id="checklist" className="space-y-4 border-t border-[var(--border-subtle)] pt-8 pb-12">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[var(--accent-gold)]">
                  <span>Section 16</span>
                </div>
                <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)]">
                  Submission Checklist
                </h2>
              </div>
              <button
                type="button"
                onClick={handleSelectAllChecklist}
                className="px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] hover:bg-[var(--bg-card-hover)] text-xs font-mono text-[var(--accent-navy)] font-semibold cursor-pointer shrink-0"
              >
                Select All
              </button>
            </div>
            <p className="text-xs text-[var(--text-secondary)]">
              Authors must verify and complete each item before submitting their manuscript:
            </p>

            <div className="space-y-2 p-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
              {checklistItems.map((item, idx) => {
                const isChecked = !!checkedItems[idx];
                return (
                  <div
                    key={idx}
                    onClick={() => toggleChecklist(idx)}
                    className="flex items-start gap-3 p-2 rounded-lg hover:bg-[var(--bg-card-hover)] cursor-pointer transition-colors"
                  >
                    <button
                      type="button"
                      className="mt-0.5 text-[var(--accent-navy)] shrink-0"
                      aria-label="Toggle checkbox"
                    >
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <Square className="w-4 h-4 text-[var(--text-muted)]" />
                      )}
                    </button>
                    <span className={`text-xs ${isChecked ? 'text-[var(--text-primary)] font-medium' : 'text-[var(--text-secondary)]'}`}>
                      {item}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

        </div>

        {/* ========================================================
            SUBMISSION FORM COLUMN: (5 cols on desktop, order-1 on mobile)
            Locked in place on desktop - Stays sticky throughout entire page scroll
        ======================================================== */}
        <div className="order-1 lg:order-2 lg:col-span-5 relative self-stretch">
          <div className="lg:sticky lg:top-20 lg:max-h-[calc(100vh-5.5rem)] lg:overflow-y-auto overscroll-contain pr-1 pb-4">
            
            <div className="p-6 rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-card)] space-y-6 shadow-md">
            
            {/* Form Top Instruction */}
            <div className="space-y-1.5 border-b border-[var(--border-subtle)] pb-4">
              <h2 className="font-serif text-xl font-bold text-[var(--text-primary)]">
                Manuscript Submission Form
              </h2>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Please complete the submission form and upload the required files. For peer review, the Author Information and Blind Manuscript must be submitted separately.
              </p>
            </div>

            {/* Validation Error Banner */}
            {validationError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-600 dark:text-red-400 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{validationError}</span>
              </div>
            )}

            <form onSubmit={handleSubmitForm} className="space-y-6">
              
              {/* 1. MANUSCRIPT DETAILS */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[var(--accent-gold)] border-b border-[var(--border-subtle)] pb-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  <span>1. Manuscript Details</span>
                </div>

                {/* Manuscript Title */}
                <div>
                  <label className="block text-xs font-medium text-[var(--text-primary)] mb-1">
                    Manuscript Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter complete manuscript title"
                    className="w-full text-xs p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-[var(--text-primary)] focus:outline-hidden focus:ring-1 focus:ring-[var(--accent-navy)]"
                  />
                </div>

                {/* Article Type */}
                <div>
                  <label className="block text-xs font-medium text-[var(--text-primary)] mb-1">
                    Article Type *
                  </label>
                  <select
                    value={articleType}
                    onChange={(e) => setArticleType(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-[var(--text-primary)] focus:outline-hidden focus:ring-1 focus:ring-[var(--accent-navy)]"
                  >
                    <option value="Research Article">Research Article</option>
                    <option value="Review Article">Review Article</option>
                    <option value="Theoretical & Conceptual Article">Theoretical &amp; Conceptual Article</option>
                    <option value="Methodological Article">Methodological Article</option>
                    <option value="Short Communication & Research Note">Short Communication &amp; Research Note</option>
                    <option value="Case Study & Case Report">Case Study &amp; Case Report</option>
                    <option value="Policy & Practice Article">Policy &amp; Practice Article</option>
                    <option value="Commentary & Perspective">Commentary &amp; Perspective</option>
                    <option value="Book Review">Book Review</option>
                  </select>
                </div>

                {/* Keywords */}
                <div>
                  <label className="block text-xs font-medium text-[var(--text-primary)] mb-1">
                    Keywords *
                  </label>
                  <input
                    type="text"
                    required
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="e.g. Criminal Law, Section 63 BSA, Due Process"
                    className="w-full text-xs p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-[var(--text-primary)] focus:outline-hidden focus:ring-1 focus:ring-[var(--accent-navy)]"
                  />
                  <span className="text-[11px] text-[var(--text-muted)] font-mono block mt-1">
                    Please provide 3–8 keywords.
                  </span>
                </div>

                {/* Abstract */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-medium text-[var(--text-primary)]">
                      Abstract *
                    </label>
                    <span className={`text-[10px] font-mono ${abstractWordCount > 300 ? 'text-red-500 font-bold' : 'text-[var(--text-muted)]'}`}>
                      {abstractWordCount} / 300 words
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    required
                    value={abstractText}
                    onChange={(e) => setAbstractText(e.target.value)}
                    placeholder="Enter abstract text..."
                    className="w-full text-xs p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-[var(--text-primary)] focus:outline-hidden focus:ring-1 focus:ring-[var(--accent-navy)] leading-relaxed"
                  />
                  <span className="text-[11px] text-[var(--text-muted)] font-mono block mt-0.5">
                    Maximum 300 words.
                  </span>
                </div>
              </div>

              {/* 2. AUTHOR INFORMATION */}
              <div className="space-y-4 pt-2 border-t border-[var(--border-subtle)]">
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-1.5">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[var(--accent-gold)]">
                    <User className="w-3.5 h-3.5" />
                    <span>2. Author Information</span>
                  </div>
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">
                    {authorMode === 'manual' ? `${manualAuthors.length} Author${manualAuthors.length > 1 ? 's' : ''}` : 'Document Upload'}
                  </span>
                </div>

                {/* Option Toggle Switch */}
                <div className="grid grid-cols-2 p-1 rounded-xl bg-[var(--bg-page)] border border-[var(--border-subtle)] gap-1">
                  <button
                    type="button"
                    onClick={() => setAuthorMode('manual')}
                    className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      authorMode === 'manual'
                        ? 'bg-[var(--accent-navy)] text-white shadow-xs'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)]'
                    }`}
                  >
                    <PenLine className="w-3.5 h-3.5" />
                    <span>Manually Fill</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthorMode('upload')}
                    className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      authorMode === 'upload'
                        ? 'bg-[var(--accent-navy)] text-white shadow-xs'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)]'
                    }`}
                  >
                    <FileUp className="w-3.5 h-3.5" />
                    <span>Upload File (.docx)</span>
                  </button>
                </div>

                {authorMode === 'manual' ? (
                  /* Option A: Manually Fill Author Details */
                  <div className="space-y-3.5">
                    <div className="p-3 rounded-xl bg-[var(--accent-gold)]/10 border border-[var(--accent-gold)]/20 text-xs text-[var(--text-secondary)] flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-[var(--accent-gold)] shrink-0 mt-0.5" />
                      <span>
                        Author details are held confidentially by the Editorial Office to safeguard <strong>double-blind review</strong>. Reviewers will only receive the blinded manuscript.
                      </span>
                    </div>

                    {manualAuthors.map((author, index) => (
                      <div 
                        key={index} 
                        className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-page)] space-y-3 relative"
                      >
                        <div className="flex items-center justify-between pb-1 border-b border-[var(--border-subtle)]">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-mono font-bold text-[var(--accent-navy)]">
                              {index === 0 ? 'Author 1 (Primary Author)' : `Author ${index + 1} (Co-Author)`}
                            </span>
                            {author.isCorresponding && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[var(--accent-navy)]/10 text-[var(--accent-navy)] font-semibold">
                                Corresponding
                              </span>
                            )}
                          </div>
                          {index > 0 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveAuthor(index)}
                              className="text-red-500 hover:text-red-700 text-xs flex items-center gap-1 cursor-pointer font-mono"
                              title="Remove co-author"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Remove</span>
                            </button>
                          )}
                        </div>

                        {/* Name and Email */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <div>
                            <label className="block text-[11px] font-medium text-[var(--text-primary)] mb-1">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              required={index === 0}
                              value={author.fullName}
                              onChange={(e) => handleAuthorChange(index, 'fullName', e.target.value)}
                              placeholder="e.g. Dr. Rajesh Sharma"
                              className="w-full text-xs p-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-primary)] focus:outline-hidden focus:ring-1 focus:ring-[var(--accent-navy)]"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-medium text-[var(--text-primary)] mb-1">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              required={index === 0}
                              value={author.email}
                              onChange={(e) => handleAuthorChange(index, 'email', e.target.value)}
                              placeholder="e.g. r.sharma@nlu.ac.in"
                              className="w-full text-xs p-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-primary)] focus:outline-hidden focus:ring-1 focus:ring-[var(--accent-navy)]"
                            />
                          </div>
                        </div>

                        {/* Institutional Affiliation & Department */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <div>
                            <label className="block text-[11px] font-medium text-[var(--text-primary)] mb-1">
                              Institutional Affiliation *
                            </label>
                            <input
                              type="text"
                              required={index === 0}
                              value={author.affiliation}
                              onChange={(e) => handleAuthorChange(index, 'affiliation', e.target.value)}
                              placeholder="e.g. National Law University, Delhi"
                              className="w-full text-xs p-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-primary)] focus:outline-hidden focus:ring-1 focus:ring-[var(--accent-navy)]"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-medium text-[var(--text-primary)] mb-1">
                              Department / School / Centre
                            </label>
                            <input
                              type="text"
                              value={author.department || ''}
                              onChange={(e) => handleAuthorChange(index, 'department', e.target.value)}
                              placeholder="e.g. Department of Criminal Law"
                              className="w-full text-xs p-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-primary)] focus:outline-hidden focus:ring-1 focus:ring-[var(--accent-navy)]"
                            />
                          </div>
                        </div>

                        {/* Designation & City/Country */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <div>
                            <label className="block text-[11px] font-medium text-[var(--text-primary)] mb-1">
                              Designation / Position
                            </label>
                            <input
                              type="text"
                              value={author.designation || ''}
                              onChange={(e) => handleAuthorChange(index, 'designation', e.target.value)}
                              placeholder="e.g. Assistant Professor / PhD Scholar"
                              className="w-full text-xs p-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-primary)] focus:outline-hidden focus:ring-1 focus:ring-[var(--accent-navy)]"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-medium text-[var(--text-primary)] mb-1">
                              City &amp; Country
                            </label>
                            <input
                              type="text"
                              value={author.cityCountry || ''}
                              onChange={(e) => handleAuthorChange(index, 'cityCountry', e.target.value)}
                              placeholder="e.g. New Delhi, India"
                              className="w-full text-xs p-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-primary)] focus:outline-hidden focus:ring-1 focus:ring-[var(--accent-navy)]"
                            />
                          </div>
                        </div>

                        {/* Qualification & ORCID */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <div>
                            <label className="block text-[11px] font-medium text-[var(--text-primary)] mb-1">
                              Highest Qualification
                            </label>
                            <input
                              type="text"
                              value={author.qualification || ''}
                              onChange={(e) => handleAuthorChange(index, 'qualification', e.target.value)}
                              placeholder="e.g. Ph.D. in Criminology, LL.M."
                              className="w-full text-xs p-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-primary)] focus:outline-hidden focus:ring-1 focus:ring-[var(--accent-navy)]"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-medium text-[var(--text-primary)] mb-1">
                              ORCID iD (Optional)
                            </label>
                            <input
                              type="text"
                              value={author.orcid || ''}
                              onChange={(e) => handleAuthorChange(index, 'orcid', e.target.value)}
                              placeholder="e.g. 0000-0002-1825-0097"
                              className="w-full text-xs p-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-primary)] focus:outline-hidden focus:ring-1 focus:ring-[var(--accent-navy)] font-mono"
                            />
                          </div>
                        </div>

                        {/* Corresponding Author toggle */}
                        <label className="flex items-center gap-2 cursor-pointer pt-1">
                          <input
                            type="checkbox"
                            checked={!!author.isCorresponding}
                            onChange={(e) => handleAuthorChange(index, 'isCorresponding', e.target.checked)}
                            className="rounded text-[var(--accent-navy)] focus:ring-[var(--accent-navy)] shrink-0"
                          />
                          <span className="text-[11px] text-[var(--text-secondary)]">
                            Designate as Corresponding Author
                          </span>
                        </label>
                      </div>
                    ))}

                    {/* Add Co-author Button */}
                    <button
                      type="button"
                      onClick={handleAddAuthor}
                      className="w-full py-2.5 px-3 rounded-xl border border-dashed border-[var(--border-strong)] hover:border-[var(--accent-navy)] hover:bg-[var(--bg-card-hover)] text-xs text-[var(--accent-navy)] font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Co-Author</span>
                    </button>
                  </div>
                ) : (
                  /* Option B: Upload Author Information File */
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-page)] text-xs space-y-1">
                      <span className="font-semibold text-[var(--text-primary)] block">
                        Please upload a separate Author Information file containing:
                      </span>
                      <ul className="list-disc list-inside text-[var(--text-secondary)] space-y-0.5 pl-1 text-[11px]">
                        <li>Full name of the corresponding author &amp; co-authors</li>
                        <li>Designation, Institutional Affiliation, Department</li>
                        <li>City, Country, Email &amp; ORCID iDs</li>
                      </ul>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[var(--text-primary)] mb-1">
                        Upload Author Information (.doc / .docx) *
                      </label>
                      <div className="relative border border-[var(--border-subtle)] hover:border-[var(--accent-navy)] rounded-xl p-3 bg-[var(--bg-page)] transition-colors">
                        <input
                          type="file"
                          accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          onChange={handleAuthorInfoUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="flex items-center justify-between gap-2 text-xs">
                          {authorInfoFileName ? (
                            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-mono truncate">
                              <FileCheck className="w-4 h-4 shrink-0" />
                              <span className="truncate">{authorInfoFileName}</span>
                              <span className="text-[10px] text-[var(--text-muted)] shrink-0">({authorInfoFileSize})</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                              <UploadCloud className="w-4 h-4 text-[var(--accent-navy)]" />
                              <span>Choose File (Word doc only)</span>
                            </div>
                          )}
                          <span className="px-2 py-1 rounded bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[10px] font-mono text-[var(--text-muted)] shrink-0">
                            Max 5 MB
                          </span>
                        </div>
                      </div>
                      {authorInfoFileError && (
                        <p className="text-[11px] font-mono text-red-600 dark:text-red-400 mt-1">
                          {authorInfoFileError}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* 3. BLIND MANUSCRIPT */}
              <div className="space-y-3 pt-2 border-t border-[var(--border-subtle)]">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[var(--accent-gold)] border-b border-[var(--border-subtle)] pb-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>3. Blind Manuscript</span>
                </div>

                <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-page)] text-xs space-y-1">
                  <span className="font-semibold text-[var(--text-primary)] block">
                    Please upload the complete manuscript without any author-identifying information.
                  </span>
                  <p className="text-[11px] text-[var(--text-secondary)]">
                    The manuscript should not contain author names, affiliations, email addresses, acknowledgements, or other information that may reveal the identity of the authors.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[var(--text-primary)] mb-1">
                    Upload Blind Manuscript *
                  </label>
                  <div className="relative border border-[var(--border-subtle)] hover:border-[var(--accent-navy)] rounded-xl p-3 bg-[var(--bg-page)] transition-colors">
                    <input
                      type="file"
                      accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={handleBlindManuscriptUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex items-center justify-between gap-2 text-xs">
                      {blindManuscriptFileName ? (
                        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-mono truncate">
                          <FileCheck className="w-4 h-4 shrink-0" />
                          <span className="truncate">{blindManuscriptFileName}</span>
                          <span className="text-[10px] text-[var(--text-muted)] shrink-0">({blindManuscriptFileSize})</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                          <UploadCloud className="w-4 h-4 text-[var(--accent-navy)]" />
                          <span>Choose File (doc file only)</span>
                        </div>
                      )}
                      <span className="px-2 py-1 rounded bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[10px] font-mono text-[var(--text-muted)] shrink-0">
                        Max 5 MB
                      </span>
                    </div>
                  </div>
                  {blindManuscriptFileError && (
                    <p className="text-[11px] font-mono text-red-600 dark:text-red-400 mt-1">
                      {blindManuscriptFileError}
                    </p>
                  )}
                </div>
              </div>

              {/* 4. DECLARATION & SUBMISSION */}
              <div className="space-y-3 pt-2 border-t border-[var(--border-subtle)]">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[var(--accent-gold)] border-b border-[var(--border-subtle)] pb-1.5">
                  <CheckSquare className="w-3.5 h-3.5" />
                  <span>4. Declaration &amp; Submission</span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={declOriginal}
                      onChange={(e) => setDeclOriginal(e.target.checked)}
                      className="mt-0.5 rounded text-[var(--accent-navy)] focus:ring-[var(--accent-navy)] shrink-0"
                    />
                    <span className="text-[var(--text-secondary)]">
                      I confirm that the manuscript is original and is not currently under consideration by another journal.
                    </span>
                  </label>

                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={declApproved}
                      onChange={(e) => setDeclApproved(e.target.checked)}
                      className="mt-0.5 rounded text-[var(--accent-navy)] focus:ring-[var(--accent-navy)] shrink-0"
                    />
                    <span className="text-[var(--text-secondary)]">
                      I confirm that all authors have approved the manuscript and agreed to its submission.
                    </span>
                  </label>

                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={declAccurate}
                      onChange={(e) => setDeclAccurate(e.target.checked)}
                      className="mt-0.5 rounded text-[var(--accent-navy)] focus:ring-[var(--accent-navy)] shrink-0"
                    />
                    <span className="text-[var(--text-secondary)]">
                      I confirm that the author information and author order provided are accurate.
                    </span>
                  </label>

                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={declBlind}
                      onChange={(e) => setDeclBlind(e.target.checked)}
                      className="mt-0.5 rounded text-[var(--accent-navy)] focus:ring-[var(--accent-navy)] shrink-0"
                    />
                    <span className="text-[var(--text-secondary)]">
                      I confirm that the manuscript has been prepared for blind peer review.
                    </span>
                  </label>
                </div>

                {/* Message to the Editor (Optional) */}
                <div className="pt-2">
                  <label className="block text-xs font-medium text-[var(--text-primary)] mb-1 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                    <span>Message to the Editor (Optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={editorMessage}
                    onChange={(e) => setEditorMessage(e.target.value)}
                    placeholder="Enter any additional remarks or notes for the editorial desk..."
                    className="w-full text-xs p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-[var(--text-primary)] focus:outline-hidden focus:ring-1 focus:ring-[var(--accent-navy)] leading-relaxed"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl bg-[var(--accent-navy)] text-white text-xs font-bold hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting Manuscript...' : 'Submit Manuscript'}</span>
                </button>
                <p className="text-[10px] font-mono text-center text-[var(--text-muted)] mt-2">
                  Diamond Open Access • ₹0 APC • Doc Files Only (Max 5 MB)
                </p>
              </div>

            </form>

          </div>

        </div>

      </div>

    </div>

    </div>
  );
};

export default SubmitPage;
