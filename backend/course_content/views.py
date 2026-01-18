# course_content/views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from course_content.models import Lesson
from course_content.serializers import LessonSerializer
from courses.models import Course

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def lesson_detail_api(request, lesson_id):
    lesson = get_object_or_404(Lesson, id=lesson_id)
    course = lesson.section.course

    if not course.user_has_access(request.user):
        return Response({"detail": "Access denied."}, status=403)

    serializer = LessonSerializer(lesson)
    return Response(serializer.data)
