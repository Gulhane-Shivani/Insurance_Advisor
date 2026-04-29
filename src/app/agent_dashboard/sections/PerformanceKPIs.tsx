/* src/app/agent_dashboard/sections/PerformanceKPIs.tsx */
import React from 'react';
import { FileCheck, RefreshCw, DollarSign, Target } from 'lucide-react';
import { Card } from '../../../components/agent/UI';

const PerformanceKPIs: React.FC = () => {
  return (
    <div className="space-y-8 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'New Policies', value: '24', icon: FileCheck, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Renewals', value: '85%', icon: RefreshCw, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Commission', value: '₹42,500', icon: DollarSign, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Conversion', value: '18.5%', icon: Target, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((kpi, i) => (
          <Card key={i} className="p-6">
            <div className={`w-12 h-12 rounded-2xl ${kpi.bg} ${kpi.color} flex items-center justify-center mb-4`}><kpi.icon size={24} /></div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{kpi.label}</p>
            <h3 className="text-2xl font-black text-slate-800">{kpi.value}</h3>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PerformanceKPIs;
