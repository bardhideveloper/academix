
import { useState } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useDocumentTitle } from "../../../lib/useDocumentTitle";
import Button from '../../../components/UI/Button';

export default function Register() {
  useDocumentTitle("AcademiX — Register");

  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");   
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await register(email, password, name);
      navigate("/courses");
    } catch (error: any) {
      setErr(error.friendlyMessage ?? "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "3rem auto", padding: "1.5rem" }}>
      <h1>Create account</h1>
      {err && (
        <div style={{ background: "#ffe6e6", color: "#a40000", padding: 12, borderRadius: 8, marginBottom: 12 }}>
          {err}
        </div>
      )}
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>Name</label><br/>
          <input value={name} onChange={(e) => setName(e.target.value)} style={{ width: "100%", padding: 8 }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Email</label><br/>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", padding: 8 }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Password</label><br/>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "100%", padding: 8 }} />
        </div>

        {/* Submit the form */}
        <Button variant="primary" size="md" fullWidth loading={loading} type="submit">
          Register
        </Button>
      </form>

      <p style={{ marginTop: 12 }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
