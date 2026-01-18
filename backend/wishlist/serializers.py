from rest_framework import serializers
from .models import Wishlist

class WishlistSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(source="user.id", read_only=True)
    course_id = serializers.IntegerField(source="course.id")

    class Meta:
        model = Wishlist
        fields = ["id", "user_id", "course_id"]
