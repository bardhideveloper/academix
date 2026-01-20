import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCourse, getCourseContentActivity } from "../services/courses.api";
import type { Course, CourseContentActivityResponse } from "../types";
import { useDocumentTitle } from "../../../lib/useDocumentTitle";
import { getMyProgress } from "../../progress/services/progress.api";
import ProgressInline from "../components/ProgressInline";

export default function CourseContent() {
  const { id } = useParams();
  const course_id = Number(id);
  useDocumentTitle("AcademiX — Course Content");

  const [course, setCourse] = useState<Course | undefined>();
  const [activity, setActivity] = useState<CourseContentActivityResponse | undefined>();
  const [completed, setCompleted] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const [c, a, p] = await Promise.all([
          getCourse(course_id),
          getCourseContentActivity(course_id),
          getMyProgress(),
        ]);
        if (!mounted) return;
        setCourse(c);
        setActivity(a);
        const match = p?.courseProgress?.find((x: any) => Number(x.course_id) === course_id);
        setCompleted(Number(match?.completed_lessons || 0));
        setTotal(Number(match?.total_lessons || 0));
      } finally {
        if (mounted) setLoading(false);
      }
    }
    if (Number.isFinite(course_id)) load();
    return () => { mounted = false; };
  }, [course_id]);

  const lastActivityDate = useMemo(() => activity?.activity?.last_activity_date, [activity]);
  const predictedLabel = useMemo(() => {
    const predicted = activity?.activity?.predicted_cancellation;
    if (typeof predicted === "boolean") return predicted ? "High cancellation risk" : "Low cancellation risk";
  }, [activity]);

  if (loading) return <p>Loading…</p>;
  if (!course || !activity) return <p>Course content not found. <Link to={`/courses/${course_id}`}>Back</Link></p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
      {course.description && <p className="mb-4">{course.description}</p>}
      <section className="mb-4">
        <div className="flex items-center gap-4">
          <div>{completed}/{total} lessons</div>
        </div>
        {lastActivityDate && <p className="opacity-70 mt-1">Last activity: {new Date(lastActivityDate).toLocaleString()}</p>}
        {predictedLabel && <p className="opacity-70">{predictedLabel}</p>}
      </section>
      <ProgressInline completed={completed} total={total} last_activity_date={lastActivityDate} />
      <p className="mt-4"><Link to={`/courses/${course_id}`}>← Back to courses</Link></p>
    </div>
  );
}
