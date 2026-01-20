import type { ISODate } from "../../lib/common";

export type Course = {
  isSubscribed: any;
  id: number;
  title: string;
  code: string;
  description?: string;
  credits: string;
  semester: string;
  academic_year: string;
  is_active: boolean;
  created_at: ISODate;
  instructor_id: number;
  instructor_name:string;
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

