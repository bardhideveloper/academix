from django.contrib import admin
from .models import Notification


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'user',
        'title',
        'type',
        'status',
        'created_at',
        'sent_at',
    )
    list_filter = ('type', 'status', 'created_at')
    search_fields = ('title', 'message', 'user__email', 'user__username')
    ordering = ('-created_at',)
