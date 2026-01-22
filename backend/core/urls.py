from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse
from django.conf import settings
from django.conf.urls.static import static

def home(request):
    return HttpResponse("Academix backend is running!")

urlpatterns = [
    path("", home),
    path("admin/", admin.site.urls),
    path("api/auth/", include("users.urls")),
    path("api/courses/", include("courses.urls")),
    path("api/course-content/", include("course_content.urls")),
    path("api/subscriptions/", include("subscriptions.urls")),
    path("api/progress/", include("progress.urls")),
    path("api/wishlist/", include("wishlist.urls")),
    path("api/notifications/", include("notifications.urls")),

]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

