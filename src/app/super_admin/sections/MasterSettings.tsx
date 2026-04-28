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
    { name: 'Products', icon: Layers, desc: 'Plans & Coverage' },
    { name: 'Carriers', icon: Building2, desc: 'Partners' },
    { name: 'Commission', icon: Percent, desc: 'Payouts' },
    { name: 'Templates', icon: Mail, desc: 'Communications' },
    { name: 'Pricing', icon: Calculator, desc: 'Rating Rules' },
    { name: 'Organization', icon: Briefcase, desc: 'Details' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header - Standardized */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
           <h2 className="text-xl font-bold text-slate-900">Master Configuration</h2>
           <p className="text-sm text-slate-500">Manage global ecosystem parameters</p>
        </div>
        <button className="w-full md:w-auto px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
           <Save className="w-4 h-4" /> Save All Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
         {/* Navigation List - Standardized */}
         <div className="lg:col-span-3 space-y-1">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`
                  w-full flex items-center gap-3 p-4 rounded-xl transition-all text-left
                  ${activeCategory === cat.name 
                    ? 'bg-indigo-600 text-white shadow-lg' 
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}
                `}
              >
                 <cat.icon className={`w-5 h-5 ${activeCategory === cat.name ? 'text-white' : 'text-slate-400'}`} />
                 <div>
                    <h3 className="text-sm font-bold">{cat.name}</h3>
                    <p className={`text-[10px] font-medium uppercase tracking-wider ${activeCategory === cat.name ? 'text-indigo-200' : 'text-slate-400'}`}>{cat.desc}</p>
                 </div>
              </button>
            ))}
         </div>

         {/* Content - Standardized Card */}
         <div className="lg:col-span-9 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            {activeCategory === 'Products' && (
              <div className="space-y-8">
                 <div className="flex justify-between items-center border-b border-slate-100 pb-6">
                    <div>
                       <h2 className="text-lg font-bold text-slate-900">Insurance Products</h2>
                       <p className="text-xs text-slate-500">Active plan architectures</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold hover:bg-indigo-100 transition-all">
                       <Plus className="w-3.5 h-3.5" /> New Product
                    </button>
                 </div>

                 <div className="grid grid-cols-1 gap-3">
                    {[
                      { name: 'Life Insurance (Term)', code: 'LIFE-TRM-01', plans: 4, status: 'Active' },
                      { name: 'Health Insurance (Individual)', code: 'HLTH-IND-02', plans: 6, status: 'Active' },
                      { name: 'Motor Insurance (PV)', code: 'MTR-PV-03', plans: 3, status: 'Active' },
                    ].map(p => (
                      <div key={p.code} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl hover:border-indigo-100 transition-all">
                         <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-indigo-600">
                               <ShieldCheck className="w-5 h-5" />
                            </div>
                            <div>
                               <p className="text-sm font-bold text-slate-900">{p.name}</p>
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{p.code}</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-6">
                            <div className="text-right hidden sm:block">
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Density</p>
                               <p className="text-xs font-bold text-slate-900">{p.plans} Schemes</p>
                            </div>
                            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[9px] font-bold uppercase tracking-widest">{p.status}</span>
                            <ChevronRight className="w-4 h-4 text-slate-300" />
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
            )}
            
            {activeCategory !== 'Products' && (
              <div className="py-20 flex flex-col items-center justify-center text-center">
                 <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-6">
                    <Settings className="w-8 h-8 text-slate-200" />
                 </div>
                 <h3 className="text-base font-bold text-slate-900">{activeCategory} Controls</h3>
                 <p className="text-sm text-slate-400 mt-2">Section under standard maintenance.</p>
              </div>
            )}
         </div>
      </div>
    </div>
  );
};

export default MasterSettings;
