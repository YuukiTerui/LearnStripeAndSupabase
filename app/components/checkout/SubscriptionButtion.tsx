"use client";

import { Button } from "../ui/button";

export const SubscriptionButtion = ({
  isSubscribed,
  planId,
}: {
  isSubscribed: boolean;
  planId: string;
}) => {
  const handleSubscribed = async () => {
    await fetch(`http://localhost:3000/api/subscription/${planId}`);
  };

  return (
    <Button variant="outline" onClick={handleSubscribed}>
      {isSubscribed ? "サブスクリプションを管理する" : "購入する"}
    </Button>
  );
};
