from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Wishlist
from .serializers import WishlistSerializer
from courses.models import Course

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_wishlist(request):
    items = Wishlist.objects.filter(user=request.user)
    serializer = WishlistSerializer(items, many=True)
    return Response(serializer.data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_wishlist(request):
    course_id = request.data.get("course_id")
    course = Course.objects.get(id=course_id)
    item, created = Wishlist.objects.get_or_create(user=request.user, course=course)
    serializer = WishlistSerializer(item)
    return Response(serializer.data, status=201)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def remove_wishlist(request, course_id):
    try:
        item = Wishlist.objects.get(user=request.user, course_id=course_id)
        item.delete()
        return Response(status=204)
    except Wishlist.DoesNotExist:
        return Response({"detail": "Not found."}, status=404)
