"use client";
import React, { SetStateAction, useContext, useState } from "react";
import { GrAdd, GrTrain } from "react-icons/gr";
import AppBar from "./AppBar";
import Modal from "./Modal";
import { ModalContext } from "@/app/context/ModalContext";
import { Transaction } from "../types/apiTypes";

import { AuthContext } from "@/app/context/authContext";

import AddTransaction from "./AddTransaction";
import Alert from "./raw/Alert";
import TableComponent from "./TableComponent";
import { AppUserContext } from "@/app/context/AppUserContext";
import CardTransactionComponent from "./CardTransactionComponent";

const TransactionPage = () => {
  const data = useContext(ModalContext);
  const [modal, updateModal] = React.useState(false);
  const authContext = useContext(AuthContext);
  const appUserContext = useContext(AppUserContext);
  const [alertStatus, setAlertStatus] = React.useState(false);
  const [filters, toogleFilters] = useState(false);

  const [message] = React.useState<{
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
          <div className="flex flex-col gap-2">
            <div className="flex flex-row w-full justify-between items-center">
              <div className="flex flex-col gap-2 justify-end w-full rounded-md cursor-pointer">
                <button
                  onClick={() => toogleFilters((prev) => !prev)}
                  className="text-sm font-semibold bg-[#dc4b3e] p-1.5 md:hidden  rounded-md text-white"
                >
                  {filters ? "Hide Filters" : "Show Filters"}
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out transform ${
                    filters
                      ? "max-h-[500px] opacity-100 scale-y-100"
                      : "max-h-0 opacity-0 scale-y-95"
                  } p-4 rounded-lg origin-top md:max-h-[500px] md:opacity-100 md:scale-y-100`}
                >
                  <FilterCard />
                </div>
              </div>

              <button
                onClick={() => updateModal(true)}
                className="bg-[#dc4b3e] fixed  hover:rotate-45 transition-all duration-100 shadow-lg rounded-full z-50 bottom-2 right-5  text-white font-bold   p-2  items-center gap-2"
              >
                <GrAdd className="text-4xl" />
              </button>
            </div>
            <div className="p-4 md:hidden">
              <CardTransactionComponent
                transactions={appUserContext.transactions!}
              />
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

export const FilterCard = () => {
  return (
    <div className="rounded-lg mx-auto ">
      <h2 className="text-lg font-semibold mb-4">Filter Transactions</h2>
      <form className="flex flex-col gap-4">
        <div className="flex w-full gap-4 ">
          <div className="flex flex-col w-full">
            <label htmlFor="" className="text-slate-600">
              MONTH
            </label>
            <select className="border border-slate-200 p-2 text-slate-500 outline-none bg-slate-200 rounded-md">
              <option value="">Select Month</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="" className="text-slate-600">
              YEAR
            </label>
            <select className="border text-slate-500  border-slate-200 p-2 outline-none bg-slate-200 rounded-md">
              <option value="">Select Year</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
            </select>
          </div>
        </div>
        <div className="flex w-full gap-4 ">
          <div className="flex flex-col w-full">
            <label htmlFor="" className="text-slate-600">
              CATEGORY
            </label>
            <select className="border border-slate-200 p-2 text-slate-500 outline-none bg-slate-200 rounded-md">
              <option value="category">HEALTH</option>
              <option value="category">MAINTER</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="" className="text-slate-600">
              AMOUNT
            </label>
            <select className="border text-slate-500  border-slate-200 p-2 outline-none bg-slate-200 rounded-md">
              <option value="">Select Amount</option>
              <option value="2023">0-100</option>
              <option value="2022">100-500</option>
              <option value="2021">500-1000</option>
              <option value="2020">1000-5000</option>
              <option value="2020">Over 5000</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col md:flex-row  items-center w-full gap-5">
          <input
            type="text"
            className="border w-full md:w-4/12 border-slate-200 p-2 rounded-md bg-slate-200"
            placeholder="search..."
          />
          <button className="w-full bg-gray-500 font-semibold md:w-1/12 text-white p-2 rounded-md text-sm  ">
            Clear Filters
          </button>
          <button className="w-full bg-[#dc4b3e] font-semibold md:w-1/12 text-white p-2 rounded-md text-sm  ">
            Apply Filters
          </button>
          <button className="w-full bg-green-500 font-semibold md:w-1/12 text-white p-2 rounded-md text-sm  ">
            Export CSV
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionPage;
