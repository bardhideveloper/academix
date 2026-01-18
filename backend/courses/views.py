from django.shortcuts import get_object_or_404, render
from django.http import HttpResponseForbidden
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import CourseSerializer
from subscriptions.models import Subscription

from .models import Course

@login_required
def course_detail(request, course_id):
    course = get_object_or_404(Course, id=course_id)

    if not course.user_has_access(request.user):
        return HttpResponseForbidden("You do not have access to this course.")

    return render(
        request,
        "courses/course_detail.html",
        {"course": course}
    )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_courses(request):
    user_subscriptions = Subscription.objects.filter(user=request.user)
    courses = [sub.course for sub in user_subscriptions]
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)
