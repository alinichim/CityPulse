from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ShelterViewSet

router = DefaultRouter()
router.register(r'shelters', ShelterViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]