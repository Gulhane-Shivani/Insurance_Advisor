/* src/components/compare/ComparisonSuite.tsx */
import React, { useState, useMemo } from 'react';
import { insurancePlans, carriers } from '../../data/carriers';
import '../../styles/globals.css';

const ComparisonSuite: React.FC = () => {
  const [filterType, setFilterType] = useState<'all' | 'life' | 'health' | 'car' | 'business'>('all');
  const [maxPrice, setMaxPrice] = useState<number>(3000);
  const [selectedCarrier, setSelectedCarrier] = useState<string>('all');

  const filteredPlans = useMemo(() => {
    return insurancePlans.filter((plan) => {
      const typeMatch = filterType === 'all' || plan.type === filterType;
      const priceMatch = plan.monthlyPrice <= maxPrice;
      const carrierMatch = selectedCarrier === 'all' || plan.carrierId === selectedCarrier;
      return typeMatch && priceMatch && carrierMatch;
    });
  }, [filterType, maxPrice, selectedCarrier]);

  return (
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
                <button className="flex-1 max-w-[140px] bg-slate-900 text-white px-4 py-2.5 rounded-xl font-bold text-xs hover:bg-blue-600 transition-colors shadow-md active:scale-95">
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
  );
};

export default ComparisonSuite;
