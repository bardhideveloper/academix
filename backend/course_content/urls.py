from django.urls import path
from .views import (
    course_sections,
    section_lessons,
    lesson_content
)

urlpatterns = [
    path("courses/<int:course_id>/sections/", course_sections),
    path("sections/<int:section_id>/lessons/", section_lessons),
    path("lessons/<int:lesson_id>/content/", lesson_content),
]
