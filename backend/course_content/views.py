from django.shortcuts import get_object_or_404
from django.http import HttpResponseForbidden
from django.contrib.auth.decorators import login_required

from course_content.models import Lesson


@login_required
def lesson_detail(request, lesson_id):
    lesson = get_object_or_404(Lesson, id=lesson_id)
    course = lesson.section.course

    if not course.user_has_access(request.user):
        return HttpResponseForbidden("Access denied.")

    return render(
        request,
        "lessons/detail.html",
        {"lesson": lesson}
    )
