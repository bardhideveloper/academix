from rest_framework import serializers
from .models import CourseProgress


class CourseProgressSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(source="user.id", read_only=True)
    course_id = serializers.IntegerField(source="course.id", read_only=True)

    class Meta:
        model = CourseProgress
        fields = [
            "id",
            "user_id",
            "course_id",
            "completed_lessons",
            "total_lessons",
            "progress_percentage",
        ]
