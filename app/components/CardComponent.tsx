import React, { ReactElement } from "react";

const CardComponent: React.FC<{
  name: string;
  amount: number;
  icon: ReactElement;
  currency: string;
}> = (props) => {   
  return (
    <div className="flex gap-2 bg-white w-full p-5 rounded-md items-center">
      <div id="icon">{props.icon}</div>
      <div id="amount" className="flex flex-col gap-2 ">
        <div className=" font-bold text-gray-300">{props.name}</div>
        <div className=" text-gray-800">{props.amount}</div>
      </div>
    </div>
  );
};

export default CardComponent;
