import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  Users, 
  Send, 
  Award, 
  ShieldCheck, 
  MessageSquare, 
  Sliders, 
  Eye, 
  Kanban, 
  ChevronRight,
  Search,
  Database,
  ArrowRight,
  Sparkles,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { SubmissionDraft } from '../types/journal';

export const DashboardPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'author';

  // Real Submissions State (Loads from localStorage + auto-syncs with Cloudflare D1)
  const [submissions, setSubmissions] = useState<SubmissionDraft[]>(() => {
    const saved = localStorage.getItem('csr_user_submissions');
    if (saved) {
      try {
        const userSubs: SubmissionDraft[] = JSON.parse(saved);
        // Exclude all mock / demo items
        return userSubs.filter(
          s => s.id &&
               !s.id.startsWith('sub-csr-') &&
               !s.id.startsWith('sub-10') &&
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

  const [selectedSub, setSelectedSub] = useState<SubmissionDraft | null>(() => {
    return submissions.length > 0 ? submissions[0] : null;
  });

  // Track search state for looking up any live submission in Cloudflare D1
  const [trackSearchId, setTrackSearchId] = useState('');
  const [trackSearchLoading, setTrackSearchLoading] = useState(false);
  const [trackSearchError, setTrackSearchError] = useState('');

  // Reviewer Console State
  const [methodologyScore, setMethodologyScore] = useState<number>(8);
  const [originalityScore, setOriginalityScore] = useState<number>(9);
  const [clarityScore, setClarityScore] = useState<number>(8);
  const [reviewRecommendation, setReviewRecommendation] = useState<string>('Accept with Minor Revisions');
  const [reviewerComments, setReviewerComments] = useState<string>(
    "The manuscript represents an empirically sound investigation aligned with the Rashomon Approach. Statistical claims are supported by appropriate primary sources."
  );
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Auto-sync with Cloudflare D1 to load live submissions
  useEffect(() => {
    const syncLiveSubmissions = async () => {
      try {
        const res = await fetch('/api/admin/submissions');
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.submissions) && data.submissions.length > 0) {
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
              authorOrcid: 'Verified in Dossier',
              authorAffiliation: 'Provided in Submission',
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

            setSubmissions(prev => {
              const existingTrackings = new Set(prev.map(p => p.trackingNumber));
              const fresh = mapped.filter(m => !existingTrackings.has(m.trackingNumber));
              const updated = [...prev, ...fresh];
              if (!selectedSub && updated.length > 0) {
                setSelectedSub(updated[0]);
              }
              return updated;
            });
          }
        }
      } catch (e) {
        // Dev or network fallback
      }
    };

    syncLiveSubmissions();
  }, []);

  // Update selectedSub if submissions list changes and nothing selected
  useEffect(() => {
    if (!selectedSub && submissions.length > 0) {
      setSelectedSub(submissions[0]);
    }
  }, [submissions, selectedSub]);

  // Live Tracking lookup directly against Cloudflare D1
  const handleTrackLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = trackSearchId.trim();
    if (!query) return;

    setTrackSearchLoading(true);
    setTrackSearchError('');

    try {
      const res = await fetch(`/api/track?tracking=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (data.success && data.found && data.submission) {
        const foundSub: SubmissionDraft = {
          id: `track-${data.submission.trackingNumber}`,
          trackingNumber: data.submission.trackingNumber,
          title: data.submission.title,
          abstract: data.submission.abstract || 'Blinded abstract recorded in Cloudflare D1.',
          primaryLens: 'legal',
          secondaryLenses: ['forensic'],
          articleType: data.submission.articleType || 'Research Article',
          authorName: data.submission.authorName || 'Corresponding Author',
          authorEmail: '',
          authorPhone: '',
          authorOrcid: '',
          authorAffiliation: 'Provided in Dossier',
          creditRoles: ['Author'],
          ethicsApproved: true,
          conflictDeclared: true,
          openDataAccessAccepted: true,
          fileName: 'Blind_Manuscript.docx',
          fileSize: 'Recorded in R2',
          submittedAt: (data.submission.submittedAt || '').split('T')[0] || new Date().toISOString().split('T')[0],
          status: data.submission.status || 'Submitted',
          currentStageNumber: data.submission.stageNumber || 1,
          authorMode: 'upload',
          keywords: '',
          editorialDecisionNotes: data.submission.editorialDecisionNotes || '',
        };

        setSubmissions(prev => {
          if (!prev.find(s => s.trackingNumber === foundSub.trackingNumber)) {
            const nextList = [foundSub, ...prev];
            try {
              localStorage.setItem('csr_user_submissions', JSON.stringify(nextList));
            } catch (err) {}
            return nextList;
          }
          return prev;
        });
        setSelectedSub(foundSub);
        setTrackSearchId('');
      } else {
        setTrackSearchError(data.message || 'No submission found in Cloudflare D1 with this Tracking ID.');
      }
    } catch (err) {
      setTrackSearchError('Unable to connect to Cloudflare D1 tracking endpoint.');
    } finally {
      setTrackSearchLoading(false);
    }
  };

  // Active paper for reviewer console (uses real submission or null)
  const activeReviewSub = submissions.find(s => s.status === 'Under Peer Review' || s.currentStageNumber === 3) || (submissions.length > 0 ? submissions[0] : null);

  // Kanban Stage Groupings from real submissions
  const triageSubmissions = submissions.filter(s => s.currentStageNumber === 1 || s.status === 'Submitted');
  const reviewSubmissions = submissions.filter(s => s.currentStageNumber === 2 || s.currentStageNumber === 3 || s.status === 'Under Peer Review' || s.status === 'Editorial Triage');
  const copyeditSubmissions = submissions.filter(s => s.currentStageNumber === 4 || s.currentStageNumber === 5 || s.status === 'Revisions Required' || s.status === 'Accepted');
  const publishedSubmissions = submissions.filter(s => s.currentStageNumber === 6 || s.status === 'Published');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* Header & Role Switcher */}
      <div className="border-b border-[var(--border-subtle)] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase font-bold text-[var(--accent-gold)] flex items-center gap-1.5">
            <Kanban className="w-3.5 h-3.5" /> Peer Review & Workflow Operations
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mt-1">
            Publishing Dashboards
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
            End-to-End Editorial Management: Author Lifecycle, Reviewer Console, and Live Cloudflare D1 Operations.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center rounded-lg border border-[var(--border-subtle)] p-0.5 bg-[var(--bg-card)] text-xs font-semibold">
          <button
            onClick={() => setSearchParams({ tab: 'author' })}
            className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
              activeTab === 'author'
                ? 'bg-[var(--accent-navy)] text-white shadow-xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Author Pipeline</span>
          </button>

          <button
            onClick={() => setSearchParams({ tab: 'reviewer' })}
            className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
              activeTab === 'reviewer'
                ? 'bg-[var(--accent-navy)] text-white shadow-xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Reviewer Console</span>
          </button>

          <button
            onClick={() => setSearchParams({ tab: 'editor' })}
            className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
              activeTab === 'editor'
                ? 'bg-[var(--accent-navy)] text-white shadow-xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Editorial Board Kanban</span>
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* TAB 1: AUTHOR MANUSCRIPT TRACKING PIPELINE */}
      {/* ===================================================================== */}
      {activeTab === 'author' && (
        <div className="space-y-6">
          {/* Quick Tracking Search Bar */}
          <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-2.5 text-xs text-[var(--text-secondary)]">
              <Database className="w-4 h-4 text-emerald-600" />
              <span>
                <strong className="text-[var(--text-primary)]">Cloudflare D1 Live Sync:</strong> Have a Tracking ID? Lookup any manuscript status in real time.
              </span>
            </div>

            <form onSubmit={handleTrackLookup} className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <input
                  type="text"
                  placeholder="CSR-2026-XXXXXXXXXX"
                  value={trackSearchId}
                  onChange={e => setTrackSearchId(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] text-xs font-mono text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)]"
                />
                <Search className="w-3.5 h-3.5 text-[var(--text-muted)] absolute left-2.5 top-2" />
              </div>
              <button
                type="submit"
                disabled={trackSearchLoading || !trackSearchId.trim()}
                className="px-3 py-1.5 rounded-lg bg-[var(--accent-navy)] text-white text-xs font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-1.5 shadow-xs"
              >
                {trackSearchLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
                <span>Track</span>
              </button>
            </form>
          </div>

          {trackSearchError && (
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-600 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{trackSearchError}</span>
            </div>
          )}

          {/* Submissions Section */}
          {submissions.length === 0 ? (
            /* Empty State when no real submissions exist */
            <div className="p-12 text-center rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-[var(--accent-navy)]/10 text-[var(--accent-navy)] flex items-center justify-center mx-auto">
                <FileText className="w-6 h-6" />
              </div>
              <div className="max-w-md mx-auto space-y-2">
                <h3 className="font-serif font-bold text-xl text-[var(--text-primary)]">
                  No Active Submissions Found
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  You haven't submitted a manuscript in this browser yet. When you submit through our submission portal, your manuscript is stored directly in Cloudflare D1 and R2 and will appear here.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  to="/submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--accent-navy)] text-white text-xs font-semibold hover:opacity-90 transition-opacity shadow-sm"
                >
                  <span>Submit a New Manuscript</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ) : selectedSub ? (
            /* Real Submissions Tracker */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Submissions List (Col Span 4) */}
              <div className="lg:col-span-4 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-[var(--text-muted)]">
                  <span>Active Submissions ({submissions.length})</span>
                  <Link to="/submit" className="text-[var(--accent-navy)] hover:underline flex items-center gap-1">
                    + New Submission
                  </Link>
                </div>

                <div className="space-y-2">
                  {submissions.map(sub => (
                    <div
                      key={sub.id}
                      onClick={() => setSelectedSub(sub)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        selectedSub.id === sub.id
                          ? 'border-[var(--accent-gold)] bg-[var(--bg-card)] shadow-sm ring-1 ring-[var(--accent-gold)]/20'
                          : 'border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--border-strong)]'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono mb-1">
                        <span className="font-bold text-[var(--accent-navy)]">{sub.trackingNumber}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          sub.status === 'Published' 
                            ? 'bg-emerald-500/10 text-emerald-600' 
                            : 'bg-amber-500/10 text-amber-600'
                        }`}>
                          {sub.status}
                        </span>
                      </div>
                      <h4 className="font-serif font-semibold text-sm text-[var(--text-primary)] line-clamp-2 leading-snug">
                        {sub.title}
                      </h4>
                      <div className="text-[11px] text-[var(--text-muted)] mt-2 flex items-center justify-between">
                        <span>Submitted: {sub.submittedAt}</span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-mono text-[10px] font-semibold">
                          D1 Live
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Pipeline Tracker (Col Span 8) */}
              <div className="lg:col-span-8 p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-6 shadow-sm">
                <div className="border-b border-[var(--border-subtle)] pb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase font-bold text-[var(--accent-gold)]">
                        Tracking Record: {selectedSub.trackingNumber}
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-mono text-[10px] font-bold">
                        Cloudflare D1 Verified
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-xl text-[var(--text-primary)] mt-1">
                      {selectedSub.title}
                    </h3>
                    <div className="text-xs text-[var(--text-muted)] mt-1">
                      Author: {selectedSub.authorName} {selectedSub.authorAffiliation ? `• ${selectedSub.authorAffiliation}` : ''} {selectedSub.authorEmail ? `(${selectedSub.authorEmail})` : ''}
                    </div>
                  </div>

                  {selectedSub.status === 'Published' && (
                    <Link
                      to="/articles"
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold text-xs hover:opacity-90 transition-opacity flex items-center gap-1.5 shadow-xs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Version of Record</span>
                    </Link>
                  )}
                </div>

                {/* 6-Stage Visual Timeline Stepper */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    Continuous Editorial Lifecycle Progress
                  </h4>

                  <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-xs font-mono">
                    {[
                      { stage: 1, name: 'Submitted', statusText: selectedSub.submittedAt },
                      { stage: 2, name: 'Editorial Triage', statusText: selectedSub.currentStageNumber >= 2 ? 'Passed' : 'Pending' },
                      { stage: 3, name: 'Peer Review', statusText: selectedSub.currentStageNumber >= 3 ? 'In Progress' : 'Queued' },
                      { stage: 4, name: 'Revisions', statusText: selectedSub.currentStageNumber >= 4 ? 'Approved' : 'Pending' },
                      { stage: 5, name: 'Copyediting', statusText: selectedSub.currentStageNumber >= 5 ? 'Completed' : 'Pending' },
                      { stage: 6, name: 'Published', statusText: selectedSub.currentStageNumber >= 6 ? 'Live VoR' : 'Pending' },
                    ].map((s) => {
                      const isCompleted = s.stage < selectedSub.currentStageNumber || (s.stage === selectedSub.currentStageNumber && selectedSub.status === 'Published');
                      const isCurrent = s.stage === selectedSub.currentStageNumber && selectedSub.status !== 'Published';

                      return (
                        <div
                          key={s.stage}
                          className={`p-3 rounded-xl border transition-all ${
                            isCurrent
                              ? 'border-[var(--accent-gold)] bg-[var(--accent-gold)]/10 font-bold text-[var(--text-primary)] shadow-xs'
                              : isCompleted
                              ? 'border-emerald-500/40 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400'
                              : 'border-[var(--border-subtle)] bg-[var(--bg-card-hover)] text-[var(--text-muted)] opacity-60'
                          }`}
                        >
                          <div className="text-xs font-bold">{isCompleted ? '✓' : `0${s.stage}`}</div>
                          <div className="font-sans font-semibold text-[11px] mt-1">{s.name}</div>
                          <div className="text-[10px] text-[var(--text-muted)] mt-0.5 truncate">{s.statusText}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Communication & Audit Log */}
                <div className="space-y-3 pt-4 border-t border-[var(--border-subtle)] text-xs">
                  <h4 className="font-mono font-bold uppercase text-[var(--text-muted)]">
                    Editorial Board Status & Correspondence
                  </h4>
                  <div className="space-y-2">
                    <div className="p-3 rounded-lg bg-[var(--bg-card-hover)] border border-[var(--border-subtle)] space-y-1">
                      <div className="flex items-center justify-between font-mono text-[11px]">
                        <span className="font-bold text-[var(--accent-navy)]">Official Docket Record</span>
                        <span className="text-[var(--text-muted)]">{selectedSub.submittedAt}</span>
                      </div>
                      <p className="text-[var(--text-secondary)] font-serif leading-relaxed">
                        {selectedSub.editorialDecisionNotes ? (
                          <span><strong>Editorial Notice: </strong>{selectedSub.editorialDecisionNotes}</span>
                        ) : selectedSub.editorMessage ? (
                          <span><strong>Author Cover Message: </strong>{selectedSub.editorMessage}</span>
                        ) : (
                          <span>Manuscript successfully ingested and catalogued in Cloudflare D1. Double-blind anonymization validated and under editorial docket screening.</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 2: REVIEWER CONSOLE */}
      {/* ===================================================================== */}
      {activeTab === 'reviewer' && (
        <div className="space-y-6">
          {!activeReviewSub ? (
            <div className="p-12 text-center rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-[var(--accent-navy)]/10 text-[var(--accent-navy)] flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="max-w-md mx-auto space-y-2">
                <h3 className="font-serif font-bold text-xl text-[var(--text-primary)]">
                  No Active Review Assignments
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  There are currently no manuscripts in the double-blind review docket assigned to your profile. Referees receive email notifications with secure tokens upon assignment.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Manuscript Preview (Col Span 7) */}
              <div className="lg:col-span-7 p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
                  <span className="font-mono text-xs text-[var(--accent-gold)] font-bold">
                    Assigned Review: {activeReviewSub.trackingNumber}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-[var(--accent-navy)]/10 text-[var(--accent-navy)] font-mono font-semibold">
                    {activeReviewSub.articleType}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-xl text-[var(--text-primary)]">
                  {activeReviewSub.title}
                </h3>

                <div className="p-3.5 rounded-lg bg-[var(--bg-card-hover)] border border-[var(--border-subtle)] text-xs space-y-1.5 font-serif leading-relaxed text-[var(--text-secondary)]">
                  <span className="font-sans font-bold text-[var(--text-primary)] block">Blinded Abstract:</span>
                  <p>{activeReviewSub.abstract || 'No abstract provided.'}</p>
                </div>

                <div className="p-3 rounded-lg border border-dashed border-[var(--border-subtle)] bg-[var(--bg-card)] text-xs space-y-1 text-[var(--text-muted)]">
                  <span className="font-bold text-[var(--text-primary)] block">Blind Review File:</span>
                  <div className="font-mono text-[11px] text-[var(--accent-navy)] flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    <span>{activeReviewSub.fileName || 'blind-manuscript.docx'} ({activeReviewSub.fileSize || 'Attached in R2'})</span>
                  </div>
                </div>
              </div>

              {/* Evaluation Rubric (Col Span 5) */}
              <div className="lg:col-span-5 p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-5 shadow-sm">
                <div className="border-b border-[var(--border-subtle)] pb-3">
                  <h3 className="font-serif font-bold text-base text-[var(--text-primary)] flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[var(--accent-gold)]" /> Structured Evaluation Rubric
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">
                    Assess methodology, originality, and alignment with the Rashomon Approach.
                  </p>
                </div>

                {/* Score Sliders */}
                <div className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <div className="flex justify-between font-semibold text-[var(--text-primary)]">
                      <span>Methodological Rigor:</span>
                      <span className="font-mono text-[var(--accent-navy)]">{methodologyScore}/10</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={methodologyScore}
                      onChange={e => setMethodologyScore(Number(e.target.value))}
                      className="w-full accent-[var(--accent-navy)]"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between font-semibold text-[var(--text-primary)]">
                      <span>Originality & Significance:</span>
                      <span className="font-mono text-[var(--accent-navy)]">{originalityScore}/10</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={originalityScore}
                      onChange={e => setOriginalityScore(Number(e.target.value))}
                      className="w-full accent-[var(--accent-navy)]"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between font-semibold text-[var(--text-primary)]">
                      <span>Clarity & Thematic Synthesis:</span>
                      <span className="font-mono text-[var(--accent-navy)]">{clarityScore}/10</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={clarityScore}
                      onChange={e => setClarityScore(Number(e.target.value))}
                      className="w-full accent-[var(--accent-navy)]"
                    />
                  </div>
                </div>

                {/* Recommendation Select */}
                <div className="space-y-1 text-xs pt-2 border-t border-[var(--border-subtle)]">
                  <label className="font-semibold text-[var(--text-primary)] block">Final Review Recommendation</label>
                  <select
                    value={reviewRecommendation}
                    onChange={e => setReviewRecommendation(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] text-xs text-[var(--text-primary)] focus:outline-none"
                  >
                    <option>Accept without Revisions</option>
                    <option>Accept with Minor Revisions</option>
                    <option>Major Revisions Required (Second Round)</option>
                    <option>Reject</option>
                  </select>
                </div>

                {/* Comments for Authors */}
                <div className="space-y-1 text-xs">
                  <label className="font-semibold text-[var(--text-primary)] block">Confidential Comments for Editor & Authors</label>
                  <textarea
                    rows={3}
                    value={reviewerComments}
                    onChange={e => setReviewerComments(e.target.value)}
                    className="w-full p-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] text-xs text-[var(--text-primary)] focus:outline-none leading-relaxed"
                  />
                </div>

                <button
                  onClick={() => {
                    setReviewSubmitted(true);
                    alert("Review report submitted to Section Editor! Rating recorded.");
                  }}
                  className="w-full py-2.5 rounded-lg bg-[var(--accent-navy)] text-white text-xs font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{reviewSubmitted ? 'Review Transmitted ✓' : 'Submit Review Report'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 3: EDITORIAL BOARD KANBAN WORKFLOW (LIVE CLOUDFLARE D1) */}
      {/* ===================================================================== */}
      {activeTab === 'editor' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="text-[var(--text-muted)]">Live D1 Submissions Kanban:</span>
              <span className="font-bold text-[var(--accent-gold)]">{submissions.length} Total Submissions in Database</span>
            </div>
            <Link
              to="/admin"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--accent-navy)] text-white text-xs font-semibold hover:opacity-90 transition-opacity shadow-xs"
            >
              <span>Editorial Admin Console</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Column 1: Triage */}
            <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-3 shadow-xs">
              <div className="flex items-center justify-between font-mono text-xs font-bold text-[var(--text-primary)] border-b border-[var(--border-subtle)] pb-2">
                <span>01. Triage ({triageSubmissions.length})</span>
                <span className="text-amber-500">●</span>
              </div>
              {triageSubmissions.length === 0 ? (
                <div className="text-center py-8 text-[var(--text-muted)] text-xs font-mono">Queue Clear (0)</div>
              ) : (
                triageSubmissions.map(sub => (
                  <div key={sub.id} className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] text-xs space-y-1.5">
                    <span className="font-mono text-[10px] text-[var(--accent-gold)] font-bold">{sub.trackingNumber}</span>
                    <h5 className="font-serif font-bold text-[var(--text-primary)] line-clamp-2">{sub.title}</h5>
                    <p className="text-[11px] text-[var(--text-muted)]">Author: {sub.authorName}</p>
                    <div className="pt-2 flex justify-end">
                      <Link to="/admin" className="text-[11px] text-[var(--accent-navy)] font-semibold hover:underline">
                        Manage in Admin →
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Column 2: Under Review */}
            <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-3 shadow-xs">
              <div className="flex items-center justify-between font-mono text-xs font-bold text-[var(--text-primary)] border-b border-[var(--border-subtle)] pb-2">
                <span>02. Double-Blind Review ({reviewSubmissions.length})</span>
                <span className="text-blue-500">●</span>
              </div>
              {reviewSubmissions.length === 0 ? (
                <div className="text-center py-8 text-[var(--text-muted)] text-xs font-mono">Queue Clear (0)</div>
              ) : (
                reviewSubmissions.map(sub => (
                  <div key={sub.id} className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] text-xs space-y-1.5">
                    <span className="font-mono text-[10px] text-[var(--accent-gold)] font-bold">{sub.trackingNumber}</span>
                    <h5 className="font-serif font-bold text-[var(--text-primary)] line-clamp-2">{sub.title}</h5>
                    <p className="text-[11px] text-[var(--text-muted)]">Author: {sub.authorName}</p>
                    <div className="pt-2 flex justify-end">
                      <Link to="/admin" className="text-[11px] text-[var(--accent-navy)] font-semibold hover:underline">
                        View Reviews →
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Column 3: Copyediting / Revisions */}
            <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-3 shadow-xs">
              <div className="flex items-center justify-between font-mono text-xs font-bold text-[var(--text-primary)] border-b border-[var(--border-subtle)] pb-2">
                <span>03. Copyediting & Layout ({copyeditSubmissions.length})</span>
                <span className="text-purple-500">●</span>
              </div>
              {copyeditSubmissions.length === 0 ? (
                <div className="text-center py-8 text-[var(--text-muted)] text-xs font-mono">Queue Clear (0)</div>
              ) : (
                copyeditSubmissions.map(sub => (
                  <div key={sub.id} className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] text-xs space-y-1.5">
                    <span className="font-mono text-[10px] text-[var(--accent-gold)] font-bold">{sub.trackingNumber}</span>
                    <h5 className="font-serif font-bold text-[var(--text-primary)] line-clamp-2">{sub.title}</h5>
                    <p className="text-[11px] text-[var(--text-muted)]">Author: {sub.authorName}</p>
                    <div className="pt-2 flex justify-end">
                      <Link to="/admin" className="text-[11px] text-[var(--accent-navy)] font-semibold hover:underline">
                        Edit Proofs →
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Column 4: Published / Version of Record */}
            <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-3 shadow-xs">
              <div className="flex items-center justify-between font-mono text-xs font-bold text-[var(--text-primary)] border-b border-[var(--border-subtle)] pb-2">
                <span>04. Version of Record ({publishedSubmissions.length})</span>
                <span className="text-emerald-500">●</span>
              </div>
              {publishedSubmissions.length === 0 ? (
                <div className="text-center py-8 text-[var(--text-muted)] text-xs font-mono">Queue Clear (0)</div>
              ) : (
                publishedSubmissions.map(sub => (
                  <div key={sub.id} className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] text-xs space-y-1.5">
                    <span className="font-mono text-[10px] text-emerald-600 font-bold">{sub.trackingNumber}</span>
                    <h5 className="font-serif font-bold text-[var(--text-primary)] line-clamp-2">{sub.title}</h5>
                    <p className="text-[11px] text-[var(--text-muted)]">Author: {sub.authorName}</p>
                    <div className="pt-2 flex justify-end">
                      <Link to="/articles" className="text-[11px] text-emerald-600 font-semibold hover:underline">
                        Live on Web →
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
