from django.urls import path
from . import views

urlpatterns = [
    path("", views.list_notifications),
    path("<int:pk>/read", views.mark_notification_read),
    path("read-all", views.mark_all_notifications_read),
]
