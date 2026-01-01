
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProgressInline from "../components/ProgressInline";
import { getCourse, getCourseContentActivity } from "../services/courses.api";
import type { Course, CourseContentActivityResponse } from "../types";
import { useDocumentTitle } from "../../../lib/useDocumentTitle";
import { getMyProgress } from "../../progress/services/progress.api";

export default function CourseContent() {
    const { id } = useParams();
    const courseId = Number(id);
    useDocumentTitle("AcademiX — Course Content");

    const [course, setCourse] = useState<Course | undefined>();
    const [activity, setActivity] = useState<CourseContentActivityResponse | undefined>();
    const [completed, setCompleted] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [lastActive, setLastActive] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let mounted = true;

        async function load() {
            setLoading(true);
            try {
                const [c, a, p] = await Promise.all([
                    getCourse(courseId),
                    getCourseContentActivity(courseId),
                    getMyProgress(),
                ]);

                if (!mounted) return;

                setCourse(c);
                setActivity(a);

                const match = p?.courseProgress?.find((x: any) => Number(x.courseId) === courseId);
                const comp = Number(match?.completedLessons || 0);
                const tot = Number(match?.totalLessons || 0);

                setCompleted(comp);
                setTotal(tot);
                setLastActive(match?.lastActive);
            } finally {
                if (mounted) setLoading(false);
            }
        }

        if (Number.isFinite(courseId)) load();
        return () => { mounted = false; };
    }, [courseId]);

    const lastActivityDate = useMemo(() => {
        return activity?.activity?.lastActivityDate ?? lastActive;
    }, [activity, lastActive]);

    if (loading) return <p>Loading…</p>;

    if (!course || !activity) {
        return (
            <p>
                Course content not found. <Link to={`/courses/${courseId}`}>Back</Link>
            </p>
        );
    }

    const predicted = activity.activity?.predictedCancellation;
    const predictedPct = typeof predicted === "number" ? Math.round(predicted * 100) : undefined;

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

                {typeof predictedPct === "number" && (
                    <p style={{ opacity: 0.7 }}>
                        Predicted cancellation risk: {predictedPct}%
                    </p>
                )}
            </section>

            <ProgressInline
                completed={completed}
                total={total}
                lastActive={lastActivityDate}
            />

            <p style={{ marginTop: 16 }}>
                <Link to={`/courses/${courseId}`}>← Back to courses</Link>
            </p>
        </div>
    );
}
