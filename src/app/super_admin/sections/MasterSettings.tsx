import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  Building2, 
  Layers, 
  Briefcase, 
  Percent, 
  Mail, 
  Calculator, 
  ShieldCheck, 
  ChevronRight,
  Save,
  Plus,
  Zap,
  CheckCircle2,
  AlertCircle,
  Edit2
} from 'lucide-react';

const MasterSettings: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Products');
  const [isSaving, setIsSaving] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingCode, setEditingCode] = useState<string | null>(null);
  const [newProductData, setNewProductData] = useState({ name: '', code: '', plans: 1, status: 'Draft' });
  const [products, setProducts] = useState([
    { name: 'Life Insurance (Term)', code: 'LIFE-TRM-01', plans: 4, status: 'Active' },
    { name: 'Health Insurance (Individual)', code: 'HLTH-IND-02', plans: 6, status: 'Active' },
    { name: 'Motor Insurance (PV)', code: 'MTR-PV-03', plans: 3, status: 'Active' },
    { name: 'Home Insurance (Standard)', code: 'HOME-STD-04', plans: 2, status: 'Active' },
    { name: 'Travel Insurance (Global)', code: 'TRVL-GLB-05', plans: 5, status: 'Draft' },
    { name: 'Commercial Liability', code: 'COMM-LIAB-06', plans: 3, status: 'Active' },
  ]);

  const carriers = [
    { name: 'HDFC Ergo', type: 'General', status: 'Active', rating: 'A+' },
    { name: 'LIC of India', type: 'Life', status: 'Active', rating: 'A+' },
    { name: 'ICICI Lombard', type: 'General', status: 'Active', rating: 'A+' },
    { name: 'Bajaj Allianz', type: 'General', status: 'Active', rating: 'A' },
    { name: 'SBI Life', type: 'Life', status: 'Active', rating: 'A+' },
    { name: 'Star Health', type: 'Health', status: 'Active', rating: 'A' },
    { name: 'Niva Bupa', type: 'Health', status: 'Review', rating: 'B+' },
    { name: 'Tata AIG', type: 'General', status: 'Active', rating: 'A+' },
  ];

  const commissions = [
    { rule: 'Life - Term 1st Year', payout: '15%', maxCap: '₹50,000', status: 'Active' },
    { rule: 'Health - Renewal', payout: '10%', maxCap: 'No Cap', status: 'Active' },
    { rule: 'Motor - Comprehensive', payout: '5%', maxCap: '₹5,000', status: 'Review' },
    { rule: 'Life - Endowment', payout: '20%', maxCap: '₹1,00,000', status: 'Active' },
    { rule: 'Travel - International', payout: '12%', maxCap: '₹15,000', status: 'Active' },
    { rule: 'Commercial Liability', payout: '8%', maxCap: '₹2,00,000', status: 'Draft' },
  ];

  const templates = [
    { name: 'Welcome Email', channel: 'Email', lastUpdated: 'Oct 12', status: 'Published' },
    { name: 'Policy Renewal Reminder', channel: 'SMS', lastUpdated: 'Oct 15', status: 'Published' },
    { name: 'Claim Initiation', channel: 'Email/SMS', lastUpdated: 'Nov 02', status: 'Draft' },
    { name: 'Payment Receipt', channel: 'Email', lastUpdated: 'Nov 10', status: 'Published' },
    { name: 'KYC Verification Request', channel: 'SMS', lastUpdated: 'Nov 12', status: 'Published' },
    { name: 'Policy Cancellation Notice', channel: 'Email', lastUpdated: 'Nov 15', status: 'Draft' },
  ];

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Master configuration saved successfully');
    }, 1500);
  };

  const handleSaveProduct = () => {
    if (!newProductData.name || !newProductData.code) {
      toast.error('Please fill in all fields');
      return;
    }
    
    if (editingCode) {
      setProducts(products.map(p => p.code === editingCode ? {
        ...p,
        name: newProductData.name,
        code: newProductData.code.toUpperCase(),
        plans: newProductData.plans,
        status: newProductData.status
      } : p));
      toast.success('Product updated successfully');
    } else {
      const newProduct = {
        name: newProductData.name,
        code: newProductData.code.toUpperCase(),
        plans: newProductData.plans,
        status: newProductData.status
      };
      setProducts([...products, newProduct]);
      toast.success(`New product initialized as ${newProductData.status}`);
    }
    
    setShowProductForm(false);
    setEditingCode(null);
    setNewProductData({ name: '', code: '', plans: 1, status: 'Draft' });
  };

  const handleEditProduct = (product: any) => {
    setNewProductData({
      name: product.name,
      code: product.code,
      plans: product.plans,
      status: product.status
    });
    setEditingCode(product.code);
    setShowProductForm(true);
  };

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
        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className="w-full md:w-auto px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 disabled:opacity-70 transition-all flex items-center justify-center gap-2"
        >
           {isSaving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <><Save className="w-4 h-4" /> Save All Changes</>}
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
                    <button onClick={() => {
                      if (showProductForm) {
                        setShowProductForm(false);
                        setEditingCode(null);
                        setNewProductData({ name: '', code: '', plans: 1, status: 'Draft' });
                      } else {
                        setShowProductForm(true);
                      }
                    }} className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold hover:bg-indigo-100 transition-all">
                       {showProductForm ? 'Cancel' : <><Plus className="w-3.5 h-3.5" /> New Product</>}
                    </button>
                 </div>

                 {showProductForm && (
                   <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-2xl border border-indigo-100 mb-8 animate-in slide-in-from-top-4 shadow-sm">
                     <div className="flex items-center gap-3 mb-6">
                         <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                           {editingCode ? <Edit2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </div>
                        <h3 className="text-sm font-bold text-slate-900">{editingCode ? 'Edit Product Configuration' : 'Create New Product Draft'}</h3>
                     </div>
                     <div className="grid grid-cols-1 sm:grid-cols-4 gap-5 mb-6">
                        <div className="space-y-1.5 sm:col-span-2">
                           <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Product Name</label>
                           <input type="text" placeholder="e.g. Premium Health" value={newProductData.name} onChange={(e) => setNewProductData({...newProductData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50 transition-all bg-white shadow-sm" />
                        </div>
                        <div className="space-y-1.5">
                           <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Product Code</label>
                           <input type="text" placeholder="e.g. PRM-HLTH" value={newProductData.code} onChange={(e) => setNewProductData({...newProductData, code: e.target.value})} disabled={!!editingCode} className={`w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50 transition-all bg-white shadow-sm uppercase ${editingCode ? 'opacity-50 cursor-not-allowed bg-slate-100' : ''}`} />
                        </div>
                        <div className="space-y-1.5">
                           <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Initial Plans</label>
                           <input type="number" placeholder="1" min="1" value={newProductData.plans} onChange={(e) => setNewProductData({...newProductData, plans: parseInt(e.target.value) || 1})} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50 transition-all bg-white shadow-sm" />
                        </div>
                     </div>
                     <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 bg-white rounded-xl border border-slate-200 p-1 shadow-sm">
                           {['Active', 'Draft'].map(s => (
                             <button key={s} onClick={() => setNewProductData({...newProductData, status: s})} className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${newProductData.status === s ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50'}`}>
                                {s}
                             </button>
                           ))}
                        </div>
                        <button onClick={handleSaveProduct} className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all flex items-center gap-2">
                          <Save className="w-3.5 h-3.5" /> {editingCode ? 'Update Product' : 'Save Product'}
                        </button>
                     </div>
                   </div>
                 )}

                 <div className="grid grid-cols-1 gap-4">
                    {products.map(p => (
                      <div key={p.code} className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-white border border-slate-200 rounded-2xl hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-50 transition-all duration-300 cursor-pointer gap-4">
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-50 group-hover:scale-110 transition-all duration-300">
                               <ShieldCheck className="w-6 h-6" />
                            </div>
                            <div>
                               <p className="text-base font-bold text-slate-900">{p.name}</p>
                               <div className="flex items-center gap-2 mt-1">
                                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded-md">{p.code}</span>
                               </div>
                            </div>
                         </div>
                         <div className="flex items-center justify-between sm:justify-end gap-8 w-full sm:w-auto border-t border-slate-100 sm:border-0 pt-4 sm:pt-0">
                            <div className="text-left sm:text-right">
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Density</p>
                               <p className="text-sm font-bold text-slate-900 flex items-center gap-1.5"><Layers className="w-3.5 h-3.5 text-indigo-400" /> {p.plans} Schemes</p>
                            </div>
                            <div className="flex items-center gap-4">
                               <span className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 ${p.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-orange-50 text-orange-600 border border-orange-100'}`}>
                                  {p.status === 'Active' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                                  {p.status}
                               </span>
                               <button onClick={(e) => { e.stopPropagation(); handleEditProduct(p); }} className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                  <Edit2 className="w-4 h-4" />
                               </button>
                            </div>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
            )}
            
            {activeCategory === 'Carriers' && (
              <div className="space-y-6">
                 <div className="border-b border-slate-100 pb-6 mb-6">
                    <h2 className="text-lg font-bold text-slate-900">Partner Carriers</h2>
                    <p className="text-xs text-slate-500">Manage connected insurance providers</p>
                 </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {carriers.map(c => (
                      <div key={c.name} className="flex flex-col p-4 bg-white border border-slate-200 rounded-2xl hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-50 transition-all cursor-pointer group">
                         <div className="flex justify-between items-start mb-4">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                               <Building2 className="w-5 h-5" />
                            </div>
                            <span className={`px-2 py-1 ${c.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-orange-50 text-orange-600 border border-orange-100'} text-[9px] font-bold uppercase tracking-widest rounded-lg flex items-center gap-1`}>
                               {c.status === 'Active' ? <CheckCircle2 className="w-2.5 h-2.5" /> : <AlertCircle className="w-2.5 h-2.5" />} {c.status}
                            </span>
                         </div>
                         <div>
                            <h4 className="font-bold text-slate-900 text-sm">{c.name}</h4>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{c.type} Insurance</p>
                         </div>
                         <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
                            <div>
                               <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">Agency Rating</p>
                               <p className="text-xs font-black text-indigo-600">{c.rating}</p>
                            </div>
                            <div className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 transition-colors">
                               <ChevronRight className="w-3.5 h-3.5" />
                            </div>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
            )}

            {activeCategory === 'Commission' && (
              <div className="space-y-6">
                 <div className="border-b border-slate-100 pb-6 mb-6">
                    <h2 className="text-lg font-bold text-slate-900">Commission Payouts</h2>
                    <p className="text-xs text-slate-500">Configure global agent payout rules</p>
                 </div>
                 <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm bg-white">
                   <table className="w-full text-left border-collapse">
                      <thead className="bg-slate-50">
                         <tr>
                            <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-slate-400">Rule Name</th>
                            <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-slate-400">Payout %</th>
                            <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-slate-400">Max Cap</th>
                            <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-slate-400 text-right">Status</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                         {commissions.map((c, i) => (
                            <tr key={i} className="hover:bg-indigo-50/30 transition-colors group">
                               <td className="px-6 py-5">
                                 <div className="flex items-center gap-3">
                                   <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600"><Percent className="w-4 h-4" /></div>
                                   <span className="text-sm font-bold text-slate-900">{c.rule}</span>
                                 </div>
                               </td>
                               <td className="px-6 py-5">
                                 <div className="flex items-center gap-3">
                                   <span className="text-sm font-black text-emerald-600">{c.payout}</span>
                                   <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                     <div className="h-full bg-emerald-500 rounded-full" style={{ width: c.payout }}></div>
                                   </div>
                                 </div>
                               </td>
                               <td className="px-6 py-5 text-sm font-bold text-slate-600">{c.maxCap}</td>
                               <td className="px-6 py-5 text-right">
                                  <span className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest border ${c.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-orange-50 text-orange-600 border-orange-100'}`}>{c.status}</span>
                               </td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                 </div>
              </div>
            )}

            {activeCategory === 'Templates' && (
              <div className="space-y-6">
                 <div className="border-b border-slate-100 pb-6 mb-6">
                    <h2 className="text-lg font-bold text-slate-900">Communication Templates</h2>
                    <p className="text-xs text-slate-500">Manage automated messaging structures</p>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {templates.map(t => (
                      <div key={t.name} className="p-6 border border-slate-200 rounded-2xl bg-white shadow-sm hover:shadow-xl hover:shadow-indigo-50 hover:border-indigo-300 transition-all cursor-pointer group">
                         <div className="flex justify-between items-start mb-5">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                               <Mail className="w-5 h-5 text-indigo-500 group-hover:text-white transition-colors" />
                            </div>
                            <span className={`px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest border ${t.status === 'Published' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-slate-50 text-slate-500 border-slate-200'}`}>{t.status}</span>
                         </div>
                         <h4 className="font-bold text-slate-900 text-base">{t.name}</h4>
                         <div className="flex items-center gap-3 mt-3">
                            <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase tracking-widest">{t.channel}</span>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Updated {t.lastUpdated}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
            )}

            {activeCategory === 'Pricing' && (
              <div className="space-y-6">
                 <div className="border-b border-slate-100 pb-6 mb-6">
                    <h2 className="text-lg font-bold text-slate-900">Rating & Pricing Rules</h2>
                    <p className="text-xs text-slate-500">Configure core premium calculation modifiers</p>
                 </div>
                 <div className="bg-slate-900 p-8 rounded-2xl shadow-xl relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>

                    <h4 className="font-bold text-base text-white mb-6 flex items-center gap-3 relative z-10">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                        <Calculator className="w-4 h-4 text-indigo-400" /> 
                      </div>
                      Base Multipliers
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                       <div className="bg-white/5 border border-white/10 p-5 rounded-xl backdrop-blur-sm">
                          <p className="text-[10px] text-indigo-200 font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                            <Zap className="w-3 h-3 text-emerald-400" /> Tax Factor (GST)
                          </p>
                          <input type="text" defaultValue="1.18" className="bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-lg font-black text-white w-full outline-none focus:border-indigo-400 focus:bg-black/40 transition-all" />
                       </div>
                       <div className="bg-white/5 border border-white/10 p-5 rounded-xl backdrop-blur-sm">
                          <p className="text-[10px] text-indigo-200 font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                            <Zap className="w-3 h-3 text-orange-400" /> Age Penalty Threshold
                          </p>
                          <div className="relative">
                            <input type="text" defaultValue="60" className="bg-black/20 border border-white/10 rounded-lg pl-4 pr-16 py-3 text-lg font-black text-white w-full outline-none focus:border-indigo-400 focus:bg-black/40 transition-all" />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 uppercase tracking-widest pointer-events-none">Years</span>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
            )}

            {activeCategory === 'Organization' && (
              <div className="space-y-6">
                 <div className="border-b border-slate-100 pb-6 mb-6">
                    <h2 className="text-lg font-bold text-slate-900">Organization Details</h2>
                    <p className="text-xs text-slate-500">Master entity information</p>
                 </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-100">
                    <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2 px-1">Legal Entity Name</label>
                       <input type="text" defaultValue="Insurance Advisor Ecosystem Ltd." className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 bg-white shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50 transition-all" />
                    </div>
                    <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2 px-1">Registration Number</label>
                       <input type="text" defaultValue="IN-IA-90210-XX" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 bg-white shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50 transition-all uppercase" />
                    </div>
                    <div className="sm:col-span-2">
                       <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2 px-1">Headquarters Address</label>
                       <textarea rows={3} defaultValue="100 Tech Park, Block B, \nFinancial District, Mumbai 400001" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 bg-white shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50 transition-all"></textarea>
                    </div>
                 </div>
              </div>
            )}
         </div>
      </div>
    </div>
  );
};

export default MasterSettings;
