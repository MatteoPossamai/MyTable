from rest_framework import generics

from ..models.custom_user import CustomUser
from ..serializers.custom_user import CustomUserSerializer

# CREATE
# Create the custom user
class CustomUserCreateView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

# READ
# Get the custom user list
class CustomUserGetAllView(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

# Get single custom user
class CustomUserGetView(generics.RetrieveAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

# UPDATE
# Retrieve the custom user
class CustomUserPutView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

# DELETE
# Delete the custom user
class CustomUserDeleteView(generics.DestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
