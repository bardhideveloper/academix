/*import { useEffect, useState } from "react";
import { getCourseContentActivity } from "../services/courses.api";
import LessonDetail from "../components/LessonDetail";
import type { Lesson } from "../types";

type Props = { courseId: number };

export default function CourseContentPage({ courseId }: Props) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getCourseContentActivity(courseId);
        setLessons(data);
        if (data.length > 0) setSelectedLesson(data[0]); // shfaq leksionin e parë
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [courseId]);

  if (loading) return <p>Loading lessons...</p>;

  return (
    <div style={{ display: "flex", gap: 24 }}>
      <div style={{ width: 300 }}>
        <h3>Lessons</h3>
        <ul>
          {lessons.map((lesson) => (
            <li key={lesson.id}>
              <button onClick={() => setSelectedLesson(lesson)}>
                {lesson.title} {lesson.is_preview ? "(Preview)" : ""}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ flex: 1 }}>
        {selectedLesson ? (
          <LessonDetail lesson={selectedLesson} />
        ) : (
          <p>Select a lesson to view</p>
        )}
      </div>
    </div>
  );
}
*/