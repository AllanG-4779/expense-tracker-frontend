import React from "react";
import { FaCalendar } from "react-icons/fa";

const BudgetComponent: React.FC<{
  name: string;
  category: string;
  allocation: number;
  expenditure: number;
  color: string;
  start: string;
  end: string;
}> = ({ category, expenditure, allocation }) => {
  const expenditurePercent = (expenditure / allocation) * 100;
  const bgColor =
    expenditurePercent < 50
      ? "bg-green-500"
      : expenditurePercent < 80
      ? "bg-yellow-500"
      : "bg-red-500";
  const borderColor =
    expenditurePercent < 50
      ? "border-green-500"
      : expenditurePercent < 80
      ? "border-yellow-500"
      : "border-red-500";
  const textColor =
    expenditurePercent < 50
      ? "text-green-500"
      : expenditurePercent < 80
      ? "text-yellow-500"
      : "text-red-500";
  const bgTextColor =
    expenditurePercent < 50
      ? "bg-green-50"
      : expenditurePercent < 80
      ? "bg-yellow-50"
      : "bg-red-50";

  const statusText =
    expenditurePercent < 50
      ? "ON TRACK"
      : expenditurePercent < 80
      ? "WATCH OUT"
      : "OVER BUDGET";
  const bgWidth = `${expenditurePercent}%`;

  return (
    <div
      className={`flex flex-col bg-white p-6 rounded-md shadow-sm max-w-full md:min-w-95 border-l-4 ${borderColor}`}
    >
      <div className="flex items-center justify-between mb-3 ">
        <div className="flex items-center gap-5">
          <p
            className={`${bgColor} p-2 rounded-md w-10 h-10 flex items-center justify-center  text-white font-bold`}
          >
            {category.charAt(0)}
          </p>
          <p className="font-semibold text-slate-600">{category}</p>
        </div>
        <div
          className={`flex ${textColor} ${bgTextColor}  p-1 rounded-md  items-center gap-1 `}
        >
          <p className=" text-xs font-semibold">{statusText}</p>
        </div>
      </div>
      <div className="flex items-center justify-between mb-3 my-2">
        <div>
          <p className="text-2xl text-slate-600 font-bold ">
            KES {expenditure}
          </p>
        </div>
        <div className="text-slate-600 text-sm flex flex-col self-center relative">
          <p>of KES {allocation}</p>
          <p className="text-xs absolute top-4 right-0 text-gray-500">
            {(expenditure / allocation) * 100}%
          </p>
        </div>
      </div>
      <div className="my-2">
        <div className="w-full bg-gray-200 rounded-full h-1.5 ">
          <div
            className={`${bgColor} h-1.5 rounded-full`}
            style={{ width: bgWidth }}
          ></div>
        </div>
      </div>
      <div className="flex text-gray-500 text-sm items-center justify-between mt-3 my-2">
        <p>KES {allocation - expenditure} remaining</p>
        <p className="text-xs flex items-center gap-1">
          <FaCalendar /> <span>18 days left</span>
        </p>
      </div>
      <div className="flex items-center justify-between mt-3 my-2">
        <button className="cursor-pointer outline-none  text-gray-500  bg-slate-100  p-2 font-semibold rounded-md text-xs">
          Add Expense
        </button>
        <button className="cursor-pointer outline-none  text-gray-500  bg-slate-100  p-2 font-semibold rounded-md text-xs">
          View Details
        </button>
        <button className="cursor-pointer outline-none  text-white p-2 font-semibold bg-slate-800 rounded-md text-xs">
          Adjust Budget
        </button>
      </div>
    </div>
  );
};

export default BudgetComponent;
