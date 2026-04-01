import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Check, X, Shield, Phone, Star, ChevronRight, Play } from 'lucide-react';
import { insurancePlans } from '../../data/carriers';

const IdvOptions = ['3 Lac', '5 Lac', '8 Lac', '12 Lac'];

const CarInsuCalculator: React.FC = () => {
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);
  
  const handleLogoError = (e: React.SyntheticEvent<HTMLImageElement, Event>, carrierName?: string) => {
    const target = e.target as HTMLImageElement;
    if (!target.src.includes('ui-avatars.com')) {
      const name = carrierName || 'Insurance';
      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=f8fafc&color=475569&size=128&bold=true`;
    }
  };

  // Form State
  const [carYear, setCarYear] = useState('');
  const [previousClaim, setPreviousClaim] = useState('');
  const [coverage, setCoverage] = useState('');

  // Results State
  const [selectedComparePlans, setSelectedComparePlans] = useState<typeof insurancePlans[0][]>([]);
  const [showCompareTable, setShowCompareTable] = useState(false);

  // Mock Metrics for display
  const metricsData: Record<string, any> = {
    'plan-3': { ClaimSettlement: '95%', NetworkGarages: '4,500+', discount: 'Save 15%' }, // ICICI
    'plan-4': { ClaimSettlement: '93%', NetworkGarages: '3,800+', discount: '' }, // Tata AIG
    'plan-9': { ClaimSettlement: '98%', NetworkGarages: '5,000+', discount: 'Zero Dep Free' }, // HDFC
  };

  const carPlans = useMemo(() => insurancePlans.filter(p => p.type === 'car'), []);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmittedData({ carYear, previousClaim, coverage });
      setShowResults(true);
      const res = document.getElementById('car-results');
      if (res) res.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 800);
  };

  const handleCompareToggle = (plan: typeof insurancePlans[0]) => {
    if (selectedComparePlans.find(p => p.id === plan.id)) {
      setSelectedComparePlans(selectedComparePlans.filter(p => p.id !== plan.id));
    } else {
      if (selectedComparePlans.length < 3) {
        setSelectedComparePlans([...selectedComparePlans, plan]);
      } else {
        alert("You can compare up to 3 plans at a time.");
      }
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Search Header Section */}
      <div className="max-w-6xl mx-auto w-full text-center mb-2">
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
          Calculate Your <span className="text-blue-600">Car Insurance</span> Premium
        </h2>
        <p className="text-slate-500 font-medium text-sm mt-3">Enter your vehicle details below to find the best car insurance plans tailored for you.</p>
      </div>

      {/* Horizontal Compact Calculator */}
      <div className="bg-white rounded-[24px] p-4 md:p-5 shadow-xl shadow-slate-200/50 border border-slate-100 max-w-6xl mx-auto w-full relative overflow-hidden group">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 relative z-10 w-full">
          <div className="shrink-0 flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shadow-sm"><Shield className="w-5 h-5" /></div>
             <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest hidden lg:block">Quoter</h2>
          </div>
          
          <form onSubmit={handleCalculate} className="flex-1 w-full flex flex-col sm:flex-row gap-3">
            <input 
              type="number" 
              placeholder="Car Year"
              className="flex-1 min-w-0 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-900 font-bold text-sm" 
              value={carYear}
              onChange={e => setCarYear(e.target.value)}
              required
              min="1990"
              max="2026"
            />

            <select 
              className="flex-1 min-w-0 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-700 font-bold text-sm"
              value={previousClaim}
              onChange={e => setPreviousClaim(e.target.value)}
              required
            >
              <option value="" disabled>Previous Claim?</option>
              {['Yes', 'No'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            
            <select 
              className="flex-1 min-w-0 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-700 font-bold text-sm"
              value={coverage}
              onChange={e => setCoverage(e.target.value)}
              required
            >
              <option value="" disabled>IDV Cover</option>
              {IdvOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            
            <button type="submit" disabled={isLoading} className="sm:w-32 bg-blue-600 text-white px-4 py-3 rounded-xl font-bold text-sm shadow-md shadow-blue-600/20 hover:bg-slate-900 hover:shadow-slate-900/20 transition-all active:scale-95 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed">
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                'Check'
              )}
            </button>
          </form>
        </div>
      </div>

      {showResults && (
        <div id="car-results" className="bg-slate-50 rounded-[32px] pb-20 pt-8 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="container mb-8">
             <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
                <div>
                   <h2 className="text-3xl font-black text-slate-900 tracking-tight">Best <span className="text-blue-500">Auto Plans</span></h2>
                   <p className="text-slate-500 font-medium text-sm mt-2">Showing tailored matches for your <strong className="text-slate-700">{submittedData?.carYear}</strong> vehicle.</p>
                </div>
             </div>
          </div>
          <div className="container mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
               {carPlans.map((plan) => {
                 const metrics = metricsData[plan.id] || { ClaimSettlement: '92%', NetworkGarages: '3,000+', discount: '' };
                 const isCompared = !!selectedComparePlans.find(p => p.id === plan.id);
                 
                 return (
                   <div key={plan.id} className="bg-white border border-slate-200 rounded-2xl p-5 relative overflow-hidden group hover:border-blue-300 transition-colors shadow-sm mb-4">
                      {/* Discount Badge */}
                      {metrics.discount && (
                        <div className="absolute top-0 right-4 bg-blue-50 text-blue-700 px-2 py-0.5 rounded-b-md text-[10px] font-bold flex items-center gap-1 border border-t-0 border-blue-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                          {metrics.discount}
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-1.5">
                            <img src={plan.carrierLogo} alt={plan.carrierName} className="w-full h-full object-contain" onError={(e) => handleLogoError(e, plan.carrierName)} />
                          </div>
                          <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md inline-block mb-1">{plan.carrierName}</span>
                            <h3 className="font-black text-slate-900 leading-tight">{plan.planName}</h3>
                          </div>
                        </div>
                        <div className="text-left sm:text-right flex flex-row sm:flex-col items-center sm:items-end justify-between">
                          <p className="text-xl font-black text-slate-900">₹{plan.monthlyPrice}/mo</p>
                          <div className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-md mt-1 border border-blue-100">
                            <Star className="w-3 h-3 fill-current" />
                            <span className="text-[10px] font-black">{Math.round(plan.rating * 20)}% Match Score</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-50 rounded-xl p-4 mb-4 border border-slate-100">
                        <p className="text-xs text-slate-700 font-medium mb-3"><strong className="text-slate-900 font-bold">Why this plan?</strong> Premium vehicle protection backed by large garage networks.</p>
                        <div className="flex flex-wrap gap-x-4 gap-y-2">
                          <div className="w-full sm:w-auto">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-0.5">IDV Cover</span>
                            <span className="text-sm font-black text-slate-900">{submittedData?.coverage}</span>
                          </div>
                          <div className="w-px bg-slate-200 hidden sm:block"></div>
                          <div className="w-full sm:w-auto">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-0.5">Claims Metric</span>
                            <span className="text-xs font-bold text-blue-600 flex items-center gap-1"><Shield className="w-3 h-3" /> {metrics.ClaimSettlement} Processed</span>
                          </div>
                          <div className="w-px bg-slate-200 hidden sm:block"></div>
                          <div className="w-full sm:w-auto">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-0.5">Garages</span>
                            <span className="text-xs font-bold text-blue-600 flex items-center gap-1"><Play className="w-3 h-3 rotate-90" /> {metrics.NetworkGarages} Near You</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <ul className="flex flex-wrap gap-2 flex-1">
                          {plan.benefits.slice(0, 3).map((f, i) => (
                            <li key={i} className="text-[10px] font-bold text-slate-500 bg-white border border-slate-200 px-2 py-1 rounded-md flex items-center gap-1">
                              <Check className="w-3 h-3 text-blue-500" /> {f}
                            </li>
                          ))}
                        </ul>
                        
                        <div className="flex items-center gap-4 w-full sm:w-auto shrink-0">
                          <label className="flex items-center gap-2 cursor-pointer group/cb">
                            <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${isCompared ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-slate-50 group-hover/cb:border-blue-400'}`}>
                              {isCompared && <Check className="w-3 h-3" />}
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Compare</span>
                            <input 
                              type="checkbox" 
                              className="hidden" 
                              checked={isCompared} 
                              onChange={() => handleCompareToggle(plan)} 
                            />
                          </label>
                          <button className="flex-1 sm:flex-none bg-slate-900 text-white px-6 py-2.5 rounded-xl font-black text-xs hover:bg-blue-600 transition-colors shadow-md active:scale-95 flex items-center justify-center gap-2">
                            Buy Policy <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                   </div>
                 );
               })}
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
               <div className="bg-[#f0f9ff] p-6 rounded-2xl border border-blue-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                  <h3 className="text-blue-600 font-black text-lg mb-6 relative z-10">Why InsuranceAdvisor?</h3>
                  <ul className="space-y-5 relative z-10">
                     <li className="flex items-start gap-3">
                       <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-600 shadow-sm shrink-0 font-black text-xs">₹</div>
                       <div>
                         <p className="text-xs font-bold text-slate-800 mt-1">Cashless Repairs</p>
                       </div>
                     </li>
                     <li className="flex items-start gap-3">
                       <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-600 shadow-sm shrink-0"><Phone className="w-3 h-3" /></div>
                       <div>
                         <p className="text-xs font-bold text-slate-800 mt-1">24*7 Roadside Assistance</p>
                       </div>
                     </li>
                     <li className="flex items-start gap-3">
                       <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-600 shadow-sm shrink-0">📄</div>
                       <div>
                         <p className="text-xs font-bold text-slate-800 mt-1">Zero Paperwork</p>
                       </div>
                     </li>
                  </ul>
               </div>

               <div className="bg-[#f8fafc] p-6 rounded-2xl border border-slate-200">
                  <h3 className="text-slate-800 font-black text-lg mb-2">Need Expert Help?</h3>
                  <p className="text-xs text-slate-600 font-medium mb-4">Insure your vehicle with top expert advice.</p>
                  <button className="bg-white text-blue-600 font-bold text-sm px-6 py-3 rounded-lg border border-blue-200 shadow-sm w-full hover:bg-blue-50 transition-colors">
                    Schedule Call back
                  </button>
               </div>
            </div>
          </div>

          {/* Compare Action Bar */}
          {selectedComparePlans.length > 0 && (
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white pl-5 pr-2 py-2 rounded-full shadow-2xl flex items-center gap-6 z-40 border border-white/10 animate-fade-in">
               <div className="flex items-center gap-3">
                  <div className="flex -space-x-3">
                    {selectedComparePlans.map((p, i) => (
                      <div key={p.id} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-white flex items-center justify-center overflow-hidden z-20" style={{zIndex: 10 - i}}>
                        <img src={p.carrierLogo} className="w-full h-full object-contain p-1" alt={p.carrierName} onError={(e) => handleLogoError(e, p.carrierName)} />
                      </div>
                    ))}
                  </div>
                  <div>
                     <p className="text-xs font-bold">{selectedComparePlans.length} Plans Selected</p>
                  </div>
               </div>
               <div className="flex items-center gap-2 border-l border-white/20 pl-4">
                  <button 
                    onClick={() => setShowCompareTable(true)}
                    className="bg-blue-500 hover:bg-blue-600 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-colors shadow-xl shadow-blue-500/20"
                  >
                    Compare Now
                  </button>
                  <button 
                     onClick={() => setSelectedComparePlans([])}
                     className="text-slate-400 hover:text-white transition-colors w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10"
                  >
                    <X className="w-4 h-4" />
                  </button>
               </div>
            </div>
          )}

          {/* Compare Modal */}
          {showCompareTable && createPortal(
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
               <div className="bg-white w-full max-w-5xl max-h-[90vh] flex flex-col rounded-[32px] shadow-2xl relative animate-in zoom-in-95 duration-200">
                 <div className="bg-white border-b border-slate-100 p-6 flex items-center justify-between z-10 rounded-t-[32px] shrink-0">
                   <h2 className="text-xl md:text-2xl font-black text-slate-900 flex items-center gap-2">
                     Plan Comparison
                   </h2>
                   <button 
                     onClick={() => setShowCompareTable(false)}
                     className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200"
                   >
                     <X className="w-5 h-5" />
                   </button>
                 </div>
                 
                 <div className="p-6 overflow-auto">
                   <table className="w-full text-left border-collapse min-w-[700px]">
                     <thead>
                       <tr>
                         <th className="p-4 border-b-2 border-slate-100 w-1/4"></th>
                         {selectedComparePlans.map(plan => (
                           <th key={plan.id} className="p-4 border-b-2 border-slate-100 text-center relative w-1/4">
                             <button onClick={() => setSelectedComparePlans(selectedComparePlans.filter(p => p.id !== plan.id))} className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-500"><X className="w-4 h-4" /></button>
                             <img src={plan.carrierLogo} className="h-10 mx-auto mb-2 object-contain" alt={plan.carrierName} onError={(e) => handleLogoError(e, plan.carrierName)} />
                             <h3 className="font-black text-slate-900 text-sm line-clamp-1">{plan.planName}</h3>
                             <p className="text-[10px] text-slate-500 font-bold">{plan.carrierName}</p>
                           </th>
                         ))}
                       </tr>
                     </thead>
                     <tbody>
                       <tr>
                         <td className="p-4 border-b border-slate-100 font-bold text-sm text-slate-700 bg-slate-50/50">Monthly Premium</td>
                         {selectedComparePlans.map(plan => (
                           <td key={plan.id} className="p-4 border-b border-slate-100 text-center text-blue-600 font-black text-xl">₹{plan.monthlyPrice}</td>
                         ))}
                       </tr>
                       <tr>
                         <td className="p-4 border-b border-slate-100 font-bold text-sm text-slate-700 bg-slate-50/50">IDV Value</td>
                         {selectedComparePlans.map(plan => (
                           <td key={plan.id} className="p-4 border-b border-slate-100 text-center font-bold text-slate-900">{submittedData?.coverage}</td>
                         ))}
                       </tr>
                       <tr>
                         <td className="p-4 border-b border-slate-100 font-bold text-sm text-slate-700 bg-slate-50/50">Claim Settled</td>
                         {selectedComparePlans.map(plan => (
                           <td key={plan.id} className="p-4 border-b border-slate-100 text-center font-bold text-slate-700">{metricsData[plan.id]?.ClaimSettlement || '99%'}</td>
                         ))}
                       </tr>
                       <tr>
                         <td className="p-4 border-b border-slate-100 font-bold text-sm text-slate-700 bg-slate-50/50">Cashless Garages</td>
                         {selectedComparePlans.map(plan => (
                           <td key={plan.id} className="p-4 border-b border-slate-100 text-center font-bold text-slate-700">{metricsData[plan.id]?.NetworkGarages || '3,000+'}</td>
                         ))}
                       </tr>
                       <tr>
                         <td className="p-4 border-b border-slate-100 font-bold text-sm text-slate-700 bg-slate-50/50">Key Benefits</td>
                         {selectedComparePlans.map(plan => (
                           <td key={plan.id} className="p-4 border-b border-slate-100 align-top">
                             <ul className="flex flex-col gap-2">
                               {plan.benefits.map((b, i) => (
                                 <li key={i} className="flex items-start gap-3 text-[11px] font-semibold text-slate-600">
                                   <Check className="w-3 h-3 text-blue-500 flex-shrink-0" /> <span>{b}</span>
                                 </li>
                               ))}
                             </ul>
                           </td>
                         ))}
                       </tr>
                     </tbody>
                   </table>
                 </div>
               </div>
            </div>,
            document.body
          )}
        </div>
      )}
    </div>
  );
};

export default CarInsuCalculator;
