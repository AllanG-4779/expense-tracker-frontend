import React, { ReactNode } from "react";

const Modal: React.FC<{
  children: ReactNode;
  status: boolean;
  updater: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ children, updater, status }) => {
  return (
    <div
      onClick={() => updater((prev) => !prev)}
      className={` ${
        status ? "opacity-100" : "opacity-0 pointer-events-none"
      }  flex fixed top-0 left-0  flex-col transition-all duration-100   items-center justify-center  w-full  bg-slate-500/50 z-10  right-0 bottom-0`}
    >
      <div className="md:w-5/12 w-9/12" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
