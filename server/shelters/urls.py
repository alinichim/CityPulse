from django.urls import path
from .views import ShelterListAPIView

urlpatterns = [
    path('api/shelters/', ShelterListAPIView.as_view(), name='shelter-list'),
]