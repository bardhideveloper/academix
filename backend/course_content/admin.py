from django.contrib import admin
from .models import (
    CourseContentSection,
    CourseContentLesson,
    CourseContentLessonContent,
)


@admin.register(CourseContentSection)
class CourseContentSectionAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "course", "order", "created_at")
    list_filter = ("course",)
    ordering = ("course", "order")


@admin.register(CourseContentLesson)
class CourseContentLessonAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "section", "content_type", "order", "is_preview")
    list_filter = ("content_type", "is_preview")
    ordering = ("section", "order")


@admin.register(CourseContentLessonContent)
class CourseContentLessonContentAdmin(admin.ModelAdmin):
    list_display = ("id", "lesson")
