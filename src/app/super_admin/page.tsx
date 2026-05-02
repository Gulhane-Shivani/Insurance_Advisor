import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  BarChart3, 
  FileStack, 
  Globe, 
  ShieldAlert, 
  LogOut, 
  Menu, 
  X,
  ExternalLink,
  ChevronDown,
  User as UserIcon,
  Activity,
  History
} from 'lucide-react';

// Admin Section Imports
import AdminOverview from './sections/AdminOverview';
import Analytics from './sections/Analytics';
import UserManagement from './sections/UserManagement';
import MasterSettings from './sections/MasterSettings';
import Reports from './sections/Reports';
import SystemConfig from './sections/SystemConfig';
import AuditLogs from './sections/AuditLogs';
import SystemStats from './sections/SystemStats';

const SuperAdminDashboard: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auth bypass for testing
  // if (!user) return <Navigate to="/login" />;

  const adminMenuItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'users', label: 'User Control', icon: Users },
    { id: 'master', label: 'Master Settings', icon: Settings },
    { id: 'reports', label: 'Reports', icon: FileStack },
    { id: 'system', label: 'System Config', icon: Globe },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'overview': return <AdminOverview />;
      case 'analytics': return <Analytics />;
      case 'users': return <UserManagement />;
      case 'master': return <MasterSettings />;
      case 'reports': return <Reports />;
      case 'system': return <SystemConfig />;
      case 'audit': return <AuditLogs />;
      case 'stats': return <SystemStats />;
      default: return <AdminOverview />;
    }
  };

  const getPageTitle = () => {
    if (activeSection === 'audit') return 'Audit Logs';
    if (activeSection === 'stats') return 'System Stats';
    const current = adminMenuItems.find(item => item.id === activeSection);
    return current ? current.label : 'Super Admin';
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar - Matching Admin Dashboard Style */}
      <aside className={`
        fixed inset-y-0 left-0 w-64 bg-slate-900 text-white flex flex-col flex-shrink-0 shadow-xl z-50 transition-transform duration-300
        lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-16 flex items-center px-6 bg-slate-950 border-b border-slate-800">
          <span className="text-xl font-black tracking-tight text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-white" />
            </div>
            Super Admin
          </span>
          <button onClick={() => setIsSidebarOpen(false)} className="ml-auto p-2 text-slate-500 lg:hidden">
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-hide">
          <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6 px-4">Master Console</div>
          {adminMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveSection(item.id); setIsSidebarOpen(false); }}
                className={`w-full flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                {item.label}
              </button>
            );
          })}

          <div className="pt-8 mt-8 border-t border-slate-800">
             <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 px-4">Root Access</div>
             <button onClick={() => { setActiveSection('audit'); setIsSidebarOpen(false); }} className={`w-full flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-all duration-200 ${activeSection === 'audit' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                <History className={`mr-3 h-5 w-5 ${activeSection === 'audit' ? 'text-white' : 'text-slate-500'}`} /> Audit Logs
             </button>
             <button onClick={() => { setActiveSection('stats'); setIsSidebarOpen(false); }} className={`w-full flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-all duration-200 ${activeSection === 'stats' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                <Activity className={`mr-3 h-5 w-5 ${activeSection === 'stats' ? 'text-white' : 'text-slate-500'}`} /> System Stats
             </button>
          </div>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800 rounded-xl p-4 flex items-center gap-3 cursor-pointer hover:bg-slate-700 transition-colors">
             <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0 text-white font-bold border border-slate-600">
               SA
             </div>
             <div className="overflow-hidden">
               <p className="text-sm font-bold text-white truncate">Super Administrator</p>
               <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Master Authority</p>
             </div>
          </div>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Header - Matching Admin Style */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10 flex-shrink-0 shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-slate-600 lg:hidden">
              <Menu size={20} />
            </button>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">{getPageTitle()}</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/')}
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              <ExternalLink size={14} />
              View Portal
            </button>

            <div className="h-8 w-px bg-slate-200 mx-2 hidden sm:block"></div>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-3 hover:bg-slate-50 p-1.5 rounded-2xl border border-transparent hover:border-slate-200 transition-all focus:outline-none"
              >
                <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black shadow-inner">
                  SA
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-[11px] font-black text-slate-700 leading-tight">Master Admin</p>
                  <p className="text-[9px] text-emerald-600 font-black uppercase tracking-widest leading-tight">Authorized</p>
                </div>
                <ChevronDown size={14} className={`text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-[24px] shadow-2xl border border-slate-100 p-2 z-50 animate-in fade-in slide-in-from-top-4">
                  <div className="px-5 py-4 border-b border-slate-50 mb-2">
                    <p className="text-sm font-black text-slate-800">Super Administrator</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Master Authority Hub</p>
                  </div>
                  
                  <button onClick={() => { setActiveSection('users'); setDropdownOpen(false); }} className="w-full text-left px-5 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-xl flex items-center gap-3 transition-colors">
                    <UserIcon className="w-4 h-4 text-slate-400" />
                    Console Profile
                  </button>
                  <button onClick={() => { setActiveSection('system'); setDropdownOpen(false); }} className="w-full text-left px-5 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-xl flex items-center gap-3 transition-colors">
                    <Settings className="w-4 h-4 text-slate-400" />
                    Security Settings
                  </button>
                  
                  <div className="h-px bg-slate-100 my-2"></div>
                  
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-5 py-3 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl flex items-center gap-3 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out Console
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50/50 p-6 lg:p-10">
          <div className="max-w-[1600px] mx-auto">
             {/* Content Area - Rendered directly for a standard view */}
             {renderSection()}
          </div>
        </main>
      </div>

      {isSidebarOpen && <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />}
    </div>
  );
};

export default SuperAdminDashboard;
