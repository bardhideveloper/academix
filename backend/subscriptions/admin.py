from django.contrib import admin
from .models import Subscription


@admin.register(Subscription)
class SubscriptionAdmin(admin.ModelAdmin):
    list_display = ('user', 'course', 'status', 'progress', 'start_date')
    list_filter = ('status',)
    search_fields = ('user__email', 'course__title')
