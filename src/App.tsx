/* src/App.tsx */
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
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
import CalculatorPage from './app/tools/CalculatorPage';
import LoginPage from './app/auth/LoginPage';
import RegisterPage from './app/auth/RegisterPage';
import ScrollToTop from './components/common/ScrollToTop';
import SuperAdminDashboard from './app/super_admin/page';

// Admin imports
import AdminLayout from './app/admin/AdminLayout';
import AdminDashboard from './app/admin/AdminDashboard';
import AdminUsers from './app/admin/AdminUsers';
import AdminInsurance from './app/admin/AdminInsurance';
import BusinessOverview from './app/admin/sections/BusinessOverview';
import LeadManagement from './app/admin/sections/LeadManagement';
import PolicyManagement from './app/admin/sections/PolicyManagement';
import TeamPerformance from './app/admin/sections/TeamPerformance';
import Customer360 from './app/admin/sections/Customer360';
import ApprovalsTasks from './app/admin/sections/ApprovalsTasks';
import CommissionFinance from './app/admin/sections/CommissionFinance';
import OperationsReports from './app/admin/sections/OperationsReports';
import ContentCommunication from './app/admin/sections/ContentCommunication';
import PolicyLifecycleManagement from './app/super_admin/sections/PolicyLifecycleManagement';
import RenewalManagement from './app/super_admin/sections/RenewalManagement';
import PaymentManagement from './app/super_admin/sections/PaymentManagement';
import NotificationCenter from './app/super_admin/sections/NotificationCenter';
import AdminOverview from './app/super_admin/sections/AdminOverview';

import AgentDashboard from './app/agent_dashboard/page';
import CSRDashboard from './app/customer_service_dashboard';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: { fontFamily: 'inherit', fontSize: '13px', fontWeight: 700 },
          success: { iconTheme: { primary: '#7c3aed', secondary: '#fff' } },
        }}
      />
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/tools/calculator/:type" element={<CalculatorPage />} />
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
          <Route path="/super_admin" element={<SuperAdminDashboard />} />
          <Route path="/agent_dashboard" element={<AgentDashboard />} />
          <Route path="/csr_dashboard" element={<CSRDashboard />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/overview" replace />} />
            <Route path="overview" element={<AdminOverview />} />
            <Route path="leads" element={<LeadManagement />} />
            <Route path="policies" element={<PolicyLifecycleManagement />} />
            <Route path="team" element={<TeamPerformance />} />
            <Route path="customer-360" element={<Customer360 />} />
            <Route path="approvals" element={<ApprovalsTasks />} />
            <Route path="finance" element={<CommissionFinance />} />
            <Route path="reports" element={<OperationsReports />} />
            <Route path="communication" element={<ContentCommunication />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="insurance" element={<AdminInsurance />} />
            <Route path="renewals" element={<RenewalManagement />} />
            <Route path="payments" element={<PaymentManagement />} />
            <Route path="notifications" element={<NotificationCenter />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
