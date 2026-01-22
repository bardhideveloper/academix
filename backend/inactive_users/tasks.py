# inactive_users/tasks.py
from celery import shared_task
from django.utils import timezone
from datetime import timedelta
from progress.models import CourseProgress
from notifications.tasks import send_notification

@shared_task
def detect_inactive_users():
    threshold = timezone.now() - timedelta(days=3)

    inactive = CourseProgress.objects.filter(last_activity__lt=threshold)

    for p in inactive:
        send_notification.delay(
            p.user.id,
            "We miss you 👋",
            f"You haven't continued {p.course.title} in a while. Continue learning!",
            "reminder"
        )
