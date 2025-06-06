"use client";
import AppBar from "@/app/components/AppBar";
import BudgetComponent from "@/app/components/BudgetComponent";

import React from "react";
import { GrTrain } from "react-icons/gr";

const BudgetPage = () => {
  const budgets = [
    {
      date: "JAN-2024",
      budgets: [
        {
          name: "Transport",
          allocation: 5000,
          expenditure: 2000,
          start: "2025-05-01",
          color: "bg-red-400",
          end: "2025-05-31",
          category: "Transport",
        },
        {
          name: "Upkeep Food",
          allocation: 5000,
          color: "bg-blue-400",
          expenditure: 4500,
          category: "Food",
          start: "2025-04-01",
          end: "2023-04-30",
        },
        {
          name: "Emergency",
          allocation: 3000,
          color: "bg-red-400",
          expenditure: 1500,
          category: "General",
          start: "2025-05-01",
          end: "2025-05-31",
        },
      ],
    },
    {
      date: "FEB-2024",
      budgets: [
        {
          name: "Transport",
          allocation: 6000,
          expenditure: 4000,
          start: "2025-05-01",
          color: "bg-red-400",
          end: "2025-05-31",
          category: "RENT",
        },
        {
          name: "Upkeep Food",
          allocation: 8000,
          color: "bg-blue-400",
          expenditure: 3500,
          category: "FOOD",
          start: "2025-04-01",
          end: "2023-04-30",
        },
        {
          name: "Emergency",
          allocation: 5000,
          color: "bg-red-400",
          expenditure: 1500,
          category: "ELECTRICITY",
          start: "2025-05-01",
          end: "2025-05-31",
        },
        {
          name: "Emergency",
          allocation: 1000,
          color: "bg-red-400",
          expenditure: 300,
          category: "EMERGENCY",
          start: "2025-05-01",
          end: "2025-05-31",
        },
      ],
    },
  ];
  const [activeBudgets, setBudgets] = React.useState(budgets[0].budgets);
  const [activeMonth, setActiveMonth] = React.useState<number | null>(0);

  return (
    <>
      <AppBar title="Budgets" icon={<GrTrain />} />

      <div className="flex  md:flex-row gap-4 my-4 md:w-10/12 md:mx-auto w-full justify-start md:flex-center  ml-2 px-5 items-center overflow-x-hidden">
        {budgets.map((budget, index) => (
          <MonthComponent
            key={index}
            month={budget.date}
            index={index}
            activeMonth={activeMonth}
            setActiveMonth={setActiveMonth}
            onClick={() => {
              setBudgets(budget.budgets);
              console.log("Budgets:", budget.budgets);
            }}
          />
        ))}
      </div>

      <div className="p-5 flex flex-col md:w-10/12 md:mx-auto">
        <div className="flex flex-col md:flex-row gap-2">
          <BudgetCard
            color="text-blue-500"
            value={activeBudgets.reduce((acc, budget) => {
              return acc + budget.allocation;
            }, 0)}
            total="Total Budget"
          />
          <BudgetCard
            color="text-green-500"
            value={activeBudgets.reduce((acc, budget) => {
              return acc + budget.expenditure;
            }, 0)}
            total="Total Expenditure"
          />
          <BudgetCard
            color="text-red-500"
            value={activeBudgets.reduce((acc, budget) => {
              return acc + budget.allocation - budget.expenditure;
            }, 0)}
            total="Remaining Budget"
          />
        </div>
        <div className="mt-4 p-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeBudgets.map((item, idx) => (
              <BudgetComponent
                key={idx}
                name={item.name}
                allocation={item.allocation}
                expenditure={item.expenditure}
                start={item.start}
                end={item.end}
                color={item.color}
                category={item.category}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BudgetPage;

const BudgetCard: React.FC<{ color: string; value: number; total: string }> = ({
  color,
  value,
  total,
}) => {
  return (
    <div
      className={`bg-white shadow-sm  gap-5 w-full rounded-lg p-4 flex flex-col items-center justify-between`}
    >
      <p className="text-md uppercase text-gray-500">{total}</p>
      <p className={`text-3xl font-semibold ${color}`}>{value}</p>
    </div>
  );
};

const MonthComponent: React.FC<{
  month: string;
  index: number;
  onClick: () => void;
  activeMonth: number | null;
  setActiveMonth: (index: number | null) => void;
}> = ({ month, index, activeMonth, setActiveMonth, onClick }) => {
  const handleClick = () => {
    // Toggle: if current index is active, deactivate it, otherwise activate it
    setActiveMonth(activeMonth === index ? null : index);
    console.log("Active Month:", activeMonth === index ? null : index);
    console.log("Index:", index);
    onClick();
  };

  return (
    <div
      onClick={handleClick}
      className={`p-1 rounded-full px-5 shadow-sm mb-4 hover:bg-gray-100 hover-text-gray-500 transition-all duration-100 cursor-pointer ${
        activeMonth === index
          ? "bg-gray-900 hover:text-gray-600 text-white"
          : "bg-white"
      }`}
    >
      <p>{month}</p>
    </div>
  );
};
