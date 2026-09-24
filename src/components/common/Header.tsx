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
    { label: 'Editorial Board', path: '/editorial-board' },
    { label: 'About the Journal', path: '/about' },
    { label: 'Aims & Scope', path: '/aims-scope' },
    { label: 'Rashomon Approach', path: '/rashomon-approach' },
    { label: 'Contact Us', path: '/contact' },
  ];

  return (
    <header 
      className="sticky top-0 z-40 w-full border-b border-[var(--border-subtle)] bg-[var(--bg-card)] transition-colors shadow-2xs"
      style={{ backgroundColor: 'var(--bg-card)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Title */}
        <Link to="/" className="flex items-center gap-3 group shrink min-w-0 py-1">
          <img 
            src="/logo.png" 
            alt="The Crime & Society Review Logo" 
            className="h-12 w-auto sm:h-14 md:h-15 object-contain bg-transparent group-hover:scale-105 transition-transform shrink-0" 
          />
          <span className="font-serif text-base sm:text-lg md:text-xl font-bold tracking-tight text-[var(--text-primary)] group-hover:text-[var(--accent-navy)] transition-colors leading-tight truncate">
            The Crime &amp; Society Review
          </span>
        </Link>

        {/* Primary Desktop Navigation: ONLY 4 ITEMS */}
        <nav className="hidden md:flex items-center gap-1 text-xs font-medium shrink-0">
          {navLinks.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  isActive
                    ? 'text-[var(--accent-navy)] font-bold bg-[var(--accent-navy)]/10'
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
            className="md:hidden p-2 rounded-lg border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] cursor-pointer shrink-0"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay (anchored below header so page content does not shift) */}
      {mobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 top-[60px] bg-black/40 backdrop-blur-xs z-40 md:hidden animate-fadeIn"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div 
            style={{ backgroundColor: 'var(--bg-card)' }}
            className="absolute top-full left-0 right-0 w-full md:hidden border-b border-[var(--border-subtle)] px-4 py-4 space-y-2 shadow-2xl z-50 animate-fadeIn"
          >
            {navLinks.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[var(--accent-navy)]/10 text-[var(--accent-navy)] font-bold'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
