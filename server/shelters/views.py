from .models import Shelter
from django.http import JsonResponse
from users.views import tokens
from django.http import JsonResponse
from geopy import distance
import json
import hashlib
import string



def return_shelters(request):

    if request.method == 'GET':
        # Check token.
        if "Authorization" not in request.headers or request.headers["Authorization"] not in tokens:
            return JsonResponse({"success": False, "error": "Invalid token"})

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

        return JsonResponse({"success": True, "safetyPlaces": data_q})
    
    return JsonResponse({"success": False, "error": "Invalid method"})


def shelter_list_view(request):
    if request.method == 'GET':
        latitude = float(request.body['latitude'])
        longitude = float(request.body['longitude'])
        range_km = float(request.body['range'])

        user_location = (latitude, longitude)

        shelters = Shelter.objects.all()
        shelters_within_range = []

        for shelter in shelters:
            shelter_location = (shelter.latitude, shelter.longitude)
            dist = distance(user_location, shelter_location).km

            if dist <= range_km:
                shelters_within_range.append(shelter)

        shelter_data = [
            {
                'name': shelter.name,
                'latitude': shelter.latitude,
                'longitude': shelter.longitude,
                'distance': distance(user_location, (shelter.latitude, shelter.longitude)).km
            }
            for shelter in shelters_within_range
        ]

        return JsonResponse({'shelters': shelter_data})