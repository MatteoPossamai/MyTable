from rest_framework import serializers

from order.models import Order

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = (
            'id',
            'payment_method',
            'payment_status',
            'order_status',
            'date',
            'restaurant',
        )