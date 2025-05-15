"use client";
import { Account } from "@/app/types/apiTypes";
import React from "react";

export type AppUserContextType = {
  accounts: Account[];
  setAccounts: React.Dispatch<React.SetStateAction<Account[]>>;
};

export const AppUserContext = React.createContext<
  AppUserContextType | undefined
>(undefined);

const AppUserProvider = ({ children }: { children: React.ReactNode }) => {
  const [accounts, setAccounts] = React.useState<Account[]>([]);

  return (
    <AppUserContext.Provider value={{ accounts, setAccounts }}>
      {children}
    </AppUserContext.Provider>
  );
};
export default AppUserProvider;
