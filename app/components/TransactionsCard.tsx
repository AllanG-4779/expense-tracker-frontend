import React from "react";
import { Transaction } from "../types/apiTypes";

const TransactionsCard: React.FC<{ transaction: Transaction }> = ({
  transaction,
}) => {
  return (
    <div className="flex max-w-full gap-2 p-4 border justify-between border-gray-300 rounded-lg bg-white mb-4">
      <div className="flex flex-col gap-3">
        <p className="font-bold text-xl">{transaction.Title}</p>
        <div className="flex gap-2 items-center text-slate-500">
          <p>{transaction.Category.Name}</p>
          <div className="flex items-center gap-2">
            <div className="bg-slate-500 w-[5px] h-[5px] rounded-full"></div>
            <p>{transaction.Date}</p>
          </div>
        </div>
      </div>
      <p className="text-green-500 font-bold text-xl">
        {transaction.Amount.toLocaleString()}
      </p>
    </div>
  );
};

export default TransactionsCard;
