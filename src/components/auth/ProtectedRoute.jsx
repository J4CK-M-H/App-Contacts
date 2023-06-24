import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export const ProtectedRoute = () => {

  const { auth, loading, closeSession } = useAuth();
  const location = useLocation();
  if (loading) return ;

  const handleLogout = () => {
    closeSession();
    localStorage.removeItem('token');
  };

  return (auth?._id)
    ? <Outlet />
    : <Navigate to={"/auth"} replace={true} state={{ from: location }} />

}
