import React from "react";
import { Transaction } from "../types/apiTypes";
import { isToday, isYesterday, formatDate } from "date-fns";
import TransactionsCard from "./TransactionsCard";

const CardTransactionComponent: React.FC<{
  transactions: Transaction[];
}> = ({ transactions }) => {
  const groupedTransactions = transactions.reduce((acc, transaction) => {
    const date = transaction.Date.split("T")[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(transaction);
    return acc;
  }, {} as Record<string, Transaction[]>);

  const localFormatDate = (date: string) => {
    if (isToday(new Date(date))) {
      return "Today";
    }
    if (isYesterday(new Date(date))) {
      return "Yesterday";
    }

    return formatDate(new Date(date), "MMMM  d");
  };

  return (
    <div>
      {groupedTransactions && Object.keys(groupedTransactions).length > 0 ? (
        Object.keys(groupedTransactions)
          .sort((a, b) => {
            return new Date(b).getTime() - new Date(a).getTime();
          })
          .map((date) => (
            <div key={date} className="mb-4">
              <h2 className="text-slate-600 p-2 ">{localFormatDate(date)}</h2>
              {groupedTransactions[date].map((transaction) => (
                <TransactionsCard
                  key={transaction.ID}
                  transaction={transaction}
                  bg="bg-blue-500"
                  text="text-red-500"
                />
              ))}
            </div>
          ))
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default CardTransactionComponent;
