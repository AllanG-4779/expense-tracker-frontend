import React from "react";
import {AppUserContext} from "@/app/context/AppUserContext";
import {useFetchClient} from "@/app/utils/fetchClient";
import {Transaction} from "@/app/types/apiTypes";
import {AuthContext} from "@/app/context/authContext";

export type FilterCardProps = {
    /**
     *    StartDate       string `json:"start_date"`
     *    EndDate         string `json:"end_date"`
     *    Page            int    `json:"page"`
     *    Size            int    `json:"size"`
     *    CategoryID      uint   `json:"category"`
     *    UserId          uint   `json:"user_id"`
     *    Type            string `json:"type"`
     *    AccountID       uint   `json:"account_id"`
     *    TransactionType string `json:"transaction_type"`
     *    MinAmount       int    `json:"min_amount"`
     *    MaxAmount       int    `json:"max_amount"`
     */
    start_date?: string;
    end_date?: string;
    page?: number;
    size?: number;
    category?: number;
    user_id?: number;
    type?: string;
    account_id?: number;
    transaction_type?: string;
    min_amount?: number;
    max_amount?: number;
}
export const FilterCard = () => {
    // This component is used to filter transactions based on various criteria
    const {fetchClient} = useFetchClient();
       const currentYear = new Date().getFullYear();
    const [month, setMonth] = React.useState<string>("");
    const [year, setYear] = React.useState<number>(currentYear);
    const [category, setCategory] = React.useState<number>(0);
    const [amount, setAmount] = React.useState<string>("");


    const appUserContext = React.useContext(AppUserContext);
    const authContext = React.useContext(AuthContext);
    if (!appUserContext) {
        throw new Error("AppUserContext is not defined");
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Here you can handle the form submission, e.g., filter transactions based on the selected criteria
        const filters: FilterCardProps = {
            start_date: `${year}-${month}-01`, // Assuming the first day of the month
            end_date: `${year}-${month}-30`, // Assuming the last day of the month
            category: category ? category : undefined,
            min_amount: amount ? parseInt(amount.split("-")[0]) : undefined,
            max_amount: amount ? parseInt(amount.split("-")[1]) : undefined,
        };
        console.log("Filters applied:", filters);
        const data = await fetchClient<Transaction[]>("/api/v1/users/filter/transaction", filters, "POST", true, authContext?.token.token)
        if (data) {
            await appUserContext!.fetchTransactions!(authContext!.token.token, filters);
        } else {
            console.error("Failed to fetch transactions with the applied filters.");
        }
    }

    return (
        <div className="rounded-lg mx-auto ">
            <h2 className="text-lg font-semibold mb-4">Filter Transactions</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex w-full gap-4 ">
                    <div className="flex flex-col w-full">
                        <label htmlFor="" className="text-slate-600">
                            MONTH
                        </label>
                        <select
                            className="border border-slate-200 p-2 text-slate-500 outline-none bg-slate-200 rounded-md"
                            value={month} onChange={e => setMonth(e.target.value)}>
                            <option value="">Select Month</option>
                            <option value="01">January</option>
                            <option value="02">February</option>
                            <option value="03">March</option>
                            <option value="04">April</option>
                            <option value="05">May</option>
                            <option value="06">June</option>
                            <option value="07">July</option>
                            <option value="08">August</option>
                            <option value="09">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                        </select>
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="" className="text-slate-600">
                            YEAR
                        </label>
                        <select onChange={event => setYear(parseInt(event.target.value))}
                                className="border text-slate-500  border-slate-200 p-2 outline-none bg-slate-200 rounded-md">
                            <option value="">Select Year</option>
                            <option value={currentYear}>{currentYear}</option>
                            <option value={currentYear - 1}>{currentYear - 1}</option>
                            <option value={currentYear - 2}>{currentYear - 2}</option>
                            <option value={currentYear - 3}>{currentYear - 3}</option>
                        </select>
                    </div>
                </div>
                <div className="flex w-full gap-4 ">
                    <div className="flex flex-col w-full">
                        <label htmlFor="" className="text-slate-600">
                            CATEGORY
                        </label>
                        <select
                            className="border border-slate-200 p-2 text-slate-500 outline-none bg-slate-200 rounded-md"
                            value={category} onChange={e => setCategory(parseInt(e.target.value))}>
                            {
                                appUserContext.categories && appUserContext.categories.map((cat) => (
                                    <option key={cat.ID} value={cat.ID}>
                                        {cat.Name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="" className="text-slate-600">
                            AMOUNT
                        </label>
                        <select onChange={event => setAmount(event.target.value)} value={amount}
                                className="border text-slate-500  border-slate-200 p-2 outline-none bg-slate-200 rounded-md">
                            <option value="">Select Amount</option>
                            <option value="0-100">0-100</option>
                            <option value="100-500">100-500</option>
                            <option value="500-1000">500-1000</option>
                            <option value="1000-5000">1000-5000</option>
                            <option value="5000-10000">Over 5000</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row  items-center w-full gap-5">
                    <input
                        type="text"
                        className="border w-full md:w-4/12 border-slate-200 p-2 rounded-md bg-slate-200"
                        placeholder="search..."
                    />
                    <button onClick={handleSubmit}
                            className="w-full bg-green-500 font-semibold md:w-1/12 text-white p-2 rounded-md text-sm  ">
                        Apply Filters
                    </button>
                    <button onClick={(e) => {
                        e.preventDefault()
                        alert('coming soon')
                    }} className="w-full bg-yellow-500 font-semibold md:w-1/12 text-white p-2 rounded-md text-sm  ">
                        Export CSV
                    </button>
                    <button onClick={e => {
                        e.preventDefault()
                        setMonth("");
                        setYear(currentYear);
                        setCategory(0);
                        setAmount("");

                    }} className="w-full bg-gray-500 font-semibold md:w-1/12 text-white p-2 rounded-md text-sm  ">
                        Clear Filters
                    </button>


                </div>
            </form>
        </div>
    );
};