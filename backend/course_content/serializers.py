# course_content/serializers.py
from rest_framework import serializers
from .models import Lesson

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = [
            "id",
            "title",
            "content",
            "video_url",
            "order",
            "section_id",
            "created_at",
            "updated_at",
        ]
