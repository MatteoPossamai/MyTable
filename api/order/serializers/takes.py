from rest_framework import serializers

from order.models import Take

class TakeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Take
        fields = (
            'id',
            'order',
            'item',
            'quantity',
            'batch',
        )