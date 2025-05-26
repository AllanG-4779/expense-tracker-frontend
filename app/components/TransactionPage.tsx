"use client";
import React, { SetStateAction, useContext, useEffect } from "react";
import { GrAdd, GrTrain } from "react-icons/gr";
import AppBar from "./AppBar";
import TransactionsCard from "./TransactionsCard";
import Modal from "./Modal";
import { ModalContext } from "../data/context/ModalContext";
import { Transaction, TransactionResponse } from "../types/apiTypes";
import { fetchClient } from "../utils/fetchClient";
import { AuthContext } from "../data/context/authContext";

import { MdMoreVert } from "react-icons/md";
import AddTransaction from "./AddTransaction";
import Alert from "./raw/Alert";

const TransactionPage = () => {
  const data = useContext(ModalContext);
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [modal, updateModal] = React.useState(false);
  const [active, setActive] = React.useState<Transaction | null>(null);
  const authContext = useContext(AuthContext);
  const [alertStatus, setAlertStatus] = React.useState(false);

  const [message, setMessage] = React.useState<{
    message: string;
    type: string;
  } | null>();

  if (!authContext) {
    throw new Error("AuthContext is not defined");
  }

  if (data === undefined) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }

  // Update transaction
  const deleteTransaction = async (id: number) => {
    setTransactions((prev) =>
      prev.filter((transaction) => transaction.ID !== id)
    );
    const response = await fetchClient<{ message: string }>(
      `/api/v1/users/delete/transaction`,
      { id },
      "DELETE",
      true,
      authContext.token.token
    );
    setLoading(false);
    if (response.message) {
      setMessage({ message: response.message, type: "fail" });
      return;
    }
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      const response = await fetchClient<TransactionResponse>(
        "/api/v1/users/get/transactions",
        { page: 0, size: 10 },
        "POST",
        true,
        authContext.token.token
      );
      setLoading(false);
      if (!response) {
        setMessage({
          message: "Failed to fetch transactions",
          type: "success",
        });
        setAlertStatus(true);
        setTimeout(() => {
          setAlertStatus(false);
        }, 3000);
        return;
      }
      if (response.error) {
        return;
      }
      if (response.message) {
        setTransactions(response.transactions);
      }
    };

    fetchTransactions();
  }, [transactions.length, message]);
  if (loading) {
    return (
      <div className="flex h-screen mx-auto items-center  w-[70%] md:w-1/2">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <AppBar title="Transactions" icon={<GrTrain />} />

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
        {/*Filters*/}
        {/* <p className="font-bold text-xl ">Summary</p>
        <div className="w-full m:w-[65%] md:mx-auto mb-5 justify-around flex flex-col md:flex-row gap-5 items-center ">
          <CardComponent
            name="Total"
            amount={8000}
            icon={<BiMoney />}
            currency="KES"
          />
          <CardComponent
            name="Money In"
            amount={8000}
            icon={<GiExpense />}
            currency="KES"
          />
          <CardComponent
            name="Money Out"
            amount={8000}
            icon={<GiExpense />}
            currency="KES"
          />
        </div> */}
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
            {transactions.map((trx, id) => (
              <TransactionsCard key={id} transaction={trx} />
            ))}
          </div>
          <div className="bg-white p-4 hidden md:flex md:flex-col">
            <p className="font-bold text-xl mb-4">Transactions</p>
            <table className="w-full border-collapse  table-auto">
              <thead>
                <tr>
                  <th className="tracking-wider text-left p-3 text-sm">
                    Title
                  </th>
                  <th className="tracking-wider text-left p-3 text-sm">
                    Description
                  </th>
                  <th className="tracking-wider text-left p-3 text-sm">
                    Amount
                  </th>
                  <th className="tracking-wider text-left p-3 text-sm">Date</th>
                  <th className="tracking-wider text-left p-3 text-sm">
                    Category
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((trx) => (
                  <tr
                    key={trx.ID}
                    className={`${trx.ID % 2 === 0 ? "bg-gray-100" : ""}`}
                  >
                    <td className="p-3 text-sm text-gray-700 border-b-1 border-slate-100">
                      {trx.Title}
                    </td>
                    <td className="p-3 text-sm text-gray-700 border-b-1 border-slate-100">
                      {trx.Description}
                    </td>
                    <td className="p-3 text-sm text-gray-700 border-b-1 border-slate-100">
                      {trx.Amount}
                    </td>
                    <td className="p-3 text-sm text-gray-700 border-b-1 border-slate-100">
                      {trx.Date}
                    </td>
                    <td className="p-3 text-sm text-gray-700 border-b-1 border-slate-100">
                      {trx.Category.Name}
                    </td>
                    <td
                      className="p-3 t`ext-sm text-gray-700 border-b-1 border-slate-100 cursor-pointer relative"
                      onClick={() => setOpen(true)}
                      onMouseLeave={() => setOpen(false)}
                    >
                      {
                        <MdMoreVert
                          className="text-2xl"
                          onClick={() => setActive(trx)}
                        />
                      }
                      {active?.ID === trx.ID && (
                        <CardComponent
                          updater={setOpen}
                          open={open}
                          transaction={trx}
                          transactionId={trx.ID}
                          onDelete={deleteTransaction}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Modal status={modal} updater={updateModal}>
          <AddTransaction />
        </Modal>
      </div>
    </>
  );
};
// update/delte options
const CardComponent: React.FC<{
  updater: React.Dispatch<SetStateAction<boolean>>;
  open: boolean;
  transaction?: Transaction;
  transactionId: number;
  onDelete: (id: number) => void;
}> = ({ open, updater, transaction, onDelete, transactionId }) => {
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
        <AddTransaction existingTransaction={transaction} action="update" />
      </Modal>
    </div>
  );
};

export default TransactionPage;
