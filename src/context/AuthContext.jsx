import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("carbazaar_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

 const login = (userData) => {
  sessionStorage.setItem(
    "carbazaar_user",
    JSON.stringify(userData)
  );
  setUser(userData);
};

 const logout = () => {
  sessionStorage.removeItem(
    "carbazaar_user"
  );
  setUser(null);
};

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}