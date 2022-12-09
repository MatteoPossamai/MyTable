from rest_framework import serializers

from restaurant.models import Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = (
            'id',
            'name',
            'number',
            'iconId',
            'isActive',
            'restaurant',
            'description',
        )