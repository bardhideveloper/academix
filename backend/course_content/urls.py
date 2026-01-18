from django.urls import path
from . import views

app_name = "course_content"

urlpatterns = [
    path("<int:lesson_id>/", views.lesson_detail_api, name="lesson_detail_api"),
]
