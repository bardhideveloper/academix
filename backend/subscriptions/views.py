from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Subscription
from .serializers import SubscriptionSerializer

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_subscriptions(request):
    user_subs = Subscription.objects.filter(user=request.user)
    serializer = SubscriptionSerializer(user_subs, many=True)
    return Response(serializer.data)
