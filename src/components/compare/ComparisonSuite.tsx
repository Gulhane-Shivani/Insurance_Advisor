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
    <div className="flex flex-col gap-10">
      {/* Filters Hub */}
      <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-wrap items-center gap-10">
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
      <div className="grid grid-cols-1 gap-6">
        {filteredPlans.length > 0 ? (
          filteredPlans.map((plan) => (
            <div key={plan.id} className="bg-white rounded-[40px] border border-slate-100 shadow-xl hover:shadow-2xl hover:border-blue-200 transition-all p-8 flex flex-col lg:flex-row items-center justify-between gap-10 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/30 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-blue-100/50 transition-colors"></div>
              
              <div className="flex items-center gap-10 w-full lg:w-1/3">
                <div className="w-20 h-20 rounded-2xl bg-slate-50 flex items-center justify-center p-3 border border-slate-100 shadow-sm overflow-hidden flex-shrink-0">
                  <img src={plan.carrierLogo} alt={plan.carrierName} className="w-full h-full object-contain" />
                </div>
                <div>
                   <h3 className="text-2xl font-black text-slate-900 mb-1">{plan.planName}</h3>
                   <div className="flex items-center gap-3">
                     <span className="text-sm font-bold text-slate-500">{plan.carrierName}</span>
                     <span className="px-2 py-0.5 rounded-lg bg-yellow-50 text-yellow-600 text-[10px] font-bold uppercase tracking-tighter">⭐ {plan.rating}</span>
                   </div>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-10 flex-1">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Coverage</p>
                  <p className="text-lg font-black text-slate-900">{plan.coverageAmount}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Benefits</p>
                  <ul className="flex flex-col gap-1">
                    {plan.benefits.slice(0, 2).map((b, i) => (
                      <li key={i} className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="hidden lg:block">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Payment</p>
                   <p className="text-lg font-black text-slate-900">Monthly</p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-3 w-full lg:w-fit min-w-[180px]">
                <div className="text-right">
                   <p className="text-3xl font-black text-blue-600">₹{plan.monthlyPrice}<span className="text-sm text-slate-400 font-normal">/mo</span></p>
                   <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest">Incl. 18% GST</p>
                </div>
                <button className="w-full bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-600 transition-colors shadow-lg active:scale-95">
                  Buy Now →
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
