
// src/features/subscriptions/components/PlanCard.tsx
import Button from "../../../components/UI/Button";
import "./plan-card.css";

type PlanCardProps = {
  name: string;
  priceLabel: string;
  features: string[];
  // Primary action (required)
  primaryLabel: string;
  onPrimary: () => void;

  // Optional secondary action (e.g., Cancel or Resume)
  secondaryLabel?: string;
  onSecondary?: () => void;

  // Disable actions (e.g., while a request is in flight)
  disabled?: boolean;
};

export default function PlanCard({
  name,
  priceLabel,
  features,
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary,
  disabled,
}: PlanCardProps) {
  return (
    <div className="ax-plan">
      <div className="ax-plan__head">
        <h3 style={{ margin: 0 }}>{name}</h3>
        <div style={{ fontSize: "1.25rem", fontWeight: 700 }}>{priceLabel}</div>
      </div>

      <div className="ax-plan__body">
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          {features.map((f, i) => (
            <li key={i} style={{ marginBottom: 6 }}>{f}</li>
          ))}
        </ul>
      </div>

      <div className="ax-plan__foot" style={{ display: "grid", gap: 8 }}>
        <Button
          variant="primary"
          fullWidth
          onClick={onPrimary}
          disabled={disabled}
        >
          {primaryLabel}
        </Button>

        {secondaryLabel && onSecondary && (
          <Button
            variant="secondary"
            fullWidth
            onClick={onSecondary}
            disabled={disabled}
          >
            {secondaryLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
``
