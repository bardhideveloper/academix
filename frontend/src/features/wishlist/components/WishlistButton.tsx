import { useEffect, useState } from "react";
import { addToWishlist, isWishlisted, removeFromWishlist } from "../services/wishlist.api";
import "./WishlistButton.css";

type Props = {
  courseId: number;
  size?: "sm" | "md";
  onToggleSuccess?: () => void;
};

export default function WishlistButton({
  courseId,
  size = "md",
  onToggleSuccess,
}: Props) {
  const [wishlisted, setWishlisted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

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

    return () => {
      mounted = false;
    };
  }, [courseId]);

  const onToggle = async () => {
    if (loading) return;

    setLoading(true);
    const prev = wishlisted;
    setWishlisted(!prev);

    try {
      if (prev) {
        await removeFromWishlist(courseId);
      } else {
        await addToWishlist(courseId);
      }
      onToggleSuccess?.();
    } catch {
      setWishlisted(prev);
      alert("Could not update wishlist. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const label = wishlisted ? "Remove from wishlist" : "Add to wishlist";
  const heart = wishlisted ? "♥" : "♡";

  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={loading || !loaded}
      aria-pressed={wishlisted}
      aria-label={label}
      title={label}
      className={`wishlist-btn ${size} ${wishlisted ? "active" : ""}`}
    >
      <span className="wishlist-heart">{heart}</span>
      <span>{label}</span>
    </button>
  );
}
