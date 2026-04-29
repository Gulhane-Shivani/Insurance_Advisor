/* src/app/agent_dashboard/sections/AgentProfile.tsx */
import React, { useState } from 'react';
import { 
  User, Mail, Phone, MapPin, Award, 
  Shield, CreditCard, Lock, Camera,
  CheckCircle2, Briefcase, Calendar, Star,
  ExternalLink, Save, FileText, ChevronRight
} from 'lucide-react';
import { Card, Button } from '../../../components/agent/UI';
import toast from 'react-hot-toast';

const AgentProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Personal');

  const agentData = {
    name: 'Demo Agent',
    role: 'Elite Producer',
    id: 'AGN-44922',
    license: 'INS-LIC-2024-001',
    experience: '8 Years',
    specialization: 'Life & Health Insurance',
    email: 'agent.demo@insuranceadvisor.com',
    phone: '+91 98765 43210',
    location: 'Bandra, Mumbai, Maharashtra',
    joinedDate: 'Jan 12, 2020',
    rating: '4.9',
    totalPolicies: '450+',
    totalCommission: '₹1.2 Cr',
    bank: {
      name: 'HDFC Bank',
      account: 'XXXX XXXX 8899',
      ifsc: 'HDFC0001234',
      type: 'Current Account'
    }
  };

  const handleSave = () => {
    toast.success('Profile updated');
  };

  return (
    <div className="space-y-6 pb-10 animate-fade-in max-w-6xl mx-auto">
      {/* Profile Header Card - More Compact */}
      <Card className="p-0 border-none shadow-xl shadow-slate-200/40 overflow-hidden bg-white">
        <div className="h-24 bg-gradient-to-r from-indigo-600 to-blue-600 relative"></div>
        <div className="px-8 pb-6 -mt-10 relative z-10 flex flex-col md:flex-row items-end gap-6">
           <div className="relative group">
              <div className="w-28 h-28 rounded-3xl bg-white p-1.5 shadow-xl border-4 border-white">
                 <div className="w-full h-full rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 relative overflow-hidden">
                    <User size={48} />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                       <Camera size={18} className="text-white" />
                    </div>
                 </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-emerald-500 rounded-xl border-2 border-white flex items-center justify-center text-white shadow-lg">
                 <CheckCircle2 size={14} />
              </div>
           </div>

           <div className="flex-1 pb-1">
              <div className="flex flex-wrap items-center gap-3 mb-1">
                 <h2 className="text-2xl font-black text-slate-800 tracking-tight">{agentData.name}</h2>
                 <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[9px] font-black rounded-md border border-indigo-100 uppercase tracking-widest">{agentData.role}</span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                 <p className="flex items-center gap-1.5"><Briefcase size={12} className="text-indigo-400" /> License: {agentData.license}</p>
                 <p className="flex items-center gap-1.5"><MapPin size={12} className="text-indigo-400" /> {agentData.location}</p>
                 <p className="flex items-center gap-1.5"><Calendar size={12} className="text-indigo-400" /> Joined {agentData.joinedDate}</p>
              </div>
           </div>

           <div className="pb-1">
              <Button variant="primary" size="sm" icon={<Save size={16} />} onClick={handleSave}>Update Profile</Button>
           </div>
        </div>
      </Card>

      {/* Tabs - Smaller */}
      <div className="flex flex-wrap gap-1 p-1 bg-slate-100 rounded-2xl w-fit">
         {['Personal', 'Professional', 'Financial', 'Security'].map(tab => (
           <button 
             key={tab} 
             onClick={() => setActiveTab(tab)}
             className={`px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
           >
             {tab}
           </button>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
         <div className="lg:col-span-8 space-y-6">
            {activeTab === 'Personal' && (
              <Card className="p-6 border-none shadow-lg shadow-slate-200/30">
                 <h3 className="text-sm font-black text-slate-800 mb-6 flex items-center gap-2 uppercase tracking-widest"><User size={16} className="text-indigo-600" /> Personal Identity</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                       <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Full Legal Name</label>
                       <input className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:border-indigo-500 transition-all" defaultValue={agentData.name} />
                    </div>
                    <div className="space-y-1">
                       <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Email Address</label>
                       <input className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:border-indigo-500 transition-all" defaultValue={agentData.email} />
                    </div>
                    <div className="space-y-1">
                       <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Phone Number</label>
                       <input className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:border-indigo-500 transition-all" defaultValue={agentData.phone} />
                    </div>
                    <div className="space-y-1">
                       <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Office Location</label>
                       <input className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:border-indigo-500 transition-all" defaultValue={agentData.location} />
                    </div>
                 </div>
              </Card>
            )}

            {activeTab === 'Professional' && (
              <div className="space-y-6">
                 <Card className="p-6 border-none shadow-lg shadow-slate-200/30">
                    <h3 className="text-sm font-black text-slate-800 mb-6 flex items-center gap-2 uppercase tracking-widest"><Award size={16} className="text-indigo-600" /> Career Highlights</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                       {[
                         { label: 'Experience', val: agentData.experience },
                         { label: 'Rating', val: agentData.rating + ' ★' },
                         { label: 'Policies', val: agentData.totalPolicies },
                         { label: 'Commission', val: agentData.totalCommission },
                       ].map((stat, i) => (
                         <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{stat.label}</p>
                            <p className="text-sm font-black text-slate-800 tracking-tight">{stat.val}</p>
                         </div>
                       ))}
                    </div>
                 </Card>
              </div>
            )}

            {activeTab === 'Financial' && (
               <Card className="p-6 border-none shadow-lg shadow-slate-200/30">
                  <h3 className="text-sm font-black text-slate-800 mb-6 flex items-center gap-2 uppercase tracking-widest"><CreditCard size={16} className="text-indigo-600" /> Payout Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Bank Name</label>
                        <input className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:border-indigo-500 transition-all" defaultValue={agentData.bank.name} />
                     </div>
                     <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Account Number</label>
                        <input className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:border-indigo-500 transition-all" defaultValue={agentData.bank.account} />
                     </div>
                  </div>
               </Card>
            )}

            {activeTab === 'Security' && (
               <Card className="p-6 border-none shadow-lg shadow-slate-200/30">
                  <h3 className="text-sm font-black text-slate-800 mb-6 flex items-center gap-2 uppercase tracking-widest"><Lock size={16} className="text-indigo-600" /> Security</h3>
                  <div className="space-y-4">
                     <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <div>
                           <p className="text-xs font-black text-slate-800">Two-Factor Auth</p>
                           <p className="text-[9px] font-bold text-slate-400 uppercase">Secured by OTP</p>
                        </div>
                        <div className="w-10 h-5 bg-emerald-500 rounded-full p-1 flex justify-end">
                           <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                     </div>
                  </div>
               </Card>
            )}
         </div>

         {/* Sidebar - More Compact */}
         <div className="lg:col-span-4 space-y-6">
            <Card className="p-6 border-none shadow-lg shadow-slate-200/30 bg-slate-900 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-5">
                  <Award size={80} />
               </div>
               <div className="relative z-10">
                  <p className="text-[8px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-4">Badge Status</p>
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white border border-white/10">
                        <Award size={24} />
                     </div>
                     <div>
                        <p className="text-lg font-black tracking-tight">Elite Diamond</p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Top 1% in region</p>
                     </div>
                  </div>
               </div>
            </Card>

            <Card className="p-6 border-none shadow-lg shadow-slate-200/30">
               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">Quick Links</p>
               <div className="space-y-2">
                  {[
                    { label: 'Agent Manual', icon: FileText },
                    { label: 'Support Desk', icon: Phone },
                  ].map((res, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-indigo-100 cursor-pointer transition-all">
                       <div className="flex items-center gap-2.5">
                          <res.icon size={14} className="text-slate-300" />
                          <span className="text-xs font-bold text-slate-600">{res.label}</span>
                       </div>
                       <ChevronRight size={12} className="text-slate-300" />
                    </div>
                  ))}
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
};

export default AgentProfile;
