from rest_framework import viewsets
from .models import Shelter
from .serializers import ShelterSerializer
from django.http import JsonResponse, HttpRequest
import json
import random
import string

def generate_token(length):
    letters = string.ascii_letters + string.digits
    token = ''.join(random.choice(letters) for _ in range(length))
    return token

tokens = {"Bearer=6455898ad150673474b34370": True}

def return_shelters(request):

    if request.method == 'GET':
        # Check token.
        if request.headers["Authorization"] not in tokens:
            return JsonResponse({"error": "Invalid token"})

        queryset = Shelter.objects.all()

        data_q = []

        for set in queryset:
            data = {
                "name": set.name,
                "address": set.address,
                "capacity": set.capacity,
                "functionalities": set.functionalities,
                "latitude": set.latitude,
                "longitude": set.longitude,
                "type": set.type
            }
            data_q.append(data)

        return JsonResponse({"safetyPlaces": data_q})