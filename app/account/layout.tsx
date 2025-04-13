import React, { ReactNode } from "react";
import SideBar from "../components/SideBar";

const AccountLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen md:flex-row bg-[#f3f5f7]">
      <div className="hidden md:flex w-1/6  h-full">
        <SideBar />
      </div>
      {children}
    </div>
  );
};

export default AccountLayout;
