import type { CourseProgress } from "../types";

export default function ProgressList({ items }: { items: CourseProgress[] }) {
  return (
    <ul style={{ display: "grid", gap: 12 }}>
      {items.map((p) => {
        const pct = p.totalLessons ? Math.round((p.completedLessons / p.totalLessons) * 100) : 0;
        return (
          <li key={p.courseId} style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <b>{p.title ?? `Course #${p.courseId}`}</b>
                <div style={{ color: "#6b7280" }}>
                  {p.completedLessons}/{p.totalLessons} ({pct}%)
                </div>
                <small style={{ color: "#9ca3af" }}>
                  Last active: {new Date(p.lastActive).toLocaleString()}
                </small>
              </div>
              <div style={{ width: 160 }}>
                <div style={{ height: 8, background: "#e5e7eb", borderRadius: 999 }}>
                  <div
                    style={{
                      width: `${pct}%`,
                      height: 8,
                      background: "#10b981",
                      borderRadius: 999,
                    }}
                  />
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
