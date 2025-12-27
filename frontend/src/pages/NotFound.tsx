import { useDocumentTitle } from '../lib/useDocumentTitle';
import { Link } from 'react-router-dom';
export default function NotFound() {
  useDocumentTitle('AcademiX — Not Found');
  return (
    <div>
      <h1>404</h1>
      <p>Page not found.</p>
      <Link to="/">Go home</Link>
    </div>
  );
}
