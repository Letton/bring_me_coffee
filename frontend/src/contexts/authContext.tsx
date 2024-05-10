"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import jwt from "jsonwebtoken";

interface AuthContextType {
  accessToken: string | null;
  user: User | null;
  setAuth: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setAccessToken(token);
      const decodedToken: any = jwt.decode(token);
      const userData: User = {
        id: decodedToken.userId,
        email: decodedToken.email,
        username: decodedToken.username,
        firstname: decodedToken.firstname,
        lastname: decodedToken.lastname,
        role: decodedToken.role,
      };
      setUser(userData);
    }
  }, []);

  const setAuth = (token: string) => {
    localStorage.setItem("access_token", token);
    setAccessToken(token);
    const decodedToken: any = jwt.decode(token);
    const userData: User = {
      id: decodedToken.userId,
      email: decodedToken.email,
      firstname: decodedToken.firstname,
      lastname: decodedToken.lastname,
      username: decodedToken.username,
      role: decodedToken.role,
    };
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ accessToken, user, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
