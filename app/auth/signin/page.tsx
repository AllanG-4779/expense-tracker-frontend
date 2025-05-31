import Image from "next/image";
import dynamic from "next/dynamic";
import {Suspense} from "react";

export default  function Home() {
    const SigninClient = dynamic(() => import('../../components/LoginScreen'), { ssr: true });
  return (
    <div className="flex md:flex-row justify-between items-center w-full">
      <div>
       <Suspense fallback={<div>Loading...</div>}>
           <SigninClient />
       </Suspense>
      </div>
      <div className="hidden md:flex">
        <Image src="/todoist.png" alt="Logo" width={300} height={300} />
      </div>
    </div>
  );
}
