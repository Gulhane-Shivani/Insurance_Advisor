import React, { useState, useEffect } from 'react';
import { Mail, Search, Check, Trash2 } from 'lucide-react';
import api from '../../services/api';

interface ContactMessage {
  id: number;
  full_name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

const AdminDashboard: React.FC = () => {
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [stats, setStats] = useState({ users: 0, contacts: 0, insurance: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchContacts();
    fetchStats();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await api.get('/admin/contacts');
      setContacts(response.data);
    } catch (error) {
      console.error('Failed to fetch contacts', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await api.get('/admin/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch stats', error);
    }
  };

  const totalPages = Math.ceil(contacts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentContacts = contacts.slice(indexOfFirstItem, indexOfLastItem);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await api.delete(`/admin/contacts/${id}`);
        setContacts(contacts.filter(c => c.id !== id));
        setStats(prev => ({ ...prev, contacts: prev.contacts - 1 }));
        if (currentContacts.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      } catch (error) {
        console.error('Failed to delete contact', error);
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white px-4 py-2.5 rounded-xl shadow-sm border border-slate-100 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
            <Mail className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Messages</p>
            <h3 className="text-lg font-black text-slate-800 leading-tight">{stats.contacts}</h3>
          </div>
        </div>

        <div className="bg-white px-4 py-2.5 rounded-xl shadow-sm border border-slate-100 flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center shrink-0">
            <Search className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Users</p>
            <h3 className="text-lg font-black text-slate-800 leading-tight">{stats.users}</h3>
          </div>
        </div>

        <div className="bg-white px-4 py-2.5 rounded-xl shadow-sm border border-slate-100 flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center shrink-0">
            <Check className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Applications</p>
            <h3 className="text-lg font-black text-slate-800 leading-tight">{stats.insurance}</h3>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-200 flex justify-between items-center bg-white">
          <div>
            <h2 className="text-base font-bold text-slate-800">Contact Messages</h2>
            <p className="text-xs text-slate-500 mt-0.5">Manage inquiries from users.</p>
          </div>
          <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
            <Mail className="h-4 w-4" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-2.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">ID</th>
                <th className="px-4 py-2.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Name</th>
                <th className="px-4 py-2.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Email</th>
                <th className="px-4 py-2.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Subject</th>
                <th className="px-4 py-2.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Message</th>
                <th className="px-4 py-2.5 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100">
              {currentContacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-2.5 whitespace-nowrap text-xs font-medium text-slate-400">#{contact.id}</td>
                  <td className="px-4 py-2.5 whitespace-nowrap">
                    <div className="text-xs font-bold text-slate-800">{contact.full_name}</div>
                  </td>
                  <td className="px-4 py-2.5 whitespace-nowrap text-xs font-medium text-slate-500">{contact.email}</td>
                  <td className="px-4 py-2.5 whitespace-nowrap text-xs font-bold text-slate-800">{contact.subject}</td>
                  <td className="px-4 py-2.5 text-xs font-medium text-slate-500 max-w-xs truncate">{contact.message}</td>
                  <td className="px-4 py-2.5 whitespace-nowrap text-right text-xs font-medium">
                    <button
                      onClick={() => handleDelete(contact.id)}
                      className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-1.5 rounded-lg transition-colors"
                      title="Delete message"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
              {currentContacts.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-sm text-slate-500 font-medium">
                    No contact messages found.
                  </td>
                </tr>
              )}
              {/* Filler rows to always show 5 rows */}
              {currentContacts.length > 0 && Array.from({ length: Math.max(0, itemsPerPage - currentContacts.length) }).map((_, i) => (
                <tr key={`filler-${i}`}>
                  <td className="px-4 py-2.5">&nbsp;</td>
                  <td className="px-4 py-2.5"></td>
                  <td className="px-4 py-2.5"></td>
                  <td className="px-4 py-2.5"></td>
                  <td className="px-4 py-2.5"></td>
                  <td className="px-4 py-2.5"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-5 py-3 border-t border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="text-xs text-slate-500 font-medium">
            Showing <span className="font-bold text-slate-800">{contacts.length === 0 ? 0 : indexOfFirstItem + 1}</span> to{' '}
            <span className="font-bold text-slate-800">{Math.min(indexOfLastItem, contacts.length)}</span> of{' '}
            <span className="font-bold text-slate-800">{contacts.length}</span> results
          </div>
          <div className="flex space-x-1">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                currentPage === 1
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200 shadow-sm'
              }`}
            >
              ← Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-bold transition-all ${
                  currentPage === page
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                currentPage === totalPages || totalPages === 0
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200 shadow-sm'
              }`}
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
