import React, { useState, useEffect } from 'react';
import { Search, FileText, User, Tag, Sparkles, X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MOCK_ARTICLES, MOCK_BOARD_MEMBERS, MOCK_CONCEPT_NODES } from '../../data/mockJournalData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredArticles = MOCK_ARTICLES.filter(a => 
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.abstract.toLowerCase().includes(query.toLowerCase()) ||
    a.authors.some(auth => auth.name.toLowerCase().includes(query.toLowerCase())) ||
    a.keywords.some(k => k.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredAuthors = MOCK_BOARD_MEMBERS.filter(b => 
    b.name.toLowerCase().includes(query.toLowerCase()) ||
    b.discipline.toLowerCase().includes(query.toLowerCase())
  );

  const filteredConcepts = MOCK_CONCEPT_NODES.filter(c => 
    c.label.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-2xl bg-[var(--bg-card)] border border-[var(--border-strong)] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[var(--border-subtle)] gap-3 bg-[var(--bg-card)]">
          <Search className="w-5 h-5 text-[var(--accent-gold)] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search articles, authors, disciplines, DOIs, concepts..."
            className="w-full bg-transparent text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none text-base"
            autoFocus
          />
          <span className="text-xs px-2 py-0.5 rounded bg-[var(--border-subtle)] text-[var(--text-muted)] font-mono">
            ESC
          </span>
          <button onClick={onClose} className="p-1 hover:bg-[var(--border-subtle)] rounded text-[var(--text-muted)]">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-4 space-y-6">
          {/* Articles Section */}
          {filteredArticles.length > 0 && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2.5 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[var(--accent-navy)]" /> Articles & Publications ({filteredArticles.length})
              </div>
              <div className="space-y-1.5">
                {filteredArticles.map(art => (
                  <div
                    key={art.id}
                    onClick={() => {
                      navigate(`/article/${art.id}`);
                      onClose();
                    }}
                    className="p-2.5 rounded-lg hover:bg-[var(--bg-card-hover)] cursor-pointer transition-colors border border-transparent hover:border-[var(--border-subtle)] group flex items-start justify-between gap-3"
                  >
                    <div>
                      <div className="font-serif font-medium text-sm text-[var(--text-primary)] group-hover:text-[var(--accent-navy)] transition-colors line-clamp-1">
                        {art.title}
                      </div>
                      <div className="text-xs text-[var(--text-muted)] mt-1 flex items-center gap-2">
                        <span className="font-mono text-[var(--accent-gold)]">{art.elocationId}</span>
                        <span>•</span>
                        <span>{art.authors.map(a => a.name).join(', ')}</span>
                        <span>•</span>
                        <span>{art.publishedDate}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Concepts Section */}
          {filteredConcepts.length > 0 && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[var(--accent-gold)]" /> Interdisciplinary Concepts ({filteredConcepts.length})
              </div>
              <div className="flex flex-wrap gap-2">
                {filteredConcepts.map(c => (
                  <button
                    key={c.id}
                    onClick={() => {
                      navigate(`/explore?concept=${encodeURIComponent(c.label)}`);
                      onClose();
                    }}
                    className="px-2.5 py-1 rounded-full text-xs font-medium border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)] transition-colors flex items-center gap-1.5"
                  >
                    <Tag className="w-3 h-3" />
                    <span>{c.label}</span>
                    <span className="text-[10px] text-[var(--text-muted)] font-mono">({c.articlesCount})</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Authors / Board Section */}
          {filteredAuthors.length > 0 && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[var(--accent-crimson)]" /> Editorial & Scholars ({filteredAuthors.length})
              </div>
              <div className="space-y-1.5">
                {filteredAuthors.map(b => (
                  <div
                    key={b.id}
                    onClick={() => {
                      navigate('/editorial-board');
                      onClose();
                    }}
                    className="p-2 rounded-lg hover:bg-[var(--bg-card-hover)] cursor-pointer transition-colors flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-semibold text-[var(--text-primary)]">{b.name}</span>
                      <span className="text-[var(--text-muted)] ml-2">— {b.role}, {b.affiliation}</span>
                    </div>
                    <span className="font-mono text-[var(--accent-navy)]">{b.discipline}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredArticles.length === 0 && filteredConcepts.length === 0 && filteredAuthors.length === 0 && (
            <div className="text-center py-10 text-[var(--text-muted)] text-sm">
              No matching records found for "{query}". Try searching for <span className="text-[var(--accent-gold)]">"Rashomon"</span>, <span className="text-[var(--accent-gold)]">"Forensic"</span>, or <span className="text-[var(--accent-gold)]">"Due Process"</span>.
            </div>
          )}
        </div>

        {/* Command palette footer info */}
        <div className="px-4 py-2 border-t border-[var(--border-subtle)] bg-[var(--bg-card-hover)] flex items-center justify-between text-[11px] text-[var(--text-muted)] font-mono">
          <span>Search the entire corpus & directory</span>
          <span>Continuous Rolling Archive</span>
        </div>
      </div>
    </div>
  );
};
