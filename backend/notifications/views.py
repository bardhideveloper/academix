from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Notification
from .serializers import NotificationSerializer

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def list_notifications(request):
    notifications = Notification.objects.filter(user=request.user).order_by("-created_at")

    data = []
    for n in notifications:
        strategy = NotificationStrategyFactory.get_strategy(n.type)
        data.append(strategy.serialize(n))

    return Response(data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def mark_notification_read(request, pk):
    try:
        notification = Notification.objects.get(pk=pk, user=request.user)
    except Notification.DoesNotExist:
        return Response({"detail": "Notification not found"}, status=status.HTTP_404_NOT_FOUND)

    if notification.status != "read":
        notification.status = "read"
        notification.save(update_fields=["status"])

    return Response({"success": True})

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def mark_all_notifications_read(request):
    updated = (
        Notification.objects
        .filter(user=request.user)
        .exclude(status="read")
        .update(status="read")
    )
    return Response({"success": True, "updated": updated})

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def unread_count(request):
    count = Notification.objects.filter(user=request.user).exclude(status="read").count()
    return Response({"unread": count})
