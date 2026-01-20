import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "./NavBar.css";
import logo from "../../assets/academix-logo.png";
import { useAuth } from "../../features/auth/AuthContext";
import type { User } from "../../features/auth/AuthContext";
import ProfileCard from "../ProfileCard/ProfileCard";
import Button from "../UI/Button";
import NotificationsBell from "../../features/notifications/components/NotificationsBell";

export default function NavBar() {
  const { state, logout } = useAuth();
  const navigate = useNavigate();

  const [openProfile, setOpenProfile] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setOpenProfile(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkStyle = ({ isActive }: { isActive: boolean }) => ({
    textDecoration: isActive ? "underline" : "none",
    fontWeight: isActive ? 700 : 500,
  });

  return (
    <nav className="nav">
      <div className="nav__left">
        <Link to="/" className="brand">
          <img src={logo} alt="AcademiX" width={40} height={40} />
          <span>AcademiX</span>
        </Link>
      </div>

      <div className="nav__right">
        <NavLink to="/courses" style={linkStyle}>Courses</NavLink>
        <NavLink to="/wishlist" style={linkStyle}>Wishlist</NavLink>
        <NavLink to="/subscriptions" style={linkStyle}>Subscriptions</NavLink>
        <NavLink to="/progress" style={linkStyle}>Progress</NavLink>

        {state.user && (
          <div className="nav__notifications"><NotificationsBell /></div>
        )}

        {state.user ? (
          <div className="nav__auth" ref={profileRef}>
            <span
              className="nav__hello"
              style={{ cursor: "pointer" }}
              onClick={() => setOpenProfile((v) => !v)}
            >
              Hi, {state.user.first_name ?? state.user.email}
            </span>

            {openProfile && (
              <ProfileCard user={state.user as User} onLogout={handleLogout} onClose={() => setOpenProfile(false)} />
            )}
          </div>
        ) : (
          <div className="nav__auth">
            <Button as={Link} to="/login" variant="outline" size="sm">Sign in</Button>
            <Button as={Link} to="/register" variant="outline" size="sm">Register</Button>
          </div>
        )}
      </div>
    </nav>
  );
}
