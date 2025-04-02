import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-full flex-col items-center m-20">
      <main className="md:flex h-full md:w-7/12 md:mx-auto items-center md:flex-row md:justify-between w-full ">
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
