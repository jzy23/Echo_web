from django.urls import include, path


urlpatterns = [
    path("api/", include("site_content.urls")),
]

