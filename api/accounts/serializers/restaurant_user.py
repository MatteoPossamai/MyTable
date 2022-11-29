from rest_framework import serializers

from accounts.models import RestaurantUser

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