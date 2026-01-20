import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Course } from "../types";
import WishlistButton from "../../wishlist/components/WishlistButton";
import {
  startCheckout,
  cancelSubscription,
} from "../../subscriptions/services/subscriptions.api";

type Props = {
  course: Course & { isSubscribed?: boolean; subscriptionId?: number };
  onWishlistRemove?: (courseId: number) => void;
};

export default function CourseCard({ course, onWishlistRemove }: Props) {
  const navigate = useNavigate();
  const [subscribing, setSubscribing] = useState(false);
  const [subscribed, setSubscribed] = useState(course.isSubscribed || false);

  // Ndryshon statusin kur course ndryshon
  useEffect(() => {
    setSubscribed(course.isSubscribed || false);
  }, [course]);

  // Funksioni për Subscribe
  const handleSubscribe = async () => {
    if (subscribing) return;

    if (subscribed) {
      alert("You are already subscribed to this course!");
      return;
    }

    setSubscribing(true);
    try {
      await startCheckout({ course_id: course.id });
      setSubscribed(true);
      alert("Subscription successful!");
      navigate("/subscriptions");
    } catch (err) {
      console.error(err);
      alert("Could not subscribe to course. Please try again.");
    } finally {
      setSubscribing(false);
    }
  };

  // Funksioni për Unsubscribe
  const handleUnsubscribe = async () => {
    if (!course.subscriptionId) {
      alert("No subscription found to cancel.");
      return;
    }

    setSubscribing(true);
    try {
      await cancelSubscription(course.subscriptionId);
      setSubscribed(false);
      alert("Subscription canceled.");
    } catch (err) {
      console.error(err);
      alert("Could not cancel subscription. Please try again.");
    } finally {
      setSubscribing(false);
    }
  };

  // Funksioni për Go to Content
  const handleGoToContent = () => {
    navigate(`/courses/${course.id}/content`);
  };

  // Vendos label dhe funksion bazuar në status
  let primaryLabel = "";
  let primaryAction: () => void = () => {};
  if (subscribed) {
    primaryLabel = "Go to content";
    primaryAction = handleGoToContent;
  } else {
    primaryLabel = "Subscribe";
    primaryAction = handleSubscribe;
  }

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 12,
        padding: 16,
        width: 250,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        transition: "transform 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <h2 style={{ fontSize: 18, marginBottom: 4 }}>{course.title || "No title"}</h2>
      <p style={{ margin: 0 }}><strong>Code:</strong> {course.code || "-"}</p>
      <p style={{ margin: 0 }}><strong>Credits:</strong> {course.credits ?? "-"}</p>
      <p style={{ margin: 0 }}><strong>Semester:</strong> {course.semester || "-"}</p>
      <p style={{ margin: 0 }}><strong>Year:</strong> {course.academic_year || "-"}</p>
      <p style={{ margin: 0 }}><strong>Instructor:</strong> {course.instructor_name || "-"}</p>

      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        {/* Wishlist button */}
        <WishlistButton
          courseId={course.id}
          size="sm"
          onRemove={onWishlistRemove ? () => onWishlistRemove(course.id) : undefined}
        />

        {/* Primary action: Subscribe / Go to content */}
        <button
          onClick={primaryAction}
          disabled={subscribing}
          style={{
            flex: 1,
            padding: "6px 10px",
            borderRadius: 8,
            border: "1px solid #007bff",
            background: subscribing ? "#6ea0ff" : "#007bff",
            color: "#fff",
            fontWeight: 500,
            cursor: subscribing ? "not-allowed" : "pointer",
            transition: "background 0.2s",
          }}
        >
          {subscribing ? "Processing..." : primaryLabel}
        </button>

        {/* Secondary action: Unsubscribe */}
        {subscribed && (
          <button
            onClick={handleUnsubscribe}
            disabled={subscribing}
            style={{
              padding: "6px 10px",
              borderRadius: 8,
              border: "1px solid #dc3545",
              background: "#dc3545",
              color: "#fff",
              fontWeight: 500,
              cursor: subscribing ? "not-allowed" : "pointer",
            }}
          >
            Unsubscribe
          </button>
        )}
      </div>
    </div>
  );
}
