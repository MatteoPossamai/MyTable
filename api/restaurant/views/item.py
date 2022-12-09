from rest_framework import generics, status, views
from rest_framework.response import Response

from ..models.item import Item
from ..serializers.item import ItemSerializer

# CREATE
# Create the item
class ItemCreateView(generics.CreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

# READ
# Get the item list
class ItemGetAllView(generics.ListAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

class ItemGetAllActiveView(generics.ListAPIView):
    queryset = Item.objects.filter(isActive=True)
    serializer_class = ItemSerializer

# Get single item
class ItemGetView(generics.RetrieveAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

# UPDATE
# Retrieve the item
class ItemPutView(views.APIView):
    def put(self, request, pk, format=None):
        try:
            item = request.data
            instance = Item.objects.get(id=pk)
            instance.name = item['name']
            instance.description = item['description']
            instance.price = item['price']
            instance.iconId = item['iconId']
            instance.facts = item['facts']
            instance.number = item['number']
            instance.isActive = item['isActive']
            instance.save()
        except Item.DoesNotExist:
            return Response({'error': 'Item does not exist'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': 'Bad request'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'success': 'Item updated'}, status=status.HTTP_200_OK)

class ItemsChangeNumberView(views.APIView):
    def put(self, request, format=None):
        try:
            items = request.data.get('items')
            for item in items:
                instance = Item.objects.get(id=item['id'])
                instance.number = item['number']
                instance.save()
        except:
            return Response({'error': 'Bad request'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'success': 'Number changed'}, status=status.HTTP_200_OK)
        

class ItemsChangeActiveView(views.APIView):
    def put(self, request, format=None):
        try:
            items = request.data.get('items')
            for item in items:
                instance = Item.objects.get(id=item['id'])
                instance.isActive = item['isActive']
                instance.save()
        except:
            return Response({'error': 'Bad request'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'success': 'Active changed'}, status=status.HTTP_200_OK)


# DELETE
# Delete the item
class ItemDeleteView(generics.DestroyAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer