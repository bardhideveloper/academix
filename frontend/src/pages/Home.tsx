import { Link } from "react-router-dom";
import { useDocumentTitle } from "../lib/useDocumentTitle";
import "./Home.css";

export default function Home() {
  useDocumentTitle("AcademiX — Home");

  return (
    <div className="home">
      <section className="hero">
        <h1 className="hero-title">Welcome to <span>AcademiX</span></h1>
        <p className="hero-subtitle">Your subscription-based learning platform. Learn, grow, and track your progress.</p>
        <Link to="/courses" className="hero-cta">Browse Courses →</Link>
      </section>

      <section className="features">
        <div className="feature">
          <div className="feature-icon">📚</div>
          <div>
            <h3 className="feature-title">Learn Anywhere</h3>
            <p className="feature-text">Access courses anytime, anywhere, on any device.</p>
          </div>
        </div>

        <div className="feature">
          <div className="feature-icon">📈</div>
          <div>
            <h3 className="feature-title">Track Your Progress</h3>
            <p className="feature-text">Monitor your learning journey with detailed progress reports.</p>
          </div>
        </div>

        <div className="feature">
          <div className="feature-icon">🔔</div>
          <div>
            <h3 className="feature-title">Stay Notified</h3>
            <p className="feature-text">Get reminders and updates so you never miss a lesson.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
