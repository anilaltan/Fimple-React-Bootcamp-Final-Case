import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoute = ({ isAuth, children }) => {
  if (!isAuth) {
    return <Navigate to="/admin" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
