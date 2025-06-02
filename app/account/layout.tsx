"use client";
import React, {ReactNode, useContext, useEffect} from "react";
import SideBar from "../components/SideBar";
import ModalProvider from "@/app/context/ModalContext";
import {AuthContext} from "@/app/context/authContext";
import {usePathname, useRouter} from "next/navigation";
import {AppUserContext} from "@/app/context/AppUserContext";
import {AccountResponse} from "../types/apiTypes";
import {useFetchClient} from "../utils/fetchClient";

const AccountLayout = ({children}: { children: ReactNode }) => {
    const authContext = useContext(AuthContext);
    const appUserContext = useContext(AppUserContext);
    const currentPath = usePathname();
    const router = useRouter();
    const {fetchClient} = useFetchClient()
    if (authContext === undefined) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    if (appUserContext === undefined) {
        throw new Error("useAppUserContext must be used within an AppUserProvider");
    }

    useEffect(() => {
        const fetchAccounts = async () => {
            const localCall = await  fetchClient<AccountResponse>(
                "/api/v1/users/get/accounts",
                {},
                "GET",
                true,
                authContext.token.token,
                {showLoader:true}
            );
            console.log("Response:", localCall); // Debugging line
            const response = localCall.body!

            if (localCall.successful && response.accounts && response.accounts.length > 0) {
                console.log("Accounts fetched successfully:", response.accounts);
                appUserContext.setAccounts(response.accounts);
            } else {
                console.log("Account not fetched:", localCall.message);
                appUserContext.setAccounts([]);
            }
        };
        if (!authContext.isAuthenticated) {
            router.push("/auth/signin?redirect=" + currentPath);
            return;
        }

            fetchAccounts()
                .then(() => {
                    console.log("Accounts fetched and set in context");
                })
                .catch((error) => {
                    console.error("Error fetching accounts:", error);
                });

    }, []);


    return (
        <ModalProvider>
            <div className="flex max-h-screen md:flex-row ">
                <SideBar/>
                <main className="h-full w-full md:ml-64  ">{children}</main>
            </div>
        </ModalProvider>
    );
};

export default AccountLayout;
