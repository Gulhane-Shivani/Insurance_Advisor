import React, { useState, useEffect } from 'react';
import { Shield, CheckCircle, XCircle } from 'lucide-react';
import api from '../../services/api';

interface InsurancePolicy {
  id: number;
  full_name: string;
  email: string;
  phone_number: string;
  insurance_type: string;
  vehicle_make: string;
  vehicle_model: string;
  manufacturing_year: string;
  registration_number: string;
  message?: string;
  applied_date: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

const AdminInsurance: React.FC = () => {
  const [insurances, setInsurances] = useState<InsurancePolicy[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchInsurances();
  }, []);

  const fetchInsurances = async () => {
    try {
      const response = await api.get('/admin/insurance');
      const fetchedInsurances = response.data.map((ins: any) => ({
        ...ins,
        applied_date: new Date(ins.applied_date).toLocaleDateString(),
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
    if (window.confirm(`Mark this application as ${newStatus}?`)) {
      try {
        await api.put(`/admin/insurance/${id}/status`, { status: newStatus });
        setInsurances(insurances.map(ins =>
          ins.id === id ? { ...ins, status: newStatus } : ins
        ));
      } catch (error) {
        console.error('Failed to update status', error);
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-200 flex justify-between items-center bg-white">
        <div>
          <h2 className="text-base font-bold text-slate-800">Insurance Applications</h2>
          <p className="text-xs text-slate-500 mt-0.5">Review and approve insurance requests.</p>
        </div>
        <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
          <Shield className="h-4 w-4" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-2.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Policy ID</th>
              <th className="px-4 py-2.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Applicant</th>
              <th className="px-4 py-2.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Type</th>
              <th className="px-4 py-2.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Details</th>
              <th className="px-4 py-2.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
              <th className="px-4 py-2.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-2.5 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100">
            {currentInsurances.map((ins) => (
              <tr key={ins.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 whitespace-nowrap text-xs font-bold text-slate-800">#{ins.id}</td>
                <td className="px-4 py-2.5 whitespace-nowrap text-xs font-bold text-slate-600">{ins.full_name}</td>
                <td className="px-4 py-2.5 whitespace-nowrap text-xs font-medium text-slate-500 capitalize">{ins.insurance_type}</td>
                <td className="px-4 py-2.5 text-xs font-medium text-slate-500">
                  {ins.insurance_type === 'car' && ins.vehicle_make && ins.vehicle_make !== 'N/A' ? (
                    <div>
                      <span className="font-bold text-slate-700">{ins.vehicle_make} {ins.vehicle_model}</span>
                      <span className="text-slate-400 ml-1">({ins.manufacturing_year})</span>
                      {ins.registration_number && ins.registration_number !== 'N/A' && (
                        <div className="text-[10px] text-slate-400 mt-0.5">Reg: {ins.registration_number}</div>
                      )}
                    </div>
                  ) : (
                    <div className="max-w-[200px] truncate" title={ins.message || ins.phone_number}>
                      {ins.message && ins.message.length > 0 ? (
                        <span className="text-slate-600">{ins.message}</span>
                      ) : (
                        <span className="text-slate-400 italic">Phone: {ins.phone_number}</span>
                      )}
                    </div>
                  )}
                </td>
                <td className="px-4 py-2.5 whitespace-nowrap text-xs font-medium text-slate-500">{ins.applied_date}</td>
                <td className="px-4 py-2.5 whitespace-nowrap">
                  <span className={`px-2 py-0.5 inline-flex text-xs font-bold rounded-md border ${
                    ins.status === 'Approved' ? 'bg-green-50 text-green-600 border-green-200' :
                    ins.status === 'Rejected' ? 'bg-red-50 text-red-600 border-red-200' :
                    'bg-amber-50 text-amber-600 border-amber-200'
                  }`}>
                    {ins.status}
                  </span>
                </td>
                <td className="px-4 py-2.5 whitespace-nowrap text-right">
                  {ins.status === 'Pending' ? (
                    <div className="flex justify-end space-x-1.5">
                      <button
                        onClick={() => handleStatusChange(ins.id, 'Approved')}
                        className="text-green-600 hover:text-green-800 bg-green-50 hover:bg-green-100 p-1.5 rounded-lg transition-colors"
                        title="Approve"
                      >
                        <CheckCircle className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleStatusChange(ins.id, 'Rejected')}
                        className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-1.5 rounded-lg transition-colors"
                        title="Reject"
                      >
                        <XCircle className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ) : (
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Done</span>
                  )}
                </td>
              </tr>
            ))}
            {currentInsurances.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-sm text-slate-500 font-medium">
                  No insurance applications found.
                </td>
              </tr>
            )}
            {/* Filler rows to always show 5 rows */}
            {currentInsurances.length > 0 && Array.from({ length: Math.max(0, itemsPerPage - currentInsurances.length) }).map((_, i) => (
              <tr key={`filler-${i}`}>
                <td className="px-4 py-2.5">&nbsp;</td>
                <td className="px-4 py-2.5"></td>
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
          Showing <span className="font-bold text-slate-800">{insurances.length === 0 ? 0 : indexOfFirstItem + 1}</span> to{' '}
          <span className="font-bold text-slate-800">{Math.min(indexOfLastItem, insurances.length)}</span> of{' '}
          <span className="font-bold text-slate-800">{insurances.length}</span> results
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

export default AdminInsurance;
