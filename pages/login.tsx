import React from "react";
import { Database } from "../lib/database/supabase";
import { signIn } from "../lib/database/signIn";
import Link from "next/link";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const Login = () => {
  const supabaseClient = useSupabaseClient<Database>();

  const handleSubmit = async (event: React.MouseEvent) => {
    if (event) event.preventDefault();
    await signIn(process.env.NEXT_PUBLIC_ADMIN_EMAIL!, process.env.NEXT_PUBLIC_ADMIN_PASS!, supabaseClient);
  };
  return (
    <>
      <button onClick={handleSubmit}>Connect</button>
      <Link href="/admin">Admin</Link>
      <Link href="/admin/test">2Admin</Link>
    </>
  );
};

export default Login;
