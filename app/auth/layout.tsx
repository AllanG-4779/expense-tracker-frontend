"use client";
import React, { ReactNode, useContext } from "react";
import { AuthContext } from "../data/context/authContext";
import { useRouter } from "next/navigation";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  if (authContext === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  const { isAuthenticated } = authContext;
  
  if (isAuthenticated) {
    router.push("/account/expenses");
  }

  return (
    <div className="flex h-full flex-col items-center m-20">
      <main className="md:flex h-full md:w-7/12 md:mx-auto items-center md:flex-row md:justify-between w-full ">
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
