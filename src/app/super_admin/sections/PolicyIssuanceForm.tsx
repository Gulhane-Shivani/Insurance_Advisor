import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  User, 
  ShieldCheck, 
  Users, 
  Zap, 
  CheckCircle2, 
  Sparkles,
  ChevronDown
} from 'lucide-react';

interface PolicyIssuanceFormProps {
  onBack: () => void;
  onSave: (policy: any) => void;
  editingPolicyId?: string | null;
}

const PLANS = [
  {
    id: 'plan-1',
    name: 'Star Comprehensive Health',
    category: 'Health Insurance',
    provider: 'Star Health',
    premium: '₹80,000',
    color: 'violet',
    coverage: ['In-patient Hospitalization', 'Day Care Procedures', 'AYUSH Treatment', 'Pre-Post Hospitalization'],
    benefits: ['Cashless Treatment', 'No Claim Bonus', 'Free Health Checkup', 'Restore Sum Insured']
  },
  {
    id: 'plan-2',
    name: 'Term Life Protection',
    category: 'Life Insurance',
    provider: 'LIC / Private',
    premium: '₹45,000',
    color: 'blue',
    coverage: ['Critical Illness', 'Accidental Death Benefit', 'Permanent Disability'],
    benefits: ['Tax Savings (80C)', 'Guaranteed Returns', 'Funeral Expense']
  },
  {
    id: 'plan-3',
    name: 'Private Car Package',
    category: 'Motor Insurance',
    provider: 'HDFC Ergo / ICICI',
    premium: '₹12,500',
    color: 'indigo',
    coverage: ['Own Damage', 'Third Party Liability', 'Personal Accident'],
    benefits: ['Zero Depreciation', 'Roadside Assistance', 'Engine Protection']
  }
];

