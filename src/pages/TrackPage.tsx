import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Check, 
  Copy, 
  AlertCircle, 
  RefreshCw, 
  Mail,
  FileText,
  User,
  Calendar
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

// Exactly matching the 6 Pipeline Stages from the Admin Console
const PIPELINE_STAGES = [
  { stage: 1, label: 'Submitted' },
  { stage: 2, label: 'Editorial Triage' },
  { stage: 3, label: 'Under Peer Review' },
  { stage: 4, label: 'Revisions Required' },
  { stage: 5, label: 'Accepted' },
  { stage: 6, label: 'Published' },
];

export const TrackPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryId = searchParams.get('id') || searchParams.get('tracking') || '';

  const [inputTracking, setInputTracking] = useState(queryId);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submission, setSubmission] = useState<TrackedSubmission | null>(null);
  const [isCopiedId, setIsCopiedId] = useState(false);

  // Perform tracking lookup
  const executeTrack = async (trackingToFind: string) => {
    const cleanId = trackingToFind.trim().toUpperCase();
    if (!cleanId) {
      setErrorMsg('Please enter your Tracking ID (e.g., CSR-2026-XXXXXXXXXX).');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    setSubmission(null);
    setSearchParams({ id: cleanId });

    try {
      let fetchedSuccessfully = false;

      // 1. Try Backend API
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

      // 2. Dev / Local Fallback
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
          setErrorMsg('No manuscript found matching this tracking ID. Please verify the number.');
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

  // Determine active stage number directly matching Admin statuses
  const currentStageNumber = useMemo(() => {
    if (!submission) return 1;
    const s = (submission.status || '').trim().toLowerCase();
    if (s === 'published') return 6;
    if (s === 'accepted') return 5;
    if (s.includes('revision')) return 4;
    if (s.includes('peer') || s.includes('review')) return 3;
    if (s.includes('triage') || s.includes('screening')) return 2;
    if (s === 'submitted') return 1;
    return submission.stageNumber || 1;
  }, [submission]);

  // Status Badge Styling matching Admin
  const statusBadge = useMemo(() => {
    if (!submission) return null;
    const s = submission.status.toLowerCase();

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
    <div className="w-full py-6 sm:py-8 px-3 sm:px-6 max-w-4xl mx-auto space-y-5 animate-fadeIn">
      
      {/* 1. Header (Compact) */}
      <div className="text-center space-y-1">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
          Track Manuscript
        </h1>
        <p className="text-xs text-[var(--text-secondary)] font-sans">
          Enter your Tracking ID to view the live editorial and peer-review status.
        </p>
      </div>

      {/* 2. Compact Search Input */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3 sm:p-4 shadow-2xs space-y-2.5">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-3" />
            <input
              type="text"
              value={inputTracking}
              onChange={(e) => setInputTracking(e.target.value.toUpperCase())}
              placeholder="e.g. CSR-2026-9X456YB34R"
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-page)] text-[var(--text-primary)] font-mono text-xs sm:text-sm uppercase tracking-wider focus:outline-hidden focus:ring-1 focus:ring-[var(--accent-navy)]"
              disabled={isLoading}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !inputTracking.trim()}
            className="px-5 py-2 rounded-lg bg-[var(--accent-navy)] text-white text-xs sm:text-sm font-semibold hover:opacity-90 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shrink-0"
          >
            {isLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
            <span>Track</span>
          </button>
        </form>
      </div>

      {/* 3. Error Banner */}
      {errorMsg && (
        <div className="p-3 rounded-lg border border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2 animate-fadeIn">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* 4. Tracking Result Card (Compact & Complete) */}
      {submission && (
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-5 sm:p-6 shadow-xs space-y-6 animate-fadeIn">
          
          {/* Top Info Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[var(--border-subtle)]">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-lg sm:text-xl font-bold text-[var(--accent-navy)] dark:text-[var(--accent-gold)]">
                  {submission.trackingNumber}
                </span>
                <button
                  onClick={handleCopyId}
                  className="p-1 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-page)] hover:border-[var(--accent-gold)] text-[var(--text-secondary)] transition-all cursor-pointer"
                  title="Copy Tracking ID"
                >
                  {isCopiedId ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <h2 className="font-serif font-bold text-sm sm:text-base text-[var(--text-primary)] line-clamp-1">
                {submission.title}
              </h2>
            </div>

            {/* Current Status Pill */}
            {statusBadge && (
              <div className="flex items-center gap-2 shrink-0">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-mono font-bold tracking-wide ${statusBadge.bg}`}>
                  <span className={`w-2 h-2 rounded-full ${statusBadge.dot}`} />
                  <span>{statusBadge.label}</span>
                </span>
                <a
                  href={`mailto:thecrimeandsocietyreview@gmail.com?subject=Query%20-%20${encodeURIComponent(submission.trackingNumber)}`}
                  className="p-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  title="Contact Editorial Desk"
                >
                  <Mail className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>

          {/* Details Row */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[var(--text-secondary)] font-serif">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
              <span>{submission.authorName}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
              <span>{submission.articleType}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
              <span>Submitted: {submission.submittedAt}</span>
            </div>
          </div>

          {/* 5. Clean Connecting LINE & DOTS Stepper (Exactly 6 Admin Stages) */}
          <div className="pt-2 pb-1">
            <div className="relative">
              
              {/* Connecting Background Line */}
              <div className="absolute top-4 left-4 right-4 h-0.5 bg-[var(--border-subtle)] -translate-y-1/2 z-0 hidden sm:block" />
              
              {/* Active Progress Line */}
              <div 
                className="absolute top-4 left-4 h-0.5 bg-[var(--accent-gold)] -translate-y-1/2 z-0 hidden sm:block transition-all duration-500"
                style={{
                  width: `${Math.max(0, Math.min(100, ((currentStageNumber - 1) / (PIPELINE_STAGES.length - 1)) * 100))}%`
                }}
              />

              {/* Dots & Labels */}
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-y-5 gap-x-2 relative z-10">
                {PIPELINE_STAGES.map((s) => {
                  const isCompleted = currentStageNumber > s.stage;
                  const isCurrent = currentStageNumber === s.stage;
                  const isPending = currentStageNumber < s.stage;

                  return (
                    <div key={s.stage} className="flex flex-col items-center text-center group">
                      
                      {/* Dot Circle */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 ${
                        isCompleted
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : isCurrent
                          ? 'bg-[var(--accent-gold)] text-black ring-4 ring-[var(--accent-gold)]/20 shadow-md animate-pulse'
                          : 'bg-[var(--bg-card)] border-2 border-[var(--border-strong)] text-[var(--text-muted)]'
                      }`}>
                        {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : s.stage}
                      </div>

                      {/* Status Name */}
                      <span className={`text-[11px] sm:text-xs mt-2 font-medium tracking-tight leading-tight ${
                        isCurrent 
                          ? 'text-[var(--accent-gold)] font-bold' 
                          : isCompleted 
                          ? 'text-[var(--text-primary)] font-semibold' 
                          : 'text-[var(--text-muted)]'
                      }`}>
                        {s.label}
                      </span>

                      {/* Small Active Tag */}
                      {isCurrent && (
                        <span className="text-[9px] font-mono uppercase tracking-wider text-[var(--accent-gold)] font-bold mt-0.5">
                          • Current
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

          {/* Decision Notes (if any feedback from admin) */}
          {submission.decisionNotes && (
            <div className="p-3 rounded-xl border border-[var(--accent-gold)]/30 bg-[var(--accent-gold)]/5 text-xs space-y-1">
              <span className="text-[10px] font-mono uppercase font-bold text-[var(--accent-gold)] block">
                Editorial Note:
              </span>
              <p className="font-serif text-[var(--text-primary)] leading-relaxed">
                {submission.decisionNotes}
              </p>
            </div>
          )}

        </div>
      )}

    </div>
  );
};

export default TrackPage;
