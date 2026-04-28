import React from 'react';
import { User, Mail, Phone, Calendar, Camera, Shield, Bell, Lock, ShieldCheck, Edit3, Globe, Zap } from 'lucide-react';

interface ProfileProps {
  user: any;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
           <div className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-blue-600" />
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Profile Management</span>
           </div>
           <h1 className="text-3xl font-black text-slate-900 tracking-tight">Account Overview</h1>
           <p className="text-slate-500 font-medium mt-1 text-sm">Update your personal information and security settings.</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-[11px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2">
              <Edit3 className="w-3.5 h-3.5" /> Edit Profile
           </button>
           <div className="bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">Verified</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Profile Card - New Styling */}
        <div className="lg:col-span-12">
           <div className="bg-white rounded-[32px] border border-slate-200/60 shadow-sm overflow-hidden flex flex-col md:flex-row">
              <div className="md:w-1/3 bg-slate-900 p-10 text-white relative overflow-hidden flex flex-col items-center justify-center border-r border-slate-800">
                 <div className="relative z-10 mb-6">
                    <div className="w-32 h-32 rounded-3xl bg-white/10 backdrop-blur-md p-1 border border-white/20 shadow-2xl">
                       <div className="w-full h-full rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-5xl font-black">
                          {user?.full_name?.charAt(0) || user?.name?.charAt(0) || 'U'}
                       </div>
                    </div>
                    <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-white text-slate-900 rounded-xl flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
                       <Camera className="w-4 h-4" />
                    </button>
                 </div>
                 <h2 className="relative z-10 text-2xl font-black mb-1">{user?.full_name || user?.name || 'John Doe'}</h2>
                 <p className="relative z-10 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Platinum Client</p>
                 
                 <div className="relative z-10 mt-10 grid grid-cols-2 gap-4 w-full">
                    <div className="bg-white/5 rounded-2xl p-4 text-center border border-white/5">
                       <p className="text-[8px] font-black text-white/40 uppercase tracking-widest mb-1">Policies</p>
                       <p className="text-xl font-black">03</p>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-4 text-center border border-white/5">
                       <p className="text-[8px] font-black text-white/40 uppercase tracking-widest mb-1">Tenure</p>
                       <p className="text-xl font-black">4y</p>
                    </div>
                 </div>

                 {/* Abstract backgrounds */}
                 <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                 <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-600/10 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2"></div>
              </div>

              <div className="md:w-2/3 p-10 bg-white">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                       <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                          <User className="w-3.5 h-3.5" /> Identity Details
                       </h3>
                       <div className="space-y-4">
                          <div>
                             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Legal Name</p>
                             <p className="text-sm font-bold text-slate-900">{user?.full_name || user?.name || 'John Doe'}</p>
                          </div>
                          <div>
                             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Date of Birth</p>
                             <p className="text-sm font-bold text-slate-900">15 June 1985</p>
                          </div>
                          <div>
                             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Aadhar / Tax ID</p>
                             <p className="text-sm font-bold text-slate-900">•••• •••• 9012</p>
                          </div>
                       </div>
                    </div>

                    <div className="space-y-6">
                       <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5" /> Contact Channels
                       </h3>
                       <div className="space-y-4">
                          <div className="flex items-center justify-between group">
                             <div>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Email Address</p>
                                <p className="text-sm font-bold text-slate-900">{user?.email || 'john@example.com'}</p>
                             </div>
                             <span className="text-[8px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">Primary</span>
                          </div>
                          <div>
                             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Mobile</p>
                             <p className="text-sm font-bold text-slate-900">+91 98765 43210</p>
                          </div>
                          <div>
                             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Region</p>
                             <p className="text-sm font-bold text-slate-900">Noida, UP (IN)</p>
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="mt-10 pt-10 border-t border-slate-50 flex flex-wrap gap-4">
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-50 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-100 transition-all">
                       <Globe className="w-3.5 h-3.5" /> Language: English
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-50 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-100 transition-all">
                       <Zap className="w-3.5 h-3.5" /> Timezone: UTC+5:30
                    </button>
                 </div>
              </div>
           </div>
        </div>

