import { http } from "../../../lib/http";
import type { SubscriptionStatus, CheckoutPayload } from "../types";

const BASE = "/subscriptions";

export async function getAvailableSubscriptions(): Promise<SubscriptionStatus[]> {
  const { data } = await http.get<SubscriptionStatus[]>(`${BASE}/available/`);
  return Array.isArray(data) ? data : [];
}

// ✅ Korrigjuar: backend pret snake_case
export async function startCheckout(payload: { course_id: number }): Promise<void> {
  await http.post(`${BASE}/subscribe/`, payload);
}

export async function getMySubscriptions(): Promise<SubscriptionStatus[]> {
  const { data } = await http.get<SubscriptionStatus[]>(`${BASE}/mine/`);
  return Array.isArray(data) ? data : [];
}

export async function getSubscriptionByCourse(courseId: number): Promise<SubscriptionStatus | null> {
  const { data } = await http.get<SubscriptionStatus | null>(`${BASE}/by-course/${courseId}/`);
  return data ?? null;
}

export async function cancelSubscription(subscriptionId: number): Promise<void> {
  await http.post(`${BASE}/${subscriptionId}/cancel/`);
}

export async function resumeSubscription(subscriptionId: number): Promise<void> {
  await http.post(`${BASE}/${subscriptionId}/resume/`);
}
