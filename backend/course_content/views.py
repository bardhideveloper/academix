from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from subscriptions.models import Subscription
from .models import (
    CourseContentSection,
    CourseContentLesson,
    CourseContentLessonContent,
)
from .serializers import (
    CourseContentSectionSerializer,
    CourseContentLessonSerializer,
    CourseContentLessonContentSerializer,
)

def user_has_course_access(user, course_id: int) -> bool:
    """
    User must have an active or in-progress subscription
    to access course content.
    """
    return Subscription.objects.filter(
        user=user,
        course_id=course_id,
        status__in=["active", "in_progress"],
    ).exists()

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def course_sections(request, course_id):
  
    if not user_has_course_access(request.user, course_id):
        return Response(
            {"detail": "You do not have access to this course"},
            status=403,
        )

    sections = CourseContentSection.objects.filter(
        course_id=course_id
    ).order_by("order")

    serializer = CourseContentSectionSerializer(sections, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def section_lessons(request, section_id):

    section = get_object_or_404(CourseContentSection, id=section_id)

    if not user_has_course_access(request.user, section.course_id):
        return Response(
            {"detail": "You do not have access to this course"},
            status=403,
        )

    lessons = CourseContentLesson.objects.filter(
        section=section
    ).order_by("order")

    serializer = CourseContentLessonSerializer(lessons, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def lesson_content(request, lesson_id):

    lesson = get_object_or_404(CourseContentLesson, id=lesson_id)

    if not lesson.is_preview:
        course_id = lesson.section.course_id
        if not user_has_course_access(request.user, course_id):
            return Response(
                {"detail": "You do not have access to this lesson"},
                status=403,
            )

    content = get_object_or_404(
        CourseContentLessonContent,
        lesson=lesson,
    )

    serializer = CourseContentLessonContentSerializer(content)
    return Response(serializer.data)
