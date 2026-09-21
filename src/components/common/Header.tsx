import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  Sun, 
  Moon, 
  BookOpen, 
  Send, 
  Scale, 
  ChevronDown, 
  Menu, 
  X, 
  CheckCircle2, 
  Layers
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { JOURNAL_METADATA } from '../../data/mockJournalData';
import { CommandPalette } from './CommandPalette';

export const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setAboutDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const aboutDropdownLinks = [
    { label: 'About Journal', path: '/about' },
    { label: 'Aims & Scope', path: '/aims-scope' },
    { label: 'Editorial Philosophy', path: '/editorial-philosophy' },
    { label: 'Rashomon Approach', path: '/rashomon-approach' },
    { label: 'Journal History', path: '/history' },
    { label: 'Publisher', path: '/publisher' },
    { label: 'Editorial Board', path: '/editorial-board' },
  ];

  const isAboutActive = aboutDropdownLinks.some(l => location.pathname === l.path);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[var(--border-subtle)] bg-[var(--bg-card)]/95 backdrop-blur-md transition-colors shadow-2xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-5 py-2 flex items-center justify-between gap-2">
          
          {/* LEFT: Compact Brand Logo & Title */}
          <Link to="/" className="flex items-center gap-2 sm:gap-2.5 group shrink min-w-0 py-0.5">
            <img 
              src="/logo.png" 
              alt="The Crime & Society Review Logo" 
              className="h-10 w-10 sm:h-12 sm:w-12 md:h-13 md:w-13 rounded-xl object-contain bg-white shadow-xs border border-[var(--border-strong)] group-hover:scale-105 transition-transform shrink-0 p-0.5" 
            />
            <div className="flex flex-col justify-center min-w-0">
              <span className="block font-serif text-xs sm:text-sm md:text-base font-bold tracking-tight text-[var(--text-primary)] group-hover:text-[var(--accent-navy)] transition-colors leading-tight truncate max-w-[170px] xs:max-w-[240px] sm:max-w-none">
                The Crime &amp; Society Review
              </span>
              <div className="flex items-center gap-1 text-[9px] sm:text-[10px] font-mono text-[var(--text-muted)] mt-0.5 truncate">
                <span className="text-[var(--accent-gold)] font-bold shrink-0">ISSN {JOURNAL_METADATA.issnOnline}</span>
                <span className="hidden xs:inline text-[var(--border-strong)]">•</span>
                <span className="hidden xs:inline text-emerald-600 dark:text-emerald-400 font-semibold shrink-0">UGC-CARE</span>
                <span className="hidden sm:inline text-[var(--border-strong)]">•</span>
                <span className="hidden sm:inline text-blue-600 dark:text-blue-400 font-semibold shrink-0">Gold OA</span>
              </div>
            </div>
          </Link>

          {/* CENTER: Primary Desktop Navigation (Desktop Only) */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 text-[11px] xl:text-xs font-medium shrink-0">
            
            {/* 1. Home */}
            <Link
              to="/"
              className={`px-2.5 py-1.5 rounded-md transition-colors ${
                location.pathname === '/'
                  ? 'text-[var(--accent-navy)] font-bold bg-[var(--accent-navy)]/10'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)]'
              }`}
            >
              Home
            </Link>

            {/* 2. About ▼ (Dropdown) */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                className={`px-2.5 py-1.5 rounded-md transition-colors flex items-center gap-1 cursor-pointer ${
                  isAboutActive
                    ? 'text-[var(--accent-navy)] font-bold bg-[var(--accent-navy)]/10'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)]'
                }`}
              >
                <span>About</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {aboutDropdownOpen && (
                <div className="absolute top-full left-0 mt-1.5 w-56 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-card)] p-1.5 shadow-xl space-y-0.5 animate-fadeIn z-50 text-xs">
                  {aboutDropdownLinks.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setAboutDropdownOpen(false)}
                      className={`block px-3 py-2 rounded-lg transition-colors ${
                        location.pathname === item.path
                          ? 'bg-[var(--accent-navy)]/10 text-[var(--accent-navy)] font-semibold'
                          : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* 3. Research */}
            <Link
              to="/articles"
              className={`px-2.5 py-1.5 rounded-md transition-colors ${
                location.pathname === '/articles'
                  ? 'text-[var(--accent-navy)] font-bold bg-[var(--accent-navy)]/10'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)]'
              }`}
            >
              Research
            </Link>

            {/* 4. Issues */}
            <Link
              to="/issues"
              className={`px-2.5 py-1.5 rounded-md transition-colors ${
                location.pathname === '/issues'
                  ? 'text-[var(--accent-navy)] font-bold bg-[var(--accent-navy)]/10'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)]'
              }`}
            >
              Issues
            </Link>

            {/* 5. For Authors */}
            <Link
              to="/for-authors"
              className={`px-2.5 py-1.5 rounded-md transition-colors ${
                location.pathname === '/for-authors'
                  ? 'text-[var(--accent-navy)] font-bold bg-[var(--accent-navy)]/10'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)]'
              }`}
            >
              For Authors
            </Link>

            {/* 6. For Reviewers */}
            <Link
              to="/for-reviewers"
              className={`px-2.5 py-1.5 rounded-md transition-colors ${
                location.pathname === '/for-reviewers'
                  ? 'text-[var(--accent-navy)] font-bold bg-[var(--accent-navy)]/10'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)]'
              }`}
            >
              For Reviewers
            </Link>

          </nav>

          {/* RIGHT: Compact Controls (Search + Theme + Submit) */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Search 🔍 Pill */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] hover:border-[var(--accent-gold)] text-[var(--text-secondary)] text-xs transition-colors cursor-pointer"
              title="Search Articles, Authors, DOI (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
              <span className="hidden md:inline text-[11px] font-mono">Search</span>
              <kbd className="hidden xl:inline text-[9px] px-1 py-0.2 rounded bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-muted)] font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Desktop 3-Mode Theme Segmented Control */}
            <div className="hidden sm:flex items-center border border-[var(--border-subtle)] rounded-lg p-0.5 bg-[var(--bg-card-hover)]">
              <button
                onClick={() => setTheme('light')}
                className={`p-1 sm:p-1.5 rounded transition-all cursor-pointer ${
                  theme === 'light' 
                    ? 'bg-[var(--accent-gold)] text-slate-950 shadow-2xs' 
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
                title="Light Theme"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setTheme('sepia')}
                className={`p-1 sm:p-1.5 rounded transition-all cursor-pointer ${
                  theme === 'sepia' 
                    ? 'bg-[#A78B60] text-white shadow-2xs' 
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
                title="Sepia Reading Theme"
              >
                <BookOpen className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setTheme('dark')}
                className={`p-1 sm:p-1.5 rounded transition-all cursor-pointer ${
                  theme === 'dark' 
                    ? 'bg-slate-700 text-white shadow-2xs' 
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
                title="Dark Theme"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile Single-Button Theme Toggle (Cycles Light -> Dark -> Sepia) */}
            <button
              onClick={() => {
                if (theme === 'light') setTheme('dark');
                else if (theme === 'dark') setTheme('sepia');
                else setTheme('light');
              }}
              className="sm:hidden p-1.5 rounded-lg border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] cursor-pointer"
              title="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Moon className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
              ) : theme === 'sepia' ? (
                <BookOpen className="w-3.5 h-3.5 text-[#A78B60]" />
              ) : (
                <Sun className="w-3.5 h-3.5 text-amber-500" />
              )}
            </button>

            {/* Submit Manuscript Button (Tablet & Desktop) */}
            <Link
              to="/submit"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--accent-gold)] hover:bg-[var(--accent-gold-hover)] text-slate-950 font-bold text-xs shadow-2xs transition-all hover:scale-102 shrink-0"
            >
              <Send className="w-3 h-3" />
              <span>Submit</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] cursor-pointer shrink-0"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[var(--border-subtle)] bg-[var(--bg-card)] px-4 py-4 space-y-3 shadow-xl animate-fadeIn max-h-[85vh] overflow-y-auto">
            
            {/* Top Primary CTA in Mobile Drawer */}
            <Link
              to="/submit"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[var(--accent-gold)] hover:bg-[var(--accent-gold-hover)] text-slate-950 font-bold text-xs shadow-sm transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Manuscript Online</span>
            </Link>

            {/* Mobile Theme Selector inside Drawer */}
            <div className="flex items-center justify-between p-2 rounded-xl bg-[var(--bg-page)] border border-[var(--border-subtle)]">
              <span className="text-xs font-mono text-[var(--text-muted)]">Theme:</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setTheme('light')}
                  className={`px-2 py-1 rounded text-xs font-mono flex items-center gap-1 ${
                    theme === 'light' ? 'bg-[var(--accent-gold)] text-slate-950 font-bold' : 'text-[var(--text-secondary)]'
                  }`}
                >
                  <Sun className="w-3 h-3" /> Light
                </button>
                <button
                  onClick={() => setTheme('sepia')}
                  className={`px-2 py-1 rounded text-xs font-mono flex items-center gap-1 ${
                    theme === 'sepia' ? 'bg-[#A78B60] text-white font-bold' : 'text-[var(--text-secondary)]'
                  }`}
                >
                  <BookOpen className="w-3 h-3" /> Sepia
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`px-2 py-1 rounded text-xs font-mono flex items-center gap-1 ${
                    theme === 'dark' ? 'bg-slate-700 text-white font-bold' : 'text-[var(--text-secondary)]'
                  }`}
                >
                  <Moon className="w-3 h-3" /> Dark
                </button>
              </div>
            </div>

            {/* Core Navigation Links */}
            <div className="space-y-1 pt-1">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                  location.pathname === '/' ? 'bg-[var(--accent-navy)]/10 text-[var(--accent-navy)] font-bold' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]'
                }`}
              >
                Home
              </Link>

              <div className="py-1">
                <span className="px-3 text-[10px] font-mono uppercase text-[var(--text-muted)] font-bold">
                  About the Journal
                </span>
                {aboutDropdownLinks.map(item => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-1.5 text-xs transition-colors ${
                      location.pathname === item.path ? 'text-[var(--accent-navy)] font-bold' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <Link
                to="/articles"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                  location.pathname === '/articles' ? 'bg-[var(--accent-navy)]/10 text-[var(--accent-navy)] font-bold' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]'
                }`}
              >
                Research &amp; Articles
              </Link>

              <Link
                to="/issues"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                  location.pathname === '/issues' ? 'bg-[var(--accent-navy)]/10 text-[var(--accent-navy)] font-bold' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]'
                }`}
              >
                Issues &amp; Archive
              </Link>

              <Link
                to="/for-authors"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                  location.pathname === '/for-authors' ? 'bg-[var(--accent-navy)]/10 text-[var(--accent-navy)] font-bold' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]'
                }`}
              >
                For Authors
              </Link>

              <Link
                to="/for-reviewers"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                  location.pathname === '/for-reviewers' ? 'bg-[var(--accent-navy)]/10 text-[var(--accent-navy)] font-bold' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]'
                }`}
              >
                For Reviewers
              </Link>

              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                  location.pathname === '/contact' ? 'bg-[var(--accent-navy)]/10 text-[var(--accent-navy)] font-bold' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]'
                }`}
              >
                Contact Editorial Office
              </Link>
            </div>
          </div>
        )}
      </header>

      <CommandPalette isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
