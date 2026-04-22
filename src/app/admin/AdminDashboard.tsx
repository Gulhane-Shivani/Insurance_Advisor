import React, { useState, useEffect } from 'react';
import { Mail, Search, Check, X, Trash2 } from 'lucide-react';
import axios from 'axios';

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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/admin/contacts');
      setContacts(response.data);
    } catch (error) {
      console.error('Failed to fetch contacts', error);
    }
  };

  // Calculate pagination
  const totalPages = Math.ceil(contacts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentContacts = contacts.slice(indexOfFirstItem, indexOfLastItem);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await axios.delete(`http://localhost:8000/admin/contacts/${id}`);
        setContacts(contacts.filter(c => c.id !== id));
        // Adjust page if necessary
        if (currentContacts.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      } catch (error) {
        console.error('Failed to delete contact', error);
      }
    }
  };

  return (
    <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Contact Messages</h2>
          <p className="text-sm text-slate-500 mt-1 font-medium">Manage inquiries from users.</p>
        </div>
        <div className="bg-blue-50 text-blue-600 p-3 rounded-2xl">
          <Mail className="h-6 w-6" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-8 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">ID</th>
              <th className="px-8 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Name</th>
              <th className="px-8 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Email</th>
              <th className="px-8 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Subject</th>
              <th className="px-8 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Message</th>
              <th className="px-8 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100">
            {currentContacts.map((contact) => (
              <tr key={contact.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-8 py-5 whitespace-nowrap text-sm font-bold text-slate-400">#{contact.id}</td>
                <td className="px-8 py-5 whitespace-nowrap">
                  <div className="text-sm font-bold text-slate-900">{contact.full_name}</div>
                </td>
                <td className="px-8 py-5 whitespace-nowrap text-sm font-medium text-slate-500">{contact.email}</td>
                <td className="px-8 py-5 whitespace-nowrap text-sm font-bold text-slate-900">{contact.subject}</td>
                <td className="px-8 py-5 text-sm font-medium text-slate-500 max-w-xs truncate">{contact.message}</td>
                <td className="px-8 py-5 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => handleDelete(contact.id)}
                    className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-2.5 rounded-xl transition-colors"
                    title="Delete message"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
            {currentContacts.length === 0 && (
              <tr>
                <td colSpan={6} className="px-8 py-12 text-center text-slate-500 font-medium">
                  No contact messages found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-8 py-5 border-t border-slate-100 flex items-center justify-between bg-white rounded-b-[32px]">
          <div className="text-sm text-slate-500 font-medium">
            Showing <span className="font-bold text-slate-900">{indexOfFirstItem + 1}</span> to{' '}
            <span className="font-bold text-slate-900">
              {Math.min(indexOfLastItem, contacts.length)}
            </span>{' '}
            of <span className="font-bold text-slate-900">{contacts.length}</span> results
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                currentPage === 1 
                  ? 'bg-slate-50 text-slate-400 cursor-not-allowed' 
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 shadow-sm'
              }`}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-bold transition-all ${
                  currentPage === page
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                currentPage === totalPages 
                  ? 'bg-slate-50 text-slate-400 cursor-not-allowed' 
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 shadow-sm'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
