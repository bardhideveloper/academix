import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLessonContent } from "../services/courseContent.api";
import type { LessonContent } from "../types";
import "./LessonContentPage.css";

export default function LessonContentPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState<LessonContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!lessonId) return;

    getLessonContent(Number(lessonId))
      .then(setContent)
      .finally(() => setLoading(false));
  }, [lessonId]);

  if (loading) return <p>Loading lesson…</p>;
  if (!content) return <p>No content found.</p>;

  return (
    <div className="lesson-content-page">
      {/* Always visible back button */}
      <div className="back-links">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>
      </div>

      <h2>Lesson</h2>

      <div className="content-wrapper">
        {content.video_url && <video src={content.video_url} controls />}
        {content.article_text && (
          <div className="article">
            <p>{content.article_text}</p>
            {content.article_pdf && (
              <a href={content.article_pdf} target="_blank" rel="noreferrer">
                Download PDF
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
