from rest_framework import generics

from ..models.category import Category
from ..serializers.category import CategorySerializer

# CREATE
# Create the category
class CategoryCreateView(generics.CreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

# READ
# Get the category list
class CategoryGetAllView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

# Get single category
class CategoryGetView(generics.RetrieveAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

# UPDATE
# Retrieve the category
class CategoryPutView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

# DELETE
# Delete the category
class CategoryDeleteView(generics.DestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
