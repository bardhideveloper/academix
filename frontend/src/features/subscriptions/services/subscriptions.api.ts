import { http } from "../../../lib/http";
import type { SubscriptionStatus, CheckoutPayload } from "../types";

export async function getAvailableSubscriptions(): Promise<SubscriptionStatus[]> {
  const { data } = await http.get<SubscriptionStatus[]>("/subscriptions/available");
  return Array.isArray(data) ? data : [];
}

export async function startCheckout(payload: CheckoutPayload): Promise<void> {
  await http.post("/subscriptions/checkout", payload);
}
