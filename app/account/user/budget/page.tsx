"use client";
import AppBar from "@/app/components/AppBar";
import BudgetComponent from "@/app/components/BudgetComponent";
import CreateBudgetComponent from "@/app/components/CreateBudget";
import Modal from "@/app/components/Modal";

import React, { useEffect, useState } from "react";
import { GrTrain } from "react-icons/gr";
import { AuthContext } from "@/app/context/authContext";
import { Budget, UniversalResponse } from "@/app/types/apiTypes";
import { useFetchClient } from "@/app/utils/fetchClient";

const BudgetPage = () => {
  const authContext = React.useContext(AuthContext);
  const fetchClient = useFetchClient();
  const [budgetData, setBudgetData] = useState<Budget[]>([]);

  if (!authContext) {
    throw new Error("AuthContext is not defined");
  }
  const fetchBudgets = async () => {
    const data = await fetchClient.fetchClient<UniversalResponse<Budget[]>>(
      "/api/v1/users/get/budgets",
      { page: 0, size: 100, start_date: "2024-01-01", end_date: "2025-12-31" },
      "POST",
      true,
      authContext.token.token,
      { showLoader: true }
    );
    console.log("Fetched Budgets Data:", data);
    if (data.status === 200 && data.body) {
      console.log("Fetched Budgets:", data.body.body);
      setBudgetData(data.body.body || []);
    } else {
      console.error("Failed to fetch budgets:", data.message);
    }
  };

  useEffect(() => {
    fetchBudgets()
      .then(() => {
        console.log("Budgets fetched successfully");
      })
      .catch((error) => {
        console.error("Error fetching budgets:", error);
      });
  }, [authContext]);

  const [active, setActiveBudget] = useState<string | null>(null);
  const [activeMonth, setActiveMonth] = React.useState<number | null>(0);
  const [modal, setModal] = React.useState(false);
  return (
    <>
      <AppBar title="Budgets" icon={<GrTrain />} />

      <div className="flex   md:flex-row my-5 md:w-10/12 md:mx-auto w-full items-center  ">
        <div className="flex flex-col md:flex-row gap-2 overflow-x-auto ">
          {groupBudgetsByMonth(budgetData).map((budget, index) => (
            <MonthComponent
              key={index}
              month={budget.date}
              index={index}
              activeMonth={activeMonth}
              setActiveMonth={setActiveMonth}
              onClick={() => {
                setActiveBudget(budget.date);
                console.log("Budgets:", budget.budgets);
              }}
            />
          ))}
        </div>
        <button
          onClick={() => setModal(true)}
          className="text-white font-bold text-sm absolute right-5  rounded-md bg-amber-600 p-2 hover:bg-amber-700 transition-all duration-200 flex items-center top-20"
        >
          Add Budget
        </button>
        <Modal status={modal} updater={() => setModal(false)}>
          <CreateBudgetComponent />
        </Modal>
      </div>

      <div className="p-5 flex flex-col md:w-10/12 md:mx-auto">
        <div className="mt-4 p-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {groupBudgetsByMonth(budgetData)
              .find(
                (group) => 
                  group.date ===
                  (active == null
                    ? groupBudgetsByMonth(budgetData)[0].date
                    : active)
              )
              ?.budgets.map((item, idx) => (
                <BudgetComponent
                  key={idx}
                  name={item.Category.Name}
                  allocation={item.Amount}
                  expenditure={item.Amount - item.Balance}
                  start={item.StartDate}
                  end={item.EndDate}
                  color={"#dc4b3e"}
                  category={item.Category.Name}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BudgetPage;

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
      className={`p-1 rounded-full  px-5 shadow-sm mb-4 hover:bg-gray-100 hover-text-gray-500 transition-all duration-100 cursor-pointer ${
        activeMonth === index
          ? "bg-gray-900 hover:text-gray-600 text-white"
          : "bg-white"
      }`}
    >
      <p>{month}</p>
    </div>
  );
};

const groupBudgetsByMonth = (budgets: Budget[]) => {
  console.log("Grouping Budgets by Month:", budgets);
  if (typeof budgets === "undefined" || budgets.length === 0) {
    console.log("No budgets available to group.");
    return [];
  }

  const grouped: { date: string; budgets: Budget[] }[] = [];
  budgets.forEach((budget) => {
    const month = new Date(budget.StartDate).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    const existingGroup = grouped.find((g) => g.date === month);
    if (existingGroup) {
      existingGroup.budgets.push(budget);
    } else {
      grouped.push({ date: month, budgets: [budget] });
    }
  });
  console.log("Grouped Budgets:", grouped);
  return grouped;
};
