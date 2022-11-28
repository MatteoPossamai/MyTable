from rest_framework import serializers

from .restaurant_user import RestaurantUser

class RestaurantUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestaurantUser
        fields = (
            'id',
            'username',
            'email',
            'password',
            'restaurant',
            'level',
        )