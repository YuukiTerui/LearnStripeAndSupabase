import { SubscriptionButtion } from "@/components/checkout/SubscriptionButtion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Database } from "@/lib/database.types";
import { createClient } from "@/lib/supabase/client";
import SupabaseClient from "@supabase/supabase-js/dist/module/SupabaseClient";
import initStripe, { Stripe } from "stripe";

interface Plan {
  id: string;
  name: string;
  amount: number | null;
  interval: Stripe.Price.Recurring.Interval;
  currency: string;
}

const getAllPlans = async (): Promise<Plan[]> => {
  if (!process.env.STRIPE_SEACRET_KEY) {
    console.error("not found STRIPE_SECRET_KEY");
    return [];
  }
  const stripe = new initStripe(process.env.STRIPE_SEACRET_KEY);

  const { data } = await stripe.plans.list();
  const sortedPlans = await Promise.all(
    data.map(async (plan) => {
      const product = await stripe.products.retrieve(plan.product as string);
      return {
        id: plan.id,
        name: product.name,
        amount: plan.amount,
        interval: plan.interval,
        currency: plan.currency,
      };
    })
  );

  return sortedPlans.sort((a, b) => a.amount! - b.amount!);
};

const getProfile = async (db: SupabaseClient<Database>) => {
  const data = await db.from("profile").select("*").single();
  console.log("getProfile", data);
  return data.data;
};

const PricingPage = async () => {
  const db = await createClient();
  const [plans, profile, { data: user }] = await Promise.all([
    getAllPlans(),
    getProfile(db),
    db.auth.getSession(),
  ]);
  if (!profile || !user) return;
  if (!plans) return <div>Plans not found</div>;

  const isSubscribed = !!user.session && !profile.is_subscribed;

  return (
    <div className="w-full max-w-3xl mx-auto py-16 flex justify-around">
      {plans.map((plan) => (
        <Card key={plan.id} className="w-1/3 shadow-lg flex">
          <CardHeader>
            <CardTitle>{plan.name} Plun</CardTitle>
            <CardDescription>{`¥${plan.amount} / ${plan.interval}`}</CardDescription>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter className="justify-center">
            <SubscriptionButtion
              isSubscribed={isSubscribed}
              planId={plan.id}
            ></SubscriptionButtion>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default PricingPage;
