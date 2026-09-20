import React, { useState } from 'react';
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
  Sparkles
} from 'lucide-react';
import { MOCK_SUBMISSIONS } from '../data/mockJournalData';
import { SubmissionDraft } from '../types/journal';

export const DashboardPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'author';

  // Load custom submissions from localStorage if available
  const [submissions, setSubmissions] = useState<SubmissionDraft[]>(() => {
    const saved = localStorage.getItem('csr_user_submissions');
    if (saved) {
      try {
        const userSubs = JSON.parse(saved);
        return [...userSubs, ...MOCK_SUBMISSIONS];
      } catch (e) {
        return MOCK_SUBMISSIONS;
      }
    }
    return MOCK_SUBMISSIONS;
  });

  const [selectedSub, setSelectedSub] = useState<SubmissionDraft>(submissions[0]);

  // Reviewer Sandbox State
  const [methodologyScore, setMethodologyScore] = useState<number>(8);
  const [originalityScore, setOriginalityScore] = useState<number>(9);
  const [clarityScore, setClarityScore] = useState<number>(8);
  const [reviewRecommendation, setReviewRecommendation] = useState<string>('Accept with Minor Revisions');
  const [reviewerComments, setReviewerComments] = useState<string>(
    "The manuscript represents an outstanding interdisciplinary synthesis between probabilistic digital forensics and constitutional due process. The audit of 420 criminal trials is empirically rigorous. I recommend minor revisions to clarify Daubert jurisdictional variations."
  );
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

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
            Simulated end-to-end editorial management: Author Lifecycle, Reviewer Sandboxed Console, and Editorial Kanban.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center rounded-lg border border-[var(--border-subtle)] p-0.5 bg-[var(--bg-card)] text-xs font-semibold">
          <button
            onClick={() => setSearchParams({ tab: 'author' })}
            className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
              activeTab === 'author'
                ? 'bg-[var(--accent-navy)] text-white'
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
                ? 'bg-[var(--accent-navy)] text-white'
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
                ? 'bg-[var(--accent-navy)] text-white'
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
                    <span className="capitalize text-[var(--accent-gold)] font-mono">{sub.primaryLens}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Pipeline Tracker (Col Span 8) */}
          <div className="lg:col-span-8 p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-6 shadow-sm">
            <div className="border-b border-[var(--border-subtle)] pb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-[var(--accent-gold)]">
                  Tracking Record: {selectedSub.trackingNumber}
                </span>
                <h3 className="font-serif font-bold text-xl text-[var(--text-primary)] mt-0.5">
                  {selectedSub.title}
                </h3>
                <div className="text-xs text-[var(--text-muted)] mt-1">
                  Corresponding Author: {selectedSub.authorName} • {selectedSub.authorAffiliation}
                </div>
              </div>

              {selectedSub.status === 'Published' && (
                <Link
                  to="/article/e2026-0492"
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
                  { stage: 1, name: 'Submitted', date: selectedSub.submittedAt },
                  { stage: 2, name: 'Editorial Triage', date: 'Passed (Day 2)' },
                  { stage: 3, name: 'Peer Review', date: 'Double-Blind' },
                  { stage: 4, name: 'Revisions', date: 'Approved' },
                  { stage: 5, name: 'Copyediting', date: 'JATS & Typst' },
                  { stage: 6, name: 'Published', date: 'elocation Minted' },
                ].map((s) => {
                  const isCompleted = s.stage <= selectedSub.currentStageNumber;
                  const isCurrent = s.stage === selectedSub.currentStageNumber;

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
                      <div className="text-[10px] text-[var(--text-muted)] mt-0.5">{s.date}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Communication & Audit Log */}
            <div className="space-y-3 pt-4 border-t border-[var(--border-subtle)] text-xs">
              <h4 className="font-mono font-bold uppercase text-[var(--text-muted)]">
                Editorial Decision & Reviewer Correspondence Log
              </h4>
              <div className="space-y-2">
                <div className="p-3 rounded-lg bg-[var(--bg-card-hover)] border border-[var(--border-subtle)] space-y-1">
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="font-bold text-[var(--accent-navy)]">Managing Editor Decision Notice</span>
                    <span className="text-[var(--text-muted)]">28 February 2026</span>
                  </div>
                  <p className="text-[var(--text-secondary)] font-serif">
                    "We are pleased to confirm that following two rounds of double-blind review by domain specialists in forensic pathology and criminal procedure, your manuscript has been formally accepted for rolling publication as Version of Record."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 2: REVIEWER SANDBOXED CONSOLE */}
      {/* ===================================================================== */}
      {activeTab === 'reviewer' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Manuscript Preview (Col Span 7) */}
          <div className="lg:col-span-7 p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
              <span className="font-mono text-xs text-[var(--accent-gold)] font-bold">
                Assigned Review: CSR-2026-0922
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-[var(--accent-navy)]/10 text-[var(--accent-navy)] font-mono font-semibold">
                Due in 12 Days
              </span>
            </div>

            <h3 className="font-serif font-bold text-xl text-[var(--text-primary)]">
              Neurocriminological Predictions in Parole Boards: An Interdisciplinary Critique of EEG Lie-Detection Claims
            </h3>

            <div className="p-3 rounded-lg bg-[var(--bg-card-hover)] border border-[var(--border-subtle)] text-xs space-y-1 font-serif leading-relaxed text-[var(--text-secondary)]">
              <span className="font-sans font-bold text-[var(--text-primary)] block">Blinded Abstract:</span>
              Evaluating the empirical validity and human rights implications of encephalographic memory probes in parole determinations across four European correctional jurisdictions...
            </div>

            <div className="space-y-3 text-xs font-serif leading-relaxed text-[var(--text-secondary)]">
              <h4 className="font-sans font-bold text-sm text-[var(--text-primary)]">Excerpt: Section 2. Methodological Calibration</h4>
              <p>
                The assertion that P300 wave latency correlates deterministically with experiential recognition of crime scenes overlooks cognitive confounding caused by post-traumatic stress disorder and neurodiversity. In our double-blind laboratory trials with 84 participants, false positive rates reached 14.2% when emotionally charged imagery was introduced...
              </p>
            </div>
          </div>

          {/* Sandboxed Evaluation Rubric (Col Span 5) */}
          <div className="lg:col-span-5 p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-5 shadow-sm">
            <div className="border-b border-[var(--border-subtle)] pb-3">
              <h3 className="font-serif font-bold text-base text-[var(--text-primary)] flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[var(--accent-gold)]" /> Structured Evaluation Rubric
              </h3>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Rate methodology, originality, and conceptual alignment with the Rashomon Approach.
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

      {/* ===================================================================== */}
      {/* TAB 3: EDITORIAL BOARD KANBAN WORKFLOW */}
      {/* ===================================================================== */}
      {activeTab === 'editor' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[var(--text-muted)]">Live Submissions Triage Board</span>
            <span className="font-bold text-[var(--accent-gold)]">3 Submissions Active</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Column 1: Triage */}
            <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-3">
              <div className="flex items-center justify-between font-mono text-xs font-bold text-[var(--text-primary)] border-b border-[var(--border-subtle)] pb-2">
                <span>01. Triage (1)</span>
                <span className="text-[var(--text-muted)]">●</span>
              </div>
              <div className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] text-xs space-y-1.5">
                <span className="font-mono text-[10px] text-[var(--accent-gold)] font-bold">CSR-2026-0941</span>
                <h5 className="font-serif font-bold text-[var(--text-primary)]">Environmental Criminology in Offshore Marine Protected Areas</h5>
                <p className="text-[11px] text-[var(--text-muted)]">Author: Capt. Liam Gallagher</p>
                <div className="pt-2 flex justify-end">
                  <button className="text-[11px] text-[var(--accent-navy)] font-semibold hover:underline">Assign Reviewers →</button>
                </div>
              </div>
            </div>

            {/* Column 2: Under Review */}
            <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-3">
              <div className="flex items-center justify-between font-mono text-xs font-bold text-[var(--text-primary)] border-b border-[var(--border-subtle)] pb-2">
                <span>02. Double-Blind Review (1)</span>
                <span className="text-amber-500">●</span>
              </div>
              <div className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] text-xs space-y-1.5">
                <span className="font-mono text-[10px] text-[var(--accent-gold)] font-bold">CSR-2026-0922</span>
                <h5 className="font-serif font-bold text-[var(--text-primary)]">Neurocriminological Predictions in Parole Boards</h5>
                <p className="text-[11px] text-[var(--text-muted)]">2 Referees Assigned (1 report received)</p>
                <div className="pt-2 flex justify-end">
                  <button className="text-[11px] text-[var(--accent-navy)] font-semibold hover:underline">View Reports →</button>
                </div>
              </div>
            </div>

            {/* Column 3: Copyediting */}
            <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-3">
              <div className="flex items-center justify-between font-mono text-xs font-bold text-[var(--text-primary)] border-b border-[var(--border-subtle)] pb-2">
                <span>03. JATS & Typst Layout (0)</span>
                <span className="text-[var(--text-muted)]">●</span>
              </div>
              <div className="text-center py-8 text-[var(--text-muted)] text-xs font-mono">
                Queue Clear
              </div>
            </div>

            {/* Column 4: Published */}
            <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-3">
              <div className="flex items-center justify-between font-mono text-xs font-bold text-[var(--text-primary)] border-b border-[var(--border-subtle)] pb-2">
                <span>04. Version of Record (1)</span>
                <span className="text-emerald-500">●</span>
              </div>
              <div className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] text-xs space-y-1.5">
                <span className="font-mono text-[10px] text-emerald-600 font-bold">Art. e10492</span>
                <h5 className="font-serif font-bold text-[var(--text-primary)]">The Rashomon Paradigm in Digital Forensic Epistemology</h5>
                <p className="text-[11px] text-[var(--text-muted)]">DOI: 10.59821/csr.2026.10492</p>
                <div className="pt-2 flex justify-end">
                  <Link to="/article/e2026-0492" className="text-[11px] text-emerald-600 font-semibold hover:underline">Live on Web →</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
