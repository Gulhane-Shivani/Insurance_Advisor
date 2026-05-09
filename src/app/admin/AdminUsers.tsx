import React, { useState } from 'react';
import { Users, Briefcase } from 'lucide-react';
import UserManagement from '../super_admin/sections/UserManagement';

const AdminUsers: React.FC = () => {
  const [activeView, setActiveView] = useState<'staff' | 'customers'>('customers');

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header with Toggle */}
      <div className="bg-white/40 backdrop-blur-xl p-6 rounded-[28px] border border-white/60 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">User Control</h1>
          <p className="text-[11px] font-bold text-slate-400 mt-1">
            {activeView === 'customers' ? 'All registered customers on the platform' : 'All platform staff — agents, CSRs, and admins'}
          </p>
        </div>

        {/* Toggle Pill */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl shadow-inner border border-slate-200/60">
          <button
            onClick={() => setActiveView('customers')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black transition-all duration-200 ${
              activeView === 'customers'
                ? 'bg-white text-indigo-600 shadow-md shadow-indigo-100'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            Customers
          </button>
          <button
            onClick={() => setActiveView('staff')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black transition-all duration-200 ${
              activeView === 'staff'
                ? 'bg-white text-indigo-600 shadow-md shadow-indigo-100'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Staff
          </button>
        </div>
      </div>

      {/* Shared UserManagement Component */}
      <UserManagement viewType={activeView} />
    </div>
  );
};

export default AdminUsers;
