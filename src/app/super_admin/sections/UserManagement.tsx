import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Shield, 
  MoreHorizontal, 
  Search, 
  Filter, 
  Trash2, 
  Edit3,
  Lock,
  UserCheck
} from 'lucide-react';

const UserManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All Users');

  const users = [
    { id: 'USR-001', name: 'Amit Patel', email: 'amit.p@insuranceadvisor.com', role: 'Super Admin', status: 'Active', lastLogin: '2 mins ago', avatar: 'AP' },
    { id: 'USR-002', name: 'Priya Sharma', email: 'priya.s@insuranceadvisor.com', role: 'Agent', status: 'Active', lastLogin: '1 hour ago', avatar: 'PS' },
    { id: 'USR-003', name: 'Rahul Varma', email: 'rahul.v@insuranceadvisor.com', role: 'CSR', status: 'Inactive', lastLogin: '3 days ago', avatar: 'RV' },
    { id: 'USR-004', name: 'Sneha Gupta', email: 'sneha.g@insuranceadvisor.com', role: 'Admin', status: 'Active', lastLogin: '12 mins ago', avatar: 'SG' },
    { id: 'USR-005', name: 'Vikram Singh', email: 'vikram.s@insuranceadvisor.com', role: 'Agent', status: 'Active', lastLogin: '5 hours ago', avatar: 'VS' },
  ];

  const roles = [
    { name: 'Super Admin', count: 2, icon: Shield, color: 'red' },
    { name: 'Admin', count: 5, icon: Lock, color: 'indigo' },
    { name: 'Agent', count: 24, icon: Users, color: 'blue' },
    { name: 'CSR', count: 12, icon: UserCheck, color: 'emerald' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Action Header - Standardized */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
         <div>
            <h2 className="text-xl font-bold text-slate-900">Personnel Directory</h2>
            <p className="text-sm text-slate-500">Manage access levels for {users.length} active users</p>
         </div>
         <button className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
            <UserPlus className="w-4 h-4" /> Add New User
         </button>
      </div>

      {/* Role Summary - Simplified Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
         {roles.map((role, i) => (
           <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                role.color === 'red' ? 'bg-red-50 text-red-600' :
                role.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' :
                role.color === 'blue' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'
              }`}>
                 <role.icon className="w-5 h-5" />
              </div>
              <div>
                 <h3 className="text-sm font-bold text-slate-900">{role.name}</h3>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{role.count} Active</p>
              </div>
           </div>
         ))}
      </div>

      {/* Table - Flattened View */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
         <div className="p-5 border-b border-slate-100 flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex bg-slate-50 p-1 rounded-xl w-full lg:w-auto overflow-x-auto">
               {['All Users', 'Active', 'Inactive'].map(tab => (
                 <button 
                   key={tab}
                   onClick={() => setActiveTab(tab)}
                   className={`px-6 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                     activeTab === tab ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                   }`}
                 >
                    {tab}
                 </button>
               ))}
            </div>
            
            <div className="flex items-center gap-3 w-full lg:w-auto">
               <div className="flex-1 lg:w-72 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 flex items-center gap-3 focus-within:bg-white focus-within:border-indigo-500 transition-all">
                  <Search className="w-4 h-4 text-slate-400" />
                  <input type="text" placeholder="Search users..." className="bg-transparent border-none outline-none text-sm w-full" />
               </div>
               <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-slate-900 transition-all">
                  <Filter className="w-4 h-4" />
               </button>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead className="bg-slate-50/50">
                  <tr className="border-b border-slate-100">
                     <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">User</th>
                     <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Role</th>
                     <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                     <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                       <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                             <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-bold shadow-inner">
                                {user.avatar}
                             </div>
                             <div>
                                <p className="text-sm font-bold text-slate-900">{user.name}</p>
                                <p className="text-xs text-slate-400 font-medium">{user.email}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-6 py-5">
                          <span className="text-xs font-semibold text-slate-600">{user.role}</span>
                       </td>
                       <td className="px-6 py-5">
                          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            user.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                          }`}>
                             <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'}`}></div>
                             {user.status}
                          </div>
                       </td>
                       <td className="px-6 py-5 text-right">
                          <div className="flex items-center justify-end gap-1">
                             <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"><Edit3 className="w-4 h-4" /></button>
                             <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><Trash2 className="w-4 h-4" /></button>
                             <button className="p-2 text-slate-400 rounded-lg"><MoreHorizontal className="w-4 h-4" /></button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

export default UserManagement;
