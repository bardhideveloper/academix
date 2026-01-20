from rest_framework import serializers  
from .models import Subscription
from courses.models import Course

class SubscriptionSerializer(serializers.ModelSerializer):
    course_id = serializers.IntegerField(source="course.id", read_only=True)
    course_title = serializers.CharField(source="course.title", read_only=True)
    user_email = serializers.CharField(source="user.email", read_only=True)
    can_access_content = serializers.SerializerMethodField()

    class Meta:
        model = Subscription
        fields = ['id', 'user_email', 'course_id', 'course_title', 'status', 'start_date', 'end_date', 'can_access_content']
        read_only_fields = ['id', 'user_email', 'course_id', 'course_title', 'status', 'start_date', 'end_date', 'can_access_content']

    def get_can_access_content(self, obj):
        return obj.status in ['active', 'in_progress']

    def create(self, validated_data):
        user = self.context['request'].user
        course_id = self.context['request'].data.get('course_id')  
        course = Course.objects.get(id=course_id)
        subscription, created = Subscription.objects.get_or_create(user=user, course=course)
        return subscription
