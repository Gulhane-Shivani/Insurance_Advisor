/* src/app/agent_dashboard/sections/AgentProfile.tsx */
import React, { useState } from 'react';
import { 
  User, Phone, MapPin, Award, 
  CreditCard, Lock, Camera,
  Briefcase, Calendar,
  Save, FileText, ChevronRight, Mail, Globe, ShieldCheck, X
} from 'lucide-react';
import { Card, Button } from '../../../components/agent/UI';
import toast from 'react-hot-toast';

const AgentProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Personal');
  const [isUpdating, setIsUpdating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [profile, setProfile] = useState({
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
  });

  // Temporary state for modal editing
  const [tempProfile, setTempProfile] = useState({ ...profile });

  const handleSave = () => {
    setIsUpdating(true);
    toast.loading('Synchronizing profile updates...', { duration: 1500 });
    
    setTimeout(() => {
      setProfile({ ...tempProfile });
      setIsUpdating(false);
      setIsModalOpen(false);
      toast.success('Profile credentials updated successfully!');
    }, 1500);
  };

  const handleModalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempProfile(prev => ({ ...prev, [name]: value }));
  };


  return (
    <div className="space-y-6 pb-10 animate-fade-in max-w-6xl mx-auto">
      {/* Profile Header Card */}
      <Card className="p-0 border-none shadow-xl shadow-slate-200/40 overflow-hidden bg-white">
        <div className="h-28 bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-600 relative">
           <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        </div>
        <div className="px-8 pb-6 -mt-10 relative z-10 flex flex-col md:flex-row items-end gap-6">
           <div className="relative group">
              <div className="w-28 h-28 rounded-3xl bg-white p-1.5 shadow-xl border-4 border-white">
                 <div className="w-full h-full rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-400 relative overflow-hidden font-black text-3xl">
                    {profile.name.substring(0, 2).toUpperCase()}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                       <Camera size={20} className="text-white" />
                    </div>
                 </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-emerald-500 rounded-xl border-2 border-white flex items-center justify-center text-white shadow-lg">
                 <ShieldCheck size={14} />
              </div>
           </div>

           <div className="flex-1 pb-1">
              <div className="flex flex-wrap items-center gap-3 mb-1">
                 <h2 className="text-2xl font-black text-slate-800 tracking-tight">{profile.name}</h2>
                 <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[9px] font-black rounded-md border border-indigo-100 uppercase tracking-widest">{profile.role}</span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                 <p className="flex items-center gap-1.5"><Briefcase size={12} className="text-indigo-400" /> License: {profile.license}</p>
                 <p className="flex items-center gap-1.5"><MapPin size={12} className="text-indigo-400" /> {profile.location}</p>
                 <p className="flex items-center gap-1.5"><Calendar size={12} className="text-indigo-400" /> Joined {profile.joinedDate}</p>
              </div>
           </div>

           <div className="pb-1">
              <Button 
                variant="primary" 
                size="sm" 
                icon={<Save size={16} />} 
                onClick={() => { setTempProfile({...profile}); setIsModalOpen(true); }}
                disabled={isUpdating}
              >
                Update Profile
              </Button>
           </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 p-1 bg-slate-100 rounded-2xl w-fit">
         {['Personal', 'Professional', 'Financial', 'Security'].map(tab => (
           <button 
             key={tab} 
             onClick={() => setActiveTab(tab)}
             className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${activeTab === tab ? 'bg-white text-indigo-600 shadow-xl scale-105' : 'text-slate-500 hover:text-slate-700'}`}
           >
             {tab}
           </button>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
         <div className="lg:col-span-8 space-y-6">
            {activeTab === 'Personal' && (
              <Card className="p-8 border-none shadow-xl shadow-slate-200/30 bg-white">
                 <div className="flex items-center justify-between mb-8 border-b border-slate-50 pb-4">
                    <h3 className="text-sm font-black text-slate-800 flex items-center gap-2 uppercase tracking-[0.1em]"><User size={18} className="text-indigo-600" /> Identity Intelligence</h3>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{profile.id}</span>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><User size={12} /> Full Legal Name</p>
                       <p className="text-xs font-bold text-slate-800 p-4 bg-slate-50 rounded-2xl border border-slate-100">{profile.name}</p>
                    </div>
                    <div className="space-y-2">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Mail size={12} /> Email Address</p>
                       <p className="text-xs font-bold text-slate-800 p-4 bg-slate-50 rounded-2xl border border-slate-100">{profile.email}</p>
                    </div>
                    <div className="space-y-2">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Phone size={12} /> Phone Number</p>
                       <p className="text-xs font-bold text-slate-800 p-4 bg-slate-50 rounded-2xl border border-slate-100">{profile.phone}</p>
                    </div>
                    <div className="space-y-2">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Globe size={12} /> Office Location</p>
                       <p className="text-xs font-bold text-slate-800 p-4 bg-slate-50 rounded-2xl border border-slate-100">{profile.location}</p>
                    </div>
                 </div>
              </Card>
            )}

            {activeTab === 'Professional' && (
              <div className="space-y-6">
                 <Card className="p-8 border-none shadow-xl shadow-slate-200/30 bg-white">
                    <h3 className="text-sm font-black text-slate-800 mb-8 flex items-center gap-2 uppercase tracking-[0.1em]"><Award size={18} className="text-indigo-600" /> Career Analytics</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                       {[
                         { label: 'Experience', val: profile.experience, color: 'text-indigo-600' },
                         { label: 'Avg Rating', val: profile.rating + ' ★', color: 'text-amber-500' },
                         { label: 'Books Managed', val: profile.totalPolicies, color: 'text-emerald-600' },
                         { label: 'Lifetime Comm.', val: profile.totalCommission, color: 'text-blue-600' },
                       ].map((stat, i) => (
                         <div key={i} className="p-6 bg-slate-50 rounded-[24px] border border-slate-100 text-center shadow-sm group hover:scale-105 transition-transform duration-300">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{stat.label}</p>
                            <p className={`text-lg font-black tracking-tight ${stat.color}`}>{stat.val}</p>
                         </div>
                       ))}
                    </div>
                 </Card>
                 <Card className="p-8 border-none shadow-xl bg-white">
                    <h3 className="text-sm font-black text-slate-800 mb-6 uppercase tracking-widest">Specialization Matrix</h3>
                    <div className="flex flex-wrap gap-3">
                       {['Term Life', 'Health', 'Motor', 'General Insurance', 'Business Risk'].map(tag => (
                         <span key={tag} className="px-4 py-2 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-xl border border-indigo-100 uppercase tracking-widest">{tag}</span>
                       ))}
                    </div>
                 </Card>
              </div>
            )}

            {activeTab === 'Financial' && (
               <Card className="p-8 border-none shadow-xl bg-white">
                  <h3 className="text-sm font-black text-slate-800 mb-8 flex items-center gap-2 uppercase tracking-[0.1em]"><CreditCard size={18} className="text-indigo-600" /> Payout Orchestration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bank Institution</label>
                        <p className="text-xs font-bold text-slate-800 p-4 bg-slate-50 rounded-2xl border border-slate-100">{profile.bank.name}</p>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Disbursement Account</label>
                        <p className="text-xs font-bold text-slate-800 p-4 bg-slate-50 rounded-2xl border border-slate-100">{profile.bank.account}</p>
                     </div>
                  </div>
               </Card>
            )}

            {activeTab === 'Security' && (
               <Card className="p-8 border-none shadow-xl bg-white">
                  <h3 className="text-sm font-black text-slate-800 mb-8 flex items-center gap-2 uppercase tracking-[0.1em]"><Lock size={18} className="text-indigo-600" /> Security Protocol</h3>
                  <div className="space-y-4">
                     <div className="flex items-center justify-between p-6 bg-slate-50 rounded-[24px] border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                              <ShieldCheck size={24} />
                           </div>
                           <div>
                              <p className="text-sm font-black text-slate-800">Two-Factor Authentication</p>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Secured by Primary Mobile Number</p>
                           </div>
                        </div>
                        <div className="w-12 h-6 bg-emerald-500 rounded-full p-1 flex justify-end shadow-inner transition-all">
                           <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>
                        </div>
                     </div>
                     <button className="w-full py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg">Change Access Credentials</button>
                  </div>
               </Card>
            )}
         </div>

         {/* Sidebar Stats */}
         <div className="lg:col-span-4 space-y-6">
            <Card className="p-8 border-none shadow-xl bg-slate-900 text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform duration-700">
                  <Award size={100} />
               </div>
               <div className="relative z-10">
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-6">Status Intelligence</p>
                  <div className="flex items-center gap-5">
                     <div className="w-16 h-16 rounded-[24px] bg-white/10 flex items-center justify-center text-white border border-white/10 backdrop-blur-xl shadow-2xl">
                        <Award size={32} />
                     </div>
                     <div>
                        <p className="text-xl font-black tracking-tight">Elite Diamond</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.1em] mt-1">Top 1% Performers</p>
                     </div>
                  </div>
                  <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
                     <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                        <span className="text-slate-500">Region Rank</span>
                        <span className="text-white">#12 / 850</span>
                     </div>
                     <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="w-[85%] h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                     </div>
                  </div>
               </div>
            </Card>

            <Card className="p-6 border-none shadow-xl bg-white">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-50 pb-3">Operational Resources</p>
               <div className="space-y-3">
                  {[
                    { label: 'Agent Policy Manual', icon: FileText, desc: 'Compliance & Guidelines' },
                    { label: 'Technical Support', icon: Phone, desc: '24/7 Priority Desk' },
                  ].map((res, i) => (
                    <div key={i} className="group flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:bg-white cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md">
                       <div className="flex items-center gap-3.5">
                          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-300 group-hover:text-indigo-500 transition-colors shadow-inner">
                             <res.icon size={16} />
                          </div>
                          <div>
                             <span className="text-[11px] font-black text-slate-700 block">{res.label}</span>
                             <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{res.desc}</span>
                          </div>
                       </div>
                       <ChevronRight size={14} className="text-slate-300 group-hover:translate-x-1 group-hover:text-indigo-500 transition-all" />
                    </div>
                  ))}
               </div>
            </Card>
         </div>
      </div>

      {/* Update Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-xl font-black text-slate-800 tracking-tight">Update Professional Profile</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 bg-white rounded-xl shadow-sm"><X size={20} /></button>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Legal Name</label>
                   <input 
                     name="name"
                     className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold outline-none focus:bg-white focus:border-indigo-500 transition-all" 
                     value={tempProfile.name} 
                     onChange={handleModalChange}
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</label>
                   <input 
                     name="email"
                     className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold outline-none focus:bg-white focus:border-indigo-500 transition-all" 
                     value={tempProfile.email} 
                     onChange={handleModalChange}
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone Number</label>
                   <input 
                     name="phone"
                     className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold outline-none focus:bg-white focus:border-indigo-500 transition-all" 
                     value={tempProfile.phone} 
                     onChange={handleModalChange}
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Office Location</label>
                   <input 
                     name="location"
                     className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold outline-none focus:bg-white focus:border-indigo-500 transition-all" 
                     value={tempProfile.location} 
                     onChange={handleModalChange}
                   />
                </div>
              </div>
              
              <div className="pt-6 flex gap-4 border-t border-slate-100">
                 <button 
                   onClick={() => setIsModalOpen(false)}
                   className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
                 >
                   Discard Changes
                 </button>
                 <button 
                   onClick={handleSave}
                   disabled={isUpdating}
                   className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20"
                 >
                   {isUpdating ? 'Synchronizing...' : 'Save Profile Updates'}
                 </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentProfile;
