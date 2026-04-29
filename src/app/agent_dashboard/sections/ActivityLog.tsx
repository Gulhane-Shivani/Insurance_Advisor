/* src/app/agent_dashboard/sections/ActivityLog.tsx */
import React, { useState } from 'react';
import { 
  Phone, Mail, Users, FileText, CheckCircle2, 
  Search, Filter, ArrowRight, Zap
} from 'lucide-react';
import { Card, Button } from '../../../components/agent/UI';

const ActivityLog: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');

  const activities = [
    { type: 'Call', customer: 'Rajesh Kumar', description: 'Discussed Term Life renewal and premium adjustment.', time: '10:30 AM', date: 'Today', duration: '12m' },
    { type: 'Email', customer: 'Anjali Sharma', description: 'Sent personalized quote for Silver Shield Plus plan.', time: '09:15 AM', date: 'Today', duration: 'N/A' },
    { type: 'Meeting', customer: 'Sunil Gupta', description: 'Physical meeting at residence for car collection survey.', time: '04:30 PM', date: 'Yesterday', duration: '1h 15m' },
    { type: 'Quote', customer: 'Priya Sharma', description: 'Generated comparison quotes for Car Insurance.', time: '11:00 AM', date: 'Yesterday', duration: 'N/A' },
    { type: 'Task', customer: 'Suresh Gupta', description: 'Followed up on KYC document pending status.', time: '02:45 PM', date: '2 days ago', duration: '5m' },
  ];

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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-2">
        <div>
          <h3 className="text-xl font-black text-slate-800 tracking-tight">Sales Activity Audit</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Timeline of all interactions with your book of business</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
           <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
              <input type="text" placeholder="Search activities..." className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium outline-none focus:border-indigo-500 shadow-sm" />
           </div>
           <Button variant="outline" size="sm" icon={<Filter size={14} />}>Filter</Button>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="relative">
        <div className="absolute left-[27px] top-4 bottom-0 w-0.5 bg-slate-100 -z-0"></div>

        <div className="space-y-10">
          {activities.map((activity, idx) => (
            <div key={idx} className="flex gap-8 group relative z-10">
              <div className="hidden lg:block w-24 text-right pt-4">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{activity.date}</p>
                 <p className="text-[11px] font-bold text-slate-300 mt-1">{activity.time}</p>
              </div>

              <div className={`flex-shrink-0 w-14 h-14 rounded-[22px] border-4 border-white ${getIconBg(activity.type)} flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 duration-300`}>
                {getIcon(activity.type)}
              </div>

              <Card className="flex-1 border-none shadow-xl shadow-slate-200/50 overflow-hidden hover:translate-x-2 transition-all duration-300">
                <div className="p-6">
                   <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <span className="px-2 py-0.5 bg-white border border-slate-100 text-[9px] font-black text-slate-500 uppercase tracking-widest rounded shadow-sm">{activity.type}</span>
                          <span className="text-xs font-black text-indigo-600 flex items-center gap-1.5 bg-indigo-50 px-3 py-1 rounded-full">
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
                        <button className="text-[10px] font-black text-indigo-500 hover:text-indigo-700 flex items-center gap-1 transition-colors uppercase tracking-widest mt-4">
                          Activity Details <ArrowRight size={14} />
                        </button>
                      </div>
                   </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;
