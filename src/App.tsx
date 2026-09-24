import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { AlertCircle, ArrowLeft } from 'lucide-react';

// Core Pages
import { HomePage } from './pages/HomePage';
import { SubmitPage } from './pages/SubmitPage';
import { AboutPage } from './pages/AboutPage';
import { EditorialBoardPage } from './pages/EditorialBoardPage';
import { RashomonPage } from './pages/RashomonPage';
import { IssuesPage } from './pages/IssuesPage';
import { AimsScopePage } from './pages/AimsScopePage';
import { ContactPage } from './pages/ContactPage';

// Scroll to top automatically on route changes
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Clean 404 Component
const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6 animate-fadeIn">
      <div className="w-14 h-14 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto border border-amber-500/30">
        <AlertCircle className="w-7 h-7" />
      </div>
      <h1 className="font-serif text-3xl font-bold text-[var(--text-primary)]">
        404 — Page Not Found
      </h1>
      <p className="text-sm text-[var(--text-secondary)] font-serif leading-relaxed">
        The requested page does not exist or has been restructured into our core sections.
      </p>
      <div className="pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--accent-navy)] text-white text-xs font-semibold hover:opacity-90 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Journal Home</span>
        </Link>
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col w-full bg-[var(--bg-page)] text-[var(--text-primary)] transition-colors">
          <Header />
          <main className="flex-1 w-full">
            <Routes>
              {/* 1. Home */}
              <Route path="/" element={<HomePage />} />

              {/* 2. Submission */}
              <Route path="/submit" element={<SubmitPage />} />

              {/* 3. About the Journal */}
              <Route path="/about" element={<AboutPage />} />

              {/* 4. Editorial Board */}
              <Route path="/editorial-board" element={<EditorialBoardPage />} />

              {/* 5. The Rashomon Approach (New Page after Editorial Nav) */}
              <Route path="/rashomon-approach" element={<RashomonPage />} />

              {/* 6. Current Issue */}
              <Route path="/current-issue" element={<IssuesPage />} />

              {/* 7. Aims & Scope */}
              <Route path="/aims-scope" element={<AimsScopePage />} />

              {/* 8. Contact Us */}
              <Route path="/contact" element={<ContactPage />} />

              {/* Clean Redirects */}
              <Route path="/issues" element={<Navigate to="/current-issue" replace />} />
              <Route path="/articles" element={<Navigate to="/current-issue" replace />} />
              <Route path="/archive" element={<Navigate to="/current-issue" replace />} />
              <Route path="/for-authors" element={<Navigate to="/submit" replace />} />
              <Route path="/for-reviewers" element={<Navigate to="/editorial-board" replace />} />
              <Route path="/history" element={<Navigate to="/about" replace />} />
              <Route path="/publisher" element={<Navigate to="/about" replace />} />
              <Route path="/editorial-philosophy" element={<Navigate to="/editorial-board" replace />} />
              <Route path="/ethics" element={<Navigate to="/about" replace />} />
              <Route path="/explore" element={<Navigate to="/aims-scope" replace />} />

              {/* 404 Fallback */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
