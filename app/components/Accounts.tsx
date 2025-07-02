"use client";
import React from "react";
import { GrTrain } from "react-icons/gr";
import AppBar from "./AppBar";
import AccountsCard from "./raw/AccountsCard";
import { FaPlus, FaWallet } from "react-icons/fa";
import TableComponent from "./TableComponent";
import { useFetchClient } from "../utils/fetchClient";
import { AuthContext } from "@/app/context/authContext";

import { AppUserContext } from "@/app/context/AppUserContext";
import Modal from "./Modal";
import CardTransactionComponent from "./CardTransactionComponent";

const Accounts = () => {
  const [loading, setLoading] = React.useState(false);
  const authContext = React.useContext(AuthContext);
  const appUserContext = React.useContext(AppUserContext);
  const [show, setShow] = React.useState(false);

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
      <button
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={() => setModal(true)}
        className="fixed flex items-center z-10 justify-center bottom-0 right-5 p-5 bg-amber-600 hover:bg-amber-700 text-white shadow-md text-center rounded-full"
      >
        <FaPlus className="inline flex-shrink-0" />
        <span
          className={`ml-2 whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out ${
            show
              ? "opacity-100 max-w-32 translate-x-0"
              : "opacity-0 max-w-0 -translate-x-2"
          }`}
        >
          Add account
        </span>
      </button>
      {appUserContext.accounts.length > 0 ? (
        <div className="p-2 flex flex-col md:w-11/12 md:mx-auto">
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
          <div className="flex flex-col md:hidden">
            {appUserContext.transactions &&
            appUserContext.transactions.length > 0 ? (
              <CardTransactionComponent
                transactions={appUserContext.transactions!}
              />
            ) : (
              <p>No transactions found for this account.</p>
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <p>No accounts found. Please add an account.</p>
        </div>
      )}
      <Modal status={modal} updater={setModal}>
        <AddAccount token={authContext.token.token} />
      </Modal>
    </>
  );
};

export default Accounts;

const AddAccount: React.FC<{ token: string }> = ({ token }) => {
  const { fetchClient } = useFetchClient();
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
