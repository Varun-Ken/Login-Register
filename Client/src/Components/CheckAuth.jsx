import { Navigate, Outlet } from "react-router-dom";

// For protecting routes that require authentication
export const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children ? children : <Outlet />;
};

// For preventing authenticated users from accessing auth pages (login/register)
export const AuthRoute = ({ isAuthenticated, children }) => {
  if (isAuthenticated) {
    return <Navigate to="/user/dashboard" />;
  }
  return children ? children : <Outlet />;
};

export default { ProtectedRoute, AuthRoute };
