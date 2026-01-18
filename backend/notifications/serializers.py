from rest_framework import serializers
from .models import Notification


class NotificationSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(source="user.id", read_only=True)

    class Meta:
        model = Notification
        fields = [
            "id",
            "title",
            "message",
            "type",
            "status",
            "created_at",
            "sent_at",
            "user_id",
        ]
