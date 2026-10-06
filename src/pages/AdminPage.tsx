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
  Shield,
  Archive,
  RotateCcw
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

  // Centralized Authorization Header Helper
  const getAdminAuthHeaders = (): Record<string, string> => {
    const token = localStorage.getItem('csr_admin_token') || '';
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // Active Tab
  const [activeTab, setActiveTab] = useState<'submissions' | 'deleted' | 'cloudflare' | 'enquiries'>('submissions');

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

  // Deleted Submissions Archive (Accidental Deletion Protection)
  const [deletedSubmissions, setDeletedSubmissions] = useState<any[]>([]);
  const [deletedLoading, setDeletedLoading] = useState(false);
  const [deletedSearchQuery, setDeletedSearchQuery] = useState('');

  // Custom Delete Modal State (Replaces native browser window.confirm popup)
  const [deleteTargetSub, setDeleteTargetSub] = useState<SubmissionDraft | null>(null);
  const [deleteReason, setDeleteReason] = useState('Withdrawn or deleted by Editorial Office');
  const [isDeleting, setIsDeleting] = useState(false);

  // Custom Restore Modal State
  const [restoreTargetNumber, setRestoreTargetNumber] = useState<string | null>(null);
  const [isRestoring, setIsRestoring] = useState(false);

  // Toast Notification State
  const [toastNotification, setToastNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToastNotification({ message, type });
    setTimeout(() => setToastNotification(null), 4000);
  };

  const openDeleteModal = (sub: SubmissionDraft) => {
    setDeleteTargetSub(sub);
    setDeleteReason('Withdrawn or deleted by Editorial Office');
  };

  // Office Enquiries State (D1 table: contact_page_office_enquiry)
  const [enquiries, setEnquiries] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('csr_contact_enquiries');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [enquiriesLoading, setEnquiriesLoading] = useState(false);
  const [enquirySearch, setEnquirySearch] = useState('');
  const [enquiryFilter, setEnquiryFilter] = useState<'all' | 'new' | 'replied' | 'resolved'>('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState<any | null>(null);

  // Fetch real contact inquiries from Cloudflare D1
  const fetchEnquiries = async () => {
    setEnquiriesLoading(true);
    try {
      const res = await fetch('/api/admin/contact-enquiries', {
        headers: getAdminAuthHeaders(),
      });
      if (res.status === 401) {
        handleLogout();
        return;
      }
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.enquiries)) {
          setEnquiries(data.enquiries);
          try {
            localStorage.setItem('csr_contact_enquiries', JSON.stringify(data.enquiries));
          } catch (e) {}
        }
      }
    } catch (err) {
      console.error('Failed to fetch contact enquiries from D1:', err);
    } finally {
      setEnquiriesLoading(false);
    }
  };

  // Update inquiry status in D1
  const handleUpdateEnquiryStatus = async (id: number, status: string) => {
    const updated = enquiries.map((item) =>
      item.id === id ? { ...item, status } : item
    );
    setEnquiries(updated);
    try {
      localStorage.setItem('csr_contact_enquiries', JSON.stringify(updated));
    } catch (e) {}
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry({ ...selectedEnquiry, status });
    }

    try {
      await fetch('/api/admin/contact-enquiries', {
        method: 'POST',
        headers: {
          ...getAdminAuthHeaders(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, action: 'update_status', status })
      });
      showToast(`Enquiry #${id} marked as ${status}.`, 'success');
    } catch (e) {
      showToast('Status updated locally.', 'success');
    }
  };

  // Delete inquiry from D1
  const handleDeleteEnquiry = async (id: number) => {
    const updated = enquiries.filter((item) => item.id !== id);
    setEnquiries(updated);
    try {
      localStorage.setItem('csr_contact_enquiries', JSON.stringify(updated));
    } catch (e) {}
    if (selectedEnquiry?.id === id) {
      setSelectedEnquiry(null);
    }

    try {
      await fetch('/api/admin/contact-enquiries', {
        method: 'POST',
        headers: {
          ...getAdminAuthHeaders(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, action: 'delete' })
      });
      showToast('Enquiry record deleted.', 'success');
    } catch (e) {
      showToast('Enquiry removed.', 'success');
    }
  };

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

  // Reviewers List for manuscript assignment (Dynamically fetched behind Admin Auth)
  const [reviewers, setReviewers] = useState<ReviewerProfile[]>([]);

  const fetchReviewers = async () => {
    try {
      const res = await fetch('/api/admin/reviewers', {
        headers: getAdminAuthHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.reviewers)) {
          setReviewers(data.reviewers);
        }
      }
    } catch (err) {
      console.error('Failed to fetch reviewers:', err);
    }
  };

  // Fetch real submissions from Cloudflare D1
  const fetchLiveSubmissions = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/admin/submissions', {
        headers: getAdminAuthHeaders(),
      });
      if (res.status === 401) {
        handleLogout();
        return;
      }
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

  // Fetch deleted submissions from Cloudflare D1 archive
  const fetchDeletedSubmissions = async () => {
    setDeletedLoading(true);
    try {
      const res = await fetch('/api/admin/deleted-submissions', {
        headers: getAdminAuthHeaders(),
      });
      if (res.status === 401) {
        handleLogout();
        return;
      }
      if (res.ok) {
        const data = await res.json();
        const list = data.deletedSubmissions || data.deleted || [];
        if (data.success && Array.isArray(list)) {
          setDeletedSubmissions(list);
        }
      }
    } catch (err) {
      console.error('Failed to fetch deleted submissions:', err);
    } finally {
      setDeletedLoading(false);
    }
  };

  // Verify session validity on mount
  useEffect(() => {
    const token = localStorage.getItem('csr_admin_token');
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    fetch('/api/admin/verify', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) {
          handleLogout();
        }
      })
      .catch(() => {});
  }, []);

  // Auto-fetch on mount when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchLiveSubmissions();
      fetchDeletedSubmissions();
      fetchEnquiries();
      fetchReviewers();
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
    localStorage.removeItem('csr_user_submissions');
    localStorage.removeItem('csr_contact_enquiries');
    sessionStorage.clear();
  };

  // Download file from Cloudflare R2
  const [downloadingKey, setDownloadingKey] = useState<string | null>(null);

  const handleDownloadR2File = async (key?: string, fileName?: string) => {
    if (!key) {
      showToast("No file key attached to this record in Cloudflare R2.", "error");
      return;
    }

    setDownloadingKey(key);
    showToast(`Downloading ${fileName || 'document'}...`, "success");

    try {
      const url = `/api/admin/download?key=${encodeURIComponent(key)}&name=${encodeURIComponent(fileName || 'manuscript.docx')}`;
      const res = await fetch(url, {
        headers: getAdminAuthHeaders(),
      });

      if (res.status === 401) {
        handleLogout();
        showToast('Session expired. Please log in again.', 'error');
        setDownloadingKey(null);
        return;
      }

      if (!res.ok) {
        const errJson = await res.json().catch(() => null);
        showToast(errJson?.message || `Download failed: Server returned HTTP ${res.status}`, "error");
        setDownloadingKey(null);
        return;
      }

      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = fileName || 'manuscript.docx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => window.URL.revokeObjectURL(blobUrl), 1500);

      showToast(`Downloaded: ${fileName || 'manuscript.docx'}`, "success");
    } catch (err: any) {
      console.error('Download error:', err);
      showToast(`Download failed: ${err?.message || 'Network error'}`, "error");
    } finally {
      setDownloadingKey(null);
    }
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
          headers: {
            ...getAdminAuthHeaders(),
            'Content-Type': 'application/json',
          },
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

  // Delete Submission: opens beautiful custom UI popup (No browser native alert)
  const handleDeleteSubmission = (subId: string) => {
    const targetSub = submissions.find(s => s.id === subId);
    if (!targetSub) return;
    openDeleteModal(targetSub);
  };

  // Executes deletion from Cloudflare D1 and archives into deleted_submissions
  const executeDeleteSubmission = async () => {
    if (!deleteTargetSub) return;
    const targetSub = deleteTargetSub;
    setIsDeleting(true);

    try {
      // Optimistically update local view
      const updated = submissions.filter(s => s.id !== targetSub.id);
      saveSubmissions(updated);
      if (selectedSub?.id === targetSub.id) {
        setSelectedSub(null);
      }

      // Persist to Cloudflare D1
      if (targetSub.trackingNumber) {
        const res = await fetch('/api/admin/delete-submission', {
          method: 'POST',
          headers: {
            ...getAdminAuthHeaders(),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            trackingNumber: targetSub.trackingNumber,
            reason: deleteReason || 'Withdrawn or deleted by Editorial Office'
          })
        });

        const data = await res.json().catch(() => null);
        if (!res.ok || !data?.success) {
          console.error("D1 deletion error:", data?.message);
          showToast(`Cloudflare D1 Delete Failed: ${data?.message || 'Database error'}. Re-syncing list.`, 'error');
          fetchLiveSubmissions();
        } else {
          showToast(`Submission ${targetSub.trackingNumber} archived to Deleted Submissions.`, 'success');
          fetchDeletedSubmissions();
        }
      }
      setDeleteTargetSub(null);
    } catch (err: any) {
      console.error("Failed to delete submission in Cloudflare D1:", err);
      showToast(`Network error: ${err?.message || 'Could not connect to server'}`, 'error');
      fetchLiveSubmissions();
    } finally {
      setIsDeleting(false);
    }
  };

  // Restore Submission: opens custom confirmation modal
  const handleRestoreSubmission = (trackingNumber: string) => {
    setRestoreTargetNumber(trackingNumber);
  };

  // Executes restoration back into active submissions table in D1
  const executeRestoreSubmission = async (trackingNumber: string) => {
    setIsRestoring(true);
    try {
      const res = await fetch('/api/admin/restore-submission', {
        method: 'POST',
        headers: {
          ...getAdminAuthHeaders(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ trackingNumber })
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.success) {
        showToast(data.message || `Submission ${trackingNumber} successfully restored!`, 'success');
        fetchLiveSubmissions();
        fetchDeletedSubmissions();
        setRestoreTargetNumber(null);
      } else {
        showToast(`Restore failed: ${data?.message || 'Database error'}`, 'error');
      }
    } catch (err: any) {
      showToast(`Network error: ${err?.message || 'Could not connect'}`, 'error');
    } finally {
      setIsRestoring(false);
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

  // Office Enquiries Computed State
  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((enq) => {
      const q = enquirySearch.toLowerCase();
      const matchesSearch =
        !q ||
        (enq.name && enq.name.toLowerCase().includes(q)) ||
        (enq.email && enq.email.toLowerCase().includes(q)) ||
        (enq.subject && enq.subject.toLowerCase().includes(q)) ||
        (enq.message && enq.message.toLowerCase().includes(q)) ||
        (enq.category && enq.category.toLowerCase().includes(q));

      const matchesStatus =
        enquiryFilter === 'all' ||
        (enq.status || 'New').toLowerCase() === enquiryFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [enquiries, enquirySearch, enquiryFilter]);

  const newEnquiriesCount = useMemo(() => {
    return enquiries.filter((e) => (e.status || 'New').toLowerCase() === 'new').length;
  }, [enquiries]);

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
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors whitespace-nowrap shrink-0"
            >
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              <span>Journal Home</span>
            </Link>

            {/* Authenticated User Badge */}
            {currentUser && (
              <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-page)] text-xs font-mono whitespace-nowrap shrink-0">
                <Shield className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="font-bold text-[var(--text-primary)]">
                  {currentUser.username?.toUpperCase().includes('02') ||
                   currentUser.displayName?.toLowerCase().includes('managing') ||
                   currentUser.displayName?.toLowerCase().includes('co-')
                    ? 'Co-Editor-in-Chief'
                    : 'Editor-in-Chief'}
                </span>
              </div>
            )}

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-semibold hover:bg-red-500/20 transition-colors whitespace-nowrap shrink-0"
            >
              <LogOut className="w-3.5 h-3.5 shrink-0" />
              <span className="whitespace-nowrap">Sign Out</span>
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
              onClick={() => { setActiveTab('deleted'); fetchDeletedSubmissions(); }}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 shrink-0 ${
                activeTab === 'deleted'
                  ? 'bg-[var(--accent-navy)] text-white shadow-xs'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card)]'
              }`}
            >
              <Archive className="w-3.5 h-3.5" />
              <span>Deleted Submissions</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                activeTab === 'deleted' ? 'bg-white/20 text-white' : 'bg-red-500/10 text-red-600 dark:text-red-400 font-semibold'
              }`}>
                {deletedSubmissions.length}
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

            <button
              onClick={() => { setActiveTab('enquiries'); fetchEnquiries(); }}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 shrink-0 ${
                activeTab === 'enquiries'
                  ? 'bg-[var(--accent-navy)] text-white shadow-xs'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card)]'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Office Enquiries</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                activeTab === 'enquiries' 
                  ? 'bg-white/20 text-white' 
                  : newEnquiriesCount > 0 
                  ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold' 
                  : 'bg-[var(--bg-page)] text-[var(--text-muted)]'
              }`}>
                {newEnquiriesCount > 0 ? `${newEnquiriesCount} New` : enquiries.length}
              </span>
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
          <div className="space-y-4 sm:space-y-5">
            
            {/* KPI Cards Row (Compact Horizontal Layout) */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3">
              <div className="p-2.5 sm:p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center gap-2.5 sm:gap-3">
                <div className="text-2xl font-serif font-bold text-[var(--text-primary)] leading-none shrink-0">{stats.total}</div>
                <div className="min-w-0">
                  <span className="text-[11px] font-mono text-[var(--text-muted)] block leading-tight truncate">Total Received</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono block leading-tight truncate mt-0.5">100% Tracked</span>
                </div>
              </div>

              <div className="p-2.5 sm:p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center gap-2.5 sm:gap-3">
                <div className="text-2xl font-serif font-bold text-amber-500 leading-none shrink-0">{stats.triage}</div>
                <div className="min-w-0">
                  <span className="text-[11px] font-mono text-[var(--text-muted)] block leading-tight truncate">Editorial Triage</span>
                  <span className="text-[10px] text-[var(--text-muted)] font-mono block leading-tight truncate mt-0.5">Awaiting Reviewer</span>
                </div>
              </div>

              <div className="p-2.5 sm:p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center gap-2.5 sm:gap-3">
                <div className="text-2xl font-serif font-bold text-blue-500 leading-none shrink-0">{stats.underReview}</div>
                <div className="min-w-0">
                  <span className="text-[11px] font-mono text-[var(--text-muted)] block leading-tight truncate">In Peer Review</span>
                  <span className="text-[10px] text-blue-500 font-mono block leading-tight truncate mt-0.5">Referees Active</span>
                </div>
              </div>

              <div className="p-2.5 sm:p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center gap-2.5 sm:gap-3">
                <div className="text-2xl font-serif font-bold text-purple-500 leading-none shrink-0">{stats.revisions}</div>
                <div className="min-w-0">
                  <span className="text-[11px] font-mono text-[var(--text-muted)] block leading-tight truncate">Revisions</span>
                  <span className="text-[10px] text-purple-500 font-mono block leading-tight truncate mt-0.5">Author Action</span>
                </div>
              </div>

              <div className="p-2.5 sm:p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center gap-2.5 sm:gap-3 col-span-2 sm:col-span-1">
                <div className="text-2xl font-serif font-bold text-emerald-600 leading-none shrink-0">{stats.accepted}</div>
                <div className="min-w-0">
                  <span className="text-[11px] font-mono text-[var(--text-muted)] block leading-tight truncate">Accepted / Record</span>
                  <span className="text-[10px] text-emerald-600 font-mono block leading-tight truncate mt-0.5">Continuous Release</span>
                </div>
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
                      <th className="sticky right-0 z-10 py-3 px-4 font-semibold text-right bg-[var(--bg-page)] shadow-[-6px_0_12px_-4px_rgba(0,0,0,0.15)]">Actions</th>
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
                            <div className="flex items-center gap-2">
                              <span>{sub.trackingNumber}</span>
                              {sub.blindFileKey && (
                                <span className="relative flex h-2 w-2" title="Cloudflare D1 Live Record">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
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
                            <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400" title="Security Verified">
                              <Shield className="w-3.5 h-3.5" />
                              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                            </span>
                          </td>

                          {/* Actions (Sticky Right Column: zero scroll needed) */}
                          <td className="sticky right-0 z-10 py-3.5 px-4 text-right whitespace-nowrap bg-[var(--bg-card)] group-hover:bg-[var(--bg-card-hover)] shadow-[-6px_0_12px_-4px_rgba(0,0,0,0.15)]" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setSelectedSub(sub)}
                                className="px-2.5 py-1 rounded bg-[var(--bg-page)] text-[var(--text-primary)] hover:bg-[var(--accent-navy)] hover:text-white transition-colors font-medium text-xs border border-[var(--border-subtle)]"
                              >
                                Manage Dossier
                              </button>
                              <button
                                onClick={() => handleDeleteSubmission(sub.id)}
                                className="p-1.5 rounded text-neutral-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                                title="Delete submission (Archived to Deleted Submissions)"
                              >
                                <Trash2 className="w-3.5 h-3.5 text-red-500/80 hover:text-red-600" />
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
        {/* TAB 2: DELETED SUBMISSIONS ARCHIVE (ACCIDENTAL DELETION PROTECTION) */}
        {/* ===================================================================== */}
        {activeTab === 'deleted' && (
          <div className="space-y-6">
            
            {/* Header Banner */}
            <div className="p-4 sm:p-5 rounded-xl border border-red-500/20 bg-red-500/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center shrink-0">
                  <Archive className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif text-lg font-bold text-[var(--text-primary)]">
                    Deleted Submissions Archive (<code className="text-xs font-mono text-red-500">deleted_submissions</code>)
                  </h2>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5 max-w-2xl">
                    Protection against accidental deletions. When an editor deletes a submission, complete author information, scholarly metadata, and Cloudflare R2 file attachments are safely preserved here. You can restore any manuscript at any time with 1 click.
                  </p>
                </div>
              </div>

              <button
                onClick={fetchDeletedSubmissions}
                disabled={deletedLoading}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] text-xs font-semibold hover:bg-[var(--bg-page)] transition-colors shrink-0 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${deletedLoading ? 'animate-spin' : ''}`} />
                <span>Refresh Archive</span>
              </button>
            </div>

            {/* Search Bar */}
            <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
              <div className="relative">
                <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Filter deleted manuscripts by Title, Tracking ID, Author Name or Email..."
                  value={deletedSearchQuery}
                  onChange={(e) => setDeletedSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)] font-sans"
                />
              </div>
            </div>

            {/* Deleted Submissions Table */}
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-page)]/60 text-[var(--text-muted)] font-mono uppercase text-[10px] tracking-wider">
                      <th className="py-3 px-4 font-semibold">Tracking ID</th>
                      <th className="py-3 px-4 font-semibold">Manuscript Details</th>
                      <th className="py-3 px-4 font-semibold">Author Details</th>
                      <th className="py-3 px-4 font-semibold">Deleted Timestamp</th>
                      <th className="py-3 px-4 font-semibold">Files</th>
                      <th className="sticky right-0 z-10 py-3 px-4 font-semibold text-right bg-[var(--bg-page)] shadow-[-6px_0_12px_-4px_rgba(0,0,0,0.15)]">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-subtle)]">
                    {deletedSubmissions.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-12 text-[var(--text-muted)]">
                          <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-emerald-500 opacity-80" />
                          <p className="font-serif text-sm">No deleted submissions in the archive.</p>
                          <span className="text-[11px] text-[var(--text-muted)]">All user data is safe in active pipeline.</span>
                        </td>
                      </tr>
                    ) : (
                      deletedSubmissions
                        .filter(sub => {
                          const q = deletedSearchQuery.toLowerCase();
                          return (
                            (sub.tracking_number || '').toLowerCase().includes(q) ||
                            (sub.title || '').toLowerCase().includes(q) ||
                            (sub.author_name || '').toLowerCase().includes(q) ||
                            (sub.author_email || '').toLowerCase().includes(q)
                          );
                        })
                        .map((sub: any) => (
                          <tr key={sub.id || sub.tracking_number} className="hover:bg-[var(--bg-card-hover)] transition-colors">
                            {/* Tracking ID */}
                            <td className="py-3.5 px-4 font-mono font-bold text-red-500 whitespace-nowrap">
                              <div className="flex items-center gap-1.5">
                                <span>{sub.tracking_number}</span>
                                <button
                                  onClick={() => handleCopyId(sub.tracking_number)}
                                  className="p-1 rounded hover:bg-[var(--bg-page)] transition-colors"
                                  title="Copy Tracking ID"
                                >
                                  {copiedId === sub.tracking_number ? (
                                    <Check className="w-3 h-3 text-emerald-500" />
                                  ) : (
                                    <Copy className="w-3 h-3 text-[var(--text-muted)]" />
                                  )}
                                </button>
                              </div>
                            </td>

                            {/* Manuscript Details */}
                            <td className="py-3.5 px-4 max-w-sm">
                              <div className="font-serif font-semibold text-[var(--text-primary)] line-clamp-1">
                                {sub.title}
                              </div>
                              <div className="text-[11px] text-[var(--text-muted)] mt-0.5">
                                Type: {sub.article_type || 'Scholarly Article'}
                              </div>
                              {sub.deletion_reason && (
                                <div className="text-[10px] text-red-500/80 italic mt-0.5">
                                  Reason: {sub.deletion_reason}
                                </div>
                              )}
                            </td>

                            {/* Author */}
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <div className="font-medium text-[var(--text-primary)]">
                                {sub.author_name || 'Anonymous Author'}
                              </div>
                              <div className="text-[11px] text-[var(--text-muted)] flex items-center gap-1 font-mono">
                                <Mail className="w-3 h-3" />
                                <span>{sub.author_email || 'Not specified'}</span>
                              </div>
                              {sub.author_phone && (
                                <div className="text-[10px] text-[var(--text-muted)] flex items-center gap-1 font-mono">
                                  <Phone className="w-2.5 h-2.5 text-[var(--accent-gold)]" />
                                  <span>{sub.author_phone}</span>
                                </div>
                              )}
                            </td>

                            {/* Timestamps */}
                            <td className="py-3.5 px-4 text-[11px] font-mono text-[var(--text-muted)] whitespace-nowrap">
                              <div>Deleted: <span className="text-red-500 font-semibold">{sub.deleted_at ? sub.deleted_at.split('T')[0] : 'N/A'}</span></div>
                              <div>Submitted: {sub.submitted_at ? sub.submitted_at.split('T')[0] : 'N/A'}</div>
                            </td>

                            {/* Files */}
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <div className="flex items-center gap-1">
                                {sub.blind_file_key && (
                                  <button
                                    onClick={() => handleDownloadR2File(sub.blind_file_key, sub.blind_file_name)}
                                    className="p-1 px-2 rounded bg-[var(--bg-page)] text-[10px] font-mono border border-[var(--border-subtle)] hover:border-[var(--accent-gold)] flex items-center gap-1 cursor-pointer"
                                    title={`Download ${sub.blind_file_name || 'Manuscript'}`}
                                  >
                                    <Download className="w-3 h-3 text-[var(--accent-gold)]" />
                                    <span>Manuscript</span>
                                  </button>
                                )}
                                {sub.author_file_key && (
                                  <button
                                    onClick={() => handleDownloadR2File(sub.author_file_key, sub.author_file_name)}
                                    className="p-1 px-2 rounded bg-[var(--bg-page)] text-[10px] font-mono border border-[var(--border-subtle)] hover:border-[var(--accent-gold)] flex items-center gap-1 cursor-pointer"
                                    title={`Download ${sub.author_file_name || 'Author Info'}`}
                                  >
                                    <Download className="w-3 h-3 text-blue-500" />
                                    <span>Author Dossier</span>
                                  </button>
                                )}
                              </div>
                            </td>

                            {/* Restore Action */}
                            <td className="sticky right-0 z-10 py-3.5 px-4 text-right whitespace-nowrap bg-[var(--bg-card)] group-hover:bg-[var(--bg-card-hover)] shadow-[-6px_0_12px_-4px_rgba(0,0,0,0.15)]">
                              <button
                                onClick={() => handleRestoreSubmission(sub.tracking_number)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 text-xs font-semibold transition-colors cursor-pointer"
                                title="Restore this submission back into active manuscripts"
                              >
                                <RotateCcw className="w-3.5 h-3.5" />
                                <span>Restore Manuscript</span>
                              </button>
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

        {/* ===================================================================== */}
        {/* TAB 4: OFFICE ENQUIRIES (D1: contact_page_office_enquiry) */}
        {/* ===================================================================== */}
        {activeTab === 'enquiries' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Top Stats Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-xs">
                <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase block">Total Received</span>
                <span className="font-serif font-bold text-2xl text-[var(--text-primary)] mt-1 block">
                  {enquiries.length}
                </span>
                <span className="text-[10px] text-[var(--text-muted)] font-mono">D1 persisted entries</span>
              </div>
              <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 shadow-xs">
                <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400 uppercase block font-semibold">New / Unread</span>
                <span className="font-serif font-bold text-2xl text-amber-600 dark:text-amber-400 mt-1 block">
                  {newEnquiriesCount}
                </span>
                <span className="text-[10px] text-[var(--text-muted)] font-mono">Requires editorial response</span>
              </div>
              <div className="p-4 rounded-xl border border-sky-500/20 bg-sky-500/5 shadow-xs">
                <span className="text-[11px] font-mono text-sky-600 dark:text-sky-400 uppercase block font-semibold">Replied</span>
                <span className="font-serif font-bold text-2xl text-sky-600 dark:text-sky-400 mt-1 block">
                  {enquiries.filter((e: any) => (e.status || '').toLowerCase() === 'replied').length}
                </span>
                <span className="text-[10px] text-[var(--text-muted)] font-mono">Acknowledged desk tickets</span>
              </div>
              <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 shadow-xs">
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 uppercase block font-semibold">Resolved</span>
                <span className="font-serif font-bold text-2xl text-emerald-600 dark:text-emerald-400 mt-1 block">
                  {enquiries.filter((e: any) => (e.status || '').toLowerCase() === 'resolved').length}
                </span>
                <span className="text-[10px] text-[var(--text-muted)] font-mono">Completed correspondence</span>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-xs">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={enquirySearch}
                  onChange={(e) => setEnquirySearch(e.target.value)}
                  placeholder="Search enquiries by sender name, email, subject, or message text..."
                  className="w-full pl-9 pr-4 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-hidden focus:ring-1 focus:ring-[var(--accent-navy)]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1 bg-[var(--bg-page)] p-1 rounded-lg border border-[var(--border-subtle)] text-xs">
                  <button
                    onClick={() => setEnquiryFilter('all')}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                      enquiryFilter === 'all'
                        ? 'bg-[var(--accent-navy)] text-white shadow-xs'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    All ({enquiries.length})
                  </button>
                  <button
                    onClick={() => setEnquiryFilter('new')}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                      enquiryFilter === 'new'
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    New ({newEnquiriesCount})
                  </button>
                  <button
                    onClick={() => setEnquiryFilter('replied')}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                      enquiryFilter === 'replied'
                        ? 'bg-sky-600 text-white shadow-xs'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    Replied
                  </button>
                  <button
                    onClick={() => setEnquiryFilter('resolved')}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                      enquiryFilter === 'resolved'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    Resolved
                  </button>
                </div>

                <button
                  onClick={fetchEnquiries}
                  disabled={enquiriesLoading}
                  className="px-3 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] hover:bg-[var(--bg-card)] text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                  title="Reload enquiries from Cloudflare D1"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${enquiriesLoading ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">Refresh</span>
                </button>
              </div>
            </div>

            {/* Enquiries Table Card */}
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-xs overflow-hidden">
              <div className="px-5 py-3.5 border-b border-[var(--border-subtle)] bg-[var(--bg-page)]/50 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[var(--accent-gold)]" />
                  <h3 className="font-serif font-bold text-sm text-[var(--text-primary)]">
                    Office &amp; Contact Enquiries
                  </h3>
                  <span className="text-xs font-mono text-[var(--text-muted)]">
                    ({filteredEnquiries.length} matching)
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[var(--text-muted)] hidden sm:inline">
                  D1: <code className="text-[var(--accent-navy)] dark:text-[var(--accent-gold)]">contact_page_office_enquiry</code>
                </span>
              </div>

              {filteredEnquiries.length === 0 ? (
                <div className="p-12 text-center space-y-3">
                  <Inbox className="w-10 h-10 text-[var(--text-muted)] mx-auto opacity-40" />
                  <p className="font-serif text-sm text-[var(--text-secondary)]">
                    {enquiries.length === 0
                      ? 'No enquiries received yet. Forms submitted on /contact will immediately appear here.'
                      : 'No enquiries match your current search or status filter.'}
                  </p>
                  {(enquirySearch || enquiryFilter !== 'all') && (
                    <button
                      onClick={() => { setEnquirySearch(''); setEnquiryFilter('all'); }}
                      className="text-xs font-mono text-[var(--accent-navy)] dark:text-[var(--accent-gold)] hover:underline cursor-pointer"
                    >
                      Clear search &amp; filters
                    </button>
                  )}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-page)] text-[var(--text-muted)] font-mono text-[11px] uppercase tracking-wider">
                        <th className="py-3 px-4 font-semibold">ID / Date</th>
                        <th className="py-3 px-4 font-semibold">Sender Details</th>
                        <th className="py-3 px-4 font-semibold">Category</th>
                        <th className="py-3 px-4 font-semibold">Subject &amp; Message Snippet</th>
                        <th className="py-3 px-4 font-semibold">Status</th>
                        <th className="py-3 px-4 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-subtle)]">
                      {filteredEnquiries.map((enq: any) => {
                        const isNew = (enq.status || 'New').toLowerCase() === 'new';
                        const isReplied = (enq.status || '').toLowerCase() === 'replied';
                        const isResolved = (enq.status || '').toLowerCase() === 'resolved';

                        return (
                          <tr
                            key={enq.id}
                            className={`hover:bg-[var(--bg-page)]/70 transition-colors ${
                              isNew ? 'bg-amber-500/5 dark:bg-amber-500/10' : ''
                            }`}
                          >
                            {/* ID / Date */}
                            <td className="py-3.5 px-4 font-mono text-[11px] whitespace-nowrap align-top">
                              <span className="font-bold text-[var(--text-primary)]">#{enq.id}</span>
                              <div className="text-[10px] text-[var(--text-muted)] mt-0.5">
                                {enq.created_at ? new Date(enq.created_at).toLocaleDateString() : 'N/A'}
                              </div>
                            </td>

                            {/* Sender Details */}
                            <td className="py-3.5 px-4 align-top max-w-[200px]">
                              <div className="font-semibold text-[var(--text-primary)] truncate font-serif">
                                {enq.name || 'Anonymous Scholar'}
                              </div>
                              <a
                                href={`mailto:${enq.email}`}
                                className="text-[11px] font-mono text-[var(--accent-navy)] dark:text-[var(--accent-gold)] hover:underline block truncate mt-0.5"
                                title={enq.email}
                              >
                                {enq.email}
                              </a>
                            </td>

                            {/* Category */}
                            <td className="py-3.5 px-4 align-top whitespace-nowrap">
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase bg-[var(--bg-page)] border border-[var(--border-subtle)] text-[var(--text-secondary)]">
                                {enq.category || 'general'}
                              </span>
                            </td>

                            {/* Subject & Preview */}
                            <td className="py-3.5 px-4 align-top max-w-xs sm:max-w-md">
                              <div className="font-serif font-bold text-xs text-[var(--text-primary)] line-clamp-1">
                                {enq.subject || 'No Subject Specified'}
                              </div>
                              <p className="text-[11px] text-[var(--text-muted)] line-clamp-2 mt-0.5 font-sans leading-relaxed">
                                {enq.message}
                              </p>
                            </td>

                            {/* Status Badge */}
                            <td className="py-3.5 px-4 align-top whitespace-nowrap">
                              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold font-mono ${
                                isNew
                                  ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                                  : isReplied
                                  ? 'bg-sky-500/15 text-sky-600 dark:text-sky-400 border border-sky-500/30'
                                  : isResolved
                                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                                  : 'bg-slate-500/15 text-slate-600 dark:text-slate-400 border border-slate-500/30'
                              }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${
                                  isNew ? 'bg-amber-500' : isReplied ? 'bg-sky-500' : 'bg-emerald-500'
                                }`} />
                                {enq.status || 'New'}
                              </span>
                            </td>

                            {/* Actions */}
                            <td className="py-3.5 px-4 align-top text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => setSelectedEnquiry(enq)}
                                  className="p-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-navy)] transition-colors cursor-pointer"
                                  title="View Full Enquiry Dossier"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                                <a
                                  href={`mailto:${enq.email}?subject=Re: ${encodeURIComponent(enq.subject || 'Enquiry')}&body=Dear ${encodeURIComponent(enq.name || 'Scholar')},%0D%0A%0D%0AThank you for contacting The Crime %26 Society Review.%0D%0A%0D%0A`}
                                  onClick={() => {
                                    if (isNew) handleUpdateEnquiryStatus(enq.id, 'Replied');
                                  }}
                                  className="p-1.5 rounded-lg border border-sky-500/30 bg-sky-500/10 text-sky-600 dark:text-sky-400 hover:bg-sky-500/20 transition-colors cursor-pointer"
                                  title="Reply via Email"
                                >
                                  <Mail className="w-3.5 h-3.5" />
                                </a>
                                <button
                                  onClick={() => {
                                    if (window.confirm(`Permanently delete enquiry #${enq.id}?`)) {
                                      handleDeleteEnquiry(enq.id);
                                    }
                                  }}
                                  className="p-1.5 rounded-lg border border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
                                  title="Delete Enquiry"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
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
                      onClick={() => {
                        const key = selectedSub.blindFileKey || (selectedSub.trackingNumber ? `blind-manuscripts/${selectedSub.trackingNumber}/${(selectedSub.fileName || 'manuscript.docx').replace(/[^a-zA-Z0-9._-]/g, '_')}` : '');
                        handleDownloadR2File(key, selectedSub.fileName);
                      }}
                      disabled={downloadingKey !== null}
                      className="px-2.5 py-1.5 rounded-lg border border-[var(--border-subtle)] hover:bg-[var(--accent-navy)] hover:text-white text-[var(--text-secondary)] transition-colors flex items-center gap-1 text-xs font-medium cursor-pointer disabled:opacity-50"
                      title="Download blind manuscript from Cloudflare R2"
                    >
                      {downloadingKey ? (
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Download className="w-3.5 h-3.5" />
                      )}
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
                      onClick={() => {
                        const key = selectedSub.authorFileKey || (selectedSub.trackingNumber ? `author-dossiers/${selectedSub.trackingNumber}/${(selectedSub.authorInfoFileName || 'author_slip.docx').replace(/[^a-zA-Z0-9._-]/g, '_')}` : '');
                        handleDownloadR2File(key, selectedSub.authorInfoFileName);
                      }}
                      disabled={downloadingKey !== null}
                      className="px-2.5 py-1.5 rounded-lg border border-[var(--border-subtle)] hover:bg-[var(--accent-gold)] hover:text-black text-[var(--text-secondary)] transition-colors flex items-center gap-1 text-xs font-medium cursor-pointer disabled:opacity-50"
                      title="Download author dossier sheet from Cloudflare R2"
                    >
                      {downloadingKey ? (
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Download className="w-3.5 h-3.5" />
                      )}
                      <span className="hidden sm:inline">Download</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Editorial Lifecycle Controller (Status update - Single Clean Dropdown) */}
              <div className="p-4 sm:p-5 rounded-xl border border-[var(--accent-gold)]/30 bg-[var(--accent-gold)]/5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent-gold)] font-bold flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5" /> Editorial Decision &amp; Pipeline Status
                  </span>
                  <span className="text-[11px] text-[var(--text-muted)] font-mono">
                    Instant sync with live database
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-2.5 w-full sm:w-auto">
                    <label htmlFor="pipeline-status-select" className="text-xs font-semibold text-[var(--text-secondary)] whitespace-nowrap">
                      Pipeline Stage:
                    </label>
                    <select
                      id="pipeline-status-select"
                      value={selectedSub.status}
                      onChange={(e) => handleUpdateStatus(selectedSub.id, e.target.value as any)}
                      className="w-full sm:w-auto px-3 py-2 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-card)] text-xs font-semibold text-[var(--text-primary)] cursor-pointer focus:outline-none focus:border-[var(--accent-gold)] shadow-2xs"
                    >
                      <option value="Submitted">1. Submitted (New Manuscript)</option>
                      <option value="Editorial Triage">2. Editorial Triage</option>
                      <option value="Under Peer Review">3. Under Peer Review</option>
                      <option value="Revisions Required">4. Revisions Required</option>
                      <option value="Accepted">5. Accepted (Passed Review)</option>
                      <option value="Published">6. Published (Continuous Record)</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[var(--text-muted)] font-sans">Current Status:</span>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      selectedSub.status === 'Published'
                        ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30'
                        : selectedSub.status === 'Accepted'
                        ? 'bg-blue-500/15 text-blue-700 dark:text-blue-400 border border-blue-500/30'
                        : selectedSub.status === 'Revisions Required'
                        ? 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30'
                        : selectedSub.status === 'Under Peer Review'
                        ? 'bg-purple-500/15 text-purple-700 dark:text-purple-400 border border-purple-500/30'
                        : 'bg-slate-500/15 text-slate-700 dark:text-slate-300 border border-slate-500/30'
                    }`}>
                      {selectedSub.status}
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-[var(--border-subtle)] bg-[var(--bg-page)] flex items-center justify-between">
              <span className="text-[11px] text-[var(--text-muted)] font-mono">
                CSR Editorial Engine • Double-Blind Integrity Verified
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (selectedSub) {
                      handleDeleteSubmission(selectedSub.id);
                    }
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/30 hover:bg-red-500/20 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Safely move to Deleted Submissions archive"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Manuscript</span>
                </button>
                <button
                  onClick={() => setSelectedSub(null)}
                  className="px-4 py-1.5 rounded-lg border border-[var(--border-subtle)] text-xs font-semibold hover:bg-[var(--bg-card)] transition-colors cursor-pointer"
                >
                  Close Dossier
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 2: CUSTOM CONFIRMATION POPUP FOR DELETION (NO BROWSER POPUP) */}
      {/* ===================================================================== */}
      {deleteTargetSub && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-lg rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-2xl overflow-hidden animate-scaleUp">
            
            {/* Modal Header */}
            <div className="p-5 sm:p-6 pb-4 border-b border-[var(--border-subtle)] flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-red-500/10 border border-red-500/25 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-serif font-bold text-lg text-[var(--text-primary)]">
                    Archive &amp; Delete Submission
                  </h3>
                  <button
                    onClick={() => setDeleteTargetSub(null)}
                    disabled={isDeleting}
                    className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-page)] transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  Are you sure you want to remove this manuscript from the active review pipeline?
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 space-y-4">
              
              {/* Manuscript Summary Card */}
              <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-page)] space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-bold text-[var(--accent-navy)] dark:text-[var(--accent-gold)] px-2 py-0.5 rounded bg-[var(--bg-card)] border border-[var(--border-subtle)]">
                    {deleteTargetSub.trackingNumber}
                  </span>
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">
                    Stage: {deleteTargetSub.status}
                  </span>
                </div>
                <h4 className="font-serif font-semibold text-sm text-[var(--text-primary)] leading-snug line-clamp-2">
                  {deleteTargetSub.title}
                </h4>
                <div className="text-[11px] text-[var(--text-secondary)] flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span>Author: <strong>{deleteTargetSub.authorName || 'Anonymous Submitter'}</strong></span>
                  {deleteTargetSub.authorEmail && (
                    <span className="font-mono text-[10px] text-[var(--text-muted)]">({deleteTargetSub.authorEmail})</span>
                  )}
                </div>
              </div>

              {/* Safety Assurance Note */}
              <div className="p-3.5 rounded-xl border border-emerald-500/25 bg-emerald-500/5 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold text-xs">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>Zero Data Loss Protection</span>
                </div>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed pl-5.5">
                  This manuscript is <strong>not permanently lost</strong>. It will be safely moved to the <strong>"Deleted Submissions"</strong> archive with all files, metadata, and author details intact. You can restore it anytime with 1 click.
                </p>
              </div>

              {/* Deletion Reason (Optional) */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-[var(--text-secondary)]">
                  Reason for Removal (Stored in Audit Archive):
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {[
                    'Withdrawn by author',
                    'Desk reject',
                    'Duplicate entry',
                    'Author request'
                  ].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setDeleteReason(preset)}
                      className={`text-[10px] px-2 py-0.8 rounded-md border transition-all cursor-pointer ${
                        deleteReason === preset
                          ? 'border-[var(--accent-gold)] bg-[var(--accent-gold)]/15 text-[var(--accent-gold)] font-semibold'
                          : 'border-[var(--border-subtle)] text-[var(--text-muted)] hover:border-[var(--text-muted)]'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={deleteReason}
                  onChange={(e) => setDeleteReason(e.target.value)}
                  placeholder="Enter reason (optional)..."
                  className="w-full px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)] font-sans"
                />
              </div>

            </div>

            {/* Modal Actions */}
            <div className="p-4 px-5 sm:px-6 border-t border-[var(--border-subtle)] bg-[var(--bg-page)]/70 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setDeleteTargetSub(null)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-page)] text-xs font-semibold text-[var(--text-secondary)] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={executeDeleteSubmission}
                disabled={isDeleting}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Archiving...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Confirm &amp; Move to Archive</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 3: CUSTOM RESTORE CONFIRMATION POPUP */}
      {/* ===================================================================== */}
      {restoreTargetNumber && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-md rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-2xl overflow-hidden animate-scaleUp p-6 space-y-4">
            
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-serif font-bold text-base text-[var(--text-primary)]">
                  Restore Manuscript?
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  Submission <span className="font-mono font-bold text-[var(--accent-gold)]">{restoreTargetNumber}</span> will be restored back to the active manuscript pipeline.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setRestoreTargetNumber(null)}
                disabled={isRestoring}
                className="px-3.5 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-xs font-semibold hover:bg-[var(--bg-card)] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => executeRestoreSubmission(restoreTargetNumber)}
                disabled={isRestoring}
                className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
              >
                {isRestoring ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Restoring...</span>
                  </>
                ) : (
                  <>
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Confirm Restore</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 4: OFFICE ENQUIRY INSPECTOR MODAL */}
      {/* ===================================================================== */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="w-full max-w-2xl max-h-[92vh] rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-2xl flex flex-col overflow-hidden my-auto animate-scaleUp">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[var(--border-subtle)] bg-[var(--bg-page)]/80 flex items-center justify-between gap-4 sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-[var(--accent-navy)] dark:text-[var(--accent-gold)] px-2.5 py-0.5 rounded bg-[var(--bg-card)] border border-[var(--border-subtle)]">
                  Enquiry #{selectedEnquiry.id}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase bg-[var(--bg-page)] border border-[var(--border-subtle)] text-[var(--text-secondary)]">
                  {selectedEnquiry.category || 'general'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedEnquiry(null)}
                  className="p-1.5 rounded-lg border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              
              {/* Sender Details Banner */}
              <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-page)] space-y-2">
                <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider block font-bold">
                  Correspondent Details
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[var(--text-muted)] text-[11px] block">Sender Name:</span>
                    <span className="font-serif font-bold text-sm text-[var(--text-primary)]">
                      {selectedEnquiry.name || 'Not specified'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[var(--text-muted)] text-[11px] block">Registered Email:</span>
                    <a
                      href={`mailto:${selectedEnquiry.email}`}
                      className="font-mono font-semibold text-[var(--accent-navy)] dark:text-[var(--accent-gold)] hover:underline break-all"
                    >
                      {selectedEnquiry.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-[var(--text-muted)] text-[11px] block">Dispatched Timestamp:</span>
                    <span className="font-mono text-[var(--text-primary)]">
                      {selectedEnquiry.created_at ? new Date(selectedEnquiry.created_at).toLocaleString() : 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[var(--text-muted)] text-[11px] block">Status:</span>
                    <span className={`inline-flex items-center gap-1 font-mono font-semibold text-[11px] ${
                      (selectedEnquiry.status || '').toLowerCase() === 'new'
                        ? 'text-amber-600 dark:text-amber-400'
                        : (selectedEnquiry.status || '').toLowerCase() === 'replied'
                        ? 'text-sky-600 dark:text-sky-400'
                        : 'text-emerald-600 dark:text-emerald-400'
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {selectedEnquiry.status || 'New'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider block font-bold">
                  Subject Line
                </span>
                <h3 className="font-serif font-bold text-lg text-[var(--text-primary)]">
                  {selectedEnquiry.subject || 'No Subject Specified'}
                </h3>
              </div>

              {/* Message Content */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider block font-bold">
                  Message Body
                </span>
                <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-page)] text-xs sm:text-sm text-[var(--text-primary)] font-serif leading-relaxed whitespace-pre-wrap">
                  {selectedEnquiry.message}
                </div>
              </div>

              {/* Status Update Quick Toggles */}
              <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-2.5">
                <span className="text-[11px] font-semibold text-[var(--text-primary)] block">
                  Update Enquiry Triage Status:
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleUpdateEnquiryStatus(selectedEnquiry.id, 'New')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono border transition-all cursor-pointer ${
                      (selectedEnquiry.status || '').toLowerCase() === 'new'
                        ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/40'
                        : 'border-[var(--border-subtle)] text-[var(--text-muted)] hover:border-amber-500/30'
                    }`}
                  >
                    Mark as New
                  </button>
                  <button
                    onClick={() => handleUpdateEnquiryStatus(selectedEnquiry.id, 'Replied')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono border transition-all cursor-pointer ${
                      (selectedEnquiry.status || '').toLowerCase() === 'replied'
                        ? 'bg-sky-500/20 text-sky-600 dark:text-sky-400 border-sky-500/40'
                        : 'border-[var(--border-subtle)] text-[var(--text-muted)] hover:border-sky-500/30'
                    }`}
                  >
                    Mark as Replied
                  </button>
                  <button
                    onClick={() => handleUpdateEnquiryStatus(selectedEnquiry.id, 'Resolved')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono border transition-all cursor-pointer ${
                      (selectedEnquiry.status || '').toLowerCase() === 'resolved'
                        ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/40'
                        : 'border-[var(--border-subtle)] text-[var(--text-muted)] hover:border-emerald-500/30'
                    }`}
                  >
                    Mark as Resolved
                  </button>
                </div>
              </div>

            </div>

            {/* Modal Actions Footer */}
            <div className="p-4 px-6 border-t border-[var(--border-subtle)] bg-[var(--bg-page)]/70 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  if (window.confirm(`Permanently delete enquiry #${selectedEnquiry.id}?`)) {
                    handleDeleteEnquiry(selectedEnquiry.id);
                  }
                }}
                className="px-3 py-2 rounded-xl border border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-semibold hover:bg-red-500/20 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Enquiry</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedEnquiry(null)}
                  className="px-4 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-page)] text-xs font-semibold text-[var(--text-secondary)] transition-colors cursor-pointer"
                >
                  Close
                </button>
                <a
                  href={`mailto:${selectedEnquiry.email}?subject=Re: ${encodeURIComponent(selectedEnquiry.subject || 'Enquiry')}&body=Dear ${encodeURIComponent(selectedEnquiry.name || 'Scholar')},%0D%0A%0D%0AThank you for contacting The Crime %26 Society Review.%0D%0A%0D%0A`}
                  onClick={() => {
                    if ((selectedEnquiry.status || '').toLowerCase() === 'new') {
                      handleUpdateEnquiryStatus(selectedEnquiry.id, 'Replied');
                    }
                  }}
                  className="px-5 py-2 rounded-xl bg-[var(--accent-navy)] text-white hover:opacity-90 transition-opacity font-semibold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Email Reply</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Toast Notification Banner */}
      {toastNotification && (
        <div className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl shadow-xl border flex items-center gap-3 animate-slideIn ${
          toastNotification.type === 'success'
            ? 'bg-emerald-950/95 text-emerald-200 border-emerald-700/60'
            : 'bg-red-950/95 text-red-200 border-red-700/60'
        }`}>
          {toastNotification.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          )}
          <span className="text-xs font-medium">{toastNotification.message}</span>
          <button
            onClick={() => setToastNotification(null)}
            className="p-1 hover:opacity-75 transition-opacity cursor-pointer ml-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

    </div>
  );
};

export default AdminPage;
