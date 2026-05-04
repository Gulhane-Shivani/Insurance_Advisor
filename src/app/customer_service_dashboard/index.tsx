/* src/app/csr_dashboard/page.tsx */
import React, { useState } from 'react';
import {
  LayoutDashboard, Search, ShieldCheck,
  RefreshCw, Ticket, MessageSquare, Settings,
  LogOut, Menu, X, Bell, ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import '../agent_dashboard/agent_dashboard.css';

// Section Imports
import CSROverview from './sections/CSROverview';
import CSRCustomer360 from './sections/CSRCustomer360';
import ClaimsSupport from './sections/ClaimsSupport';
import RenewalManagement from './sections/RenewalManagement';
import TicketManagement from './sections/TicketManagement';
import PolicyServicing from './sections/PolicyServicing';
import CSRCommunications from './sections/CSRCommunications';

const CSRDashboard: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('Overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [supportRequest, setSupportRequest] = useState({ subject: '', priority: 'Normal', description: '' });

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSupportModalOpen(false);
    toast.success('Support request submitted successfully. Ticket ID: IT-' + Math.floor(1000 + Math.random() * 9000));
    setSupportRequest({ subject: '', priority: 'Normal', description: '' });
  };

  const navItems = [
    { id: 'Overview', icon: LayoutDashboard, label: "Today's Tasks" },
    { id: 'Search', icon: Search, label: 'Customer 360°' },
    { id: 'Claims', icon: ShieldCheck, label: 'Claims Support' },
    { id: 'Renewals', icon: RefreshCw, label: 'Renewal Desk' },
    { id: 'Tickets', icon: Ticket, label: 'Tickets & Queries' },
    { id: 'Servicing', icon: Settings, label: 'Policy Servicing' },
    { id: 'Comms', icon: MessageSquare, label: 'Communications' },
  ];

  const sectionTitles: Record<string, string> = {
    Overview: "Today's Tasks",
    Search: 'Customer 360°',
    Claims: 'Claims Support',
    Renewals: 'Renewal Desk',
    Tickets: 'Tickets & Queries',
    Servicing: 'Policy Servicing',
    Comms: 'Communications',
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'Overview': return <CSROverview />;
      case 'Search': return <CSRCustomer360 />;
      case 'Claims': return <ClaimsSupport />;
      case 'Renewals': return <RenewalManagement />;
      case 'Tickets': return <TicketManagement />;
      case 'Servicing': return <PolicyServicing />;
      case 'Comms': return <CSRCommunications />;
      default: return <CSROverview />;
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans relative">
      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-white transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 shadow-2xl flex flex-col`}>
        <div className="flex flex-col h-full">
          <div className="p-8">
            <div className="flex items-center gap-2 mb-10 px-2">
              <div className="w-9 h-9 bg-violet-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-violet-500/20">
                IA
              </div>
              <h1 className="text-xl font-bold tracking-tighter text-white">
                Insurance<span className="text-violet-400">CSR</span>
              </h1>
            </div>

            <nav className="space-y-1.5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-semibold transition-all group ${activeSection === item.id
                      ? 'bg-violet-600 text-white shadow-xl shadow-violet-600/20'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                    }`}
                >
                  <item.icon size={20} className={activeSection === item.id ? 'text-white' : 'text-slate-500 group-hover:text-violet-400'} />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-auto p-8 space-y-4">
            <button
              onClick={() => setIsSupportModalOpen(true)}
              className="w-full flex items-center justify-between gap-3 px-5 py-4 bg-violet-600 text-white rounded-2xl text-sm font-semibold shadow-xl shadow-violet-600/20 group hover:bg-violet-500 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full border-2 border-white/30 flex items-center justify-center">
                  <span className="text-[10px]">?</span>
                </div>
                Support Desk
              </div>
              <ChevronRight size={16} className="text-white/50 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => { logout(); navigate('/login'); }}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 border-2 border-white/10 text-white/50 hover:text-red-400 hover:border-red-400/30 text-xs font-semibold rounded-2xl transition-all uppercase tracking-widest"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50 overflow-hidden">
        <header className="h-24 bg-white border-b border-slate-100 flex items-center justify-between px-8 z-30 shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden p-3 bg-slate-50 rounded-xl text-slate-600">
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">{sectionTitles[activeSection]}</h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Customer Service Dashboard • Live</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-violet-500 transition-colors" size={18} />
              <input type="text" placeholder="Search by Policy No. or Customer Name..." className="pl-12 pr-6 py-3.5 bg-slate-50 border border-slate-100 rounded-[20px] text-sm font-medium w-80 outline-none focus:bg-white focus:ring-4 focus:ring-violet-500/5 focus:border-violet-500 transition-all shadow-sm" />
            </div>
            <div className="flex items-center gap-2">
              <button className="relative p-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-slate-600 transition-all">
                <Bell size={20} />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-slate-50/50">
          <div className="max-w-[1600px] mx-auto animate-fade-in">
            {renderSection()}
          </div>
        </div>
      </main>

      {/* Support Desk Modal */}
      {isSupportModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-xl font-black text-slate-800 tracking-tight">Internal Support Desk</h3>
              <button onClick={() => setIsSupportModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 bg-white rounded-xl shadow-sm"><X size={20} /></button>
            </div>
            <form onSubmit={handleSupportSubmit} className="p-6 space-y-5">
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Subject</label>
                  <input required type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:border-violet-500 outline-none" value={supportRequest.subject} onChange={e => setSupportRequest({ ...supportRequest, subject: e.target.value })} placeholder="e.g. System Access Issue" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Priority</label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:border-violet-500 outline-none" value={supportRequest.priority} onChange={e => setSupportRequest({ ...supportRequest, priority: e.target.value })}>
                    <option>Low</option>
                    <option>Normal</option>
                    <option>High</option>
                    <option>Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Description</label>
                  <textarea required rows={4} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:border-violet-500 outline-none resize-none" value={supportRequest.description} onChange={e => setSupportRequest({ ...supportRequest, description: e.target.value })} placeholder="Please describe the issue in detail..."></textarea>
                </div>
              </div>
              <div className="pt-4 flex gap-3 border-t border-slate-100">
                <button type="button" onClick={() => setIsSupportModalOpen(false)} className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-bold transition-all">Cancel</button>
                <button type="submit" className="flex-1 py-3.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-violet-200">Submit Request</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CSRDashboard;
