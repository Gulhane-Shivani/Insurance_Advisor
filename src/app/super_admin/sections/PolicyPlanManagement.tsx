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
    topBenefits: ['Cashless Treatment', 'No Room Rent Cap', 'Air Ambulance']
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
    topBenefits: ['2x Coverage', 'Global Coverage', 'OPD Benefit']
  },
  {
    id: 'PLN-MTR-03',
    name: 'Motor Insurance Plus',
    category: 'Motor Insurance',
    provider: 'ICICI Lombard',
    rating: 4.6,
    monthlyPrice: 850,
    coverage: 'IDV ₹8,50,000',
    status: 'Active',
    description: 'High-value protection for your vehicle.',
    topBenefits: ['Zero Dep', 'Personal Accident', 'Key Replacement']
  },
  {
    id: 'PLN-MTR-04',
    name: 'Auto Safe',
    category: 'Motor Insurance',
    provider: 'Tata AIG',
    rating: 4.4,
    monthlyPrice: 790,
    coverage: 'IDV ₹7,90,000',
    status: 'Active',
    description: 'Reliable and affordable motor insurance.',
    topBenefits: ['Engine Secure', 'Invoice Cover', 'Emergency Med-Evac']
  },
  {
    id: 'PLN-LIFE-05',
    name: 'Life Click 2 Protect',
    category: 'Life Insurance',
    provider: 'HDFC Ergo',
    rating: 4.8,
    monthlyPrice: 2200,
    coverage: '₹1,00,00,000',
    status: 'Active',
    description: 'Pure term life insurance for complete peace of mind.',
    topBenefits: ['Critical Illness', 'Terminal Illness Cover', 'Accident Rider']
  },
  {
    id: 'PLN-HLTH-06',
    name: 'Senior Citizens Red Carpet',
    category: 'Health Insurance',
    provider: 'Star Health',
    rating: 4.7,
    monthlyPrice: 3500,
    coverage: '₹20,00,000',
    status: 'Active',
    description: 'Dedicated health support for senior citizens.',
    topBenefits: ['Ayush Cover', 'No Pre-medical', 'Modern Treatments']
  },
  {
    id: 'PLN-BIZ-07',
    name: 'Business Shield',
    category: 'Business Insurance',
    provider: 'ICICI Lombard',
    rating: 4.6,
    monthlyPrice: 2800,
    coverage: '₹50,00,000',
    status: 'Active',
    description: 'Protect your business assets and liabilities.',
    topBenefits: ['Fire & Burglary', 'Employee Liability', 'Digital Assets']
  },
  {
    id: 'PLN-BIZ-08',
    name: 'SME Shield',
    category: 'Business Insurance',
    provider: 'Tata AIG',
    rating: 4.5,
    monthlyPrice: 1950,
    coverage: '₹25,00,000',
    status: 'Active',
    description: 'Comprehensive protection for small and medium enterprises.',
    topBenefits: ['Public Liability', 'Machinery Breakdown', 'Money Cover']
  },
  {
    id: 'PLN-MTR-09',
    name: 'Elite Private Car',
    category: 'Motor Insurance',
    provider: 'HDFC Ergo',
    rating: 4.9,
    monthlyPrice: 1100,
    coverage: 'IDV ₹12,00,000',
    status: 'Active',
    description: 'Premium protection for luxury and private vehicles.',
    topBenefits: ['Consumables Cover', 'Tyre Secure', 'Loss of Content']
  },
  {
    id: 'PLN-HLTH-10',
    name: 'Diabetes Safe',
    category: 'Health Insurance',
    provider: 'Star Health',
    rating: 4.4,
    monthlyPrice: 1800,
    coverage: '₹7,00,000',
    status: 'Active',
    description: 'Specialized health management for diabetic patients.',
    topBenefits: ['Diabetes Management', 'No Wait Period', 'Dialysis Cover']
  },
  {
    id: 'PLN-LIFE-11',
    name: 'Pru iProtect Smart',
    category: 'Life Insurance',
    provider: 'ICICI Lombard',
    rating: 4.8,
    monthlyPrice: 1500,
    coverage: '₹50,00,000',
    status: 'Active',
    description: 'Smart term plan with critical illness benefits.',
    topBenefits: ['Waiver of Premium', 'Accident Death', 'Life Stage Protect']
  },
  {
    id: 'PLN-LIFE-12',
    name: 'Maha Raksha',
    category: 'Life Insurance',
    provider: 'Tata AIG',
    rating: 4.7,
    monthlyPrice: 2100,
    coverage: '₹1,50,00,000',
    status: 'Active',
    description: 'Ultimate protection with high coverage thresholds.',
    topBenefits: ['Whole Life Cover', 'Return of Premium', 'Income Benefit']
  },
  {
    id: 'PLN-BIZ-13',
    name: 'Small Business Protection',
    category: 'Business Insurance',
    provider: 'HDFC Ergo',
    rating: 4.3,
    monthlyPrice: 1300,
    coverage: '₹10,00,000',
    status: 'Active',
    description: 'Essential safeguards for small scale business operations.',
    topBenefits: ['Stock Protection', 'Interruption Cover', 'Glass Cover']
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

  const handleEditPlan = () => {
    if (!selectedPlan) return;
    setFormData({
      name: selectedPlan.name,
      category: selectedPlan.category,
      provider: selectedPlan.provider,
      newProvider: '',
      monthlyPrice: selectedPlan.monthlyPrice.toString(),
      coverage: selectedPlan.coverage,
      description: selectedPlan.description,
      topBenefits: selectedPlan.topBenefits.length > 0 ? selectedPlan.topBenefits : [''],
      logoPreview: selectedPlan.logo || ''
    });
    setView('add');
  };

  const handleDeployPlan = (e: React.FormEvent) => {
    e.preventDefault();
    
    const planData: PolicyPlan = {
      id: selectedPlan && view === 'add' && formData.name === selectedPlan.name ? selectedPlan.id : `PLN-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
      name: formData.name,
      category: formData.category,
      provider: formData.newProvider || formData.provider,
      rating: selectedPlan ? selectedPlan.rating : 4.0,
      monthlyPrice: parseInt(formData.monthlyPrice) || 0,
      coverage: formData.coverage,
      status: 'Active',
      description: formData.description,
      topBenefits: formData.topBenefits.filter(b => b.trim() !== ''),
      logo: formData.logoPreview
    };

    if (selectedPlan && view === 'add') {
      // Update existing plan
      setPlans(plans.map(p => p.id === selectedPlan.id ? planData : p));
      toast.success('Policy plan updated successfully');
    } else {
      // Create new plan
      setPlans([planData, ...plans]);
      toast.success('New policy plan deployed successfully');
    }

    setView('list');
    setSelectedPlan(null);
    setFormData({
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
  };

  if (view === 'add') {
    return (
      <div className="animate-in fade-in slide-in-from-right-10 duration-500">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => { setView('list'); setSelectedPlan(null); }}
              className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-500 transition-all shadow-sm"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
            </button>
            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight">{selectedPlan ? 'Edit Policy Plan' : 'Deploy New Policy Plan'}</h1>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-0.5">Product Catalog Architecture Console</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => { setView('list'); setSelectedPlan(null); }}
              className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
            >
              Cancel
            </button>
            <button 
              onClick={handleDeployPlan}
              className="px-7 py-2.5 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 shadow-xl shadow-blue-500/10 transition-all"
            >
              {selectedPlan ? 'Update Plan' : 'Deploy Plan'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Core Configuration Card */}
            <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm space-y-6">
              <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em] flex items-center gap-3">
                <div className="w-1 h-3 bg-blue-600 rounded-full"></div>
                Core Configuration
              </h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Plan Display Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full h-12 px-5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-300" 
                    placeholder="e.g. Optima Secure Elite" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Insurance Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full h-12 px-5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer"
                  >
                    <option>Health Insurance</option>
                    <option>Motor Insurance</option>
                    <option>Life Insurance</option>
                    <option>Business Insurance</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Provider Partner</label>
                  <div className="space-y-2">
                    <select 
                      value={formData.provider}
                      onChange={(e) => setFormData({...formData, provider: e.target.value})}
                      className="w-full h-12 px-5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer"
                    >
                      <option value="">Select Existing Provider</option>
                      <option>Star Health</option>
                      <option>HDFC Ergo</option>
                      <option>ICICI Lombard</option>
                      <option>Tata AIG</option>
                      <option value="NEW">+ Add New Provider</option>
                    </select>
                    {formData.provider === 'NEW' && (
                      <input 
                        type="text" 
                        value={formData.newProvider}
                        onChange={(e) => setFormData({...formData, newProvider: e.target.value})}
                        className="w-full h-10 px-5 bg-blue-50/50 border border-blue-200 rounded-lg text-[10px] font-bold focus:outline-none focus:border-blue-500 transition-all animate-in slide-in-from-top-2" 
                        placeholder="Enter New Provider Name" 
                      />
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Monthly Premium</label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400">₹</span>
                    <input 
                      type="number" 
                      value={formData.monthlyPrice}
                      onChange={(e) => setFormData({...formData, monthlyPrice: e.target.value})}
                      className="w-full h-12 pl-8 pr-5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-blue-500 transition-all" 
                      placeholder="1200" 
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Coverage Details</label>
                <input 
                  type="text" 
                  value={formData.coverage}
                  onChange={(e) => setFormData({...formData, coverage: e.target.value})}
                  className="w-full h-12 px-5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-blue-500 transition-all" 
                  placeholder="e.g. ₹5,00,000 or IDV ₹8,50,000" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Description</label>
                <textarea 
                  rows={2} 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold focus:outline-none focus:border-blue-500 transition-all resize-none" 
                  placeholder="Describe the unique benefits..."
                ></textarea>
              </div>
            </div>

            {/* Benefits Management Card */}
            <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em] flex items-center gap-3">
                  <div className="w-1 h-3 bg-emerald-500 rounded-full"></div>
                  Key Benefits
                </h3>
                <button 
                  onClick={handleAddBenefit}
                  className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-emerald-100 transition-all"
                >
                  <Plus className="w-3 h-3" /> Add Benefit
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {formData.topBenefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2 group">
                    <div className="flex-1 relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                      <input 
                        type="text" 
                        value={benefit}
                        onChange={(e) => handleBenefitChange(i, e.target.value)}
                        className="w-full h-10 pl-8 pr-10 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold focus:outline-none focus:border-emerald-500 transition-all" 
                        placeholder={`Benefit ${i+1}`} 
                      />
                      <button 
                        onClick={() => handleRemoveBenefit(i)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Logo Upload Card */}
            <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-4 text-center">
              <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Branding</h3>
              <input type="file" id="logo-upload" className="hidden" accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => setFormData({...formData, logoPreview: reader.result as string});
                    reader.readAsDataURL(file);
                    toast.success('Logo asset attached');
                  }
                }}
              />
              <label htmlFor="logo-upload" className="aspect-square w-32 mx-auto bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center group hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer relative overflow-hidden">
                {formData.logoPreview ? (
                  <img src={formData.logoPreview} alt="Preview" className="w-full h-full object-contain p-4" />
                ) : (
                  <Upload className="w-6 h-6 text-slate-300 group-hover:text-blue-500 transition-all" />
                )}
              </label>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">PNG or SVG (Max 2MB)</p>
            </div>

            {/* Quick Summary Card */}
            <div className="bg-slate-900 p-8 rounded-[40px] text-white shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
               <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-6">Preview</h4>
               <div className="space-y-4">
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                    <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1">Status</p>
                    <p className="text-xs font-black text-emerald-400 flex items-center gap-2">
                      <div className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse"></div>
                      Operational Ready
                    </p>
                  </div>
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                    <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1">Annual Value</p>
                    <p className="text-lg font-black">₹{(parseInt(formData.monthlyPrice) || 0) * 12}</p>
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
      <div className="animate-in fade-in slide-in-from-bottom-5 duration-500">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => { setView('list'); setSelectedPlan(null); }}
              className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
            </button>
            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight">Plan Analysis</h1>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-0.5">{selectedPlan.id}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <button 
               onClick={handleEditPlan}
               className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm"
             >
               <Edit2 className="w-3 h-3" /> Edit Plan Details
             </button>
             <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/10">
               Generate PDF Report
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
               
               <div className="flex justify-between items-start mb-10 relative z-10">
                  <div className="flex items-start gap-6">
                    <div className="w-20 h-20 rounded-[24px] bg-white border border-slate-100 flex items-center justify-center shadow-md p-3">
                      <img 
                        src={selectedPlan.logo || `https://www.google.com/s2/favicons?domain=${
                          selectedPlan.provider === 'Star Health' ? 'starhealth.in' :
                          selectedPlan.provider === 'HDFC Ergo' ? 'hdfcergo.com' :
                          selectedPlan.provider === 'ICICI Lombard' ? 'icicilombard.com' :
                          selectedPlan.provider === 'Tata AIG' ? 'tataaig.com' :
                          selectedPlan.provider === 'SBI Life' ? 'sbilife.co.in' :
                          selectedPlan.provider.toLowerCase().replace(/ /g, '') + '.com'
                        }&sz=128`} 
                        alt={selectedPlan.provider}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://ui-avatars.com/api/?name=${selectedPlan.provider}&background=f1f5f9&color=2563eb&bold=true&font-size=0.33`;
                        }}
                      />
                    </div>
                    <div>
                      <span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-[9px] font-black uppercase tracking-widest rounded-lg mb-3 inline-block">
                        {selectedPlan.category}
                      </span>
                      <h2 className="text-3xl font-black text-slate-900 tracking-tight">{selectedPlan.name}</h2>
                      <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-1">{selectedPlan.provider} • Premium Product</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-black text-blue-600 leading-none">₹{selectedPlan.monthlyPrice}</p>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2">Monthly Premium</p>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-6 pt-10 border-t border-slate-50 relative z-10">
                 <div className="p-6 bg-slate-50/50 rounded-3xl border border-slate-100">
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Coverage Threshold</p>
                   <p className="text-xl font-black text-slate-900">{selectedPlan.coverage}</p>
                 </div>
                 <div className="p-6 bg-slate-50/50 rounded-3xl border border-slate-100">
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Provider Status</p>
                   <p className="text-xl font-black text-slate-900">Verified Partner</p>
                 </div>
               </div>

               <div className="pt-10 relative z-10">
                 <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-6">Key Performance Benefits</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   {selectedPlan.topBenefits.map((benefit, i) => (
                     <div key={i} className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-emerald-500/30 transition-all group">
                       <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">
                         <CheckCircle2 className="w-4 h-4" />
                       </div>
                       <span className="text-[11px] font-bold text-slate-700">{benefit}</span>
                     </div>
                   ))}
                 </div>
               </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-slate-900 p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
               <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-8">Intelligence</h4>
               <div className="space-y-6">
                  <div className="flex justify-between items-end border-b border-white/5 pb-6">
                    <div>
                      <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1">Sentiment</p>
                      <p className="text-xl font-black">{selectedPlan.rating}/5.0</p>
                    </div>
                    <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1">Growth Indicator</p>
                      <p className="text-xl font-black">+14.2%</p>
                    </div>
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                  </div>
               </div>
               <button className="w-full mt-10 py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all">
                 Market Performance Link
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
