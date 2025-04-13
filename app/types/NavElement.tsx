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
