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

 

  useEffect(() => {
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
    if (authContext.refreshAuth !== undefined) {
      authContext.refreshAuth();
    }
    if (!authContext.isAuthenticated) {
      router.push("/auth/signin?redirect=" + currentPath);
      return;
    }
    if (appUserContext.accounts.length === 0) {
       fetchAccounts()
           .then (()=>{
            console.log("Accounts fetched and set in context");
           })
        .catch((error) => {
          console.error("Error fetching accounts:", error);
        });
    }
  }, [appUserContext, appUserContext.accounts.length, authContext, currentPath, router]);



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
