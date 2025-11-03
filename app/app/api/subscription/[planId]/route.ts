import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import initStripe from "stripe";

export async function GET(
  req: NextRequest,
  { params }: { params: { planId: string } }
) {
  const db = await createClient();

  const { data } = await db.auth.getUser();

  const user = data.user;
  if (!user) {
    console.error(`user not found. ${user}`);
    return NextResponse.json("Unauthorized", { status: 401 });
  }
  const { data: stripe_customer } = await db
    .from("profile")
    .select("stripe_customer")
    .eq("id", user.id)
    .single();

  if (!process.env.STRIPE_SEACRET_KEY) {
    console.error("STRIPE_SEACRET_KEY not found");
    return NextResponse.error();
  }
  const stripe = new initStripe(process.env.STRIPE_SEACRET_KEY);

  const session = await stripe.checkout.sessions.create({
    customer: stripe_customer?.stripe_customer!,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: params.planId, quantity: 1 }],
    success_url: `${req.nextUrl.origin}/payment/success`,
    cancel_url: `${req.nextUrl.origin}/payment/canceled`,
  });

  return NextResponse.json({
    id: session.id,
  });
}
