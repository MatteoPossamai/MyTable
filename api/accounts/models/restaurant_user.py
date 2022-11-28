from django.db import models

from restaurant.models import Restaurant

class RestaurantUser(models.Model):
    username = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
    level = models.IntegerField(default=0)

    def __str__(self):
        return self.email