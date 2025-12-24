from django.contrib import admin
from .models import Course


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('code', 'title', 'instructor', 'credits', 'semester', 'academic_year', 'is_active')
    list_filter = ('semester', 'academic_year', 'is_active')
    search_fields = ('title', 'code')
