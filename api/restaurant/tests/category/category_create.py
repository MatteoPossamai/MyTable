from rest_framework.test import APITestCase
from rest_framework import status

from restaurant.models.category import Category
from restaurant.models.restaurant import Restaurant

class CategoryCreateTest(APITestCase):
    
    def setUp(self):
        self.restaurant = Restaurant.objects.create(
            name="test",
            plan=1,
            location="test",
            phone="test",
        )
        self.identificator = self.restaurant.id

    def test_category_create(self):

        data = {
            "name": "test",
            "number": 1,
            "iconId": 1,
            "isActive": True,
            "restaurant": self.identificator,
            "description": "test"
        }
        response = self.client.post('/api/v1/category/create/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Category.objects.count(), 1)
        self.assertEqual(Category.objects.get().name, 'test')

    def test_create_category_multiple(self):
        i = 0
        number_of_categories = 10
        data = {
            "name": "test",
            "number": 1,
            "iconId": 1,
            "isActive": True,
            "restaurant": self.identificator,
            "description": "test"
        }

        for i in range(number_of_categories):
            data["name"] = f"test{i}"
            response = self.client.post('/api/v1/category/create/', data, format='json')
            identifier = response.data['id']
            self.assertEqual(response.status_code, status.HTTP_201_CREATED)
            self.assertEqual(Category.objects.count(), i+1)
            self.assertEqual(Category.objects.get(id=identifier).name, f'test{i}')

    def test_create_category_no_name(self):
        data = {
            "number": 1,
            "iconId": 1,
            "isActive": True,
            "description": "test"
        }
        response = self.client.post('/api/v1/category/create/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_category_no_number(self):
        data = {
            "name": "test",
            "iconId": 1,
            "isActive": True,
            "description": "test"
        }
        response = self.client.post('/api/v1/category/create/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_category_no_iconId(self):
        data = {
            "name": "test",
            "number": 1,
            "isActive": True,
            "description": "test"
        }
        response = self.client.post('/api/v1/category/create/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_category_no_isActive(self):
        data = {
            "name": "test",
            "number": 1,
            "iconId": 1,
            "description": "test"
        }
        response = self.client.post('/api/v1/category/create/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_category_no_description(self):
        data = {
            "name": "test",
            "number": 1,
            "iconId": 1,
            "isActive": True,
        }
        response = self.client.post('/api/v1/category/create/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_category_bad_number_type(self):
        data = {
            "name": "test",
            "number": "1",
            "iconId": 1,
            "isActive": True,
            "restaurant": self.identificator,
            "description": "test"
        }
        response = self.client.post('/api/v1/category/create/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Category.objects.count(), 1)