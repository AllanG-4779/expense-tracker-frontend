import React from "react";
import { Account, Transaction } from "../types/apiTypes";
import { MdMoreVert } from "react-icons/md";
import { CardComponent } from "./TransactionPage";
import { formatDate } from "date-fns";
import { useLoader } from "../context/LoaderContext";

const TableComponent: React.FC<{
  transactions: Transaction[];
  fetchTransactions: () => void;
  accounts?: Account[];
  deleteTrasaction: (id: number) => void;
}> = ({ transactions, deleteTrasaction, fetchTransactions, accounts }) => {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<Transaction | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const { setIsLoading } = useLoader();

  return (
    <div className="bg-white p-4 hidden md:flex md:flex-col overflow-x-scroll p-">
      <p className="font-bold text-xl mb-4">Transactions</p>
      <table className="w-full border-collapse  table-auto">
        <thead>
          <tr className="text-gray-500 uppercase text-xl bg-gray-50">
            <th className="tracking-wider text-left p-3 text-sm ">Title</th>
            <th className="tracking-wider text-left p-3 text-sm">
              Description
            </th>
            <th className="tracking-wider text-left p-5 text-sm">Amount</th>
            <th className="tracking-wider text-left p-3 text-sm">Date</th>
            <th className="tracking-wider text-left p-3 text-sm">Category</th>
            <th className="tracking-wider text-left p-3 text-sm">Account</th>
            <th className="tracking-wider text-left p-3 text-sm"></th>
          </tr>
        </thead>
        <tbody className=" text-gray-600 text-xs">
          {transactions &&
            transactions
              .slice((currentPage - 1) * 10, currentPage * 10)
              .map((trx) => (
                <tr
                  key={trx.ID}
                  className={` hover:bg-gray-50 transition-all duration-75 p-5 `}
                >
                  <td className=" text-xs font-bold text-gray-500 border-b-1 border-slate-100 uppercase ">
                    {trx.Title}
                  </td>
                  <td className=" text-xs text-gray-400 border-b-1 p-5 border-slate-100 capitalize ">
                    {trx.Description.toLowerCase()}
                  </td>
                  <td className=" text-xs font-bold text-slate-600 border-b-1 border-slate-100">
                    ${trx.Amount}
                  </td>
                  <td className=" text-xs  text-gray-400 border-b-1 p-6 border-slate-100 text-start">
                    {formatDate(trx.Date, "MMM dd, yyyy")}
                  </td>
                  <td className=" text-xs text-gray-700 border-b-1 border-slate-100">
                    <CategoryBadge category={trx.Category.Name.toLowerCase()} />
                  </td>
                  <td className=" text-xs text-gray-500 font-semibold border-b-1 border-slate-100">
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
        <tfoot>
          <tr>
            <td colSpan={7} className="text-center py-4">
              {transactions.length > 10 && (
                <PaginationComponent
                  currentPage={currentPage}
                  totalPages={Math.ceil(transactions.length / 10)}
                  handleNext={() => {
                    if (currentPage < Math.ceil(transactions.length / 10)) {
                      setIsLoading(true);
                      setTimeout(() => {
                        setCurrentPage(currentPage + 1);
                        setIsLoading(false);
                      }, 400);
                    }
                  }}
                  handlePrevious={() => {
                    if (currentPage > 1) {
                      setIsLoading(true);
                      setTimeout(() => {
                        setCurrentPage(currentPage - 1);
                        setIsLoading(false);
                      }, 400);
                    }
                  }}
                />
              )}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

const CategoryBadge = ({ category }: { category: string }) => {
  const categoryColors: { [key: string]: string } = {
    food: "bg-blue-100 text-blue-800",
    salary: "bg-green-100 text-green-800",
    transport: "bg-blue-100 text-blue-800",
    entertainment: "bg-red-100 text-red-800",
    utilities: "bg-yellow-100 text-yellow-800",
    other: "bg-gray-100 text-gray-800",
    health: "bg-red-100 text-red-800",
    tv: "bg-purple-100 text-purple-800",
    travel: "bg-orange-100 text-orange-800",
    shopping: "bg-pink-100 text-pink-800",
    internet: "bg-teal-100 text-teal-800",
    loans: "bg-violet-200 text-violet-800",
    savings: "bg-indigo-100 text-indigo-800",
  };

  const colorClass = categoryColors[category] || "bg-gray-100 text-gray-800";

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded font-semibold ${colorClass}`}
    >
      {category.toUpperCase() || "N/A"}
    </span>
  );
};

const PaginationComponent: React.FC<{
  currentPage: number;
  totalPages: number;
  handleNext: () => void;
  handlePrevious: () => void;
}> = ({ currentPage, totalPages, handleNext, handlePrevious }) => {
  return (
    <div className="flex justify-center mt-4">
      <button
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-l hover:bg-gray-300"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="px-4 py-2 text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      <button
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-r hover:bg-gray-300"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default TableComponent;
