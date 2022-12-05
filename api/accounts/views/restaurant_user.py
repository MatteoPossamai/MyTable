from rest_framework import generics, status, views
from rest_framework.response import Response

from ..models.restaurant_user import RestaurantUser
from ..serializers.restaurant_user import RestaurantUserSerializer
from utilities import Encryptor

Encryptor = Encryptor()

# CREATE
# Create the restaurant user
class RestaurantUserCreateView(views.APIView):
    def post(self, request, format=None):
        data = request.data
        # Hash password for security
        data['password'] = Encryptor.encrypt(data['password'])
        serializer = RestaurantUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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

# Login
class RestaurantUserLoginView(views.APIView):
    def post(self, request, format=None):
        data = request.data
        username = data['username']
        password = data['password']
        # Check if the user exists
        try:
            user = RestaurantUser.objects.get(username=username)
        except RestaurantUser.DoesNotExist:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_404_NOT_FOUND)

        if Encryptor.check_password(password, user.password):
            return Response({'success': 'Login successful'}, status=status.HTTP_200_OK)
        return Response({'error': 'invalid password'}, status=status.HTTP_400_BAD_REQUEST)