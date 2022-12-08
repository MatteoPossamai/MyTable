from rest_framework import generics, status, views
from rest_framework.response import Response

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

class RestaurantChangePlan(views.APIView):
    def post(self, request, format=None):
        try:
            id = request.data.get('id')
            instance = Restaurant.objects.get(id=id)
            plan = request.data.get('plan')
            if type(plan) is not int:
                return Response({'error': 'Plan must be integer'}, status=status.HTTP_400_BAD_REQUEST)
            instance.plan = plan
            instance.save()
        except Restaurant.DoesNotExist:
            return Response({'error': 'Restaurant does not exist'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': 'Bad request'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'success': 'Plan changed'}, status=status.HTTP_200_OK)

# DELETE
# Delete the restaurant
class RestaurantDeleteView(generics.DestroyAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer
