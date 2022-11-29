from rest_framework import generics

from ..models.order import Order
from ..serializers.order import OrderSerializer

# CREATE
# Create the order
class OrderCreateView(generics.CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

# READ
# Get the order list
class OrderGetAllView(generics.ListAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

# Get single order
class OrderGetView(generics.RetrieveAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

# UPDATE
# Retrieve the order
class OrderPutView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

# DELETE
# Delete the order
class OrderDeleteView(generics.DestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
