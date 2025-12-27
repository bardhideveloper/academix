export type Course = {
  id: number;
  title: string;
  description?: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
};
