import type { ISODate } from "../../lib/common";

export type SubscriptionStatus = {
  course_title: string;
  can_access_content: any;
  id: number;
  status: string;
  start_date: ISODate;
  end_date?: ISODate;
  created_at: ISODate;
  user_id: number;
  course_id: number;
};

export type CheckoutPayload = {
  course_id: number
};
