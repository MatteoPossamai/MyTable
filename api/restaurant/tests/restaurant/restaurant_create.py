from rest_framework.test import APITestCase
from rest_framework import status

from restaurant.models.restaurant import Restaurant

class RestaurantCreateTest(APITestCase):

    def test_restaurant_create(self):
        data = {
            "name": "test",
            "plan": 1,
            "location": "test",
            "phone": "test",
            "description": "test"
        }
        response = self.client.post('/api/v1/restaurant/create/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Restaurant.objects.count(), 1)
        self.assertEqual(Restaurant.objects.get().name, 'test')

    def test_restaurant_create_without_name(self):
        data = {
            "plan": 1,
            "location": "test",
            "phone": "test",
            "description": "test"
        }
        response = self.client.post('/api/v1/restaurant/create/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_restaurant_create_without_plan(self):
        data = {
            "name": "test",
            "location": "test",
            "phone": "test",
            "description": "test"
        }
        response = self.client.post('/api/v1/restaurant/create/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Restaurant.objects.count(), 1)
        self.assertEqual(Restaurant.objects.get().name, 'test')
        self.assertEqual(Restaurant.objects.get().plan, 0)

    def test_restaurant_create_without_location(self):
        data = {
            "name": "test",
            "plan": 1,
            "phone": "test",
            "description": "test"
        }
        response = self.client.post('/api/v1/restaurant/create/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_restaurant_create_without_phone(self):
        data = {
            "name": "test",
            "plan": 1,
            "location": "test",
            "description": "test"
        }
        response = self.client.post('/api/v1/restaurant/create/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_restaurant_create_without_description(self):
        data = {
            "name": "test",
            "plan": 1,
            "location": "test",
            "phone": "test"
        }
        response = self.client.post('/api/v1/restaurant/create/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_restaurant_create_multiple_instance(self):
        data = {
            "name": "test",
            "plan": 1,
            "location": "test",
            "phone": "test",
            "description": "test"
        }
        i = 0
        for i in range(10):
            data['name'] = 'test' + str(i)
            response = self.client.post('/api/v1/restaurant/create/', data, format='json')
            self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Restaurant.objects.count(), 10)
