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
