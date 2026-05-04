/* src/app/agent_dashboard/sections/ActivityLog.tsx */
import React, { useState, useMemo } from 'react';
import { 
  Phone, Mail, Users, FileText, CheckCircle2,
  Zap, Search, Filter, ArrowRight, X, Check, ChevronDown
} from 'lucide-react';
import { Card } from '../../../components/agent/UI';

const initialActivities = [
  { id: 1, type: 'Call', customer: 'Rajesh Kumar', description: 'Discussed Term Life renewal and premium adjustment.', time: '10:30 AM', date: 'Today', duration: '12m', details: 'Customer expressed concerns about the 15% premium hike. Explained the new coverage benefits added this year. Rajesh agreed to think about it and requested a follow-up call tomorrow.' },
  { id: 2, type: 'Email', customer: 'Anjali Sharma', description: 'Sent personalized quote for Silver Shield Plus plan.', time: '09:15 AM', date: 'Today', duration: 'N/A', details: 'Generated 3 variations of the Silver Shield Plus plan with different deductible options. Sent via email with a tracking link. Customer opened the email at 10:05 AM.' },
  { id: 3, type: 'Meeting', customer: 'Sunil Gupta', description: 'Physical meeting at residence for car collection survey.', time: '04:30 PM', date: 'Yesterday', duration: '1h 15m', details: 'Survey completed successfully. Noted minor scratches on the rear bumper. Took 15 photographs for the record. Sunil provided all necessary original documents for scanning.' },
  { id: 4, type: 'Quote', customer: 'Priya Sharma', description: 'Generated comparison quotes for Car Insurance.', time: '11:00 AM', date: 'Yesterday', duration: 'N/A', details: 'Compared Tata AIG, ICICI Lombard, and HDFC Ergo. Priya prefers the ICICI Lombard quote due to cashless garage proximity. Awaiting final confirmation.' },
  { id: 5, type: 'Task', customer: 'Suresh Gupta', description: 'Followed up on KYC document pending status.', time: '02:45 PM', date: '2 days ago', duration: '5m', details: 'Called Suresh regarding the rejected PAN card scan. The previous scan was blurry. He promised to upload a clear picture via the customer portal by evening.' },
];

const ActivityLog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [expandedActivity, setExpandedActivity] = useState<number | null>(null);

  const filteredActivities = useMemo(() => {
    return initialActivities.filter(act => {
      const matchesSearch = act.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          act.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'All' || act.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [searchTerm, filterType]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'Call': return <Phone size={18} className="text-blue-600" />;
      case 'Email': return <Mail size={18} className="text-amber-600" />;
      case 'Meeting': return <Users size={18} className="text-indigo-600" />;
      case 'Quote': return <Zap size={18} className="text-amber-500" />;
      case 'Task': return <CheckCircle2 size={18} className="text-emerald-600" />;
      default: return <FileText size={18} className="text-slate-400" />;
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case 'Call': return 'bg-blue-50 border-blue-100';
      case 'Email': return 'bg-amber-50 border-amber-100';
      case 'Meeting': return 'bg-indigo-50 border-indigo-100';
      case 'Quote': return 'bg-amber-50 border-amber-100';
      case 'Task': return 'bg-emerald-50 border-emerald-100';
      default: return 'bg-slate-50 border-slate-100';
    }
  };

  return (
    <div className="space-y-8 pb-10 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
        <div>
          <h3 className="text-xl font-black text-slate-800 tracking-tight">Sales Activity Audit</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Timeline of all interactions with your book of business</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
           <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
              <input 
                type="text" 
                placeholder="Search activities..." 
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-medium outline-none focus:bg-white focus:border-indigo-500 transition-all shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
           
           <div className="relative">
              <button 
                onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all border shadow-sm ${filterType !== 'All' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 border-slate-100 hover:bg-slate-50'}`}
              >
                 <Filter size={14} /> {filterType === 'All' ? 'Filter' : filterType}
              </button>

              {isFilterMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                   {['All', 'Call', 'Email', 'Meeting', 'Quote', 'Task'].map(type => (
                     <button 
                       key={type}
                       onClick={() => { setFilterType(type); setIsFilterMenuOpen(false); }}
                       className={`w-full px-4 py-2 text-[10px] font-black uppercase tracking-widest text-left flex items-center justify-between hover:bg-slate-50 transition-colors ${filterType === type ? 'text-indigo-600 bg-indigo-50' : 'text-slate-500'}`}
                     >
                       {type}
                       {filterType === type && <Check size={12} />}
                     </button>
                   ))}
                </div>
              )}
           </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="relative">
        <div className="absolute left-[27px] top-4 bottom-0 w-0.5 bg-slate-100 -z-0"></div>

        <div className="space-y-10">
          {filteredActivities.map((activity) => (
            <div key={activity.id} className="flex gap-8 group relative z-10">
              <div className="hidden lg:block w-24 text-right pt-4">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{activity.date}</p>
                 <p className="text-[11px] font-bold text-slate-300 mt-1">{activity.time}</p>
              </div>

              <div className={`flex-shrink-0 w-14 h-14 rounded-[22px] border-4 border-white ${getIconBg(activity.type)} flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 duration-300`}>
                {getIcon(activity.type)}
              </div>

              <Card className="flex-1 border-none shadow-xl shadow-slate-200/40 overflow-hidden hover:translate-x-2 transition-all duration-300">
                <div className="p-6">
                   <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <span className="px-2 py-0.5 bg-white border border-slate-100 text-[9px] font-black text-slate-500 uppercase tracking-widest rounded shadow-sm">{activity.type}</span>
                          <span className="text-xs font-black text-indigo-600 flex items-center gap-1.5 bg-indigo-50 px-3 py-1 rounded-full cursor-default border border-indigo-100/50">
                            <Users size={12} /> {activity.customer}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-800 leading-relaxed max-w-2xl">
                          {activity.description}
                        </h4>
                      </div>
                      
                      <div className="text-left md:text-right border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
                        <div className="flex flex-col gap-1">
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Duration</p>
                           <p className="text-xs font-black text-slate-700">{activity.duration}</p>
                        </div>
                        <button 
                          onClick={() => setExpandedActivity(expandedActivity === activity.id ? null : activity.id)}
                          className="text-[10px] font-black text-indigo-500 hover:text-indigo-700 flex items-center gap-1 transition-colors uppercase tracking-widest mt-4">
                          Activity Details <ChevronDown size={14} className={`transition-transform duration-300 ${expandedActivity === activity.id ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                   </div>
                   
                   {expandedActivity === activity.id && (
                     <div className="mt-4 pt-4 border-t border-slate-100 animate-in fade-in slide-in-from-top-2">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Detailed Notes</p>
                       <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-inner">
                         {activity.details}
                       </p>
                     </div>
                   )}
                </div>
              </Card>
            </div>
          ))}
          {filteredActivities.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
               <div className="w-20 h-20 rounded-[32px] bg-white border border-slate-100 flex items-center justify-center mb-6 shadow-sm">
                  <X size={40} className="text-slate-200" />
               </div>
               <p className="text-xs font-black uppercase tracking-widest">No activities found matching your criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;
