from django.db import models
from users.models import User
from courses.models import Course

class Wishlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'course')
