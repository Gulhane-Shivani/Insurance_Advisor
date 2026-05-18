import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  // Wait until auth state is resolved from localStorage
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Loading session...</p>
        </div>
      </div>
    );
  }

  // Not logged in — send to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Role check — if roles are restricted and user doesn't match
  if (allowedRoles && !allowedRoles.includes(user.role || '')) {
    // Redirect to their correct dashboard
    if (user.role === 'SUPER_ADMIN') return <Navigate to="/super_admin" replace />;
    if (user.role === 'ADMIN') return <Navigate to="/admin/overview" replace />;
    if (user.role === 'AGENT') return <Navigate to="/agent_dashboard" replace />;
    if (user.role === 'CSR') return <Navigate to="/csr_dashboard" replace />;
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
