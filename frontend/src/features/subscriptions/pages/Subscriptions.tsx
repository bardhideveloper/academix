import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMySubscriptions, startCheckout, cancelSubscription, resumeSubscription, } from "../services/subscriptions.api";
import type { SubscriptionStatus } from "../types";
import PlanCard from "../components/PlanCard";

export default function Subscriptions() {
  const navigate = useNavigate();
  const [subs, setSubs] = useState<SubscriptionStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [busyKey, setBusyKey] = useState<number | null>(null);

  const load = async () => {
    try {
      const data = await getMySubscriptions();
      setSubs(Array.isArray(data) ? data : []);
      setErr(null);
    } catch (e: any) {
      setErr(e?.message ?? "Failed to load subscriptions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubscribe = async (course_id: number) => {
    const existingSub = subs.find(
      (s) => s.course_id === course_id && s.status === "active"
    );
    if (existingSub) {
      alert("You are already subscribed to this course!");
      return;
    }

    try {
      setBusyKey(course_id);
      await startCheckout({ course_id });
      await load();
    } catch (e: any) {
      alert(e?.message ?? "Failed to subscribe");
    } finally {
      setBusyKey(null);
    }
  };

  const handleCancel = async (id: number) => {
    try {
      setBusyKey(id);
      await cancelSubscription(id);
      await load();
    } catch (e: any) {
      alert(e?.message ?? "Failed to cancel subscription");
    } finally {
      setBusyKey(null);
    }
  };

  const handleResume = async (id: number) => {
    try {
      setBusyKey(id);
      await resumeSubscription(id);
      await load();
    } catch (e: any) {
      alert(e?.message ?? "Failed to resume subscription");
    } finally {
      setBusyKey(null);
    }
  };

  if (loading) return <p>Loading subscriptions…</p>;
  if (err) return <p style={{ color: "crimson" }}>{err}</p>;

  if (!subs.length) {
    return (
      <div>
        <p>You don’t have any subscriptions yet.</p>
        <p>
          Browse <a href="/courses">courses</a> and subscribe to start learning!
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gap: 12,
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
      }}
    >
      {subs.map((s) => {
        const name = s.course_title || `Course ID: ${s.course_id}`;
        const priceLabel = "—";
        const features: string[] = [
          `Status: ${s.status}`,
          `Start Date: ${new Date(s.start_date).toLocaleDateString()}`,
          ...(s.end_date
            ? [`End Date: ${new Date(s.end_date).toLocaleDateString()}`]
            : []),
          `Course ID: ${s.course_id}`,
        ];

        const isActive = s.status === "active" || s.status === "in_progress";
        const isCancelled = s.status === "cancelled" || s.status === "expired";

        let primaryLabel = "";
        let onPrimary: () => void = () => { };
        let secondaryLabel: string | undefined;
        let onSecondary: (() => void) | undefined;

        if (isActive) {
          primaryLabel = "Go to content";
          onPrimary = () =>
            navigate(`/course_content/sections/${s.course_id}`);
          secondaryLabel = "Unsubscribe";
          onSecondary = () => handleCancel(s.id);
        } else if (isCancelled) {
          primaryLabel = "Resume";
          onPrimary = () => handleResume(s.id);
        } else {
          primaryLabel = "Subscribe";
          onPrimary = () => handleSubscribe(s.course_id);
        }

        const disabled = busyKey === s.id || busyKey === s.course_id;

        return (
          <PlanCard
            key={s.id}
            name={name}
            priceLabel={priceLabel}
            features={features}
            primaryLabel={primaryLabel}
            onPrimary={onPrimary}
            secondaryLabel={secondaryLabel}
            onSecondary={onSecondary}
            disabled={disabled}
          />
        );
      })}
    </div>
  );
}
