from django.db import models

from restaurant.models import Item
from .order import Order

class Take(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    batch = models.IntegerField()

    def __str__(self):
        return "Order: " + str(self.order.id) + " - Item: " + \
            str(self.item.id) + " - Quantity: " + str(self.quantity) + " - Batch: " + str(self.batch)