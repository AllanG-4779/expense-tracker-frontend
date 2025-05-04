"use client";
import React from "react";
import { GrActions } from "react-icons/gr";
import AppBar from "./AppBar";
import LineGraph from "./LineGraph";
import TableComponent from "./TableComponent";
import CardComponent from "./CardComponent";
import { BiMoney } from "react-icons/bi";
import DoughnutChart from "./raw/DoughnutChart";
import { MdBalance, MdInterests } from "react-icons/md";
import { GiExpense } from "react-icons/gi";

const data = [
  {
    id: 1,
    name: "Income",
    amount: 8000,
    currency: "KES",
    icon: <BiMoney />,
  },
  {
    id: 2,
    name: "Expenses",
    amount: 6300,
    currency: "KES",
    icon: <GiExpense />,
  },
  {
    id: 3,
    name: "Balance",
    amount: 4500,
    currency: "KES",
    icon: <MdBalance />,
  },
  {
    id: 4,
    name: "Savings",
    amount: 10500,
    currency: "KES",
    icon: <MdInterests />,
  },
];

const Expense = () => {
  return (
    <div className="flex flex-col w-full">
      <AppBar title="Expenses" icon={<GrActions />} />
      <div className="flex md:flex-row flex-col gap-10  p-5 h-full">
        <div className="flex flex-col gap-3 md:flex-8/12">
          <div className="flex-1/2">
            <LineGraph />
          </div>
          <div className="flex-1/2">
            {" "}
            <TableComponent />
          </div>
        </div>
        <div className="flex flex-col gap-5 max-w-full flex-4/12">
          <div className="flex gap-5 items-center ">
            <div className="flex gap-2">
              <p className="font-semibold">Month</p>
              <select name="month" id="">
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
              </select>
            </div>
            <div className="flex gap-2 items-center ">
              <p className="font-semibold">Year</p>
              <select name="year" id="">
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
            </div>
          </div>
          {data.map((datas, id) => (
            <CardComponent
              key={id}
              name={datas.name}
              amount={datas.amount}
              currency={datas.currency}
              icon={datas.icon}
            />
          ))}
          <DoughnutChart />
        </div>
      </div>
    </div>
  );
};

export default Expense;
