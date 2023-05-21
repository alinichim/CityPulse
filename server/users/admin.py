from django.contrib import admin
from .models import CustomUser, FavoriteLocation

# Register your models here.
admin.site.register(CustomUser)
admin.site.register(FavoriteLocation)