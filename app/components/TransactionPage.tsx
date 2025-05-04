"use client";
import React, { useContext } from "react";
import { GrAdd, GrTrain } from "react-icons/gr";
import AppBar from "./AppBar";
import TransactionsCard from "./TransactionsCard";
import Modal from "./Modal";
import { ModalContext } from "../data/context/ModalContext";

const TransactionPage = () => {
  const data = useContext(ModalContext);
  if (data === undefined) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  const { openModal } = data;

  return (
    <>
      <AppBar title="Transactions" icon={<GrTrain />} />

      <div className="p-4  md:flex flex-col gap-5 ">
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
              onClick={openModal}
              className="bg-[#dc4b3e] md:flex hidden text-white font-bold  rounded-md p-2   items-center gap-2"
            >
              <GrAdd /> <span className="d">Add transaction</span>
            </button>
          </div>
          <div className="p-4 md:hidden">
            {[1, 2, 3, 4, 5, 6, 7].map((_, id) => (
              <TransactionsCard key={id} />
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
                {[1, 2, 3, 4, 5].map((_, id) => (
                  <tr
                    key={id}
                    className={`${id % 2 === 0 ? "bg-gray-100" : ""}`}
                  >
                    <td className="p-3 text-sm text-gray-700 border-b-1 border-slate-100">
                      FOOD
                    </td>
                    <td className="p-3 text-sm text-gray-700 border-b-1 border-slate-100">
                      Supper food
                    </td>
                    <td className="p-3 text-sm text-gray-700 border-b-1 border-slate-100">
                      Bought food for supper
                    </td>
                    <td className="p-3 text-sm text-gray-700 border-b-1 border-slate-100">
                      889
                    </td>
                    <td className="p-3 text-sm text-gray-700 border-b-1 border-slate-100">
                      17 mar 2025
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Modal />
      </div>
    </>
  );
};

export default TransactionPage;
