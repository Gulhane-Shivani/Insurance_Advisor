/* src/components/compare/ComparisonSuite.tsx */
import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { 
  Check, 
  Star, 
  X, 
  Search, 
  Zap, 
  ClipboardList, 
  ShieldCheck, 
  ArrowRight,
  Activity,
  Car,
  Briefcase,
  Heart
} from 'lucide-react';
import { insurancePlans, carriers } from '../../data/carriers';
import '../../styles/globals.css';
interface ComparisonSuiteProps {
  defaultCategory?: 'all' | 'life' | 'health' | 'car' | 'business';
  hideCategoryFilter?: boolean;
}

const ComparisonSuite: React.FC<ComparisonSuiteProps> = ({ 
  defaultCategory = 'all', 
  hideCategoryFilter = false 
}) => {
  const [filterType, setFilterType] = useState<'all' | 'life' | 'health' | 'car' | 'business'>(defaultCategory);
  const [maxPrice, setMaxPrice] = useState<number>(3000);
  const [selectedCarrier, setSelectedCarrier] = useState<string>('all');
  const [viewingPlan, setViewingPlan] = useState<typeof insurancePlans[0] | null>(null);
  const [selectedComparePlans, setSelectedComparePlans] = useState<typeof insurancePlans[0][]>([]);
  const [showCompareTable, setShowCompareTable] = useState(false);

  const filteredPlans = useMemo(() => {
    return insurancePlans.filter((plan) => {
      const typeMatch = filterType === 'all' || plan.type === filterType;
      const priceMatch = plan.monthlyPrice <= maxPrice;
      const carrierMatch = selectedCarrier === 'all' || plan.carrierId === selectedCarrier;
      return typeMatch && priceMatch && carrierMatch;
    });
  }, [filterType, maxPrice, selectedCarrier]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      const target = e.target as HTMLImageElement;
      // If the current is a google link that failed, we fallback to clearbit.
      if (target.src.includes('google.com')) {
          const domain = target.src.split('domain=')[1]?.split('&')[0];
          if(domain) target.src = `https://logo.clearbit.com/${domain}`;
      } else if (target.src.includes('clearbit.com')) {
          // If clearbit failed, fallback to google
          const domain = target.src.split('/').pop();
          if(domain) target.src = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
      }
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        {/* Filters Hub */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/50 flex flex-wrap items-center gap-6">
          {!hideCategoryFilter && (
            <div className="flex flex-col gap-3 min-w-[200px]">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Insurance Category</label>
              <select 
                className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
              >
                <option value="all">All Categories</option>
                <option value="life">Life Insurance</option>
                <option value="health">Health Insurance</option>
                <option value="car">Car Insurance</option>
                <option value="business">Business Insurance</option>
              </select>
            </div>
          )}

          <div className="flex flex-col gap-3 min-w-[200px]">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Provider</label>
            <select 
              className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20"
              value={selectedCarrier}
              onChange={(e) => setSelectedCarrier(e.target.value)}
            >
              <option value="all">All Carriers</option>
              {carriers.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-3 flex-1 min-w-[240px]">
            <div className="flex justify-between items-center">
               <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Max Monthly Budget</label>
               <span className="font-bold text-blue-600">₹{maxPrice}</span>
            </div>
            <input 
              type="range" 
              min="500" 
              max="5000" 
              step="100" 
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-blue-600 h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPlans.length > 0 ? (
            filteredPlans.map((plan) => (
              <div key={plan.id} className="bg-white rounded-[24px] border border-slate-100 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all p-4 flex flex-col gap-3 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/30 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-blue-100/40 transition-colors"></div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center p-1.5 border border-slate-100 shadow-sm overflow-hidden flex-shrink-0">
                    <img 
                      src={plan.carrierLogo} 
                      alt={plan.carrierName} 
                      className="w-full h-full object-contain" 
                      onError={handleImageError}
                    />
                  </div>
                  <div className="flex-1">
                     <h3 className="text-base font-black text-slate-900 line-clamp-1">{plan.planName}</h3>
                     <div className="flex items-center gap-2">
                       <span className="text-[10px] font-bold text-slate-500">{plan.carrierName}</span>
                       <span className="px-1.5 py-0.5 rounded-md bg-yellow-50 text-yellow-600 text-[8px] font-bold uppercase tracking-tighter flex items-center gap-0.5">
                         <Star className="w-2 h-2 fill-yellow-600" /> {plan.rating}
                       </span>
                     </div>
                  </div>
                  <div className="text-right">
                     <p className="text-lg font-black text-blue-600">₹{plan.monthlyPrice}</p>
                     <p className="text-[7px] font-bold text-slate-400 uppercase tracking-widest">per month</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 py-3 border-y border-slate-50">
                  <div>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">Coverage</p>
                    <p className="text-xs font-black text-slate-900">{plan.coverageAmount}</p>
                  </div>
                  <div>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">Top Benefits</p>
                    <ul className="flex flex-col gap-0.5">
                      {plan.benefits.slice(0, 2).map((b, i) => (
                        <li key={i} className="text-[9px] font-semibold text-slate-600 flex items-center gap-1">
                          <Check className="w-2 h-2 text-green-500" />
                          <span className="line-clamp-1">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 mt-1 pt-3 border-t border-slate-50">
                  <label className="flex items-center gap-1.5 cursor-pointer group/checkbox flex-1">
                    <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-colors ${selectedComparePlans.find(p => p.id === plan.id) ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white group-hover/checkbox:border-blue-400'}`}>
                      {selectedComparePlans.find(p => p.id === plan.id) && <Check className="w-2.5 h-2.5" />}
                    </div>
                    <span className={`text-[9px] font-black uppercase tracking-wider transition-colors ${selectedComparePlans.find(p => p.id === plan.id) ? 'text-blue-600' : 'text-slate-400 group-hover/checkbox:text-slate-600'}`}>Compare</span>
                    <input 
                      type="checkbox"
                      className="hidden"
                      checked={!!selectedComparePlans.find(p => p.id === plan.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                           if (selectedComparePlans.length < 3) setSelectedComparePlans([...selectedComparePlans, plan]);
                           else alert("You can compare up to 3 plans at a time.");
                        } else {
                           setSelectedComparePlans(selectedComparePlans.filter(p => p.id !== plan.id));
                        }
                      }}
                    />
                  </label>
                  
                  <div className="flex flex-1 items-center justify-end gap-3">
                    <button 
                      onClick={() => setViewingPlan(plan)}
                      className="flex items-center justify-center gap-1 bg-slate-900 text-white px-3 py-1.5 rounded-lg font-bold text-[9px] uppercase hover:bg-blue-600 transition-colors shadow-md active:scale-95 whitespace-nowrap"
                    >
                      View Plan <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 flex flex-col items-center justify-center text-center px-10 border-2 border-dashed border-slate-200 rounded-[40px]">
               <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-6">
                 <Search className="w-8 h-8 text-slate-300" />
               </div>
               <h3 className="text-2xl font-bold text-slate-900 mb-2">No plans found!</h3>
               <p className="text-slate-500 max-w-sm">Adjust your filters or price range to find better matches for your needs.</p>
            </div>
          )}
        </div>
      </div>

      {/* Compare Action Bar */}
      {selectedComparePlans.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white pl-4 pr-2 py-2 rounded-full shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] flex items-center gap-4 z-40 border border-white/10 animate-fade-in whitespace-nowrap">
           <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {selectedComparePlans.map((p, i) => (
                  <div key={p.id} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-white flex items-center justify-center overflow-hidden z-20" style={{zIndex: 10 - i}}>
                    <img src={p.carrierLogo} className="w-full h-full object-contain p-1" />
                  </div>
                ))}
              </div>
              <div>
                 <p className="text-xs font-bold leading-tight">{selectedComparePlans.length} Plans Selected</p>
              </div>
           </div>
           <div className="flex items-center gap-2 border-l border-white/20 pl-4">
              <button 
                onClick={() => setShowCompareTable(true)}
                className="bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors shadow-lg shadow-blue-500/20"
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

      {/* Plan Details Modal - Portal to Body for correct stacking over fixed navbar */}
      {viewingPlan && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-[32px] shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setViewingPlan(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8 md:p-10 pt-16 md:pt-16">
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 p-2 flex items-center justify-center shadow-sm">
                    <img 
                      src={viewingPlan.carrierLogo} 
                      alt={viewingPlan.carrierName} 
                      className="max-h-full max-w-full object-contain" 
                      onError={handleImageError}
                    />
                  </div>
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest mb-2">
                      {viewingPlan.type === 'health' && <Activity className="w-3 h-3" />}
                      {viewingPlan.type === 'car' && <Car className="w-3 h-3" />}
                      {viewingPlan.type === 'life' && <Heart className="w-3 h-3" />}
                      {viewingPlan.type === 'business' && <Briefcase className="w-3 h-3" />}
                      {viewingPlan.type} Insurance
                    </span>
                    <h2 className="text-2xl font-black text-slate-900">{viewingPlan.planName}</h2>
                    <p className="flex items-center gap-1.5 text-slate-500 font-bold">
                      {viewingPlan.carrierName} • <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" /> {viewingPlan.rating}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-blue-600">₹{viewingPlan.monthlyPrice}</p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">per month</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <h4 className="text-sm font-black text-slate-900 mb-4 flex items-center gap-2">
                     <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shadow-sm shadow-blue-100/50">
                       <ClipboardList className="w-4 h-4" />
                     </span>
                     Plan Benefits
                  </h4>
                  <ul className="space-y-3">
                    {viewingPlan.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3" />
                        </span>
                        <span className="text-sm font-semibold text-slate-600">{benefit}</span>
                      </li>
                    ))}
                    <li className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3" />
                        </span>
                        <span className="text-sm font-semibold text-slate-600">Paperless Policy Issuance</span>
                    </li>
                  </ul>

                  <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Coverage</p>
                      <p className="text-2xl font-black text-slate-900">{viewingPlan.coverageAmount}</p>
                    </div>
                    <ShieldCheck className="w-8 h-8 text-blue-600 opacity-20" />
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-black text-slate-900 mb-4 flex items-center gap-2">
                     <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center shadow-sm shadow-orange-100/50">
                       <Zap className="w-4 h-4" />
                     </span>
                     How to Buy
                  </h4>
                  <div className="space-y-6 relative">
                    <div className="absolute left-3 top-3 bottom-3 w-0.5 bg-slate-100"></div>
                    
                    <div className="relative flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-white border-2 border-slate-200 text-slate-400 text-[10px] font-bold flex items-center justify-center z-10">1</div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm">Review & Confirm</p>
                        <p className="text-xs text-slate-500 font-medium">Confirm the plan details and coverage options.</p>
                      </div>
                    </div>

                    <div className="relative flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-white border-2 border-slate-200 text-slate-400 text-[10px] font-bold flex items-center justify-center z-10">2</div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm">Quick Details</p>
                        <p className="text-xs text-slate-500 font-medium">Enter basic info like Age, Location & Health status.</p>
                      </div>
                    </div>

                    <div className="relative flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-white border-2 border-slate-200 text-slate-400 text-[10px] font-bold flex items-center justify-center z-10">3</div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm">Instant Payment</p>
                        <p className="text-xs text-slate-500 font-medium">Pay securely via UPI, Cards, or Net Banking.</p>
                      </div>
                    </div>

                    <div className="relative flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-blue-100 border-2 border-blue-500 text-blue-600 text-[10px] font-bold flex items-center justify-center z-10 shadow-sm shadow-blue-200">4</div>
                      <div>
                        <p className="font-bold text-blue-600 text-sm">Policy Delivered</p>
                        <p className="text-xs text-slate-500 font-medium">Get your policy copy instantly via email/SMS.</p>
                      </div>
                    </div>
                  </div>

                  <button className="w-full mt-10 bg-blue-600 text-white py-4 rounded-2xl font-black text-sm hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 active:scale-95 group flex items-center justify-center gap-2">
                    Proceed to Buy Now 
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
               <p className="text-[10px] font-bold text-slate-400">Need help? Call our advisors at <span className="text-slate-900">1800-INSURE-NOW</span></p>
            </div>
          </div>
        </div>,
        document.body
      )}
      {showCompareTable && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
           <div className="bg-white w-full max-w-5xl max-h-[90vh] flex flex-col rounded-[32px] shadow-2xl relative animate-in zoom-in-95 duration-200">
             <div className="bg-white border-b border-slate-100 p-6 flex flex-shrink-0 items-center justify-between z-10 rounded-t-[32px]">
               <h2 className="text-xl md:text-2xl font-black text-slate-900 flex items-center gap-2">
                 <Zap className="w-6 h-6 text-blue-600" />
                 Plan Comparison
               </h2>
               <button 
                 onClick={() => setShowCompareTable(false)}
                 className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
               >
                 <X className="w-5 h-5" />
               </button>
             </div>
             
             <div className="p-6 md:p-8 flex-1 overflow-auto">
               <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden min-w-[700px]">
                 <table className="w-full text-left border-collapse">
                   <thead>
                     <tr>
                       <th className="p-5 border-b-2 border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/50 w-1/4">Features</th>
                       {selectedComparePlans.map(plan => (
                         <th key={plan.id} className="p-5 border-b-2 border-slate-100 text-center relative w-1/4">
                           <button 
                             onClick={() => setSelectedComparePlans(selectedComparePlans.filter(p => p.id !== plan.id))}
                             className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                           >
                              <X className="w-3.5 h-3.5" />
                           </button>
                           <div className="h-10 flex items-center justify-center mb-3">
                             <img src={plan.carrierLogo} className="max-h-full max-w-full object-contain" alt={plan.carrierName}/>
                           </div>
                           <h3 className="font-black text-slate-900 text-sm">{plan.planName}</h3>
                           <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{plan.carrierName}</p>
                         </th>
                       ))}
                       {Array.from({length: Math.max(0, 3 - selectedComparePlans.length)}).map((_, i) => (
                         <th key={`empty-${i}`} className="p-5 border-b-2 border-slate-100 text-center w-1/4 opacity-50">
                           <div className="w-12 h-12 rounded-xl border-2 border-dashed border-slate-300 mx-auto mb-3 flex items-center justify-center text-slate-400"><Search className="w-5 h-5" /></div>
                           <p className="text-xs font-bold text-slate-400">Add Plan</p>
                         </th>
                       ))}
                     </tr>
                   </thead>
                   <tbody>
                     <tr className="group">
                       <td className="p-5 border-b border-slate-100 font-bold text-sm text-slate-700 bg-slate-50/50 group-hover:bg-blue-50/30 transition-colors">Monthly Premium</td>
                       {selectedComparePlans.map(plan => (
                         <td key={plan.id} className="p-5 border-b border-slate-100 text-center group-hover:bg-blue-50/10 transition-colors">
                           <span className="text-2xl font-black text-blue-600">₹{plan.monthlyPrice}</span>
                         </td>
                       ))}
                       {Array.from({length: Math.max(0, 3 - selectedComparePlans.length)}).map((_, i) => (
                         <td key={`empty-row1-${i}`} className="p-5 border-b border-slate-100 text-center"></td>
                       ))}
                     </tr>
                     <tr className="group">
                       <td className="p-5 border-b border-slate-100 font-bold text-sm text-slate-700 bg-slate-50/50 group-hover:bg-blue-50/30 transition-colors">Total Coverage</td>
                       {selectedComparePlans.map(plan => (
                         <td key={plan.id} className="p-5 border-b border-slate-100 text-center group-hover:bg-blue-50/10 transition-colors">
                           <span className="font-black text-slate-900">{plan.coverageAmount}</span>
                         </td>
                       ))}
                       {Array.from({length: Math.max(0, 3 - selectedComparePlans.length)}).map((_, i) => (
                         <td key={`empty-row2-${i}`} className="p-5 border-b border-slate-100 text-center"></td>
                       ))}
                     </tr>
                     <tr className="group">
                       <td className="p-5 border-b border-slate-100 font-bold text-sm text-slate-700 bg-slate-50/50 group-hover:bg-blue-50/30 transition-colors">Claim Rating</td>
                       {selectedComparePlans.map(plan => (
                         <td key={plan.id} className="p-5 border-b border-slate-100 text-center group-hover:bg-blue-50/10 transition-colors">
                           <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-yellow-50 text-yellow-700 font-bold text-sm">
                             <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" /> {plan.rating}/5
                           </span>
                         </td>
                       ))}
                       {Array.from({length: Math.max(0, 3 - selectedComparePlans.length)}).map((_, i) => (
                         <td key={`empty-row3-${i}`} className="p-5 border-b border-slate-100 text-center"></td>
                       ))}
                     </tr>
                     <tr className="group">
                       <td className="p-5 border-b border-slate-100 font-bold text-sm text-slate-700 bg-slate-50/50 group-hover:bg-blue-50/30 transition-colors">Key Features</td>
                       {selectedComparePlans.map(plan => (
                         <td key={plan.id} className="p-5 border-b border-slate-100 align-top group-hover:bg-blue-50/10 transition-colors">
                           <ul className="flex flex-col gap-2">
                             {plan.benefits.map((b, i) => (
                               <li key={i} className="flex items-start gap-2 text-xs font-semibold text-slate-600">
                                 <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                                 <span>{b}</span>
                               </li>
                             ))}
                           </ul>
                         </td>
                       ))}
                       {Array.from({length: Math.max(0, 3 - selectedComparePlans.length)}).map((_, i) => (
                         <td key={`empty-row4-${i}`} className="p-5 border-b border-slate-100 text-center"></td>
                       ))}
                     </tr>
                     <tr>
                       <td className="p-5 bg-slate-50/50 rounded-bl-xl"></td>
                       {selectedComparePlans.map(plan => (
                         <td key={plan.id} className="p-5 text-center">
                           <button 
                             onClick={() => { setShowCompareTable(false); setViewingPlan(plan); }}
                             className="w-full bg-slate-900 text-white px-4 py-3 rounded-xl font-bold text-xs hover:bg-blue-600 transition-colors shadow-lg active:scale-95"
                           >
                             View Full Details
                           </button>
                         </td>
                       ))}
                       {Array.from({length: Math.max(0, 3 - selectedComparePlans.length)}).map((_, i) => (
                         <td key={`empty-row5-${i}`} className="p-5 text-center"></td>
                       ))}
                     </tr>
                   </tbody>
                 </table>
               </div>
               
               {selectedComparePlans.length === 0 && (
                 <div className="text-center py-20 px-6 border-2 border-dashed border-slate-200 rounded-3xl mt-8">
                   <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-4">
                     <Heart className="w-8 h-8 text-slate-300" />
                   </div>
                   <h3 className="text-xl font-black text-slate-900 mb-2">No plans selected</h3>
                   <p className="text-slate-500 font-medium mb-6">Go back and select up to 3 plans to compare their benefits.</p>
                   <button 
                     onClick={() => setShowCompareTable(false)} 
                     className="bg-slate-900 hover:bg-slate-800 transition-colors text-white px-8 py-3 rounded-xl font-bold text-sm"
                   >
                     Back to Plans List
                   </button>
                 </div>
               )}
             </div>
           </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default ComparisonSuite;
