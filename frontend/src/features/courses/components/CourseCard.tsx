import type { Course } from '../types';

export default function CourseCard({ course }: { course: Course }) {
  return (
    <div className="card">
      <h3 style={{ marginTop: 0 }}>{course.title}</h3>
      {course.description && <p style={{ marginBottom: 8 }}>{course.description}</p>}
      {course.code && <p style={{ marginBottom: 8 }}>{course.code}</p>}
      {course.credits && <p style={{ marginBottom: 8 }}>{course.credits}</p>}
      {course.semester && <p style={{ marginBottom: 8 }}>{course.semester}</p>}
      {course.academic_year && <p style={{ marginBottom: 8 }}>{course.academic_year}</p>}
      {course.is_active && <p style={{ marginBottom: 8 }}>{course.is_active}</p>}
      {course.instructor_id && <p style={{ marginBottom: 8 }}>{course.instructor_id}</p>}
    </div>
  );
}
