from rest_framework.test import APITestCase
from rest_framework import status

from restaurant.models.category import Category
from restaurant.models.item import Item
from restaurant.models.restaurant import Restaurant


class ItemUpdateTest(APITestCase):

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
            name="old",
            description="old",
            price=2.00,
            iconId=2,
            isActive=True,
            number=1,
            facts={}
        )
        self.item_id = self.item.id

    def test_restaurant_update(self):
        response = self.client.put(f'/api/v1/item/put/{self.item_id}/', {
            "name": "test",
            "description": "test",
            "price": 1.00,
            "iconId": 1,
            "isActive": True,
            "number": 1,
            "facts": {}
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        item = Item.objects.get(id=self.item_id)
        self.assertEqual(item.id, self.item_id)
        self.assertEqual(item.name, 'test')
        self.assertEqual(item.description, 'test')
        self.assertEqual(item.price, 1.00)
        self.assertEqual(item.category.id, 1)
        self.assertEqual(item.isActive, True)
        self.assertEqual(item.number, 1)
        self.assertEqual(item.facts, {})

    def test_restaurant_update_bad_request(self):
        response = self.client.put(f'/api/v1/item/put/{self.item_id}/', {
            "name": "test",
            "description": "test",
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_restaurant_update_not_found(self):
        response = self.client.put(f'/api/v1/item/put/100/', {
            "name": "test",
            "description": "test",
            "price": 1.00,
            "iconId": 1,
            "isActive": True,
            "number": 1,
            "facts": {}
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_restaurant_update_change_active(self):
        data = {
            "items": [
                {
                    "id": self.item_id,
                    "isActive": False
                }
            ]
        }
        response = self.client.put(f'/api/v1/item/change-active/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        item = Item.objects.get(id=self.item_id)
        self.assertEqual(item.id, self.item_id)
        self.assertEqual(item.isActive, False)

    def test_restaurant_update_change_active_bad_request(self):
        data = {
            "items": [
                {
                    "id": self.item_id,
                }
            ]
        }
        response = self.client.put(f'/api/v1/item/change-active/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_restaurant_update_change_active_not_found(self):
        data = {
            "items": [
                {
                    "id": 100,
                    "isActive": False
                }
            ]
        }
        response = self.client.put(f'/api/v1/item/change-active/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_restaurant_update_change_number(self):
        data = {
            "items": [
                {
                    "id": self.item_id,
                    "number": 4
                }
            ]
        }
        response = self.client.put(f'/api/v1/item/change-number/', data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        item = Item.objects.get(id=self.item_id)
        self.assertEqual(item.id, self.item_id)
        self.assertEqual(item.number, 4)

    def test_restaurant_update_change_number_bad_request(self):
        data = {
            "items": [
                {
                    "id": self.item_id,
                }
            ]
        }
        response = self.client.put(f'/api/v1/item/change-number/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_restaurant_update_change_number_not_found(self):
        data = {
            "items": [
                {
                    "id": 100,
                    "number": 4
                }
            ]
        }
        response = self.client.put(f'/api/v1/item/change-number/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)    
