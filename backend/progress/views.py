from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .models import CourseProgress
from .serializers import CourseProgressSerializer
from courses.models import Course


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_progress(request):
    progress = CourseProgress.objects.filter(user=request.user)
    serializer = CourseProgressSerializer(progress, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def course_progress(request, course_id):
    progress = get_object_or_404(
        CourseProgress,
        user=request.user,
        course_id=course_id
    )
    serializer = CourseProgressSerializer(progress)
    return Response(serializer.data)

