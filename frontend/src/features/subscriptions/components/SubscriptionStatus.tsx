import type { SubscriptionStatus } from "../types";

export default function SubscriptionStatusView({ status }: { status: SubscriptionStatus }) {
  if (status.status === "active") {
    return (
      <div style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: 12, marginBottom: 16 }}>
        <b>Active plan:</b> {status.plan ?? "—"}
        <br />
        <small>Renews at: {status.renewsAt ? new Date(status.renewsAt).toLocaleDateString() : "—"}</small>
      </div>
    );
  }
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: 12, marginBottom: 16 }}>
      <b>No active subscription.</b>
      <p style={{ color: "#6b7280" }}>Choose a plan to unlock full course access.</p>
    </div>
  );
}
