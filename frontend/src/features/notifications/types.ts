export type NotificationItem = {
  id: number;
  title: string;
  type: "reminder" | "recommendation" | "subscription" | "progress" | "system";
  message: string;
  status: "test" | "test1"
  createdAt: string;
  read: boolean;
};

export type NotificationsResponse = NotificationItem[];
