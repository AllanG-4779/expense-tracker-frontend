import React from "react";

const page = () => {
  // Redirect to /auth/signin
  if (typeof window !== "undefined") {
    window.location.href = "/auth/signin";
  }
  return <p>Loading...</p>;
};

export default page;
