import React from "react";
import { CgArrowTopLeftO } from "react-icons/cg";
import { FaAngleRight } from "react-icons/fa";

const BudgetComponent: React.FC<{
  name: string;
  category: string;
  allocation: number;
  expenditure: number;
  color: string;
  start: string;
  end: string;
}> = ({ category, expenditure, allocation, color }) => {
  const expenditurePercent = (expenditure / allocation) * 100;
  const bgColor =
    expenditurePercent < 50
      ? "bg-green-500"
      : expenditurePercent < 80
      ? "bg-yellow-500"
      : "bg-red-500";
  const bgWidth = `${expenditurePercent}%`;

  return (
    <div className="flex flex-col bg-white p-5 rounded-md shadow-md max-w-full md:min-w-95 ">
      <div className="flex justify-between items-center ">
        <div className="flex items-center gap-5 ">
          <div
            className={`${color} rounded-md w-10  h-10 font-bold text-white flex items-center justify-center`}
          >
            {category.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col text-sm">
            <p>{category}</p>
            <p className="text-xs text-gray-400 ">2 days ago</p>
          </div>
        </div>
        <div>
          <FaAngleRight className="text-sm text-slate-400 font-light" />
        </div>
      </div>
      <div className="flex w-full justify-between mt-5 ">
        <div className="flex flex-col">
          <p className={`font-bold text-green-600`}>KES {expenditure}</p>
          <p className="text-slate-400 text-xs">
            KES {allocation - expenditure} Remaining
          </p>
        </div>
        <div className="">
          <p className=" text-slate-400 font-light">of KES {allocation}</p>
          <p className="text-xs text-slate-400 flex">
            <span>
              <CgArrowTopLeftO className={`text-xs text-red-400`} />
            </span>
            <span>
              {" "}
              {((allocation - expenditure) / allocation) * 100}% used
            </span>
          </p>
        </div>
      </div>
      <div>
        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-3">
          <div
            className={`h-1.5 rounded-full ${bgColor} transition-all duration-300`}
            style={{ width: bgWidth }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default BudgetComponent;
