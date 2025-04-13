import React from "react";
import { Navigation } from "../data/navigation_element";
import Link from "next/link";

const SideBar = () => {
  return (
    <div className="flex flex-col gap-3 w-full h-full bg-[#dc4b3e] p-4">
      <h1 className="text-2xl font-extrabold mb-4 text-[#fff]">
        Funds Manager
      </h1>
      {Navigation.map((each, key) => (
        <div
          key={key}
          className="p-2 w-full flex gap-3 items-center hover:bg-[#dc4b3e25] rounded-md mb-2  text-white "
        >
          <div>{each.icon}</div>
          <Link href={each.to}>
            <p className="text-sm">{each.name}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SideBar;
