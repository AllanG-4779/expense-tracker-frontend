import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";
import AuthProvider from "@/app/context/authContext";
import AppUserProvider from "@/app/context/AppUserContext";
import React from "react";
import { LoaderContextProvider } from "@/app/context/LoaderContext";
import GlobalLoader from "@/app/components/GlobalLoader";

const geistSans = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Money Manager",
  description: "A simple money manager app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <LoaderContextProvider>
        <AuthProvider>
          <AppUserProvider>
            <body className={geistSans.className}>
              <GlobalLoader />
              {children}
            </body>
          </AppUserProvider>
        </AuthProvider>
      </LoaderContextProvider>
    </html>
  );
}
