import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Course } from "../types";
import "./CourseCard.css";
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
  let primaryAction: () => void = () => { };
  if (subscribed) {
    primaryLabel = "Go to content";
    primaryAction = handleGoToContent;
  } else {
    primaryLabel = "Subscribe";
    primaryAction = handleSubscribe;
  }

  return (
    <div className="course-card">
      {/* Course info */}
      <div className="course-info">
        <h2 className="course-title"> {course.title || "No title"}</h2>

        <p><strong>Code:</strong> {course.code || "-"}</p>
        <p><strong>Credits:</strong> {course.credits ?? "-"}</p>
        <p><strong>Semester:</strong> {course.semester || "-"}</p>
        <p><strong>Year:</strong> {course.academic_year || "-"}</p>
        <p><strong>Instructor:</strong> {course.instructor_name || "-"}</p>
      </div>

      {/* Actions */}
      <div className="course-actions">
        <WishlistButton courseId={course.id} size="sm" onToggleSuccess={onWishlistRemove ? () => onWishlistRemove(course.id) : undefined} />
        <button onClick={primaryAction} disabled={subscribing} className="primary-btn">
          {subscribing ? "Processing..." : primaryLabel}
        </button>
        {subscribed && (<button onClick={handleUnsubscribe} disabled={subscribing} className="unsubscribe-btn">Unsubscribe</button>)}
      </div>
    </div>
  );

}
