from rest_framework import serializers
from .models import Wishlist
from courses.serializers import CourseSerializer

class WishlistSerializer(serializers.ModelSerializer):
    course = CourseSerializer(read_only=True)  
    course_id = serializers.IntegerField(write_only=True)  

    class Meta:
        model = Wishlist
        fields = ['id', 'course_id', 'course', 'created_at']
        read_only_fields = ['id', 'course', 'created_at']

    def create(self, validated_data):
        user = self.context['request'].user
        course_id = validated_data.pop('course_id')
        from courses.models import Course
        course = Course.objects.get(id=course_id)
        wishlist, created = Wishlist.objects.get_or_create(user=user, course=course)
        return wishlist
