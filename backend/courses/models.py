from django.db import models
from users.models import User


class Course(models.Model):
    SEMESTER_CHOICES = (
        ('winter', 'Winter'),
        ('summer', 'Summer'),
    )

    title = models.CharField(max_length=255)
    code = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True)

    instructor = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        limit_choices_to={'role': 'instructor'},
        related_name='courses'
    )

    credits = models.PositiveIntegerField()
    semester = models.CharField(max_length=10, choices=SEMESTER_CHOICES)
    academic_year = models.CharField(max_length=9)  

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.code} - {self.title}"
