import React, { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return <div className="flex w-full flex-col ">{children}</div>;
};

export default DashboardLayout;
