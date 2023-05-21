from django.urls import path
from .views import register_user, login_user,change_user_data

urlpatterns = [
    path('register/', register_user, name='register_users'),
    path('login/', login_user, name='login_users'),
    path('update/', change_user_data, name='change_users'),

]