import Button from "../../../components/UI/Button";
import "./plan-card.css";

type PlanCardProps = {
  name: string;
  priceLabel: string;
  features: string[];
  onSubscribe: () => void;
};

export default function PlanCard({ name, priceLabel, features, onSubscribe }: PlanCardProps) {
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

      <div className="ax-plan__foot">
        <Button variant="primary" fullWidth onClick={onSubscribe}>
          Subscribe
        </Button>
      </div>
    </div>
  );
}
