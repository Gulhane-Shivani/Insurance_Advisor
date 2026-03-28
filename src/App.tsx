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
import DashboardPage from './app/dashboard/page';
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
          <Route path="/insurance/life" element={<LifeInsurancePage />} />
          <Route path="/insurance/health" element={<HealthInsurancePage />} />
          <Route path="/insurance/car" element={<CarInsurancePage />} />
          <Route path="/insurance/business" element={<BusinessInsurancePage />} />
          {/* Redirect /insurance to /insurance/life or a common page if created */}
          <Route path="/insurance" element={<LifeInsurancePage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
