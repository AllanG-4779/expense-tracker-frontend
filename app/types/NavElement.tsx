import { ReactElement } from "react";

export type NavElement = {
  name: string;
  icon: ReactElement;
  to: string;
};

export type CardElement = {
  title: string;
  icon: ReactElement;
  to: string;
  description: string;
};

export const getTransactionComponent = (
  type: string
): { text: string; bg: string; muted: string } => {
  switch (type) {
    case "income":
      return {
        text: "text-green-500",
        bg: "bg-green-500",
        muted: "bg-green-100",
      };

    case "expense":
      return {
        text: "text-red-500",
        bg: "bg-red-500",
        muted: "bg-red-100",
      };
    default:
      return { text: "", bg: "", muted: "" };
  }
};
