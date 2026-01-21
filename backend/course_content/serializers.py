from rest_framework import serializers
from .models import (
    CourseContentSection,
    CourseContentLesson,
    CourseContentLessonContent
)


class CourseContentSectionSerializer(serializers.ModelSerializer):
    course_id = serializers.IntegerField(source="course.id", read_only=True)

    class Meta:
        model = CourseContentSection
        fields = [
            "id",
            "title",
            "order",
            "created_at",
            "course_id",
        ]


class CourseContentLessonSerializer(serializers.ModelSerializer):
    section_id = serializers.IntegerField(source="section.id", read_only=True)

    class Meta:
        model = CourseContentLesson
        fields = [
            "id",
            "title",
            "content_type",
            "order",
            "is_preview",
            "created_at",
            "section_id",
        ]


class CourseContentLessonContentSerializer(serializers.ModelSerializer):
    lesson_id = serializers.IntegerField(source="lesson.id", read_only=True)

    class Meta:
        model = CourseContentLessonContent
        fields = [
            "id",
            "video_url",
            "article_text",
            "article_pdf",
            "lesson_id",
        ]
