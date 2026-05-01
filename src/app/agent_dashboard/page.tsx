/* src/app/agent_dashboard/page.tsx */
import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, UserPlus, Users, Zap, Calendar, 
  DollarSign, Activity, Settings, LogOut, Menu, X, Bell, Search, User, ChevronRight, ChevronDown, FileText
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './agent_dashboard.css';
import toast from 'react-hot-toast';

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
import AgentSupport from './sections/AgentSupport';

const AgentDashboard: React.FC = () => {
  const { user: authUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('Overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // For 360 View Redirection
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const searchResults = [
    { id: '1', title: 'Rajesh Kumar', type: 'Customer', section: 'Customers', icon: Users },
    { id: '2', title: 'Silver Shield Plus', type: 'Policy', section: 'Customers', icon: FileText },
    { id: '3', title: 'Anjali Sharma', type: 'Lead', section: 'Leads', icon: UserPlus },
    { id: '4', title: 'Renewal: Rajesh', type: 'Task', section: 'Tasks', icon: Calendar },
  ].filter(res => res.title.toLowerCase().includes(globalSearchTerm.toLowerCase()));

  const handleGlobalSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      handleResultClick(searchResults[0]);
    }
  };

  const handleResultClick = (res: any) => {
    toast.loading(`Navigating to ${res.title}...`, { duration: 1000 });
    setTimeout(() => {
      setActiveSection(res.section);
      setShowSearchResults(false);
      setGlobalSearchTerm('');
      toast.success(`Context switched to ${res.section}`);
    }, 1000);
  };

  const handleViewProfile = (customer: any) => {
    setSelectedCustomer(customer);
    setActiveSection('360');
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'Leads': return <LeadsManagement />;
      case 'Customers': return <CustomerPolicies onViewProfile={handleViewProfile} />;
      case 'Quotes': return <QuoteProposalTool />;
      case 'Tasks': return <TasksCalendar />;
      case 'Commission': return <CommissionStatement />;
      case 'Activity': return <ActivityLog />;
      case 'Performance': return <PerformanceKPIs />;
      case '360': return <Customer360 customerData={selectedCustomer} />;
      case 'Profile': return <AgentProfile />;
      case 'Support': return <AgentSupport />;
      case 'Overview':
      default: return <DashboardOverview setSection={setActiveSection} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans relative">
      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-white transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 shadow-2xl flex flex-col`}>
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-8 pb-4 flex-shrink-0">
            <div className="flex items-center gap-2 mb-8 px-2">
              <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-500/20">
                IA
              </div>
              <h1 className="text-xl font-bold tracking-tighter text-white">
                Insurance<span className="text-indigo-400">Advisor</span>
              </h1>
            </div>
          </div>

          <nav className="flex-1 px-6 space-y-1 pb-4 border-b border-white/5 overflow-y-auto custom-scrollbar">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-semibold transition-all group ${
                  activeSection === item.id || (activeSection === '360' && item.id === 'Customers')
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon size={20} className={activeSection === item.id || (activeSection === '360' && item.id === 'Customers') ? 'text-white' : 'text-slate-500 group-hover:text-indigo-400'} />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-6 border-t border-white/5 space-y-4 flex-shrink-0 bg-slate-900">
            {/* User Profile Card */}
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/5 group">
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center font-black text-white text-[10px] uppercase shadow-lg shadow-indigo-500/20 flex-shrink-0">
                {user?.name?.substring(0, 2) || 'AG'}
              </div>
              <div className="overflow-hidden flex-1">
                <p className="text-xs font-black truncate">{user?.name || 'Agent Pro'}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{user?.role || 'Elite Producer'}</p>
              </div>
            </div>

            {/* Support & Actions */}
            <div className="space-y-3">
              <button 
                onClick={() => setActiveSection('Support')}
                className={`w-full flex items-center justify-between gap-3 px-5 py-4 rounded-2xl text-sm font-semibold transition-all group ${
                  activeSection === 'Support'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-indigo-600/10 text-indigo-100 hover:bg-indigo-500 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${activeSection === 'Support' ? 'border-white/30' : 'border-indigo-400/30'}`}>
                    <span className="text-[10px]">?</span>
                  </div>
                  Help & Support
                </div>
                <ChevronRight size={16} className={`transition-transform ${activeSection === 'Support' ? 'text-white/50 translate-x-1' : 'text-indigo-300 group-hover:translate-x-1'}`} />
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
        <header className="h-24 bg-white border-b border-slate-100 flex items-center justify-between px-8 z-30 shadow-sm relative">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden p-3 bg-slate-50 rounded-xl text-slate-600">
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">{activeSection === '360' ? 'Customer 360' : activeSection}</h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Insurance Advisor Dashboard • 2026</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex relative group" ref={searchRef}>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={18} />
              <form onSubmit={handleGlobalSearchSubmit}>
                <input 
                  type="text" 
                  placeholder="Search leads, policies, or clients..." 
                  className="pl-12 pr-6 py-3.5 bg-slate-50 border border-slate-100 rounded-[20px] text-sm font-medium w-80 outline-none focus:bg-white focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all shadow-sm"
                  value={globalSearchTerm}
                  onChange={(e) => { setGlobalSearchTerm(e.target.value); setShowSearchResults(true); }}
                  onFocus={() => setShowSearchResults(true)}
                />
              </form>

              {/* Search Results Pop-up */}
              {showSearchResults && globalSearchTerm.length > 0 && (
                <div className="absolute top-[calc(100%+12px)] left-0 w-full bg-white rounded-[24px] shadow-2xl border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                   <div className="p-4 bg-slate-50 border-b border-slate-100">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Search Results ({searchResults.length})</p>
                   </div>
                   <div className="max-h-[350px] overflow-y-auto">
                      {searchResults.length > 0 ? (
                        searchResults.map(res => (
                          <button 
                            key={res.id}
                            onClick={() => handleResultClick(res)}
                            className="w-full flex items-center justify-between gap-4 p-4 hover:bg-indigo-50 transition-colors group text-left"
                          >
                             <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 group-hover:text-indigo-600 transition-colors shadow-sm">
                                   <res.icon size={18} />
                                </div>
                                <div>
                                   <p className="text-sm font-black text-slate-800">{res.title}</p>
                                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{res.type}</p>
                                </div>
                             </div>
                             <ChevronRight size={14} className="text-slate-300 group-hover:text-indigo-400 transition-transform group-hover:translate-x-1" />
                          </button>
                        ))
                      ) : (
                        <div className="p-8 text-center">
                           <Search size={32} className="mx-auto text-slate-200 mb-3" />
                           <p className="text-xs font-bold text-slate-400">No matches found in your repository</p>
                        </div>
                      )}
                   </div>
                </div>
              )}
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
              <div className="w-px h-6 bg-slate-200 mx-1"></div>
              
              {/* Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 hover:bg-slate-50 p-1 pr-3 rounded-full border border-transparent hover:border-slate-200 transition-all focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-xs shadow-inner">
                    {user?.name?.substring(0, 2) || 'AG'}
                  </div>
                  <span className="text-sm font-bold text-slate-700 hidden sm:block">{user?.name || 'Agent Pro'}</span>
                  <ChevronDown size={14} className={`text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-3 border-b border-slate-100 mb-1">
                      <p className="text-xs font-black text-slate-800">{user?.name || 'Agent Pro'}</p>
                      <p className="text-[10px] text-slate-500 truncate">{user?.role || 'Elite Producer'}</p>
                    </div>

                    <button 
                      onClick={() => { setActiveSection('Profile'); setDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2 text-[11px] font-bold text-slate-700 hover:bg-slate-50 flex items-center"
                    >
                      <User className="w-3.5 h-3.5 mr-2.5 text-slate-400" />
                      My Profile
                    </button>

                    <div className="h-px bg-slate-100 my-1"></div>

                    <button
                      onClick={() => { logout(); navigate('/login'); }}
                      className="w-full text-left px-4 py-2 text-[11px] font-bold text-red-600 hover:bg-red-50 flex items-center"
                    >
                      <LogOut className="w-3.5 h-3.5 mr-2.5" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
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
