import "./LessonCard.css";

type Props = { title: string; contentType: string; isPreview: boolean; order: number; onOpen: () => void;};

export default function LessonCard({
  title,
  contentType,
  isPreview,
  order,
  onOpen,
}: Props) {
  return (
    <div className="lesson-card">
      <h4>
        {order}. {title}
      </h4>

      <p>Type: {contentType}</p>

      {isPreview && <span className="preview">Preview available</span>}

      <div className="button-container">
        <button onClick={onOpen}>Open Lesson</button>
      </div>
    </div>
  );
}
