from django.urls import path
from . import views

urlpatterns = [
    path("my/", views.my_progress),
    path("course/<int:course_id>/", views.course_progress),
]
