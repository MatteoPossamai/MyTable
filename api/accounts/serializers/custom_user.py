from rest_framework import serializers

from .custom_user import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = (
            'id',
            'username',
            'email',
        )