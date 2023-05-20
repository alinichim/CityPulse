from django.http import JsonResponse
from .models import CustomUser
from django.views.decorators.csrf import csrf_exempt
import json
import hashlib
import string
import random

def generate_token(length):
    letters = string.ascii_letters + string.digits
    token = ''.join(random.choice(letters) for _ in range(length))
    return token

tokens = {}

def compute_hash(input_string):
    # Create a hash object using the SHA-256 algorithm
    hash_object = hashlib.sha256()

    # Update the hash object with the input string
    hash_object.update(input_string.encode('utf-8'))

    # Get the hexadecimal representation of the hash
    hash_value = hash_object.hexdigest()

    # Return the hash value
    return hash_value

@csrf_exempt
def register_user(request):
    # Check method.
    if request.method == "POST":
        # Parse the data from request.
        creds = json.loads(request.body.decode('utf-8'))
        # Check if a user with the same username or email already exists
        email = creds["email"]
        name = creds["name"]

        if CustomUser.objects.filter(email=email).exists():
            return JsonResponse({"success": False, "error": "User already registered."})
        
        new_user = CustomUser(email=email, name=name, is_active=True, is_staff=False, password=compute_hash(creds["password"]))
        new_user.save()

        # Generate token.
        new_token = generate_token(64)
        while "Bearer=" + new_token in tokens:
            new_token = generate_token(64)
        
        tokens["Bearer=" + new_token] = new_user
        
        # Return a success message or redirect the user
        return JsonResponse({"success": True, "Authorization": new_token})

@csrf_exempt
def login_user(request):
    # Check method.
    if request.method == "POST":
        # Parse the data from request.
        creds = json.loads(request.body.decode('utf-8'))
        # Check if a user with the same username or email already exists
        email = creds["email"]

        user = CustomUser()
        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            return JsonResponse({"success": False, "error": "User not found."})
        
        # Check password.
        if user.password != compute_hash(creds["password"]):
            return JsonResponse({"success": False, "error": "Wrong password."})
        
        # Generate token.
        new_token = generate_token(64)
        while "Bearer=" + new_token in tokens:
            new_token = generate_token(64)
        
        tokens["Bearer=" + new_token] = user

        # Return a success message or redirect the user
        response = JsonResponse({"success": True, "Authorization": new_token})
        return response