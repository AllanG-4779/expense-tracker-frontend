import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";
import AuthProvider from "./data/context/authContext";
import AppUserProvider from "./data/context/AppUserContext";

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
      <AuthProvider>
        <AppUserProvider>
          <body className={geistSans.className}>{children}</body>
        </AppUserProvider>
      </AuthProvider>
    </html>
  );
}
