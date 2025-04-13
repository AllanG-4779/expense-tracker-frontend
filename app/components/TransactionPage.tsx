import React from "react";
import { GrTrain } from "react-icons/gr";
import AppBar from "./AppBar";

const TransactionPage = () => {
  return (
    <>
      <AppBar title="Transactions" icon={<GrTrain />} />
      <div className="p-4">
        <p>Transactions</p>
      </div>
    </>
  );
};

export default TransactionPage;
