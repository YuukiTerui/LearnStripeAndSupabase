import { createClient } from "@/lib/supabase/server";
import AuthClientButton from "./AuthClientButton";

const AuthServerButton = async () => {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getSession();
  return <AuthClientButton session={user.session}></AuthClientButton>;
};

export default AuthServerButton;
