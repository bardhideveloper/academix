from django.db import models
from django.utils.timezone import now
from users.models import User


class Subscription(models.Model):
    STATUS_CHOICES = (
        ('active', 'Active'),
        ('expired', 'Expired'),
        ('cancelled', 'Cancelled'),
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='subscriptions'
    )

    course = models.ForeignKey(
        "courses.Course",
        on_delete=models.CASCADE,
        related_name='subscriptions'
    )

    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='active'
    )

    start_date = models.DateField(auto_now_add=True)
    end_date = models.DateField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'course')

    def is_valid(self):
        if self.status != 'active':
            return False

        if self.end_date and self.end_date < now().date():
            return False

        return True

    def __str__(self):
        return f"{self.user.email} → {self.course.title}"
