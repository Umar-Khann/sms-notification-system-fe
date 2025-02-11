import React, { createContext, useContext, useState } from "react";
import { loginUser } from "../services/api";
import { setToken } from "../util/token";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string, navigate: Function) => Promise<void>; // Add navigate as a parameter
  logout: () => void;
  userEmail: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const login = async (email: string, password: string, navigate: Function) => {
    try {
      const response = await loginUser(email, password);
      if (response.status === 200) {
        setIsAuthenticated(true);
        setUserEmail(email);
        const authHeader = response.headers["authorization"];
        const token = authHeader?.split(" ")[1];
        if (token) {
          setToken(token);
        }
        localStorage.setItem("isLoggedIn", String(response.status));
        navigate("/home");
      } else {
        alert("Invalid login credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserEmail(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, userEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
