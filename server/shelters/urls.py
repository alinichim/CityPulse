from django.urls import path, include
from .views import return_shelters, shelter_list_view, emergency_sms, get_user, add_friend, remove_friend, send_location, get_location

urlpatterns = [
    path('shelters/', return_shelters),
    path('range/', shelter_list_view),
    path('sms/', emergency_sms),
    path('user/', get_user),
    path('addfriend/', add_friend),
    path('removefriend/', remove_friend),
    path('sendlocation/', send_location),
    path('getlocation/', get_location),
]