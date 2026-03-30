/* src/components/compare/ComparisonSuite.tsx */
import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { insurancePlans, carriers } from '../../data/carriers';
import '../../styles/globals.css';

const ComparisonSuite: React.FC = () => {
  const [filterType, setFilterType] = useState<'all' | 'life' | 'health' | 'car' | 'business'>('all');
  const [maxPrice, setMaxPrice] = useState<number>(3000);
  const [selectedCarrier, setSelectedCarrier] = useState<string>('all');
  const [viewingPlan, setViewingPlan] = useState<typeof insurancePlans[0] | null>(null);

  const filteredPlans = useMemo(() => {
    return insurancePlans.filter((plan) => {
      const typeMatch = filterType === 'all' || plan.type === filterType;
      const priceMatch = plan.monthlyPrice <= maxPrice;
      const carrierMatch = selectedCarrier === 'all' || plan.carrierId === selectedCarrier;
      return typeMatch && priceMatch && carrierMatch;
    });
  }, [filterType, maxPrice, selectedCarrier]);

  return (
    <>
      <div className="flex flex-col gap-6">
        {/* Filters Hub */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/50 flex flex-wrap items-center gap-6">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPlans.length > 0 ? (
            filteredPlans.map((plan) => (
              <div key={plan.id} className="bg-white rounded-3xl border border-slate-100 shadow-md hover:shadow-xl hover:border-blue-200 transition-all p-5 flex flex-col gap-5 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/30 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-blue-100/40 transition-colors"></div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center p-1.5 border border-slate-100 shadow-sm overflow-hidden flex-shrink-0">
                    <img 
                      src={plan.carrierLogo} 
                      alt={plan.carrierName} 
                      className="w-full h-full object-contain" 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://www.google.com/s2/favicons?domain=${plan.carrierLogo.split('/').pop()}&sz=128`;
                      }}
                    />
                  </div>
                  <div className="flex-1">
                     <h3 className="text-lg font-black text-slate-900 line-clamp-1">{plan.planName}</h3>
                     <div className="flex items-center gap-2">
                       <span className="text-[10px] font-bold text-slate-500">{plan.carrierName}</span>
                       <span className="px-1.5 py-0.5 rounded-md bg-yellow-50 text-yellow-600 text-[8px] font-bold uppercase tracking-tighter">⭐ {plan.rating}</span>
                     </div>
                  </div>
                  <div className="text-right">
                     <p className="text-xl font-black text-blue-600">₹{plan.monthlyPrice}</p>
                     <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">per month</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50">
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Coverage</p>
                    <p className="text-sm font-black text-slate-900">{plan.coverageAmount}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Top Benefits</p>
                    <ul className="flex flex-col gap-0.5">
                      {plan.benefits.slice(0, 2).map((b, i) => (
                        <li key={i} className="text-[10px] font-semibold text-slate-600 flex items-center gap-1">
                          <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                          <span className="line-clamp-1">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Paperless Claim</span>
                  </div>
                  <button 
                    onClick={() => setViewingPlan(plan)}
                    className="flex-1 max-w-[140px] bg-slate-900 text-white px-4 py-2.5 rounded-xl font-bold text-xs hover:bg-blue-600 transition-colors shadow-md active:scale-95"
                  >
                    View Plan →
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 flex flex-col items-center justify-center text-center px-10 border-2 border-dashed border-slate-200 rounded-[40px]">
               <span className="text-6xl mb-6 grayscale opacity-30">🔍</span>
               <h3 className="text-2xl font-bold text-slate-900 mb-2">No plans found!</h3>
               <p className="text-slate-500 max-w-sm">Adjust your filters or price range to find better matches for your needs.</p>
            </div>
          )}
        </div>
      </div>

      {/* Plan Details Modal - Portal to Body for correct stacking over fixed navbar */}
      {viewingPlan && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-[32px] shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setViewingPlan(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors z-20"
            >
              ✕
            </button>

            <div className="p-8 md:p-10 pt-16 md:pt-16">
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 p-2 flex items-center justify-center shadow-sm">
                    <img src={viewingPlan.carrierLogo} alt={viewingPlan.carrierName} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest mb-2">
                      {viewingPlan.type} Insurance
                    </span>
                    <h2 className="text-2xl font-black text-slate-900">{viewingPlan.planName}</h2>
                    <p className="text-slate-500 font-bold">{viewingPlan.carrierName} • ⭐ {viewingPlan.rating}</p>
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
                     <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-xs text-center">📋</span>
                     Plan Benefits
                  </h4>
                  <ul className="space-y-3">
                    {viewingPlan.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="text-sm font-semibold text-slate-600">{benefit}</span>
                      </li>
                    ))}
                    <li className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="text-sm font-semibold text-slate-600">Paperless Policy Issuance</span>
                    </li>
                  </ul>

                  <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Coverage</p>
                    <p className="text-2xl font-black text-slate-900">{viewingPlan.coverageAmount}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-black text-slate-900 mb-4 flex items-center gap-2">
                     <span className="w-6 h-6 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center text-xs text-center">🚀</span>
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

                  <button className="w-full mt-10 bg-blue-600 text-white py-4 rounded-2xl font-black text-sm hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 active:scale-95 group">
                    Proceed to Buy Now 
                    <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
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
    </>
  );
};

export default ComparisonSuite;
