import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const res = await supabase.auth.exchangeCodeForSession(code);
    console.log(res);
  }

  return NextResponse.redirect(requestUrl.origin);
}
