import type { Course } from '../types';

export default function CourseCard({ course }: { course: Course }) {
  return (
    <div className="card">
      <h3 style={{ marginTop: 0 }}>{course.title}</h3>
      {course.description && <p style={{ marginBottom: 8 }}>{course.description}</p>}
      {course.level && <small style={{ color: '#6b7280' }}>Level: {course.level}</small>}
    </div>
  );
}
