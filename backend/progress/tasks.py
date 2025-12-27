from celery import shared_task
from django.utils import timezone
from users.models import User
from courses.models import Course
from inactive_users.models import InactiveUserLog

@shared_task
def detect_inactive_users():
    # Merr vetëm 1 user dhe 1 course për test
    user = User.objects.first()
    course = Course.objects.first()

    if not user or not course:
        print("Nuk ka User ose Course të disponueshëm për test.")
        return "Nuk ka user/course"

    log = InactiveUserLog.objects.create(
        user=user,
        course=course,
        detected_at=timezone.now()  # Vendos një datetime për test
    )

    print(f"InactiveUserLog i krijuar: user={user.id}, course={course.id}")
    return log.id
