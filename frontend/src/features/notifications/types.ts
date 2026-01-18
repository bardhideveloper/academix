// import type { ISODate } from "../../lib/common";

export type NotificationItem = {
  id: number;
  title: string;
  message: string;
  type: string;
  status: "sent" | "pending" | "read";
  created_at: string;
  sent_at?: string;
  user_id: number;
  read?: boolean;
};


export type NotificationsResponse = NotificationItem[];
