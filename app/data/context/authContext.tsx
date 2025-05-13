"use client";
import React from "react";

export type AuthContextType = {
  isAuthenticated: boolean;
  logout?: () => void;
  login?: (
    token: string,
    createUser: { username: string; email: string }
  ) => void;
  user: { username: string; email: string };
  token: string;
  refreshAuth?: () => boolean;
};

export const AuthContext = React.createContext<AuthContextType | undefined>(
  undefined
);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authPayload, setAuthPayload] = React.useState<
    AuthContextType | undefined
  >();

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      setAuthPayload({
        isAuthenticated: true,
        token: token,
        user: JSON.parse(user),
      });
    }
  }, []);
  const login = (token: string, user: { username: string; email: string }) => {
    console.log("login", token, user);
    setAuthPayload({
      isAuthenticated: true,
      token: token,
      user: user,
    });
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const refreshAuth = () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      setAuthPayload({
        isAuthenticated: true,
        token: token,
        user: JSON.parse(user),
      });
    } else {
      setAuthPayload({
        isAuthenticated: false,
        token: "",
        user: { username: "", email: "" },
      });
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    return authPayload?.isAuthenticated || false;
  };
  const logout = () => {
    setAuthPayload({
      isAuthenticated: false,
      token: "",
      user: { username: "", email: "" },
    });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: authPayload?.isAuthenticated || false,
        login,
        logout,
        user: authPayload?.user || { username: "", email: "" },
        token: authPayload?.token || "",
        refreshAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
