from django.urls import path, include
from .views import return_shelters, get_user

urlpatterns = [
    path('shelters/', return_shelters),
    path('user/', get_user),
]