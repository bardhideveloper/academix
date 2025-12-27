from django.db import models
from users.models import User

class Notification(models.Model):
    TYPE_CHOICES = [
        ('reminder', 'Reminder'),
        ('warning', 'Warning'),
        ('info', 'Info'),
    ]

    STATUS_CHOICES = [
        ('sent', 'Sent'),
        ('pending', 'Pending'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    message = models.TextField()

    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)

    created_at = models.DateTimeField(auto_now_add=True)
    sent_at = models.DateTimeField(null=True, blank=True)
