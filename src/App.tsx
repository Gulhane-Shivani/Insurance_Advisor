/* src/App.tsx */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './app/page';
import AboutPage from './app/about/page';
import BlogPage from './app/blog/page';
import ComparePage from './app/compare/page';
import ContactPage from './app/contact/page';
import FAQPage from './app/faq/page';
import QuotePage from './app/quote/page';
import LifeInsurancePage from './app/insurance/life/page';
import HealthInsurancePage from './app/insurance/health/page';
import CarInsurancePage from './app/insurance/car/page';
import BusinessInsurancePage from './app/insurance/business/page';
import DashboardPage from './app/dashboard/page';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
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
