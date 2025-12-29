import { useEffect, useState } from "react";
import { useDocumentTitle } from "../../../lib/useDocumentTitle";
import { getMyProgress } from "../services/progress.api";
import type { CourseProgress } from "../types";
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
        const data = await getMyProgress();
        setItems(data.courseProgress);
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
