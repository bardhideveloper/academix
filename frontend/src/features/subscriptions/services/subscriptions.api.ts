import { http } from "../../../lib/http";
import type { SubscriptionStatus, CheckoutPayload } from "../types";

export async function getMySubscription(): Promise<SubscriptionStatus> {
  const { data } = await http.get("/subscriptions/me");
  return data as SubscriptionStatus;
}

export async function startCheckout(payload: CheckoutPayload): Promise<void> {
  await http.post("/subscriptions/checkout", payload);
}
