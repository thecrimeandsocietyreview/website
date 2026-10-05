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
import { AdvisoryBoardPage } from './pages/AdvisoryBoardPage';
import { RashomonPage } from './pages/RashomonPage';
import { IssuesPage } from './pages/IssuesPage';
import { AimsScopePage } from './pages/AimsScopePage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { TrackPage } from './pages/TrackPage';

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

const AppLayout: React.FC = () => {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col w-full bg-[var(--bg-page)] text-[var(--text-primary)] transition-colors">
      {!isAdmin && <Header />}
      <main className="flex-1 w-full">
        <Routes>
          {/* 1. Home */}
          <Route path="/" element={<HomePage />} />

          {/* 2. About the Journal */}
          <Route path="/about" element={<AboutPage />} />

          {/* 3. Aim and Scope */}
          <Route path="/aims-scope" element={<AimsScopePage />} />

          {/* 4. Editorial Board */}
          <Route path="/editorial-board" element={<EditorialBoardPage />} />

          {/* 5. Advisory Board */}
          <Route path="/advisory-board" element={<AdvisoryBoardPage />} />

          {/* 6. The Rashomon Approach */}
          <Route path="/rashomon-approach" element={<RashomonPage />} />

          {/* 7. Current Issue */}
          <Route path="/current-issue" element={<IssuesPage />} />

          {/* 8. Submission */}
          <Route path="/submit" element={<SubmitPage />} />

          {/* 9. Manuscript Tracking Portal */}
          <Route path="/track" element={<TrackPage />} />

          {/* 10. Contact Us */}
          <Route path="/contact" element={<ContactPage />} />

          {/* 11. Admin Console */}
          <Route path="/admin" element={<AdminPage />} />

          {/* Clean Redirects */}
          <Route path="/tracking" element={<Navigate to="/track" replace />} />
          <Route path="/track-manuscript" element={<Navigate to="/track" replace />} />
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
      {!isAdmin && <Footer />}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <AppLayout />
      </Router>
    </ThemeProvider>
  );
};

export default App;
