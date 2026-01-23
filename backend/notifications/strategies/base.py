from abc import ABC, abstractmethod

class NotificationStrategy(ABC):
    @abstractmethod
    def serialize(self, notification):
        "Convert a notification object into dictionary for API response"
        pass