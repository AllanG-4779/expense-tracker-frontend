"use client";
import React, { ReactNode, useContext } from "react";
import { BiMenu } from "react-icons/bi";
import { ModalContext } from "../data/context/ModalContext";

const AppBar: React.FC<{ icon?: ReactNode; title: string }> = ({ title }) => {
  const appContext = useContext(ModalContext);
  if (appContext === undefined) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }

  return (
    <div className="flex flex-row  md:justify-start gap-5 p-5  w-full h-1/100 md:h-15 border-b border-b-gray-200 bg-white  px-2">
      <BiMenu
        onClick={appContext.toggleSidebar}
        className="md:hidden flex text-2xl text-[#dc4b3e] font-bold self-start cursor-pointer"
      />
      <div className="font-semibold text-xl text-[#dc4b3e] self-center ml-5">
        {title}
      </div>
    </div>
  );
};

export default AppBar;
