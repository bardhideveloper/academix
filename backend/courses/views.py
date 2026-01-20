from rest_framework import generics, permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Course
from .serializers import CourseSerializer
from subscriptions.models import Subscription

class CourseListAPIView(generics.ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [] 
  
class CourseDetailAPIView(generics.RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]  
    lookup_field = 'id'  


class MyCoursesAPIView(generics.ListAPIView):
    serializer_class = CourseSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_subscriptions = Subscription.objects.filter(user=self.request.user)
        courses = [sub.course for sub in user_subscriptions]
        return courses
