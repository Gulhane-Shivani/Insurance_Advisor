import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Shield, 
  CreditCard, 
  FileText, 
  ClipboardList, 
  User as UserIcon, 
  Banknote, 
  LifeBuoy, 
  LogOut, 
  Bell, 
  Menu, 
  X,
  ShieldCheck,
  ChevronRight,
  Search,
  Settings
} from 'lucide-react';

// Section Imports
import Overview from './sections/Overview';
import MyPolicies from './sections/MyPolicies';
import Payments from './sections/Payments';
import Claims from './sections/Claims';
import ServiceRequests from './sections/ServiceRequests';
import Profile from './sections/Profile';
import PolicyLoan from './sections/PolicyLoan';
import Support from './sections/Support';

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!user) return <Navigate to="/login" />;

  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'policies', label: 'My Policies', icon: Shield },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'claims', label: 'Claims Center', icon: FileText },
    { id: 'requests', label: 'Services', icon: ClipboardList },
    { id: 'loan', label: 'Policy Loan', icon: Banknote },
    { id: 'profile', label: 'Settings', icon: Settings },
    { id: 'support', label: 'Help & Support', icon: LifeBuoy },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'overview': return <Overview user={user} onNavigate={setActiveSection} />;
      case 'policies': return <MyPolicies />;
      case 'payments': return <Payments />;
      case 'claims': return <Claims />;
      case 'requests': return <ServiceRequests />;
      case 'loan': return <PolicyLoan />;
      case 'profile': return <Profile user={user} />;
      case 'support': return <Support />;
      default: return <Overview user={user} onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-700">
      {/* Sidebar - Modern Standard View */}
      <aside className={`
        fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-200 z-50 transition-transform duration-300 ease-in-out
        lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col">
          {/* Logo Section */}
          <div className="h-20 flex items-center px-6 border-b border-slate-50">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
               <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20">
                  <span className="text-white text-sm font-black">IA</span>
               </div>
               <span className="text-lg font-black tracking-tight text-slate-900">Insurance<span className="text-blue-600">Advisor</span></span>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="ml-auto p-2 text-slate-400 hover:text-slate-900 lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
            <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Main Menu</p>
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 group
                  ${activeSection === item.id 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
                `}
              >
                <item.icon className={`w-[18px] h-[18px] transition-transform ${activeSection === item.id ? 'text-white' : 'text-slate-400 group-hover:text-slate-900'}`} />
                <span className="text-[13px] font-bold tracking-tight">{item.label}</span>
                {activeSection === item.id && <ChevronRight className="ml-auto w-3.5 h-3.5 opacity-60" />}
              </button>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-slate-50">
            <div className="bg-slate-50 rounded-2xl p-4 mb-4">
               <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-black">
                     {user?.full_name?.charAt(0) || user?.name?.charAt(0) || 'U'}
                  </div>
                  <div className="overflow-hidden">
                     <p className="text-xs font-bold text-slate-900 truncate">{user?.full_name || user?.name || 'User'}</p>
                     <p className="text-[10px] font-medium text-slate-400 truncate">{user?.email}</p>
                  </div>
               </div>
               <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-white border border-slate-200 rounded-xl text-[11px] font-bold text-red-500 hover:bg-red-50 transition-colors"
               >
                 <LogOut className="w-3.5 h-3.5" />
                 Sign Out
               </button>
            </div>
            <p className="text-[9px] text-center text-slate-400 font-bold uppercase tracking-widest">v1.2.0 Stable</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={`transition-all duration-300 min-h-screen lg:ml-64`}>
        {/* Top Header */}
        <header className={`sticky top-0 z-40 h-20 flex items-center justify-between px-6 lg:px-10 transition-all ${
          scrolled ? 'bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm' : 'bg-transparent'
        }`}>
          <div className="flex items-center gap-4">
             <button 
               onClick={() => setIsSidebarOpen(true)}
               className="p-2.5 bg-white border border-slate-200 rounded-xl lg:hidden shadow-sm text-slate-600"
             >
                <Menu className="w-5 h-5" />
             </button>
             <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-slate-100/50 border border-slate-200/50 rounded-xl w-72 focus-within:bg-white focus-within:shadow-md focus-within:border-blue-200 transition-all">
                <Search className="w-4 h-4 text-slate-400" />
                <input type="text" placeholder="Search anything..." className="bg-transparent border-none outline-none text-[12px] font-medium w-full placeholder:text-slate-400" />
             </div>
          </div>

          <div className="flex items-center gap-3">
             <button className="relative p-2.5 bg-white border border-slate-200/50 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all shadow-sm">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white animate-pulse"></span>
             </button>
             
             <div className="h-8 w-px bg-slate-200 mx-1 hidden sm:block"></div>
             
             <div className="hidden sm:flex items-center gap-3 px-1.5 py-1.5 bg-white border border-slate-200/50 rounded-2xl shadow-sm">
                <div className="w-8 h-8 bg-slate-900 rounded-xl flex items-center justify-center text-white text-xs font-black">
                   {user?.full_name?.charAt(0) || user?.name?.charAt(0) || 'U'}
                </div>
                <div className="text-right pr-2">
                   <p className="text-[12px] font-black text-slate-900 leading-tight">{(user?.full_name || user?.name || 'User').split(' ')[0]}</p>
                   <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Customer</p>
                </div>
             </div>
          </div>
        </header>

        {/* Content Container */}
        <div className="p-6 lg:p-10 pb-20">
           <div className="max-w-[1400px] mx-auto">
              {renderSection()}
           </div>
        </div>
      </main>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardPage;
