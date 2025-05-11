"use client";
import React, { ReactNode, useContext } from "react";
import { BiMenu } from "react-icons/bi";
import { ModalContext } from "../data/context/ModalContext";
import { AuthContext } from "../data/context/authContext";

const AppBar: React.FC<{ icon?: ReactNode; title: string }> = ({ title }) => {
  const appContext = useContext(ModalContext);
  if (appContext === undefined) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  const authContext = useContext(AuthContext);

  if (authContext === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  console.log("authContext", authContext);

  return (
    <div className="flex flex-row  md:justify-start gap-5 p-5  w-full h-1/100 md:h-15 border-b border-b-gray-200 bg-white  px-2">
      <BiMenu
        onClick={appContext.toggleSidebar}
        className="md:hidden flex text-2xl text-[#dc4b3e] font-bold self-start cursor-pointer"
      />
      <div className="font-semibold text-xl text-[#dc4b3e] self-center ml-5">
        {title}
        <p className="text-red-500">
          {authContext.isAuthenticated ? "hello" : "Done"}
        </p>
      </div>
    </div>
  );
};

export default AppBar;
