from django.urls import path, include
from .views import return_shelters

urlpatterns = [
    path('shelters/', return_shelters),
]