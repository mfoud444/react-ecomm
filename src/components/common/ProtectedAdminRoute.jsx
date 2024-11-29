import { Navigate } from 'react-router-dom';
import { isAuthenticated, isAdmin } from '@/utils/auth';

const ProtectedAdminRoute = ({ children }) => {
  if (!isAuthenticated()) {
    // Redirect to login if not authenticated
    return <Navigate to="/auth/login" replace />;
  }

  if (!isAdmin()) {
    // Redirect to home if authenticated but not admin
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedAdminRoute; 