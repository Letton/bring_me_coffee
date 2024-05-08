import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";

const useAuth = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setAccessToken(token);
      const decodedToken: any = jwt.decode(token);
      const userData: User = {
        id: decodedToken.userId,
        username: decodedToken.username,
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

  return { accessToken, user, setAuth, logout };
};

export default useAuth;
