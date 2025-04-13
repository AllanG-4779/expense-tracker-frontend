import React, { ReactNode } from "react";

const AppBar: React.FC<{ icon: ReactNode; title: string }> = ({
  icon,
  title,
}) => {
  return (
    <div className="flex flex-row items-center md:justify-start gap-5 p-5 justify-center w-full h-1/100 md:h-15 border-b border-b-gray-200 bg-white  px-2">
      <div className="text-2xl text-[#dc4b3e] font-bold">{icon}</div>
      <div className="font-semibold text-xl text-[#dc4b3e]">{title}</div>
    </div>
  );
};

export default AppBar;
