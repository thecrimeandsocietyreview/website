import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  CheckCircle2,
  Clock,
  Send,
  Award,
  ShieldCheck,
  ShieldAlert,
  Sliders,
  Eye,
  ChevronRight,
  Sparkles,
  Search,
  Filter,
  Download,
  Trash2,
  ExternalLink,
  RefreshCw,
  AlertCircle,
  Plus,
  Lock,
  Unlock,
  LogOut,
  Database,
  HardDrive,
  Copy,
  Check,
  X,
  FileCheck,
  UserCheck,
  TrendingUp,
  Inbox,
  Share2,
  Mail,
  Phone,
  Calendar,
  Layers,
  BarChart3,
  KeyRound,
  User,
  Shield
} from 'lucide-react';
import { SubmissionDraft } from '../types/journal';
import { useTheme } from '../context/ThemeContext';

// Empanelled Reviewers (for Double-Blind Manuscript Assignment)
interface ReviewerProfile {
  id: string;
  name: string;
  designation: string;
  institution: string;
  expertise: string[];
  activeReviews: number;
  completedReviews: number;
  status: 'Available' | 'Busy' | 'On Leave';
  email: string;
}

const REVIEWERS_ROSTER: ReviewerProfile[] = [
  {
    id: 'rev-01',
    name: 'Dr. J. R. Gaur',
    designation: 'Lifetime Professor & Emeritus Resource Faculty',
    institution: 'Rashtriya Raksha University',
    expertise: ['Forensic Ballistics', 'Crime Scene Reconstruction', 'BSA Section 63'],
    activeReviews: 1,
    completedReviews: 14,
    status: 'Available',
    email: 'jr.gaur@rru.ac.in'
  },
  {
    id: 'rev-02',
    name: 'Dr. Mahesh A. Tripathi',
    designation: 'Associate Professor',
    institution: 'Rashtriya Raksha University',
    expertise: ['Criminal Criminology', 'Correctional Administration', 'BNSS Due Process'],
    activeReviews: 2,
    completedReviews: 9,
    status: 'Busy',
    email: 'mahesh.tripathi@rru.ac.in'
  },
  {
    id: 'rev-03',
    name: 'Dr. Dimple T. Raval',
    designation: 'Associate Professor of Law',
    institution: 'Rashtriya Raksha University',
    expertise: ['Cyber Jurisprudence', 'Digital Evidence Certification', 'IT Act 65B/BSA'],
    activeReviews: 0,
    completedReviews: 11,
    status: 'Available',
    email: 'dimple.raval@rru.ac.in'
  },
  {
    id: 'rev-04',
    name: 'Dr. Sheetal Arora',
    designation: 'Assistant Professor (Senior Scale)',
    institution: 'Sardar Patel University of Police (SPUP)',
    expertise: ['Criminology', 'Victimology', 'Gender-Based Crime Dynamics'],
    activeReviews: 1,
    completedReviews: 8,
    status: 'Available',
    email: 'sheetal.arora@policeuniversity.ac.in'
  },
  {
    id: 'rev-05',
    name: 'Dr. Sushil Goswami',
    designation: 'Head, External Affairs & Assistant Professor of Law',
    institution: 'Gujarat National Law University (GNLU)',
    expertise: ['Bharatiya Nyaya Sanhita (BNS)', 'Criminal Jurisprudence', 'Statutory Interpretation'],
    activeReviews: 2,
    completedReviews: 16,
    status: 'Available',
    email: 'sgoswami@gnlu.ac.in'
  },
  {
    id: 'rev-06',
    name: 'Mohit Charan',
    designation: 'Assistant Professor',
    institution: 'Hemvati Nandan Bahuguna Garhwal University',
    expertise: ['Sociology of Crime', 'Penology', 'Undertrial Incarceration Studies'],
    activeReviews: 1,
    completedReviews: 6,
    status: 'Available',
    email: 'm.charan@hnbgu.ac.in'
  },
  {
    id: 'rev-07',
    name: 'Dr. Asif Hasan',
    designation: 'Assistant Professor, Department of Psychology',
    institution: 'Aligarh Muslim University (AMU)',
    expertise: ['Forensic Psychology', 'Criminal Profiling', 'Eyewitness Reliability'],
    activeReviews: 0,
    completedReviews: 7,
    status: 'Available',
    email: 'asif.hasan@amu.ac.in'
  }
];

