import React, { useState, useEffect } from 'react';
import { Users, Trash2 } from 'lucide-react';
import axios from 'axios';

interface User {
  id: number;
  full_name: string;
  email: string;
  created_at: string;
  status?: 'Active' | 'Inactive';
}

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/admin/users');
      const fetchedUsers = response.data.map((u: any) => ({
        ...u,
        created_at: new Date(u.created_at).toLocaleDateString(),
        status: 'Active',
      }));
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  };

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:8000/admin/users/${id}`);
        setUsers(users.filter(u => u.id !== id));
        if (currentUsers.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      } catch (error) {
        console.error('Failed to delete user', error);
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-200 flex justify-between items-center bg-white">
        <div>
          <h2 className="text-base font-bold text-slate-800">User Management</h2>
          <p className="text-xs text-slate-500 mt-0.5">Manage registered users.</p>
        </div>
        <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
          <Users className="h-4 w-4" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-2.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">ID</th>
              <th className="px-4 py-2.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Name</th>
              <th className="px-4 py-2.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Email</th>
              <th className="px-4 py-2.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Joined</th>
              <th className="px-4 py-2.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-2.5 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100">
            {currentUsers.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 whitespace-nowrap text-xs font-medium text-slate-400">#{user.id}</td>
                <td className="px-4 py-2.5 whitespace-nowrap text-xs font-bold text-slate-800">{user.full_name}</td>
                <td className="px-4 py-2.5 whitespace-nowrap text-xs font-medium text-slate-500">{user.email}</td>
                <td className="px-4 py-2.5 whitespace-nowrap text-xs font-medium text-slate-500">{user.created_at}</td>
                <td className="px-4 py-2.5 whitespace-nowrap">
                  <span className={`px-2 py-0.5 inline-flex text-xs font-bold rounded-md border ${
                    user.status === 'Active'
                      ? 'bg-green-50 text-green-600 border-green-200'
                      : 'bg-red-50 text-red-600 border-red-200'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-2.5 whitespace-nowrap text-right">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-1.5 rounded-lg transition-colors"
                    title="Delete user"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </td>
              </tr>
            ))}
            {currentUsers.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-sm text-slate-500 font-medium">
                  No users found.
                </td>
              </tr>
            )}
            {currentUsers.length > 0 && Array.from({ length: Math.max(0, itemsPerPage - currentUsers.length) }).map((_, i) => (
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
          Showing <span className="font-bold text-slate-800">{users.length === 0 ? 0 : indexOfFirstItem + 1}</span> to{' '}
          <span className="font-bold text-slate-800">{Math.min(indexOfLastItem, users.length)}</span> of{' '}
          <span className="font-bold text-slate-800">{users.length}</span> results
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
  );
};

export default AdminUsers;
