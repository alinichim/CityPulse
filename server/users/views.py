from django.http import JsonResponse
from .models import CustomUser, FavoriteLocation
from django.views.decorators.csrf import csrf_exempt
import json
import hashlib
import string
import random

from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import FavoriteLocation
from .serializers import FavoriteLocationSerializer
from rest_framework import status


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
        email = creds["email"].lower()
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
    
    return JsonResponse({"success": False, "error": "Bad request method"})


@csrf_exempt
def login_user(request):
    # Check method.
    if request.method == "POST":
        # Parse the data from request.
        creds = json.loads(request.body.decode('utf-8'))
        # Check if a user with the same username or email already exists
        email = creds["email"].lower()

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
    
    return JsonResponse({"success": False, "error": "Bad request method"})


@csrf_exempt
def change_user_data(request):
    if request.method == "PUT":
        if "Authorization" not in request.headers or request.headers["Authorization"] not in tokens:
            return JsonResponse({"success": False, "error": "Invalid token"})
        data = json.loads(request.body.decode('utf-8'))
        user = tokens[request.headers["Authorization"]]
        if 'name' in data:
            user.name = data['name']
        if 'password' in data or '' in data['password']:
            user.password = compute_hash(data['password'])
        if 'contact' in data:
            user.contact = data['contact']
        user.save()
        return JsonResponse({"success":True})
    return JsonResponse({"success": False, "error": "Bad request method"})


@csrf_exempt
def add_fav(request):
    if request.method == "POST":
        if "Authorization" not in request.headers or request.headers["Authorization"] not in tokens:
            return JsonResponse({"success": False, "error": "Invalid token"})
        user = tokens[request.headers["Authorization"]]
        data = json.loads(request.body.decode('utf-8'))
        if FavoriteLocation.objects.filter(data=data).values():
            return JsonResponse({"success":False, "error":"Already added to favorite"})
        else:
            FavoriteLocation(user=user, data=request.body).save()
            return JsonResponse({"success":True})
        

@csrf_exempt
def get_fav(request):    
    if request.method == "GET":
        if "Authorization" not in request.headers or request.headers["Authorization"] not in tokens:
            return JsonResponse({"success": False, "error": "Invalid token"})
        user = tokens[request.headers["Authorization"]]
        favorite_locations = FavoriteLocation.objects.filter(user=user).values()
        response_data = json.dumps(list(favorite_locations), ensure_ascii=False)

        return JsonResponse(response_data, safe=False)
    return JsonResponse({"success": False, "error": "Bad request method"})


@csrf_exempt
def remove_fav(request):    
    if request.method == "POST":
        if "Authorization" not in request.headers or request.headers["Authorization"] not in tokens:
            return JsonResponse({"success": False, "error": "Invalid token"})
        user = tokens[request.headers["Authorization"]]
        data = request.body
        FavoriteLocation.objects.get(user=user, data=data).delete()
        return JsonResponse({"success":True})
    return JsonResponse({"success": False, "error": "Bad request method"})

