from .base import LessonContentStrategy

class ArticleLessonStrategy(LessonContentStrategy):
    def serialize(self, lesson, content):
        return {
            "id": lesson.id,
            "title": lesson.title,
            "type": "article",
            "text": content.article_text,
            "pdf": content.article_pdf.url if content.article_pdf else None,
            "is_preview": lesson.is_preview,
        }