import { useEffect, useState } from "react";
import type { WishlistItem } from "../types";
import { listWishlist } from "../services/wishlist.api";
import WishlistButton from "../components/WishlistButton";

export default function WishlistList() {
    const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchWishlist = async () => {
        setLoading(true);
        try {
            const data = await listWishlist();
            setWishlist(data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchWishlist(); }, []);

    if (loading) return <p>Loading...</p>;
    if (!wishlist.length) return <p>Your wishlist is empty.</p>;

    return (
        <div className="wishlist-grid">
            {wishlist.map(item => (
                <div key={item.id} className="wishlist-item" style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8, marginBottom: 12 }}>
                    <h2>{item.course.title}</h2>
                    <p>{item.course.description}</p>
                    <p><strong>Code:</strong> {item.course.code}</p>
                    <p><strong>Credits:</strong> {item.course.credits}</p>
                    <p><strong>Semester:</strong> {item.course.semester}</p>
                    <p><strong>Year:</strong> {item.course.academic_year}</p>
                    <p><strong>Active:</strong> {item.course.is_active ? "Yes" : "No"}</p>

                    <WishlistButton courseId={item.course.id} size="sm" onToggleSuccess={fetchWishlist} />
                </div>
            ))}
        </div>
    );
}
