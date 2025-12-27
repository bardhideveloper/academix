from django.urls import path
from . import views

app_name = "courses"

urlpatterns = [
    path("my/", views.my_courses, name="my_courses"),
    path("<int:course_id>/", views.course_detail, name="course_detail"),
]
