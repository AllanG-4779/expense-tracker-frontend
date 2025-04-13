import React from "react";

const TableComponent = () => {
  return (
    <div className="flex flex-col p-4 bg-white rounded-md shadow-md ">
      <div>
        <p>Recent Transactions</p>
      </div>
      <div>
        <table className="table-auto p-2 w-full">
          <thead className="bg-gray-50 p-2 border-b-2 border-gray-200">
            <tr>
              <th className="text-sm p-3 font-semibold tracking-wide text-left text-slate-400">
                Item
              </th>
              <th className="text-sm p-3 font-semibold tracking-wide text-left text-slate-400">
                Title
              </th>
              <th className="text-sm p-3 font-semibold tracking-wide text-left text-slate-400">
                Decription
              </th>
              <th className="text-sm p-3 font-semibold tracking-wide text-left text-slate-400">
                Amount
              </th>
              <th className="text-sm p-3 font-semibold tracking-wide text-left text-slate-400">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 5, 4].map((_, id) => (
              <tr key={id} className={`${id % 2 === 78 ? "bg-gray-100" : ""}`}>
                <td className="p-3 text-sm text-gray-700 border-b-1 border-slate-100">
                  FOOD
                </td>
                <td className="p-3 text-sm text-gray-700 border-b-1 border-slate-100">
                  Supper food
                </td>
                <td className="p-3 text-sm text-gray-700 border-b-1 border-slate-100">
                  Bought food for supper
                </td>
                <td className="p-3 text-sm text-gray-700 border-b-1 border-slate-100">
                  889
                </td>
                <td className="p-3 text-sm text-gray-700 border-b-1 border-slate-100">
                  17 mar 2025
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>{/* Showing pagination data */}</div>
      </div>
    </div>
  );
};

export default TableComponent;
