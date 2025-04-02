import React from "react";
import SignUpScreen from "../../components/SignUpScreen";
import Image from "next/image";

const SignUpPage = () => {
  return (
    <div className="flex md:flex-row justify-between items-center w-full">
      <div>
        <SignUpScreen />
      </div>
      <div className="hidden md:flex">
        <Image src="/todoist.png" alt="Logo" width={300} height={300} />
      </div>
    </div>
  );
};

export default SignUpPage;
