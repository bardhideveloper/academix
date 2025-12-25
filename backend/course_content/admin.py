from django.contrib import admin
from .models import Section, Lesson, LessonContent

@admin.register(Section)
class SectionAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "course", "order")
    ordering = ("course", "order")


@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "section", "content_type", "order", "is_preview")
    list_filter = ("content_type", "is_preview")
    ordering = ("section", "order")


@admin.register(LessonContent)
class LessonContentAdmin(admin.ModelAdmin):
    list_display = ("lesson",)
