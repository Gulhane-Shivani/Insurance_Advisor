import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Shield, 
  MoreHorizontal, 
  Search, 
  Filter, 
  Mail, 
  CheckCircle2, 
  XCircle, 
  Trash2, 
  Edit3,
  Lock,
  ChevronRight,
  UserCheck,
  UserCog
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
    { name: 'Super Admin', desc: 'Full system control', count: 2, icon: Shield, color: 'red' },
    { name: 'Admin', desc: 'Departmental oversight', count: 5, icon: Lock, color: 'indigo' },
    { name: 'Agent', desc: 'Sales & Customer service', count: 24, icon: Users, color: 'blue' },
    { name: 'CSR', desc: 'Support & Tickets', count: 12, icon: UserCheck, color: 'emerald' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
           <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] mb-2">Personnel Directory</p>
           <h1 className="text-4xl font-black text-slate-900 tracking-tight">User & Role Control</h1>
           <p className="text-slate-500 font-medium mt-2">Manage system access, define administrative roles, and monitor user activity across the organization.</p>
        </div>
        <button className="px-8 py-3.5 bg-indigo-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all flex items-center gap-3 active:scale-95">
           <UserPlus className="w-4 h-4" /> Add New User
        </button>
      </div>

      {/* Role Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {roles.map((role, i) => (
           <div key={i} className="bg-white rounded-[32px] p-6 border border-slate-200/60 shadow-sm group hover:border-indigo-100 hover:shadow-xl transition-all cursor-pointer">
              <div className="flex items-center gap-4 mb-6">
                 <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                   role.color === 'red' ? 'bg-red-50 text-red-600' :
                   role.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' :
                   role.color === 'blue' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'
                 }`}>
                    <role.icon className="w-6 h-6" />
                 </div>
                 <div>
                    <h3 className="text-base font-black text-slate-900">{role.name}</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{role.count} Active Users</p>
                 </div>
              </div>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed mb-4">{role.desc}</p>
              <div className="flex items-center gap-1.5 text-indigo-600 font-black text-[10px] uppercase tracking-widest">
                 Manage Permissions <ChevronRight className="w-3.5 h-3.5" />
              </div>
           </div>
         ))}
      </div>

      {/* User Table Card */}
      <div className="bg-white rounded-[40px] border border-slate-200/60 shadow-sm overflow-hidden">
         {/* Table Actions */}
         <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex bg-slate-100 p-1.5 rounded-2xl w-full md:w-auto">
               {['All Users', 'Active', 'Inactive', 'Admins'].map(tab => (
                 <button 
                   key={tab}
                   onClick={() => setActiveTab(tab)}
                   className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                     activeTab === tab ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                   }`}
                 >
                    {tab}
                 </button>
               ))}
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
               <div className="flex-1 md:w-64 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 flex items-center gap-3 group focus-within:bg-white focus-within:border-indigo-500 transition-all">
                  <Search className="w-4 h-4 text-slate-400" />
                  <input type="text" placeholder="Search by name or email..." className="bg-transparent border-none outline-none text-[12px] font-bold w-full" />
               </div>
               <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-slate-900 transition-all">
                  <Filter className="w-4 h-4" />
               </button>
            </div>
         </div>

         {/* Table Content */}
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="border-b border-slate-50">
                     <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">User Details</th>
                     <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Access Role</th>
                     <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                     <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Last Login</th>
                     <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-black shadow-inner">
                                {user.avatar}
                             </div>
                             <div>
                                <p className="text-[13px] font-black text-slate-900 leading-tight">{user.name}</p>
                                <p className="text-[11px] font-bold text-slate-400">{user.email}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-2">
                             <UserCog className="w-3.5 h-3.5 text-slate-300" />
                             <span className="text-xs font-bold text-slate-600">{user.role}</span>
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                            user.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'
                          }`}>
                             {user.status === 'Active' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                             {user.status}
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <p className="text-[11px] font-black text-slate-500">{user.lastLogin}</p>
                       </td>
                       <td className="px-8 py-6 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="Edit Permissions">
                                <Edit3 className="w-4 h-4" />
                             </button>
                             <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Terminate Access">
                                <Trash2 className="w-4 h-4" />
                             </button>
                             <button className="p-2 text-slate-400 rounded-lg transition-all">
                                <MoreHorizontal className="w-4 h-4" />
                             </button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>

         {/* Pagination Mock */}
         <div className="p-8 bg-slate-50/50 border-t border-slate-50 flex justify-between items-center">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Showing 5 of 244 Personnel</p>
            <div className="flex gap-2">
               <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400">Previous</button>
               <button className="px-4 py-2 bg-white border border-indigo-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-indigo-600">Next Page</button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default UserManagement;
