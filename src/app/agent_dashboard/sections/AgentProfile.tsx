import React from 'react';
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
  IndianRupee,
  Calendar,
  Settings,
  Edit2,
  Camera,
  Star,
  Zap,
  Target,
  ArrowUpRight
} from 'lucide-react';

const AgentProfile: React.FC = () => {
  const profileData = {
    name: "Rahul Sharma",
    photo: null,
    role: "Senior Insurance Advisor",
    branch: "Mumbai Central, MH",
    experience: "8+ Years",
    id: "AGT-10294",
    email: "rahul.sharma@safeguard.com",
    phone: "+91 98765 43210",
    rating: 4.9,
    assignedPolicies: 120,
    activeClients: 95,
    monthlyTarget: "₹5,00,000",
    achievement: "78%",
    bio: "Passionate insurance professional dedicated to helping families and businesses secure their future. Specialist in Life and Health insurance portfolio management."
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Profile Top Header */}
      <div className="relative">
         <div className="h-48 bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 rounded-[32px] shadow-lg shadow-indigo-100"></div>
         <div className="px-8 -mt-16 relative z-10 flex flex-col md:flex-row items-end gap-6">
            <div className="relative group">
               <div className="w-40 h-40 rounded-[40px] bg-white p-2 shadow-2xl">
                  <div className="w-full h-full rounded-[32px] bg-slate-100 flex items-center justify-center overflow-hidden relative">
                     <User size={64} className="text-slate-300" />
                     <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                        <Camera className="text-white" />
                     </div>
                  </div>
               </div>
               <div className="absolute bottom-4 right-4 w-8 h-8 bg-emerald-500 rounded-xl border-4 border-white flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
               </div>
            </div>

            <div className="flex-1 pb-4">
               <div className="flex flex-wrap items-center gap-4 mb-2">
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">{profileData.name}</h1>
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-indigo-100">Verified Advisor</span>
               </div>
               <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
                     <MapPin size={16} className="text-slate-400" /> {profileData.branch}
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
                     <Briefcase size={16} className="text-slate-400" /> {profileData.experience} Experience
                  </div>
                  <div className="flex items-center gap-2 text-amber-500 font-black text-sm">
                     <Star size={16} fill="currentColor" /> {profileData.rating} Rating
                  </div>
               </div>
            </div>

            <div className="flex gap-3 pb-4">
               <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                  <Settings size={20} />
               </button>
               <button className="px-6 py-3 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-2">
                  <Edit2 size={16} /> Edit Profile
               </button>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Left Column: Stats & Performance */}
         <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
               <h3 className="text-lg font-black text-slate-900 mb-6">Performance Snapshot</h3>
               <div className="space-y-6">
                  {[
                    { label: 'Assigned Policies', value: profileData.assignedPolicies, icon: ShieldCheck, color: 'indigo' },
                    { label: 'Active Clients', value: profileData.activeClients, icon: Users, color: 'blue' },
                    { label: 'Monthly Goal', value: profileData.monthlyTarget, icon: Target, color: 'purple' },
                  ].map((stat, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-white hover:border-indigo-100 transition-all cursor-pointer">
                       <div className={`w-12 h-12 rounded-xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}>
                          <stat.icon size={24} />
                       </div>
                       <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                          <p className="text-xl font-black text-slate-900">{stat.value}</p>
                       </div>
                    </div>
                  ))}
               </div>

               <div className="mt-8 pt-8 border-t border-slate-100">
                  <div className="flex justify-between items-center mb-2">
                     <p className="text-xs font-black text-slate-800 uppercase">Target Achievement</p>
                     <span className="text-xs font-black text-indigo-600">{profileData.achievement}</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                     <div className="h-full bg-indigo-500 rounded-full" style={{ width: profileData.achievement }}></div>
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 mt-2">You are ₹1.2L away from your monthly target.</p>
               </div>
            </div>

            <div className="bg-slate-900 p-8 rounded-[32px] text-white shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Award size={100} className="rotate-12" />
               </div>
               <h3 className="text-lg font-black mb-4">Advisor Rank</h3>
               <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/10">
                     <Award size={32} className="text-amber-400" />
                  </div>
                  <div>
                     <p className="text-xl font-black">Elite Producer</p>
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Top 5% Regionally</p>
                  </div>
               </div>
               <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">View All Badges</button>
            </div>
         </div>

         {/* Right Column: Bio & History */}
         <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
               <h3 className="text-lg font-black text-slate-900 mb-6">About Rahul</h3>
               <p className="text-slate-500 font-medium leading-relaxed mb-8">{profileData.bio}</p>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-4">
                     <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Contact Information</h4>
                     <div className="space-y-3">
                        <div className="flex items-center gap-3 text-slate-700">
                           <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                              <Mail size={16} />
                           </div>
                           <span className="text-sm font-bold">{profileData.email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-700">
                           <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                              <Phone size={16} />
                           </div>
                           <span className="text-sm font-bold">{profileData.phone}</span>
                        </div>
                     </div>
                  </div>
                  <div className="space-y-4">
                     <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Regional Assignment</h4>
                     <div className="space-y-3">
                        <div className="flex items-center gap-3 text-slate-700">
                           <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                              <MapPin size={16} />
                           </div>
                           <span className="text-sm font-bold">{profileData.branch}</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-700">
                           <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                              <Calendar size={16} />
                           </div>
                           <span className="text-sm font-bold">Joined Jan 2018</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
               <div className="flex justify-between items-center mb-8">
                  <h3 className="text-lg font-black text-slate-900">Career Progress</h3>
                  <TrendingUp className="text-emerald-500" />
               </div>
               <div className="space-y-8 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-50">
                  {[
                    { year: '2025', title: 'Achieved Elite Producer Status', sub: 'Regional Recognition' },
                    { year: '2023', title: 'Managed 100+ Active Portfolios', sub: 'Major Milestone' },
                    { year: '2021', title: 'Promotion: Senior Advisor', sub: 'Mumbai Central Branch' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6 relative">
                       <div className="w-10 h-10 rounded-full bg-white border-2 border-indigo-600 flex items-center justify-center z-10 shadow-sm">
                          <div className="w-2.5 h-2.5 rounded-full bg-indigo-600"></div>
                       </div>
                       <div>
                          <p className="text-[10px] font-black text-indigo-600 mb-1">{item.year}</p>
                          <h4 className="text-sm font-black text-slate-800">{item.title}</h4>
                          <p className="text-xs font-bold text-slate-400">{item.sub}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AgentProfile;
