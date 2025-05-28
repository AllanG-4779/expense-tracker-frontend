"use client";
import React from "react";
import { GrTrain } from "react-icons/gr";
import AppBar from "./AppBar";
import AccountsCard from "./raw/AccountsCard";
import { FaWallet } from "react-icons/fa";
import TableComponent from "./TableComponent";
import { fetchClient } from "../utils/fetchClient";
import { AuthContext } from "../data/context/authContext";

import { AppUserContext } from "../data/context/AppUserContext";
import Modal from "./Modal";

const Accounts = () => {
  const [loading, setLoading] = React.useState(false);
  const authContext = React.useContext(AuthContext);
  const appUserContext = React.useContext(AppUserContext);
  const [modal, setModal] = React.useState(false);
  if (!authContext || !appUserContext) {
    throw new Error("AuthContext is not defined");
  }

  const filterAccountTransactions = async (accountId: number) => {
    setLoading(true);
    await appUserContext.fetchTransactions!(authContext.token.token, {
      page: 0,
      size: 100,
      account_id: accountId,
    });
    setLoading(false);
  };

  return (
    <>
      <AppBar title="Accounts" icon={<GrTrain />} />
      {appUserContext.accounts.length > 0 ? (
        <div className="p-2 flex flex-col md:w-10/12 md:mx-auto">
          <p>Current active Accounts</p>
          <div className="flex flex-col md:flex-row gap-10 mt-5 md:items-center w-full md:mx-auto flex-wrap">
            {appUserContext.accounts.map((account) => (
              <AccountsCard
                id={account.ID}
                update={async () => await filterAccountTransactions(account.ID)}
                key={account.ID}
                name={account.Name}
                opening={account.Balance}
                balance={account.Balance}
                icon={<FaWallet />}
              />
            ))}
          </div>
          <div className="mt-5">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <TableComponent
                transactions={appUserContext.transactions!}
                accounts={appUserContext.accounts!}
                fetchTransactions={async () =>
                  await appUserContext.fetchTransactions!(
                    authContext.token.token
                  )
                }
                deleteTrasaction={async (id: number) =>
                  await appUserContext.deleteTransaction!(id)
                }
              />
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <p>No accounts found. Please add an account.</p>
          <button
            onClick={() => setModal(true)}
            className="ml-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            Add Account
          </button>
          <Modal status={modal} updater={setModal}>
            <AddAccount token={authContext.token.token} />
          </Modal>
        </div>
      )}
    </>
  );
};

export default Accounts;

const AddAccount: React.FC<{ token: string }> = ({ token }) => {
  const addAccount = async (accountName: string) => {
    const response = await fetchClient<{ message: string; error: string }>(
      "/api/v1/users/activate",
      { name: accountName, balance: 0 },
      "POST",
      true,
      token
    );
    if (response.message) {
      console.log("Account added successfully:", response);
    } else {
      console.error("Error adding account:", response.message);
    }
  };

  const [accountName, setAccountName] = React.useState("");
  return (
    <div className="flex justify-center items-center bg-white rounded-md p-5 ">
      <div>
        <h1 className="text-2xl font-bold mb-4 text-[#dc4b3e]">Add Account</h1>
        <form className="flex flex-col gap-4 w-96">
          <input
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dc4b3e] transition duration-200"
            type="text"
            placeholder="Account Name"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
          />

          <button
            className="bg-[#dc4b3e] text-white py-2 rounded transition cursor-pointer duration-200"
            onClick={() => addAccount(accountName)}
          >
            Add Account
          </button>
        </form>
      </div>
    </div>
  );
};


