import React, { useEffect, useState } from "react";
import { listCourses } from "../services/courses.api";
import type { Course } from "../types";
import CourseCard from "../components/CourseCard";

export default function CourseList() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    listCourses()
      .then(data => {
        console.log("Courses fetched:", data); // debug
        setCourses(data);
      })
      .catch(err => console.error(err));
  }, []);

  if (!courses.length) return <p>Loading courses...</p>;

  return (
    <div
  style={{
    display: "flex",
    flexWrap: "wrap",
    gap: 12,          
    justifyContent: "flex-start", 
    padding: 16,
  }}
>
      {courses.map(course => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
