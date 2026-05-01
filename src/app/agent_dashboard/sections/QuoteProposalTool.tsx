/* src/app/agent_dashboard/sections/QuoteProposalTool.tsx */
import React, { useState, useMemo } from 'react';
import { 
  Zap, Shield, Clock, Search, Filter, 
  CheckCircle2, Info, ChevronRight, 
  Briefcase, Heart, Car, Umbrella, X, Check, Download
} from 'lucide-react';
import { Card, Button } from '../../../components/agent/UI';
import toast from 'react-hot-toast';
import { jsPDF } from 'jspdf';

const QuoteProposalTool: React.FC = () => {
  const [insuranceType, setInsuranceType] = useState('Life');
  const [showResults, setShowResults] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState('All');
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
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

  const filteredInsurers = useMemo(() => {
    return insurers.filter(ins => {
      const matchesSearch = ins.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          ins.plan.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRating = filterRating === 'All' || parseFloat(ins.rating) >= parseFloat(filterRating);
      return matchesSearch && matchesRating;
    });
  }, [searchTerm, filterRating]);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.loading('Analyzing market quotes for ' + insuranceType + '...', { duration: 1500 });
    setTimeout(() => {
      setShowResults(true);
      toast.success(`Generated ${insurers.length} comparison quotes!`);
    }, 1500);
  };

  const handleExport = () => {
    try {
      const doc = new jsPDF();
      doc.setFontSize(22);
      doc.setTextColor(99, 102, 241);
      doc.text("COMPARATIVE QUOTE ANALYSIS", 105, 20, { align: 'center' });
      
      doc.setFontSize(10);
      doc.setTextColor(100, 116, 139);
      doc.text(`Generated for Age: ${formData.age} | Sum Insured: ₹${parseInt(formData.sumInsured)/100000} Lakh`, 105, 28, { align: 'center' });
      
      let currentY = 50;
      filteredInsurers.forEach((ins) => {
        doc.setFillColor(248, 250, 252);
        doc.roundedRect(20, currentY, 170, 40, 3, 3, 'F');
        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(30, 41, 59);
        doc.text(ins.name, 30, currentY + 12);
        
        doc.setFontSize(10);
        doc.setTextColor(99, 102, 241);
        doc.text(ins.plan, 30, currentY + 22);
        
        doc.setFontSize(16);
        doc.setTextColor(30, 41, 59);
        doc.text(ins.premium, 150, currentY + 22);
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(100, 116, 139);
        doc.text(ins.features.slice(0, 2).join(" | "), 30, currentY + 32);
        
        currentY += 50;
      });
      
      doc.save(`Quote_Comparison_${insuranceType}.pdf`);
      toast.success('Quotes exported successfully');
    } catch (err) {
      toast.error('Export failed');
    }
  };

  const handleSave = (plan: string) => {
    toast.success(`Proposal for ${plan} saved to client draft.`);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 pb-10 animate-fade-in">
      {/* Search & Inputs */}
      <div className="xl:col-span-4 space-y-6">
        <Card className="p-8 border-none shadow-xl shadow-slate-200/50 bg-white">
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
                      onClick={() => { setInsuranceType(type.id); setShowResults(false); }}
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
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 transition-all"
                    value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})}
                  />
               </div>
               <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sum Insured (₹)</label>
                  <select 
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 transition-all"
                    value={formData.sumInsured} onChange={(e) => setFormData({...formData, sumInsured: e.target.value})}
                  >
                    <option value="500000">₹5 Lakh</option>
                    <option value="1000000">₹10 Lakh</option>
                    <option value="2500000">₹25 Lakh</option>
                    <option value="5000000">₹50 Lakh</option>
                  </select>
               </div>
            </div>

            <Button type="submit" className="w-full py-4 text-sm shadow-xl shadow-indigo-600/20 rounded-2xl">Generate Comparison</Button>
          </form>
        </Card>

        {/* Tips / Info */}
        <Card className="p-6 bg-indigo-600 text-white border-none shadow-xl rounded-[24px]">
           <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-indigo-100 flex-shrink-0 backdrop-blur-md">
                 <Info size={20} />
              </div>
              <div>
                 <h4 className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-80">Intelligence Tip</h4>
                 <p className="text-[11px] font-bold text-indigo-50 leading-relaxed">
                    Policies with "Restore Benefit" have a 15% higher conversion rate this month. Mention this to your client.
                 </p>
              </div>
           </div>
        </Card>
      </div>
      
      {/* Results Section */}
      <div className="xl:col-span-8 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 px-2">
           <div>
              <h3 className="text-xl font-black text-slate-800 tracking-tight">Available Plans</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Showing best matches from 18 insurers</p>
           </div>
           
           {showResults && (
             <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-48">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                   <input 
                     type="text" 
                     placeholder="Search plans..." 
                     className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-100 rounded-xl text-[10px] font-bold outline-none focus:border-indigo-500 shadow-sm"
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                   />
                </div>

                <div className="relative">
                   <button 
                     onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                     className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all border shadow-sm ${filterRating !== 'All' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 border-slate-100 hover:bg-slate-50'}`}
                   >
                      <Filter size={14} /> {filterRating === 'All' ? 'Rating' : `${filterRating}+ ★`}
                   </button>

                   {isFilterMenuOpen && (
                     <div className="absolute right-0 mt-2 w-40 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                        {['All', '4.7', '4.6', '4.5'].map(rate => (
                          <button 
                            key={rate}
                            onClick={() => { setFilterRating(rate); setIsFilterMenuOpen(false); }}
                            className={`w-full px-4 py-2 text-[10px] font-black uppercase tracking-widest text-left flex items-center justify-between hover:bg-slate-50 transition-colors ${filterRating === rate ? 'text-indigo-600 bg-indigo-50' : 'text-slate-500'}`}
                          >
                            {rate === 'All' ? 'All Ratings' : `${rate}+ Stars`}
                            {filterRating === rate && <Check size={12} />}
                          </button>
                        ))}
                     </div>
                   )}
                </div>

                <Button variant="outline" size="sm" icon={<Download size={14} />} onClick={handleExport}>Export</Button>
             </div>
           )}
        </div>

        {showResults ? (
          <div className="space-y-6">
            {filteredInsurers.map((ins) => (
              <Card key={ins.id} className="group border-none shadow-xl shadow-slate-200/40 overflow-hidden hover:translate-x-2 transition-all duration-300 bg-white">
                <div className="p-8">
                   <div className="flex flex-col lg:flex-row justify-between gap-8">
                      <div className="flex-1 space-y-5">
                         <div className="flex flex-wrap items-center gap-3">
                            <h4 className="text-xl font-black text-slate-800 tracking-tight">{ins.name}</h4>
                            <span className="px-2.5 py-1 bg-amber-50 text-amber-600 text-[10px] font-black rounded-lg border border-amber-100 uppercase tracking-widest flex items-center gap-1">★ {ins.rating}</span>
                            {ins.recommendation && (
                              <span className="px-2.5 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-lg border border-indigo-100 uppercase tracking-widest">{ins.recommendation}</span>
                            )}
                         </div>
                         <p className="text-xs font-black text-indigo-600 uppercase tracking-[0.1em] flex items-center gap-2">
                            <Shield size={16} /> {ins.plan}
                         </p>
                         <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 pt-2">
                            {ins.features.map((f, i) => (
                               <li key={i} className="flex items-center gap-2.5 text-xs font-bold text-slate-500 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
                                  <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" /> {f}
                               </li>
                            ))}
                         </ul>
                      </div>

                      <div className="lg:w-56 flex flex-col justify-between items-end border-l border-slate-100 pl-8">
                         <div className="text-right">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Annual Premium</p>
                            <p className="text-3xl font-black text-slate-800 tracking-tighter">{ins.premium}</p>
                            <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">incl. 18% GST</p>
                         </div>
                         <div className="flex flex-col w-full gap-2 mt-8">
                            <Button variant="primary" size="sm" className="w-full py-3 rounded-xl shadow-lg shadow-indigo-600/10" onClick={() => handleSave(ins.name)}>Save Proposal</Button>
                            <button className="text-[10px] font-black text-slate-400 hover:text-indigo-600 transition-colors flex items-center justify-center gap-1 uppercase tracking-widest py-2">
                               Full Plan Audit <ChevronRight size={14} />
                            </button>
                         </div>
                      </div>
                   </div>
                </div>
              </Card>
            ))}
            {filteredInsurers.length === 0 && (
              <div className="py-20 text-center bg-white rounded-[40px] border border-slate-100 shadow-sm">
                 <X size={48} className="mx-auto text-slate-200 mb-4" />
                 <p className="text-sm font-black text-slate-400 uppercase tracking-widest">No plans found matching your search</p>
              </div>
            )}
            
            <div className="p-8 border-2 border-dashed border-slate-200 rounded-[32px] flex items-center justify-between bg-white/40">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-400">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h5 className="text-[11px] font-black text-slate-600 uppercase tracking-widest">Proposal History</h5>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">You have 12 draft proposals waiting for client approval</p>
                  </div>
               </div>
               <Button variant="outline" size="sm" className="rounded-xl border-slate-200 text-slate-500">View Drafts</Button>
            </div>
          </div>
        ) : (
          <div className="h-[500px] border-2 border-dashed border-slate-200 rounded-[40px] flex flex-col items-center justify-center text-slate-400 bg-white/50 animate-in fade-in zoom-in-95 duration-700">
            <div className="relative mb-8">
               <Shield size={80} className="opacity-10" />
               <Zap size={32} className="absolute -top-2 -right-2 text-indigo-100 animate-pulse" />
            </div>
            <h4 className="text-xl font-black uppercase tracking-[0.3em] opacity-30">Orchestrating Market Data</h4>
            <p className="text-xs font-bold opacity-30 mt-3 uppercase tracking-widest">Compare quotes across 18+ insurers in 2.4 seconds</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuoteProposalTool;
