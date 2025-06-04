"use client";
import React, {useEffect} from "react";
import {useRouter}  from "next/navigation";
import GlobalLoader from "@/app/components/GlobalLoader";


const Home = () => {
  // Redirect to /auth/signin
  const router = useRouter();
    useEffect(() => {
        router.push("/auth/signin");
    }, [router]);
  return <GlobalLoader />;
};

export default Home;
