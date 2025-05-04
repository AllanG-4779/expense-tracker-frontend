import React from "react";

const TransactionsCard = () => {
  return (
    <div className="flex max-w-full gap-2 p-4 border justify-between border-gray-300 rounded-lg bg-white mb-4">
      <div className="flex flex-col gap-3">
        <p className="font-bold text-xl">Groceries</p>
        <div className="flex gap-2 items-center text-slate-500">
          <p>Food</p>
          <div className="flex items-center gap-2">
            <div className="bg-slate-500 w-[5px] h-[5px] rounded-full"></div>
            <p>2025-05-15</p>
          </div>
        </div>
      </div>
      <p className="text-green-500 font-bold text-xl">KES 3400</p>
    </div>
  );
};

export default TransactionsCard;
