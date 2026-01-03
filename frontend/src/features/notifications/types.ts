import type { ISODate } from "../../lib/common";

export type NotificationItem = {
  id: number;
  user_id: number;
  title: string;
  message: string;
  type: "reminder" | "recommendation" | "subscription" | "progress" | "system";
  status: "test" | "test1"
  created_at: ISODate;
  sent_at?: ISODate; 
  read: boolean;
};

export type NotificationsResponse = NotificationItem[];
