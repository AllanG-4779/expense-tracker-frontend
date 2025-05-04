"use client";
import React, { ReactNode } from "react";
import SideBar from "../components/SideBar";
import ModalProvider, { ModalContext } from "../data/context/ModalContext";

const AccountLayout = ({ children }: { children: ReactNode }) => {
  return (
    <ModalProvider>
      <div className="flex max-h-screen md:flex-row ">
        <SideBar />
        <main className="h-full w-full md:ml-64  ">{children}</main>
      </div>
    </ModalProvider>
  );
};

export default AccountLayout;
