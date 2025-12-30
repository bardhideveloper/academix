export type NotificationItem = {
  id: number;
  type: "reminder" | "recommendation" | "subscription" | "progress" | "system";
  message: string;
  createdAt: string;
  read: boolean;
};

export type NotificationsResponse = NotificationItem[];
