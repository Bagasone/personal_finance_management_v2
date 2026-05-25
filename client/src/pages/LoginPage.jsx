import { Navigate, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated)
    return (
      <Navigate
        to={"/"}
        replace
      />
    );

  const handleSubmit = () => {
    login();
    navigate("/");
  };

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      Login Page
      <button
        onClick={handleSubmit}
        className="bg-teal-500 px-3 py-1 rounded-sm">
        Login
      </button>
    </div>
  );
};

export default LoginPage;
