"use client";

import type { Session } from "@supabase/auth-helpers-nextjs";
import { Button } from "../ui/button";

const AuthClientButton = ({ session }: { session: Session | null }) => {
  const handleSignIn = () => {
    console.log(session);
  };
  return <Button onClick={handleSignIn}>SignIn</Button>;
};

export default AuthClientButton;
