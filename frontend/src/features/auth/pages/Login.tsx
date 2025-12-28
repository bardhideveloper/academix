
// features/auth/pages/Login.tsx
import { useState } from 'react';
import { useDocumentTitle } from '../../../lib/useDocumentTitle';
import { useAuth } from '../AuthContext';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { SignInButton, RegisterButton } from '../../../components/UI/AuthButtons';

export default function Login() {
  useDocumentTitle('AcademiX — Login');

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation() as any;

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || "/courses";

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
    <div style={{ maxWidth: 420, margin: '3rem auto', padding: '1.5rem' }}>
      <h1>Sign in</h1>
      {err && (
        <div style={{ background: '#ffe6e6', color: '#a40000', padding: 12, borderRadius: 8, marginBottom: 12 }}>
          {err}
        </div>
      )}
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>Username or Email</label><br/>
          <input value={identifier} onChange={e => setIdentifier(e.target.value)} style={{ width: '100%', padding: 8 }} required />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Password</label><br/>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: 8 }} required />
        </div>

        <SignInButton loading={loading} fullWidth />

        <div style={{ marginTop: 12 }}>
          <RegisterButton /> {}
        </div>
      </form>

      <p style={{ marginTop: 12 }}>
        Forgot password? <Link to="/reset">Reset</Link>
      </p>
    </div>
  );
}
