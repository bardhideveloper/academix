import { useDocumentTitle } from '../../../lib/useDocumentTitle';
export default function ProgressDashboard() {
  useDocumentTitle('AcademiX — Progress Dashboard');
  return (
    <div>
      <h1>Your Progress</h1>
      <p>Track course completion, streaks, and recommendations.</p>
    </div>
  );
}
