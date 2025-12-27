
import { useEffect, useState } from 'react';
import { listCourses } from '../services/courses.api';
import type { Course } from '../types';
import CourseCard from '../components/CourseCard';
import { Link } from 'react-router-dom';
import CourseFilter from '../components/CourseFilter';
import SkeletonCard from '../../../components/Skeleton/SkeletonCard';
import { useDocumentTitle } from '../../../lib/useDocumentTitle';


export default function CoursesList() {
  useDocumentTitle('AcademiX — Courses');
  const [courses, setCourses] = useState<Course[]>([]);
  const [filtered, setFiltered] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listCourses().then(d => {
      setCourses(d);
      setFiltered(d);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h1>Courses</h1>
      {loading ? (
        <div className="grid">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <>
          <CourseFilter courses={courses} onChange={setFiltered} />
          <div className="grid">
            {filtered.map(c => (
              <Link key={c.id} to={`/courses/${c.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <CourseCard course={c} />
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

