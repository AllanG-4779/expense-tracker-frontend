import { NavElement } from "../types/NavElement";
import { MdAccountCircle } from "react-icons/md";
import { BiTransfer } from "react-icons/bi";
import { BsViewStacked } from "react-icons/bs";
import { GrTransaction } from "react-icons/gr";

export const Navigation: NavElement[] = [
  {
    to: "/account/user/expenses",
    name: "Overview",
    icon: <BsViewStacked />,
  },
  {
    to: "/account/user/expenses",
    name: "Transactions",
    icon: <GrTransaction />,
  },
  {
    to: "/",
    name: "Accounts",
    icon: <MdAccountCircle />,
  },
  {
    to: "/",
    name: "Budgets",
    icon: <BiTransfer />,
  },
];
