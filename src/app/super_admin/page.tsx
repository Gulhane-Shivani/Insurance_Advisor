import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Settings,
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
  History,
  ShieldCheck,
  Bell,
  Search,
  CreditCard,
  FileText,
  RefreshCw,
  ChevronUp
} from 'lucide-react';

// Admin Section Imports
import AdminOverview from './sections/AdminOverview';
import UserManagement from './sections/UserManagement';
import MasterSettings from './sections/MasterSettings';
import Reports from './sections/Reports';
import SystemConfig from './sections/SystemConfig';
import AuditLogs from './sections/AuditLogs';
import SystemStats from './sections/SystemStats';
import PolicyLifecycleManagement from './sections/PolicyLifecycleManagement';
import PolicyDetailView from './sections/PolicyDetailView';
import RenewalManagement from './sections/RenewalManagement';
import PaymentManagement from './sections/PaymentManagement';
import NotificationCenter from './sections/NotificationCenter';

const SuperAdminDashboard: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedPolicyId, setSelectedPolicyId] = useState<string | null>(null);

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

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleViewCustomer = (e: any) => {
      // For demo purposes, we'll just show the same high-fidelity profile view
      // In a real app, we'd fetch the specific user's policy or data
      setSelectedPolicyId('SG-HLTH-002');
      setActiveSection('policy-detail');
    };

    window.addEventListener('view-customer-profile', handleViewCustomer);
    return () => window.removeEventListener('view-customer-profile', handleViewCustomer);
  }, []);

  const adminMenuItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    {
      id: 'users', label: 'User Management', icon: Users, hasSub: true, subItems: [
        { id: 'staff', label: 'Staff Members', icon: UserIcon },
        { id: 'customers', label: 'Customers', icon: Users },
      ]
    },
    { id: 'policies', label: 'Policies', icon: ShieldCheck },
    { id: 'renewals', label: 'Renewals', icon: RefreshCw },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'master', label: 'Master Settings', icon: Settings },
    { id: 'system', label: 'System Config', icon: Globe },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleViewPolicy = (policyId: string) => {
    setSelectedPolicyId(policyId);
    setActiveSection('policy-detail');
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'overview': return <AdminOverview />;
      case 'users':
      case 'staff':
        return <UserManagement viewType="staff" />;
      case 'customers':
        return <UserManagement viewType="customers" />;
      case 'master': return <MasterSettings />;
      case 'reports': return <Reports />;
      case 'system': return <SystemConfig />;
      case 'audit': return <AuditLogs />;
      case 'stats': return <SystemStats />;
      case 'policies':
        return <PolicyLifecycleManagement onViewPolicy={handleViewPolicy} />;
      case 'policy-detail':
        return selectedPolicyId ? (
          <PolicyDetailView policyId={selectedPolicyId} onBack={() => setActiveSection('policies')} />
        ) : (
          <PolicyLifecycleManagement onViewPolicy={handleViewPolicy} />
        );
      case 'renewals':
        return <RenewalManagement />;
      case 'payments':
        return <PaymentManagement />;
      case 'notifications':
        return <NotificationCenter />;
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
        <div className="h-24 flex flex-col items-center justify-center bg-slate-900 border-b border-white/5">
          <span className="text-xl font-black tracking-tighter text-white flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-900/50">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl leading-none font-black uppercase tracking-tighter">Insurance</span>
              <span className="text-xs text-indigo-400 font-bold uppercase tracking-[0.3em]">Advisor</span>
            </div>
          </span>
          <button onClick={() => setIsSidebarOpen(false)} className="absolute right-4 top-8 p-2 text-slate-500 lg:hidden">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-hide">
          <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6 px-4">Master Console</div>
          {adminMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id || (item.subItems && item.subItems.some(s => s.id === activeSection));

            if (item.hasSub) {
              return (
                <div key={item.id} className="space-y-1">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className={`w-full flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-all duration-200 ${isActive
                      ? 'bg-indigo-600/10 text-indigo-400'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                      }`}
                  >
                    <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                    <span className="flex-1 text-left">{item.label}</span>
                    {isUserMenuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {isUserMenuOpen && (
                    <div className="pl-12 space-y-1">
                      {item.subItems?.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => { setActiveSection(sub.id); setIsSidebarOpen(false); }}
                          className={`w-full flex items-center py-2 text-xs font-bold transition-all ${activeSection === sub.id ? 'text-indigo-400' : 'text-slate-500 hover:text-white'}`}
                        >
                          <sub.icon className="mr-3 h-4 w-4" />
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => { setActiveSection(item.id); setIsSidebarOpen(false); }}
                className={`w-full flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-all duration-200 ${isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
              >
                <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                {item.label}
              </button>
            );
          })}

        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800/50 rounded-2xl p-4 flex items-center gap-3 cursor-pointer hover:bg-slate-800 transition-colors border border-slate-700">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0 text-white font-bold border-2 border-indigo-500/50 shadow-lg">
              SA
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-black text-white truncate">Super Administrator</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Master Authority</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Header - Matching Admin Style */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 z-10 flex-shrink-0">
          <div className="flex items-center gap-8 flex-1">
            <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-slate-600 lg:hidden">
              <Menu size={20} />
            </button>
            <div className="relative w-full max-w-md hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Global search..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-2.5 pl-11 pr-4 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden lg:flex flex-col items-end">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">System Status</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Live & Protected</span>
              </div>
            </div>

            <button className="relative w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="h-8 w-px bg-slate-200"></div>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-3 hover:bg-slate-50 p-1 rounded-2xl transition-all focus:outline-none"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-[11px] font-black text-slate-900 leading-tight">Super Administrator</p>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-tight">Super Admin</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black shadow-lg">
                  SA
                </div>
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
