from .models import Shelter
from django.http import JsonResponse
from users.views import tokens
from django.http import JsonResponse
from geopy.distance import geodesic
import json
from twilio.rest import Client
from django.views.decorators.csrf import csrf_exempt



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

def get_user(request):

    if request.method == "GET":
        # Check token.
        if "Authorization" not in request.headers or request.headers["Authorization"] not in tokens:
            return JsonResponse({"success": False, "error": "Invalid token"})
        
        user = tokens[request.headers["Authorization"]]
        return JsonResponse({"success": True, "name": user.name, "email": user.email})

def shelter_list_view(request):
    if request.method == 'GET':
        range_data = json.loads(request.body.decode('utf-8'))
        latitude = range_data['latitude']
        longitude = range_data['longitude']
        range_km = range_data['range']

        user_location = (latitude, longitude)

        shelters = Shelter.objects.all()
        shelters_within_range = []

        for shelter in shelters:
            shelter_location = (shelter.latitude, shelter.longitude)
            dist = geodesic(user_location, shelter_location).km

            if dist <= range_km:
                shelters_within_range.append(shelter)

        shelter_data = [
            {
                "name": shelter.name,
                "address": shelter.address,
                "capacity": shelter.capacity,
                "functionalities": shelter.functionalities,
                "latitude": shelter.latitude,
                "longitude": shelter.longitude,
                "type": shelter.type
            }
            for shelter in shelters_within_range
        ]

        return JsonResponse({'shelters': shelter_data})
    
    
@csrf_exempt
def emergency_sms(request):
    account_sid = 'AC75dfdabe82e41397a479a5686da9e540'
    auth_token = '1c3013ec7e42ae83b2ff34d321958aad'
    
    if "Authorization" not in request.headers or request.headers["Authorization"] not in tokens:
        return JsonResponse({"success": False, "error": "Invalid token"})
    
    client = Client(account_sid, auth_token)
    data = json.loads(request.body.decode('utf-8'))

    msg_text = f"{tokens[request.headers['Authorization']].name} is in need of urgent help!If you can't reach out to them, please dial the national emergency number and ask for immediate support! (lat. {data['latitude']}, long. {data['longitude']}"

    message = client.messages.create(
        body=msg_text,
        from_='+12542564967',
        to=tokens[request.headers["Authorization"]].contact
    )
    return JsonResponse({'success':True})