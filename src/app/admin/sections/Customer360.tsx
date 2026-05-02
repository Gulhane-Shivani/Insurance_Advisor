import React, { useState, useMemo } from 'react';
import { 
  User, 
  Search, 
  Phone, 
  Mail, 
  MapPin, 
  History, 
  FileText, 
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

const Customer360: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const allCustomers = [
    {
      id: '99281',
      name: 'Rahul Verma',
      email: 'rahul.v@gmail.com',
      phone: '+91 98765 43210',
      location: 'Mumbai, Maharashtra',
      initials: 'RV',
      type: 'Premium Customer',
      policies: '04',
      claims: '01',
      interactions: [
        { type: 'Call', date: 'Today, 10:30 AM', desc: 'Discussed policy renewal terms for POL-8829', status: 'Completed' },
        { type: 'Email', date: 'Yesterday', desc: 'Sent health insurance quotes for family plan', status: 'Sent' },
        { type: 'Support', date: '24 Apr 2024', desc: 'Updated contact address and KYC documents', status: 'Resolved' },
      ]
    },
    {
      id: '88172',
      name: 'Sneha Gupta',
      email: 'sneha.g@outlook.com',
      phone: '+91 91234 56789',
      location: 'Bangalore, Karnataka',
      initials: 'SG',
      type: 'Standard Customer',
      policies: '02',
      claims: '00',
      interactions: [
        { type: 'Email', date: '2 days ago', desc: 'Inquiry about new car insurance rates', status: 'In Progress' },
        { type: 'Call', date: '15 Apr 2024', desc: 'KYC verification call', status: 'Verified' },
      ]
    },
    {
      id: '77210',
      name: 'Vikram Malhotra',
      email: 'vikram.m@yahoo.com',
      phone: '+91 99887 76655',
      location: 'Delhi, NCR',
      initials: 'VM',
      type: 'VIP Customer',
      policies: '12',
      claims: '03',
      interactions: [
        { type: 'Support', date: 'Just now', desc: 'Claim settlement request for POL-1122', status: 'Urgent' },
        { type: 'Call', date: 'Last week', desc: 'Premium portfolio review session', status: 'Completed' },
      ]
    }
  ];

  const [selectedCustomer, setSelectedCustomer] = useState(allCustomers[0]);

  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return [];
    return allCustomers.filter(c => 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.includes(searchTerm)
    );
  }, [searchTerm]);

  const handleSelectCustomer = (customer: typeof allCustomers[0]) => {
    setSelectedCustomer(customer);
    setSearchTerm('');
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      {/* Search Header */}
      <div className="bg-white p-5 rounded-[28px] border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-800">Customer 360° View</h3>
            <p className="text-[11px] text-slate-500 font-medium">Search and manage complete customer lifecycle</p>
          </div>
        </div>
        
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by name, email or ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:border-indigo-500 transition-all"
          />
          
          {/* Search Dropdown Results */}
          {searchResults.length > 0 && (
             <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                {searchResults.map(c => (
                   <button 
                     key={c.id} 
                     onClick={() => handleSelectCustomer(c)}
                     className="w-full px-5 py-3 text-left hover:bg-slate-50 flex items-center gap-4 transition-colors group"
                   >
                      <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-black text-[10px]">
                         {c.initials}
                      </div>
                      <div>
                         <p className="text-xs font-black text-slate-800 group-hover:text-indigo-600">{c.name}</p>
                         <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">ID: {c.id} • {c.type}</p>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 ml-auto text-slate-300" />
                   </button>
                ))}
             </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-5">
           <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
              <div className="h-20 bg-indigo-600 relative overflow-hidden">
                 <div className="absolute -bottom-10 left-6 w-20 h-20 rounded-[24px] bg-white p-1 border-4 border-white shadow-lg shadow-indigo-100 flex items-center justify-center font-black text-2xl text-indigo-600 z-10">
                    {selectedCustomer.initials}
                 </div>
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-x-10 translate-y-[-20px]"></div>
              </div>
              <div className="pt-12 p-6">
                 <h4 className="text-lg font-black text-slate-800 tracking-tight">{selectedCustomer.name}</h4>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">{selectedCustomer.type} • ID: {selectedCustomer.id}</p>
                 
                 <div className="mt-6 space-y-3.5">
                    <div className="flex items-center gap-3 text-slate-600">
                       <Phone className="w-3.5 h-3.5 text-slate-400" />
                       <span className="text-xs font-bold">{selectedCustomer.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                       <Mail className="w-3.5 h-3.5 text-slate-400" />
                       <span className="text-xs font-bold">{selectedCustomer.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                       <MapPin className="w-3.5 h-3.5 text-slate-400" />
                       <span className="text-xs font-bold">{selectedCustomer.location}</span>
                    </div>
                 </div>

                 <div className="mt-8 grid grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-50 rounded-xl text-center border border-slate-100">
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Policies</p>
                       <p className="text-sm font-black text-slate-800">{selectedCustomer.policies}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl text-center border border-slate-100">
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Claims</p>
                       <p className="text-sm font-black text-slate-800">{selectedCustomer.claims}</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Interaction Timeline */}
        <div className="lg:col-span-2 space-y-5">
           <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[440px]">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                 <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
                    <History className="w-4 h-4 text-indigo-600" /> Interaction Timeline
                 </h3>
                 <button className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-lg hover:bg-indigo-100 transition-colors">Add Note</button>
              </div>
              
              <div className="p-6 space-y-6 relative flex-1">
                 <div className="absolute left-[37px] top-6 bottom-6 w-px bg-slate-100"></div>
                 
                 {selectedCustomer.interactions.map((item, i) => (
                    <div key={i} className="relative flex gap-5 group cursor-pointer animate-in fade-in slide-in-from-left-4 duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                       <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 z-10 shadow-sm ${
                         item.type === 'Call' ? 'bg-indigo-50 text-indigo-600' :
                         item.type === 'Email' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                       }`}>
                          {item.type === 'Call' ? <Phone className="w-4 h-4" /> : 
                           item.type === 'Email' ? <Mail className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
                       </div>
                       <div className="flex-1 pb-4 border-b border-slate-50 group-last:border-none">
                          <div className="flex justify-between items-start mb-1">
                             <h5 className="text-[13px] font-bold text-slate-800">{item.type} Interaction</h5>
                             <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">{item.date}</span>
                          </div>
                          <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                          <div className="mt-2 flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-600">
                             <ShieldCheck className="w-3 h-3" /> {item.status}
                          </div>
                       </div>
                       <ChevronRight className="w-4 h-4 text-slate-300 self-center opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
                    </div>
                 ))}
              </div>

              <div className="mt-auto p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-center gap-4">
                 <button className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-indigo-600 transition-colors">
                    <FileText className="w-3.5 h-3.5" /> Documents
                 </button>
                 <div className="w-px h-4 bg-slate-200"></div>
                 <button className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-indigo-600 transition-colors">
                    <ExternalLink className="w-3.5 h-3.5" /> Full History
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Customer360;
