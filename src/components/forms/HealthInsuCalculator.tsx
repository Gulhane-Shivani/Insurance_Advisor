import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Check, X, Shield, Phone, Zap, ArrowRight, Star, ChevronRight, Activity } from 'lucide-react';
import { insurancePlans } from '../../data/carriers';

type CoveredMember = 'You' | 'Couple' | 'Family' | 'Father' | 'Mother';

const CoverageOptions = ['5 Lac', '10 Lac', '25 Lac'];

const HealthInsuCalculator: React.FC = () => {
  const [showResults, setShowResults] = useState(false);
  
  // Form State
  const [covered, setCovered] = useState<CoveredMember>('Couple');
  const [ageYou, setAgeYou] = useState('45');
  const [ageSpouse, setAgeSpouse] = useState('55');
  const [pincode, setPincode] = useState('Yavatmal (445210)');
  const [coverage, setCoverage] = useState('5 Lac');

  // Results State
  const [selectedComparePlans, setSelectedComparePlans] = useState<typeof insurancePlans[0][]>([]);
  const [showCompareTable, setShowCompareTable] = useState(false);

  // Mock Health Metrics for display (since they aren't in the generic data)
  const healthMetrics: Record<string, any> = {
    'plan-1': { cashless: '437', claim: '85.80%', discount: 'Inc. 5% off' }, // Star
    'plan-2': { cashless: '733', claim: '93.4%', discount: '' }, // HDFC
    'plan-6': { cashless: '192', claim: '93%', discount: 'Inc. 5% off' }, // Star Red Carpet
    'plan-10': { cashless: '512', claim: '91.2%', discount: '' } // Star Diabetes
  };

  const healthPlans = useMemo(() => insurancePlans.filter(p => p.type === 'health'), []);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
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

  if (showResults) {
    return (
      <div className="bg-slate-50 min-h-screen pb-20 pt-8">
        <div className="container mb-8">
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
              <div>
                 <h2 className="text-3xl font-black text-slate-900 tracking-tight">Recommended <span className="text-green-600">Health Plans</span></h2>
                 <p className="text-slate-500 font-medium text-sm mt-2">Showing tailored matches for <strong className="text-slate-700">{covered}</strong> residing in <strong className="text-slate-700">{pincode}</strong>.</p>
              </div>
              <button 
                 onClick={() => setShowResults(false)}
                 className="bg-white border-2 border-slate-200 text-slate-600 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:border-slate-300 hover:bg-slate-100 transition-colors active:scale-95"
              >
                 Edit Profile
              </button>
           </div>
        </div>
        <div className="container mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
             {healthPlans.map((plan) => {
               const metrics = healthMetrics[plan.id] || { cashless: '500+', claim: '90%', discount: '' };
               const isCompared = !!selectedComparePlans.find(p => p.id === plan.id);
               
               return (
                 <div key={plan.id} className="bg-white border border-slate-200 rounded-2xl p-5 relative overflow-hidden group hover:border-blue-300 transition-colors shadow-sm mb-4">
                    {/* Discount Badge */}
                    {metrics.discount && (
                      <div className="absolute top-0 right-4 bg-green-50 text-green-700 px-2 py-0.5 rounded-b-md text-[10px] font-bold flex items-center gap-1 border border-t-0 border-green-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        {metrics.discount}
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-1.5">
                          <img src={plan.carrierLogo} alt={plan.carrierName} className="w-full h-full object-contain" />
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md inline-block mb-1">{plan.carrierName}</span>
                          <h3 className="font-black text-slate-900 leading-tight">{plan.planName}</h3>
                        </div>
                      </div>
                      <div className="text-left sm:text-right flex flex-row sm:flex-col items-center sm:items-end justify-between">
                        <p className="text-xl font-black text-slate-900">₹{plan.monthlyPrice}/mo</p>
                        <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-md mt-1 border border-green-100">
                          <Star className="w-3 h-3 fill-current" />
                          <span className="text-[10px] font-black">{Math.round(plan.rating * 20)}% Match Score</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-4 mb-4 border border-slate-100">
                      <p className="text-xs text-slate-700 font-medium mb-3"><strong className="text-slate-900 font-bold">Why this plan?</strong> Best-in-class health coverage tailored for your current profile.</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-2">
                        <div className="w-full sm:w-auto">
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-0.5">Coverage</span>
                          <span className="text-sm font-black text-slate-900">{coverage}</span>
                        </div>
                        <div className="w-px bg-slate-200 hidden sm:block"></div>
                        <div className="w-full sm:w-auto">
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-0.5">Trust Metric</span>
                          <span className="text-xs font-bold text-green-600 flex items-center gap-1"><Shield className="w-3 h-3" /> {metrics.claim} Claim Settlement</span>
                        </div>
                        <div className="w-px bg-slate-200 hidden sm:block"></div>
                        <div className="w-full sm:w-auto">
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-0.5">Network</span>
                          <span className="text-xs font-bold text-blue-600 flex items-center gap-1"><Activity className="w-3 h-3" /> {metrics.cashless} Hospitals</span>
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
                          <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${isCompared ? 'bg-green-600 border-green-600 text-white' : 'border-slate-300 bg-slate-50 group-hover/cb:border-green-400'}`}>
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
             <div className="bg-[#fff9f2] p-6 rounded-2xl border border-orange-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-100 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                <h3 className="text-orange-600 font-black text-lg mb-6 relative z-10">Why InsuranceAdvisor?</h3>
                <ul className="space-y-5 relative z-10">
                   <li className="flex items-start gap-3">
                     <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-600 shadow-sm shrink-0 font-black text-xs">₹</div>
                     <div>
                       <p className="text-xs font-bold text-slate-800 mt-1">25K Claims Assisted</p>
                     </div>
                   </li>
                   <li className="flex items-start gap-3">
                     <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-600 shadow-sm shrink-0"><Phone className="w-3 h-3" /></div>
                     <div>
                       <p className="text-xs font-bold text-slate-800 mt-1">24*7 Claim Assistance</p>
                       <p className="text-[9px] text-slate-500 font-medium">(10am to 7pm) excluding national holidays</p>
                     </div>
                   </li>
                   <li className="flex items-start gap-3">
                     <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-600 shadow-sm shrink-0">📄</div>
                     <div>
                       <p className="text-xs font-bold text-slate-800 mt-1">Paperless process</p>
                     </div>
                   </li>
                   <li className="flex items-start gap-3">
                     <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-600 shadow-sm shrink-0"><Zap className="w-3 h-3" /></div>
                     <div>
                       <p className="text-xs font-bold text-slate-800 mt-1">Instant Policy Issuance</p>
                     </div>
                   </li>
                </ul>
             </div>

             <div className="bg-[#eefcf4] p-6 rounded-2xl border border-green-100">
                <h3 className="text-green-800 font-black text-lg mb-2">Are you looking for Help?</h3>
                <p className="text-xs text-green-700 font-medium mb-4">Insure your Family Health with IRDAI Certified expert advice</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-[10px] text-green-800 font-bold flex items-center gap-1"><Check className="w-3 h-3 text-green-600" /> Certified Experts</span>
                  <span className="text-[10px] text-green-800 font-bold flex items-center gap-1"><Check className="w-3 h-3 text-green-600" /> Claim Support</span>
                  <span className="text-[10px] text-green-800 font-bold flex items-center gap-1"><Check className="w-3 h-3 text-green-600" /> Free Advice</span>
                </div>
                <button className="bg-white text-green-700 font-bold text-sm px-6 py-3 rounded-lg border border-green-200 shadow-sm w-full hover:bg-green-50 transition-colors">
                  Schedule a Call back
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
                      <img src={p.carrierLogo} className="w-full h-full object-contain p-1" />
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
                  className="bg-green-600 hover:bg-green-700 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-colors shadow-xl shadow-green-500/20"
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
                           <img src={plan.carrierLogo} className="h-10 mx-auto mb-2 object-contain" alt={plan.carrierName}/>
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
                         <td key={plan.id} className="p-4 border-b border-slate-100 text-center text-green-600 font-black text-xl">₹{plan.monthlyPrice}</td>
                       ))}
                     </tr>
                     <tr>
                       <td className="p-4 border-b border-slate-100 font-bold text-sm text-slate-700 bg-slate-50/50">Coverage Amount</td>
                       {selectedComparePlans.map(plan => (
                         <td key={plan.id} className="p-4 border-b border-slate-100 text-center font-bold text-slate-900">{coverage}</td>
                       ))}
                     </tr>
                     <tr>
                       <td className="p-4 border-b border-slate-100 font-bold text-sm text-slate-700 bg-slate-50/50">Claim Settled</td>
                       {selectedComparePlans.map(plan => (
                         <td key={plan.id} className="p-4 border-b border-slate-100 text-center font-bold text-slate-700">{healthMetrics[plan.id]?.claim || '90%'}</td>
                       ))}
                     </tr>
                     <tr>
                       <td className="p-4 border-b border-slate-100 font-bold text-sm text-slate-700 bg-slate-50/50">Cashless Hospitals</td>
                       {selectedComparePlans.map(plan => (
                         <td key={plan.id} className="p-4 border-b border-slate-100 text-center font-bold text-slate-700">{healthMetrics[plan.id]?.cashless || '500+'}</td>
                       ))}
                     </tr>
                     <tr>
                       <td className="p-4 border-b border-slate-100 font-bold text-sm text-slate-700 bg-slate-50/50">Key Benefits</td>
                       {selectedComparePlans.map(plan => (
                         <td key={plan.id} className="p-4 border-b border-slate-100 align-top">
                           <ul className="flex flex-col gap-2">
                             {plan.benefits.map((b, i) => (
                               <li key={i} className="flex items-start gap-2 text-[11px] font-semibold text-slate-600">
                                 <Check className="w-3 h-3 text-green-500 flex-shrink-0" /> <span>{b}</span>
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
    );
  }

  // Initial Calculator Form (Matches App Design System)
  return (
    <div className="bg-white rounded-[32px] p-6 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 max-w-4xl mx-auto my-10 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/4"></div>
      <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-8 tracking-tight relative z-10">Health Insurance <span className="text-green-600">Calculator</span></h2>
      
      <form onSubmit={handleCalculate} className="space-y-8 relative z-10">
        {/* Whom to insure */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Whom do you want the insurance for?</label>
          <div className="flex flex-wrap gap-3">
            {(['You', 'Couple', 'Family', 'Father', 'Mother'] as CoveredMember[]).map(member => (
              <button
                key={member}
                type="button"
                onClick={() => setCovered(member)}
                className={`px-6 py-2.5 rounded-xl border-2 transition-all font-black text-sm active:scale-95 ${covered === member ? 'border-green-500 text-green-600 bg-green-50' : 'border-slate-100 text-slate-600 bg-slate-50 hover:bg-slate-100 hover:border-slate-200'}`}
              >
                {member}
              </button>
            ))}
          </div>
        </div>

        {/* Ages block */}
        <div className="flex flex-wrap gap-4 pb-8 border-b border-slate-100">
          {(covered === 'You' || covered === 'Couple' || covered === 'Family') && (
            <div className="flex-1 min-w-[200px] flex flex-col gap-1.5 focus-within:text-green-600 transition-colors">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Enter Your Age</label>
              <input 
                type="number" 
                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all text-slate-900 font-bold" 
                value={ageYou}
                onChange={e => setAgeYou(e.target.value)}
              />
            </div>
          )}
          {(covered === 'Couple' || covered === 'Family') && (
            <div className="flex-1 min-w-[200px] flex flex-col gap-1.5 focus-within:text-green-600 transition-colors">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Enter Spouse Age</label>
              <input 
                type="number" 
                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all text-slate-900 font-bold" 
                value={ageSpouse}
                onChange={e => setAgeSpouse(e.target.value)}
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Location */}
          <div className="flex flex-col gap-1.5 focus-within:text-green-600 transition-colors">
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2.5">Location</label>
            <div className="max-w-xs relative">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest absolute top-2 left-4">Enter Area Pincode</label>
              <input 
                type="text" 
                className="w-full pt-6 pb-2 px-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all text-slate-900 font-bold" 
                value={pincode}
                onChange={e => setPincode(e.target.value)}
              />
            </div>
          </div>

          {/* Coverage */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Choose required coverage</label>
            <div className="flex flex-wrap gap-3">
              {CoverageOptions.map(opt => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setCoverage(opt)}
                  className={`px-5 py-3 rounded-xl border-2 transition-all flex items-center gap-2 font-black text-sm active:scale-95 ${coverage === opt ? 'border-green-500 bg-green-50 text-green-700' : 'border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-200'}`}
                >
                  {opt}
                  {coverage === opt && <div className="w-4 h-4 rounded-full bg-green-500 text-white flex items-center justify-center shadow-sm shadow-green-500/30"><Check className="w-3 h-3" /></div>}
                </button>
              ))}
              <div className="border border-slate-200 bg-slate-50 rounded-xl px-5 py-2 flex flex-col justify-center cursor-pointer min-w-[140px] hover:border-slate-300 transition-colors">
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Select Coverage</span>
                <span className="text-sm text-slate-800 font-black flex justify-between items-center mt-0.5">{coverage} <span className="text-slate-400 text-[10px]">▼</span></span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <button type="submit" className="w-full md:w-auto bg-green-600 text-white px-10 py-4 rounded-xl font-black text-xs uppercase tracking-[0.15em] shadow-xl shadow-green-600/20 hover:bg-slate-900 hover:shadow-slate-900/20 transition-all active:scale-95 flex items-center justify-center gap-2">
            Calculate Price <ArrowRight className="w-4 h-4" />
          </button>
          
          <p className="text-[10px] text-slate-500 font-bold max-w-sm text-center md:text-right">
            <span className="text-slate-800 uppercase tracking-widest block mb-1">Disclaimer</span> Actual Premium might vary basis your location, age and number of members
          </p>
        </div>
      </form>
    </div>
  );
};

export default HealthInsuCalculator;
