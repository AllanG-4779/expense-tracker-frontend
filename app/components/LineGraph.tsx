"use client";
import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  PointElement,
  LinearScale,
  Title,
  BarElement,
  Tooltip,
  LineElement,
} from "chart.js";

import { Line } from "react-chartjs-2";
import { GraphDataItem } from "../types/apiTypes";

ChartJS.register(
  CategoryScale,
  PointElement,
  LinearScale,
  Title,
  LineElement,
  BarElement,
  Tooltip
);

const ExpenseTag: React.FC<{ data?: GraphDataItem[] }> = ({ data }) => {
  const [parameter, setParameter] = useState("weekly");

  return (
    <div className="flex flex-col gap-4 max-w-full bg-white p-4 rounded-lg">
      <div id="title" className="flex justify-between ">
        <p className="font-medium text-xl">Expense Overview</p>
        <div className="">
          <ul className="flex gap-4">
            <li
              className={`cursor-pointer ${
                parameter.startsWith("week") ? "bg-slate-200" : ""
              } hover:bg-slate-200 font-medium  transition-all duration-75 p-2 text-sm rounded-md `}
              onClick={() => setParameter("weekly")}
            >
              Week
            </li>
            <li
              className={`cursor-pointer ${
                parameter.startsWith("month") ? "bg-slate-200" : ""
              } hover:bg-slate-200 font-medium  transition-all duration-75 p-2 text-sm rounded-md `}
              onClick={() => setParameter("monthly")}
            >
              Month
            </li>
            <li
              className={`cursor-pointer  parameter.startsWith("month") ? "bg-slate-200" : "" hover:bg-slate-200 font-medium  transition-all duration-75 p-2 text-sm rounded-md `}
              onClick={() => setParameter("yearly")}
            >
              Year
            </li>
          </ul>
        </div>
      </div>
      <Line data={getExpenseGraphData("", data)} />
    </div>
  );
};

export default ExpenseTag;

export const getExpenseGraphData = (
  parameter: string,
  data?: GraphDataItem[]
) => {
  return {
    labels: data!.map((item) => item.date.substring(0, 10)), // Assuming date is in YYYY-MM-DD format
    datasets: [
      {
        label: "Income",
        data: data!
          .filter((each) => each.type == "income")
          .map((item) => item.amount),
        borderColor: "rgba(34, 197, 94, 0.2)",
        backgroundColor: "rgba(34, 197, 94, 0.5)",
        fill: true,
      },
      {
        label: "Expenses",
        data: data!
          .filter((each) => each.type == "expense")
          .map((item) => item.amount),
        borderColor: "rgba(239, 68, 68, 0.2)",
        backgroundColor: "rgba(239, 68, 68, 0.5)",
        fill: true,
      },
    ],
  };
};
