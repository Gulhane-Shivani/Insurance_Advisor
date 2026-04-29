import React, { useState } from 'react';
import { 
  LayoutDashboard, UserPlus, Users, Zap, Calendar, 
  DollarSign, Activity, Settings, LogOut, Menu, X, Bell, Search, User, ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './agent_dashboard.css';

// Section Imports
import DashboardOverview from './sections/DashboardOverview';
import PerformanceKPIs from './sections/PerformanceKPIs';
import LeadsManagement from './sections/LeadsManagement';
import CustomerPolicies from './sections/CustomerPolicies';
import QuoteProposalTool from './sections/QuoteProposalTool';
import TasksCalendar from './sections/TasksCalendar';
import CommissionStatement from './sections/CommissionStatement';
import ActivityLog from './sections/ActivityLog';
import Customer360 from './sections/Customer360';
import AgentProfile from './sections/AgentProfile';

const AgentDashboard: React.FC = () => {
  const { user: authUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('Overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Mock user for testing without login
  const user = authUser || { name: 'Demo Agent', role: 'Elite Producer' };

  const navItems = [
    { id: 'Overview', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'Leads', icon: UserPlus, label: 'My Leads' },
    { id: 'Customers', icon: Users, label: 'Customers' },
    { id: 'Quotes', icon: Zap, label: 'Quote Engine' },
    { id: 'Tasks', icon: Calendar, label: 'Tasks & Calendar' },
    { id: 'Commission', icon: DollarSign, label: 'Commission' },
    { id: 'Activity', icon: Activity, label: 'Activity Log' },
    { id: 'Profile', icon: User, label: 'My Profile' },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'Leads': return <LeadsManagement />;
      case 'Customers': return <CustomerPolicies />;
      case 'Quotes': return <QuoteProposalTool />;
      case 'Tasks': return <TasksCalendar />;
      case 'Commission': return <CommissionStatement />;
      case 'Activity': return <ActivityLog />;
      case 'Performance': return <PerformanceKPIs />;
      case '360': return <Customer360 />;
      case 'Profile': return <AgentProfile />;
      case 'Overview':
      default: return <DashboardOverview setSection={setActiveSection} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-white transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 shadow-2xl`}>
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-8">
            <div className="flex items-center gap-2 mb-10 px-2">
              <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-500/20">
                IA
              </div>
              <h1 className="text-xl font-bold tracking-tighter text-white">
                Insurance<span className="text-indigo-400">Advisor</span>
              </h1>
            </div>

            <nav className="space-y-1.5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-semibold transition-all group ${
                    activeSection === item.id 
                    ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <item.icon size={20} className={activeSection === item.id ? 'text-white' : 'text-slate-500 group-hover:text-indigo-400'} />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Sidebar Footer */}
          <div className="mt-auto p-8 border-t border-white/5 space-y-6">
            {/* User Profile Card */}
            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-3xl border border-white/5">
              <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center font-black text-white text-xs uppercase shadow-lg shadow-indigo-500/20">
                {user?.name?.substring(0, 2) || 'AG'}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-black truncate">{user?.name || 'Agent Pro'}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{user?.role || 'Elite Producer'}</p>
              </div>
            </div>

            {/* Support & Actions */}
            <div className="space-y-3">
              <button 
                className="w-full flex items-center justify-between gap-3 px-5 py-4 bg-indigo-600 text-white rounded-2xl text-sm font-semibold shadow-xl shadow-indigo-600/20 group hover:bg-indigo-500 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full border-2 border-white/30 flex items-center justify-center">
                    <span className="text-[10px]">?</span>
                  </div>
                  Help & Support
                </div>
                <ChevronRight size={16} className="text-white/50 group-hover:translate-x-1 transition-transform" />
              </button>

              <button 
                onClick={() => { logout(); navigate('/login'); }}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 border-2 border-white/10 text-white/50 hover:text-red-400 hover:border-red-400/30 text-xs font-semibold rounded-2xl transition-all uppercase tracking-widest"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>

            <div className="flex justify-center">
               <p className="text-[9px] text-slate-600 font-bold tracking-[0.2em]">V1.2.0 STABLE</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50 overflow-hidden">
        {/* Header */}
        <header className="h-24 bg-white border-b border-slate-100 flex items-center justify-between px-8 z-30 shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden p-3 bg-slate-50 rounded-xl text-slate-600">
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">{activeSection}</h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Insurance Advisor Dashboard • 2026</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search leads, policies, or clients..." 
                className="pl-12 pr-6 py-3.5 bg-slate-50 border border-slate-100 rounded-[20px] text-sm font-medium w-80 outline-none focus:bg-white focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all shadow-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="relative p-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-slate-600 transition-all group">
                <Bell size={20} />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
              </button>
              <button 
                onClick={() => setActiveSection('Profile')}
                className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-slate-600 transition-all"
              >
                <Settings size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* Section Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-slate-50/50">
          <div className="max-w-[1600px] mx-auto animate-fade-in">
            {renderSection()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AgentDashboard;
