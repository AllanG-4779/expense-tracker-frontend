import React, { ReactElement } from "react";

const AccountsCard: React.FC<{
  opening: number;
  name: string;
  id: number;
  icon: ReactElement;
  update?: () => void;
  balance: number;
}> = ({ icon, opening, balance, name, update }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-3  max-w-full md:min-w-3/12 mb-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="text-xl text-[#dc4b3e]">{icon}</div>
        <p className="text-xl font-bold text-[#dc4b3e]">{name}</p>
      </div>
      <div className="flex justify-between items-center mb-2">
        <div className="flex flex-col gap-1">
          <p className="text-slate-400 text-sm">Opening Balance </p>
          <p className="text-gray-500 text-xl font-semibold">
            KES <span>{opening.toLocaleString()}</span>
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-slate-400 text-sm">Current Balance </p>
          <p className="text-gray-500 text-xl font-semibold">
            KES <span>{balance.toLocaleString()}</span>
          </p>
        </div>
      </div>
      <div>
        <button
          onClick={update}
          className="p-1  rounded-md w-full bg-[#dc4b3e] text-white font-semibold hover:bg-[#dc4b3e]/80 transition duration-200 ease-in-out cursor-pointer"
        >
          View Transactions
        </button>
      </div>
    </div>
  );
};

export default AccountsCard;
