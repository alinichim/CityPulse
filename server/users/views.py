from django.http import JsonResponse
from .models import CustomUser


def register_user(name, email, password):
    # Check if a user with the same username or email already exists
    if CustomUser.objects.filter(email=email).exists():
        # Handle the error or return an appropriate response
        return JsonResponse("Email already exists.")

    # Create a new user object
    new_user = CustomUser(name=name, email=email)

    # Set the user's password
    new_user.set_password(password)

    # Save the user to the database
    new_user.save()

    # Return a success message or redirect the user
    return JsonResponse("User registered successfully.")
