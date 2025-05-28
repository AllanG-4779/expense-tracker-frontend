"use client";
import React, { ReactNode, useContext, useEffect } from "react";
import SideBar from "../components/SideBar";
import ModalProvider from "../data/context/ModalContext";
import { AuthContext } from "../data/context/authContext";
import { usePathname, useRouter } from "next/navigation";
import { AppUserContext } from "../data/context/AppUserContext";
import { AccountResponse } from "../types/apiTypes";
import { fetchClient } from "../utils/fetchClient";

const AccountLayout = ({ children }: { children: ReactNode }) => {
  const authContext = useContext(AuthContext);
  const appUserContext = useContext(AppUserContext);
  const currentPath = usePathname();
  const router = useRouter();
  if (authContext === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  if (appUserContext === undefined) {
    throw new Error("useAppUserContext must be used within an AppUserProvider");
  }

  // fetch user accounts and save to context

  const fetchAccounts = async () => {
    const response = await fetchClient<AccountResponse>(
      "/api/v1/users/get/accounts",
      {},
      "GET",
      true,
      authContext.token.token
    );
    console.log("Response:", response); // Debugging line

    if (response.accounts && response.accounts.length > 0) {
      console.log("Accounts fetched successfully:", response.accounts);

      appUserContext.setAccounts(response.accounts);
    } else {
      console.log("Accounts fetched successfully:", response.message);
      appUserContext.setAccounts([]);
    }
  };

  useEffect(() => {
    if (authContext.refreshAuth !== undefined) {
      authContext.refreshAuth();
    }
    if (authContext.isAuthenticated === false) {
      router.push("/auth/signin?redirect=" + currentPath);
      return;
    }
    if (appUserContext.accounts.length === 0) {
      fetchAccounts();
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
    <ModalProvider>
      <div className="flex max-h-screen md:flex-row ">
        <SideBar />
        <main className="h-full w-full md:ml-64  ">{children}</main>
      </div>
    </ModalProvider>
  );
};

export default AccountLayout;
