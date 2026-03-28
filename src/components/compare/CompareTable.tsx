/* src/components/compare/CompareTable.tsx */
import React from 'react';
import '../../styles/globals.css';

const CompareTable: React.FC = () => {
  const comparisonData = [
    { feature: 'Hospitalization Cover', basic: 'Limited', premium: 'Unlimited', platinum: 'Unlimited' },
    { feature: 'Day-care Procedures', basic: '100+', premium: 'All', platinum: 'All' },
    { feature: 'Cashless Network', basic: '5,000+', premium: '10,000+', platinum: 'Global' },
    { feature: 'AYUSH Treatment', basic: 'No', premium: 'Yes', platinum: 'Yes' },
    { feature: 'Air Ambulance', basic: 'No', premium: 'Optional', platinum: 'Complementary' },
    { feature: 'Maternity Benefit', basic: 'No', premium: '$2k Cover', platinum: '$5k Cover' },
  ];

  return (
    <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-2xl bg-white">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-8 py-8 font-bold text-slate-900 border-r border-slate-200">Plan Features</th>
            <th className="px-8 py-8 font-bold text-slate-900">Basic Plan</th>
            <th className="px-8 py-8 font-bold text-blue-600 bg-blue-50/50 relative">
              Premium Plan
              <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-bl-xl font-black">Best Choice</span>
            </th>
            <th className="px-8 py-8 font-bold text-slate-900">Platinum Plan</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {comparisonData.map((row) => (
            <tr key={row.feature} className="hover:bg-slate-50/50 transition-colors group">
              <td className="px-8 py-6 font-semibold text-slate-700 bg-slate-50/20 border-r border-slate-200 group-hover:bg-slate-50">
                {row.feature}
              </td>
              <td className="px-8 py-6 text-slate-500">{row.basic}</td>
              <td className="px-8 py-6 text-slate-900 font-medium bg-blue-50/20">{row.premium}</td>
              <td className="px-8 py-6 text-slate-500">{row.platinum}</td>
            </tr>
          ))}
          <tr className="bg-slate-50/50">
            <td className="px-8 py-10 border-r border-slate-200"></td>
            <td className="px-8 py-10">
              <button className="text-blue-600 font-bold hover:underline">Choose Basic</button>
            </td>
            <td className="px-8 py-10 bg-blue-50/30">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/30 w-full transition-all">Start Premium</button>
            </td>
            <td className="px-8 py-10">
              <button className="text-blue-600 font-bold hover:underline">Explore Platinum</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CompareTable;