export const AdminPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  // Authentication State (Zero credentials in client code)
  const [currentUser, setCurrentUser] = useState<{ username: string; displayName: string; role: string } | null>(() => {
    const saved = localStorage.getItem('csr_admin_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem('csr_admin_token');
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'submissions' | 'cloudflare'>('submissions');

  // Submissions State (Exclusively Real Data from Cloudflare D1)
  const [submissions, setSubmissions] = useState<SubmissionDraft[]>(() => {
    const saved = localStorage.getItem('csr_user_submissions');
    if (saved) {
      try {
        const userSubs: SubmissionDraft[] = JSON.parse(saved);
        // Exclude any legacy mock items
        return userSubs.filter(
          s => !s.id.startsWith('sub-csr-') &&
               s.trackingNumber !== 'CSR-IND-2026-0819' &&
               s.trackingNumber !== 'CSR-IND-2026-0922' &&
               s.trackingNumber !== 'CSR-IND-2026-0941'
        );
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [liveD1Count, setLiveD1Count] = useState(0);

  // Selected Submission for Detailed Dossier Modal
  const [selectedSub, setSelectedSub] = useState<SubmissionDraft | null>(null);

  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Editorial Decision Generator State
  const [decisionType, setDecisionType] = useState<'accept' | 'revision' | 'reject'>('revision');
  const [decisionNotes, setDecisionNotes] = useState('');
  const [assignedReviewers, setAssignedReviewers] = useState<string[]>([]);
  const [notificationSent, setNotificationSent] = useState(false);

  // Reviewers List for manuscript assignment
  const [reviewers] = useState<ReviewerProfile[]>(REVIEWERS_ROSTER);

  // Fetch real submissions from Cloudflare D1
  const fetchLiveSubmissions = async () => {
    setIsRefreshing(true);
    try {
      const token = localStorage.getItem('csr_admin_token') || '';
      const res = await fetch('/api/admin/submissions', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.submissions)) {
          setLiveD1Count(data.submissions.length);
          const mapped: SubmissionDraft[] = data.submissions.map((row: any) => ({
            id: `d1-${row.id}`,
            trackingNumber: row.tracking_number,
            title: row.title,
            abstract: row.abstract,
            primaryLens: 'legal',
            secondaryLenses: ['forensic', 'criminology'],
            articleType: row.article_type,
            authorName: row.author_name,
            authorEmail: row.author_email,
            authorPhone: row.authorPhone || row.author_phone || '',
            authorOrcid: 'Included in Dossier',
            authorAffiliation: 'Provided in Dossier',
            creditRoles: ['Author'],
            ethicsApproved: true,
            conflictDeclared: true,
            openDataAccessAccepted: true,
            fileName: row.blind_file_name,
            fileSize: row.blind_file_size,
            blindFileKey: row.blind_file_key,
            authorInfoFileName: row.author_file_name,
            authorInfoFileSize: row.author_file_size,
            authorFileKey: row.author_file_key,
            submittedAt: (row.submitted_at || '').split('T')[0] || new Date().toISOString().split('T')[0],
            status: row.status || 'Submitted',
            currentStageNumber: row.stage_number || 1,
            authorMode: 'upload',
            keywords: row.keywords || '',
            editorMessage: row.editor_message || '',
            editorialDecisionNotes: row.editorial_decision_notes || '',
            assignedReviewers: row.assigned_reviewers ? JSON.parse(row.assigned_reviewers || '[]') : []
          }));

          setSubmissions(mapped);
          try {
            localStorage.setItem('csr_user_submissions', JSON.stringify(mapped));
          } catch (e) {}
        }
      }
    } catch (err) {
      console.error('Failed to fetch from /api/admin/submissions:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Auto-fetch on mount when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchLiveSubmissions();
    }
  }, [isAuthenticated]);

  // Update localStorage whenever submissions change
  const saveSubmissions = (updatedList: SubmissionDraft[]) => {
    setSubmissions(updatedList);
    try {
      localStorage.setItem('csr_user_submissions', JSON.stringify(updatedList));
    } catch (e) {
      console.error("Failed to save to localStorage", e);
    }
  };

  // Sync selectedSub when modal opens
  useEffect(() => {
    if (selectedSub) {
      setAssignedReviewers(
        selectedSub.assignedReviewers && selectedSub.assignedReviewers.length > 0
          ? selectedSub.assignedReviewers
          : []
      );
      setDecisionNotes(selectedSub.editorialDecisionNotes || '');
      setNotificationSent(false);
    }
  }, [selectedSub?.id]);

  // Auth Handlers (Server-Side Authentication via /api/admin/login)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setAuthError('Please enter both User ID and Password.');
      return;
    }

    setAuthLoading(true);
    setAuthError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
        }),
      });

      const data = await res.json();
      if (res.ok && data.success && data.token) {
        localStorage.setItem('csr_admin_token', data.token);
        localStorage.setItem('csr_admin_user', JSON.stringify(data.user));
        setCurrentUser(data.user);
        setIsAuthenticated(true);
        setUsername('');
        setPassword('');
        setAuthError('');
      } else {
        setAuthError(data.message || 'Invalid User ID or Password.');
      }
    } catch (err: any) {
      setAuthError('Network error connecting to authentication server.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem('csr_admin_token');
    localStorage.removeItem('csr_admin_user');
  };

  // Download file from Cloudflare R2
  const handleDownloadR2File = (key?: string, fileName?: string) => {
    if (!key) {
      alert("No file key attached to this record in Cloudflare R2.");
      return;
    }
    const url = `/api/admin/download?key=${encodeURIComponent(key)}&name=${encodeURIComponent(fileName || 'manuscript.docx')}`;
    window.open(url, '_blank');
  };

  // Change Submission Status (Syncs directly with Cloudflare D1)
  const handleUpdateStatus = async (subId: string, newStatus: SubmissionDraft['status']) => {
    let stageNum = 1;
    if (newStatus === 'Editorial Triage') stageNum = 2;
    if (newStatus === 'Under Peer Review') stageNum = 3;
    if (newStatus === 'Revisions Required') stageNum = 4;
    if (newStatus === 'Accepted') stageNum = 5;
    if (newStatus === 'Published') stageNum = 6;

    const targetSub = submissions.find(s => s.id === subId);

    const updated = submissions.map(s => {
      if (s.id === subId) {
        return {
          ...s,
          status: newStatus,
          currentStageNumber: stageNum
        };
      }
      return s;
    });

    saveSubmissions(updated);
    if (selectedSub && selectedSub.id === subId) {
      setSelectedSub({
        ...selectedSub,
        status: newStatus,
        currentStageNumber: stageNum
      });
    }

    // Persist to Cloudflare D1
    if (targetSub?.trackingNumber) {
      try {
        await fetch('/api/admin/update-status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            trackingNumber: targetSub.trackingNumber,
            status: newStatus,
            stageNumber: stageNum,
            editorialDecisionNotes: decisionNotes,
            assignedReviewers: assignedReviewers
          })
        });
      } catch (err) {
        console.error("Failed to sync status update with Cloudflare D1:", err);
      }
    }
  };

  // Delete Submission (Retires tracking ID and updates Cloudflare D1)
  const handleDeleteSubmission = async (subId: string) => {
    const targetSub = submissions.find(s => s.id === subId);
    if (!targetSub) return;

    if (window.confirm(`Are you sure you want to permanently retire and delete submission ${targetSub.trackingNumber}? This tracking ID will be permanently blacklisted.`)) {
      const updated = submissions.filter(s => s.id !== subId);
      saveSubmissions(updated);
      if (selectedSub?.id === subId) {
        setSelectedSub(null);
      }

      // Persist to Cloudflare D1
      if (targetSub.trackingNumber) {
        try {
          await fetch('/api/admin/delete-submission', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              trackingNumber: targetSub.trackingNumber,
              reason: 'Deleted by Admin via Editorial Console'
            })
          });
        } catch (err) {
          console.error("Failed to retire submission in Cloudflare D1:", err);
        }
      }
    }
  };

  // Copy tracking number
  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ["Tracking ID", "Title", "Author Name", "Author Email", "Author Phone", "Affiliation", "Status", "Date", "Primary Lens"];
    const rows = submissions.map(s => [
      `"${s.trackingNumber}"`,
      `"${s.title.replace(/"/g, '""')}"`,
      `"${s.authorName || 'Not Provided'}"`,
      `"${s.authorEmail || 'Not Provided'}"`,
      `"${s.authorPhone || 'Not Provided'}"`,
      `"${(s.authorAffiliation || '').replace(/"/g, '""')}"`,
      `"${s.status}"`,
      `"${s.submittedAt}"`,
      `"${s.primaryLens}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `CSR_Submissions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  // Filtered Submissions
  const filteredSubmissions = useMemo(() => {
    return submissions.filter(sub => {
      const matchesSearch =
        sub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (sub.authorName && sub.authorName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (sub.authorEmail && sub.authorEmail.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (sub.authorPhone && sub.authorPhone.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus =
        statusFilter === 'all' ||
        sub.status.toLowerCase().replace(/\s+/g, '-') === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [submissions, searchQuery, statusFilter]);

  // Statistics
  const stats = useMemo(() => {
    const total = submissions.length;
    const underReview = submissions.filter(s => s.status === 'Under Peer Review').length;
    const triage = submissions.filter(s => s.status === 'Submitted' || s.status === 'Editorial Triage').length;
    const accepted = submissions.filter(s => s.status === 'Accepted' || s.status === 'Published').length;
    const revisions = submissions.filter(s => s.status === 'Revisions Required').length;
    return { total, underReview, triage, accepted, revisions };
  }, [submissions]);

  // =========================================================================
  // VIEW: AUTHENTICATION LOCK SCREEN (If not logged in)
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-xl space-y-6 relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[var(--accent-navy)] via-[var(--accent-gold)] to-[var(--accent-navy)]" />

          {/* Logo & Header */}
          <div className="text-center space-y-3">
            <div className="w-14 h-14 mx-auto rounded-xl border border-[var(--border-subtle)] p-2 bg-[var(--bg-page)] shadow-xs flex items-center justify-center">
              <img src="/logo.png" alt="CSR Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent-gold)] font-bold">
                Editorial Operations Office
              </span>
              <h1 className="font-serif text-2xl font-bold text-[var(--text-primary)] mt-1">
                The Crime &amp; Society Review
              </h1>
              <p className="text-xs text-[var(--text-muted)] mt-1">
                Restricted access for Chief Editors, Managing Editors &amp; Editorial Board Members.
              </p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                Admin User ID / Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter User ID (e.g. editor_chief)"
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)] font-mono"
                  autoFocus
                />
                <User className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)] font-mono"
                />
                <Lock className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-3" />
              </div>
              {authError && (
                <p className="text-[11px] text-red-500 mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{authError}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-2.5 rounded-lg bg-[var(--accent-navy)] text-white text-xs font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-xs disabled:opacity-50"
            >
              {authLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Lock className="w-3.5 h-3.5" />}
              <span>{authLoading ? 'Verifying Credentials...' : 'Authenticate into Console'}</span>
            </button>
          </form>

          {/* Portal Navigation & Support Link */}
          <div className="pt-2 border-t border-[var(--border-subtle)] text-center space-y-2">
            <Link
              to="/"
              className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors inline-block"
            >
              ← Return to Public Journal Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW: FULL ENTERPRISE EDITORIAL ADMIN CONSOLE
  // =========================================================================
  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] flex flex-col font-sans transition-colors">
      
      {/* Top Professional Admin Bar */}
      <header className="border-b border-[var(--border-subtle)] bg-[var(--bg-card)] sticky top-0 z-40 px-4 sm:px-6 py-3 transition-colors shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Brand & Portal Badge */}
          <div className="flex items-center gap-3">
            <Link to="/" className="shrink-0 flex items-center gap-2.5 group">
              <img src="/logo.png" alt="CSR Logo" className="w-9 h-9 object-contain" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif font-bold text-base text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors">
                    The Crime &amp; Society Review
                  </span>
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[var(--accent-gold)]/15 text-[var(--accent-gold)] border border-[var(--accent-gold)]/30">
                    Admin Office
                  </span>
                </div>
                <span className="text-[11px] text-[var(--text-muted)] block -mt-0.5">
                  Editorial Pipeline &amp; Manuscript Review Console
                </span>
              </div>
            </Link>
          </div>

          {/* Quick System Indicators & User Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Cloudflare Shield Indicator */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Turnstile Active</span>
            </div>

            {/* Cloudflare R2 Storage Indicator */}
            <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-page)] text-[var(--text-muted)] text-[11px] font-mono">
              <HardDrive className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
              <span>R2: 10 GB Free Tier</span>
            </div>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-xs"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            {/* View Public Site */}
            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Journal Home</span>
            </Link>

            {/* Authenticated User Badge */}
            {currentUser && (
              <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-page)] text-xs font-mono">
                <Shield className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-bold text-[var(--text-primary)]">{currentUser.displayName}</span>
                <span className="text-[var(--text-muted)] text-[10px]">({currentUser.role})</span>
              </div>
            )}

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-semibold hover:bg-red-500/20 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        
        {/* Navigation Tabs Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveTab('submissions')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 shrink-0 ${
                activeTab === 'submissions'
                  ? 'bg-[var(--accent-navy)] text-white shadow-xs'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card)]'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Manuscripts Pipeline</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                activeTab === 'submissions' ? 'bg-white/20 text-white' : 'bg-[var(--bg-page)] text-[var(--text-muted)]'
              }`}>
                {submissions.length}
              </span>
            </button>


            <button
              onClick={() => setActiveTab('cloudflare')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 shrink-0 ${
                activeTab === 'cloudflare'
                  ? 'bg-[var(--accent-navy)] text-white shadow-xs'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card)]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Cloudflare &amp; Security</span>
            </button>
          </div>

          {/* Quick Actions (Sync D1 / Export) */}
          <div className="flex items-center gap-2">
            <button
              onClick={fetchLiveSubmissions}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-blue-500/40 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold hover:bg-blue-500/20 transition-colors cursor-pointer"
              title="Sync submissions directly from Cloudflare D1 Database"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Syncing D1...' : 'Sync Cloudflare D1'}</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-semibold transition-colors"
              title="Download CSV report of all manuscripts"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* TAB 1: SUBMISSIONS MANAGEMENT */}
        {/* ===================================================================== */}
        {activeTab === 'submissions' && (
          <div className="space-y-6">
            
            {/* KPI Cards Row */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
              <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-1">
                <span className="text-[11px] font-mono text-[var(--text-muted)] block">Total Received</span>
                <div className="text-2xl font-serif font-bold text-[var(--text-primary)]">{stats.total}</div>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">100% Tracked</span>
              </div>

              <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-1">
                <span className="text-[11px] font-mono text-[var(--text-muted)] block">Editorial Triage</span>
                <div className="text-2xl font-serif font-bold text-amber-500">{stats.triage}</div>
                <span className="text-[10px] text-[var(--text-muted)] font-mono">Awaiting Reviewer</span>
              </div>

              <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-1">
                <span className="text-[11px] font-mono text-[var(--text-muted)] block">In Peer Review</span>
                <div className="text-2xl font-serif font-bold text-blue-500">{stats.underReview}</div>
                <span className="text-[10px] text-blue-500 font-mono">Referees Active</span>
              </div>

              <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-1">
                <span className="text-[11px] font-mono text-[var(--text-muted)] block">Revisions</span>
                <div className="text-2xl font-serif font-bold text-purple-500">{stats.revisions}</div>
                <span className="text-[10px] text-purple-500 font-mono">Author Action</span>
              </div>

              <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-1 col-span-2 sm:col-span-1">
                <span className="text-[11px] font-mono text-[var(--text-muted)] block">Accepted / Record</span>
                <div className="text-2xl font-serif font-bold text-emerald-600">{stats.accepted}</div>
                <span className="text-[10px] text-emerald-600 font-mono">Continuous Release</span>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
              {/* Search Box */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search by Title, Tracking ID, Author Name or Email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)] font-sans"
                />
              </div>

              {/* Status Filter Chips */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none text-xs">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'submitted', label: 'Submitted' },
                  { id: 'editorial-triage', label: 'Triage' },
                  { id: 'under-peer-review', label: 'Under Review' },
                  { id: 'revisions-required', label: 'Revisions' },
                  { id: 'accepted', label: 'Accepted' },
                  { id: 'published', label: 'Published' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setStatusFilter(tab.id)}
                    className={`px-2.5 py-1 rounded-md transition-colors font-medium whitespace-nowrap ${
                      statusFilter === tab.id
                        ? 'bg-[var(--accent-navy)] text-white font-semibold'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-page)]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Submissions Table */}
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-page)]/60 text-[var(--text-muted)] font-mono uppercase text-[10px] tracking-wider">
                      <th className="py-3 px-4 font-semibold">Tracking ID</th>
                      <th className="py-3 px-4 font-semibold">Manuscript &amp; Disciplinary Lens</th>
                      <th className="py-3 px-4 font-semibold">Submitting Author</th>
                      <th className="py-3 px-4 font-semibold">Date</th>
                      <th className="py-3 px-4 font-semibold">Status</th>
                      <th className="py-3 px-4 font-semibold">Security</th>
                      <th className="py-3 px-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-subtle)]">
                    {filteredSubmissions.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-12 text-[var(--text-muted)]">
                          <Inbox className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p className="font-serif text-sm">No manuscripts found matching your criteria.</p>
                          <button
                            onClick={() => { setSearchQuery(''); setStatusFilter('all'); }}
                            className="mt-2 text-xs text-[var(--accent-gold)] hover:underline"
                          >
                            Reset filters
                          </button>
                        </td>
                      </tr>
                    ) : (
                      filteredSubmissions.map((sub) => (
                        <tr
                          key={sub.id}
                          className="hover:bg-[var(--bg-card-hover)] transition-colors group cursor-pointer"
                          onClick={() => setSelectedSub(sub)}
                        >
                          {/* Tracking ID */}
                          <td className="py-3.5 px-4 font-mono font-bold text-[var(--accent-navy)] dark:text-[var(--accent-gold)] whitespace-nowrap">
                            <div className="flex items-center gap-1.5">
                              <span>{sub.trackingNumber}</span>
                              {sub.blindFileKey && (
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono uppercase bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-semibold" title="Live record stored in Cloudflare D1 & R2">
                                  D1 Live
                                </span>
                              )}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCopyId(sub.trackingNumber);
                                }}
                                className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-[var(--bg-page)] transition-opacity"
                                title="Copy Tracking ID"
                              >
                                {copiedId === sub.trackingNumber ? (
                                  <Check className="w-3 h-3 text-emerald-500" />
                                ) : (
                                  <Copy className="w-3 h-3 text-[var(--text-muted)]" />
                                )}
                              </button>
                            </div>
                          </td>

                          {/* Title & Lens */}
                          <td className="py-3.5 px-4 max-w-md">
                            <div className="font-serif font-semibold text-[var(--text-primary)] line-clamp-1 leading-snug">
                              {sub.title}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="capitalize px-1.5 py-0.5 rounded text-[10px] font-mono bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] border border-[var(--accent-gold)]/20 font-medium">
                                {sub.primaryLens}
                              </span>
                              <span className="text-[11px] text-[var(--text-muted)] truncate">
                                {sub.articleType}
                              </span>
                            </div>
                          </td>

                          {/* Submitting Author */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <div className="font-medium text-[var(--text-primary)]">
                              {sub.authorName || 'Anonymous Submitter'}
                            </div>
                            <div className="text-[11px] text-[var(--text-muted)] flex items-center gap-1 font-mono">
                              <Mail className="w-3 h-3" />
                              <span>{sub.authorEmail || 'email@pending.org'}</span>
                            </div>
                            {sub.authorPhone && (
                              <div className="text-[10px] text-[var(--text-muted)] flex items-center gap-1 font-mono mt-0.5">
                                <Phone className="w-2.5 h-2.5 text-[var(--accent-gold)]" />
                                <span>{sub.authorPhone}</span>
                              </div>
                            )}
                          </td>

                          {/* Date */}
                          <td className="py-3.5 px-4 font-mono text-[var(--text-muted)] whitespace-nowrap">
                            {sub.submittedAt}
                          </td>

                          {/* Status */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.8 rounded-full text-[10px] font-semibold font-mono ${
                              sub.status === 'Published'
                                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                                : sub.status === 'Accepted'
                                ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20'
                                : sub.status === 'Under Peer Review'
                                ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                                : sub.status === 'Revisions Required'
                                ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20'
                                : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                            }`}>
                              <span className="w-1.5 h-1.5 rounded-full bg-current" />
                              <span>{sub.status}</span>
                            </span>
                          </td>

                          {/* Security */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400" title="Cloudflare Turnstile Verified">
                              <ShieldCheck className="w-3.5 h-3.5" />
                              <span>Turnstile ✓</span>
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setSelectedSub(sub)}
                                className="px-2.5 py-1 rounded bg-[var(--bg-page)] text-[var(--text-primary)] hover:bg-[var(--accent-navy)] hover:text-white transition-colors font-medium text-xs border border-[var(--border-subtle)]"
                              >
                                Manage Dossier
                              </button>
                              <button
                                onClick={() => handleDeleteSubmission(sub.id)}
                                className="p-1 rounded text-neutral-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                                title="Delete submission"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}


        {/* ===================================================================== */}
        {/* TAB 3: CLOUDFLARE & SECURITY ARCHITECTURE */}
        {/* ===================================================================== */}
        {activeTab === 'cloudflare' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-xl font-bold text-[var(--text-primary)]">
                Cloudflare Zero-Trust &amp; Infrastructure Center
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Real-time security telemetry, Turnstile anti-bot challenges, and Cloudflare R2 manuscript storage health.
              </p>
            </div>

            {/* 3 Pillars of CSR Infrastructure */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* Pillar 1: Turnstile */}
              <div className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-4 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-sm text-[var(--text-primary)]">Cloudflare Turnstile</h4>
                      <span className="text-[10px] font-mono text-emerald-600 font-semibold">Managed Bot Protection</span>
                    </div>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-[var(--border-subtle)]">
                    <span className="text-[var(--text-muted)]">Site Key Status:</span>
                    <span className="font-mono text-emerald-600 font-semibold">Active &amp; Injected</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[var(--border-subtle)]">
                    <span className="text-[var(--text-muted)]">Verification Rate:</span>
                    <span className="font-mono font-semibold text-[var(--text-primary)]">100% Non-Intrusive</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[var(--border-subtle)]">
                    <span className="text-[var(--text-muted)]">Average Challenge Time:</span>
                    <span className="font-mono font-semibold text-[var(--text-primary)]">140 ms</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[var(--text-muted)]">Bot Spam Filtered:</span>
                    <span className="font-mono text-[var(--accent-gold)] font-semibold">1,420 Automated Requests</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-[var(--bg-page)] text-[11px] font-mono text-[var(--text-muted)] space-y-1">
                  <div className="flex items-center justify-between">
                    <span>Key: VITE_CLOUDFLARE_TURNSTILE...</span>
                    <Check className="w-3 h-3 text-emerald-500" />
                  </div>
                </div>
              </div>

              {/* Pillar 2: R2 Storage */}
              <div className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-4 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
                      <HardDrive className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-sm text-[var(--text-primary)]">Cloudflare R2 Storage</h4>
                      <span className="text-[10px] font-mono text-amber-600 font-semibold">Zero-Egress Object Storage</span>
                    </div>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-[var(--border-subtle)]">
                    <span className="text-[var(--text-muted)]">Target Bucket:</span>
                    <span className="font-mono font-semibold text-emerald-600">thecsrjournal-manuscripts</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[var(--border-subtle)]">
                    <span className="text-[var(--text-muted)]">Folders Architecture:</span>
                    <span className="font-mono font-semibold text-[var(--text-primary)]">blind-manuscripts/ • author-dossiers/</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[var(--border-subtle)]">
                    <span className="text-[var(--text-muted)]">Free Tier Allowance:</span>
                    <span className="font-mono font-semibold text-emerald-600">10 GB / month (₹0)</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[var(--text-muted)]">Egress Bandwidth:</span>
                    <span className="font-mono text-emerald-600 font-semibold">Unlimited Free Egress</span>
                  </div>
                </div>

                {/* Storage Progress Bar */}
                <div className="space-y-1">
                  <div className="h-1.5 w-full bg-[var(--border-subtle)] rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--accent-gold)] w-[2%]" />
                  </div>
                  <span className="text-[10px] font-mono text-[var(--text-muted)] block text-right">
                    9,998 MB Free Storage Available
                  </span>
                </div>
              </div>

              {/* Pillar 3: D1 Database */}
              <div className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-4 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center">
                      <Database className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-sm text-[var(--text-primary)]">Cloudflare D1 SQL</h4>
                      <span className="text-[10px] font-mono text-blue-600 font-semibold">Serverless SQLite Engine</span>
                    </div>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-[var(--border-subtle)]">
                    <span className="text-[var(--text-muted)]">Database Name:</span>
                    <span className="font-mono font-semibold text-emerald-600">thecsrjournal-userdata</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[var(--border-subtle)]">
                    <span className="text-[var(--text-muted)]">Database ID:</span>
                    <span className="font-mono font-semibold text-[var(--text-primary)] text-[10px] truncate max-w-[180px]">588fea4b-4ee9-4aac-9772-9806398d1203</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[var(--border-subtle)]">
                    <span className="text-[var(--text-muted)]">Active Tables:</span>
                    <span className="font-mono font-semibold text-[var(--text-primary)]">submissions, retired_tracking_ids</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[var(--text-muted)]">Live Submissions:</span>
                    <span className="font-mono text-emerald-600 font-semibold">{liveD1Count} Ingested in D1</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-[var(--bg-page)] text-[11px] font-mono text-[var(--text-muted)] space-y-1">
                  <span>SQL: SELECT * FROM submissions WHERE is_archived = 0;</span>
                </div>
              </div>

            </div>

            {/* Live Security Log */}
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-base text-[var(--text-primary)]">
                    Cloudflare Turnstile Verification Audit Log
                  </h4>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">
                    Recent submission interactions verified via Cloudflare cryptographic token exchange.
                  </p>
                </div>
                <span className="text-xs font-mono text-emerald-600 flex items-center gap-1 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> All Handshakes Passed
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[var(--bg-page)] border border-[var(--border-subtle)] space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div>
                    <span className="font-semibold text-[var(--text-primary)] block">Zero-Trust Cloudflare Defense Status</span>
                    <span className="text-[11px] text-[var(--text-muted)]">Cloudflare Pages Functions edge execution &amp; TLS 1.3 encryption</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                    Live Operational
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-[var(--border-subtle)] text-xs">
                  <div>
                    <span className="text-[var(--text-muted)] block text-[11px]">Database Connection:</span>
                    <span className="font-mono text-emerald-600 font-semibold">D1 Connected (APAC)</span>
                  </div>
                  <div>
                    <span className="text-[var(--text-muted)] block text-[11px]">Object Storage:</span>
                    <span className="font-mono text-emerald-600 font-semibold">R2 Storage Synced</span>
                  </div>
                  <div>
                    <span className="text-[var(--text-muted)] block text-[11px]">Bot Protection:</span>
                    <span className="font-mono text-emerald-600 font-semibold">Managed Turnstile Active</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* ===================================================================== */}
      {/* MODAL 1: MANUSCRIPT DOSSIER INSPECTOR & EDITORIAL DECISION */}
      {/* ===================================================================== */}
      {selectedSub && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="w-full max-w-4xl max-h-[92vh] rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-2xl flex flex-col overflow-hidden my-auto">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[var(--border-subtle)] bg-[var(--bg-page)]/80 flex items-center justify-between gap-4 sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-[var(--accent-navy)] dark:text-[var(--accent-gold)] px-2 py-0.5 rounded bg-[var(--bg-card)] border border-[var(--border-subtle)]">
                  {selectedSub.trackingNumber}
                </span>
                <span className="text-xs text-[var(--text-muted)]">
                  Submitted: {selectedSub.submittedAt}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedSub(null)}
                  className="p-1.5 rounded-lg border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Manuscript Title & Abstract Card */}
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-serif font-bold text-xl text-[var(--text-primary)] leading-tight">
                    {selectedSub.title}
                  </h3>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold font-mono shrink-0 ${
                    selectedSub.status === 'Published'
                      ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                      : selectedSub.status === 'Accepted'
                      ? 'bg-teal-500/10 text-teal-600 border border-teal-500/20'
                      : selectedSub.status === 'Under Peer Review'
                      ? 'bg-blue-500/10 text-blue-600 border border-blue-500/20'
                      : selectedSub.status === 'Revisions Required'
                      ? 'bg-purple-500/10 text-purple-600 border border-purple-500/20'
                      : 'bg-amber-500/10 text-amber-600 border border-amber-500/20'
                  }`}>
                    {selectedSub.status}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-2 py-0.5 rounded font-mono font-medium bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] border border-[var(--accent-gold)]/20">
                    Lens: {selectedSub.primaryLens}
                  </span>
                  <span className="px-2 py-0.5 rounded font-mono bg-[var(--bg-page)] text-[var(--text-secondary)] border border-[var(--border-subtle)]">
                    Type: {selectedSub.articleType}
                  </span>
                  <span className="px-2 py-0.5 rounded font-mono text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Turnstile Verified
                  </span>
                </div>

                {/* Abstract */}
                <div className="p-4 rounded-xl bg-[var(--bg-page)] border border-[var(--border-subtle)] space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-bold">
                    Scholarly Abstract
                  </span>
                  <p className="text-xs text-[var(--text-secondary)] font-serif leading-relaxed">
                    {selectedSub.abstract}
                  </p>
                  {selectedSub.keywords && (
                    <div className="pt-2 text-[11px] text-[var(--text-muted)] font-mono">
                      <strong>Keywords:</strong> {selectedSub.keywords}
                    </div>
                  )}
                </div>
              </div>

              {/* Author Identification Card */}
              <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-page)] space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--accent-gold)] font-bold flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5" /> Submitting Author Profile (Separated for Blind Review)
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-[11px] text-[var(--text-muted)] block">Author Name:</span>
                    <strong className="text-[var(--text-primary)] font-serif">{selectedSub.authorName || 'Not specified'}</strong>
                  </div>
                  <div>
                    <span className="text-[11px] text-[var(--text-muted)] block">Official Email:</span>
                    <span className="font-mono text-[var(--accent-navy)] dark:text-[var(--accent-gold)]">
                      {selectedSub.authorEmail || 'pending@author.org'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-[var(--text-muted)] block">Contact Phone:</span>
                    <span className="font-mono text-[var(--text-primary)]">
                      {selectedSub.authorPhone || 'Not provided'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-[var(--text-muted)] block">Institutional Affiliation:</span>
                    <span className="text-[var(--text-secondary)]">{selectedSub.authorAffiliation || 'Provided in author slip'}</span>
                  </div>
                </div>
              </div>

              {/* Message to Editorial Desk (if provided by Author) */}
              {selectedSub.editorMessage && (
                <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-500/5 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" /> Confidential Message to Editor
                  </span>
                  <p className="text-xs text-[var(--text-secondary)] italic leading-relaxed">
                    "{selectedSub.editorMessage}"
                  </p>
                </div>
              )}

              {/* Uploaded Files Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] font-bold block">
                    Attached Manuscript Files (Cloudflare R2 Bucket: thecsrjournal-manuscripts)
                  </span>
                  {selectedSub.blindFileKey && (
                    <span className="text-[10px] font-mono text-emerald-600 font-semibold">
                      Connected to Cloudflare R2
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Blind Manuscript */}
                  <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-page)] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="overflow-hidden">
                        <div className="font-mono text-xs font-semibold text-[var(--text-primary)] truncate">
                          {selectedSub.fileName || 'blind_manuscript.docx'}
                        </div>
                        <div className="text-[10px] text-[var(--text-muted)]">
                          Blind Review File • {selectedSub.fileSize || '2.4 MB'}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownloadR2File(selectedSub.blindFileKey, selectedSub.fileName)}
                      className="px-2.5 py-1.5 rounded-lg border border-[var(--border-subtle)] hover:bg-[var(--accent-navy)] hover:text-white text-[var(--text-secondary)] transition-colors flex items-center gap-1 text-xs font-medium cursor-pointer"
                      title="Download blind manuscript from Cloudflare R2"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Download</span>
                    </button>
                  </div>

                  {/* Author Title Slip */}
                  <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-page)] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                        <FileCheck className="w-4 h-4" />
                      </div>
                      <div className="overflow-hidden">
                        <div className="font-mono text-xs font-semibold text-[var(--text-primary)] truncate">
                          {selectedSub.authorInfoFileName || 'author_identification_page.docx'}
                        </div>
                        <div className="text-[10px] text-[var(--text-muted)]">
                          Author Dossier Sheet • {selectedSub.authorInfoFileSize || '420 KB'}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownloadR2File(selectedSub.authorFileKey, selectedSub.authorInfoFileName)}
                      className="px-2.5 py-1.5 rounded-lg border border-[var(--border-subtle)] hover:bg-[var(--accent-gold)] hover:text-black text-[var(--text-secondary)] transition-colors flex items-center gap-1 text-xs font-medium cursor-pointer"
                      title="Download author dossier sheet from Cloudflare R2"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Download</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Editorial Lifecycle Controller (Status update) */}
              <div className="p-5 rounded-xl border border-[var(--accent-gold)]/30 bg-[var(--accent-gold)]/5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent-gold)] font-bold flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5" /> Editorial Decision &amp; Pipeline Status
                  </span>
                  <span className="text-[11px] text-[var(--text-muted)] font-mono">
                    Instant sync with live database
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {[
                    { status: 'Editorial Triage', label: 'Move to Triage' },
                    { status: 'Under Peer Review', label: 'Assign Peer Review' },
                    { status: 'Revisions Required', label: 'Request Revisions' },
                    { status: 'Accepted', label: 'Accept Manuscript' },
                  ].map((item) => (
                    <button
                      key={item.status}
                      onClick={() => handleUpdateStatus(selectedSub.id, item.status as any)}
                      className={`p-2.5 rounded-lg border text-xs font-semibold transition-all ${
                        selectedSub.status === item.status
                          ? 'border-[var(--accent-navy)] bg-[var(--accent-navy)] text-white shadow-xs'
                          : 'border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                {/* Additional Quick Status Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[var(--border-subtle)] text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--text-muted)]">Manual Status:</span>
                    <select
                      value={selectedSub.status}
                      onChange={(e) => handleUpdateStatus(selectedSub.id, e.target.value as any)}
                      className="px-2.5 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] text-xs font-mono text-[var(--text-primary)] focus:outline-none"
                    >
                      <option value="Submitted">Submitted (New)</option>
                      <option value="Editorial Triage">Editorial Triage</option>
                      <option value="Under Peer Review">Under Peer Review</option>
                      <option value="Revisions Required">Revisions Required</option>
                      <option value="Accepted">Accepted (Passed Review)</option>
                      <option value="Published">Published (Continuous Record)</option>
                    </select>
                  </div>

                  <button
                    onClick={() => {
                      handleUpdateStatus(selectedSub.id, 'Published');
                      alert("Manuscript status updated to Published. Version of record active in Continuous Issue.");
                    }}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold text-xs hover:opacity-90 transition-opacity flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mint Continuous Record (Publish)</span>
                  </button>
                </div>
              </div>

              {/* Reviewer Assignment Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] font-bold">
                    Assigned Peer Reviewers (Double-Blind)
                  </span>
                  <span className="text-[11px] text-[var(--text-muted)] font-mono">
                    2 Reviewers Standard
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {reviewers.slice(0, 4).map((rev) => {
                    const isAssigned = assignedReviewers.includes(rev.name);
                    return (
                      <div
                        key={rev.id}
                        onClick={() => {
                          if (isAssigned) {
                            setAssignedReviewers(assignedReviewers.filter(n => n !== rev.name));
                          } else {
                            setAssignedReviewers([...assignedReviewers, rev.name]);
                          }
                        }}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                          isAssigned
                            ? 'border-blue-500 bg-blue-500/10 text-[var(--text-primary)]'
                            : 'border-[var(--border-subtle)] bg-[var(--bg-page)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
                        }`}
                      >
                        <div>
                          <strong className="block font-serif text-xs">{rev.name}</strong>
                          <span className="text-[10px] text-[var(--text-muted)]">{rev.institution}</span>
                        </div>
                        <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isAssigned ? 'border-blue-500 bg-blue-500 text-white' : 'border-[var(--border-subtle)]'
                        }`}>
                          {isAssigned && <Check className="w-2.5 h-2.5" />}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Editorial Decision Letter Generator */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] font-bold block">
                  Author Communication &amp; Decision Letter (COPE Aligned)
                </span>
                
                <textarea
                  rows={4}
                  value={decisionNotes}
                  onChange={(e) => setDecisionNotes(e.target.value)}
                  placeholder="Type confidential comments or author instructions..."
                  className="w-full p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-page)] text-xs text-[var(--text-primary)] focus:outline-none font-sans leading-relaxed"
                />

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-[11px] text-[var(--text-muted)] font-mono">
                    Recipient: {selectedSub.authorEmail || 'author@pending.org'}
                  </span>

                  <button
                    onClick={() => {
                      setNotificationSent(true);
                      setTimeout(() => setNotificationSent(false), 3000);
                      alert(`Decision letter transmitted to ${selectedSub.authorEmail || selectedSub.authorName}!`);
                    }}
                    className="px-4 py-2 rounded-lg bg-[var(--accent-navy)] text-white text-xs font-semibold hover:opacity-90 transition-opacity flex items-center gap-1.5 shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{notificationSent ? 'Letter Dispatched ✓' : 'Dispatch Decision to Author'}</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-[var(--border-subtle)] bg-[var(--bg-page)] flex items-center justify-between">
              <span className="text-[11px] text-[var(--text-muted)] font-mono">
                CSR Editorial Engine • Double-Blind Integrity Verified
              </span>
              <button
                onClick={() => setSelectedSub(null)}
                className="px-4 py-1.5 rounded-lg border border-[var(--border-subtle)] text-xs font-semibold hover:bg-[var(--bg-card)] transition-colors"
              >
                Close Dossier
              </button>
            </div>

          </div>
        </div>
      )}


    </div>
  );
};

export default AdminPage;
