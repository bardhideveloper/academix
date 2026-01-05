import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCourse } from '../services/courses.api';
import type { Course } from '../types';
import WishlistButton from '../../wishlist/components/WishlistButton';
import SubscribeButton from '../../subscriptions/components/SubscribeButton';
import { useDocumentTitle } from '../../../lib/useDocumentTitle';

export default function CourseDetail() {
  useDocumentTitle('AcademiX — Courses Detail');
  const { id } = useParams();
  const [course, setCourse] = useState<Course | undefined>();
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    getCourse(Number(id))
      .then(d => setCourse(d))
      .catch(e => setErr(e?.message ?? 'Failed to load course'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading…</p>;
  if (err) return <p style={{ color: 'crimson' }}>{err}</p>;
  if (!course) return <p>Course not found. <Link to="/courses">Back</Link></p>;

  return (
    <div>
      <h1>{course.title}</h1>
      {course.description && <p>{course.description}</p>}

      <div style={{ margin: '12px 0', display: 'flex', gap: 8 }}>
        <WishlistButton courseId={course.id} />
        <SubscribeButton courseId={course.id} />
      </div>

      <p style={{ marginTop: 12 }}>
        <Link to={`/courses/${course.id}/content`}>Go to content →</Link>
      </p>

      <p><Link to="/courses">← Back to courses</Link></p>
    </div>
  );
}
``
