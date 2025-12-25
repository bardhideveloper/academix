from django.contrib import admin
from .models import CourseProgress


@admin.register(CourseProgress)
class CourseProgressAdmin(admin.ModelAdmin):
    list_display = (
        'user',
        'course',
        'completed_lessons',
        'total_lessons',
        'progress_percentage',
        'last_activity',
    )
    list_filter = ('course',)
    search_fields = ('user__email',)
