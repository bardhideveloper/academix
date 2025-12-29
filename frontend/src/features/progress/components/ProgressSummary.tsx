import type { CourseProgress } from "../types";

export default function ProgressSummary({ items }: { items: CourseProgress[] }) {
  const totals = items.reduce(
    (acc, p) => {
      acc.completed += p.completedLessons;
      acc.total += p.totalLessons;
      return acc;
    },
    { completed: 0, total: 0 }
  );
  const pct = totals.total ? Math.round((totals.completed / totals.total) * 100) : 0;

  return (
    <div style={{ marginBottom: 16, padding: 12, border: "1px solid #e5e7eb", borderRadius: 8 }}>
      <b>Overall completion:</b> {totals.completed}/{totals.total} ({pct}%)
      <div style={{ marginTop: 8, height: 8, background: "#e5e7eb", borderRadius: 999 }}>
        <div
          style={{
            width: `${pct}%`,
            height: 8,
            background: "#2563eb",
            borderRadius: 999,
            transition: "width .2s ease",
          }}
        />
      </div>
    </div>
  );
}
