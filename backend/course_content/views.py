from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Lesson, Section
from .serializers import LessonSerializer
from courses.models import Course

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def lesson_detail_api(request, lesson_id: int):
    lesson = get_object_or_404(Lesson, id=lesson_id)
    course = lesson.section.course
    if not course.user_has_access(request.user):
        return Response({"detail": "Access denied."}, status=403)
    serializer = LessonSerializer(lesson)
    return Response(serializer.data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def course_lessons(request, course_id: int):
    course = get_object_or_404(Course, id=course_id)
    if not course.user_has_access(request.user):
        return Response({"detail": "Access denied."}, status=403)
    lessons = Lesson.objects.filter(section__course=course).order_by("section__order", "order")
    serializer = LessonSerializer(lessons, many=True)
    return Response(serializer.data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def lessons_by_course(request, course_id):
    lessons = Lesson.objects.filter(section__course_id=course_id).order_by("section__order", "order")
    serializer = LessonSerializer(lessons, many=True, context={"request": request})
    return Response(serializer.data)