"use client";
import React from "react";

const Alert: React.FC<{
  message: string;
  type: string;
  title: string;
}> = ({ message, type, title }) => {
  return (
    <div
      className={`${
        type == "success" ? "bg-green-600" : "bg-red-600"
      } flex flex-col md:flex-row md:items-center  gap-2 rounded-lg p-4 mb-4 w-full `}
    >
      <h2 className="font-semibold text-white text-sm">{title}</h2>
      <p className="font-light text-xs text-slate-50">{message}</p>
    </div>
  );
};

export default Alert;
