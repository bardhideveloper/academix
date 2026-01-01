
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './NavBar.css';
import logo from '../../assets/academix-logo.png';
import { useAuth } from '../../features/auth/AuthContext';
import Button from '../UI/Button';
import AlertsBell from '../../features/notifications/components/NotificationsBell';

export default function NavBar() {
  const { state, logout } = useAuth();
  const navigate = useNavigate();

  const linkStyle = ({ isActive }: { isActive: boolean }) =>
    ({ textDecoration: isActive ? 'underline' : 'none', fontWeight: isActive ? 700 : 500 });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="nav">
      <div className="nav__left">
        <Link to="/" className="brand">
          <img src={logo} alt="AcademiX" width={28} height={28} />
          <span>AcademiX</span>
        </Link>
      </div>

      <div className="nav__right">
        <NavLink to="/courses" style={linkStyle}>Courses</NavLink>
        <NavLink to="/wishlist" style={linkStyle}>Wishlist</NavLink>
        <NavLink to="/subscriptions" style={linkStyle}>Subscriptions</NavLink>
        <NavLink to="/progress" style={linkStyle}>Progress</NavLink>

        <div className="nav__notifications">
          <AlertsBell />
        </div>

        {state.user ? (
          <div className="nav__auth">
            <span className="nav__hello">Hi, {state.user.firstname ?? state.user.email}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>Logout</Button>
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
