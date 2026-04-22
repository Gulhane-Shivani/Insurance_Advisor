import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Shield, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLayout: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Messages' },
    { to: '/admin/users', icon: Users, label: 'Users' },
    { to: '/admin/insurance', icon: Shield, label: 'Insurance' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header section */}
        <div className="mb-8">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-4 inline-block">
            Admin Control Panel
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">
            Welcome back, {user?.full_name || user?.name || 'Administrator'}!
          </h1>
          <p className="text-slate-500 font-medium">Manage the platform, review applications, and handle user inquiries.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 p-6 flex flex-col sticky top-28">
              <nav className="flex-1 space-y-2">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      className={({ isActive }) =>
                        `flex items-center px-4 py-3.5 text-sm font-bold rounded-2xl transition-all ${
                          isActive
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'
                        }`
                      }
                    >
                      <Icon className={`mr-3 h-5 w-5 ${/*isActive ? 'text-white' : ''*/ ''}`} />
                      {link.label}
                    </NavLink>
                  );
                })}
              </nav>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-3.5 text-sm font-bold text-red-600 rounded-2xl hover:bg-red-50 transition-colors"
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  Sign Out
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
