"use client";
import React, {useCallback} from "react";
import {GrActions} from "react-icons/gr";
import AppBar from "./AppBar";
import LineGraph from "./LineGraph";
import TableComponent from "./TableComponent";
import CardComponent from "./CardComponent";
import {BiMoney} from "react-icons/bi";
import DoughnutChart from "./raw/DoughnutChart";
import {AppUserContext} from "@/app/context/AppUserContext";
import {AuthContext} from "@/app/context/authContext";
import {useFetchClient} from "../utils/fetchClient";
import {DashboardResponse} from "../types/apiTypes";

const Expense = () => {
    const authContext = React.useContext(AuthContext);
    const appUserContext = React.useContext(AppUserContext);
    const [dashboardData, setDashboard] = React.useState<DashboardResponse>({
        message: "",
        data: {
            graph_data: [],
            total_balance: 0,
            total_expense: 0,
            total_income: 0,
            total_transactions: 0,
        },
    });
    const [month, setMonth] = React.useState<string>
    (new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : String(new Date().getMonth() + 1));

    const [year, setYear] = React.useState<string>(new Date().getFullYear().toString());
    const [selectedAccount, setSelectedAccount] = React.useState<number>(0);

    const {fetchClient} = useFetchClient();

    if (!authContext) {
        throw new Error("AuthContext is not defined");
    }
    if (!appUserContext) {
        throw new Error("AppUserContext is not defined");
    }
    const fetchData = useCallback(async () => {
        const data = await fetchClient<DashboardResponse>(
            "/api/v1/users/dashboard",
            {
                account_id: selectedAccount === 0 ? appUserContext.accounts[0].ID : selectedAccount,
                start_date: `${year}-${month}-01`,
                end_date: `${year}-${month}-${month !== "02" ? "30" : "28"}`,
            },
            "POST",
            true,
            authContext!.token.token
        );
        if (data.body && data.body.data) {
            setDashboard(data.body);
        } else {
            setDashboard({
                message: "Failed to fetch dashboard data",
                data: {
                    graph_data: [],
                    total_balance: 0,
                    total_expense: 0,
                    total_income: 0,
                    total_transactions: 0,
                },
            });
            console.log("Failed to fetch dashboard data");
        }
    }, [month, year, selectedAccount]);

    React.useEffect(() => {
        if (authContext.isAuthenticated) {
            appUserContext.fetchTransactions!(authContext.token.token);
        }
    }, []);

    React.useEffect(() => {
        if (authContext.isAuthenticated) {
            fetchData().then(r => console.log(r))
                .catch(e => console.error(e));

        }
    }, [authContext, fetchData, selectedAccount]);
    return (
        <div className="flex flex-col w-full">
            <AppBar title="Expenses" icon={<GrActions/>}/>
            <div className="flex md:flex-row flex-col gap-10  p-5 h-full">
                <div className="flex flex-col gap-3 md:flex-8/12">
                    <div className="flex-1/2">
                        {dashboardData?.data.graph_data && (
                            <LineGraph data={dashboardData?.data.graph_data}/>
                        )}
                    </div>
                    <div className="flex-1/2">
                        {" "}
                        <TableComponent
                            transactions={appUserContext.transactions!.filter(
                                (each) => {
                                    if (selectedAccount === 0) {
                                        return each.AccountID === appUserContext?.accounts![0].ID;
                                    }
                                    return each.AccountID === selectedAccount;
                                }
                            ).slice(0, 5)}
                            deleteTrasaction={async (id: number) =>
                                await appUserContext.deleteTransaction!(id)
                            }
                            accounts={appUserContext.accounts!}
                            fetchTransactions={async () =>
                                await appUserContext.fetchTransactions!(authContext.token.token)
                            }
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-5 max-w-full flex-4/12">
                    <div className="flex gap-5 items-center ">
                        <div className="flex gap-2">
                            <p className="font-semibold">Month</p>
                            <select
                                name="month"
                                id=""
                                value={month}
                                onChange={(e) => {
                                    setMonth(e.target.value);
                                }}
                            >
                                <option value="">Select</option>
                                <option value="01">January</option>
                                <option value="02">February</option>
                                <option value="03">March</option>
                                <option value="04">April</option>
                                <option value="05">May</option>
                                <option value="06">June</option>
                                <option value="07">July</option>
                            </select>
                        </div>
                        <div className="flex gap-2 items-center ">
                            <p className="font-semibold">Year</p>
                            <select
                                name="year"
                                value={year}
                                id=""
                                onChange={(e) => {
                                    setYear(e.target.value);
                                }}
                            >
                                <option value="2025">2025</option>
                                <option value="2024">2024</option>
                                <option value="2023">2023</option>
                                <option value="2022">2022</option>
                            </select>
                        </div>
                        <div className="flex gap-2 items-center ">
                            <p className="font-bold"> Account</p>
                            <select
                                value={selectedAccount}
                                onChange={(e) => setSelectedAccount(parseInt(e.target.value))}
                                className="p-2 rounded-md outline-none border-none flex-1/2 border-gray-300"
                            >
                                <option>Select</option>
                                {appUserContext.accounts.map((account, index) => (
                                    <option key={index} value={account.ID}>
                                        {account.Name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <CardComponent
                        name="Total Income"
                        amount={dashboardData?.data?.total_income || 0}
                        icon={<BiMoney/>}
                        currency="KES"
                    />
                    <CardComponent
                        name="Total Expenses"
                        amount={dashboardData?.data?.total_expense || 0}
                        icon={<BiMoney/>}
                        currency="KES"
                    />
                    <CardComponent
                        name="Balance"
                        amount={
                            appUserContext.accounts.filter(
                                (each) => selectedAccount === each.ID
                            )[0]?.Balance || 0
                        }
                        icon={<BiMoney/>}
                        currency="KES"
                    />
                    <CardComponent
                        name="Total Transactions"
                        amount={dashboardData?.data?.total_transactions || 0}
                        icon={<BiMoney/>}
                        currency=""
                    />
                    <DoughnutChart
                        income={dashboardData?.data.total_income}
                        expense={dashboardData?.data.total_expense}
                        balance={appUserContext.accounts.filter(
                            (each) => selectedAccount === each.ID
                        )[0]?.Balance || 0}
                    />
                </div>
            </div>
        </div>
    );
};

export default Expense;
