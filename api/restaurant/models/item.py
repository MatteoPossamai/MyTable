from django.db import models

from .restaurant import Restaurant
from .category import Category

class Item(models.Model):
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    iconId = models.IntegerField()
    isActive = models.BooleanField(default=True)
    number = models.IntegerField()
    facts = models.JSONField()

    def __str__(self):
        return "Item: " + str(self.id) + " - " + self.name + " - " + self.restaurant.name