import { http } from "../../../lib/http";
import type { Course } from "../types";

export async function listCourses(): Promise<Course[]> {
  await new Promise((r) => setTimeout(r, 200));
  const { data } = await http.get<Course[]>("/courses");
  return data;
}

export async function getCourse(id: number): Promise<Course | undefined> {
  await new Promise((r) => setTimeout(r, 150));
  try {
    const { data } = await http.get<Course>(`/courses/${id}`);
    return data;
  } catch (err: any) {
    if (err?.response?.status === 404) return undefined;
    throw err;
  }
}
