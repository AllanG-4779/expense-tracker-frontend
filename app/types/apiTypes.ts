export type CreateUser = {
  first_name?: string;
  last_name?: string;
  dob?: string;
  username: string;
  email: string;
  residential?: string;
  phone?: string;
  password: string;
};

export type CreateUserResponse = {
  message?: string;
  error?: string;
};

export type LoginUser = {
  username: string;
  password: string;
};
export type LoginUserResponse = {
  message: string;
  error: string;
  status: number;
  body: Token;
  user: {
    username: string;
    email: string;
    first_name?: string;
    last_name?: string;
  };
  successful: boolean;
};

/**
 *  {
            "ID": 5,
            "CreatedAt": "2025-05-13T09:13:30.642089Z",
            "UpdatedAt": "2025-05-13T09:13:30.642089Z",
            "DeletedAt": null,
            "UserID": 1,
            "Name": "DEBT",
            "Balance": 0
        },
 */
export type AccountResponse = {
  message: string;
  error: string;
  status: number;
  accounts: Account[];
  successful: boolean;
};
export type Account = {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  UserID: number;
  Name: string;
  Balance: number;
};
/*
{
    {
    "icon":"test",
    "name":"ENTERTAINMENT",
    "description":"All Movement via Money",
    "type":"expense"
}
*/

export type CreateCategory = {
  icon: string;
  name: string;
  description: string;
  type: "income" | "expense";
};

/**
 * {
    "categories": [
       
    ],
    "message": "Categories fetched"
}
 */
export type Category = {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  UserID: number;
  icon: string;
  Name: string;
  description: string;
  type: "income" | "expense";
};
export type CategoryResponse = {
  message: string;
  error: string;
  status: number;
  categories: Category[];
  successful: boolean;
};
export type Token = {
  token: string;
  valid_for: number;
  issued_at: number;
  expires_at: number;
};
export type TransactionPayload = {
  /**
   * {
   "amount":500,
   "date":"02-04-2025",
   "category":"FOOD",
   "account_id":1
}
   */
  amount: number;
  title: string;
  date: string;
  description: string;
  transaction_id: number;
  category: string;
  account_id: number;
};
export type TransactionResponse = {
  message: string;
  error: string;
  status: number;
  transactions: Transaction[];
  successful: boolean;
};

export type Transaction = {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  UserID: number;
  Amount: number;
  Title: string;
  Type: string;
  Date: string;
  Description: string;
  CategoryID: number;
  AccountID: number;
  Category: {
    ID: number;
    Name: string;
    Description: string;
  };
};
export type TransactionFilter = {
  page: number;
  size: number;
  account_id: number;
  type?: "income" | "expense";
  start_date?: string;
  end_date?: string;
};
