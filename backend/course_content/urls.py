from django.urls import path
from . import views

app_name = "course_content"

urlpatterns = [
    path("by-course/<int:course_id>/", views.lessons_by_course, name="lessons_by_course"),
]