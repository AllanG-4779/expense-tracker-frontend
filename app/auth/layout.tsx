import {RedirectWrapper} from "@/app/components/AuthRedirect";
import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
      <div className="flex h-full flex-col items-center m-20">
        <RedirectWrapper />
        <main className="md:flex h-full md:w-7/12 md:mx-auto items-center md:flex-row md:justify-between w-full">
          {children}
        </main>
      </div>
  );
}