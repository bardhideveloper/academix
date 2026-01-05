
import { http } from "../../../lib/http";
import type { SubscriptionStatus, CheckoutPayload } from "../types";

export async function getAvailableSubscriptions(): Promise<SubscriptionStatus[]> {
  const { data } = await http.get<SubscriptionStatus[]>("/subscriptions/available");
  return Array.isArray(data) ? data : [];
}

export async function startCheckout(payload: CheckoutPayload): Promise<void> {
  await http.post("/subscriptions/checkout", payload);
}

export async function getMySubscriptions(): Promise<SubscriptionStatus[]> {
  const { data } = await http.get<SubscriptionStatus[]>("/subscriptions/mine");
  return Array.isArray(data) ? data : [];
}

export async function getSubscriptionByCourse(courseId: number): Promise<SubscriptionStatus | null> {
  const { data } = await http.get<SubscriptionStatus | null>(`/subscriptions/by-course/${courseId}`);
  return data ?? null;
}

export async function cancelSubscription(subscriptionId: number): Promise<void> {
  await http.post(`/subscriptions/${subscriptionId}/cancel`);
}

export async function resumeSubscription(subscriptionId: number): Promise<void> {
  await http.post(`/subscriptions/${subscriptionId}/resume`);
}
