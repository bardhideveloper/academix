import { useEffect, useState } from "react";
import { useDocumentTitle } from "../../../lib/useDocumentTitle";
import { getMySubscription, startCheckout } from "../services/subscriptions.api";
import type { SubscriptionStatus } from "../types";
import SubscriptionStatusView from "../components/SubscriptionStatus";
import PlanCard from "../components/PlanCard";

export default function Subscriptions() {
  useDocumentTitle("AcademiX — Subscriptions");

  const [status, setStatus] = useState<SubscriptionStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        const s = await getMySubscription();
        setStatus(s);
      } catch (e: any) {
        setErr(e.friendlyMessage ?? "Failed to load subscription status");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  const onSubscribe = async (plan: "basic" | "pro") => {
    try {
      await startCheckout({ plan });
      alert(`Checkout started for ${plan} (mock).`);
    } catch (e: any) {
      alert(e.friendlyMessage ?? "Checkout failed");
    }
  };

  if (loading) return <p>Loading subscription…</p>;
  if (err) return <p style={{ color: "crimson" }}>{err}</p>;

  return (
    <div>
      <h1>Subscriptions</h1>
      {status && <SubscriptionStatusView status={status} />}

      {status?.status !== "active" && (
        <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          <PlanCard
            name="basic"
            priceLabel="$9.99/mo"
            features={["Access to beginner courses", "Community support", "Email reminders"]}
            onSubscribe={onSubscribe}
          />
          <PlanCard
            name="pro"
            priceLabel="$19.99/mo"
            features={["All courses", "Priority support", "Advanced reminders", "Pro certificates"]}
            onSubscribe={onSubscribe}
          />
        </div>
      )}
    </div>
  );
}
