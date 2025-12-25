import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main style={{ padding: 24 }}>
      <h1>404 - Page not found</h1>
      <p>The page you are looking for doesn’t exist.</p>
      <Link to="/">Go back home</Link>
    </main>
  );
}
