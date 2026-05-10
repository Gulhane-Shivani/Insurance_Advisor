import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Plus, 
  Eye, 
  Edit2, 
  Layers,
  Search,
  ChevronRight,
  TrendingUp,
  LayoutGrid,
  Zap,
  CheckCircle2,
  AlertCircle,
  Star,
  Activity,
  ArrowRight,
  Upload,
  X,
  Trash2
} from 'lucide-react';
import toast from 'react-hot-toast';

interface PolicyPlan {
  id: string;
  name: string;
  category: string;
  provider: string;
  rating: number;
  monthlyPrice: number;
  coverage: string;
  status: 'Active' | 'Draft' | 'Inactive';
  description: string;
  topBenefits: string[];
  logo?: string;
}

const INITIAL_PLANS: PolicyPlan[] = [
  {
    id: 'PLN-HLTH-01',
    name: 'Family Health Optima',
    category: 'Health Insurance',
    provider: 'Star Health',
    rating: 4.5,
    monthlyPrice: 1200,
    coverage: '₹5,00,000',
    status: 'Active',
    description: 'Comprehensive health coverage for the whole family.',
    topBenefits: ['Cashless Treatment', 'No Room Rent Cap']
  },
  {
    id: 'PLN-HLTH-02',
    name: 'Optima Secure',
    category: 'Health Insurance',
    provider: 'HDFC Ergo',
    rating: 4.8,
    monthlyPrice: 1550,
    coverage: '₹10,00,000',
    status: 'Active',
    description: 'Advanced health protection with secure benefits.',
    topBenefits: ['2x Coverage', 'Global Coverage']
  }
];

