import React from "react";
import { InputProps } from "../../types/propstypes";

const Input: React.FC<InputProps> = (props) => {
  return (
    <div>
      <label
        className="text-slate-600 font-semibold text-sm"
        htmlFor={props.label}
      >
        {props.label}
      </label>
      <input
        type={props.type}
        // placeholder={props.label}
        onChange={props.onChange}
        className="w-full rounded-md my-2 border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
      />
    </div>
  );
};

export default Input;
