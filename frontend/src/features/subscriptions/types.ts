import type { ISODate } from "../../lib/common";

export type SubscriptionStatus = {
  id: number;
  user_id: number;
  course_id: number;
  status: "active" | "inactive" | "in_progress" | "canceled";
  start_date: ISODate;
  end_date?: ISODate;
  progress: number;
};

export type CheckoutPayload = {
  course_id: number
};
