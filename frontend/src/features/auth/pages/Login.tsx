
import { useState } from 'react';
import { useDocumentTitle } from '../../../lib/useDocumentTitle';
import { useAuth } from '../AuthContext';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { SignInButton, CreateAccountButton } from '../../../components/UI/AuthButtons';
import './auth.css';

export default function Login() {
  useDocumentTitle('AcademiX — Login');

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation() as any;

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/courses';

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await login(identifier, password);
      navigate(from, { replace: true });
    } catch (error: any) {
      setErr(error.friendlyMessage ?? 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Sign in</h1>

        {err && <div className="auth-error">{err}</div>}

        <form className="auth-form" onSubmit={onSubmit}>
          <div className="auth-field">
            <label htmlFor="identifier" className="auth-label">Username or Email</label>
            <input
              id="identifier"
              className="auth-input"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="password" className="auth-label">Password</label>
            <input
              id="password"
              type="password"
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="auth-actions">
            <SignInButton loading={loading} fullWidth />
            <CreateAccountButton loading={loading} fullWidth />
          </div>

        </form>

        <p className="auth-hint">
          Forgot password? <Link to="/reset" className="auth-link">Reset</Link>
        </p>
      </div>
    </div>
  );
}
