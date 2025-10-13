import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthClientButton from "./AuthClientButton";

const AuthServerButton = async () => {
  const supabase = createServerComponentClient({ cookies });
  const { data: user } = await supabase.auth.getSession();
  return <AuthClientButton session={user.session}></AuthClientButton>;
};

export default AuthServerButton;
