from celery import shared_task
from django.utils import timezone
from .models import Notification

@shared_task
def send_notification(user_id, title, message, type="info"):
    obj = Notification.objects.create(
        user_id=user_id,
        title=title,
        message=message,
        type=type if type in ("info", "warning", "reminder") else "info",
        status="sent",
        sent_at=timezone.now()
    )
    return obj.id
