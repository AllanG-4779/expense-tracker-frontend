import React from "react";
import { GrActions, GrAscend } from "react-icons/gr";
import AppBar from "./AppBar";
import LineGraph from "./LineGraph";
import TableComponent from "./TableComponent";
import CardComponent from "./CardComponent";

const Expense = () => {
  return (
    <div className="flex flex-col w-full h-full box-border">
      <AppBar title="Expenses" icon={<GrActions />} />
      <div className="flex md:flex-row flex-col h-19/20  gap-10 w-11/12  mx-auto  p-5">
        <div className="flex flex-col gap-5 md:flex-8/12">
          <div className="h-1/">
            <LineGraph />
          </div>
          <div className="h-1/">
            {" "}
            <TableComponent />
          </div>
        </div>
        <div className="flex flex-col gap-5 max-w-ful flex-4/12">
          {[1, 2, 3].map((_, id) => (
            <CardComponent
              key={id}
              name="Savings"
              amount={4500}
              currency="KES"
              icon={<GrAscend />}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Expense;
