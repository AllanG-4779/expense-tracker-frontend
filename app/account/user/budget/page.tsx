import AppBar from "@/app/components/AppBar";
import BudgetComponent from "@/app/components/BudgetComponent";
import React from "react";
import { GrTrain } from "react-icons/gr";

const budgets = [
  {
    name: "Transport",
    allocation: 5000,
    expenditure: 2000,
    start: "2025-05-01",
    end: "2025-05-31",
    category: "Transport",
  },
  {
    name: "Upkeep Food",
    allocation: 5000,
    expenditure: 4500,
    category: "Food",
    start: "2025-04-01",
    end: "2023-04-30",
  },
  {
    name: "Emergency",
    allocation: 3000,
    expenditure: 1500,
    category: "General",
    start: "2025-05-01",
    end: "2025-05-31",
  },
  {
    name: "Transport",
    allocation: 5000,
    expenditure: 2000,
    category: "Travel",
    start: "2025-05-01",
    end: "2025-05-31",
  },
  {
    name: "Upkeep Food",
    allocation: 5000,
    expenditure: 4500,
    category: "Food",
    start: "2025-04-01",
    end: "2023-04-30",
  },
  {
    name: "Emergency",
    allocation: 3000,
    category: "General",
    expenditure: 1500,
    start: "2025-05-01",
    end: "2025-05-31",
  },
  {
    name: "Transport",
    allocation: 5000,
    expenditure: 2000,
    start: "2025-05-01",
    end: "2025-05-31",
    category: "Transport",
  },
  {
    name: "Upkeep Food",
    allocation: 5000,
    expenditure: 4500,
    start: "2025-04-01",
    category: "Food",

    end: "2023-04-30",
  },
];

const page = () => {
  return (
    <>
      <AppBar title="Budgets" icon={<GrTrain />} />

      <div className="p-2 flex flex-col md:w-10/12 md:mx-auto">
        <p>Your Budgets</p>
        <div className="flex flex-col md:flex-row gap-5 mt-5   w-full md:mx-auto flex-wrap">
          {budgets.map((budget, index) => (
            <BudgetComponent
              key={index}
              name={budget.name}
              allocation={budget.allocation}
              expenditure={budget.expenditure}
              start={budget.start}
              category={budget.category}
              end={budget.end}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
