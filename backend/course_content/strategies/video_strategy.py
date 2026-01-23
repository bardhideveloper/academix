from .base import LessonContentStrategy

class VideoLessonStrategy(LessonContentStrategy):
    def serialize(self, lesson, content):
        return {
            "id": lesson.id,
            "title": lesson.title,
            "type": "video",
            "video_url": content.video_url,
            "is_preview": lesson.is_preview,
        }