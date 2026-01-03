
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProgressInline from "../components/ProgressInline";
import { getCourse, getCourseContentActivity } from "../services/courses.api";
import type { Course, CourseContentActivityResponse } from "../types";
import { useDocumentTitle } from "../../../lib/useDocumentTitle";
import { getMyProgress } from "../../progress/services/progress.api";

export default function CourseContent() {
    const { id } = useParams();
    const course_id = Number(id);
    useDocumentTitle("AcademiX — Course Content");

    const [course, setCourse] = useState<Course | undefined>();
    const [activity, setActivity] = useState<CourseContentActivityResponse | undefined>();
    const [completed, setCompleted] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let mounted = true;

        async function load() {
            setLoading(true);
            try {
                const [c, a, p] = await Promise.all([
                    getCourse(course_id),
                    getCourseContentActivity(course_id),
                    getMyProgress(),
                ]);

                if (!mounted) return;

                setCourse(c);
                setActivity(a);

                const match = p?.courseProgress?.find((x: any) => Number(x.course_id) === course_id);
                const comp = Number(match?.completed_lessons || 0);
                const tot = Number(match?.total_lessons || 0);

                setCompleted(comp);
                setTotal(tot);
            } finally {
                if (mounted) setLoading(false);
            }
        }

        if (Number.isFinite(course_id)) load();
        return () => {
            mounted = false;
        };
    }, [course_id]);

    // Use only the API-provided last_activity_date from CourseActivity
    const lastActivityDate = useMemo(() => {
        return activity?.activity?.last_activity_date;
    }, [activity]);

    if (loading) return <p>Loading…</p>;

    if (!course || !activity) {
        return (
            <p>
                Course content not found. <Link to={`/courses/${course_id}`}>Back</Link>
            </p>
        );
    }

    // predicted_cancellation is boolean per your types
    const predicted = activity.activity?.predicted_cancellation;
    const predictedLabel =
        typeof predicted === "boolean"
            ? predicted
                ? "High cancellation risk"
                : "Low cancellation risk"
            : undefined;

    return (
        <div>
            <h1>{course.title}</h1>
            {course.description && <p>{course.description}</p>}

            <section style={{ margin: "16px 0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ minWidth: 160 }}>
                        {completed}/{total} lessons
                    </div>
                </div>

                {lastActivityDate && (
                    <p style={{ opacity: 0.7, marginTop: 8 }}>
                        Last activity: {new Date(lastActivityDate).toLocaleString()}
                    </p>
                )}

                {predictedLabel && (
                    <p style={{ opacity: 0.7 }}>{predictedLabel}</p>
                )}
            </section>

            <ProgressInline
                completed={completed}
                total={total}
                last_activity_date={lastActivityDate}
            />

            <p style={{ marginTop: 16 }}>
                <Link to={`/courses/${course_id}`}>← Back to courses</Link>
            </p>
        </div>
    );
}
