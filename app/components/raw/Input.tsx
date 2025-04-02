import React from "react";
import { InputProps } from "../../types/propstypes";

const Input: React.FC<InputProps> = (props) => {
  return (
    <div className="border flex flex-col  border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2  focus:ring-blue-500">
      <label className="text-gray-700 font-bold">{props.label}</label>
      <input
        type={props.type}
        placeholder={props.placeholder}
        className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-400"
      />
    </div>
  );
};

export default Input;
