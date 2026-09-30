import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  Globe
} from 'lucide-react';
import { CONTACT_DETAILS } from '../data/mockJournalData';

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
      <div className="border-b border-[var(--border-subtle)] pb-6">
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[var(--text-primary)] tracking-tight">
          Contact The Crime &amp; Society Review
        </h1>
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
                    placeholder="Enter your full name"
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
          
          {/* Editorial Office Card (FEATURED DARK CARD) */}
          <div className="p-6 sm:p-7 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white space-y-5 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-amber-400 relative z-10">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Editorial Office &amp; Secretariat</span>
            </div>
            
            <div className="space-y-3.5 text-xs sm:text-sm font-serif text-slate-300 relative z-10">
              <div>
                <strong className="text-white block font-sans text-base">
                  The Crime &amp; Society Review Editorial Office
                </strong>
                <p className="mt-1 text-slate-300">
                  Sector 9, Institutional Area, New Delhi – 110003, India
                </p>
              </div>

              {/* Official Emails */}
              <div className="pt-3 border-t border-slate-800 space-y-2 font-mono text-xs">
                <div className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Editorial Office:</span>
                    <a href="mailto:editor@thecrimeandsocietyreview.org" className="text-sky-400 hover:text-sky-300 transition-colors font-medium">
                      editor@thecrimeandsocietyreview.org
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 pt-1.5">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Manuscript Submissions:</span>
                    <a href="mailto:submissions@thecrimeandsocietyreview.org" className="text-sky-400 hover:text-sky-300 transition-colors font-medium">
                      submissions@thecrimeandsocietyreview.org
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-1 text-xs font-mono text-slate-400 relative z-10">
              <div className="flex items-center gap-2 text-slate-200 font-semibold">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Editorial Desk Hours</span>
              </div>
              <p>{CONTACT_DETAILS.submissions.deskHours}</p>
              <p className="text-[11px] text-slate-500">Closed on Sundays and National Gazette Holidays.</p>
            </div>
          </div>

          {/* Academic & Bibliographic Repositories */}
          <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-3">
            <h3 className="font-serif font-bold text-base text-[var(--text-primary)] flex items-center gap-2">
              <Globe className="w-4 h-4 text-[var(--accent-gold)]" />
              <span>Academic Indexing &amp; Repositories</span>
            </h3>
            <div className="space-y-2 text-xs font-mono">
              <div className="p-3 rounded-lg bg-[var(--bg-page)] border border-[var(--border-subtle)] flex items-center justify-between">
                <span className="font-medium text-[var(--text-primary)]">Google Scholar</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  Coming Soon
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
