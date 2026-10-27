import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { 
  Search, 
  Check, 
  Copy, 
  AlertCircle, 
  RefreshCw, 
  Mail, 
  FileText, 
  User, 
  Calendar,
  ChevronDown,
  ChevronUp,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface TrackedSubmission {
  trackingNumber: string;
  title: string;
  articleType: string;
  authorName: string;
  status: string;
  stageNumber: number;
  submittedAt: string;
  updatedAt: string;
  blindFileName?: string;
  authorFileName?: string;
  decisionNotes?: string;
}

// Exactly matching the 6 Pipeline Stages from the Editorial Workflow
const PIPELINE_STAGES = [
  { stage: 1, label: 'Submitted' },
  { stage: 2, label: 'Editorial Triage' },
  { stage: 3, label: 'Under Peer Review' },
  { stage: 4, label: 'Revisions Required' },
  { stage: 5, label: 'Accepted' },
  { stage: 6, label: 'Published' },
];

export const ManuscriptTracker: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);

  const queryId = searchParams.get('id') || searchParams.get('tracking') || '';
  const [inputTracking, setInputTracking] = useState(queryId);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submission, setSubmission] = useState<TrackedSubmission | null>(null);
  const [isCopiedId, setIsCopiedId] = useState(false);
  const [recentId, setRecentId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);

  // Read latest submitted ID from localStorage for convenience
  useEffect(() => {
    try {
      const localListStr = localStorage.getItem('csr_user_submissions');
      if (localListStr) {
        const localList = JSON.parse(localListStr);
        if (Array.isArray(localList) && localList.length > 0) {
          const last = localList[0];
          const tid = last.trackingNumber || last.trackingId;
          if (tid) setRecentId(tid);
        }
      }
    } catch (e) {}
  }, []);

  // Scroll into view if URL contains #track or query ID
  useEffect(() => {
    if (location.hash === '#track' || queryId) {
      if (containerRef.current) {
        containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location.hash, queryId]);

  // Execute tracking query
  const executeTrack = async (trackingToFind: string) => {
    const cleanId = trackingToFind.trim().toUpperCase();
    if (!cleanId) {
      setErrorMsg('Please enter your unique Tracking ID (e.g., CSR-2026-XXXXXXXXXX).');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    setSubmission(null);
    setIsExpanded(true);

    try {
      let fetchedSuccessfully = false;

      // 1. Backend API lookup
      try {
        const response = await fetch(`/api/track?tracking=${encodeURIComponent(cleanId)}`);
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.found && data.submission) {
            setSubmission(data.submission);
            fetchedSuccessfully = true;
          } else if (data.message) {
            setErrorMsg(data.message);
            fetchedSuccessfully = true;
          }
        }
      } catch (e) {
        // Fallback to local storage
      }

      // 2. Dev / Local Storage fallback
      if (!fetchedSuccessfully) {
        const localListStr = localStorage.getItem('csr_user_submissions');
        if (localListStr) {
          try {
            const localList = JSON.parse(localListStr);
            const match = Array.isArray(localList) 
              ? localList.find((item: any) => 
                  (item.trackingNumber || item.trackingId || '').toUpperCase() === cleanId
                )
              : null;

            if (match) {
              setSubmission({
                trackingNumber: match.trackingNumber || match.trackingId,
                title: match.title || 'Untitled Manuscript',
                articleType: match.articleType || 'Research Article',
                authorName: match.authorName || 'Submitting Author',
                status: match.status || 'Submitted',
                stageNumber: match.currentStageNumber || match.stageNumber || 1,
                submittedAt: match.submittedAt || new Date().toISOString().split('T')[0],
                updatedAt: match.updatedAt || new Date().toISOString().split('T')[0],
                blindFileName: match.fileName || match.blindFileName || '',
                authorFileName: match.authorInfoFileName || match.authorFileName || '',
                decisionNotes: match.editorialDecisionNotes || match.decisionNotes || '',
              });
              fetchedSuccessfully = true;
            }
          } catch (e) {}
        }

        if (!fetchedSuccessfully && !errorMsg) {
          setErrorMsg('No manuscript found matching this tracking ID. Please verify the identifier and try again.');
        }
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Error looking up manuscript status.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (queryId) {
      setInputTracking(queryId);
      executeTrack(queryId);
    }
  }, [queryId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeTrack(inputTracking);
  };

  const handleCopyId = () => {
    if (!submission) return;
    navigator.clipboard.writeText(submission.trackingNumber);
    setIsCopiedId(true);
    setTimeout(() => setIsCopiedId(false), 2000);
  };

  const handleReset = () => {
    setSubmission(null);
    setErrorMsg(null);
    setInputTracking('');
  };

  // Determine active stage number directly matching statuses
  const currentStageNumber = useMemo(() => {
    if (!submission) return 1;
    const s = (submission.status || '').trim().toLowerCase();
    if (s === 'rejected') return 0;
    if (s === 'published') return 6;
    if (s === 'accepted') return 5;
    if (s.includes('revision')) return 4;
    if (s.includes('peer') || s.includes('review')) return 3;
    if (s.includes('triage') || s.includes('screening')) return 2;
    if (s === 'submitted') return 1;
    return submission.stageNumber || 1;
  }, [submission]);

  // Status Badge Styling
  const statusBadge = useMemo(() => {
    if (!submission) return null;
    const s = submission.status.toLowerCase();

    if (s === 'rejected') {
      return {
        bg: 'bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30',
        dot: 'bg-rose-500',
        label: 'Rejected',
      };
    }
    if (s === 'published') {
      return {
        bg: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30',
        dot: 'bg-emerald-500',
        label: 'Published',
      };
    }
    if (s === 'accepted') {
      return {
        bg: 'bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30',
        dot: 'bg-blue-500',
        label: 'Accepted',
      };
    }
    if (s.includes('revision')) {
      return {
        bg: 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30',
        dot: 'bg-amber-500',
        label: 'Revisions Required',
      };
    }
    if (s.includes('review')) {
      return {
        bg: 'bg-purple-500/15 text-purple-700 dark:text-purple-400 border-purple-500/30',
        dot: 'bg-purple-500 animate-pulse',
        label: 'Under Peer Review',
      };
    }
    if (s.includes('triage')) {
      return {
        bg: 'bg-sky-500/15 text-sky-700 dark:text-sky-400 border-sky-500/30',
        dot: 'bg-sky-500 animate-pulse',
        label: 'Editorial Triage',
      };
    }
    return {
      bg: 'bg-slate-500/15 text-slate-700 dark:text-slate-300 border-slate-500/30',
      dot: 'bg-slate-500 animate-pulse',
      label: 'Submitted',
    };
  }, [submission]);

  return (
    <section 
      id="track" 
      ref={containerRef}
      className="scroll-mt-20 mb-5 relative rounded-2xl border-2 border-amber-500/60 dark:border-amber-400/50 bg-gradient-to-br from-amber-50/80 via-[var(--bg-card)] to-amber-100/40 dark:from-slate-950 dark:via-slate-900 dark:to-amber-950/30 p-4 sm:p-5 shadow-lg animate-banner-glow overflow-hidden transition-all"
    >
      {/* Decorative ambient spotlight */}
      <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-amber-400/15 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-indigo-500/10 blur-2xl pointer-events-none" />

      {/* Prominent Attention-Grabbing Banner Header */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-500/30 pb-3.5">
        <div className="space-y-1">
          <h2 className="font-serif text-lg sm:text-xl font-bold text-[var(--text-primary)] tracking-tight flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span>Track Your Manuscript Status</span>
          </h2>
        </div>

        {/* Toggle Minimize/Maximize Button */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="self-end sm:self-center p-1.5 rounded-lg border border-amber-500/30 bg-[var(--bg-card)] hover:bg-amber-500/10 text-[var(--text-secondary)] transition-all flex items-center gap-1 text-xs font-mono cursor-pointer shrink-0"
          title={isExpanded ? 'Collapse tracking panel' : 'Expand tracking panel'}
        >
          <span className="text-[11px] hidden sm:inline">{isExpanded ? 'Hide' : 'Show'}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Expandable Tracking Facility Content */}
      {isExpanded && (
        <div className="relative z-10 pt-3.5 space-y-3.5 animate-fadeIn">
          {/* Tracking Input Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-amber-600 dark:text-amber-400 absolute left-3 top-2.5 pointer-events-none" />
              <input
                type="text"
                value={inputTracking}
                onChange={(e) => setInputTracking(e.target.value.toUpperCase())}
                placeholder="Enter Tracking ID (e.g. CSR-2026-XXXXXXXXXX)"
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-amber-500/40 bg-[var(--bg-card)] text-[var(--text-primary)] font-mono text-xs sm:text-sm uppercase tracking-wider focus:outline-hidden focus:ring-2 focus:ring-amber-500 shadow-2xs placeholder:text-[var(--text-muted)] placeholder:normal-case"
                disabled={isLoading}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !inputTracking.trim()}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-sm active:scale-[0.98] shrink-0"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Search className="w-3.5 h-3.5" />
                  <span>Track Status</span>
                </>
              )}
            </button>
          </form>

          {/* Quick-fill helper for recent submission */}
          {recentId && !submission && (
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
              <span>Recently submitted on this device:</span>
              <button
                type="button"
                onClick={() => {
                  setInputTracking(recentId);
                  executeTrack(recentId);
                }}
                className="px-2 py-0.5 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-[11px] font-bold cursor-pointer transition-colors inline-flex items-center gap-1"
              >
                <span>{recentId}</span>
                <ArrowRight className="w-2.5 h-2.5" />
              </button>
            </div>
          )}

          {/* Error Message Alert */}
          {errorMsg && (
            <div className="p-3 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2 animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span className="flex-1">{errorMsg}</span>
              <button
                type="button"
                onClick={() => setErrorMsg(null)}
                className="text-xs hover:underline cursor-pointer font-mono"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Live Tracking Result Details Card */}
          {submission && (
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 sm:p-5 shadow-sm space-y-4 animate-fadeIn">
              
              {/* Header with ID, Title, Status & Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--border-subtle)]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-base sm:text-lg font-bold text-amber-600 dark:text-amber-400">
                      {submission.trackingNumber}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyId}
                      className="p-1 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-page)] hover:border-amber-500 text-[var(--text-secondary)] transition-all cursor-pointer"
                      title="Copy Tracking ID"
                    >
                      {isCopiedId ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <h3 className="font-serif font-bold text-sm sm:text-base text-[var(--text-primary)] line-clamp-2">
                    {submission.title}
                  </h3>
                </div>

                {/* Status Pill and Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  {statusBadge && (
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-mono font-bold tracking-wide ${statusBadge.bg}`}>
                      <span className={`w-2 h-2 rounded-full ${statusBadge.dot}`} />
                      <span>{statusBadge.label}</span>
                    </span>
                  )}
                  <a
                    href={`mailto:thecrimeandsocietyreview@gmail.com?subject=Query%20-%20${encodeURIComponent(submission.trackingNumber)}`}
                    className="p-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    title="Email Editorial Desk"
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="p-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors text-xs font-mono"
                    title="Track another manuscript"
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* Submission Metadata Row */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-[var(--text-secondary)] font-serif">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>{submission.authorName}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>{submission.articleType}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>Submitted: {submission.submittedAt ? submission.submittedAt.split('T')[0] : 'N/A'}</span>
                </div>
              </div>

              {/* Rejection notice if declined */}
              {submission.status.toLowerCase() === 'rejected' && (
                <div className="p-3.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-800 dark:text-rose-200 text-xs space-y-1 animate-fadeIn">
                  <div className="flex items-center gap-2 font-bold font-serif text-xs sm:text-sm text-rose-700 dark:text-rose-300">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 dark:text-rose-400" />
                    <span>Editorial Decision: Submission Rejected / Declined</span>
                  </div>
                  <p className="font-serif leading-relaxed text-neutral-700 dark:text-neutral-300 text-[11px] sm:text-xs">
                    Following editorial assessment, this manuscript was not accepted for publication. Detailed comments have been communicated via formal correspondence.
                  </p>
                </div>
              )}

              {/* 6-Stage Connected Visual Stepper */}
              <div className="pt-2">
                {/* Mobile: Connected Vertical Stepper */}
                <div className="sm:hidden relative pl-2 py-1">
                  <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-[var(--border-subtle)]" />
                  <div 
                    className="absolute left-[19px] top-4 w-0.5 bg-amber-500 transition-all duration-500"
                    style={{
                      height: `${Math.max(0, Math.min(100, ((currentStageNumber - 1) / (PIPELINE_STAGES.length - 1)) * 100))}%`
                    }}
                  />
                  <div className="space-y-1">
                    {PIPELINE_STAGES.map((s) => {
                      const isCompleted = currentStageNumber > s.stage;
                      const isCurrent = currentStageNumber === s.stage;

                      return (
                        <div key={s.stage} className="relative flex items-center gap-3 py-1.5">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 z-10 ring-2 ring-[var(--bg-card)] transition-all ${
                            isCompleted
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : isCurrent
                              ? 'bg-amber-500 text-slate-950 ring-3 ring-amber-400/40 shadow-sm animate-pulse'
                              : 'bg-[var(--bg-card)] border border-[var(--border-strong)] text-[var(--text-muted)]'
                          }`}>
                            {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : s.stage}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs ${
                              isCurrent 
                                ? 'text-amber-600 dark:text-amber-400 font-bold' 
                                : isCompleted 
                                ? 'text-[var(--text-primary)] font-semibold' 
                                : 'text-[var(--text-muted)]'
                            }`}>
                              {s.label}
                            </span>
                            {isCurrent && (
                              <span className="text-[9px] font-mono uppercase tracking-wider text-amber-700 dark:text-amber-300 font-bold px-1.5 py-0.2 rounded bg-amber-500/15 border border-amber-500/30">
                                Current
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Desktop: Connected Horizontal Stepper */}
                <div className="hidden sm:block relative pt-2 pb-1">
                  <div className="absolute top-4 left-5 right-5 h-0.5 bg-[var(--border-subtle)] -translate-y-1/2 z-0" />
                  <div 
                    className="absolute top-4 left-5 h-0.5 bg-amber-500 -translate-y-1/2 z-0 transition-all duration-500"
                    style={{
                      width: `${Math.max(0, Math.min(100, ((currentStageNumber - 1) / (PIPELINE_STAGES.length - 1)) * 100))}%`
                    }}
                  />
                  <div className="grid grid-cols-6 gap-x-2 relative z-10">
                    {PIPELINE_STAGES.map((s) => {
                      const isCompleted = currentStageNumber > s.stage;
                      const isCurrent = currentStageNumber === s.stage;

                      return (
                        <div key={s.stage} className="flex flex-col items-center text-center">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 ring-2 ring-[var(--bg-card)] ${
                            isCompleted
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : isCurrent
                              ? 'bg-amber-500 text-slate-950 ring-3 ring-amber-400/40 shadow-sm animate-pulse'
                              : 'bg-[var(--bg-card)] border border-[var(--border-strong)] text-[var(--text-muted)]'
                          }`}>
                            {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : s.stage}
                          </div>
                          <span className={`text-[10.5px] lg:text-[11.5px] mt-1.5 font-medium tracking-tight leading-tight ${
                            isCurrent 
                              ? 'text-amber-600 dark:text-amber-400 font-bold' 
                              : isCompleted 
                              ? 'text-[var(--text-primary)] font-semibold' 
                              : 'text-[var(--text-muted)]'
                          }`}>
                            {s.label}
                          </span>
                          {isCurrent && (
                            <span className="text-[8.5px] font-mono uppercase tracking-wider text-amber-700 dark:text-amber-300 font-bold mt-0.5 px-1 rounded bg-amber-500/10">
                              Current
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Decision Notes */}
              {submission.decisionNotes && (
                <div className="p-3 rounded-xl border border-amber-500/30 bg-amber-500/10 text-xs space-y-1">
                  <span className="text-[10px] font-mono uppercase font-bold text-amber-700 dark:text-amber-300 block">
                    Editorial Feedback &amp; Decision Note:
                  </span>
                  <p className="font-serif text-[var(--text-primary)] leading-relaxed">
                    {submission.decisionNotes}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default ManuscriptTracker;
