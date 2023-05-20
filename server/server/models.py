from django.db import models

class Shelter(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    capacity = models.IntegerField()
    functionalities = models.TextField()
    latitude = models.FloatField()
    longitude = models.FloatField()
    type = models.CharField(max_length=50)

    def __str__(self):
        return self.name