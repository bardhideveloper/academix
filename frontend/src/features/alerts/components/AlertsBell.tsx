
import { useEffect, useRef, useState } from "react";
import { listAlerts, markAlertRead, markAllAlertsRead } from "../services/alerts.api";
import type { AlertItem } from "../types";
import "./alerts-bell.css";

export default function AlertsBell() {
  const [items, setItems] = useState<AlertItem[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<number | null>(null);

  const unread = items.filter((a) => !a.read).length;

  const fetchAlerts = async () => {
    try {
      const data = await listAlerts();
      setItems(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();

    const startPolling = () => {
      stopPolling();
      intervalRef.current = window.setInterval(() => {
        if (document.hidden) return
        if (open) return;    
        fetchAlerts();
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
    try { await markAlertRead(id); } catch {}
  };

  const onMarkAll = async () => {
    setItems((prev) => prev.map((a) => ({ ...a, read: true })));
    try { await markAllAlertsRead(); } catch {}
  };

  return (
    <div className="ax-alerts">
      <button
        className="ax-alerts__btn"
        aria-label="Notifications"
        aria-expanded={open}
        onClick={onToggle}
      >
        <span className="ax-alerts__bell" aria-hidden="true">🔔</span>
        {unread > 0 && <span className="ax-alerts__badge">{unread}</span>}
      </button>

      {open && (
        <div className="ax-alerts__panel" role="dialog" aria-label="Notifications">
          {/* caret triangle */}
          <span className="ax-alerts__caret" aria-hidden="true" />

          <div className="ax-alerts__header">
            <span className="ax-alerts__title">Notifications</span>
            <button className="ax-alerts__action" onClick={onMarkAll}>
              Mark all as read
            </button>
          </div>

          <div className="ax-alerts__content">
            {loading ? (
              <div className="ax-alerts__empty">
                <span className="ax-alerts__empty-icon">🔄</span>
                <span>Loading notifications…</span>
              </div>
            ) : items.length === 0 ? (
              <div className="ax-alerts__empty">
                <span className="ax-alerts__empty-icon">📭</span>
                <span>No notifications yet.</span>
              </div>
            ) : (
              <ul className="ax-alerts__list">
                {items.map((a) => (
                  <li key={a.id} className={`ax-alerts__item ${a.read ? "is-read" : "is-unread"}`}>
                    <div className="ax-alerts__line">
                      <span className={`ax-alerts__badge-type ax-${a.type}`}>{labelForType(a.type)}</span>
                      {!a.read && (
                        <button className="ax-alerts__read" onClick={() => onMarkRead(a.id)}>
                          Mark read
                        </button>
                      )}
                    </div>
                    <div className="ax-alerts__msg">{a.message}</div>
                    <div className="ax-alerts__time">{new Date(a.createdAt).toLocaleString()}</div>
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

function labelForType(t: AlertItem["type"]) {
  switch (t) {
    case "reminder": return "Reminder";
    case "recommendation": return "Recommendation";
    case "subscription": return "Billing";
    case "progress": return "Progress";
    case "system": return "System";
    default: return "Alert";
  }
}
