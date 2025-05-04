import React, { useContext } from "react";
import AddTransaction from "./AddTransaction";
import { ModalContext } from "../data/context/ModalContext";

const Modal = () => {
  const modalStatus = useContext(ModalContext);

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          modalStatus?.closeModal(); // Close the modal if the user clicks outside of the modal content
          // Close the modal if the user clicks outside of the modal content
          console.log("Modal closed");
        }
      }}
      className={` ${
        modalStatus?.isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }  flex fixed top-0 left-0  flex-col transition-all duration-100   items-center justify-center  w-full  bg-slate-500/50 z-10  right-0 bottom-0`}
    >
      <AddTransaction />
    </div>
  );
};

export default Modal;
