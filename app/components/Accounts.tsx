"use client";
import React from "react";
import { GrTrain } from "react-icons/gr";
import AppBar from "./AppBar";
import AccountsCard from "./raw/AccountsCard";
import { FaWallet } from "react-icons/fa";
import TableComponent from "./TableComponent";
import { fetchClient } from "../utils/fetchClient";
import { AuthContext } from "../data/context/authContext";
import { AccountResponse } from "../types/apiTypes";
import { AppUserContext } from "../data/context/AppUserContext";

const Accounts = () => {
  const [loading, setLoading] = React.useState(false);
  const authContext = React.useContext(AuthContext);
  const appUserContext = React.useContext(AppUserContext);
  if (!authContext || !appUserContext) {
    throw new Error("AuthContext is not defined");
  }
  React.useEffect(() => {
    if (authContext.refreshAuth !== undefined) {
      authContext.refreshAuth();
    }
    const fetchAccounts = async () => {
      setLoading(true);
      const response = await fetchClient<AccountResponse>(
        "/api/v1/users/get/accounts",
        {},
        "GET",
        true,
        authContext.token.token
      );
      console.log("Response:", response); // Debugging line
      setLoading(false);
      if (response.accounts.length > 0) {
        console.log("Accounts fetched successfully:", response.accounts);

        appUserContext.setAccounts(response.accounts);
      } else {
        console.log("Accounts fetched successfully:", response.message);
        appUserContext.setAccounts([]);
      }
    };
    fetchAccounts();
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }
  if (appUserContext.accounts.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>No accounts found</p>
      </div>
    );
  }

  return (
    <>
      <AppBar title="Accounts" icon={<GrTrain />} />
      <div className="p-2 flex flex-col md:w-10/12 md:mx-auto">
        <p>Current active Accounts</p>
        <div className="flex flex-col md:flex-row gap-2 mt-5 justify-between md:items-center w-full md:mx-auto flex-wrap">
          {appUserContext.accounts.map((account) => (
            <AccountsCard
              key={account.ID}
              name={account.Name}
              opening={account.Balance}
              balance={account.Balance}
              icon={<FaWallet />}
            />
          ))}
        </div>
        <div className="mt-5">
          <TableComponent />
        </div>
      </div>
    </>
  );
};

export default Accounts;
