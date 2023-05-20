from django.urls import path
from .views import return_shelters

urlpatterns = [
    path('api/shelters/', return_shelters, name='shelter-list'),
]