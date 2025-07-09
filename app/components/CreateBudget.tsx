"use client";

import { useContext } from "react";
import Input from "./raw/Input";

import { AppUserContext } from "../context/AppUserContext";

import SelectComponent from "./raw/SelectComponent";

/**
 * 
 * @returns   name: "Transport",
          allocation: 6000,
          expenditure: 4000,
          start: "2025-05-01",
          color: "bg-red-400",
          end: "2025-05-31",
          category: "RENT",
 */
const CreateBudgetComponent: React.FC<{ name?: string }> = () => {
  const authContext = useContext(AppUserContext);
  if (!authContext) {
    throw new Error("AppUserContext is not defined");
  }
  const { categories } = authContext;
  return (
    <div className="p-5 bg-white rounded-md shadow-md w-full">
      <h2 className="text-md font-semibold mb-4">Create a Budget</h2>
      {/* Form for creating budget goes here */}
      <form>
        {/* Input fields for budget details */}
        <Input
          type="text"
          label="Budget Name"
          value="33"
          placeholder=""
          onChange={() => {}}
        />
        <Input
          type="text"
          label="Allocated Amount"
          value="33"
          placeholder=""
          onChange={() => {}}
        />
        <Input
          type="date"
          label="From"
          value=""
          placeholder="33"
          onChange={() => {}}
        />
        <Input
          type="date"
          label="To"
          value=""
          placeholder="33"
          onChange={() => {}}
        />
        <SelectComponent
          value={""}
          title="Choose Category"
          data={categories!.map((each) => ({
            name: each.Name,
            id: each.ID,
          }))}
        />
        <button
          type="submit"
          className="bg-amber-600 text-white p-2 rounded hover:bg-amber-700 transition-all duration-200"
        >
          Create Budget
        </button>
      </form>
    </div>
  );
};
export default CreateBudgetComponent;
