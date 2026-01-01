import { useEffect, useState } from "react";
import { addToWishlist, removeFromWishlist, isWishlisted } from "../services/wishlist.api";

type Props = {
    courseId: number;
    size?: "sm" | "md";
};

export default function WishlistButton({ courseId, size = "md" }: Props) {
    const [wishlisted, setWishlisted] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        let mounted = true;
        isWishlisted(courseId)
            .then((exists) => {
                if (mounted) {
                    setWishlisted(exists);
                    setLoaded(true);
                }
            })
            .catch(() => setLoaded(true));
        return () => { mounted = false; };
    }, [courseId]);

    const onToggle = async () => {
        if (loading) return;
        setLoading(true);
        const prev = wishlisted;

        // Optimistic UI
        setWishlisted(!prev);
        try {
            if (prev) {
                await removeFromWishlist(courseId);
            } else {
                await addToWishlist(courseId);
            }
        } catch {
            setWishlisted(prev);
            alert("Could not update wishlist. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const label = wishlisted ? "Remove from wishlist" : "Add to wishlist";
    const heart = wishlisted ? "♥" : "♡";
    const fontSize = size === "sm" ? 16 : 18;

    return (
        <button
            type="button"
            onClick={onToggle}
            disabled={loading || !loaded}
            aria-pressed={wishlisted}
            aria-label={label}
            title={label}
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 10px",
                borderRadius: 8,
                border: "1px solid #ddd",
                background: wishlisted ? "#ffe6ea" : "#fff",
                cursor: loading ? "not-allowed" : "pointer"
            }}
        >
            <span style={{ fontSize }}>{heart}</span>
            <span>{label}</span>
        </button>
    );
}
