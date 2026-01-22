from django.urls import path
from .views import CourseListAPIView, CourseDetailAPIView, MyCoursesAPIView

urlpatterns = [
    path('', CourseListAPIView.as_view(), name='courses-list'),       
    path('my/', MyCoursesAPIView.as_view(), name='my-courses'),            
    path('<int:id>/', CourseDetailAPIView.as_view(), name='course-detail'),
]
