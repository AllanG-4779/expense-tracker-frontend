import Link from "next/link";
import React from "react";
import Input from "./raw/Input";

const SignUpScreen = () => {
  return (
    <div className="items-center justify-center">
      <div id="login-section">
        <h1 className="text-4xl font-bold mb-12">Signup</h1>
        <form className="flex flex-col gap-4 w-96">
          <Input type="text" placeholder="Enter your Email" label="Email" />
          <Input
            type="password"
            placeholder="Enter your password"
            label="Password"
          />
          <Input
            type="text"
            placeholder="Enter your preferred username"
            label="Username"
          />
          <button className="bg-[#dc4b3ee3] font-bold text-white py-2 rounded-md hover:bg-[#dc4b3e] transition duration-200">
            Sign Up
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
