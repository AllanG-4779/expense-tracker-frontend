import React from "react";
import { GrTrain } from "react-icons/gr";
import AppBar from "./AppBar";
import AccountsCard from "./raw/AccountsCard";
import { FaWallet } from "react-icons/fa";
import TableComponent from "./TableComponent";

const Accounts = () => {
  return (
    <>
      <AppBar title="Accounts" icon={<GrTrain />} />
      <div className="p-2 flex flex-col md:w-10/12 md:mx-auto">
        <p>Current active Accounts</p>
        <div className="flex flex-col md:flex-row gap-2 mt-5 justify-between md:items-center w-full md:mx-auto flex-wrap">
          <AccountsCard
            name="Salary Account"
            opening={45000}
            balance={34000}
            icon={<FaWallet />}
          />
          <AccountsCard
            name="Debt Account"
            opening={5000}
            balance={4500}
            icon={<FaWallet />}
          />
          <AccountsCard
            name="General Account"
            opening={3000}
            balance={1500}
            icon={<FaWallet />}
          />
        </div>
        <div className="mt-5">
          <TableComponent />
        </div>
      </div>
    </>
  );
};

export default Accounts;
