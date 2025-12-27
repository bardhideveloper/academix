import type { Course } from '../types';

const MOCK: Course[] = [
  { id: 1, title: 'Intro to React', description: 'Components, props, state', level: 'beginner' },
  { id: 2, title: 'Advanced Django', description: 'ORM, permissions, DRF', level: 'advanced' },
  { id: 3, title: 'MySQL Basics', description: 'Queries, joins, indexes', level: 'beginner' },
];

export async function listCourses(): Promise<Course[]> {
  await new Promise(r => setTimeout(r, 200));
  return MOCK;
}

export async function getCourse(id: number): Promise<Course | undefined> {
  await new Promise(r => setTimeout(r, 150));
  return MOCK.find(c => c.id === id);
}
