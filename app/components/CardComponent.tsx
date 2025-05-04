import React, { ReactElement } from "react";

const CardComponent: React.FC<{
  name: string;
  amount: number;
  icon: ReactElement;
  currency: string;
}> = (props) => {
  return (
    <div className="flex gap-10 bg-white  p-5 rounded-lg items-center transition-all duration-300 ease-in-out">
      <div id="icon" className="text-[#dc4b3e] font-bold text-2xl">
        {props.icon}
      </div>
      <div id="amount" className="flex flex-col gap-2 ">
        <div className=" font-semibold text-slate-500">{props.name}</div>
        <div className="text-gray-800 text-xl">
          {props.currency}{" "}
          {props.amount.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
