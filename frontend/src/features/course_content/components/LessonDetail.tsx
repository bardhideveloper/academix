/*import React from "react";
import type { Lesson } from "../types";

type Props = { lesson: Lesson };

export default function LessonDetail({ lesson }: Props) {
  if (!lesson.can_access && !lesson.is_preview) {
    return <p style={{ color: "gray" }}>Subscribe to unlock this lesson.</p>;
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>{lesson.title}</h2>

      {lesson.content_type === "video" && lesson.content.video_url && (
        <iframe
          width="640"
          height="360"
          src={lesson.content.video_url}
          title={lesson.title}
          allowFullScreen
        />
      )}

      {lesson.content_type === "article" && lesson.content.article_text && (
        <div style={{ padding: "12px 0" }}>
          <p>{lesson.content.article_text}</p>
        </div>
      )}

      {lesson.content_type === "pdf" && lesson.content.pdf_url && (
        <iframe
          src={lesson.content.pdf_url}
          width="100%"
          height="600px"
          title={lesson.title}
        />
      )}

      {lesson.is_preview && <p style={{ color: "gray" }}>Preview lesson</p>}
    </div>
  );
}
*/