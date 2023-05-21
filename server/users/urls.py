from django.urls import path
from .views import register_user, login_user,change_user_data, add_fav, get_fav, remove_fav

urlpatterns = [
    path('register/', register_user, name='register_users'),
    path('login/', login_user, name='login_users'),
    path('update/', change_user_data, name='change_users'),
    path('add-fav/', add_fav, name='add-fav'),
    path('get-fav/', get_fav, name='get-fav'),
    path('remove-fav/', remove_fav, name='remove-fav'),

]