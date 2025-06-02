"use client";
import React from "react";

export type ModalContextType = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggleSidebar: () => void;

  isSideBarOpen: boolean;
};
export const ModalContext = React.createContext<ModalContextType | undefined>(
  undefined
);

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = React.useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const toggleSidebar = () => {
    setIsSideBarOpen(!isSideBarOpen); 
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
        isSideBarOpen,
        toggleSidebar,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
export default ModalProvider;
