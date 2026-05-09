import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Briefcase, 
  Phone, 
  Mail, 
  Award, 
  TrendingUp, 
  ShieldCheck, 
  Users, 
  Calendar,
  Settings,
  Edit2,
  Camera,
  Star,
  Target,
  X,
  Save
} from 'lucide-react';

const AgentProfile: React.FC = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Rahul Sharma",
    photo: null as string | null,
    role: "Senior Insurance Advisor",
    branch: "Mumbai Central, MH",
    experience: "8+ Years",
    id: "AGT-10294",
    email: "rahul.sharma@insuranceadvisor.com",
    phone: "+91 98765 43210",
    rating: 4.9,
    assignedPolicies: 120,
    activeClients: 95,
    monthlyTarget: "₹5,00,000",
    achievement: "78%",
    bio: "Passionate insurance professional dedicated to helping families and businesses secure their future. Specialist in Life and Health insurance portfolio management."
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditModalOpen(false);
    // In a real app, you'd call an API here
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      {/* Compact Profile Top Header */}
      <div className="relative">
         <div className="h-32 bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 rounded-[32px] shadow-lg shadow-indigo-100"></div>
         <div className="px-8 -mt-12 relative z-10 flex flex-col md:flex-row items-end gap-6">
            <div className="relative group">
               <div className="w-28 h-28 rounded-[32px] bg-white p-1.5 shadow-2xl">
                  <div className="w-full h-full rounded-[24px] bg-slate-100 flex items-center justify-center overflow-hidden relative">
                     <User size={48} className="text-slate-300" />
                     <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center cursor-pointer">
                        <Camera size={20} className="text-white" />
                     </div>
                  </div>
               </div>
               <div className="absolute bottom-2 right-2 w-7 h-7 bg-emerald-500 rounded-lg border-[3.5px] border-white flex items-center justify-center shadow-lg">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
               </div>
            </div>

            <div className="flex-1 pb-2">
               <div className="flex flex-wrap items-center gap-3 mb-1.5">
                  <h1 className="text-xl font-black text-slate-900 tracking-tight">{profileData.name}</h1>
                  <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-md text-[8px] font-black uppercase tracking-widest border border-indigo-100">Verified Advisor</span>
               </div>
               <div className="flex flex-wrap items-center gap-5">
                  <div className="flex items-center gap-1.5 text-slate-500 font-bold text-xs">
                     <MapPin size={14} className="text-slate-400" /> {profileData.branch}
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500 font-bold text-xs">
                     <Briefcase size={14} className="text-slate-400" /> {profileData.experience} Exp
                  </div>
                  <div className="flex items-center gap-1.5 text-amber-500 font-black text-xs">
                     <Star size={14} fill="currentColor" /> {profileData.rating}
                  </div>
               </div>
            </div>

            <div className="flex gap-2 pb-2">
               <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                  <Settings size={18} />
               </button>
               <button 
                  onClick={() => setIsEditModalOpen(true)}
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center gap-2"
               >
                  <Edit2 size={14} /> Edit Profile
               </button>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Left Column: Compact Stats */}
         <div className="lg:col-span-1 space-y-5">
            <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
               <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-5">Performance Snapshot</h3>
               <div className="space-y-3">
                  {[
                    { label: 'Policies', value: profileData.assignedPolicies, icon: ShieldCheck, color: 'indigo' },
                    { label: 'Clients', value: profileData.activeClients, icon: Users, color: 'blue' },
                    { label: 'Target', value: profileData.monthlyTarget, icon: Target, color: 'purple' },
                  ].map((stat, i) => (
                    <div key={i} className="flex items-center gap-3.5 p-3.5 bg-slate-50 rounded-[24px] border border-slate-50 group hover:bg-white hover:border-indigo-100 transition-all cursor-pointer">
                       <div className="w-10 h-10 rounded-xl bg-white text-indigo-600 flex items-center justify-center shadow-sm">
                          <stat.icon size={18} />
                       </div>
                       <div>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                          <p className="text-base font-black text-slate-900">{stat.value}</p>
                       </div>
                    </div>
                  ))}
               </div>

               <div className="mt-6 pt-6 border-t border-slate-50">
                  <div className="flex justify-between items-center mb-1.5">
                     <p className="text-[9px] font-black text-slate-800 uppercase">Achievement</p>
                     <span className="text-[9px] font-black text-indigo-600">{profileData.achievement}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                     <div className="h-full bg-indigo-500 rounded-full" style={{ width: profileData.achievement }}></div>
                  </div>
               </div>
            </div>

            <div className="bg-slate-900 p-6 rounded-[32px] text-white shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-6 opacity-5">
                  <Award size={80} />
               </div>
               <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4">Advisor Rank</h3>
               <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center border border-white/10">
                     <Award size={24} className="text-amber-400" />
                  </div>
                  <div>
                     <p className="text-base font-black">Elite Producer</p>
                     <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Top 5% Region</p>
                  </div>
               </div>
               <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-[8px] font-black uppercase tracking-widest transition-all">View All Badges</button>
            </div>
         </div>

         {/* Right Column: Bio & History */}
         <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
               <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-4">About {profileData.name.split(' ')[0]}</h3>
               <p className="text-xs font-bold text-slate-500 leading-relaxed mb-6">{profileData.bio}</p>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-4">
                     <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Contact Information</h4>
                     <div className="space-y-2.5">
                        <div className="flex items-center gap-3 text-slate-700">
                           <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                              <Mail size={14} />
                           </div>
                           <span className="text-[11px] font-black">{profileData.email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-700">
                           <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                              <Phone size={14} />
                           </div>
                           <span className="text-[11px] font-black">{profileData.phone}</span>
                        </div>
                     </div>
                  </div>
                  <div className="space-y-4">
                     <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Regional Assignment</h4>
                     <div className="space-y-2.5">
                        <div className="flex items-center gap-3 text-slate-700">
                           <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                              <MapPin size={14} />
                           </div>
                           <span className="text-[11px] font-black">{profileData.branch}</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-700">
                           <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                              <Calendar size={14} />
                           </div>
                           <span className="text-[11px] font-black">Joined Jan 2018</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Career Progress</h3>
                  <TrendingUp size={16} className="text-emerald-500" />
               </div>
               <div className="space-y-6 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-50">
                  {[
                    { year: '2025', title: 'Elite Producer Status', sub: 'Regional Recognition' },
                    { year: '2023', title: '100+ Active Portfolios', sub: 'Major Milestone' },
                    { year: '2021', title: 'Promotion: Senior Advisor', sub: 'Mumbai Central' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-5 relative">
                       <div className="w-9 h-9 rounded-full bg-white border-2 border-indigo-600 flex items-center justify-center z-10 shadow-sm shrink-0">
                          <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                       </div>
                       <div>
                          <p className="text-[9px] font-black text-indigo-600 mb-0.5">{item.year}</p>
                          <h4 className="text-[11px] font-black text-slate-800 leading-tight">{item.title}</h4>
                          <p className="text-[10px] font-bold text-slate-400">{item.sub}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsEditModalOpen(false)}></div>
           <div className="relative w-full max-w-xl bg-white rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                 <div>
                    <h3 className="text-xl font-black text-slate-900">Edit Your Profile</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Update your professional identity</p>
                 </div>
                 <button onClick={() => setIsEditModalOpen(false)} className="p-2 text-slate-400 hover:bg-slate-50 rounded-xl transition-all">
                    <X size={20} />
                 </button>
              </div>
              <form onSubmit={handleSave} className="p-8 space-y-6">
                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                       <input 
                         type="text" 
                         value={profileData.name} 
                         onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                         className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Official Email</label>
                       <input 
                         type="email" 
                         value={profileData.email} 
                         onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                         className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Contact Number</label>
                       <input 
                         type="text" 
                         value={profileData.phone} 
                         onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                         className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Current Branch</label>
                       <input 
                         type="text" 
                         value={profileData.branch} 
                         onChange={(e) => setProfileData({...profileData, branch: e.target.value})}
                         className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none"
                       />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Professional Biography</label>
                    <textarea 
                      value={profileData.bio} 
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      rows={3}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none resize-none"
                    />
                 </div>
                 <div className="pt-4 flex gap-3">
                    <button type="button" onClick={() => setIsEditModalOpen(false)} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all">Cancel</button>
                    <button type="submit" className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2">
                       <Save size={16} /> Save Changes
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default AgentProfile;
