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
    if (isSubscribed) {
      await fetch(`http://localhost:3000/api/subscription/${planId}`);
    } else {
      // ログインページに遷移
    }
  };

  return (
    <Button variant="outline" onClick={handleSubscribed}>
      {isSubscribed ? "サブスクリプションを管理する" : "購入する"}
    </Button>
  );
};
