import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { is_authenticated } = useAuth();

  if (!is_authenticated)
    return (
      <Navigate
        replace
        to={"/login"}
      />
    );

  return <Outlet />;
};

export default ProtectedRoute;
