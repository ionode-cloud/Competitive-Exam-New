// App.jsx — clean root: only Header + Footer in components, pages for everything else
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header           from './components/Header';
import Footer           from './components/Footer';

import LandingPage      from './pages/LandingPage';
import ExamSectionPage  from './pages/ExamSectionPage';
import SubjectTestPage  from './pages/SubjectTestPage';
import MockTestPage     from './pages/MockTestPage';
import PYQEbookPage     from './pages/PYQEbookPage';
import MaterialsPage    from './pages/MaterialsPage';
import ContactUsPage    from './pages/ContactUsPage';
import SubscriptionPage from './pages/SubscriptionPage';

export default function App() {
  return (
    <BrowserRouter>
      {/* Header: MarqueeBanner + TopRow + MegaNav (all in one) */}
      <Header />

      <main>
        <Routes>
          <Route path="/"             element={<LandingPage />}      />
          <Route path="/exam-section" element={<ExamSectionPage />}  />
          <Route path="/subject-test" element={<SubjectTestPage />}  />
          <Route path="/mock-test"    element={<MockTestPage />}     />
          <Route path="/pyq-ebook"    element={<PYQEbookPage />}     />
          <Route path="/materials"    element={<MaterialsPage />}    />
          <Route path="/contact"      element={<ContactUsPage />}    />
          <Route path="/subscription" element={<SubscriptionPage />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}
