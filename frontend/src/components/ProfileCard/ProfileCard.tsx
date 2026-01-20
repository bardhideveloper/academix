import "./ProfileCard.css";
import type { User } from "../../features/auth/AuthContext";

type Props = {
  user: User;
  onLogout: () => void;
  onClose: () => void;
};

export default function ProfileCard({ user, onLogout, onClose }: Props) {
  return (
    <div className="profile-card">
      <div className="profile-header">
        <div className="profile-avatar">
          {user.first_name?.[0] ?? user.email[0].toUpperCase()}
        </div>
        <div>
          <div className="profile-name">
            {user.first_name} {user.last_name}
          </div>
          <div className="profile-email">{user.email}</div>
        </div>
      </div>

      <div className="profile-role">
        Role: <b>{user.role}</b>
      </div>

      <div className="profile-actions">
        <button onClick={onClose}>Close</button>
        <button className="danger" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
