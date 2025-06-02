"use client";

import React, {useState} from "react";
import { MdClose } from "react-icons/md";

const Alert: React.FC<{
  message: string;
  type: string;
  title: string;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ message, type, title,open=true }) => {
  const [isOpen, setIsOpen] = useState(open)
  const close = ()=>setIsOpen(false)
  // const open = ()=>setIsOpen(true)
  return (
    <div

      className={`${
        type == "success" ? "bg-green-600" : "bg-red-600"
      
      } ${isOpen?'flex':'hidden'} flex-col md:flex-row md:items-center  gap-2 rounded-lg p-4 mb-4 w-full `}
    >
      <h2 className="font-semibold text-white text-sm">{title}</h2>
      <p className="font-light text-xs text-slate-50">{message}</p>
      <MdClose
        className=" right-0 top-0 flex-end text-2xl text-white cursor-pointer"
        onClick={close}
      />
    </div>
  );
};

export default Alert;
