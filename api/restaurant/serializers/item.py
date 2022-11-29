from rest_framework import serializers

from restaurant.models import Item

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = (
            'id',
            'restaurant',
            'category',
            'name',
            'description',
            'price',
            'iconId',
            'isActive',
            'number',
            'facts',
        )