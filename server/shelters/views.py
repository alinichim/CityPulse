from rest_framework import viewsets
from .models import Shelter
from .serializers import ShelterSerializer
from django.http import JsonResponse

class ShelterViewSet(viewsets.ModelViewSet):
    queryset = Shelter.objects.all()
    serializer_class = ShelterSerializer

def return_shelters(request):
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