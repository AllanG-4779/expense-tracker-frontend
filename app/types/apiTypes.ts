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
  body: {
    token: string;
    valid_for: number;
  };
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
