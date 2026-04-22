import React, { useState, useEffect } from 'react';
import { Shield, CheckCircle, XCircle } from 'lucide-react';
import axios from 'axios';

interface InsurancePolicy {
  id: number;
  user_name: string;
  type: string;
  amount: string;
  applied_date: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

const AdminInsurance: React.FC = () => {
  const [insurances, setInsurances] = useState<InsurancePolicy[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchInsurances();
  }, []);

  const fetchInsurances = async () => {
    try {
      const response = await axios.get('http://localhost:8000/admin/insurance');
      const fetchedInsurances = response.data.map((ins: any) => ({
        ...ins,
        applied_date: new Date(ins.applied_date).toLocaleDateString()
      }));
      setInsurances(fetchedInsurances);
    } catch (error) {
      console.error('Failed to fetch insurances', error);
    }
  };

  const totalPages = Math.ceil(insurances.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentInsurances = insurances.slice(indexOfFirstItem, indexOfLastItem);

  const handleStatusChange = async (id: number, newStatus: 'Approved' | 'Rejected') => {
    if (window.confirm(`Are you sure you want to mark this application as ${newStatus}?`)) {
      try {
        await axios.put(`http://localhost:8000/admin/insurance/${id}/status`, { status: newStatus });
        setInsurances(insurances.map(ins => 
          ins.id === id ? { ...ins, status: newStatus } : ins
        ));
      } catch (error) {
        console.error('Failed to update status', error);
      }
    }
  };

  return (
    <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Insurance Applications</h2>
          <p className="text-sm text-slate-500 mt-1 font-medium">Review and approve insurance requests.</p>
        </div>
        <div className="bg-blue-50 text-blue-600 p-3 rounded-2xl">
          <Shield className="h-6 w-6" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-8 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Policy ID</th>
              <th className="px-8 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Applicant</th>
              <th className="px-8 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Type</th>
              <th className="px-8 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
              <th className="px-8 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
              <th className="px-8 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-8 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100">
            {currentInsurances.map((ins) => (
              <tr key={ins.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-8 py-5 whitespace-nowrap text-sm font-black text-slate-900">#{ins.id}</td>
                <td className="px-8 py-5 whitespace-nowrap text-sm font-bold text-slate-600">{ins.user_name}</td>
                <td className="px-8 py-5 whitespace-nowrap text-sm font-medium text-slate-500">{ins.type}</td>
                <td className="px-8 py-5 whitespace-nowrap text-sm text-slate-900 font-black">{ins.amount}</td>
                <td className="px-8 py-5 whitespace-nowrap text-sm font-medium text-slate-500">{ins.applied_date}</td>
                <td className="px-8 py-5 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs font-bold rounded-full border ${
                    ins.status === 'Approved' ? 'bg-green-50 text-green-600 border-green-100' : 
                    ins.status === 'Rejected' ? 'bg-red-50 text-red-600 border-red-100' : 
                    'bg-amber-50 text-amber-600 border-amber-100'
                  }`}>
                    {ins.status}
                  </span>
                </td>
                <td className="px-8 py-5 whitespace-nowrap text-right text-sm font-medium">
                  {ins.status === 'Pending' ? (
                    <div className="flex justify-end space-x-2">
                      <button 
                        onClick={() => handleStatusChange(ins.id, 'Approved')}
                        className="text-green-500 hover:text-green-700 bg-green-50 hover:bg-green-100 p-2.5 rounded-xl transition-colors"
                        title="Approve"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleStatusChange(ins.id, 'Rejected')}
                        className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-2.5 rounded-xl transition-colors"
                        title="Reject"
                      >
                        <XCircle className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Reviewed</span>
                  )}
                </td>
              </tr>
            ))}
            {currentInsurances.length === 0 && (
              <tr>
                <td colSpan={7} className="px-8 py-12 text-center text-slate-500 font-medium">
                  No insurance applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="px-8 py-5 border-t border-slate-100 flex items-center justify-between bg-white rounded-b-[32px]">
          <div className="text-sm text-slate-500 font-medium">
            Showing <span className="font-bold text-slate-900">{indexOfFirstItem + 1}</span> to{' '}
            <span className="font-bold text-slate-900">
              {Math.min(indexOfLastItem, insurances.length)}
            </span>{' '}
            of <span className="font-bold text-slate-900">{insurances.length}</span> results
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

export default AdminInsurance;
