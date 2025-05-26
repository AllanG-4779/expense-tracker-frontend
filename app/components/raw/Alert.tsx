"use client";

import React from "react";
import { MdClose } from "react-icons/md";

const Alert: React.FC<{
  message: string;
  type: string;
  title: string;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ message, type, title, setOpen }) => {
  return (
    <div
      className={`${
        type == "success" ? "bg-green-600" : "bg-red-600"
      } flex flex-col md:flex-row md:items-center  gap-2 rounded-lg p-4 mb-4 w-full relative`}
    >
      <h2 className="font-semibold text-white text-sm">{title}</h2>
      <p className="font-light text-xs text-slate-50">{message}</p>
      <MdClose
        className="absolute right-10 top-10 text-2xl text-white cursor-pointer"
        onClick={() => setOpen!((prev) => !prev)}
      />
    </div>
  );
};

export default Alert;
