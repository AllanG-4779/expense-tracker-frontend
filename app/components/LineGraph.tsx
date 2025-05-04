"use client";
import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  LineElement,
} from "chart.js";

import { Line } from "react-chartjs-2";
import { getGraphData } from "../data/static";

ChartJS.register(
  CategoryScale,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  LineElement
);

const ExpenseTag = () => {
  const [parameter, setParameter] = useState("weekly");
  const options = {};

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
      <Line
        data={getGraphData(
          parameter,
          parameter === "weekly"
            ? weeklyData()
            : parameter === "monthly"
            ? monthlyData()
            : yearlyData()
        )}
        options={options}
      />
    </div>
  );
};

export default ExpenseTag;

const monthlyData = () => {
  const data = [];
  for (let i = 0; i < new Date().getDate(); i++) {
    data.push(Math.floor(Math.random() * 1000));
  }
  return data;
};
const weeklyData = () => {
  const data = [];
  for (let i = 0; i < 7; i++) {
    data.push(Math.floor(Math.random() * 1000));
  }
  return data;
};
const yearlyData = () => {
  const data = [];
  for (let i = 0; i < 12; i++) {
    data.push(Math.floor(Math.random() * 1000));
  }
  return data;
};
