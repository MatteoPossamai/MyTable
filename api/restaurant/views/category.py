from rest_framework import generics, status, views
from rest_framework.response import Response

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

class CategoryGetAllActiveView(generics.ListAPIView):
    queryset = Category.objects.filter(isActive=True)
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

class CategoriesChangeNumberView(views.APIView):
    def post(self, request, format=None):
        try:
            categories = request.data.get('categories')
            for category in categories:
                instance = Category.objects.get(id=category['id'])
                instance.number = category['number']
                instance.save()
        except:
            return Response({'error': 'Bad request'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'success': 'Number changed'}, status=status.HTTP_200_OK)

class CategoriesChangeActiveView(views.APIView):
    def post(self, request, format=None):
        try:
            categories = request.data.get('categories')
            for category in categories:
                instance = Category.objects.get(id=category['id'])
                instance.isActive = category['isActive']
                instance.save()
        except:
            return Response({'error': 'Bad request'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'success': 'Active changed'}, status=status.HTTP_200_OK)

# DELETE
# Delete the category
class CategoryDeleteView(generics.DestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
