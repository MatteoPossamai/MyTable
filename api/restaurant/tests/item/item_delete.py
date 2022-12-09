from rest_framework.test import APITestCase
from rest_framework import status

from restaurant.models.category import Category
from restaurant.models.item import Item
from restaurant.models.restaurant import Restaurant

class ItemDeleteTest(APITestCase):

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
        self.item = Item.objects.create(
            restaurant=self.restaurant,
            category=self.category,
            name="test",
            description="test",
            price=1.00,
            iconId=1,
            isActive=True,
            number=1,
            facts={}
        )
        self.item_id = self.item.id

    def test_restaurant_delete(self):
        response = self.client.delete(f'/api/v1/item/delete/{self.item_id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Item.objects.count(), 0)

    def test_restaurant_delete_no_id(self):
        response = self.client.delete('/api/v1/item/delete/0/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(Item.objects.count(), 1)

    def test_restaurant_delete_wrong_id(self):
        response = self.client.delete('/api/v1/item/delete/999/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(Item.objects.count(), 1)

    def test_restaurant_delete_multiple_single(self):
        response = self.client.delete(f'/api/v1/item/delete/{self.item_id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Item.objects.count(), 0)
        response = self.client.delete(f'/api/v1/item/delete/{self.item_id}/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(Item.objects.count(), 0)