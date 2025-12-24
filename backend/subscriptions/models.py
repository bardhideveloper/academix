from django.db import models
from users.models import User
from courses.models import Course


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
        Course,
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

    progress = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        default=0.00
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'course')

    def __str__(self):
        return f"{self.user.email} → {self.course.title}"
