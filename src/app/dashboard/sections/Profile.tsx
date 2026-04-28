import React from 'react';
import { User, Mail, Phone, MapPin, Calendar, Camera, Shield, Banknote, Bell, Lock, LogOut, ChevronRight, CheckCircle2, ShieldCheck } from 'lucide-react';

interface ProfileProps {
  user: any;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
           <div className="flex items-center gap-2 mb-3">
              <User className="w-5 h-5 text-blue-600" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Account Management</span>
           </div>
           <h1 className="text-4xl font-black text-slate-900 tracking-tight">Profile Settings</h1>
           <p className="text-slate-500 font-medium mt-2">Manage your personal data, security preferences, and linked accounts.</p>
        </div>
        <div className="bg-emerald-50 px-6 py-3 rounded-2xl border border-emerald-100 flex items-center gap-3">
           <ShieldCheck className="w-5 h-5 text-emerald-600" />
           <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Account Secured</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Identity Card */}
        <div className="lg:col-span-4 space-y-8">
           <div className="bg-white rounded-[40px] border border-slate-200/60 shadow-sm p-10 flex flex-col items-center text-center relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
              
              <div className="relative mt-8 mb-8">
                 <div className="w-32 h-32 rounded-[40px] bg-white p-1.5 shadow-2xl">
                    <div className="w-full h-full rounded-[34px] bg-blue-100 flex items-center justify-center text-4xl font-black text-blue-600">
                       {user?.full_name?.charAt(0) || user?.name?.charAt(0) || 'U'}
                    </div>
                 </div>
                 <button className="absolute -bottom-2 -right-2 w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-xl hover:scale-110 transition-transform border-4 border-white">
                    <Camera className="w-5 h-5" />
                 </button>
              </div>

              <h2 className="text-3xl font-black text-slate-900 mb-1">{user?.full_name || user?.name || 'John Doe'}</h2>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-10">Member since January 2020</p>
              
              <div className="w-full space-y-4">
                 <div className="p-4 rounded-2xl bg-slate-50 flex items-center gap-4 text-left group-hover:bg-blue-50 transition-colors">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                       <Mail className="w-5 h-5" />
                    </div>
                    <div className="overflow-hidden">
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Email Address</p>
                       <p className="text-sm font-bold text-slate-800 truncate">{user?.email || 'john@example.com'}</p>
                    </div>
                 </div>
                 <div className="p-4 rounded-2xl bg-slate-50 flex items-center gap-4 text-left group-hover:bg-emerald-50 transition-colors">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm">
                       <Phone className="w-5 h-5" />
                    </div>
                    <div>
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Mobile Number</p>
                       <p className="text-sm font-bold text-slate-800">+91 98765 43210</p>
                    </div>
                 </div>
              </div>
           </div>

           {/* Security Panel */}
           <div className="bg-slate-900 rounded-[40px] p-10 text-white shadow-2xl shadow-slate-200">
              <h3 className="text-xs font-black text-white/40 uppercase tracking-widest mb-8">Privacy & Security</h3>
              <div className="space-y-4">
                 {[
                   { label: 'Change Password', icon: Lock, color: 'text-blue-400' },
                   { label: 'Login Activity', icon: Calendar, color: 'text-purple-400' },
                   { label: '2FA Auth', icon: ShieldCheck, color: 'text-emerald-400', active: true },
                 ].map((item, i) => (
                   <button key={i} className="w-full flex items-center justify-between p-5 bg-white/5 hover:bg-white/10 rounded-2xl transition-all group">
                      <div className="flex items-center gap-4">
                         <div className={`w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center ${item.color}`}>
                            <item.icon className="w-5 h-5" />
                         </div>
                         <span className="text-sm font-bold">{item.label}</span>
                      </div>
                      {item.active ? (
                        <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest bg-emerald-400/10 px-2 py-1 rounded-lg">Active</span>
                      ) : (
                        <ChevronRight className="w-4 h-4 text-white/20 group-hover:translate-x-1 transition-transform" />
                      )}
                   </button>
                 ))}
                 
                 <button className="w-full flex items-center justify-between p-5 bg-red-500/10 hover:bg-red-500/20 rounded-2xl transition-all group mt-10">
                    <div className="flex items-center gap-4 text-red-400">
                       <LogOut className="w-5 h-5" />
                       <span className="text-sm font-bold">Sign Out from all devices</span>
                    </div>
                 </button>
              </div>
           </div>
        </div>

        {/* Right: Detailed Sections */}
        <div className="lg:col-span-8 space-y-8">
           {/* Personal Info */}
           <div className="bg-white rounded-[40px] border border-slate-200/60 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                 <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                   <User className="w-6 h-6 text-blue-600" />
                   Personal Information
                 </h3>
                 <button className="px-5 py-2 bg-slate-50 hover:bg-blue-50 text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors">Edit Details</button>
              </div>
              <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                    <p className="text-base font-bold text-slate-900">{user?.full_name || user?.name || 'John Doe'}</p>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date of Birth</label>
                    <p className="text-base font-bold text-slate-900">15 June 1985</p>
                 </div>
                 <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Primary Address</label>
                    <p className="text-base font-bold text-slate-900 leading-relaxed max-w-lg">
                       123, Future Invo Tower, Sector 62,<br />
                       Noida, Uttar Pradesh - 201301, India
                    </p>
                 </div>
              </div>
           </div>

           {/* Nominee */}
           <div className="bg-white rounded-[40px] border border-slate-200/60 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                 <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                   <Shield className="w-6 h-6 text-emerald-600" />
                   Nominee Information
                 </h3>
                 <button className="px-5 py-2 bg-slate-50 hover:bg-blue-50 text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors">Update</button>
              </div>
              <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nominee Name</label>
                    <p className="text-base font-bold text-slate-900">Jane Doe</p>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Relationship</label>
                    <p className="text-base font-bold text-slate-900">Spouse</p>
                 </div>
              </div>
           </div>

           {/* Bank Details */}
           <div className="bg-white rounded-[40px] border border-slate-200/60 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                 <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                   <Banknote className="w-6 h-6 text-purple-600" />
                   Settlement Bank Account
                 </h3>
                 <button className="px-5 py-2 bg-slate-50 hover:bg-blue-50 text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors">Link New Bank</button>
              </div>
              <div className="p-10 flex items-center gap-8">
                 <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-4xl shadow-inner italic font-black text-slate-300">
                    HDFC
                 </div>
                 <div>
                    <h4 className="text-xl font-black text-slate-900 mb-1">HDFC Bank Limited</h4>
                    <p className="text-sm font-bold text-slate-400">Account: •••• •••• 9012</p>
                    <div className="flex items-center gap-2 mt-2">
                       <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                       <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Verified Account</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
