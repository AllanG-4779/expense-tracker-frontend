import React from "react";

const AddTransaction = () => {
    
  return (
    <div className="flex flex-col p-5 bg-white rounded-lg shadow-md max-w-md mx-auto md:max-w-[50%] md:mx-auto">   
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
        <select className="p-2   rounded-md outline-none border-none">
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input
          type="date"
          className="p-2 border border-gray-300 rounded-md"
          placeholder="Date"
        />
        <button className="bg-[#dc4b3e] text-white p-2 rounded-md mt-3">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransaction;
