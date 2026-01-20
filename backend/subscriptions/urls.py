from django.urls import path
from .views import (
    my_subscriptions,
    CreateSubscriptionAPIView,
    SubscribeView,
    cancel_subscription,
    resume_subscription
)


urlpatterns = [
   path("mine/", my_subscriptions, name="my_subscriptions"),
    path("create/", CreateSubscriptionAPIView.as_view(), name="create_subscription"),
    path("subscribe/", SubscribeView.as_view(), name="subscribe"),
    path("<int:subscription_id>/cancel/", cancel_subscription, name="cancel_subscription"),
    path("<int:subscription_id>/resume/", resume_subscription, name="resume_subscription"),
path("", CreateSubscriptionAPIView.as_view(), name="create_subscription"), 
]
