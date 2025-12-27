from django.db import models
from users.models import User
from courses.models import Course

class InactiveUserLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    logged_at = models.DateTimeField(auto_now_add=True)
    detected_at = models.DateTimeField(auto_now_add=True)
