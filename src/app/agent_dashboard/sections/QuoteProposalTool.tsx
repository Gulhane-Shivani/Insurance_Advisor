/* src/app/agent_dashboard/sections/QuoteProposalTool.tsx */
import React, { useState } from 'react';
import { 
  Zap, Save, Shield, Clock, Search, Filter, 
  ArrowRight, CheckCircle2, Info, ChevronRight, 
  Briefcase, Heart, Car, Umbrella
} from 'lucide-react';
import { Card, Button } from '../../../components/agent/UI';
import toast from 'react-hot-toast';

const QuoteProposalTool: React.FC = () => {
  const [insuranceType, setInsuranceType] = useState('Life');
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState({
    age: '',
    sumInsured: '1000000',
    term: '20'
  });

  const insurers = [
    { 
      id: '1', 
      name: 'HDFC ERGO', 
      plan: 'Silver Shield Plus', 
      premium: '₹12,400', 
      rating: '4.8', 
      features: ['Cashless at 10,000+ Hospitals', 'No Claim Bonus up to 100%', 'Pre-policy Checkup Waived'],
      recommendation: 'Best Value'
    },
    { 
      id: '2', 
      name: 'TATA AIG', 
      plan: 'Health Elite Global', 
      premium: '₹14,200', 
      rating: '4.6', 
      features: ['Global Cover Included', 'OPD Expenses Covered', 'Maternity Benefit'],
      recommendation: 'Premium Choice'
    },
    { 
      id: '3', 
      name: 'ICICI Lombard', 
      plan: 'Health Care Supreme', 
      premium: '₹11,800', 
      rating: '4.5', 
      features: ['Daily Cash Allowance', 'Restore Benefit', 'Critical Illness Rider'],
      recommendation: 'Most Popular'
    },
  ];

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.loading('Analyzing market quotes...', { duration: 1500 });
    setTimeout(() => {
      setShowResults(true);
      toast.success('Generated 12 comparison quotes!');
    }, 1500);
  };

  const handleSave = (plan: string) => {
    toast.success(`Proposal for ${plan} saved to client draft.`);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 pb-10 animate-fade-in">
      {/* Search & Inputs */}
      <div className="xl:col-span-4 space-y-6">
        <Card className="p-8 border-none shadow-xl shadow-slate-200/50">
          <h3 className="text-xl font-black text-slate-800 mb-8 flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 shadow-sm shadow-amber-200/50">
                <Zap size={20} fill="currentColor" />
             </div>
             Quick Quote Engine
          </h3>
          
          <form onSubmit={handleGenerate} className="space-y-6">
            <div className="space-y-3">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Insurance Type</label>
               <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'Life', icon: Heart },
                    { id: 'Health', icon: Umbrella },
                    { id: 'Car', icon: Car },
                    { id: 'Business', icon: Briefcase },
                  ].map(type => (
                    <button 
                      key={type.id}
                      type="button"
                      onClick={() => setInsuranceType(type.id)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-2xl border-2 transition-all font-black text-[10px] uppercase tracking-widest ${insuranceType === type.id ? 'border-indigo-600 bg-indigo-50 text-indigo-600 shadow-md' : 'border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-200'}`}
                    >
                      <type.icon size={16} />
                      {type.id}
                    </button>
                  ))}
               </div>
            </div>

            <div className="space-y-4">
               <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Age of Primary Insured</label>
                  <input 
                    type="number" required placeholder="e.g. 35"
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold outline-none focus:border-indigo-500 focus:bg-white transition-all"
                    value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})}
                  />
               </div>
               <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sum Insured (₹)</label>
                  <select 
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold outline-none focus:border-indigo-500 focus:bg-white transition-all"
                    value={formData.sumInsured} onChange={(e) => setFormData({...formData, sumInsured: e.target.value})}
                  >
                    <option value="500000">₹5 Lakh</option>
                    <option value="1000000">₹10 Lakh</option>
                    <option value="2500000">₹25 Lakh</option>
                    <option value="5000000">₹50 Lakh</option>
                  </select>
               </div>
            </div>

            <Button type="submit" className="w-full py-4 text-sm shadow-xl shadow-indigo-600/20">Generate Quotes</Button>
          </form>
        </Card>

        {/* Tips / Info */}
        <Card className="p-6 bg-indigo-600 text-white border-none shadow-xl">
           <div className="flex gap-4">
              <Info size={24} className="text-indigo-200 flex-shrink-0" />
              <div>
                 <h4 className="text-sm font-black uppercase tracking-widest mb-1">Agent Tip</h4>
                 <p className="text-xs font-medium text-indigo-100 leading-relaxed">
                    Policies with "Restore Benefit" have a 15% higher conversion rate this month. Mention this to your client.
                 </p>
              </div>
           </div>
        </Card>
      </div>
      
      {/* Results Section */}
      <div className="xl:col-span-8 space-y-6">
        <div className="flex items-center justify-between px-2">
           <div>
              <h3 className="text-lg font-black text-slate-800">Available Plans</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Showing best matches from 18 insurers</p>
           </div>
           <div className="flex gap-2">
              <Button variant="outline" size="sm" icon={<Filter size={14} />}>Filter</Button>
              <Button variant="outline" size="sm" icon={<Search size={14} />}>Advanced</Button>
           </div>
        </div>

        {showResults ? (
          <div className="space-y-6">
            {insurers.map((ins) => (
              <Card key={ins.id} className="group border-none shadow-xl shadow-slate-200/50 overflow-hidden hover:translate-x-2 transition-all duration-300">
                <div className="p-8">
                   <div className="flex flex-col lg:flex-row justify-between gap-8">
                      <div className="flex-1 space-y-4">
                         <div className="flex items-center gap-3">
                            <h4 className="text-xl font-black text-slate-800 tracking-tight">{ins.name}</h4>
                            <span className="px-2.5 py-1 bg-amber-50 text-amber-600 text-[10px] font-black rounded-lg border border-amber-100 uppercase tracking-widest">★ {ins.rating}</span>
                            {ins.recommendation && (
                              <span className="px-2.5 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-lg border border-indigo-100 uppercase tracking-widest">{ins.recommendation}</span>
                            )}
                         </div>
                         <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                            <Shield size={16} /> {ins.plan}
                         </p>
                         <ul className="space-y-2 pt-2">
                            {ins.features.map((f, i) => (
                               <li key={i} className="flex items-center gap-2 text-xs font-bold text-slate-500">
                                  <CheckCircle2 size={14} className="text-emerald-500" /> {f}
                               </li>
                            ))}
                         </ul>
                      </div>

                      <div className="lg:w-48 flex flex-col justify-between items-end border-l border-slate-100 pl-8">
                         <div className="text-right">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Annual Premium</p>
                            <p className="text-3xl font-black text-slate-800">{ins.premium}</p>
                            <p className="text-[10px] font-bold text-slate-400 mt-1">incl. 18% GST</p>
                         </div>
                         <div className="flex flex-col w-full gap-2 mt-6">
                            <Button variant="primary" size="sm" className="w-full" onClick={() => handleSave(ins.name)}>Save Proposal</Button>
                            <button className="text-[10px] font-black text-slate-400 hover:text-indigo-600 transition-colors flex items-center justify-center gap-1 uppercase tracking-widest py-2">
                               Full Details <ChevronRight size={14} />
                            </button>
                         </div>
                      </div>
                   </div>
                </div>
              </Card>
            ))}
            
            <div className="p-8 border-2 border-dashed border-slate-200 rounded-[32px] flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h5 className="text-sm font-black text-slate-600 uppercase tracking-widest">History</h5>
                    <p className="text-xs text-slate-400 font-bold">You have 12 draft proposals waiting for client approval</p>
                  </div>
               </div>
               <Button variant="outline" size="sm">View Drafts</Button>
            </div>
          </div>
        ) : (
          <div className="h-[500px] border-2 border-dashed border-slate-200 rounded-[40px] flex flex-col items-center justify-center text-slate-400 bg-white/50 animate-pulse">
            <Shield size={64} className="mb-6 opacity-10" />
            <h4 className="text-xl font-black uppercase tracking-[0.2em] opacity-30">Waiting for Data</h4>
            <p className="text-sm font-bold opacity-30 mt-2">Compare quotes across 18+ insurers instantly</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuoteProposalTool;
