export type Course = {
  id: number;
  title: string;
  description?: string;
  category?: 'beginner' | 'intermediate' | 'advanced';
};
