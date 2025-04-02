import React from "react";
import { Navigation } from "../data/navigation_element";
import Link from "next/link";

const SideBar = () => {
  return (
    <div className="flex flex-col w-full h-full bg-[#fcfaf8] p-4">
      <h1 className="text-2xl font-bold mb-4">Fund Manager</h1>
      {Navigation.map((each, key) => (
        <div
          key={key}
          className="p-2 w-full hover:bg-[#f2f2f2] rounded-md mb-2 font-light "
        >
          <Link href={each.to}>
            <p className="text-sm">{each.name}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SideBar;
