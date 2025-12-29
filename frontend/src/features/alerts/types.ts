export type AlertItem = {
  id: number;
  type: "reminder" | "recommendation" | "subscription" | "progress" | "system";
  message: string;
  createdAt: string;
  read: boolean;
};

export type AlertsResponse = AlertItem[];
