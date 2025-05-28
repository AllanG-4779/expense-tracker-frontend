import React from "react";
import { Account, Transaction } from "../types/apiTypes";
import { MdMoreVert } from "react-icons/md";
import { CardComponent } from "./TransactionPage";

const TableComponent: React.FC<{
  transactions: Transaction[];
  fetchTransactions: () => void;
  accounts?: Account[];
  deleteTrasaction: (id: number) => void;
}> = ({ transactions, deleteTrasaction, fetchTransactions, accounts }) => {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<Transaction | null>(null);
  return (
    <div className="bg-white p-4 hidden md:flex md:flex-col">
      <p className="font-bold text-xl mb-4">Transactions</p>
      <table className="w-full border-collapse  table-auto">
        <thead>
          <tr>
            <th className="tracking-wider text-left p-3 text-sm">Title</th>
            <th className="tracking-wider text-left p-3 text-sm">
              Description
            </th>
            <th className="tracking-wider text-left p-3 text-sm">Amount</th>
            <th className="tracking-wider text-left p-3 text-sm">Date</th>
            <th className="tracking-wider text-left p-3 text-sm">Category</th>
            <th className="tracking-wider text-left p-3 text-sm">Account</th>
            <th className="tracking-wider text-left p-3 text-sm"></th>
          </tr>
        </thead>
        <tbody>
          {transactions &&
            transactions.map((trx) => (
              <tr
                key={trx.ID}
                className={`${trx.ID % 2 === 0 ? "bg-gray-100" : ""}`}
              >
                <td className="p-3 text-sm text-gray-700 border-b-1 border-slate-100">
                  {trx.Title}
                </td>
                <td className="p-3 text-sm text-gray-700 border-b-1 border-slate-100">
                  {trx.Description}
                </td>
                <td className="p-3 text-sm text-gray-700 border-b-1 border-slate-100">
                  {trx.Amount}
                </td>
                <td className="p-3 text-sm text-gray-700 border-b-1 border-slate-100">
                  {trx.Date}
                </td>
                <td className="p-3 text-sm text-gray-700 border-b-1 border-slate-100">
                  {trx.Category.Name}
                </td>
                <td className="p-3 text-sm text-gray-700 border-b-1 border-slate-100">
                  {accounts?.find((acc) => acc.ID === trx.AccountID)?.Name ||
                    "N/A"}
                </td>
                <td
                  className="p-3 t`ext-sm text-gray-700 border-b-1 border-slate-100 cursor-pointer relative"
                  onClick={() => setOpen(true)}
                  onMouseLeave={() => setOpen(false)}
                >
                  {
                    <MdMoreVert
                      className="text-2xl"
                      onClick={() => setActive(trx)}
                    />
                  }
                  {active?.ID === trx.ID && (
                    <CardComponent
                      updater={setOpen}
                      open={open}
                      transaction={trx}
                      transactionId={trx.ID}
                      onDelete={deleteTrasaction}
                      refreshTransactions={fetchTransactions}
                    />
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
