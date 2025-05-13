"use client";
import React, { ReactNode, useContext } from "react";
import { BiMenu } from "react-icons/bi";
import { ModalContext } from "../data/context/ModalContext";
import { AuthContext } from "../data/context/authContext";
import Image from "next/image";

const AppBar: React.FC<{ icon?: ReactNode; title: string }> = ({ title }) => {
  const appContext = useContext(ModalContext);
  const [isOpen, setIsOpen] = React.useState(false);
  if (appContext === undefined) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  const authContext = useContext(AuthContext);

  if (authContext === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  console.log("authContext", authContext);

  return (
    <div className="flex flex-row  justify-between gap-5 p-5  w-full h-1/100 md:h-15 border-b border-b-gray-200 bg-white  px-2">
      <div className="flex flex-row gap-5 items-center justify-center">
        <BiMenu
          onClick={appContext.toggleSidebar}
          className="md:hidden flex text-2xl text-[#dc4b3e] font-bold self-start cursor-pointer"
        />
        <div className="font-semibold text-xl text-[#dc4b3e] self-center ml-5">
          {title}
        </div>
      </div>

      <div
        className="flex flex-row gap-2 items-center rounded-full relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image
          src="/todoist.png"
          alt="user"
          className="w-10 h-10 rounded-full"
          width={40}
          height={40}
        />
        {isOpen && (
          <DetailCard
            email={authContext.user.email}
            username={authContext.user.username}
          />
        )}
      </div>
    </div>
  );
};

const DetailCard: React.FC<{
  username: string;

  email: string;
}> = ({ email, username }) => {
  const authContext = useContext(AuthContext);
  if (authContext === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return (
    <div className="flex flex-col p-5 rounded-md absolute  bg-white shadow-md top-5 right-0 w-72">
      <div className="flex flex-col text-sm border-b border-b-gray-200 pb-5 items-center ">
        <div className="bg-slate-50 rounded-full object-contain">
          <Image
            src="/todoist.png"
            width={40}
            height={40}
            alt="profile pic"
            className="rounded-full object-cover"
          />
        </div>

        <div className="flex flex-col  mt-2 items-center">
          <p className="font-semibold">{email}</p>
          <p className="text-gray-500">{username}</p>
        </div>
      </div>

      <button className="bg-[#dc4b3e] cursor-pointer text-white rounded-md" onClick={authContext.logout}>
        Logout
      </button>
    </div>
  );
};

export default AppBar;
