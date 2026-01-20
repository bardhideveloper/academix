from django.urls import path
from .views import CourseListAPIView, CourseDetailAPIView, MyCoursesAPIView

urlpatterns = [
    path('', CourseListAPIView.as_view(), name='courses-list'),            # GET /api/courses/
    path('my/', MyCoursesAPIView.as_view(), name='my-courses'),            # GET /api/courses/my/
    path('<int:id>/', CourseDetailAPIView.as_view(), name='course-detail'), # GET /api/courses/1/
]
