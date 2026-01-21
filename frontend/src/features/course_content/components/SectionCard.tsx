import "./SectionCard.css";

type Props = {
  title: string;
  order: number;
  onOpen: () => void;
};

export default function SectionCard({ title, order, onOpen }: Props) {
  return (
    <div className="section-card">
      <h3>
        {order}. {title}
      </h3>
      <button onClick={onOpen}>View Lessons</button>
    </div>
  );
}
