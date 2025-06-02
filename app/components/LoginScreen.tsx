"use client";
import React from "react";
import Input from "./raw/Input";
import Link from "next/link";
import { LoginUser, LoginUserResponse } from "../types/apiTypes";
import { useFetchClient } from "../utils/fetchClient";
import Alert from "./raw/Alert";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthContext } from "@/app/context/authContext";

const LoginScreen = () => {
  const [payload, setPayload] = React.useState<LoginUser>({
    username: "",
    password: "",
  });
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const searchParams = useSearchParams();
  const [type, setType] = React.useState("success");
  const authContext = React.useContext(AuthContext);
  const {fetchClient} = useFetchClient()
  if (!authContext) {
    throw new Error("AuthContext is not defined");
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!payload.username || !payload.password) {
      alert("Please fill all fields");
      return;
    }
    setLoading(true);
    const loginRes = await  fetchClient<LoginUserResponse>(
      "/api/v1/users/login",
      payload,
      "POST"
    );
    const response = loginRes.body!

    console.log("Response:", response); // Debugging line
    setLoading(false);
    if (!loginRes.successful) {
      setMessage(response?.error || "An error occurred during login");
      setType("error");
    } else {
      setMessage(response.message);
      setType("success");
      if (authContext.login) {
        authContext.login(response.body, {
          username: payload.username,
          email: response.user.email,
        });
      }
      console.log("User logged in:", authContext); // Debugging line
      const prev = searchParams.get("redirect")!== null ? searchParams.get("redirect")! : "/account/expenses";
      router.push( prev);
      return;
    }
  };
  return (
    <div className="items-center justify-center">
      <div id="login-section">
        <h1 className="text-4xl font-bold mb-12">Login</h1>
        {!loading && message && message.length > 0 && (
          <Alert message={message} type={type} title="Login" open={!loading && message.length>0} />
        )}
        <form className="flex flex-col gap-4 w-96" onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Enter your Email"
            label="Email"
            value={payload?.username}
            onChange={(e) =>
              setPayload({ ...payload, username: e.target.value })
            }
          />
          <Input
            type="password"
            placeholder="Enter your password"
            label="Password"
            value={payload?.password}
            onChange={(e) =>
              setPayload({ ...payload, password: e.target.value })
            }
          />
          <button className="bg-[#dc4b3ee3] font-bold text-white py-2 rounded-md hover:bg-[#dc4b3e] transition duration-200">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="flex flex-col gap-4 mt-4">
          <Link href="/register" className=" text-[#dc4b3ee3]">
            {"Forgot password?"}
          </Link>
          <p>
            {"Don't have an account?"}{" "}
            <Link href={"/auth/signup"} className="font-light text-[#dc4b3ee3]">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default LoginScreen;



