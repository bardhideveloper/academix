from django.urls import path
from . import views

urlpatterns = [
    path("", views.wishlist_list_create),
    path("<int:course_id>", views.wishlist_detail),
]
