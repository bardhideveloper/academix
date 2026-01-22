from django.urls import path
from . import views

urlpatterns = [
    path("", views.list_notifications, name="notifications-list"),
    path("<int:pk>/read", views.mark_notification_read, name="notifications-read-one"),
    path("read-all", views.mark_all_notifications_read, name="notifications-read-all"),
    path("unread-count", views.unread_count, name="notifications-unread-count"),
]
