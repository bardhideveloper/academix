import { http } from "../../../lib/http";
import type { NotificationsResponse } from "../types";

export async function listNotifications(): Promise<NotificationsResponse> {
  const { data } = await http.get("notifications");
  return data as NotificationsResponse;
}
export async function markNotificationRead(id: number): Promise<void> {
  await http.post(`notifications/${id}/read`);
}
export async function markAllNotificationsRead(): Promise<void> {
  await http.post(`notifications/read-all`);
}
export async function getUnreadCount(): Promise<number> {
  const { data } = await http.get(`notifications/unread-count`);
  return data.unread as number;
}
