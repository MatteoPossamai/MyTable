from rest_framework.test import APITestCase
from rest_framework import status

from restaurant.models.category import Category
from restaurant.models.restaurant import Restaurant

class CategoryUpdateTest(APITestCase):

    def setUp(self):
        self.restaurant = Restaurant.objects.create(
            name="test",
            plan=1,
            location="test",
            phone="test",
        )
        Category.objects.create(
            name="test",
            number=1,
            iconId=1,
            isActive=True,
            restaurant=self.restaurant,
            description="test"
        )

    def test_restaurant_update(self):
        category = Category.objects.get(name="test")
        identifier = category.id
        data = {
            "name": "test",
            "number": 1,
            "iconId": 1,
            "isActive": True,
            "restaurant": self.restaurant.id,
            "description": "test"
        }
        response = self.client.put(f'/api/v1/category/put/{identifier}/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Category.objects.count(), 1)
        self.assertEqual(Category.objects.get(id=identifier).name, 'test')

    def test_restaurant_update_not_found(self):
        data = {
            "name": "test",
            "number": 1,
            "iconId": 1,
            "isActive": True,
            "restaurant": self.restaurant.id,
            "description": "test"
        }
        response = self.client.put('/api/v1/category/put/255/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_restaurant_update_invalid_id(self):
        data = {
            "name": "test",
            "number": 1,
            "iconId": 1,
            "isActive": True,
            "restaurant": self.restaurant.id,
            "description": "test"
        }
        response = self.client.put('/api/v1/category/put/invalid_id/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_restaurant_update_invalid_data(self):
        category = Category.objects.get(name="test")
        identifier = category.id
        data = {
            "name": "test",
            "number": 1,
            "iconId": 1,
            "isActive": True,
            "restaurant": self.restaurant.id,
            "description": "test"
        }
        response = self.client.put(f'/api/v1/category/put/{identifier}/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Category.objects.count(), 1)
        self.assertEqual(Category.objects.get(id=identifier).name, 'test')

        data = {
            "name": "test",
            "restaurant": self.restaurant.id,
            "description": "test"
        }
        response = self.client.put(f'/api/v1/category/put/{identifier}/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Category.objects.count(), 1)
        self.assertEqual(Category.objects.get(id=identifier).name, 'test')

    def test_restaurant_update_invalid_data_2(self):
        category = Category.objects.get(name="test")
        identifier = category.id
        data = {
            "name": "test",
            "number": 1,
            "iconId": 1,
            "isActive": True,
            "restaurant": self.restaurant.id,
            "description": "test"
        }
        response = self.client.put(f'/api/v1/category/put/{identifier}/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Category.objects.count(), 1)
        self.assertEqual(Category.objects.get(id=identifier).name, 'test')

        data = {
            "name": "test",
            "number": 1,
        }
        response = self.client.put(f'/api/v1/category/put/{identifier}/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Category.objects.count(), 1)
        self.assertEqual(Category.objects.get(id=identifier).name, 'test')

    def test_restaurant_update_change_number(self):
        category = Category.objects.get(name="test")
        identifier = category.id
        data = {
            "categories": [
                {
                    "id": identifier,
                    "number": 2
                }
            ]
        }
        response = self.client.put(f'/api/v1/category/change-number/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Category.objects.count(), 1)
        self.assertEqual(Category.objects.get(id=identifier).name, 'test')
        self.assertEqual(Category.objects.get(id=identifier).number, 2)

    def test_restaurant_update_change_number_invalid_data(self):
        category = Category.objects.get(name="test")
        identifier = category.id
        data = {
            "categories": [
                {
                    "id": identifier,
                    "number": 2
                }
            ]
        }
        response = self.client.put(f'/api/v1/category/change-number/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Category.objects.count(), 1)
        self.assertEqual(Category.objects.get(id=identifier).name, 'test')
        self.assertEqual(Category.objects.get(id=identifier).number, 2)

        data = {
            "categories": [
                {
                    "id": identifier,
                }
            ]
        }
        response = self.client.put(f'/api/v1/category/change-number/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Category.objects.count(), 1)
        self.assertEqual(Category.objects.get(id=identifier).name, 'test')
        self.assertEqual(Category.objects.get(id=identifier).number, 2)

    def test_restaurant_update_change_active(self):
        category = Category.objects.get(name="test")
        identifier = category.id
        data = {
            "categories": [
                {
                    "id": identifier,
                    "isActive": False
                }
            ]
        }
        response = self.client.put(f'/api/v1/category/change-active/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Category.objects.count(), 1)
        self.assertEqual(Category.objects.get(id=identifier).name, 'test')
        self.assertEqual(Category.objects.get(id=identifier).isActive, False)

    def test_restaurant_update_change_active_invalid_data(self):
        category = Category.objects.get(name="test")
        identifier = category.id
        data = {
            "categories": [
                {
                    "id": identifier,
                    "isActive": False
                }
            ]
        }
        response = self.client.put(f'/api/v1/category/change-active/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Category.objects.count(), 1)
        self.assertEqual(Category.objects.get(id=identifier).name, 'test')
        self.assertEqual(Category.objects.get(id=identifier).isActive, False)

        data = {
            "categories": [
                {
                    "id": identifier,
                }
            ]
        }
        response = self.client.put(f'/api/v1/category/change-active/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Category.objects.count(), 1)
        self.assertEqual(Category.objects.get(id=identifier).name, 'test')
        self.assertEqual(Category.objects.get(id=identifier).isActive, False)