        {/* Security & Settings - New Styling */}
        <div className="lg:col-span-7 space-y-6">
           <div className="bg-white rounded-[32px] border border-slate-200/60 shadow-sm p-8">
              <h3 className="text-sm font-black text-slate-900 mb-8 flex items-center gap-2">
                 <Shield className="w-5 h-5 text-blue-600" />
                 Security Infrastructure
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {[
                   { label: 'Password', desc: 'Last updated 3m ago', icon: Lock, status: 'Update' },
                   { label: 'Two-Factor', desc: 'SMS + Authenticator', icon: ShieldCheck, status: 'Manage', active: true },
                   { label: 'Login History', desc: '3 active sessions', icon: Calendar, status: 'View' },
                   { label: 'Linked Apps', desc: 'Google, Apple', icon: Globe, status: 'Edit' },
                 ].map((item, i) => (
                   <div key={i} className="p-5 rounded-2xl bg-slate-50/50 border border-slate-100 flex items-center justify-between group hover:bg-white hover:border-blue-100 transition-all">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors shadow-sm">
                            <item.icon className="w-5 h-5" />
                         </div>
                         <div>
                            <p className="text-xs font-bold text-slate-900">{item.label}</p>
                            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">{item.desc}</p>
                         </div>
                      </div>
                      <button className="text-[9px] font-black text-blue-600 uppercase tracking-widest hover:underline">{item.status}</button>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-slate-50 rounded-[32px] p-8 border border-slate-200/50">
              <h3 className="text-sm font-black text-slate-900 mb-6 flex items-center gap-2">
                 <Bell className="w-5 h-5 text-purple-600" />
                 Notification Matrix
              </h3>
              <div className="space-y-4">
                 {[
                   { label: 'Policy Renewals', desc: 'Email + Push', active: true },
                   { label: 'Premium Receipts', desc: 'Email only', active: true },
                   { label: 'Claim Updates', desc: 'SMS + Email + Push', active: true },
                   { label: 'Newsletter', desc: 'Weekly roundup', active: false },
                 ].map((item, i) => (
                   <div key={i} className="flex items-center justify-between">
                      <div>
                         <p className="text-xs font-bold text-slate-700">{item.label}</p>
                         <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">{item.desc}</p>
                      </div>
                      <div className={`w-10 h-5 rounded-full p-1 transition-colors cursor-pointer ${item.active ? 'bg-blue-600' : 'bg-slate-300'}`}>
                         <div className={`w-3 h-3 bg-white rounded-full transition-transform ${item.active ? 'translate-x-5' : ''}`}></div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Family & Nominee - Side Panel */}
        <div className="lg:col-span-5 space-y-6">
           <div className="bg-white rounded-[32px] border border-slate-200/60 shadow-sm overflow-hidden">
              <div className="p-7 border-b border-slate-50 flex justify-between items-center">
                 <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                   <Shield className="w-4 h-4 text-emerald-600" />
                   Nominee
                 </h3>
                 <button className="text-[9px] font-black text-blue-600 uppercase tracking-widest">Update</button>
              </div>
              <div className="p-7">
                 <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl font-black">
                       J
                    </div>
                    <div>
                       <h4 className="text-sm font-black text-slate-900">Jane Doe</h4>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Relationship: Spouse</p>
                    </div>
                 </div>
                 <div className="space-y-3">
                    <div className="flex justify-between text-[11px] font-bold">
                       <span className="text-slate-400">Share %</span>
                       <span className="text-slate-900 text-right">100%</span>
                    </div>
                    <div className="flex justify-between text-[11px] font-bold">
                       <span className="text-slate-400">ID Status</span>
                       <span className="text-emerald-600 text-right uppercase tracking-widest text-[9px]">Verified</span>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-[32px] p-8 text-white relative overflow-hidden group shadow-2xl shadow-slate-200">
              <h3 className="text-lg font-black mb-2">Emergency Hub</h3>
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-8">One-click SOS details</p>
              
              <div className="space-y-4">
                 <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
                    <div className="w-10 h-10 bg-red-500/20 text-red-400 rounded-xl flex items-center justify-center">
                       <Phone className="w-5 h-5" />
                    </div>
                    <div>
                       <p className="text-[8px] font-black text-white/40 uppercase tracking-widest">Emergency Contact</p>
                       <p className="text-xs font-bold">+91 90000 00000</p>
                    </div>
                 </div>
                 <button className="w-full py-4 bg-white text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-50 transition-all active:scale-95 shadow-xl shadow-slate-900/40">
                    Manage Emergency Kit
                 </button>
              </div>

              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl"></div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
