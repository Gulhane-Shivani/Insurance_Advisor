import React, { useState, useRef, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Shield, 
  LogOut, 
  ExternalLink, 
  User, 
  ChevronDown,
  BarChart3,
  ClipboardList,
  Target,
  Search,
  CheckSquare,
  IndianRupee,
  Megaphone,
  Briefcase
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLayout: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navGroups = [
    {
      title: 'Operations',
      links: [
        { to: '/admin/overview', icon: LayoutDashboard, label: 'Business Overview' },
        { to: '/admin/leads', icon: Target, label: 'Lead Management' },
        { to: '/admin/policies', icon: Shield, label: 'Policy Management' },
      ]
    },
    {
      title: 'Performance',
      links: [
        { to: '/admin/team', icon: Users, label: 'Team Performance' },
        { to: '/admin/customer-360', icon: Search, label: 'Customer 360°' },
        { to: '/admin/approvals', icon: CheckSquare, label: 'Approvals & Tasks' },
      ]
    },
    {
      title: 'Enterprise',
      links: [
        { to: '/admin/finance', icon: IndianRupee, label: 'Commission & Finance' },
        { to: '/admin/reports', icon: BarChart3, label: 'Reports' },
        { to: '/admin/communication', icon: Megaphone, label: 'Communication' },
      ]
    },
    {
      title: 'System',
      links: [
        { to: '/admin/users', icon: Briefcase, label: 'User Control' },
        { to: '/admin/dashboard', icon: ClipboardList, label: 'Support Messages' },
      ]
    }
  ];

  const getPageTitle = () => {
    for (const group of navGroups) {
      const link = group.links.find(l => location.pathname.includes(l.to));
      if (link) return link.label;
    }
    return 'Admin Panel';
  };

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] overflow-hidden font-sans antialiased text-slate-900">
      {/* Sidebar - Higher Density */}
      <aside className="w-60 bg-slate-900 text-white flex flex-col flex-shrink-0 shadow-2xl z-20">
        <div className="h-14 flex items-center px-5 bg-slate-950 border-b border-slate-800/50">
          <span className="text-lg font-black tracking-tighter text-white flex items-center gap-2">
            <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-900/20">
              <Shield className="w-4 h-4 text-white" />
            </div>
            OP-MANAGER
          </span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto custom-scrollbar">
          {navGroups.map((group) => (
            <div key={group.title} className="space-y-1">
              <div className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] px-3 mb-2">{group.title}</div>
              {group.links.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `flex items-center px-3 py-2 text-[12px] font-bold rounded-lg transition-all duration-200 ${isActive
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/40'
                        : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                      }`
                    }
                  >
                    <Icon className="mr-2.5 h-4 w-4" />
                    {link.label}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="p-3 border-t border-slate-800/50">
          <div className="bg-slate-800/50 rounded-xl p-3 flex items-center gap-2.5 border border-slate-700/30">
            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center flex-shrink-0 text-white font-black text-xs">
              {user?.full_name?.charAt(0) || 'A'}
            </div>
            <div className="overflow-hidden">
              <p className="text-[11px] font-black text-white truncate">{user?.full_name || 'Administrator'}</p>
              <p className="text-[9px] text-slate-500 font-bold truncate uppercase tracking-wider">Ops Manager</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Header - Slimmer */}
        <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10 flex-shrink-0 shadow-sm">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-black text-slate-800 tracking-tight">{getPageTitle()}</h1>
            <div className="h-4 w-px bg-slate-200"></div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden md:block">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all uppercase tracking-wider"
            >
              <ExternalLink size={12} />
              Live Site
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 hover:bg-slate-50 p-1 pr-2 rounded-full border border-transparent hover:border-slate-200 transition-all focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-xs shadow-inner">
                  {user?.full_name?.charAt(0) || 'A'}
                </div>
                <ChevronDown size={14} className={`text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-slate-100 mb-1">
                    <p className="text-xs font-black text-slate-800">{user?.full_name || 'Administrator'}</p>
                    <p className="text-[10px] text-slate-500 truncate">{user?.email || 'admin@system.com'}</p>
                  </div>

                  <button className="w-full text-left px-4 py-2 text-[11px] font-bold text-slate-700 hover:bg-slate-50 flex items-center">
                    <User className="w-3.5 h-3.5 mr-2.5 text-slate-400" />
                    Profile Settings
                  </button>

                  <div className="h-px bg-slate-100 my-1"></div>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-[11px] font-bold text-red-600 hover:bg-red-50 flex items-center"
                  >
                    <LogOut className="w-3.5 h-3.5 mr-2.5" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content - More breathing room but tight components */}
        <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
          <div className="max-w-7xl mx-auto h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
