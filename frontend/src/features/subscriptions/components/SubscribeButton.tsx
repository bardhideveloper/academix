// src/features/subscriptions/SubscribeButton.tsx
import { useEffect, useState } from "react";
import {
    startCheckout,
    getSubscriptionByCourse,
    cancelSubscription,
} from "../services/subscriptions.api";
import type { SubscriptionStatus } from "../types";

type Props = {
    courseId: number;
    size?: "sm" | "md";
};

export default function SubscribeButton({ courseId, size = "md" }: Props) {
    const [subscribed, setSubscribed] = useState(false);
    const [subscriptionId, setSubscriptionId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);

    // Kontrollon subscription kur komponenti mount
    useEffect(() => {
        let mounted = true;

        const fetchSubscription = async () => {
            try {
                const sub: SubscriptionStatus | null = await getSubscriptionByCourse(courseId);
                if (!mounted) return;

                setSubscribed(!!sub && (sub.status === "active" || sub.status === "in_progress"));
                setSubscriptionId(sub?.id ?? null);
            } catch (err) {
                console.error("Failed to load subscription", err);
            } finally {
                if (mounted) setLoaded(true);
            }
        };

        fetchSubscription();

        return () => { mounted = false; };
    }, [courseId]);

    const onToggle = async () => {
        if (loading) return;
        setLoading(true);

        const prev = subscribed;
        setSubscribed(!prev);

        try {
            if (prev) {
                // Unsubscribe
                if (!subscriptionId) throw new Error("Missing subscription id");
                await cancelSubscription(subscriptionId);
                setSubscriptionId(null);
            } else {
                // Subscribe
                await startCheckout({ course_id: courseId });
                const sub = await getSubscriptionByCourse(courseId);
                setSubscriptionId(sub?.id ?? null);
            }
        } catch (err) {
            console.error(err);
            setSubscribed(prev);
            alert("Could not update subscription. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const label = subscribed ? "Unsubscribe" : "Subscribe";
    const icon = subscribed ? "✓" : "+";
    const fontSize = size === "sm" ? 16 : 18;

    return (
        <button
            type="button"
            onClick={onToggle}
            disabled={loading || !loaded}
            aria-pressed={subscribed}
            aria-label={label}
            title={label}
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 10px",
                borderRadius: 8,
                border: "1px solid #ddd",
                background: subscribed ? "#e8f7ee" : "#fff",
                cursor: loading ? "not-allowed" : "pointer",
            }}
        >
            <span style={{ fontSize }}>{icon}</span>
            <span>{label}</span>
        </button>
    );
}
