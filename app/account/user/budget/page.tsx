import AppBar from "@/app/components/AppBar";
import BudgetComponent from "@/app/components/BudgetComponent";
import React from "react";
import { GrTrain } from "react-icons/gr";

const page = () => {
  return (
    <>
      <AppBar title="Budgets" icon={<GrTrain />} />

      <div className="p-2 flex flex-col md:w-10/12 md:mx-auto">
        <p>Your Budgets</p>
        <div className="flex flex-col md:flex-row gap-2 mt-5 justify-between  w-full md:mx-auto flex-wrap">
          <BudgetComponent
            name="Transport"
            category="Travel & Commuting"
            allocation={45000}
            expenditure={8000}
            start="2025-05-05"
            end="2025-05-31"
          />
          <BudgetComponent
            name="Upkeep Food"
            category="Food & Groceries"
            allocation={5000}
            expenditure={4500}
            start="2025-04-01"
            end="2023-04-30"
          />
          <BudgetComponent
            name="Emergency"
            category="General"
            allocation={3000}
            expenditure={1500}
            start="2025-05-01"
            end="2025-05-31"
          />
        </div>
      </div>
    </>
  );
};

export default page;
