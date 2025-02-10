import React, { createContext, useContext, useState } from "react";
import { loginUser } from "../services/api";

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
      console.log("response", response);
      if (response.status === 200) {
        setIsAuthenticated(true);
        setUserEmail(email);
        navigate("/home"); // Navigate to the home page after successful login
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
