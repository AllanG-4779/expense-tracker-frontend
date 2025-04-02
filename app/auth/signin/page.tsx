import Image from "next/image";
import LoginScreen from "../../components/LoginScreen";

export default function Home() {
  return (
    <div className="flex md:flex-row justify-between items-center w-full">
      <div>
        <LoginScreen />
      </div>
      <div className="hidden md:flex">
        <Image src="/todoist.png" alt="Logo" width={300} height={300} />
      </div>
    </div>
  );
}
