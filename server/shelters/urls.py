from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ShelterViewSet, return_shelters

urlpatterns = [
    path('api/shelters/', return_shelters),
]