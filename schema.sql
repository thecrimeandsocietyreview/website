-- =============================================================================
-- The Crime & Society Review (TCSR) — Cloudflare D1 Database Schema
-- Database: thecsrjournal-userdata
-- =============================================================================

CREATE TABLE IF NOT EXISTS submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tracking_number TEXT NOT NULL UNIQUE,
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL,
  author_phone TEXT NOT NULL,
  title TEXT NOT NULL,
  article_type TEXT NOT NULL,
  abstract TEXT NOT NULL,
  keywords TEXT NOT NULL,
  blind_file_key TEXT NOT NULL,
  blind_file_name TEXT NOT NULL,
  blind_file_size TEXT NOT NULL,
  author_file_key TEXT NOT NULL,
  author_file_name TEXT NOT NULL,
  author_file_size TEXT NOT NULL,
  editor_message TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'Submitted',
  stage_number INTEGER NOT NULL DEFAULT 1,
  editorial_decision_notes TEXT DEFAULT '',
  assigned_reviewers TEXT DEFAULT '[]',
  is_archived INTEGER NOT NULL DEFAULT 0,
  submitted_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

-- Blacklist of permanently retired tracking IDs (never re-issued even after deletion)
CREATE TABLE IF NOT EXISTS retired_tracking_ids (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tracking_number TEXT NOT NULL UNIQUE,
  retired_at TEXT NOT NULL,
  reason TEXT NOT NULL
);

-- Fast lookup indexes
CREATE INDEX IF NOT EXISTS idx_submissions_tracking ON submissions(tracking_number);
CREATE INDEX IF NOT EXISTS idx_submissions_email ON submissions(author_email);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status);
CREATE INDEX IF NOT EXISTS idx_retired_tracking ON retired_tracking_ids(tracking_number);
