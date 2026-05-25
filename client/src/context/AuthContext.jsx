import { createContext, useContext, useState } from "react";
import { KEY_AUTH } from "../constants";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem(KEY_AUTH) === "true",
  );

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem(KEY_AUTH, "true");
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem(KEY_AUTH, "false");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export default AuthProvider;
export { useAuth };
