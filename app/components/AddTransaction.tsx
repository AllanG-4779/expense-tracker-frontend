"use client";
import React, { useEffect } from "react";
import { GrAdd } from "react-icons/gr";
import { CategoryResponse } from "../types/apiTypes";
import { fetchClient } from "../utils/fetchClient";

const AddTransaction = () => {
  const [view, setView] = React.useState("addTransaction");
  const [categories, setCategories] = React.useState<string[]>([]);
  const [category, setNewCategory] = React.useState("");
  const [type, setType] = React.useState("expense");

  const createCategory = async () => {
    const response = await fetchClient<{ message: string }>(
      "/api/v1/setup/category",
      { name: category, type: type, description: "" },
      "POST"
    );
    if (response.message) {
      alert(response.message);
      setCategories((prev) => [...prev, category]);
      setNewCategory("");
      setView("addTransaction");
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setView("addTransaction");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const fetchCateogories = async () => {
      const response = await fetchClient<CategoryResponse>(
        "/api/v1/setup/category/get",
        { page: 0, size: 100 },
        "POST"
      );
      if (response.categories.length > 0) {
        setCategories(response.categories.map((category) => category.Name));
      } else {
        setCategories([]);
      }
    };
    fetchCateogories();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <div className="flex flex-col p-5 bg-white rounded-lg shadow-md max-w-md mx-auto md:max-w-[50%] md:mx-auto">
      {view === "addTransaction" ? (
        <form className="flex flex-col gap-3 mt-5">
          <h1 className="text-2xl font-bold text-[#dc4b3e]">Add Transaction</h1>
          <input
            type="text"
            placeholder="Title"
            className="p-2 border-none outline-none rounded-md"
          />
          <input
            type="number"
            value={0}
            placeholder="Amount"
            className="p-2 border border-none outline-none rounded-md text-4xl "
          />
          <div className="flex flex-row gap-3 w-full items-center">
            <select className="p-2   rounded-md outline-none border-none flex-1/2">
              {categories.length > 0 ? (
                categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))
              ) : (
                <option value="">No Categories</option>
              )}{" "}
            </select>
            <div
              className="flex flex-row-reverse gap-2 items-center bg-[#dc4b3e] p-2 rounded-md cursor-pointer"
              onClick={() => setView("addCategory")}
            >
              <p className="text-white">New Category</p>
              <GrAdd className="text-white" />
            </div>
          </div>
          <input
            type="date"
            className="p-2 border border-gray-300 rounded-md"
            placeholder="Date"
          />
          <button className="bg-[#dc4b3e] text-white p-2 rounded-md mt-3">
            Add Transaction
          </button>
        </form>
      ) : (
        <div className="flex flex-col gap-3 mt-5">
          <h1 className="text-2xl font-bold text-[#dc4b3e]">Add Category</h1>
          <input
            type="text"
            placeholder="Category Name"
            value={category}
            onChange={(e) => setNewCategory(e.target.value)}
            className="p-2 border-none outline-none rounded-md"
          />
          <div className="flex flex-row gap-3 w-full items-center">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="p-2   rounded-md outline-none border-none flex-1/2"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
          <button
            className="bg-[#dc4b3e] text-white p-2 rounded-md mt-3"
            onClick={createCategory}
          >
            Add Category
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTransaction;
