
import { useState } from 'react';
import { useDocumentTitle } from '../../../lib/useDocumentTitle';

export default function Login() {
  useDocumentTitle('AcademiX — Login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`(UI-only) Logging in as ${username}`);
  };

  return (
    <div style={{ maxWidth: 360 }}>
      <h1>Sign in</h1>
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>Username</label><br/>
          <input value={username} onChange={e => setUsername(e.target.value)} style={{ width: '100%', padding: 8 }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Password</label><br/>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: 8 }} />
        </div>
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
}
