from django.urls import path, include
from .views import return_shelters, shelter_list_view, get_user

urlpatterns = [
    path('shelters/', return_shelters),
    path('range/', shelter_list_view),
    path('user/', get_user),
]