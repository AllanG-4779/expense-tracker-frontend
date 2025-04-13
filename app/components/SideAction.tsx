import React from "react";
import { NavElement } from "../types/NavElement";

const SideAction: React.FC<NavElement[]> = (props) => {
  return (
    <div className="flex flex-col gap-4">
      {props.map((item) => (
        <div
          key={item.name}
          className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
        >
          {item.icon}
          <span className="text-sm">{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default SideAction;
