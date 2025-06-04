import { NavElement } from "../types/NavElement";
import { MdAccountCircle } from "react-icons/md";
import { BiTransfer } from "react-icons/bi";
import { BsViewStacked } from "react-icons/bs";
import { GrTransaction } from "react-icons/gr";

export const Navigation: NavElement[] = [
  {
    to: "/account/overview",
    name: "Overview",
    icon: <BsViewStacked />,
  },
  {
    to: "/account/user/transactions",
    name: "Transactions",
    icon: <GrTransaction />,
  },
  {
    to: "/account/user/accounts",
    name: "Accounts",
    icon: <MdAccountCircle />,
  },
  {
    to: "/account/user/budget",
    name: "Budgets",
    icon: <BiTransfer />,
  },
];
