
import { useEffect, useRef, useState } from "react";
import { listNotifications, markNotificationRead, markAllNotificationsRead } from "../services/notifications.api";
import type { NotificationItem } from "../types";
import "./notifications-bell.css";

export default function NotificationsBell() {
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<number | null>(null);

  const unread = items.filter((a) => !a.read).length;

  const fetchNoticiations = async () => {
    try {
      const data = await listNotifications();
      setItems(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNoticiations();

    const startPolling = () => {
      stopPolling();
      intervalRef.current = window.setInterval(() => {
        if (document.hidden) return
        if (open) return;    
        fetchNoticiations();
      }, 30_000);
    };
    const stopPolling = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    startPolling();
    return () => stopPolling();
  }, [open]);

  const onToggle = () => setOpen((o) => !o);

  const onMarkRead = async (id: number) => {
    setItems((prev) => prev.map((a) => (a.id === id ? { ...a, read: true } : a)));
    try { await markNotificationRead(id); } catch {}
  };

  const onMarkAll = async () => {
    setItems((prev) => prev.map((a) => ({ ...a, read: true })));
    try { await markAllNotificationsRead(); } catch {}
  };

  return (
    <div className="ax-notifications">
      <button
        className="ax-notifications__btn"
        aria-label="Notifications"
        aria-expanded={open}
        onClick={onToggle}
      >
        <span className="ax-notifications__bell" aria-hidden="true">🔔</span>
        {unread > 0 && <span className="ax-notifications__badge">{unread}</span>}
      </button>

      {open && (
        <div className="ax-notifications__panel" role="dialog" aria-label="Notifications">
          {/* caret triangle */}
          <span className="ax-notifications__caret" aria-hidden="true" />

          <div className="ax-notifications__header">
            <span className="ax-notifications__title">Notifications</span>
            <button className="ax-notifications__action" onClick={onMarkAll}>
              Mark all as read
            </button>
          </div>

          <div className="ax-notifications__content">
            {loading ? (
              <div className="ax-notifications__empty">
                <span className="ax-notifications__empty-icon">🔄</span>
                <span>Loading notifications…</span>
              </div>
            ) : items.length === 0 ? (
              <div className="ax-notifications__empty">
                <span className="ax-notifications__empty-icon">📭</span>
                <span>No notifications yet.</span>
              </div>
            ) : (
              <ul className="ax-notifications__list">
                {items.map((a) => (
                  <li key={a.id} className={`ax-notifications__item ${a.read ? "is-read" : "is-unread"}`}>
                    <div className="ax-notifications__line">
                      <span className={`ax-notifications__badge-type ax-${a.type}`}>{labelForType(a.type)}</span>
                      {!a.read && (
                        <button className="ax-notifications__read" onClick={() => onMarkRead(a.id)}>
                          Mark read
                        </button>
                      )}
                    </div>
                    <div className="ax-notifications__msg">{a.message}</div>
                    <div className="ax-notifications__time">{new Date(a.created_at).toLocaleString()}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function labelForType(t: NotificationItem["type"]) {
  switch (t) {
    case "reminder": return "Reminder";
    case "recommendation": return "Recommendation";
    case "subscription": return "Billing";
    case "progress": return "Progress";
    case "system": return "System";
    default: return "Alert";
  }
}
