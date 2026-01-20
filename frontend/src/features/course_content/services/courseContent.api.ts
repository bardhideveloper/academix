/*import { http } from "../../../lib/http";
import type { Lesson } from "../types";

export async function getLessonDetail(lessonId: number): Promise<Lesson> {
  const { data } = await http.get<Lesson>(`/course_content/${lessonId}/`);
  return data;
}

export async function getCourseLessons(courseId: number): Promise<Lesson[]> {
  const { data } = await http.get<Lesson[]>(`/course-content/by-course/${courseId}/`);
  return data;
}
*/