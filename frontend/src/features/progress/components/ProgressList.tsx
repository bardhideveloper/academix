import type { CourseProgress } from "../types";
import "./ProgressList.css";

type Props = {
  items?: CourseProgress[];
};

export default function ProgressList({ items = [] }: Props) {
  return (
    <ul className="progress-list">
      {items.map((p) => {
        const pct = p.total_lessons
          ? Math.round((p.completed_lessons / p.total_lessons) * 100)
          : 0;

        const courseTitle = p.course?.title ?? `Course #${p.id}`;

        return (
          <li key={p.id} className="progress-item">
            <div className="progress-row">
              <div className="progress-info">
                <b>{courseTitle}</b>
                <div className="progress-meta">
                  {p.completed_lessons}/{p.total_lessons} ({pct}%)
                </div>
              </div>

              <div className="progress-bar-wrapper">
                <div
                  className="progress-bar"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
