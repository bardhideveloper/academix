from rest_framework import serializers
from .models import Lesson, LessonContent

class LessonContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = LessonContent
        fields = ["video_url", "article_text", "pdf_file"]

class LessonSerializer(serializers.ModelSerializer):
    content = LessonContentSerializer(read_only=True)

    class Meta:
        model = Lesson
        fields = [
            "id",
            "title",
            "content_type",
            "content",
            "order",
            "section_id",
            "created_at",
            "is_preview",
        ]