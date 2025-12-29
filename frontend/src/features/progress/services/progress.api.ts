import { http } from "../../../lib/http";
import type { ProgressResponse } from "../types";

export async function getMyProgress(): Promise<ProgressResponse> {
  const { data } = await http.get("/progress/me");
  return data as ProgressResponse;
}
