import React from 'react';
import { 
  Mail, 
  MessageSquare, 
  Globe, 
  Plus, 
  Edit3, 
  Layout,
  ExternalLink,
  Settings
} from 'lucide-react';

const ContentCommunication: React.FC = () => {
  const campaigns = [
    { title: 'Renewal Reminder - May', type: 'Email', target: '452 Users', status: 'Draft', date: 'Next Week' },
    { title: 'New Health Plan Launch', type: 'SMS', target: '2.5k Users', status: 'Sent', date: '2 days ago' },
    { title: 'Feedback Survey', type: 'Email', target: '124 Users', status: 'Active', date: 'Ongoing' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Campaigns Panel */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-slate-800">Communication Hub</h3>
              <p className="text-xs text-slate-500 font-medium">Manage multi-channel campaigns and notifications</p>
            </div>
            <button className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100">
              <Plus className="w-3.5 h-3.5" /> New Campaign
            </button>
          </div>
          
          <div className="p-6 space-y-3.5">
            {campaigns.map((camp, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-slate-200 transition-all group">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    camp.type === 'Email' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
                  }`}>
                    {camp.type === 'Email' ? <Mail className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{camp.title}</h4>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                      {camp.type} • {camp.target}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${
                      camp.status === 'Sent' ? 'bg-emerald-50 text-emerald-600' :
                      camp.status === 'Active' ? 'bg-blue-50 text-blue-600' :
                      'bg-slate-200 text-slate-600'
                    }`}>
                      {camp.status}
                    </span>
                    <p className="text-[9px] font-medium text-slate-400 mt-0.5">{camp.date}</p>
                  </div>
                  <button className="p-1.5 text-slate-400 hover:text-indigo-600 transition-colors">
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-auto p-6 bg-slate-50 border-t border-slate-100 text-center">
            <button className="text-xs font-bold text-indigo-600 hover:underline">View All Campaign Analytics</button>
          </div>
        </div>

        {/* Website Updates */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="p-1.5 bg-indigo-500/20 rounded-lg">
                <Globe className="w-5 h-5 text-indigo-400" />
              </div>
              <h3 className="text-lg font-black">Portal Content</h3>
            </div>
            
            <div className="space-y-3.5">
              <button className="w-full flex items-center justify-between p-3.5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all text-left">
                <div className="flex items-center gap-3">
                  <Layout className="w-4 h-4 text-indigo-400" />
                  <div>
                    <p className="text-xs font-bold">Homepage Banners</p>
                    <p className="text-[9px] text-slate-400 uppercase tracking-wider">Update images & text</p>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-600" />
              </button>

              <button className="w-full flex items-center justify-between p-3.5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all text-left">
                <div className="flex items-center gap-3">
                  <Edit3 className="w-4 h-4 text-emerald-400" />
                  <div>
                    <p className="text-xs font-bold">Blog & News</p>
                    <p className="text-[9px] text-slate-400 uppercase tracking-wider">Manage articles</p>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-600" />
              </button>

              <button className="w-full flex items-center justify-between p-3.5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all text-left">
                <div className="flex items-center gap-3">
                  <Settings className="w-4 h-4 text-amber-400" />
                  <div>
                    <p className="text-xs font-bold">Site Settings</p>
                    <p className="text-[9px] text-slate-400 uppercase tracking-wider">Basic SEO info</p>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-600" />
              </button>
            </div>
            
            <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-dashed border-white/10">
               <p className="text-[10px] font-bold text-slate-400 text-center uppercase tracking-wider">Changes live after approval</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
             <h4 className="text-base font-black text-slate-800 mb-5">Channel Health</h4>
             <div className="space-y-5">
                <div>
                   <div className="flex justify-between text-[9px] font-black uppercase tracking-widest mb-1.5">
                      <span className="text-slate-400">Email Delivery</span>
                      <span className="text-emerald-600">99.2%</span>
                   </div>
                   <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '99.2%' }}></div>
                   </div>
                </div>
                <div>
                   <div className="flex justify-between text-[9px] font-black uppercase tracking-widest mb-1.5">
                      <span className="text-slate-400">SMS Gateway</span>
                      <span className="text-indigo-600">94.8%</span>
                   </div>
                   <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: '94.8%' }}></div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCommunication;
