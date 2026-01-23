from .base import NotificationStrategy

class WarningNotificationStrategy(NotificationStrategy):
    def serialize(self, notification):
        return {
            "id": notification.id,
            "title": f"[WARNING] {notification.title}",
            "message": notification.message,
            "type": notification.type,
            "status": notification.status,
            "created_at": notification.created_at,
            "sent_at": notification.sent_at,
        }