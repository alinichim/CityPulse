from rest_framework import generics
from .models import Shelter
from .serializers import ShelterSerializer

class ShelterListAPIView(generics.ListAPIView):
    queryset = Shelter.objects.all()
    serializer_class = ShelterSerializer