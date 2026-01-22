from decimal import Decimal
from django.db.models.signals import post_save
from django.dispatch import receiver
from progress.models import CourseProgress
from subscriptions.models import Subscription
from .models import Notification

@receiver(post_save, sender=Subscription)
def subscription_created(sender, instance, created, **kwargs):
    if created:
        Notification.objects.create(
            user=instance.user,
            title="Subscription Active",
            message=f"You are now subscribed to {instance.course.title}",
            type="info",
            status="sent",
        )

@receiver(post_save, sender=CourseProgress)
def progress_updated(sender, instance, **kwargs):
    try:
        pct = Decimal(instance.progress_percentage)
    except Exception:
        return 

    if pct >= Decimal("100.00"):
        already_exists = Notification.objects.filter(
            user=instance.user,
            title="Course Completed 🎉",
            message__icontains=instance.course.title,
        ).exists()

        if not already_exists:
            Notification.objects.create(
                user=instance.user,
                title="Course Completed 🎉",
                message=f"You completed {instance.course.title}",
                type="info",
                status="sent",
            )
