"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import Input from "./raw/Input";
import { CreateUser, CreateUserResponse } from "../types/apiTypes";
import { fetchClient } from "../utils/fetchClient";
import { useRouter } from "next/navigation";
import Alert from "./raw/Alert";

const SignUpScreen = () => {
  const [payload, setPayload] = React.useState<CreateUser>({
    email: "",
    password: "",
    username: "",
  });
  const router = useRouter();

  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [type, setType] = React.useState("success");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!payload.email || !payload.password || !payload.username) {
      alert("Please fill all fields");
      return;
    }
    setLoading(true);
    const response = await fetchClient<CreateUserResponse>(
      "/api/v1/users/register",
      payload,
      "POST"
    );
    console.log("Response:", response); // Debugging line
    if (response.error) {
      setMessage(response.error);
      setType("error");
      setLoading(false);
    } else {
      setMessage("Account created successfully");
      setType("success");
      setLoading(false);
      setPayload({ email: "", password: "", username: "" });
      router.push("/auth/signin");
    }
  };

  useEffect(() => {
    if (message.length > 0) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  });

  return (
    <div className="items-center justify-center">
      <div id="login-section">
        <h1 className="text-4xl font-bold mb-12">Signup</h1>
        {!loading && message.length > 0 && (
          <Alert message={message} type={type} title="Creating account" />
        )}
        <form className="flex flex-col gap-4 w-96" onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Enter your Email"
            label="Email"
            value={payload?.email}
            onChange={(e) => {
              setPayload({ ...payload, email: e.target.value });
            }}
          />
          <Input
            type="text"
            placeholder="Enter your preferred username"
            label="Username"
            value={payload?.username}
            onChange={(e) => {
              setPayload({ ...payload, username: e.target.value });
            }}
          />
          <Input
            type="password"
            placeholder="Enter your password"
            label="Password"
            value={payload?.password}
            onChange={(e) => {
              setPayload({ ...payload, password: e.target.value });
            }}
          />

          <button className="bg-[#dc4b3ee3] font-bold text-white py-2 rounded-md hover:bg-[#dc4b3e] transition duration-200">
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>
        <div className="flex flex-col gap-4 mt-4">
          <p>
            {"Already a member?"}{" "}
            <Link href={"/auth/signin"} className="font-light text-[#dc4b3ee3]">
              Go to login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpScreen;
