import React, { useState, useRef, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Shield, LogOut, ExternalLink, User, ChevronDown } from 'lucide-react';
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

  const navLinks = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Messages' },
    { to: '/admin/users', icon: Users, label: 'Users' },
    { to: '/admin/insurance', icon: Shield, label: 'Insurance' },
  ];

  const getPageTitle = () => {
    const currentLink = navLinks.find(link => location.pathname.includes(link.to));
    return currentLink ? currentLink.label : 'Dashboard';
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col flex-shrink-0 shadow-xl z-20">
        <div className="h-16 flex items-center px-6 bg-slate-950 border-b border-slate-800">
          <span className="text-xl font-black tracking-tight text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            Admin Panel
          </span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Menu</div>
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                <Icon className="mr-3 h-5 w-5" />
                {link.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800 rounded-xl p-4 flex items-center gap-3 cursor-pointer hover:bg-slate-700 transition-colors">
             <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0 text-white font-bold border border-slate-600">
               {user?.full_name?.charAt(0) || user?.name?.charAt(0) || 'A'}
             </div>
             <div className="overflow-hidden">
               <p className="text-sm font-medium text-white truncate">{user?.full_name || user?.name || 'Administrator'}</p>
               <p className="text-xs text-slate-400 truncate">{user?.email || 'admin@system.com'}</p>
             </div>
          </div>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10 flex-shrink-0 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{getPageTitle()}</h1>
          </div>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate('/')}
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <ExternalLink size={16} />
              Go to Site
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-3 hover:bg-slate-50 p-1 pr-3 rounded-full border border-transparent hover:border-slate-200 transition-all focus:outline-none"
              >
                <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold shadow-inner">
                  {user?.full_name?.charAt(0) || user?.name?.charAt(0) || 'A'}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-bold text-slate-700 leading-tight">{user?.full_name || user?.name || 'Administrator'}</p>
                  <p className="text-xs text-slate-500 font-medium leading-tight">System Admin</p>
                </div>
                <ChevronDown size={16} className={`text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-3 border-b border-slate-100 mb-1">
                    <p className="text-sm font-bold text-slate-800">{user?.full_name || user?.name || 'Administrator'}</p>
                    <p className="text-xs text-slate-500 truncate">{user?.email || 'admin@system.com'}</p>
                  </div>
                  
                  <button 
                    onClick={() => navigate('/')}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center sm:hidden"
                  >
                    <ExternalLink className="w-4 h-4 mr-3 text-slate-400" />
                    Go to Site
                  </button>

                  <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center">
                    <User className="w-4 h-4 mr-3 text-slate-400" />
                    Profile Settings
                  </button>
                  
                  <div className="h-px bg-slate-100 my-1"></div>
                  
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center font-medium"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50/50 p-8">
          <div className="max-w-7xl mx-auto h-full">
            {/* Top context block from original layout */}
            {location.pathname === '/admin/dashboard' && (
              <div className="mb-8">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-4 inline-block">
                  Admin Control Panel
                </span>
                <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">
                  Welcome back, {user?.full_name || user?.name || 'Administrator'}!
                </h1>
                <p className="text-slate-500 font-medium">Manage the platform, review applications, and handle user inquiries.</p>
              </div>
            )}
             <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
