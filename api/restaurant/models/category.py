from django.db import models

from .restaurant import Restaurant

class Category(models.Model):
    name = models.CharField(max_length=255)
    number = models.IntegerField()
    iconId = models.IntegerField()
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)

    def __str__(self):
        return self.name