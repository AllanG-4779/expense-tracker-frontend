"use client";
import React, { ReactNode, useContext, useEffect } from "react";
import SideBar from "../components/SideBar";
import ModalProvider from "../data/context/ModalContext";
import { AuthContext } from "../data/context/authContext";
import { useRouter } from "next/navigation";
import AppUserProvider from "../data/context/AppUserContext";

const AccountLayout = ({ children }: { children: ReactNode }) => {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  if (authContext === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  useEffect(() => {
    if (authContext.refreshAuth !== undefined) {
      authContext.refreshAuth();
    }
    if (authContext.isAuthenticated === false) {
      router.push("/auth/signin");
    }
  }, []);

  // console.log("isAuthenticated", authContext);
  // if (!authContext.isAuthenticated) {
  //   console.log("User is not authenticated");
  //   setTimeout(() => {
  //     router.push("/auth/signin");
  //   }, 2000);
  //   return (
  //     <div className="flex h-screen mx-auto items-center  w-[70%] md:w-1/2">
  //       <Alert
  //         title="Logging you out"
  //         message="Redirecting to login page"
  //         type="failed"
  //       />
  //     </div>
  //   );
  // }

  return (
    <AppUserProvider>
      <ModalProvider>
        <div className="flex max-h-screen md:flex-row ">
          <SideBar />
          <main className="h-full w-full md:ml-64  ">{children}</main>
        </div>
      </ModalProvider>
    </AppUserProvider>
  );
};

export default AccountLayout;
