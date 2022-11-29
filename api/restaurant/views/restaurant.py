from rest_framework import generics

from ..models.restaurant import Restaurant
from ..serializers.restaurant import RestaurantSerializer

# CREATE
# Create the restaurant
class RestaurantCreateView(generics.CreateAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer

# READ
# Get the restaurant list
class RestaurantGetAllView(generics.ListAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer

# Get single restaurant
class RestaurantGetView(generics.RetrieveAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer

# UPDATE
# Retrieve the restaurant
class RestaurantPutView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer

# DELETE
# Delete the restaurant
class RestaurantDeleteView(generics.DestroyAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer
