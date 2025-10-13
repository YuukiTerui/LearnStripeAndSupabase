"use client";

import { createClient } from "@/lib/supabase/client";
import { type Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function AuthClientButton({
  session,
}: {
  session: Session | null;
}) {
  const supabase = createClient();
  const router = useRouter();

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <>
      {session ? (
        <Button onClick={handleSignOut}>Sign Out</Button>
      ) : (
        <Button onClick={handleSignIn}>Sign In</Button>
      )}
    </>
  );
}
