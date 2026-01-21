import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSectionLessons } from "../services/courseContent.api";
import type { ContentLesson } from "../types";
import LessonCard from "../components/LessonCard";
import "./SectionLessonsPage.css";

export default function SectionLessonsPage() {
  const { sectionId } = useParams<{ courseId: string; sectionId: string }>();
  const navigate = useNavigate();
  const [lessons, setLessons] = useState<ContentLesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sectionId) return;

    getSectionLessons(Number(sectionId))
      .then(setLessons)
      .finally(() => setLoading(false));
  }, [sectionId]);

  if (loading) return <p>Loading lessons…</p>;
  if (!lessons.length) return <p>No lessons found in this section.</p>;

  return (
    <div className="section-lessons-page">
      <div className="back-link">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>
      </div>

      <h2>Lessons</h2>

      {lessons.map((l) => (
        <LessonCard
          key={l.id}
          title={l.title}
          order={l.order}
          contentType={l.content_type}
          isPreview={l.is_preview}
          onOpen={() => navigate(`/course_content/lessons/${l.id}`)}
        />
      ))}
    </div>
  );
}
