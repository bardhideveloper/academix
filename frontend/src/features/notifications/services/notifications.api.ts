import { http } from "../../../lib/http";
import type { NotificationsResponse } from "../types";

export async function listNotifications(): Promise<NotificationsResponse> {
  const { data } = await http.get("/notifications");
  return data as NotificationsResponse;
}

export async function markNotificationRead(id: number): Promise<void> {
  await http.post(`/notifications/${id}/read`);
}

export async function markAllNotificationsRead(): Promise<void> {
  await http.post(`/notifications/read-all`);
}
