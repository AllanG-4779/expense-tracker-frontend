"use client";
import React, { ReactNode, useContext, useEffect } from "react";
import { AuthContext } from "../data/context/authContext";
import { useRouter, useSearchParams } from "next/navigation";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const authContext = useContext(AuthContext);
  const router = useRouter(); 
   const search = useSearchParams();
  if (authContext === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  useEffect(() => {
    const { isAuthenticated } = authContext;
  
    const redirect = search.get("redirect");
    if (redirect) {
      if (isAuthenticated) {
        router.push(redirect);
        return;
      }

      if (isAuthenticated) {
        router.push("/account/expenses");
      }
    }
  }, []);

  return (
    <div className="flex h-full flex-col items-center m-20">
      <main className="md:flex h-full md:w-7/12 md:mx-auto items-center md:flex-row md:justify-between w-full ">
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
