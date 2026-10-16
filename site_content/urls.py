from django.urls import path

from .views import health, site_config


urlpatterns = [
    path("health/", health, name="health"),
    path("site-config/", site_config, name="site-config"),
]

