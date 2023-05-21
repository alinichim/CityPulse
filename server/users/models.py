from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from jsonfield import JSONField


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractBaseUser):
    name = models.CharField(max_length=30)
    password = models.CharField(max_length=256)
    email = models.EmailField(unique=True)
    contact = models.CharField(max_length=20, default='+40785070957')
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    friend_list = models.JSONField(default=dict)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    objects = CustomUserManager()

    def __str__(self):
        return self.email
    

class FavoriteLocation(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='favorite_locations')
    data = models.JSONField(default=dict)

    def __str__(self):
        return f"Favorite Location for {self.user.email}"
