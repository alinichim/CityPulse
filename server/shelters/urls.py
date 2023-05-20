<<<<<<< HEAD
from django.urls import path
from .views import return_shelters

urlpatterns = [
    path('shelters/', return_shelters, name='shelters'),
=======
from django.urls import path, include
from .views import return_shelters

urlpatterns = [
    path('shelters/', return_shelters),
>>>>>>> 22942d13d6f078b60a7a42dc62a70a4dcf01f7f9
]