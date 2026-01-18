from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import Wishlist
from .serializers import WishlistSerializer
from courses.models import Course

@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def wishlist_list_create(request):
    user = request.user

    if request.method == "GET":
        qs = Wishlist.objects.filter(user=user)
        serializer = WishlistSerializer(qs, many=True)
        return Response(serializer.data)

    if request.method == "POST":
        course_id = request.data.get("course_id")
        if not course_id:
            return Response(
                {"detail": "course_id is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        course = Course.objects.filter(id=course_id).first()
        if not course:
            return Response(
                {"detail": "Course not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        obj, created = Wishlist.objects.get_or_create(
            user=user,
            course=course
        )

        if not created:
            return Response(
                {"detail": "Already in wishlist"},
                status=status.HTTP_200_OK
            )

        serializer = WishlistSerializer(obj)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(["GET", "DELETE"])
@permission_classes([IsAuthenticated])
def wishlist_detail(request, course_id):
    user = request.user

    qs = Wishlist.objects.filter(user=user, course_id=course_id)

    if request.method == "GET":
        return Response({"exists": qs.exists()})

    if request.method == "DELETE":
        deleted, _ = qs.delete()
        return Response(
            {"deleted": deleted > 0},
            status=status.HTTP_200_OK
        )
