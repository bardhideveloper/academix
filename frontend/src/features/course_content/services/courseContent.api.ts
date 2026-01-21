import { http } from "../../../lib/http";
import type {
  ContentSection,
  ContentLesson,
  LessonContent,
} from "../types";

const BASE = "/course-content";

export async function getCourseSections(
  courseId: number
): Promise<ContentSection[]> {
  const { data } = await http.get<ContentSection[]>(
    `${BASE}/courses/${courseId}/sections/`
  );
  return Array.isArray(data) ? data : [];
}

export async function getSectionLessons(
  sectionId: number
): Promise<ContentLesson[]> {
  const { data } = await http.get<ContentLesson[]>(
    `${BASE}/sections/${sectionId}/lessons/`
  );
  return Array.isArray(data) ? data : [];
}


export async function getLessonContent(
  lessonId: number
): Promise<LessonContent | null> {
  const { data } = await http.get<LessonContent>(
    `${BASE}/lessons/${lessonId}/content/`
  );
  return data ?? null;
}
