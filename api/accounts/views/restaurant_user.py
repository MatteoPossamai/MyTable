from rest_framework import generics

from ..models.restaurant_user import RestaurantUser
from ..serializers.restaurant_user import RestaurantUserSerializer

# CREATE
# Create the restaurant user
class RestaurantUserCreateView(generics.CreateAPIView):
    queryset = RestaurantUser.objects.all()
    serializer_class = RestaurantUserSerializer

# READ
# Get the restaurant user list
class RestaurantUserGetAllView(generics.ListAPIView):
    queryset = RestaurantUser.objects.all()
    serializer_class = RestaurantUserSerializer

# Get single restaurant user
class RestaurantUserGetView(generics.RetrieveAPIView):
    queryset = RestaurantUser.objects.all()
    serializer_class = RestaurantUserSerializer

# UPDATE
# Retrieve the restaurant user
class RestaurantUserPutView(generics.RetrieveUpdateDestroyAPIView):
    queryset = RestaurantUser.objects.all()
    serializer_class = RestaurantUserSerializer

# DELETE
# Delete the restaurant user
class RestaurantUserDeleteView(generics.DestroyAPIView):
    queryset = RestaurantUser.objects.all()
    serializer_class = RestaurantUserSerializer
