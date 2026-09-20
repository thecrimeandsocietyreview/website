import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Building2, 
  Send, 
  CheckCircle2, 
  Clock, 
  HelpCircle, 
  FileText, 
  Users, 
  ExternalLink,
  Globe
} from 'lucide-react';
import { CONTACT_DETAILS, JOURNAL_METADATA } from '../data/mockJournalData';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    category: 'submission',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-16 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-[var(--border-subtle)] pb-8 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-[var(--accent-gold)]">
          <Mail className="w-4 h-4" />
          <span>Editorial Communications • Contact &amp; Enquiries</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[var(--text-primary)] tracking-tight">
          Contact The Crime &amp; Society Review
        </h1>
        <p className="font-serif italic text-base sm:text-xl text-[var(--accent-gold)]">
          Direct Inquiries to the Editorial Chambers, Peer Review Desk, and Publisher Office
        </p>
      </div>

      {/* Institutional Contact Cards (4 Sections) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Editorial Office */}
        <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-3 shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent-navy)]/10 text-[var(--accent-navy)] flex items-center justify-center">
            <Mail className="w-5 h-5 text-[var(--accent-gold)]" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-base text-[var(--text-primary)]">
              {CONTACT_DETAILS.editorialOffice.title}
            </h3>
            <span className="text-[11px] font-mono text-[var(--text-muted)] block mt-0.5">
              Manuscript Ingestion &amp; Triage
            </span>
          </div>
          <p className="text-xs text-[var(--text-secondary)] font-serif leading-relaxed">
            For correspondence regarding active submissions, peer-review status, and editorial desk inquiries.
          </p>
          <a
            href={`mailto:${CONTACT_DETAILS.editorialOffice.email}`}
            className="inline-block text-xs font-mono text-[var(--accent-navy)] font-semibold hover:underline break-all"
          >
            {CONTACT_DETAILS.editorialOffice.email}
          </a>
        </div>

        {/* Submissions & Author Support */}
        <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-3 shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent-navy)]/10 text-[var(--accent-navy)] flex items-center justify-center">
            <FileText className="w-5 h-5 text-[var(--accent-gold)]" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-base text-[var(--text-primary)]">
              {CONTACT_DETAILS.submissions.title}
            </h3>
            <span className="text-[11px] font-mono text-[var(--text-muted)] block mt-0.5">
              Pre-Submission Queries
            </span>
          </div>
          <p className="text-xs text-[var(--text-secondary)] font-serif leading-relaxed">
            Formatting guidance, LaTeX queries, special issue calls, and scope suitability checks.
          </p>
          <a
            href={`mailto:${CONTACT_DETAILS.submissions.email}`}
            className="inline-block text-xs font-mono text-[var(--accent-navy)] font-semibold hover:underline break-all"
          >
            {CONTACT_DETAILS.submissions.email}
          </a>
        </div>

        {/* Reviewer Desk */}
        <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-3 shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent-navy)]/10 text-[var(--accent-navy)] flex items-center justify-center">
            <Users className="w-5 h-5 text-[var(--accent-gold)]" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-base text-[var(--text-primary)]">
              {CONTACT_DETAILS.reviewers.title}
            </h3>
            <span className="text-[11px] font-mono text-[var(--text-muted)] block mt-0.5">
              Peer Referees &amp; Board
            </span>
          </div>
          <p className="text-xs text-[var(--text-secondary)] font-serif leading-relaxed">
            Reviewer registration, ORCID synchronization, certificates, and editorial board matters.
          </p>
          <a
            href={`mailto:${CONTACT_DETAILS.reviewers.email}`}
            className="inline-block text-xs font-mono text-[var(--accent-navy)] font-semibold hover:underline break-all"
          >
            {CONTACT_DETAILS.reviewers.email}
          </a>
        </div>

        {/* Publisher Office */}
        <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-3 shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent-navy)]/10 text-[var(--accent-navy)] flex items-center justify-center">
            <Building2 className="w-5 h-5 text-[var(--accent-gold)]" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-base text-[var(--text-primary)]">
              {CONTACT_DETAILS.publisher.title}
            </h3>
            <span className="text-[11px] font-mono text-[var(--text-muted)] block mt-0.5">
              Consortium &amp; Institutional
            </span>
          </div>
          <p className="text-xs text-[var(--text-secondary)] font-serif leading-relaxed">
            Library harvesting, indexing compliance, OAI-PMH feeds, and copyright queries.
          </p>
          <a
            href={`mailto:${CONTACT_DETAILS.publisher.email}`}
            className="inline-block text-xs font-mono text-[var(--accent-navy)] font-semibold hover:underline break-all"
          >
            {CONTACT_DETAILS.publisher.email}
          </a>
        </div>

      </div>

      {/* Main Form & Postal Chambers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7 p-8 rounded-3xl border border-[var(--border-strong)] bg-[var(--bg-card)] space-y-6 shadow-md">
          <div className="space-y-1">
            <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)]">
              Send an Official Enquiry
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-serif">
              Our editorial triage desk typically responds within 24–48 business hours.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
              <h3 className="font-serif font-bold text-lg text-[var(--text-primary)]">
                Your Message Has Been Dispatched.
              </h3>
              <p className="text-xs text-[var(--text-secondary)] max-w-md mx-auto font-serif">
                A formal ticket reference has been logged. The relevant editorial desk officer will reply to your registered email address shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs font-mono text-[var(--accent-navy)] hover:underline"
              >
                Send another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Prof. / Dr. / Advocate / Scholar"
                    className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-[var(--text-primary)] focus:outline-hidden focus:ring-1 focus:ring-[var(--accent-navy)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="scholar@university.edu"
                    className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-[var(--text-primary)] focus:outline-hidden focus:ring-1 focus:ring-[var(--accent-navy)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
                  Enquiry Category *
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-[var(--text-primary)] focus:outline-hidden focus:ring-1 focus:ring-[var(--accent-navy)]"
                >
                  <option value="submission">Submission &amp; Manuscript Triage</option>
                  <option value="peer-review">Peer Reviewer Inquiries</option>
                  <option value="editorial">Editorial Board Correspondence</option>
                  <option value="publisher">Publisher / Library Harvesting (OAI-PMH)</option>
                  <option value="ethics">Publication Ethics &amp; Retraction Inquiries</option>
                  <option value="general">General Academic Enquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
                  Subject Line *
                </label>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="e.g. Scope enquiry for Section 63 BSA empirical manuscript"
                  className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-[var(--text-primary)] focus:outline-hidden focus:ring-1 focus:ring-[var(--accent-navy)]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
                  Detailed Message *
                </label>
                <textarea
                  rows={4}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Please state your query clearly with any relevant manuscript tracking ID or DOI..."
                  className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-[var(--text-primary)] focus:outline-hidden focus:ring-1 focus:ring-[var(--accent-navy)]"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[var(--accent-navy)] text-white text-xs font-bold hover:opacity-90 transition-opacity flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Enquiry</span>
              </button>
            </form>
          )}
        </div>

        {/* Physical Address & Hours (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-[var(--accent-gold)]">
              <MapPin className="w-4 h-4" />
              <span>Editorial Chambers &amp; Registry</span>
            </div>
            
            <div className="space-y-2 text-xs sm:text-sm font-serif text-[var(--text-secondary)]">
              <strong className="text-[var(--text-primary)] block">
                The Crime &amp; Society Review Editorial Chambers
              </strong>
              <p>
                {CONTACT_DETAILS.editorialOffice.address}
              </p>
              <p className="font-mono text-xs text-[var(--text-muted)] pt-1">
                Telephone: {CONTACT_DETAILS.editorialOffice.phone}
              </p>
            </div>

            <div className="pt-3 border-t border-[var(--border-subtle)] space-y-1 text-xs font-mono text-[var(--text-muted)]">
              <div className="flex items-center gap-2 text-[var(--text-primary)] font-semibold">
                <Clock className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                <span>Editorial Desk Hours</span>
              </div>
              <p>{CONTACT_DETAILS.submissions.deskHours}</p>
              <p>Closed on Sundays and National Gazette Holidays.</p>
            </div>
          </div>

          {/* Academic & Bibliographic Links */}
          <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-3">
            <h3 className="font-serif font-bold text-base text-[var(--text-primary)] flex items-center gap-2">
              <Globe className="w-4 h-4 text-[var(--accent-gold)]" />
              <span>Academic Discovery &amp; Repositories</span>
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono text-[var(--accent-navy)]">
              <a href="https://crossref.org" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[var(--bg-page)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)] flex items-center justify-between">
                <span>Crossref</span>
                <ExternalLink className="w-3 h-3 text-[var(--text-muted)]" />
              </a>
              <a href="https://orcid.org" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[var(--bg-page)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)] flex items-center justify-between">
                <span>ORCID Hub</span>
                <ExternalLink className="w-3 h-3 text-[var(--text-muted)]" />
              </a>
              <a href="https://scholar.google.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[var(--bg-page)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)] flex items-center justify-between">
                <span>Google Scholar</span>
                <ExternalLink className="w-3 h-3 text-[var(--text-muted)]" />
              </a>
              <a href="https://doaj.org" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[var(--bg-page)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)] flex items-center justify-between">
                <span>DOAJ Directory</span>
                <ExternalLink className="w-3 h-3 text-[var(--text-muted)]" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
