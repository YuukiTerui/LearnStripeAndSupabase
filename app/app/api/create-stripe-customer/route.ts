import { NextRequest, NextResponse } from "next/server";
import initStripe from "stripe";

export async function POST(request: NextRequest) {
  if (!process.env.STRIPE_SEACRET_KEY) {
    console.error("not found STRIPE_SECRET_KEY");
    return;
  }

  const data = await request.json();
  const { email } = data;

  const stripe = new initStripe(process.env.STRIPE_SEACRET_KEY);
  const customer = await stripe.customers.create({
    email,
  });

  return NextResponse.json({
    message: `stripe customer created: ${customer.id}`,
  });
}