const PolicyIssuanceForm: React.FC<PolicyIssuanceFormProps> = ({ onBack, onSave, editingPolicyId }) => {
  const [selectedPlanId, setSelectedPlanId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [nomineeName, setNomineeName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [startDate, setStartDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [customBenefits, setCustomBenefits] = useState<string[]>([]);
  const [customCoverage, setCustomCoverage] = useState<string[]>([]);

  useEffect(() => {
    if (editingPolicyId) {
      const saved = localStorage.getItem('safeguard_policies_v2');
      let p: any = null;
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          p = parsed.find((x: any) => x.id === editingPolicyId);
        } catch(e) {}
      }
      
      const mockPolicies: Record<string, any> = {
        'SG-HLTH-002': { coverage: ['Hospitalization', 'OPD Cover', 'Maternity'], benefits: ['Platinum Plan'], nominee: 'Sunita Mehta (Wife)', customer: 'Vijay Mehta' },
        'SG-MOTR-003': { coverage: ['Own Damage', 'Third Party Liability', 'Zero Dep'], benefits: ['Standard Plan'], nominee: 'Anita Singh (Mother)', customer: 'Deepak Singh' },
        'SG-LIFE-001': { coverage: ['Critical Illness', 'Death Benefit', 'Accidental Cover'], benefits: ['Gold Plan'], nominee: 'Amit Kumar (Son)', customer: 'Sneh Lata' }
      };

      if (!p && mockPolicies[editingPolicyId]) {
        p = { id: editingPolicyId, ...mockPolicies[editingPolicyId] };
      }

      if (p) {
        setCustomerName(p.customer || '');
        setEmail(p.email || '');
        setContact(p.contact || '');
        setNomineeName(p.nominee || '');
        setExpiryDate(p.expiryDate || '');
        setStartDate(p.issueDate || '');
        
        const b = p.benefits || (mockPolicies[editingPolicyId]?.benefits) || [];
        const c = p.coverage || (mockPolicies[editingPolicyId]?.coverage) || [];
        setCustomBenefits(Array.isArray(b) ? b : b.split(',').map((s: string) => s.trim()).filter(Boolean));
        setCustomCoverage(Array.isArray(c) ? c : c.split(',').map((s: string) => s.trim()).filter(Boolean));

        // Try to match plan
        const match = PLANS.find(plan => plan.category === p.type || plan.name === p.name);
        if (match) setSelectedPlanId(match.id);
      }
    }
  }, [editingPolicyId]);

  const selectedPlan = PLANS.find(p => p.id === selectedPlanId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;

    const newPolicy = {
      id: editingPolicyId || `IA-${selectedPlan.category.substring(0, 4).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      type: selectedPlan.category,
      customer: customerName,
      email: email,
      contact: contact,
      nominee: nomineeName,
      premium: selectedPlan.premium,
      status: 'Active',
      issueDate: startDate || new Date().toISOString().split('T')[0],
      expiryDate: expiryDate || '2027-05-08',
      benefits: editingPolicyId ? customBenefits : selectedPlan.benefits,
      coverage: editingPolicyId ? customCoverage : selectedPlan.coverage
    };

    onSave(newPolicy);
  };

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-700 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 bg-white/40 backdrop-blur-xl p-6 rounded-[28px] border border-white/60 shadow-sm">
         <div className="flex items-center gap-5">
            <button 
              onClick={onBack}
              type="button"
              className="group p-3 bg-white rounded-xl text-slate-400 hover:text-violet-600 transition-all border border-slate-100"
            >
               <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </button>
            <div>
               <div className="flex items-center gap-2 mb-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-violet-500" />
                  <h1 className="text-xl font-black text-slate-900 tracking-tight">{editingPolicyId ? 'Policy Modification' : 'Policy Enrollment'}</h1>
               </div>
               <p className="text-[10px] font-bold text-slate-400 tracking-widest">Institutional Grade Issuance Console</p>
            </div>
         </div>
         
         <div className="flex items-center gap-3 bg-white/80 p-1.5 pr-4 rounded-xl border border-white">
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
               <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <div>
               <p className="text-[10px] font-bold text-violet-600 tracking-tight">AES-256 Protected</p>
            </div>
         </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         <div className="lg:col-span-8 space-y-8">
            {/* Customer Identity */}
            <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm transition-all duration-500">
               <div className="flex items-center gap-4 mb-8">
                  <div className="w-11 h-11 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center shadow-inner">
                     <User className="w-5 h-5" />
                  </div>
                  <div>
                     <h3 className="text-base font-black text-slate-900 tracking-tight">Customer Identity</h3>
                     <p className="text-[10px] font-bold text-slate-400 tracking-widest">Verified Policy Holder Information</p>
                  </div>
               </div>

               <div className="grid grid-cols-1 gap-8">
                  <div className="relative">
                     <label className="text-[11px] font-bold text-slate-500 mb-1.5 block">Full Legal Name</label>
                     <input 
                        type="text" 
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full px-5 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl text-[13px] font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-violet-500/5 focus:border-violet-500 transition-all placeholder:text-slate-300"
                        placeholder="Enter name as per government ID..."
                     />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="relative">
                        <label className="text-[11px] font-bold text-slate-500 mb-1.5 block">Email Address</label>
                        <input 
                           type="email" 
                           required
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           className="w-full px-5 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl text-[13px] font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-violet-500/5 focus:border-violet-500 transition-all"
                           placeholder="customer@domain.com"
                        />
                     </div>
                     <div className="relative">
                        <label className="text-[11px] font-bold text-slate-500 mb-1.5 block">Contact Number</label>
                        <input 
                           type="tel" 
                           required
                           pattern="[0-9]{10}"
                           maxLength={10}
                           value={contact}
                           onChange={(e) => {
                              const val = e.target.value.replace(/\D/g, '');
                              if (val.length <= 10) setContact(val);
                           }}
                           className="w-full px-5 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl text-[13px] font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-violet-500/5 focus:border-violet-500 transition-all"
                           placeholder="10-digit mobile number"
                        />
                     </div>
                  </div>
               </div>
            </div>

            {/* Beneficiary Setup */}
            <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm">
               <div className="flex items-center gap-4 mb-8">
                  <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner">
                     <Users className="w-5 h-5" />
                  </div>
                  <div>
                     <h3 className="text-base font-black text-slate-900 tracking-tight">Beneficiary Setup</h3>
                     <p className="text-[10px] font-bold text-slate-400 tracking-widest">Assigned Nominee & Relationship</p>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative">
                     <label className="text-[11px] font-bold text-slate-500 mb-1.5 block">Nominee Name</label>
                     <input 
                        type="text" 
                        value={nomineeName}
                        onChange={(e) => setNomineeName(e.target.value)}
                        className="w-full px-5 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl text-[13px] font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all"
                        placeholder="Legal name of beneficiary..."
                     />
                  </div>
                  <div className="relative">
                     <label className="text-[11px] font-bold text-slate-500 mb-1.5 block">Legal Relationship</label>
                     <select 
                        value={relationship}
                        onChange={(e) => setRelationship(e.target.value)}
                        className="w-full px-5 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl text-[13px] font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all appearance-none"
                     >
                        <option value="">Choose Bond...</option>
                        <option value="spouse">Spouse / Partner</option>
                        <option value="child">Biological Child</option>
                        <option value="parent">Parental Figure</option>
                        <option value="sibling">Legal Sibling</option>
                     </select>
                  </div>
               </div>
            </div>

            {/* Plan Provisions (Dynamic) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-slate-900 rounded-[32px] p-8 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-violet-600/10 rounded-full blur-2xl -mr-12 -mt-12"></div>
                  <div className="flex items-center justify-between mb-8">
                     <div className="flex items-center gap-3">
                        <Zap className="w-4 h-4 text-violet-400" />
                        <h3 className="text-[12px] font-black text-white tracking-widest">Active Coverage</h3>
                     </div>
                  </div>
                  <div className="space-y-2.5 relative z-10">
                     {editingPolicyId ? (
                        <div className="space-y-3 relative z-10">
                           {Array.from(new Set([...(selectedPlan?.coverage || []), ...customCoverage])).map((item, i) => (
                              <label key={i} className="flex items-center gap-3 p-3.5 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
                                 <input 
                                    type="checkbox" 
                                    className="w-4 h-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500 bg-transparent cursor-pointer"
                                    checked={customCoverage.includes(item)}
                                    onChange={(e) => {
                                       if (e.target.checked) {
                                          setCustomCoverage([...customCoverage, item]);
                                       } else {
                                          setCustomCoverage(customCoverage.filter(c => c !== item));
                                       }
                                    }}
                                 />
                                 <span className="text-[11px] font-bold text-slate-300">{item}</span>
                              </label>
                           ))}
                        </div>
                     ) : selectedPlan ? selectedPlan.coverage.map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-3.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                           <span className="text-[11px] font-bold text-slate-300">{item}</span>
                           <CheckCircle2 className="w-4 h-4 text-violet-500" />
                        </div>
                     )) : (
                        <div className="py-8 text-center">
                           <p className="text-[10px] font-bold text-slate-600 tracking-widest">Pending Selection</p>
                        </div>
                     )}
                  </div>
               </div>

               <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-violet-50/50 rounded-full blur-2xl -mr-12 -mt-12"></div>
                  <div className="flex items-center gap-3 mb-8">
                     <Sparkles className="w-4 h-4 text-violet-600" />
                     <h3 className="text-[12px] font-black text-slate-900 tracking-widest">Exclusive Benefits</h3>
                  </div>
                  <div className="space-y-2.5 relative z-10">
                     {editingPolicyId ? (
                        <div className="space-y-3 relative z-10">
                           {Array.from(new Set([...(selectedPlan?.benefits || []), ...customBenefits])).map((benefit, i) => (
                              <label key={i} className="flex items-center gap-3 p-3.5 bg-violet-50/50 border border-violet-100 rounded-xl cursor-pointer">
                                 <input 
                                    type="checkbox" 
                                    className="w-4 h-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500 bg-white cursor-pointer"
                                    checked={customBenefits.includes(benefit)}
                                    onChange={(e) => {
                                       if (e.target.checked) {
                                          setCustomBenefits([...customBenefits, benefit]);
                                       } else {
                                          setCustomBenefits(customBenefits.filter(b => b !== benefit));
                                       }
                                    }}
                                 />
                                 <span className="text-[11px] font-bold text-slate-800">{benefit}</span>
                              </label>
                           ))}
                        </div>
                     ) : selectedPlan ? selectedPlan.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-center justify-between p-3.5 bg-violet-50/50 border border-violet-100 rounded-xl">
                           <span className="text-[11px] font-bold text-slate-800">{benefit}</span>
                           <CheckCircle2 className="w-4 h-4 text-violet-600" />
                        </div>
                     )) : (
                        <div className="py-8 text-center">
                           <p className="text-[10px] font-bold text-slate-300 tracking-widest">No Benefits Cached</p>
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </div>

         {/* Sidebar: Plan Selection Dropdown */}
         <div className="lg:col-span-4 space-y-8">
            <div className="bg-white rounded-[32px] border border-slate-200 shadow-lg overflow-hidden sticky top-8">
               <div className="bg-slate-900 p-8">
                  <div className="flex items-center gap-3">
                     <ShieldCheck className="w-5 h-5 text-violet-400" />
                     <h3 className="text-base font-black text-white tracking-tight">Plan Archive</h3>
                  </div>
               </div>
               
               <div className="p-8 space-y-8">
                  <div className="space-y-4">
                     <label className="text-[11px] font-bold text-slate-500 block">Insurance Product</label>
                     <div className="relative group">
                        <select 
                           value={selectedPlanId}
                           onChange={(e) => setSelectedPlanId(e.target.value)}
                           disabled={!!editingPolicyId}
                           className={`w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-[13px] font-black text-slate-800 focus:outline-none focus:ring-4 focus:ring-violet-500/5 focus:border-violet-600 transition-all appearance-none ${editingPolicyId ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                           <option value="">Choose Catalog...</option>
                           {PLANS.map(plan => (
                              <option key={plan.id} value={plan.id}>
                                 {plan.name} ({plan.category})
                              </option>
                           ))}
                        </select>
                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-violet-600 transition-colors pointer-events-none" />
                     </div>
                  </div>

                  {selectedPlan && (
                     <div className="animate-in fade-in slide-in-from-top-2 duration-500 p-5 bg-violet-50/50 border border-violet-100 rounded-2xl">
                        <p className="text-[10px] font-bold text-violet-600 tracking-widest mb-1">Active Selection</p>
                        <p className="text-sm font-black text-slate-800">{selectedPlan.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 mt-0.5">{selectedPlan.provider}</p>
                     </div>
                  )}

                  <div className="space-y-4 pt-4 border-t border-slate-100">
                     <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                           <label className="text-[10px] font-bold text-slate-400 tracking-widest">Effective Date</label>
                           <input 
                              type="date" 
                              value={startDate}
                              onChange={(e) => setStartDate(e.target.value)}
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-bold text-slate-700 focus:ring-2 focus:ring-violet-500 outline-none"
                           />
                        </div>
                        <div className="space-y-1.5">
                           <label className="text-[10px] font-bold text-slate-400 tracking-widest">Maturity Date</label>
                           <input 
                              type="date" 
                              value={expiryDate}
                              onChange={(e) => setExpiryDate(e.target.value)}
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-bold text-slate-700 focus:ring-2 focus:ring-violet-500 outline-none"
                           />
                        </div>
                     </div>
                  </div>

                  <div className="pt-8 space-y-4">
                     <div className="flex justify-between items-center bg-slate-50 p-5 rounded-2xl border border-slate-100">
                        <div>
                           <p className="text-[10px] font-bold text-slate-400 mb-0.5 tracking-widest">Premium Quote</p>
                           <p className="text-xl font-black text-slate-900">{selectedPlan ? selectedPlan.premium : '₹0'}</p>
                        </div>
                        {selectedPlan && (
                           <div className="text-right">
                              <p className="text-[9px] font-bold text-slate-600">{selectedPlan.provider}</p>
                           </div>
                        )}
                     </div>

                     <button 
                        type="submit"
                        disabled={!selectedPlan || !customerName}
                        className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black shadow-xl hover:bg-slate-800 transition-all text-[12px] tracking-widest disabled:opacity-30"
                     >
                        {editingPolicyId ? 'Save Modifications' : 'Initialize Policy'}
                     </button>
                     
                     <button 
                        type="button"
                        onClick={onBack}
                        className="w-full py-3.5 bg-white text-slate-400 rounded-2xl font-bold border border-slate-100 hover:bg-slate-50 transition-all text-[11px] tracking-widest"
                     >
                        {editingPolicyId ? 'Cancel Edit' : 'Cancel Enrollment'}
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </form>
    </div>
  );
};

export default PolicyIssuanceForm;
