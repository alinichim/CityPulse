from .models import Shelter
from django.http import JsonResponse
from users.views import tokens
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