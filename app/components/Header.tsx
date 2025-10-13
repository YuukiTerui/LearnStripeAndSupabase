import Link from "next/link";
import AuthServerButton from "./auth/AuthServerButton";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <div className="flex my-4 py-4, px-6 gap-2 border-gray-200">
      <Link href={"/"}>
        <Button variant={"outline"}>Home</Button>
      </Link>
      <Link href={"/pricing"}>
        <Button variant={"outline"}>価格</Button>
      </Link>
      <div className="ml-auto">
        <AuthServerButton />
      </div>
    </div>
  );
};

export default Header;
