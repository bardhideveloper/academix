export type CourseProgress = {
  courseId: number;
  title?: string;
  completedLessons: number;
  totalLessons: number;
  lastActive: string; // ISO date
};

export type ProgressResponse = {
  courseProgress: CourseProgress[];
};
