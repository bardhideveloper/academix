import { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useDocumentTitle } from '../../../lib/useDocumentTitle';
import Button from '../../../components/UI/Button';
import './Auth.css';

export default function Register() {
  useDocumentTitle('AcademiX — Register');

  const { register } = useAuth();
  const navigate = useNavigate();

  const [first_name, setFirstname] = useState('');
  const [last_name, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await register(email, password, first_name, last_name);
      navigate('/courses');
    } catch (error: any) {
      setErr(error.friendlyMessage ?? 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Create account</h1>

        {err && <div className="auth-error">{err}</div>}

        <form className="auth-form" onSubmit={onSubmit}>
          <div className="auth-field-group">
            <div className="auth-field">
              <label htmlFor="first_name" className="auth-label">Firstname</label>
              <input
                id="first_name"
                className="auth-input"
                value={first_name}
                onChange={(e) => setFirstname(e.target.value)}
                placeholder="John"
              />
            </div>

            <div className="auth-field">
              <label htmlFor="last_name" className="auth-label">Lastname</label>
              <input
                id="last_name"
                className="auth-input"
                value={last_name}
                onChange={(e) => setLastname(e.target.value)}
                placeholder="Doe"
              />
            </div>
          </div>

          <div className="auth-field">
            <label htmlFor="email" className="auth-label">Email</label>
            <input
              id="email"
              type="email"
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john.doe@example.com"
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
              placeholder="Create a strong password"
            />
          </div>

          <Button variant="primary" size="md" fullWidth loading={loading} type="submit">
            Register
          </Button>
        </form>

        <p className="auth-hint">
          Already have an account? <Link to="/login" className="auth-link">Login</Link>
        </p>
      </div>
    </div>
  );
}
