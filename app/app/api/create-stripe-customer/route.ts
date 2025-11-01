import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import initStripe from "stripe";

export async function POST(request: NextRequest) {
  if (!process.env.STRIPE_SEACRET_KEY) {
    console.error("not found STRIPE_SECRET_KEY");
    return;
  }

  const supabase = await createClient();

  const data = await request.json();
  const { id, email } = data;

  const stripe = new initStripe(process.env.STRIPE_SEACRET_KEY);
  const customer = await stripe.customers.create({
    email,
  });

  const profile = await supabase.from("profile").select("*");
  console.log(profile);

  const { error } = await supabase
    .from("profile")
    .update({
      stripe_customer: customer.id,
    })
    .eq("id", id);

  console.log(error);

  return NextResponse.json({
    message: `stripe customer created: ${customer.id}`,
  });
}
