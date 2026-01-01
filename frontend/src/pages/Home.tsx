import { Link } from "react-router-dom";
import { useDocumentTitle } from "../lib/useDocumentTitle";

export default function Home() {
  useDocumentTitle("AcademiX — Home");

  return (
    <div style={{ fontFamily: "sans-serif", padding: "40px 20px" }}>
      <section style={{ textAlign: "center", marginBottom: 50 }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: 10 }}>
          Welcome to <span style={{ color: "#4f46e5" }}>AcademiX</span>
        </h1>
        <p style={{ fontSize: "1.2rem", color: "#555", marginBottom: 20 }}>
          Your subscription-based learning platform. Learn, grow, and track your progress.
        </p>
        <Link
          to="/courses"
          style={{
            display: "inline-block",
            padding: "12px 24px",
            backgroundColor: "#4f46e5",
            color: "#fff",
            fontSize: "1rem",
            fontWeight: 600,
            borderRadius: 8,
            textDecoration: "none",
            transition: "background 0.3s ease"
          }}
        >
          Browse Courses →
        </Link>
      </section>

      <section style={{ maxWidth: 900, margin: "0 auto", display: "grid", gap: 30 }}>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <div style={{ fontSize: "2rem", color: "#4f46e5" }}>📚</div>
          <div>
            <h3 style={{ marginBottom: 8 }}>Learn Anywhere</h3>
            <p style={{ color: "#666" }}>
              Access courses anytime, anywhere, on any device.
            </p>
          </div>
        </div>

        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <div style={{ fontSize: "2rem", color: "#4f46e5" }}>📈</div>
          <div>
            <h3 style={{ marginBottom: 8 }}>Track Your Progress</h3>
            <p style={{ color: "#666" }}>
              Monitor your learning journey with detailed progress reports.
            </p>
          </div>
        </div>

        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <div style={{ fontSize: "2rem", color: "#4f46e5" }}>🔔</div>
          <div>
            <h3 style={{ marginBottom: 8 }}>Stay Notified</h3>
            <p style={{ color: "#666" }}>
              Get reminders and updates so you never miss a lesson.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