const PolicyPlanManagement: React.FC = () => {
  const [plans, setPlans] = useState<PolicyPlan[]>(INITIAL_PLANS);
  const [view, setView] = useState<'list' | 'add' | 'details'>('list');
  const [selectedPlan, setSelectedPlan] = useState<PolicyPlan | null>(null);
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [budget, setBudget] = useState(3000);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedCarrier, setSelectedCarrier] = useState('All Carriers');

  // Form States
  const [formData, setFormData] = useState({
    name: '',
    category: 'Health Insurance',
    provider: '',
    newProvider: '',
    monthlyPrice: '',
    coverage: '',
    description: '',
    topBenefits: [''],
    logoPreview: ''
  });


  const filteredPlans = plans.filter(plan => {
    const matchesSearch = plan.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || plan.category === selectedCategory;
    const matchesCarrier = selectedCarrier === 'All Carriers' || plan.provider === selectedCarrier;
    const matchesBudget = plan.monthlyPrice <= budget;
    return matchesSearch && matchesCategory && matchesCarrier && matchesBudget;
  });

  const handleAddBenefit = () => {
    setFormData({ ...formData, topBenefits: [...formData.topBenefits, ''] });
  };

  const handleRemoveBenefit = (index: number) => {
    const updated = formData.topBenefits.filter((_, i) => i !== index);
    setFormData({ ...formData, topBenefits: updated });
  };

  const handleBenefitChange = (index: number, value: string) => {
    const updated = [...formData.topBenefits];
    updated[index] = value;
    setFormData({ ...formData, topBenefits: updated });
  };

  const handleDeployPlan = (e: React.FormEvent) => {
    e.preventDefault();
    const newPlan: PolicyPlan = {
      id: `PLN-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
      name: formData.name,
      category: formData.category,
      provider: formData.newProvider || formData.provider,
      rating: 4.0,
      monthlyPrice: parseInt(formData.monthlyPrice) || 0,
      coverage: formData.coverage,
      status: 'Active',
      description: formData.description,
      topBenefits: formData.topBenefits.filter(b => b.trim() !== ''),
      logo: formData.logoPreview
    };
    setPlans([newPlan, ...plans]);
    toast.success('New policy plan deployed successfully');
    setView('list');
    setFormData({
      name: '',
      category: 'Health Insurance',
      provider: '',
      newProvider: '',
      monthlyPrice: '',
      coverage: '',
      description: '',
      topBenefits: ['']
    });
  };

  if (view === 'add') {
    return (
      <div className="animate-in fade-in slide-in-from-right-10 duration-500">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setView('list')}
              className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-500 transition-all shadow-sm"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
            </button>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Deploy New Policy Plan</h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">Product Catalog Architecture Console</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setView('list')}
              className="px-6 py-3 bg-slate-100 text-slate-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
            >
              Cancel
            </button>
            <button 
              onClick={handleDeployPlan}
              className="px-8 py-3 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-600 shadow-xl shadow-blue-500/10 transition-all"
            >
              Deploy Plan Architecture
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            {/* Core Configuration Card */}
            <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-3">
                <div className="w-1.5 h-4 bg-blue-600 rounded-full"></div>
                Core Plan Configuration
              </h3>
              
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Plan Display Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-500 transition-all" 
                    placeholder="e.g. Optima Secure Elite" 
                  />
                </div>
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Insurance Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer"
                  >
                    <option>Health Insurance</option>
                    <option>Motor Insurance</option>
                    <option>Life Insurance</option>
                    <option>Business Insurance</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Provider Partner</label>
                  <div className="space-y-3">
                    <select 
                      value={formData.provider}
                      onChange={(e) => setFormData({...formData, provider: e.target.value})}
                      className="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer"
                    >
                      <option value="">Select Existing Provider</option>
                      <option>Star Health</option>
                      <option>HDFC Ergo</option>
                      <option>ICICI Lombard</option>
                      <option value="NEW">+ Add New Provider</option>
                    </select>
                    {formData.provider === 'NEW' && (
                      <input 
                        type="text" 
                        value={formData.newProvider}
                        onChange={(e) => setFormData({...formData, newProvider: e.target.value})}
                        className="w-full h-12 px-6 bg-blue-50/50 border border-blue-200 rounded-xl text-xs font-bold focus:outline-none focus:border-blue-500 transition-all animate-in slide-in-from-top-2" 
                        placeholder="Enter New Provider Name" 
                      />
                    )}
                  </div>
                </div>
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Monthly Premium</label>
                  <div className="relative">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-sm font-black text-slate-400">₹</span>
                    <input 
                      type="number" 
                      value={formData.monthlyPrice}
                      onChange={(e) => setFormData({...formData, monthlyPrice: e.target.value})}
                      className="w-full h-14 pl-10 pr-6 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-500 transition-all" 
                      placeholder="1200" 
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Coverage Details</label>
                <input 
                  type="text" 
                  value={formData.coverage}
                  onChange={(e) => setFormData({...formData, coverage: e.target.value})}
                  className="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-500 transition-all" 
                  placeholder="e.g. ₹5,00,000 or IDV ₹8,50,000" 
                />
              </div>

              <div className="space-y-2.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Value Proposition Description</label>
                <textarea 
                  rows={3} 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full p-6 bg-slate-50 border border-slate-200 rounded-3xl text-sm font-bold focus:outline-none focus:border-blue-500 transition-all" 
                  placeholder="Describe the unique benefits of this policy plan..."
                ></textarea>
              </div>
            </div>

            {/* Benefits Management Card */}
            <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-3">
                  <div className="w-1.5 h-4 bg-emerald-500 rounded-full"></div>
                  Key Benefits & Features
                </h3>
                <button 
                  onClick={handleAddBenefit}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-emerald-100 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Benefit
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.topBenefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3 group">
                    <div className="flex-1 relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <input 
                        type="text" 
                        value={benefit}
                        onChange={(e) => handleBenefitChange(i, e.target.value)}
                        className="w-full h-12 pl-10 pr-12 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-emerald-500 transition-all" 
                        placeholder={`Benefit ${i+1}`} 
                      />
                      <button 
                        onClick={() => handleRemoveBenefit(i)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Logo Upload Card */}
            <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Provider Branding</h3>
              <input 
                type="file" 
                id="logo-upload" 
                className="hidden" 
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setFormData({...formData, logoPreview: reader.result as string});
                    };
                    reader.readAsDataURL(file);
                    toast.success('Logo asset uploaded');
                  }
                }}
              />
              <label 
                htmlFor="logo-upload"
                className="aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-[32px] flex flex-col items-center justify-center p-8 text-center group hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer relative overflow-hidden"
              >
                {formData.logoPreview ? (
                  <div className="absolute inset-0 p-6 bg-white flex items-center justify-center group/preview">
                    <img src={formData.logoPreview} alt="Preview" className="w-full h-full object-contain" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center">
                       <Upload className="w-8 h-8 text-white" />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-all mb-4">
                      <Upload className="w-8 h-8" />
                    </div>
                    <p className="text-xs font-black text-slate-900">Upload Official Logo</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-widest">PNG or SVG (Max 2MB)</p>
                  </>
                )}
              </label>
              {formData.logoPreview && (
                <button 
                  onClick={() => setFormData({...formData, logoPreview: ''})}
                  className="w-full py-2 text-[10px] font-black text-red-500 uppercase tracking-widest hover:text-red-600 transition-colors"
                >
                  Remove Logo
                </button>
              )}
            </div>

            {/* Quick Summary Card */}
            <div className="bg-slate-900 p-8 rounded-[40px] text-white shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
               <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-8">Deployment Preview</h4>
               <div className="space-y-6">
                  <div className="p-5 bg-white/5 border border-white/10 rounded-2xl">
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Status</p>
                    <p className="text-sm font-black text-emerald-400 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                      Ready for Deployment
                    </p>
                  </div>
                  <div className="p-5 bg-white/5 border border-white/10 rounded-2xl">
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Calculated Annual Premium</p>
                    <p className="text-xl font-black">₹{(parseInt(formData.monthlyPrice) || 0) * 12}</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'details' && selectedPlan) {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-10 duration-500">
        <div className="flex items-center gap-4 mb-10">
          <button 
            onClick={() => setView('list')}
            className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Plan Analysis: {selectedPlan.name}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div className="bg-white p-12 rounded-[48px] border border-slate-100 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
               <div className="flex justify-between items-start mb-12">
                  <div>
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-lg mb-3 inline-block">
                      {selectedPlan.category}
                    </span>
                    <h2 className="text-4xl font-black text-slate-900">{selectedPlan.name}</h2>
                    <p className="text-slate-500 font-medium mt-4 max-w-xl leading-relaxed">{selectedPlan.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-black text-blue-600">₹{selectedPlan.monthlyPrice}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Per Month</p>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-8 pt-10 border-t border-slate-50">
                 <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Coverage Threshold</p>
                   <p className="text-2xl font-black text-slate-900">{selectedPlan.coverage}</p>
                 </div>
                 <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Lead Provider</p>
                   <p className="text-2xl font-black text-slate-900">{selectedPlan.provider}</p>
                 </div>
               </div>

               <div className="pt-12">
                 <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">Verified Benefits</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   {selectedPlan.topBenefits.map((benefit, i) => (
                     <div key={i} className="flex items-center gap-4 p-5 bg-emerald-50/50 border border-emerald-100 rounded-2xl">
                       <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20">
                         <CheckCircle2 className="w-5 h-5" />
                       </div>
                       <span className="text-xs font-black text-slate-700">{benefit}</span>
                     </div>
                   ))}
                 </div>
               </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-slate-900 p-10 rounded-[48px] text-white shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
               <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-10">Market Intelligence</h4>
               <div className="space-y-8">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Customer Sentiment</p>
                      <p className="text-2xl font-black">{selectedPlan.rating}/5.0</p>
                    </div>
                    <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Growth Indicator</p>
                      <p className="text-2xl font-black">+14.2%</p>
                    </div>
                    <TrendingUp className="w-6 h-6 text-emerald-400" />
                  </div>
               </div>
               <button className="w-full mt-12 py-5 bg-blue-600 hover:bg-blue-700 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 transition-all">
                 Generate Performance Report
               </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      {/* Hero Header */}
      <div className="bg-white/40 backdrop-blur-xl p-7 rounded-[32px] border border-white/60 shadow-sm flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
             <div className="w-1.5 h-7 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
             <h1 className="text-2xl font-black text-slate-900 tracking-tight">Policy Plan Repository</h1>
          </div>
          <p className="text-slate-500 font-bold max-w-2xl leading-relaxed text-[11px] tracking-normal uppercase">
            Product catalog management authority
          </p>
        </div>
        <button 
          onClick={() => setView('add')}
          className="group relative flex items-center gap-2.5 bg-slate-900 text-white px-7 py-3.5 rounded-2xl font-black transition-all hover:shadow-lg overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <Plus className="relative z-10 w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
          <span className="relative z-10 text-[12px] tracking-tight">Deploy New Policy Plan</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col lg:flex-row gap-8 items-end">
        <div className="flex-1 w-full space-y-3">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Insurance Category</label>
          <div className="relative">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full h-14 pl-5 pr-10 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all appearance-none cursor-pointer"
            >
              <option>All Categories</option>
              <option>Health Insurance</option>
              <option>Motor Insurance</option>
              <option>Life Insurance</option>
              <option>Business Insurance</option>
            </select>
            <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 rotate-90 pointer-events-none" />
          </div>
        </div>

        <div className="flex-1 w-full space-y-3">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Provider</label>
          <div className="relative">
            <select 
              value={selectedCarrier}
              onChange={(e) => setSelectedCarrier(e.target.value)}
              className="w-full h-14 pl-5 pr-10 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all appearance-none cursor-pointer"
            >
              <option>All Carriers</option>
              <option>Star Health</option>
              <option>HDFC Ergo</option>
              <option>ICICI Lombard</option>
              <option>Tata AIG</option>
            </select>
            <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 rotate-90 pointer-events-none" />
          </div>
        </div>

        <div className="flex-[2] w-full space-y-3">
          <div className="flex justify-between items-center mb-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Max Monthly Budget</label>
            <span className="text-sm font-black text-blue-600">₹{budget}</span>
          </div>
          <div className="h-14 flex items-center px-2">
            <input 
              type="range" 
              min="500" 
              max="5000" 
              step="50" 
              value={budget}
              onChange={(e) => setBudget(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredPlans.map((plan) => (
          <div key={plan.id} className="group flex flex-col bg-white border border-slate-100 rounded-[32px] hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 overflow-hidden">
            <div className="p-7 pb-4">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-sm group-hover:border-blue-500/30 transition-all duration-500 overflow-hidden p-2 relative">
                    <img 
                      src={plan.logo || `https://www.google.com/s2/favicons?domain=${
                        plan.provider === 'Star Health' ? 'starhealth.in' :
                        plan.provider === 'HDFC Ergo' ? 'hdfcergo.com' :
                        plan.provider === 'ICICI Lombard' ? 'icicilombard.com' :
                        plan.provider === 'Tata AIG' ? 'tataaig.com' :
                        plan.provider === 'SBI Life' ? 'sbilife.co.in' :
                        plan.provider.toLowerCase().replace(/ /g, '') + '.com'
                      }&sz=128`} 
                      alt={plan.provider}
                      className="w-full h-full object-contain relative z-10"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://ui-avatars.com/api/?name=${plan.provider}&background=f1f5f9&color=2563eb&bold=true&font-size=0.33`;
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors">{plan.name}</h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{plan.provider}</span>
                      <div className="flex items-center gap-1 px-1.5 py-0.5 bg-amber-50 rounded-md">
                        <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                        <span className="text-[9px] font-black text-amber-600">{plan.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black text-blue-600 leading-none">₹{plan.monthlyPrice}</p>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">Per Month</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 py-6 border-t border-slate-50 mt-4">
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Coverage</p>
                  <p className="text-xs font-black text-slate-800">{plan.coverage}</p>
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Top Benefits</p>
                  <div className="space-y-1.5">
                    {plan.topBenefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        <span className="text-[10px] font-bold text-slate-600 truncate">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="px-7 py-5 bg-slate-50/50 flex items-center justify-between border-t border-slate-50 mt-auto">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center p-1 shadow-lg shadow-blue-500/20">
                   <ShieldCheck className="w-full h-full text-white" />
                </div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Official Product</span>
              </div>

              <button 
                onClick={() => { setSelectedPlan(plan); setView('details'); }}
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/20 transition-all"
              >
                View Plan <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PolicyPlanManagement;
