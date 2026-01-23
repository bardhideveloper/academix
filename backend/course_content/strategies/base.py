from abc import ABC, abstractmethod

class LessonContentStrategy(ABC):
    @abstractmethod
    def serialize(self, lesson, content):
        """
        Convert a lesson and its content into a dictionary
        ready to be returned by API.
        """
        pass