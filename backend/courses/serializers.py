from rest_framework import serializers
from .models import Course

class CourseSerializer(serializers.ModelSerializer):
    instructor_name = serializers.CharField(source="instructor.username", read_only=True)

    class Meta:
        model = Course
        fields = [
            "id", "title", "code", "description", "credits",
            "semester", "academic_year", "is_active", "created_at",
            "instructor_id", "instructor_name",
        ]
