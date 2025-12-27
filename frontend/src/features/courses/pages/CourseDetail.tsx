
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCourse } from '../services/courses.api';
import type { Course } from '../types';
import { useDocumentTitle } from '../../../lib/useDocumentTitle';

export default function CourseDetail() {
  useDocumentTitle('AcademiX — Courses Detail');
  const { id } = useParams();
  const [course, setCourse] = useState<Course | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getCourse(Number(id)).then(d => { setCourse(d); setLoading(false); });
  }, [id]);

  if (loading) return <p>Loading…</p>;
  if (!course) return <p>Course not found. <Link to="/courses">Back</Link></p>;

  return (
    <div>
      <h1>{course.title}</h1>
      {course.description && <p>{course.description}</p>}
      <p><Link to="/courses">← Back to courses</Link></p>
    </div>
  );
}
