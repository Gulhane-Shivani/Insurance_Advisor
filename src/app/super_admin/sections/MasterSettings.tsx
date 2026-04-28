import React, { useState } from 'react';
import {
   Settings,
   Building2,
   Layers,
   Briefcase,
   Percent,
   Mail,
   Calculator,
   Globe,
   ShieldCheck,
   ChevronRight,
   Database,
   Layout,
   Smartphone,
   Save,
   Plus
} from 'lucide-react';

const MasterSettings: React.FC = () => {
   const [activeCategory, setActiveCategory] = useState('Products');

   const categories = [
      { name: 'Products', icon: Layers, desc: 'Plans & Coverage Rules' },
      { name: 'Carriers', icon: Building2, desc: 'Insurance Partners' },
      { name: 'Commission', icon: Percent, desc: 'Payout Structures' },
      { name: 'Templates', icon: Mail, desc: 'Email & SMS Content' },
      { name: 'Pricing', icon: Calculator, desc: 'Global Rating Rules' },
      { name: 'Organization', icon: Briefcase, desc: 'Company Details' },
   ];

   return (
      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
         {/* Header */}
         <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
               <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] mb-2">Master Configuration</p>
               <h1 className="text-4xl font-black text-slate-900 tracking-tight">Global Parameters</h1>
               <p className="text-slate-500 font-medium mt-2">Define the core rules, products, and structures that govern the entire Insurance Advisor platform.</p>
            </div>
            <button className="px-8 py-3.5 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-800 shadow-xl transition-all flex items-center gap-3 active:scale-95">
               <Save className="w-4 h-4" /> Save Global Changes
            </button>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Category Sidebar */}
            <div className="lg:col-span-4 space-y-3">
               {categories.map((cat) => (
                  <button
                     key={cat.name}
                     onClick={() => setActiveCategory(cat.name)}
                     className={`
                  w-full flex items-center gap-4 p-6 rounded-[32px] transition-all duration-300 text-left group
                  ${activeCategory === cat.name
                           ? 'bg-white border border-indigo-100 shadow-xl shadow-indigo-500/5'
                           : 'bg-transparent border border-transparent hover:bg-white/50 hover:border-slate-200'}
                `}
                  >
                     <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${activeCategory === cat.name ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-100 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600'
                        }`}>
                        <cat.icon className="w-6 h-6" />
                     </div>
                     <div className="flex-1">
                        <h3 className={`text-base font-black tracking-tight ${activeCategory === cat.name ? 'text-slate-900' : 'text-slate-500'}`}>{cat.name}</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{cat.desc}</p>
                     </div>
                     {activeCategory === cat.name && <ChevronRight className="w-4 h-4 text-indigo-600" />}
                  </button>
               ))}
            </div>

            {/* Content Area */}
            <div className="lg:col-span-8 bg-white rounded-[40px] border border-slate-200/60 shadow-sm p-10">
               {activeCategory === 'Products' && (
                  <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                     <div className="flex justify-between items-center">
                        <div>
                           <h2 className="text-xl font-black text-slate-900 tracking-tight">Insurance Products</h2>
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Manage active plans & riders</p>
                        </div>
                        <button className="flex items-center gap-2 px-6 py-2.5 bg-indigo-50 text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-100 transition-all">
                           <Plus className="w-3.5 h-3.5" /> New Product
                        </button>
                     </div>

                     <div className="space-y-4">
                        {[
                           { name: 'Life Insurance (Term)', code: 'LIFE-TRM-01', plans: 4, status: 'Active' },
                           { name: 'Health Insurance (Individual)', code: 'HLTH-IND-02', plans: 6, status: 'Active' },
                           { name: 'Motor Insurance (PV)', code: 'MTR-PV-03', plans: 3, status: 'Active' },
                           { name: 'Corporate Group Health', code: 'HLTH-GRP-04', plans: 2, status: 'Draft' },
                        ].map(p => (
                           <div key={p.code} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-slate-50 border border-slate-100 rounded-[24px] hover:border-indigo-200 hover:bg-indigo-50/10 transition-all group">
                              <div className="flex items-center gap-4 mb-4 md:mb-0">
                                 <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-indigo-600 border border-slate-100 group-hover:border-indigo-200">
                                    <ShieldCheck className="w-5 h-5" />
                                 </div>
                                 <div>
                                    <p className="text-[13px] font-black text-slate-900 tracking-tight">{p.name}</p>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{p.code}</p>
                                 </div>
                              </div>
                              <div className="flex items-center gap-10">
                                 <div className="text-right">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Plans Linked</p>
                                    <p className="text-xs font-black text-slate-900">{p.plans} Schemes</p>
                                 </div>
                                 <div className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${p.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-200 text-slate-500'
                                    }`}>
                                    {p.status}
                                 </div>
                                 <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                                    <ChevronRight className="w-5 h-5" />
                                 </button>
                              </div>
                           </div>
                        ))}
                     </div>

                     <div className="pt-10 border-t border-slate-100">
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">Global Pricing Rules</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="p-6 bg-white border border-slate-200 rounded-2xl">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Base GST Multiplier</p>
                              <div className="flex items-center gap-3">
                                 <input type="text" defaultValue="18.00" className="w-20 p-2 text-center bg-slate-50 border border-slate-200 rounded-lg text-xs font-black" />
                                 <span className="text-xs font-bold text-slate-500">% Percentage</span>
                              </div>
                           </div>
                           <div className="p-6 bg-white border border-slate-200 rounded-2xl">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Auto-Renewal Buffer</p>
                              <div className="flex items-center gap-3">
                                 <input type="text" defaultValue="30" className="w-20 p-2 text-center bg-slate-50 border border-slate-200 rounded-lg text-xs font-black" />
                                 <span className="text-xs font-bold text-slate-500">Days Before Expiry</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               )}

               {activeCategory !== 'Products' && (
                  <div className="h-96 flex flex-col items-center justify-center text-center p-10 border-2 border-dashed border-slate-100 rounded-3xl animate-in fade-in duration-500">
                     <div className="w-20 h-20 rounded-[32px] bg-slate-50 flex items-center justify-center mb-6">
                        <Database className="w-10 h-10 text-slate-200" />
                     </div>
                     <h3 className="text-xl font-black text-slate-900 tracking-tight">{activeCategory} Management</h3>
                     <p className="text-slate-400 font-medium mt-2 max-w-sm">Configuration interface for {activeCategory.toLowerCase()} parameters is initializing. All global rules set here will take immediate effect.</p>
                     <button className="mt-8 px-8 py-3 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200">
                        Open Settings Panel
                     </button>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default MasterSettings;
