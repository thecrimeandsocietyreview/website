import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sun, 
  Moon, 
  BookOpen, 
  Menu, 
  X,
  ChevronDown
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import RollText from '@/animata/text/roll-text';

export const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const themeDropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (themeDropdownRef.current && !themeDropdownRef.current.contains(event.target as Node)) {
        setThemeDropdownOpen(false);
      }
    };
    if (themeDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [themeDropdownOpen]);

  const navLinks = [
    { label: 'Home', fullLabel: 'Home', path: '/' },
    { label: 'About', fullLabel: 'About the Journal', path: '/about' },
    { label: 'Aim & Scope', fullLabel: 'Aim and Scope', path: '/aims-scope' },
    { label: 'Editorial Board', fullLabel: 'Editorial Board', path: '/editorial-board' },
    { label: 'Advisory Board', fullLabel: 'Advisory Board', path: '/advisory-board' },
    { label: 'Rashomon Approach', fullLabel: 'The Rashomon Approach', path: '/rashomon-approach' },
    { label: 'Current Issue', fullLabel: 'Current Issue', path: '/current-issue' },
    { label: 'Submission', fullLabel: 'Submission Guidelines', path: '/submit' },
    { label: 'Track', fullLabel: 'Track Manuscript', path: '/track' },
    { label: 'Contact Us', fullLabel: 'Contact Us', path: '/contact' },
  ];

  const currentThemeDetails = {
    light: { label: 'Light', icon: Sun, color: 'text-amber-500' },
    sepia: { label: 'Sepia', icon: BookOpen, color: 'text-[#A78B60]' },
    dark: { label: 'Dark', icon: Moon, color: 'text-sky-400' }
  }[theme] || { label: 'Theme', icon: Sun, color: 'text-amber-500' };

  const CurrentThemeIcon = currentThemeDetails.icon;

  return (
    <header 
      className="sticky top-0 z-40 w-full border-b border-[var(--border-subtle)] bg-[var(--bg-card)] transition-colors shadow-2xs"
      style={{ backgroundColor: 'var(--bg-card)' }}
    >
      <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-2">
        
        {/* Brand Logo & Title */}
        <Link to="/" className="flex items-center gap-2 group shrink-0 py-1">
          <img 
            src="/logo.png" 
            alt="The Crime & Society Review Logo" 
            className="h-10 w-auto sm:h-11 object-contain bg-transparent shrink-0" 
          />
          <span className="font-serif text-sm sm:text-base lg:text-sm xl:text-base font-bold tracking-tight text-[var(--text-primary)] group-hover:text-[var(--accent-navy)] transition-colors leading-tight whitespace-nowrap">
            The Crime &amp; Society Review
          </span>
        </Link>

        {/* Primary Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 text-[11px] xl:text-xs font-medium">
          {navLinks.map((item) => {
            const isActive = location.pathname === item.path;
            const isSubmit = item.path === '/submit';
            return (
              <Link
                key={item.path}
                to={item.path}
                title={item.fullLabel}
                className={`group/roll px-1.5 xl:px-2 py-1 rounded-lg transition-all whitespace-nowrap ${
                  isActive
                    ? 'text-[var(--accent-navy)] font-bold bg-[var(--accent-navy)]/10 shadow-2xs'
                    : isSubmit
                    ? 'text-[var(--accent-gold)] font-semibold hover:bg-[var(--accent-gold)]/10'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)]'
                }`}
              >
                <RollText
                  text={item.label}
                  groupHover={true}
                  disabled={isActive}
                  stagger="character"
                  staggerMs={18}
                  durationMs={240}
                  className="cursor-pointer"
                />
              </Link>
            );
          })}
        </nav>

        {/* Right Controls: Single Theme Dropdown Button & Mobile Hamburger */}
        <div className="flex items-center gap-2 shrink-0 pr-1 sm:pr-2">
          {/* Compact Single-Button Theme Dropdown (Icon Only to Prevent Cutoff) */}
          <div className="relative" ref={themeDropdownRef}>
            <button
              onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
              className="w-8 h-8 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] hover:border-[var(--accent-gold)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all flex items-center justify-center cursor-pointer shadow-2xs shrink-0"
              title={`Theme: ${currentThemeDetails.label}. Click to select theme.`}
              aria-label="Change Theme"
              aria-expanded={themeDropdownOpen}
            >
              <CurrentThemeIcon className={`w-4 h-4 ${currentThemeDetails.color}`} />
            </button>

            {/* Dropdown Menu (Anchored to right edge) */}
            {themeDropdownOpen && (
              <div 
                className="absolute right-0 top-full mt-2 w-36 rounded-xl border border-[var(--border-strong)] p-1.5 shadow-xl z-50 animate-fadeIn space-y-0.5 backdrop-blur-md"
                style={{ backgroundColor: 'var(--bg-card)' }}
              >
                <div className="px-2 py-1 text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider font-semibold border-b border-[var(--border-subtle)] mb-1">
                  Theme Mode
                </div>
                
                <button
                  onClick={() => {
                    setTheme('light');
                    setThemeDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-serif transition-colors cursor-pointer ${
                    theme === 'light'
                      ? 'bg-[var(--accent-gold)]/15 text-[var(--text-primary)] font-bold'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                    <span>Light</span>
                  </span>
                  {theme === 'light' && <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)]" />}
                </button>

                <button
                  onClick={() => {
                    setTheme('sepia');
                    setThemeDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-serif transition-colors cursor-pointer ${
                    theme === 'sepia'
                      ? 'bg-[#A78B60]/15 text-[var(--text-primary)] font-bold'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-[#A78B60]" />
                    <span>Sepia</span>
                  </span>
                  {theme === 'sepia' && <span className="w-1.5 h-1.5 rounded-full bg-[#A78B60]" />}
                </button>

                <button
                  onClick={() => {
                    setTheme('dark');
                    setThemeDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-serif transition-colors cursor-pointer ${
                    theme === 'dark'
                      ? 'bg-slate-700/20 text-[var(--text-primary)] font-bold'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Moon className="w-3.5 h-3.5 text-sky-400" />
                    <span>Dark</span>
                  </span>
                  {theme === 'dark' && <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />}
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] cursor-pointer shrink-0"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Box Menu (Floating card with soft animation, not full screen) */}
      {mobileMenuOpen && (
        <>
          {/* Subtle click-outside backdrop */}
          <div 
            className="fixed inset-0 top-[60px] bg-black/20 backdrop-blur-[2px] z-40 lg:hidden animate-fadeIn"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          {/* Dropdown Card */}
          <div 
            style={{ backgroundColor: 'var(--bg-card)' }}
            className="absolute top-[calc(100%+8px)] right-4 w-[min(320px,calc(100vw-32px))] lg:hidden rounded-2xl border border-[var(--border-strong)] p-3 shadow-2xl z-50 animate-nav-dropdown backdrop-blur-md"
          >
            <div className="flex items-center justify-between pb-2 mb-1.5 border-b border-[var(--border-subtle)] px-2">
              <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider font-semibold">Journal Menu</span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="text-[11px] font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
              >
                Close ✕
              </button>
            </div>
            <div className="space-y-1 max-h-[70vh] overflow-y-auto pr-0.5">
              {navLinks.map((item) => {
                const isActive = location.pathname === item.path;
                const isSubmit = item.path === '/submit';
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`group/roll flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-[var(--accent-navy)]/10 text-[var(--accent-navy)] font-bold'
                        : isSubmit
                        ? 'text-[var(--accent-gold)] font-semibold hover:bg-[var(--accent-gold)]/10'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <RollText
                      text={item.label}
                      groupHover={true}
                      disabled={isActive}
                      stagger="character"
                      staggerMs={18}
                      durationMs={240}
                    />
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-navy)]"></span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
