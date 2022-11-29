from rest_framework import generics

from ..models.takes import Take
from ..serializers.takes import TakeSerializer

# CREATE
# Create the takes
class TakesCreateView(generics.CreateAPIView):
    queryset = Take.objects.all()
    serializer_class = TakeSerializer

# READ
# Get the takes list
class TakesGetAllView(generics.ListAPIView):
    queryset = Take.objects.all()
    serializer_class = TakeSerializer

# Get single takes
class TakesGetView(generics.RetrieveAPIView):
    queryset = Take.objects.all()
    serializer_class = TakeSerializer

# UPDATE
# Retrieve the takes
class TakesPutView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Take.objects.all()
    serializer_class = TakeSerializer

# DELETE
# Delete the takes
class TakesDeleteView(generics.DestroyAPIView):
    queryset = Take.objects.all()
    serializer_class = TakeSerializer
