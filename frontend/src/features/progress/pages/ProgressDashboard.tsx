import { useEffect, useState } from "react";
import { useDocumentTitle } from "../../../lib/useDocumentTitle";
import { getMyProgress } from "../services/progress.api";
import { listCourses } from "../../courses/services/courses.api";
import type { CourseProgress } from "../types";
import type { Course } from "../../courses/types";
import ProgressSummary from "../components/ProgressSummary";
import ProgressList from "../components/ProgressList";

export default function ProgressDashboard() {
  useDocumentTitle("AcademiX — Progress Dashboard");

  const [items, setItems] = useState<CourseProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        const courses: Course[] = await listCourses();
        const courseMap: Record<number, Course> = courses.reduce((acc, c) => {
          acc[c.id] = c;
          return acc;
        }, {} as Record<number, Course>);

        const rawProgress = await getMyProgress();

        const progressWithCourses: CourseProgress[] = rawProgress.map(p => ({
          ...p,
          course: courseMap[p.id]
        }));

        setItems(progressWithCourses);
      } catch (e: any) {
        setErr(e.friendlyMessage ?? "Failed to load progress");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  if (loading) return <p>Loading progress…</p>;
  if (err) return <p style={{ color: "crimson" }}>{err}</p>;

  return (
    <div>
      <h1>Your Progress</h1>
      <ProgressSummary items={items} />
      <ProgressList items={items} />
    </div>
  );
}
