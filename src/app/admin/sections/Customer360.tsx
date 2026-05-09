import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Phone, 
  Shield,
  Clock,
  IndianRupee,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  CalendarDays,
  Users
} from 'lucide-react';

const Customer360: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [policies, setPolicies] = useState<any[]>([]);
  const [selectedName, setSelectedName] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('safeguard_policies_v2');
    if (saved) {
      try { setPolicies(JSON.parse(saved)); } catch (e) {}
    }
  }, []);

  // Build unique customer list from policies
  const customers = useMemo(() => {
    const map = new Map<string, any>();
    policies.forEach(p => {
      const name = p.customer?.trim();
      if (!name) return;
      if (!map.has(name)) {
        map.set(name, {
          name,
          initials: name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase(),
          policies: [],
        });
      }
      map.get(name).policies.push(p);
    });
    return Array.from(map.values());
  }, [policies]);

  const filteredCustomers = useMemo(() => {
    if (!searchTerm.trim()) return customers;
    return customers.filter(c =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [customers, searchTerm]);

  const selected = customers.find(c => c.name === selectedName) || customers[0] || null;

  const getStatusIcon = (status: string) => {
    if (status === 'Active') return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />;
    if (status === 'Renewal Due') return <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />;
    if (status === 'Expired') return <XCircle className="w-3.5 h-3.5 text-rose-500" />;
    return <Clock className="w-3.5 h-3.5 text-slate-400" />;
  };

  const getStatusColor = (status: string) => {
    if (status === 'Active') return 'bg-emerald-50 text-emerald-600 border-emerald-100';
    if (status === 'Renewal Due') return 'bg-amber-50 text-amber-600 border-amber-100';
    if (status === 'Expired') return 'bg-rose-50 text-rose-600 border-rose-100';
    return 'bg-slate-100 text-slate-500 border-slate-200';
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      {/* Header */}
      <div className="bg-white/40 backdrop-blur-xl p-6 rounded-[28px] border border-white/60 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">Customer 360°</h1>
            <p className="text-[11px] text-slate-500 font-medium">Live data from policy management system</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search customer name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all"
          />
        </div>
      </div>

      {customers.length === 0 ? (
        <div className="bg-white rounded-[28px] border border-slate-100 p-20 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4">
            <Users className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="text-lg font-black text-slate-800">No customer data yet</h3>
          <p className="text-xs font-bold text-slate-400 mt-2 max-w-xs">Add policies in Policy Management and the customer profiles will automatically appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Customer List */}
          <div className="lg:col-span-1 bg-white rounded-[28px] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-50">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{filteredCustomers.length} Customers</p>
            </div>
            <div className="divide-y divide-slate-50 overflow-y-auto max-h-[520px] scrollbar-hide">
              {filteredCustomers.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedName(c.name)}
                  className={`w-full px-5 py-4 text-left flex items-center gap-4 transition-all group ${selected?.name === c.name ? 'bg-indigo-50' : 'hover:bg-slate-50'}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-[12px] shadow-inner flex-shrink-0 ${selected?.name === c.name ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-600'}`}>
                    {c.initials}
                  </div>
                  <div className="min-w-0">
                    <p className={`text-sm font-black truncate ${selected?.name === c.name ? 'text-indigo-700' : 'text-slate-800'}`}>{c.name}</p>
                    <p className="text-[10px] font-bold text-slate-400 mt-0.5">{c.policies.length} {c.policies.length === 1 ? 'policy' : 'policies'}</p>
                  </div>
                  <ChevronRight className={`w-4 h-4 ml-auto flex-shrink-0 transition-colors ${selected?.name === c.name ? 'text-indigo-400' : 'text-slate-200 group-hover:text-slate-400'}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Customer Profile + Policies */}
          {selected ? (
            <div className="lg:col-span-2 space-y-5">
              {/* Profile Card */}
              <div className="bg-white rounded-[28px] border border-slate-100 shadow-sm overflow-hidden">
                <div className="h-16 bg-gradient-to-r from-indigo-600 to-violet-600 relative">
                  <div className="absolute -bottom-8 left-6 w-16 h-16 rounded-2xl bg-white border-4 border-white shadow-lg flex items-center justify-center font-black text-xl text-indigo-600 z-10">
                    {selected.initials}
                  </div>
                </div>
                <div className="pt-10 px-6 pb-6">
                  <h3 className="text-xl font-black text-slate-900">{selected.name}</h3>
                  <div className="flex flex-wrap gap-4 mt-4 text-xs text-slate-500 font-bold">
                    <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-slate-300" /> Registered customer</span>
                    <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-slate-300" /> {selected.policies.length} active {selected.policies.length === 1 ? 'policy' : 'policies'}</span>
                  </div>
                </div>
              </div>

              {/* Policies Table */}
              <div className="bg-white rounded-[28px] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-slate-50 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-indigo-500" />
                  <h4 className="text-sm font-black text-slate-900">Policy Portfolio</h4>
                  <span className="ml-auto px-2.5 py-0.5 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black">{selected.policies.length} policies</span>
                </div>
                <div className="divide-y divide-slate-50">
                  {selected.policies.map((p: any, i: number) => (
                    <div key={i} className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                          <Shield className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900">{p.id}</p>
                          <p className="text-[11px] font-bold text-indigo-500 mt-0.5">{p.type}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs">
                        <div className="flex items-center gap-1.5 text-slate-500 font-bold">
                          <IndianRupee className="w-3 h-3 text-slate-300" />
                          {p.premium}
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-500 font-bold">
                          <CalendarDays className="w-3 h-3 text-slate-300" />
                          {p.expiryDate || 'N/A'}
                        </div>
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold border ${getStatusColor(p.status)}`}>
                          {getStatusIcon(p.status)}
                          {p.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Customer360;
