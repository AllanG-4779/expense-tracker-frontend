"use client";
import { Token } from "@/app/types/apiTypes";
import { useRouter } from "next/navigation";
import React from "react";

export type AuthContextType = {
  isAuthenticated: boolean;
  logout?: () => void;
  login?: (
    token: Token,
    createUser: { username: string; email: string }
  ) => void;
  user: { username: string; email: string };
  token: Token;
  refreshAuth?: () => boolean;
};

export const AuthContext = React.createContext<AuthContextType | undefined>(
  undefined
);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authPayload, setAuthPayload] = React.useState<
    AuthContextType | undefined
  >();
  const router = useRouter();

  React.useEffect(() => {
    const token = localStorage.getItem("token");

    const user = localStorage.getItem("user");
    if (token && user) {
      setAuthPayload({
        isAuthenticated: true,
        token: JSON.parse(token),
        user: JSON.parse(user),
      });
    }
  }, []);
  const login = (token: Token, user: { username: string; email: string }) => {
    console.log("login", token, user);
    setAuthPayload({
      isAuthenticated: true,
      token: token,
      user: user,
    });
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("user", JSON.stringify(user));
  };

  const refreshAuth = () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      const parsedToken = JSON.parse(token);
      const parsedUser = JSON.parse(user);
      if (parsedToken.expires_at > Math.floor(Date.now() / 1000)) {
        setAuthPayload({
          isAuthenticated: true,
          token: parsedToken,
          user: parsedUser,
        });
      } else {
        setAuthPayload({
          isAuthenticated: false,
          token: { token: "", issued_at: 0, expires_at: 0, valid_for: 0 },
          user: { username: "", email: "" },
        });
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    } else {
      setAuthPayload({
        isAuthenticated: false,
        token: { token: "", issued_at: 0, expires_at: 0, valid_for: 0 },
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
      token: { token: "", issued_at: 0, expires_at: 0, valid_for: 0 },
      user: { username: "", email: "" },
    });

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/auth/signin");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: authPayload?.isAuthenticated || false,
        login,
        logout,
        user: authPayload?.user || { username: "", email: "" },
        token: authPayload?.token || {
          token: "",
          issued_at: 0,
          expires_at: 0,
          valid_for: 0,
        },
        refreshAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
