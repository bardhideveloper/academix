from django.urls import path
from . import views

urlpatterns = [
    path("", views.create_wishlist, name="create_wishlist"),          # POST
    path("mine/", views.my_wishlist, name="my_wishlist"),            # GET
    path("<int:course_id>/", views.remove_wishlist, name="remove_wishlist"),  # DELETE
]
