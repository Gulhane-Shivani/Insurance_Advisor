/* src/App.tsx */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './app/Home';
import AboutPage from './app/about/page';
import ComparePage from './app/compare';
import ContactPage from './app/contact/page';
import QuotePage from './app/quote/page';
import LifeInsurancePage from './app/insurance/lifeInsurance';
import HealthInsurancePage from './app/insurance/healthInsurance';
import CarInsurancePage from './app/insurance/carInsurance';
import BusinessInsurancePage from './app/insurance/businessInsurance';
import InsuranceOverview from './app/insurance/Overview';
import DashboardPage from './app/dashboard/page';
import FeedbackPage from './app/feedback/page';
import TermsPage from './app/legal/TermsPage';
import PrivacyPage from './app/legal/PrivacyPage';
import ClaimsPage from './app/support/ClaimsPage';
import RenewalPage from './app/support/RenewalPage';
import CarePage from './app/support/CarePage';
import HelpCenterPage from './app/support/HelpCenterPage';
import ScrollToTop from './components/common/ScrollToTop';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/quote" element={<QuotePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/insurance" element={<InsuranceOverview />} />
          <Route path="/insurance/life" element={<LifeInsurancePage />} />
          <Route path="/insurance/health" element={<HealthInsurancePage />} />
          <Route path="/insurance/car" element={<CarInsurancePage />} />
          <Route path="/insurance/business" element={<BusinessInsurancePage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/claims" element={<ClaimsPage />} />
          <Route path="/renewal" element={<RenewalPage />} />
          <Route path="/care" element={<CarePage />} />
          <Route path="/help" element={<HelpCenterPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
