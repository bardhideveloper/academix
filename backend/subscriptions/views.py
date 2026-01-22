from rest_framework import generics, permissions, status
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Subscription
from courses.models import Course
from .serializers import SubscriptionSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_subscriptions(request):
    user_subs = Subscription.objects.filter(user=request.user)
    serializer = SubscriptionSerializer(user_subs, many=True)
    return Response(serializer.data)

class CreateSubscriptionAPIView(generics.CreateAPIView):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

class SubscribeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        course_id = request.data.get("course_id")
        if not course_id:
            return Response({"error": "course_id is required"}, status=status.HTTP_400_BAD_REQUEST)

        course = get_object_or_404(Course, id=course_id)

        subscription, created = Subscription.objects.get_or_create(user=request.user, course=course)

        serializer = SubscriptionSerializer(subscription)
        return Response({
            "success": True,
            "subscription": serializer.data,
            "created": created
        }, status=status.HTTP_201_CREATED)
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def cancel_subscription(request, subscription_id):
    try:
        sub = Subscription.objects.get(id=subscription_id, user=request.user)
        sub.status = "cancelled"
        sub.save()
        return Response({"success": True, "status": sub.status})
    except Subscription.DoesNotExist:
        return Response({"error": "Subscription not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def resume_subscription(request, subscription_id):
    try:
        sub = Subscription.objects.get(id=subscription_id, user=request.user)
        sub.status = "active"
        sub.save()
        return Response({"success": True, "status": sub.status})
    except Subscription.DoesNotExist:
        return Response({"error": "Subscription not found"}, status=status.HTTP_404_NOT_FOUND)