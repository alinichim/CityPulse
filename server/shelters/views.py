from .models import Shelter
from django.http import JsonResponse
from users.views import tokens

def return_shelters(request):

    if request.method == 'GET':
        # Check token.
        if "Authorization" in request.headers and request.headers["Authorization"] not in tokens:
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
    
    return JsonResponse({"error": "Invalid method"})