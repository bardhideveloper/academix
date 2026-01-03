import type { ISODate } from "../../lib/common";

export type Course = {
  id: number;
  title: string;
  description?: string;
  category?: 'beginner' | 'intermediate' | 'advanced';
  created_at: ISODate
  updated_at: ISODate
};

export type CourseActivity = {
  id: number;
  course_id: number;
  user_id: number;
  last_activity_date?: ISODate
  predicted_cancellation?: boolean;
  logged_at: ISODate;
};

export type CourseContentActivityResponse = {
  activity: CourseActivity;
};

