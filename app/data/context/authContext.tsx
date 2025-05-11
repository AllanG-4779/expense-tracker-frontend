"use client";
import React from "react";

export type AuthContextType = {
  isAuthenticated: boolean;
  logout: () => void;
  login: (
    token: string,
    createUser: { username: string; email: string }
  ) => void;
  user: { username: string; email: string };
  token: string;
};

export const AuthContext = React.createContext<AuthContextType | undefined>(
  undefined
);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState<{ username: string; email: string }>({
    username: "",
    email: "",
  });
  const [token, setToken] = React.useState("");
  const login = (token: string, user: { username: string; email: string }) => {
    console.log("login", token, user);
    setIsAuthenticated(true);
    setUser({ username: user.username, email: user.email });
    setToken(token);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser({ username: "", email: "" });
    setToken("");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, user, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
