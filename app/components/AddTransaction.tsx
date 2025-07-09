"use client";
import React, { useContext, useEffect } from "react";

import {
  CategoryResponse,
  Transaction,
  TransactionPayload,
} from "../types/apiTypes";
import { useFetchClient } from "../utils/fetchClient";
import { AppUserContext } from "@/app/context/AppUserContext";
import { AuthContext } from "@/app/context/authContext";
import SelectComponent from "./raw/SelectComponent";
import Input from "./raw/Input";

const AddTransaction: React.FC<{
  existingTransaction?: Transaction;
  action?: string;
  onSuccess?: () => void;
}> = ({ existingTransaction, action = "create", onSuccess }) => {
  const [view, setView] = React.useState("addTransaction");
  const [categories, setCategories] = React.useState<string[]>([]);
  const [category, setNewCategory] = React.useState("");
  const [type, setType] = React.useState("expense");
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const { fetchClient } = useFetchClient();
  const [transaction, setTransaction] = React.useState<TransactionPayload>({
    title: existingTransaction?.Title || "",
    amount: existingTransaction?.Amount || 0,
    category: existingTransaction?.Category.Name || "",
    description: existingTransaction?.Description || "",
    account_id: existingTransaction?.AccountID || 0,
    transaction_id: existingTransaction?.ID || 0,
    date: existingTransaction?.Date.split("T")[0] || "",
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
      setCategories((prev) => [...prev, category]);
      setNewCategory("");
      setView("addTransaction");
      setMessage(() => {
        setTimeout(() => {
          setMessage("");
        }, 3000);
        return response.message;
      });
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
      // alert(response.message);
      setNewCategory("");
      setView("addTransaction");
      setMessage(() => {
        setTimeout(() => {
          setMessage("");
        }, 3000);
        return response.message;
      });
    }
    onSuccess?.();
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
      // alert(response.message);
      setNewCategory("");
      setView("addTransaction");
    }
    onSuccess?.();
  };

  const handleCategoryChange = (
    e: { value: unknown; label: string } | null
  ) => {
    setTransaction((prev) => ({
      ...prev,
      category: e?.value as string,
    }));
  };
  const handleAccountChange = (e: { value: unknown; label: string } | null) => {
    setTransaction((prev) => ({
      ...prev,
      account_id: e?.value as number,
    }));
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setView("addTransaction");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const fetchCateogories = async () => {
      const categoriesRes = await fetchClient<CategoryResponse>(
        "/api/v1/setup/category/get",
        { page: 0, size: 100 },
        "POST"
      );
      const response = categoriesRes.body!;
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
  }, [loading]);
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
          <div
            className={`bg-green-100 text-green-800 p-1 rounded-md ${
              message ? "block" : "hidden"
            }`}
          >
            {message}
          </div>
          <Input
            type="text"
            label="Transaction Title"
            placeholder=""
            className="p-2 border-none outline-none rounded-md"
            value={transaction.title}
            onChange={(e) =>
              setTransaction({ ...transaction, title: e.target.value })
            }
          />
          <Input
            label="Amount"
            type="number"
            value={transaction.amount.toString()}
            placeholder="Amount"
            onChange={(e) =>
              setTransaction({
                ...transaction,
                amount: parseFloat(e.target.value),
              })
            }
            className="p-2 border border-none outline-none rounded-md text-4xl"
          />
          <div className="flex flex-col mt-[-2] w-full ">
            <SelectComponent
              value={transaction.category}
              data={categories.map((each) => ({
                id: each,
                name: each,
              }))}
              onChange={handleCategoryChange}
              title="Category"
            />

            <p
              className="text-xs cursor-pointer text-blue-600 hover:underline"
              onClick={() => setView("addCategory")}
            >
              Add Category
            </p>
          </div>
          <Input
            type="text"
            label="Description"
            placeholder="Description"
            className="p-2 border-none outline-none rounded-md"
            value={transaction.description}
            onChange={(e) =>
              setTransaction({ ...transaction, description: e.target.value })
            }
          />

          <SelectComponent
            data={appUserContext.accounts.map((each) => ({
              id: each.ID,
              name: each.Name,
            }))}
            title="Account"
            value={transaction.account_id}
            onChange={handleAccountChange}
          />

          <Input
            label="Date"
            value={transaction.date}
            onChange={(e) =>
              setTransaction({ ...transaction, date: e.target.value })
            }
            type="date"
            className="p-2 border border-gray-300 rounded-md"
            placeholder="Date"
          />
          <button
            disabled={loading}
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
