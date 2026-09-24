import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sun, 
  Moon, 
  BookOpen, 
  Menu, 
  X,
  Scale
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Submission', path: '/submit' },
    { label: 'About the Journal', path: '/about' },
    { label: 'Editorial Board', path: '/editorial-board' },
    { label: 'The Rashomon Approach', path: '/rashomon-approach' },
    { label: 'Current Issue', path: '/current-issue' },
    { label: 'Aims & Scope', path: '/aims-scope' },
    { label: 'Contact Us', path: '/contact' },
  ];

  return (
    <header 
      className="sticky top-0 z-40 w-full border-b border-[var(--border-subtle)] bg-[var(--bg-card)] transition-colors shadow-2xs"
      style={{ backgroundColor: 'var(--bg-card)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        
        {/* Brand Logo & Title */}
        <Link to="/" className="flex items-center gap-2.5 group shrink min-w-0 py-1">
          <img 
            src="/logo.png" 
            alt="The Crime & Society Review Logo" 
            className="h-11 w-auto sm:h-12 md:h-13 object-contain bg-transparent group-hover:scale-105 transition-transform shrink-0" 
          />
          <span className="font-serif text-base sm:text-lg md:text-xl font-bold tracking-tight text-[var(--text-primary)] group-hover:text-[var(--accent-navy)] transition-colors leading-tight truncate">
            The Crime &amp; Society Review
          </span>
        </Link>

        {/* Primary Desktop Navigation: 7 Core Items */}
        <nav className="hidden lg:flex items-center gap-0.5 text-xs font-medium shrink-0">
          {navLinks.map((item) => {
            const isActive = location.pathname === item.path;
            const isSubmit = item.path === '/submit';
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-2.5 py-1.5 rounded-lg transition-all ${
                  isActive
                    ? 'text-[var(--accent-navy)] font-bold bg-[var(--accent-navy)]/10 shadow-2xs'
                    : isSubmit
                    ? 'text-[var(--accent-gold)] font-semibold hover:bg-[var(--accent-gold)]/10'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Controls: Theme Segmented Control & Mobile Hamburger */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Desktop 3-Mode Theme Segmented Control */}
          <div className="hidden sm:flex items-center border border-[var(--border-subtle)] rounded-lg p-0.5 bg-[var(--bg-card-hover)]">
            <button
              onClick={() => setTheme('light')}
              className={`p-1.5 rounded transition-all cursor-pointer ${
                theme === 'light' 
                  ? 'bg-[var(--accent-gold)] text-slate-950 shadow-2xs font-bold' 
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
              title="Light Theme"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setTheme('sepia')}
              className={`p-1.5 rounded transition-all cursor-pointer ${
                theme === 'sepia' 
                  ? 'bg-[#A78B60] text-white shadow-2xs font-bold' 
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
              title="Sepia Reading Theme"
            >
              <BookOpen className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setTheme('dark')}
              className={`p-1.5 rounded transition-all cursor-pointer ${
                theme === 'dark' 
                  ? 'bg-slate-700 text-white shadow-2xs font-bold' 
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
              title="Dark Theme"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Single-Button Theme Toggle */}
          <button
            onClick={() => {
              if (theme === 'light') setTheme('dark');
              else if (theme === 'dark') setTheme('sepia');
              else setTheme('light');
            }}
            className="sm:hidden p-2 rounded-lg border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] cursor-pointer"
            title="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Moon className="w-4 h-4 text-[var(--accent-gold)]" />
            ) : theme === 'sepia' ? (
              <BookOpen className="w-4 h-4 text-[#A78B60]" />
            ) : (
              <Sun className="w-4 h-4 text-amber-500" />
            )}
          </button>

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
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-[var(--accent-navy)]/10 text-[var(--accent-navy)] font-bold'
                        : isSubmit
                        ? 'text-[var(--accent-gold)] font-semibold hover:bg-[var(--accent-gold)]/10'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <span>{item.label}</span>
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
