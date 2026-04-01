/* src/components/compare/CompareTable.tsx */
import React from 'react';
import '../../styles/globals.css';

const CompareTable: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'basic' | 'premium' | 'platinum'>('premium');

  const comparisonData = [
    { feature: 'Hospitalization Cover', basic: 'Limited', premium: 'Unlimited', platinum: 'Unlimited' },
    { feature: 'Day-care Procedures', basic: '100+', premium: 'All', platinum: 'All' },
    { feature: 'Cashless Network', basic: '5,000+', premium: '10,000+', platinum: 'Global' },
    { feature: 'AYUSH Treatment', basic: 'No', premium: 'Yes', platinum: 'Yes' },
    { feature: 'Air Ambulance', basic: 'No', premium: 'Optional', platinum: 'Complementary' },
    { feature: 'Maternity Benefit', basic: 'No', premium: '₹2L Cover', platinum: '₹5L Cover' },
  ];

  const plans = [
    { id: 'basic', name: 'Basic Plan', color: 'slate' },
    { id: 'premium', name: 'Premium Plan', color: 'blue' },
    { id: 'platinum', name: 'Platinum Plan', color: 'purple' },
  ] as const;

  return (
    <div className="w-full">
      {/* Mobile View: Tabbed Layout */}
      <div className="block md:hidden">
        <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-6 shadow-inner">
          {plans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setActiveTab(plan.id)}
              className={`flex-1 py-3 text-xs font-black rounded-xl transition-all uppercase tracking-widest ${
                activeTab === plan.id 
                  ? 'bg-white text-blue-600 shadow-md scale-[1.02]' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {plan.name.split(' ')[0]}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-[32px] border border-slate-100 shadow-2xl p-6 relative overflow-hidden">
          {activeTab === 'premium' && (
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-[9px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-bl-2xl shadow-lg z-10">Best Match</div>
          )}
          
          <div className="mb-8">
            <h3 className={`text-2xl font-black mb-1 ${activeTab === 'premium' ? 'text-blue-600' : 'text-slate-900'}`}>
              {plans.find(p => p.id === activeTab)?.name}
            </h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">At-a-glance coverage details</p>
          </div>

          <div className="space-y-4">
            {comparisonData.map((row) => (
              <div key={row.feature} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                <span className="text-xs font-bold text-slate-500">{row.feature}</span>
                <span className={`text-sm font-black ${activeTab === 'premium' ? 'text-blue-600' : 'text-slate-900'}`}>
                  {activeTab === 'basic' ? row.basic : activeTab === 'premium' ? row.premium : row.platinum}
                </span>
              </div>
            ))}
          </div>

          <button className={`w-full mt-8 py-4 rounded-2xl font-black text-sm transition-all shadow-xl active:scale-95 ${
            activeTab === 'premium' ? 'bg-blue-600 text-white shadow-blue-500/30' : 'bg-slate-900 text-white shadow-slate-900/30'
          }`}>
            Get Started with {plans.find(p => p.id === activeTab)?.name.split(' ')[0]}
          </button>
        </div>
      </div>

      {/* Desktop View: Original Table */}
      <div className="hidden md:block overflow-x-auto rounded-[32px] border border-slate-100 shadow-2xl bg-white bg-clip-border">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-8 py-8 font-black text-slate-900 border-r border-slate-200 text-xs uppercase tracking-widest bg-slate-50">Plan Features</th>
              <th className="px-8 py-8 font-black text-slate-900 text-sm">Basic Plan</th>
              <th className="px-8 py-8 font-black text-blue-600 bg-blue-50 relative text-sm">
                Premium Plan
                <span className="absolute top-0 right-0 bg-blue-600 text-white text-[9px] uppercase tracking-[0.2em] px-4 py-2 rounded-bl-2xl font-black shadow-lg shadow-blue-600/20">Best Choice</span>
              </th>
              <th className="px-8 py-8 font-black text-slate-900 text-sm">Platinum Plan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {comparisonData.map((row) => (
              <tr key={row.feature} className="hover:bg-slate-50 transition-colors group">
                <td className="px-8 py-6 font-bold text-slate-700 bg-slate-50 border-r border-slate-200 text-sm">
                  {row.feature}
                </td>
                <td className="px-8 py-6 text-slate-600 font-medium">{row.basic}</td>
                <td className="px-8 py-6 text-blue-600 font-black bg-blue-50/20">{row.premium}</td>
                <td className="px-8 py-6 text-slate-600 font-medium">{row.platinum}</td>
              </tr>
            ))}
            <tr className="bg-slate-50/30">
              <td className="px-8 py-10 border-r border-slate-200"></td>
              <td className="px-8 py-10">
                <button className="text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-blue-600 transition-colors">Choose Basic</button>
              </td>
              <td className="px-8 py-10 bg-blue-50/50">
                <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 shadow-xl shadow-blue-500/30 w-full transition-all active:scale-95">Start Premium</button>
              </td>
              <td className="px-8 py-10">
                <button className="text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-blue-600 transition-colors">Explore Platinum</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompareTable;
