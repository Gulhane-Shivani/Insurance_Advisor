import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Settings,
  BarChart3,
  FileStack,
  Globe,
  ShieldAlert,
  LogOut,
  Bell,
  Menu,
  X,
  Search,
  ChevronRight,
  TrendingUp,
  Database,
  Mail,
  Lock,
  History
} from 'lucide-react';

// Admin Section Imports (to be created)
import AdminOverview from './sections/AdminOverview';
import Analytics from './sections/Analytics';
import UserManagement from './sections/UserManagement';
import MasterSettings from './sections/MasterSettings';
import Reports from './sections/Reports';
import SystemConfig from './sections/SystemConfig';

const SuperAdminDashboard: React.FC = () => {
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

  // For now, allow entry, but in real app we'd check if user.role === 'super_admin'
  // if (!user || user.role !== 'super_admin') return <Navigate to="/login" />;
  // if (!user) return <Navigate to="/login" />;

  const adminMenuItems = [
    { id: 'overview', label: 'Master Overview', icon: LayoutDashboard },
    { id: 'analytics', label: 'Business Analytics', icon: BarChart3 },
    { id: 'users', label: 'User & Roles', icon: Users },
    { id: 'master', label: 'Master Settings', icon: Settings },
    { id: 'reports', label: 'Reports & Exports', icon: FileStack },
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
      default: return <AdminOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 font-sans">
      {/* Super Admin Sidebar - Deep Dark Layout */}
      <aside className={`
        fixed inset-y-0 left-0 w-72 bg-[#020617] z-50 transition-all duration-500 ease-in-out border-r border-white/5
        lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col">
          {/* Admin Branding */}
          <div className="h-24 flex items-center px-8 border-b border-white/5">
            <div className="flex items-center gap-3.5 cursor-pointer group" onClick={() => navigate('/')}>
              <div className="w-10 h-10 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/20 group-hover:rotate-12 transition-transform">
                <span className="text-white text-base font-black italic">IA</span>
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-white block leading-none">Super<span className="text-indigo-400">Admin</span></span>
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mt-1 block">Control Panel</span>
              </div>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="ml-auto p-2.5 text-slate-500 hover:text-white lg:hidden">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-8 px-5 space-y-1.5 scrollbar-hide">
            <p className="px-5 text-[9px] font-black text-slate-600 uppercase tracking-[0.25em] mb-6">Core Management</p>
            {adminMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveSection(item.id); setIsSidebarOpen(false); }}
                className={`
                  w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group
                  ${activeSection === item.id
                    ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-900/40'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'}
                `}
              >
                <item.icon className={`w-4 h-4 ${activeSection === item.id ? 'text-white' : 'text-slate-500 group-hover:text-white'}`} />
                <span className="text-[13px] font-black tracking-tight">{item.label}</span>
              </button>
            ))}

            <div className="pt-8 mt-8 border-t border-white/5">
              <p className="px-5 text-[9px] font-black text-slate-600 uppercase tracking-[0.25em] mb-4">Security</p>
              <button className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-slate-400 hover:text-white hover:bg-white/5 transition-all">
                <ShieldAlert className="w-4 h-4" />
                <span className="text-[13px] font-black tracking-tight">Audit Logs</span>
              </button>
              <button className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-slate-400 hover:text-white hover:bg-white/5 transition-all">
                <History className="w-4 h-4" />
                <span className="text-[13px] font-black tracking-tight">System Status</span>
              </button>
            </div>
          </nav>

          {/* Admin Profile & Logout */}
          <div className="p-6 border-t border-white/5">
            <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl mb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center text-white text-xs font-black">SA</div>
              <div className="overflow-hidden">
                <p className="text-xs font-black text-white truncate">Super Administrator</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Master Access</p>
              </div>
            </div>
            <button onClick={handleLogout} className="w-full flex items-center justify-center gap-3 py-3.5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all active:scale-95">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="transition-all duration-500 min-h-screen lg:ml-72">
        {/* Admin Header */}
        <header className={`sticky top-0 z-40 h-24 flex items-center justify-between px-8 lg:px-12 transition-all ${scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm' : 'bg-transparent'
          }`}>
          <div className="flex items-center gap-6">
            <button onClick={() => setIsSidebarOpen(true)} className="p-3 bg-white border border-slate-200 rounded-2xl lg:hidden shadow-xl text-slate-600">
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden lg:flex items-center gap-3 px-6 py-3 bg-white border border-slate-200 rounded-2xl w-96 shadow-sm focus-within:shadow-xl focus-within:border-indigo-500/30 transition-all group">
              <Search className="w-4 h-4 text-slate-400 group-focus-within:text-indigo-500" />
              <input type="text" placeholder="Global search across system..." className="bg-transparent border-none outline-none text-[13px] font-bold w-full placeholder:text-slate-400" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-xl border border-indigo-100">
              <Database className="w-3.5 h-3.5 text-indigo-600" />
              <span className="text-[10px] font-black text-indigo-700 uppercase tracking-widest">Main DB: Connected</span>
            </div>

            <button className="relative p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-indigo-600 transition-all shadow-sm">
              <Bell className="w-5 h-5" />
              <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full ring-4 ring-white"></span>
            </button>

            <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-indigo-600 transition-all shadow-sm">
              <Mail className="w-5 h-5" />
            </button>

            <div className="h-10 w-px bg-slate-200 mx-2 hidden lg:block"></div>

            <div className="hidden lg:flex items-center gap-4 pl-2 cursor-pointer group">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white text-xs font-black shadow-xl">SA</div>
              <div className="text-right">
                <p className="text-sm font-black text-slate-900 group-hover:text-indigo-600 transition-colors">Admin Hub</p>
                <div className="flex items-center gap-1 justify-end mt-0.5">
                  <Lock className="w-2.5 h-2.5 text-emerald-500" />
                  <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest leading-none">Encrypted</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content Container */}
        <div className="p-8 lg:p-12 pb-32">
          <div className="max-w-[1600px] mx-auto">
            {renderSection()}
          </div>
        </div>
      </main>

      {isSidebarOpen && <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />}
    </div>
  );
};

export default SuperAdminDashboard;
