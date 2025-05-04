import { format } from "date-fns";
import React from "react";

const BudgetComponent: React.FC<{
  name: string;
  category: string;
  allocation: number;
  expenditure: number;
  start: string;
  end: string;
}> = ({ name, category, expenditure, allocation, start, end }) => {
  const expenditurePercent = (expenditure / allocation) * 100;
  const bgColor =
    expenditurePercent < 50
      ? "bg-green-500"
      : expenditurePercent < 80
      ? "bg-yellow-500"
      : "bg-red-500";
  const bgColorText = bgColor.replace("bg-", "text-");
  const bgWidth = `${expenditurePercent}%`;
  const isCompleted = new Date(end) < new Date();
  return (
    <div className="flex flex-col bg-white p-5 rounded-md shadow-md max-w-full md:min-w-95 ">
      <div>
        <p className="text-2xl font-semibold text-gray-600">{name}</p>
        <p className="text-slate-400">Category: {category}</p>
        <div className="h-[0.5px] bg-slate-300 mt-5 "></div>
      </div>
      <div className="mt-5 flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <p className=" text-md ">Budget:</p>
          <p className="text-xl font-bold text-[#dc4b3e]">
            KES {allocation.toLocaleString("en-US")}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-md">Remaining:</p>
          <p className={`text-xl text-green-500 font-bold ${bgColorText}`}>
            KES {(allocation - expenditure).toLocaleString("en-US")}
          </p>
        </div>
      </div>
      <div className="mt-5 flex flex-col">
        <p>Utilization: {((expenditure / allocation) * 100).toPrecision(4)}%</p>
        <div className={`h-2 bg-gray-200 rounded-full w-full mt-2  relative`}>
          <div
            className={`h-2 rounded-full absolute top-0 left-0 ${bgColor}`}
            style={{ width: bgWidth }}
          ></div>
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <p className="text-sm text-slate-400">
            {format(new Date(start), "MMM d, yyyy")} -{" "}
          </p>
          <p className="text-sm text-slate-400">{format(end, "MMM d, yyyy")}</p>
        </div>
        <div>
          <div
            className={`w-fit flex items-center gap-2 ${
              isCompleted ? "bg-red-500" : "bg-[#dc4b3e]"
            } text-white  rounded-md px-2`}
          >
            <p className={`font-bold text-sm`}>
              {isCompleted ? "Finished" : "In Progress"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetComponent;
