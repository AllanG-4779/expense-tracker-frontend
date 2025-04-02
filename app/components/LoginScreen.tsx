import React from "react";
import Input from "./raw/Input";
import Link from "next/link";

const LoginScreen = () => {
  return (
    <div className="items-center justify-center">
      <div id="login-section">
        <h1 className="text-4xl font-bold mb-12">Login</h1>
        <form className="flex flex-col gap-4 w-96">
          <Input type="text" placeholder="Enter your Email" label="Email" />
          <Input
            type="password"
            placeholder="Enter your password"
            label="Password"
          />
          <button className="bg-[#dc4b3ee3] font-bold text-white py-2 rounded-md hover:bg-[#dc4b3e] transition duration-200">
            Login
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
