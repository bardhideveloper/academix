import Button from "../../../components/UI/Button";
import "./plan-card.css";

type PlanCardProps = {
  name: "basic" | "pro";
  priceLabel: string;
  features: string[];
  onSubscribe: (plan: "basic" | "pro") => void;
};

export default function PlanCard({ name, priceLabel, features, onSubscribe }: PlanCardProps) {
  return (
    <div className="ax-plan">
      <div className="ax-plan__head">
        <h3 style={{ margin: 0 }}>{name === "basic" ? "Basic" : "Pro"}</h3>
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
        <Button variant="primary" fullWidth onClick={() => onSubscribe(name)}>
          Subscribe {name === "basic" ? "Basic" : "Pro"}
        </Button>
      </div>
    </div>
  );
}
