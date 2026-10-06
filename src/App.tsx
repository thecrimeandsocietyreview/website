import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { AlertCircle, ArrowLeft } from 'lucide-react';

// 1. Eager Core Page for immediate First Contentful Paint (FCP)
import { HomePage } from './pages/HomePage';

// 2. Code-Split Secondary Pages (Shrinks initial bundle size)
const SubmitPage = lazy(() => import('./pages/SubmitPage').then(m => ({ default: m.SubmitPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const EditorialBoardPage = lazy(() => import('./pages/EditorialBoardPage').then(m => ({ default: m.EditorialBoardPage })));
const AdvisoryBoardPage = lazy(() => import('./pages/AdvisoryBoardPage').then(m => ({ default: m.AdvisoryBoardPage })));
const RashomonPage = lazy(() => import('./pages/RashomonPage').then(m => ({ default: m.RashomonPage })));
const IssuesPage = lazy(() => import('./pages/IssuesPage').then(m => ({ default: m.IssuesPage })));
const AimsScopePage = lazy(() => import('./pages/AimsScopePage').then(m => ({ default: m.AimsScopePage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const AdminPage = lazy(() => import('./pages/AdminPage').then(m => ({ default: m.AdminPage })));
const TrackPage = lazy(() => import('./pages/TrackPage').then(m => ({ default: m.TrackPage })));

// Scroll to top automatically on route changes
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Subtle Scholarly Page Loading Fallback
const PageLoadingFallback: React.FC = () => (
  <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 space-y-3 animate-fadeIn">
    <div className="relative w-10 h-10">
      <div className="absolute inset-0 rounded-full border-2 border-amber-500/20 border-t-amber-600 animate-spin" />
      <div className="absolute inset-1.5 rounded-full border-2 border-indigo-500/20 border-b-indigo-600 animate-spin [animation-direction:reverse]" />
    </div>
    <span className="text-[11px] font-serif tracking-wider uppercase text-[var(--text-secondary)] opacity-75">
      Loading Scholarly Section...
    </span>
  </div>
);

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
        <Suspense fallback={<PageLoadingFallback />}>
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
        </Suspense>
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
