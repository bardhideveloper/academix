import { useDocumentTitle } from '../lib/useDocumentTitle';
export default function Home() {
  useDocumentTitle('AcademiX — Home');
  return (
    <div>
      <h1>Welcome to <strong>AcademiX</strong></h1>
      <p>Your subscription‑based learning platform. Start with Courses.</p>
    </div>
  );
}
