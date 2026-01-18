from rest_framework import serializers
from .models import Course

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = [ "id", "title", "code", "description", "credits", "semester", "academic_year", "is_active", "created_at", "instructor_id",]
