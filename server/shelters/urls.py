from django.urls import path, include
from .views import return_shelters, shelter_list_view, emergency_sms

urlpatterns = [
    path('shelters/', return_shelters),
    path('range/', shelter_list_view),
    path('sms/', emergency_sms),

]