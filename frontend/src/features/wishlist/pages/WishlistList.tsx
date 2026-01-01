import { useEffect, useState } from "react";
import { listWishlist } from "../services/wishlist.api";
import type { WishlistItem } from "../types";
import type { Course } from "../../courses/types";
import { http } from "../../../lib/http";
import CourseCard from "../../courses/components/CourseCard";
import SkeletonCard from "../../../components/Skeleton/SkeletonCard";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "../../../lib/useDocumentTitle";

export default function WishlistList() {
    useDocumentTitle("AcademiX — Wishlist");

    const [items, setItems] = useState<WishlistItem[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        async function load() {
            try {
                const wishlist = await listWishlist();
                if (!mounted) return;
                setItems(wishlist);

                const ids = wishlist.map(w => w.course_id);

                const fetched = await Promise.all(
                    ids.map(id =>
                        http.get<Course>(`/courses/${id}`).then(r => r.data).catch(() => undefined)
                    )
                );

                const fetchedCourses = (fetched.filter(Boolean) as Course[])
                    .filter((c, idx, arr) => arr.findIndex(x => x.id === c.id) === idx)
                    .sort((a, b) => a.title.localeCompare(b.title));

                if (mounted) setCourses(fetchedCourses);
            } finally {
                if (mounted) setLoading(false);
            }
        }

        load();
        return () => { mounted = false; };
    }, []);

    return (
        <div>
            <h1>Wishlist {items.length}</h1>

            {loading ? (
                <div className="grid">
                    {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
                </div>
            ) : courses.length === 0 ? (
                <p style={{ opacity: 0.7 }}>
                    Your wishlist is empty. <Link to="/courses">Browse courses</Link>
                </p>
            ) : (
                <div className="grid">
                    {courses.map(c => (
                        <Link
                            key={c.id}
                            to={`/courses/${c.id}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                            aria-label={`Open course ${c.title}`}
                        >
                            <CourseCard course={c} />
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
