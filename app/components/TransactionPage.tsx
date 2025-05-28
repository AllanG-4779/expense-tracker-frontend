"use client";
import React, { SetStateAction, useContext } from "react";
import { GrAdd, GrTrain } from "react-icons/gr";
import AppBar from "./AppBar";
import TransactionsCard from "./TransactionsCard";
import Modal from "./Modal";
import { ModalContext } from "../data/context/ModalContext";
import { Transaction } from "../types/apiTypes";

import { AuthContext } from "../data/context/authContext";

import AddTransaction from "./AddTransaction";
import Alert from "./raw/Alert";
import TableComponent from "./TableComponent";
import { AppUserContext } from "../data/context/AppUserContext";

const TransactionPage = () => {
  const data = useContext(ModalContext);
  const [modal, updateModal] = React.useState(false);
  const authContext = useContext(AuthContext);
  const appUserContext = useContext(AppUserContext);
  const [alertStatus, setAlertStatus] = React.useState(false);

  const [message, setMessage] = React.useState<{
    message: string;
    type: string;
  } | null>();

  if (!authContext) {
    throw new Error("AuthContext is not defined");
  }
  if (!appUserContext) {
    throw new Error("AppUserContext is not defined");
  }

  if (data === undefined) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }

  return (
    <>
      <AppBar title="Transactions" icon={<GrTrain />} />

      {appUserContext.transactions && appUserContext.transactions.length > 0 ? (
        <div className="p-4  md:flex flex-col gap-5 ">
          {message && (
            <Alert
              title="Request status!"
              message={message?.message}
              type={message.type}
              open={alertStatus}
              setOpen={setAlertStatus}
            />
          )}
          <div className="flex flex-col gap-2 bg-white rounded-lg p-5">
            <div className="flex flex-row w-full justify-between">
              <div className="flex flex-col md:flex-row gap-2 md:items-center">
                <span className="text-gray-700 font-semibold">Filters:</span>
                <div className="flex  md:flex-row gap-5 items-center">
                  <p>Category</p>
                  <select className="border border-gray-300 rounded-md p-2">
                    <option value="all">All</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                  <p>Date</p>
                  <select className="border border-gray-300 rounded-md p-2">
                    <option value="all">All</option>
                    <option value="today">Today</option>
                    <option value="this_week">This Week</option>
                    <option value="this_month">This Month</option>
                    <option value="this_year">This Year</option>
                  </select>
                </div>{" "}
              </div>
              <button
                onClick={() => updateModal(true)}
                className="bg-[#dc4b3e] md:flex hidden text-white font-bold  rounded-md p-2   items-center gap-2"
              >
                <GrAdd /> <span className="d">Add transaction</span>
              </button>
            </div>
            <div className="p-4 md:hidden">
              {appUserContext.transactions &&
                appUserContext.transactions!.map((trx, id) => (
                  <TransactionsCard key={id} transaction={trx} />
                ))}
            </div>
            <TableComponent
              transactions={appUserContext.transactions!}
              accounts={appUserContext.accounts!}
              deleteTrasaction={appUserContext.deleteTransaction!}
              fetchTransactions={() =>
                appUserContext.fetchTransactions!(authContext.token.token)
              }
            />
          </div>
          <Modal status={modal} updater={updateModal}>
            <AddTransaction
              onSuccess={() => {
                updateModal(false);
              }}
            />
          </Modal>
        </div>
      ) : (
        <div>
          <div className="flex justify-center items-center h-screen">
            <button
              onClick={() => updateModal(true)}
              className="bg-[#dc4b3e] md:flex hidden text-white font-bold  rounded-md p-2   items-center gap-2"
            >
              <GrAdd /> <span className="d">Add transaction</span>
            </button>
          </div>
          <Modal status={modal} updater={updateModal}>
            <AddTransaction
              onSuccess={() => {
                updateModal(false);
              }}
            />
          </Modal>
        </div>
      )}
    </>
  );
};

// update/delte options
export const CardComponent: React.FC<{
  updater: React.Dispatch<SetStateAction<boolean>>;
  open: boolean;
  transaction?: Transaction;
  transactionId: number;
  refreshTransactions?: () => void;
  onDelete: (id: number) => void;
}> = ({
  open,
  updater,
  transaction,
  onDelete,
  transactionId,
  refreshTransactions,
}) => {
  const [modal, setModal] = React.useState(false);

  return (
    <div
      onClick={() => {
        updater((prev) => !prev);
      }}
      className={`${
        open ? "flex" : "hidden"
      }  flex-col gap-2 bg-white rounded-lg p-5 absolute top-0  shadow-lg z-10`}
    >
      <p className="" onClick={() => setModal(true)}>
        Edit
      </p>
      <p onClick={() => onDelete(transactionId)}>Delete</p>
      <Modal status={modal} updater={setModal}>
        <AddTransaction
          existingTransaction={transaction}
          action="update"
          onSuccess={() => {
            setModal(false);
            refreshTransactions!();
          }}
        />
      </Modal>
    </div>
  );
};

export default TransactionPage;
