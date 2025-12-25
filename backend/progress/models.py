from django.db import models
from decimal import Decimal

from users.models import User
from courses.models import Course


class CourseProgress(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="course_progress"
    )
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name="progress"
    )

    completed_lessons = models.PositiveIntegerField(default=0)
    total_lessons = models.PositiveIntegerField()

    progress_percentage = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        default=Decimal("0.00")
    )

    last_activity = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("user", "course")

    def save(self, *args, **kwargs):
        if self.total_lessons > 0:
            self.progress_percentage = (
                Decimal(self.completed_lessons) /
                Decimal(self.total_lessons)
            ) * Decimal("100")
        else:
            self.progress_percentage = Decimal("0.00")

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.email} - {self.course.title} ({self.progress_percentage}%)"
