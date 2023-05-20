from django.urls import path
from .views import return_shelters

urlpatterns = [
    path('shelters/', return_shelters, name='shelters'),
]