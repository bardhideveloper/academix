import { http } from "../../../lib/http";
import type { CourseProgress } from "../types";

export async function getMyProgress(): Promise<CourseProgress[]> {
  const { data } = await http.get<CourseProgress[]>("/progress/my");
  return Array.isArray(data) ? data : [];
}
