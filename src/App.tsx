import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { AlertCircle, ArrowLeft } from 'lucide-react';

// The 16 Primary Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { AimsScopePage } from './pages/AimsScopePage';
import { ArticlesPage } from './pages/ArticlesPage';
import { IssuesPage } from './pages/IssuesPage';
import { ArticleReaderPage } from './pages/ArticleReaderPage';
import { RashomonPage } from './pages/RashomonPage';
import { EditorialBoardPage } from './pages/EditorialBoardPage';
import { EditorialPhilosophyPage } from './pages/EditorialPhilosophyPage';
import { ForAuthorsPage } from './pages/ForAuthorsPage';
import { SubmitPage } from './pages/SubmitPage';
import { ForReviewersPage } from './pages/ForReviewersPage';
import { ExplorePage } from './pages/ExplorePage';
import { HistoryPage } from './pages/HistoryPage';
import { PublisherPage } from './pages/PublisherPage';
import { ContactPage } from './pages/ContactPage';

// Scroll to top automatically on route changes
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Scholarly 404 Component
const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6 animate-fadeIn">
      <div className="w-14 h-14 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto border border-amber-500/30">
        <AlertCircle className="w-7 h-7" />
      </div>
      <h1 className="font-serif text-3xl font-bold text-[var(--text-primary)]">
        404 — Persistent Identifier Not Found
      </h1>
      <p className="text-sm text-[var(--text-secondary)] font-serif leading-relaxed">
        The requested URL or DOI does not correspond to an active Version of Record or editorial resource in <em>The Crime &amp; Society Review</em>.
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
        <div className="min-h-screen flex flex-col bg-[var(--bg-page)] text-[var(--text-primary)] transition-colors">
          <Header />
          <main className="flex-1">
            <Routes>
              {/* 1. Home */}
              <Route path="/" element={<HomePage />} />

              {/* 2. About the Journal */}
              <Route path="/about" element={<AboutPage />} />

              {/* 3. Aims & Scope */}
              <Route path="/aims-scope" element={<AimsScopePage />} />

              {/* 4. Publications / Articles */}
              <Route path="/articles" element={<ArticlesPage />} />

              {/* 5. Issues (and alias /archive) */}
              <Route path="/issues" element={<IssuesPage />} />
              <Route path="/archive" element={<Navigate to="/issues" replace />} />

              {/* 6. Individual Article Page */}
              <Route path="/article/:id" element={<ArticleReaderPage />} />

              {/* 7. Rashomon / Multidisciplinary Approach */}
              <Route path="/rashomon-approach" element={<RashomonPage />} />

              {/* 8. Editorial Board */}
              <Route path="/editorial-board" element={<EditorialBoardPage />} />

              {/* 9. Editorial Philosophy */}
              <Route path="/editorial-philosophy" element={<EditorialPhilosophyPage />} />

              {/* 10. For Authors */}
              <Route path="/for-authors" element={<ForAuthorsPage />} />

              {/* 11. Submit Your Research */}
              <Route path="/submit" element={<SubmitPage />} />

              {/* 12. For Reviewers */}
              <Route path="/for-reviewers" element={<ForReviewersPage />} />

              {/* 13. Research / Explore */}
              <Route path="/explore" element={<ExplorePage />} />

              {/* 14. Journal History */}
              <Route path="/history" element={<HistoryPage />} />

              {/* 15. Publisher */}
              <Route path="/publisher" element={<PublisherPage />} />

              {/* 16. Contact */}
              <Route path="/contact" element={<ContactPage />} />

              {/* Governance aliases redirecting to their respective dedicated pages */}
              <Route path="/ethics" element={<Navigate to="/editorial-philosophy" replace />} />

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
