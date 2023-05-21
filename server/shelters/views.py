from .models import Shelter
from users.models import CustomUser
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
    
    return JsonResponse({"success": False, "error": "Bad request method"})

def get_user(request):

    if request.method == "GET":
        # Check token.
        if "Authorization" not in request.headers or request.headers["Authorization"] not in tokens:
            return JsonResponse({"success": False, "error": "Invalid token"})
        
        user = tokens[request.headers["Authorization"]]
        return JsonResponse({"success": True, "name": user.name, "email": user.email, "contact": user.contact})
    
    return JsonResponse({"success": False, "error": "Bad request method"})

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
    
    return JsonResponse({"success": False, "error": "Bad request method"})
    
    
@csrf_exempt
def emergency_sms(request):

    if request.method == 'POST':
        account_sid = 'AC75dfdabe82e41397a479a5686da9e540'
        auth_token = '1c3013ec7e42ae83b2ff34d321958aad'
        
        if "Authorization" not in request.headers or request.headers["Authorization"] not in tokens:
            return JsonResponse({"success": False, "error": "Invalid token"})
        
        client = Client(account_sid, auth_token)
        data = json.loads(request.body.decode('utf-8'))
        msg_text = f"{tokens[request.headers['Authorization']].name} is in need of urgent help!If you can't reach out to them, please dial the national emergency number and ask for immediate support! (lat. {str(data['latitude'])}, long. {str(data['latitude'])}"
        
        message = client.messages.create(
            body=msg_text,
            from_='+12542564967',
            to=tokens[request.headers["Authorization"]].contact
        )
        return JsonResponse({'success':True})

    return JsonResponse({"success": False, "error": "Bad request method"})

@csrf_exempt
def add_friend(request):
    # Check method.
    if request.method == "POST":
        # Check token.
        if "Authorization" not in request.headers or request.headers["Authorization"] not in tokens:
            return JsonResponse({"success": False, "error": "Invalid token"})
        
        # Check email.
        data_str = request.body.decode('utf-8')
        if data_str == "":
            return JsonResponse({"success": False, "error": "Invalid data"})
        data = json.loads(data_str)
        if 'email' not in data:
            return JsonResponse({"success": False, "error": "No email received"})
        
        # Check user by email.
        if not CustomUser.objects.filter(email=data['email'].lower()).exists():
            return JsonResponse({"success": False, "error": "No user with given email exists"})

        # Add email to user friend list.
        user = CustomUser.objects.get(email=data['email'].lower())
        if 'associates' not in user.friend_list:
            user.friend_list['associates'] = []
        current_user_email = tokens[request.headers['Authorization']].email
        if current_user_email in user.friend_list['associates']:
            return JsonResponse({"success": False, "error": "User already registered as associate"})
        user.friend_list['associates'].append(current_user_email)
        user.save()
        return JsonResponse({"success": True})

    return JsonResponse({"success": False, "error": "Bad request method"})

@csrf_exempt
def remove_friend(request):
    # Check method.
    if request.method == "POST":
        # Check token.
        if "Authorization" not in request.headers or request.headers["Authorization"] not in tokens:
            return JsonResponse({"success": False, "error": "Invalid token"})
        
        # Check email.
        data_str = request.body.decode('utf-8')
        if data_str == "":
            return JsonResponse({"success": False, "error": "Invalid data"})
        data = json.loads(data_str)
        if 'email' not in data:
            return JsonResponse({"success": False, "error": "No email received"})
        
        user = tokens[request.headers['Authorization']]

        
        # Check user by email.
        if 'friends' not in user.friend_list or data['email'].lower() not in user.friend_list['friends']:
            return JsonResponse({"success": False, "error": "Email not in frined list"})

        # Remove email from user friend list.
        user.friend_list['friends'].remove(data['email'].lower())
        user.save()
        return JsonResponse({"success": True})

    return JsonResponse({"success": False, "error": "Bad request method"})

location_data = {}

@csrf_exempt
def send_location(request):
    # Check method.
    if request.method == "POST":
        # Check token.
        if "Authorization" not in request.headers or request.headers["Authorization"] not in tokens:
            return JsonResponse({"success": False, "error": "Invalid token"})
        
        # Check data.
        data_str = request.body.decode('utf-8')
        if data_str == "":
            return JsonResponse({"success": False, "error": "Invalid data"})
        data = json.loads(data_str)
        if 'latitude' not in data or 'longitude' not in data or 'timestamp' not in data:
            return JsonResponse({"success": False, "error": "Incomplete data"})
        
        user = tokens[request.headers['Authorization']]

        # Store location.
        location_data[user.email] = {"latitude": data['latitude'], "longitude": data['longitude'], "timestamp": data['timestamp']}
        
        return JsonResponse({"success": True})

    return JsonResponse({"success": False, "error": "Bad request method"})

@csrf_exempt
def get_location(request):
    # Check method.
    if request.method == "POST":
        # Check token.
        if "Authorization" not in request.headers or request.headers["Authorization"] not in tokens:
            return JsonResponse({"success": False, "error": "Invalid token"})
        
        # Check email.
        data_str = request.body.decode('utf-8')
        if data_str == "":
            return JsonResponse({"success": False, "error": "Invalid data"})
        data = json.loads(data_str)
        if 'email' not in data:
            return JsonResponse({"success": False, "error": "No email received"})
        email = data['email'].lower()
        
        # Check if email is in location data.
        if email not in location_data:
            return JsonResponse({"success": False, "error": "No available data"})

        return JsonResponse({"success": True, email: location_data[email]})

    return JsonResponse({"success": False, "error": "Bad request method"})
