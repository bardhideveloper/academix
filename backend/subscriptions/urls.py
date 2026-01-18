from django.urls import path
from . import views

app_name = "subscriptions"

urlpatterns = [
    path("mine/", views.my_subscriptions, name="my_subscriptions"),
]