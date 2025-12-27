from django.shortcuts import get_object_or_404, render
from django.http import HttpResponseForbidden
from django.contrib.auth.decorators import login_required

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


@login_required
def my_courses(request):
    courses = Course.objects.filter(users=request.user)
    return render(request, "courses/my_courses.html", {"courses": courses})
