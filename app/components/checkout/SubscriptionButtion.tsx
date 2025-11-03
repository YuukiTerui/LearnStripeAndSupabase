"use client";

import { redirect } from "next/navigation";
import { Button } from "../ui/button";

export const SubscriptionButtion = ({
  isSubscribed,
  planId,
}: {
  isSubscribed: boolean;
  planId: string;
}) => {
  const handleSubscribed = async () => {
    const response = await fetch(`/api/subscription/${planId}`);
    const data = await response.json();
    redirect(data.url);
  };

  return (
    <Button variant="outline" onClick={handleSubscribed}>
      {isSubscribed ? "サブスクリプションを管理する" : "購入する"}
    </Button>
  );
};
