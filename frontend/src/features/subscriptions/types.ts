export type SubscriptionStatus = {
  status: "active" | "inactive";
  plan?: "basic" | "pro" | string;
  renewsAt?: string;
};

export type CheckoutPayload = {
  plan: "basic" | "pro";
};
