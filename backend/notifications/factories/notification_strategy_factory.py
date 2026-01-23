from notifications.strategies.reminder_strategy import ReminderNotificationStrategy
from notifications.strategies.warning_strategy import WarningNotificationStrategy
from notifications.strategies.info_strategy import InfoNotificationStrategy

class NotificationStrategyFactory:
    _strategies = {
        "reminder": ReminderNotificationStrategy(),
        "warning": WarningNotificationStrategy(),
        "info": InfoNotificationStrategy(),
    }

    @staticmethod
    def get_strategy(notification_type: str):
        strategy = NotificationStrategyFactory._strategies.get(notification_type)
        if not strategy:
            raise ValueError(f"No strategy found for notification type: {notification_type}")
        return strategy