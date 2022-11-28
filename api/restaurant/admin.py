from django.contrib import admin

# Register your models here.
from restaurant.models import Category
from restaurant.models import Item
from restaurant.models import Restaurant

admin.site.register(Category)
admin.site.register(Item)
admin.site.register(Restaurant)