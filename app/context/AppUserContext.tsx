"use client";
import {
    Account,
    Transaction,
    TransactionFilter,
    TransactionPayload,
    TransactionResponse,
} from "@/app/types/apiTypes";
import {useFetchClient} from "@/app/utils/fetchClient";
import React, {useEffect} from "react";
import {AuthContext} from "./authContext";

export type AppUserContextType = {
    accounts: Account[];
    setAccounts: React.Dispatch<React.SetStateAction<Account[]>>;
    newTransaction?: (
        transaction: TransactionPayload,
        token: string
    ) => Promise<void>;
    fetchTransactions?: (
        token: string,
        body?: TransactionFilter
    ) => Promise<void>;
    updateTransaction?: (
        transaction: TransactionPayload,
        token: string
    ) => Promise<void>;
    deleteTransaction?: (id: number) => Promise<void>;
    transactions?: Transaction[];
};

export const AppUserContext = React.createContext<
    AppUserContextType | undefined
>(undefined);

const AppUserProvider = ({children}: { children: React.ReactNode }) => {
    const [accounts, setAccounts] = React.useState<Account[]>([]);
    const [transactions, setTransactions] = React.useState<Transaction[]>([]);
    const authContext = React.useContext(AuthContext);
    const {fetchClient} = useFetchClient();
    const newTransaction = async (
        transaction: TransactionPayload,
        token: string
    ) => {
        const response = await fetchClient<TransactionResponse>(
            "/api/v1/users/add/transaction",
            transaction,
            "POST",
            true,
            token
        );
        console.log("Response:", response); // Debugging line
        await fetchTransactions(token);
    };

    const fetchTransactions = async (token: string, body?: TransactionFilter) => {
        const response = await fetchClient<TransactionResponse>(
            "/api/v1/users/filter/transaction",
            body || {page: 0, size: 100},
            "POST",
            true,
            token
        );
        console.log("Response:", response); // Debugging line
        const initialBody = response?.body;
        if (initialBody?.transactions && initialBody?.transactions.length > 0) {
            console.log("Transactions fetched successfully:", initialBody.transactions);
            setTransactions(initialBody.transactions);
        } else {
            console.log("No transactions found:", response.message);
            setTransactions([]);
        }
    };

    const updateTransaction = async (
        transaction: TransactionPayload,
        token: string
    ) => {
        const response = await fetchClient<{ message: string }>(
            "/api/v1/users/update/transaction",
            transaction,
            "PUT",
            true,
            token
        );

        if (response.message) {
            await fetchTransactions(authContext!.token.token);
        }
    };

    const deleteTransaction = async (id: number) => {
        setTransactions((prev) =>
            prev.filter((transaction) => transaction.ID !== id)
        );
        const response = await fetchClient<{ message: string }>(
            `/api/v1/users/delete/transaction`,
            {id},
            "DELETE",
            true,
            authContext!.token.token
        );
        console.log("Response:", response); // Debugging line
        await fetchTransactions(authContext!.token.token);
    };

    useEffect(() => {
        if (authContext === undefined) {
            throw new Error("useAuthContext must be used within an AuthProvider");
        }
        const token = authContext.token?.token;
        if (!token) {
            const iToken = JSON.parse(localStorage.getItem("token") || "{}");
            if (iToken && iToken.token) {
                console.log("Using token from localStorage:", iToken.token);
                authContext.token = iToken;
            } else {
                console.log("No token found in AuthContext or localStorage");
                return;
            }
        }

        // Fetch accounts and transactions when the component  mountzs
        const fetchAccounts = async () => {
            const accountRequest = await fetchClient<{ accounts: Account[] }>(
                "/api/v1/users/get/accounts",
                {},
                "GET",
                true,
                token
            );
            const response = accountRequest.body!
            console.log("Response:", response); // Debugging line
            if (accountRequest.successful && response.accounts && response.accounts.length > 0) {
                console.log("Accounts fetched successfully:", response.accounts);
                setAccounts(response.accounts);
            } else {
                console.log("No accounts found");
                setAccounts([]);
            }
        };

        fetchAccounts();
        fetchTransactions(token);
    }, [authContext]);

    return (
        <AppUserContext.Provider
            value={{
                accounts,
                setAccounts,
                fetchTransactions,
                newTransaction,
                updateTransaction,
                deleteTransaction,
                transactions,
            }}
        >
            {children}
        </AppUserContext.Provider>
    );
};
export default AppUserProvider;
