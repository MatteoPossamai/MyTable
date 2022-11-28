from django.contrib import admin

# Register your models here.
from order.models import Order
from order.models import Take

admin.site.register(Order)
admin.site.register(Take)
