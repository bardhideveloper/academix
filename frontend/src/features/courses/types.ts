export type Course = {
  id: number;
  title: string;
  description?: string;
  category?: 'beginner' | 'intermediate' | 'advanced';
};


export type CourseActivity = {
  id: number;
  userId: number;
  courseId: number;
  lastActivityDate?: string;
  predictedCancellation?: number;
  loggedAt?: string;
};

export type CourseContentActivityResponse = {
  activity: CourseActivity;
};

