
import { Link, NavLink } from 'react-router-dom';
import './NavBar.css';
import logo from '../../assets/academix-logo.png';

export default function NavBar() {
  const linkStyle = ({ isActive }: { isActive: boolean }) =>
    ({ textDecoration: isActive ? 'underline' : 'none', fontWeight: isActive ? 700 : 500 });

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
        <NavLink to="/subscriptions" style={linkStyle}>Subscriptions</NavLink>
        <NavLink to="/progress" style={linkStyle}>Progress</NavLink>
        <NavLink to="/login" style={linkStyle}>Login</NavLink>
      </div>
    </nav>
  );
}
