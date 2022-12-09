from rest_framework.test import APITestCase
from rest_framework import status

from restaurant.models.category import Category
from restaurant.models.item import Item
from restaurant.models.restaurant import Restaurant

class ItemCreateTest(APITestCase):

    def setUp(self):
        self.restaurant = Restaurant.objects.create(
            name="test",
            plan=1,
            location="test",
            phone="test",
        )
        self.id = self.restaurant.id
        self.category = Category.objects.create(
            name="test",
            number=1, 
            iconId=1,
            isActive=True,
            restaurant=self.restaurant,
            description="test"
        )
        self.cat = self.category.id

    def test_restaurant_create(self):
        data = {
            "restaurant": self.id,
            "category": self.cat,
            "name": "test",
            "description": "test",
            "price": 1.00,
            "iconId": 1,
            "isActive": True,
            "number": 1,
            "facts": {}
        }
        response = self.client.post('/api/v1/item/create/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Item.objects.count(), 1)
        self.assertEqual(Item.objects.get().name, 'test')

    def test_restaurant_create_missing(self):
        data = {
            "restaurant": self.id,
            "category": self.cat,
            "name": "test",
            "facts": {}
        }
        response = self.client.post('/api/v1/item/create/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Item.objects.count(), 0)
