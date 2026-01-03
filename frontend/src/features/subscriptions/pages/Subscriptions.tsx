
// src/features/subscriptions/pages/Subscriptions.tsx
import { useEffect, useState } from "react";
import { getAvailableSubscriptions, startCheckout } from "../services/subscriptions.api";
import type { SubscriptionStatus } from "../types";
import PlanCard from "../components/PlanCard";

export default function Subscriptions() {
  const [plans, setPlans] = useState<SubscriptionStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getAvailableSubscriptions();
        setPlans(Array.isArray(data) ? data : []);
      } catch (e: any) {
        setErr(e?.message ?? "Failed to load plans");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onSubscribe = async (course_id: number) => {
    await startCheckout({ course_id });
    alert(`Subscribed to course_id: ${course_id}`);
  };

  if (loading) return <p>Loading plans…</p>;
  if (err) return <p style={{ color: "crimson" }}>{err}</p>;

  return (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
      {plans.map((p) => {
        const name = `Course ID: ${p.course_id}`;
        const priceLabel = "—";
        const features: string[] = [
          `Status: ${p.status}`,
          `Progress: ${p.progress}%`,
          `Start Date: ${new Date(p.start_date).toLocaleDateString()}`,
          ...(p.end_date ? [`End Date: ${new Date(p.end_date).toLocaleDateString()}`] : []),
        ];

        return (
          <PlanCard
            key={p.id}
            name={name}
            priceLabel={priceLabel}
            features={features}
            onSubscribe={() => onSubscribe(p.course_id)}
          />
        );
      })}
    </div>
  );
}
