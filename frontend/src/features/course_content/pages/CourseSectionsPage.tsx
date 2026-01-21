import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCourseSections } from "../services/courseContent.api";
import type { ContentSection } from "../types";
import SectionCard from "../components/SectionCard";
import "./CourseSectionsPage.css";

export default function CourseSectionsPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [sections, setSections] = useState<ContentSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId) return;

    getCourseSections(Number(courseId))
      .then(setSections)
      .catch(() => setErr("Failed to load sections"))
      .finally(() => setLoading(false));
  }, [courseId]);

  if (loading) return <p>Loading sections…</p>;
  if (err) return <p className="error">{err}</p>;
  if (!sections.length) return <p>No sections found for this course.</p>;

  return (
    <div className="course-sections-page">
      <h2>Course Sections</h2>

      <div className="back-link">
        <button onClick={() => navigate("/subscriptions")} className="back-button">
          ← Back to Subscriptions
        </button>
      </div>


      {sections.map((s) => (
        <SectionCard
          key={s.id}
          title={s.title}
          order={s.order}
          onOpen={() =>
            navigate(`/course_content/sections/${courseId}/lessons/${s.id}`)
          }
        />
      ))}
    </div>
  );
}
