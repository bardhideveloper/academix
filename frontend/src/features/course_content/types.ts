import type { ISODate } from "../../lib/common";

export type ContentSection = {
  id: number;
  title: string;
  order: number;
  created_at: ISODate;
  course_id: number;
};

export type ContentLesson = {
  id: number;
  title: string;
  content_type: "video" | "article" | "mixed";
  order: number;
  is_preview: boolean;
  created_at: ISODate;
  section_id: number;
};

export type LessonContent = {
  id: number;
  video_url?: string | null;
  article_text?: string | null;
  article_pdf?: string | null;
  lesson_id: number;
};
