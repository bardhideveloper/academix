import type { Course } from "../courses/types";

export type CourseProgress = {
  id: number;
  user_id: number;
  course: Course;
  completed_lessons: number;
  total_lessons: number;
  progress_percentage: number;
};

export type ProgressResponse = {
  courseProgress: CourseProgress[];
};
