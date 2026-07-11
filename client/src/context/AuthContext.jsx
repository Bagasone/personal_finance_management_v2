import { createContext, useContext, useState } from "react";

import { KEY_AUTH } from "../constants";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [is_authenticated, setAuthenticated] = useState(
    () => localStorage.getItem(KEY_AUTH) === "true",
  );

  const login = () => {
    setAuthenticated(true);
    localStorage.setItem(KEY_AUTH, "true");
  };

  const logout = () => {
    setAuthenticated(false);
    localStorage.setItem(KEY_AUTH, "false");
  };

  return (
    <AuthContext.Provider value={{ is_authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export default AuthProvider;
export { useAuth };
