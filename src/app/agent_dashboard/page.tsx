/* src/app/agent_dashboard/page.tsx - CRM View Pre-optimized */
import React, { useState, useRef } from 'react';
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  RefreshCw,
  IndianRupee,
  CreditCard,
  FileText,
  Bell,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Search,
  Zap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// Section Imports
import DashboardOverview from './sections/DashboardOverview';
import CustomerManagement from './sections/CustomerPolicies'; // We'll update this
import PolicyManagement from './sections/PolicyManagement';
import RenewalManagement from './sections/RenewalManagement';
import CommissionSection from './sections/CommissionStatement';
import PaymentsManagement from './sections/PaymentsManagement';
import DocumentsManagement from './sections/DocumentsManagement';
import NotificationPanel from './sections/NotificationPanel';
import AgentProfile from './sections/AgentProfile';

const AgentDashboard: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock Agent Data
  const agentData = {
    name: "Rahul Sharma",
    role: "Senior Insurance Agent",
    branch: "Mumbai Central",
    avatar: null,
    stats: {
      policiesSold: 120,
      activeCustomers: 95,
      pendingRenewals: 12,
      monthlyCommission: "₹85,000",
      newLeads: 8,
      pendingPayments: 5
    }
  };

  const navItems = [
    { id: 'Dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'Customers', icon: Users, label: 'Customers' },
    { id: 'Policies', icon: ShieldCheck, label: 'Policies' },
    { id: 'Renewals', icon: RefreshCw, label: 'Renewals' },
    { id: 'Commissions', icon: IndianRupee, label: 'Commissions' },
    { id: 'Payments', icon: CreditCard, label: 'Payments' },
    { id: 'Documents', icon: FileText, label: 'Documents' },
    { id: 'Notifications', icon: Bell, label: 'Notifications', badge: 4 },
    { id: 'Profile', icon: User, label: 'Profile' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast.success('Logged out successfully');
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'Dashboard': return <DashboardOverview setSection={setActiveSection} />;
      case 'Customers': return <CustomerManagement />;
      case 'Policies': return <PolicyManagement />;
      case 'Renewals': return <RenewalManagement />;
      case 'Commissions': return <CommissionSection />;
      case 'Payments': return <PaymentsManagement />;
      case 'Documents': return <DocumentsManagement />;
      case 'Notifications': return <NotificationPanel />;
      case 'Profile': return <AgentProfile />;
      default: return <DashboardOverview setSection={setActiveSection} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#F0F2F5] overflow-hidden font-sans">
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-white transition-all duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 flex flex-col shadow-2xl`}
      >
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#0061FF] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-900/20">
            IA
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl leading-none font-black uppercase tracking-tighter text-white">Insurance</h1>
            <p className="text-xs text-indigo-400 font-bold uppercase tracking-[0.3em]">Advisor</p>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto scrollbar-hide">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-bold transition-all group ${
                activeSection === item.id 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} className={activeSection === item.id ? 'text-white' : 'text-slate-500 group-hover:text-indigo-400'} />
                {item.label}
              </div>
              {item.badge && (
                <span className="bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-5 border-t border-white/5 bg-slate-900/50 backdrop-blur-md">
          <div className="flex items-center gap-3 p-2.5 bg-white/5 rounded-2xl border border-white/5 group hover:bg-white/10 transition-all cursor-pointer" onClick={() => setActiveSection('Profile')}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-black text-white text-sm shadow-lg">
              {agentData.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-black truncate">{agentData.name}</p>
              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">{agentData.role}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full mt-3 flex items-center gap-2 px-3 py-2.5 rounded-xl text-[10px] font-bold text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 z-30 sticky top-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden p-2.5 bg-slate-100 rounded-xl text-slate-600">
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div>
              <h2 className="text-xl font-black text-slate-800 tracking-tight">{activeSection}</h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">System Online • {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Search everything..." 
                className="pl-11 pr-4 py-2.5 bg-slate-100 border-none rounded-xl text-xs font-bold w-64 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <button className="relative p-2.5 bg-slate-100 hover:bg-indigo-50 rounded-xl text-slate-600 hover:text-indigo-600 transition-all">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>

            <button className="p-2.5 bg-slate-100 hover:bg-indigo-50 rounded-xl text-slate-600 hover:text-indigo-600 transition-all">
              <Settings size={20} />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
          <div
            key={activeSection}
            className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500"
          >
            {renderSection()}
          </div>
        </div>

        {/* Global Floating Action */}
        <button className="fixed bottom-8 right-8 w-14 h-14 bg-indigo-600 text-white rounded-2xl shadow-2xl shadow-indigo-600/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group">
          <Zap size={24} className="group-hover:animate-pulse" />
          <div className="absolute right-full mr-4 bg-slate-900 text-white text-[10px] font-black px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none uppercase tracking-widest shadow-xl">
            Quick Policy Action
          </div>
        </button>
      </main>
    </div>
  );
};

export default AgentDashboard;
