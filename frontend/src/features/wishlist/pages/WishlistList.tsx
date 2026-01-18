import { useEffect, useState } from "react";
import { listWishlist } from "../services/wishlist.api";
import type { WishlistItem } from "../types";
import { useDocumentTitle } from "../../../lib/useDocumentTitle";

export default function WishlistList() {
    useDocumentTitle("AcademiX — Wishlist");

    const [items, setItems] = useState<WishlistItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        async function load() {
            try {
                const wishlist = await listWishlist();
                if (mounted) setItems(wishlist);
            } finally {
                if (mounted) setLoading(false);
            }
        }

        load();
        return () => {
            mounted = false;
        };
    }, []);

    return (
        <div>
            <h1>Wishlist ({items.length})</h1>

            {loading ? (
                <p>Loading…</p>
            ) : items.length === 0 ? (
                <p style={{ opacity: 0.7 }}>Your wishlist is empty.</p>
            ) : (
                <ul style={{ display: "grid", gap: 12 }}>
                    {items.map((w) => (
                        <li
                            key={w.id}
                            style={{
                                border: "1px solid #e5e7eb",
                                borderRadius: 8,
                                padding: 12,
                            }}
                        >
                            <div><b>User ID:</b> {w.user_id}</div>
                            <div><b>Course ID:</b> {w.course_id}</div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
