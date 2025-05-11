import React, { useContext } from "react";
import { Navigation } from "../data/navigation_element";
import Link from "next/link";
import { ModalContext } from "../data/context/ModalContext";
import { MdClose } from "react-icons/md";


const SideBar = () => {
  const appContext = useContext(ModalContext);
  
  if (appContext === undefined) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return (
    <div
      className={` ${
        !appContext.isSideBarOpen ? "left-[-50rem]" : "left-0"
      }  flex-col gap-3 w-full h-full bg-[#dc4b3e]  p-4 fixed md:top-0 md:left-0 md:w-64 transition-all duration-300 z-10`}
    >
      <h1 className="text-2xl font-extrabold mb-4 text-[#fff]">
        Funds Manager
      </h1>
      {Navigation.map((each, key) => (
        <div
          onClick={appContext.toggleSidebar}
          key={key}
          className="p-2 w-full flex gap-3 items-center hover:bg-[#dc4b3e25] rounded-md mb-2  text-white "
        >
          <div>{each.icon}</div>
          <Link href={each.to}>
            <p className="text-sm">{each.name}</p>
          </Link>
        </div>
      ))}
      <div
        className="absolute top-5 right-5 md:hidden"
        onClick={appContext.toggleSidebar}
      >
        <MdClose className="text-white text-2xl transition-transform cursor-pointer" />
      </div>
    </div>
  );
};

export default SideBar;
