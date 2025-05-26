"use client";
import React, { useContext, useEffect } from "react";
import { GrAdd } from "react-icons/gr";
import {
  CategoryResponse,
  Transaction,
  TransactionPayload,
} from "../types/apiTypes";
import { fetchClient } from "../utils/fetchClient";
import { AppUserContext } from "../data/context/AppUserContext";
import { AuthContext } from "../data/context/authContext";

const AddTransaction: React.FC<{
  existingTransaction?: Transaction;
  action?: string;
}> = ({ existingTransaction, action = "create" }) => {
  const [view, setView] = React.useState("addTransaction");
  const [categories, setCategories] = React.useState<string[]>([]);
  const [category, setNewCategory] = React.useState("");
  const [type, setType] = React.useState("expense");
  const [loading, setLoading] = React.useState(false);

  const [transaction, setTransaction] = React.useState<TransactionPayload>({
    title: existingTransaction?.Title || "",
    amount: existingTransaction?.Amount || 0,
    category: existingTransaction?.Category.Name || "",
    description: existingTransaction?.Description || "",
    account_id: existingTransaction?.ID || 0,
    date: existingTransaction?.Date || "",
  });
  const appUserContext = useContext(AppUserContext);
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext is not defined");
  }
  if (!appUserContext) {
    throw new Error("AppUserContext is not defined");
  }

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

  const newTransaction = async () => {
    setLoading(true);
    const response = await fetchClient<{ message: string }>(
      "/api/v1/users/add/transaction",
      transaction,
      "POST",
      true,
      authContext.token.token
    );
    setLoading(false);
    console.log("Response:", response); // Debugging line

    if (response.message) {
      alert(response.message);
      setNewCategory("");
      setView("addTransaction");
    }
  };

  const updateTransaction = async () => {
    setLoading(true);
    const response = await fetchClient<{ message: string }>(
      "/api/v1/users/update/transaction",
      transaction,
      "PUT",
      true,
      authContext.token.token
    );
    setLoading(false);
    console.log("Response:", response); // Debugging line
    if (response.message) {
      alert(response.message);
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
    <div className="flex flex-col p-5 bg-white rounded-lg shadow-md max-w-md mx-auto w-full md:mx-auto">
      {view === "addTransaction" ? (
        <form
          className="flex flex-col gap-3 mt-5"
          onSubmit={(e) => e.preventDefault()}
        >
          <h1 className="text-2xl font-bold text-[#dc4b3e]">
            {action === "create" ? "Add Transaction" : "Update Transaction"}
          </h1>
          <input
            type="text"
            placeholder="Title"
            className="p-2 border-none outline-none rounded-md"
            value={transaction.title}
            onChange={(e) =>
              setTransaction({ ...transaction, title: e.target.value })
            }
          />
          <input
            type="number"
            value={transaction.amount}
            placeholder="Amount"
            onChange={(e) =>
              setTransaction({
                ...transaction,
                amount: parseFloat(e.target.value),
              })
            }
            className="p-2 border border-none outline-none rounded-md text-4xl "
          />
          <div className="flex flex-row gap-3 w-full items-center">
            <select
              value={transaction.category}
              className="p-2 rounded-md outline-none border-none flex-1/2"
              onChange={(e) =>
                setTransaction({ ...transaction, category: e.target.value })
              }
            >
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
            type="text"
            placeholder="Description"
            className="p-2 border-none outline-none rounded-md"
            value={transaction.description}
            onChange={(e) =>
              setTransaction({ ...transaction, description: e.target.value })
            }
          />
          <div className="flex flex-col gap-3 w-full p-2">
            <p>Select Account</p>
            <select
              className="p-2 rounded-md outline-none border-none flex-1/2 border-gray-300"
              value={transaction.account_id}
              onChange={(e) =>
                setTransaction({
                  ...transaction,
                  account_id: parseInt(e.target.value),
                })
              }
            >
              {appUserContext.accounts.map((account, index) => (
                <option key={index} value={account.ID}>
                  {account.Name}
                </option>
              ))}
            </select>
          </div>
          <input
            value={transaction.date}
            onChange={(e) =>
              setTransaction({ ...transaction, date: e.target.value })
            }
            type="date"
            className="p-2 border border-gray-300 rounded-md"
            placeholder="Date"
          />
          <button
            className="bg-[#dc4b3e] text-white p-2 rounded-md mt-3"
            onClick={action === "create" ? newTransaction : updateTransaction}
          >
            {loading
              ? "Adding..."
              : action === "create"
              ? "Add Transaction"
              : "Update Transaction"}
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
