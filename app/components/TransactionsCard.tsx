import React from "react";
import { Transaction } from "../types/apiTypes";
import { getTransactionComponent } from "../types/NavElement";

const TransactionsCard: React.FC<{
  transaction: Transaction;
  bg?: string;
  text?: string;
}> = ({ transaction }) => {
  const { bg, text, muted } = getTransactionComponent(transaction.Type);
  return (
    <div className="duration-150 shake text-sm transition-all flex items-center justify-between p-2  bg-white border-t-1 border-slate-300  ">
      <div className="flex max-w-full gap-5 p-2  justify-between  rounded-lg">
        <div
          className={`flex items-center justify-center ${bg} w-20 rounded-lg`}
        >
          <p className="font-bold text-xl text-white">
            {transaction.Category.Name.charAt(0)}
          </p>
        </div>

        <div className="flex flex-col gap- justify-between w-full">
          <div className="category">
            <p className="text-slate-600 font-semibold">{transaction.Title}</p>
          </div>
          <div className="time category flex gap-2 text-xs items-center">
            <p className={`${text} font-semibold ${muted} p-1 rounded-md`}>
              {transaction.Category.Name}
            </p>
            <p className="text-slate-400">10:30AM</p>
          </div>
        </div>
      </div>
      <div>
        <p className={`font-semibold ${text}`}>
          {transaction.Amount.toLocaleString("en-US", {
            style: "currency",
            currency: "KES",
          })}
        </p>
      </div>
    </div>
  );
};

export default TransactionsCard;
