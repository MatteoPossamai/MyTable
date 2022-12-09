from rest_framework.test import APITestCase
from rest_framework import status

from restaurant.models.restaurant import Restaurant

class RestaurantPutTest(APITestCase):

    def test_restaurant_put_success(self):
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
        identification = Restaurant.objects.get().id
        data = {
            "name": "test2",
            "plan": 1,
            "location": "test2",
            "phone": "test2",
            "description": "test2"
        }
        response = self.client.put(f'/api/v1/restaurant/put/{identification}/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Restaurant.objects.count(), 1)
        self.assertEqual(Restaurant.objects.get().name, 'test2')


    def test_restaurant_put_not_found(self):
        data = {
            "name": "test",
            "plan": 1,
            "location": "test",
            "phone": "test",
            "description": "test"
        }
        response = self.client.put('/api/v1/restaurant/put/1/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


    def test_restaurant_put_bad_request(self):
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
        identification = Restaurant.objects.get().id
        data = {
            "name": "test2",
            "plan": 1,
            "location": "test2",
            "phone": "test2",
            "description": "test2"
        }
        response = self.client.put(f'/api/v1/restaurant/put/{identification}/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Restaurant.objects.count(), 1)
        self.assertEqual(Restaurant.objects.get().name, 'test2')
        data = {
            "plan": 1,
            "description": "test3"
        }
        response = self.client.put(f'/api/v1/restaurant/put/{identification}/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Restaurant.objects.count(), 1)
        self.assertEqual(Restaurant.objects.get().name, 'test2')

    def test_restaurant_put_change_plan(self):
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
        identification = Restaurant.objects.get().id

        data = {
            "plan": 2
        }

        response = self.client.put(f'/api/v1/restaurant/change-plan/{identification}/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Restaurant.objects.count(), 1)
        self.assertEqual(Restaurant.objects.get().plan, 2)

    def test_restaurant_put_change_plan_bad_request(self):
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
        identification = Restaurant.objects.get().id

        data = {}

        response = self.client.put(f'/api/v1/restaurant/change-plan/{identification}/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Restaurant.objects.count(), 1)
        self.assertEqual(Restaurant.objects.get().plan, 1)

    def test_restaurant_put_change_plan_not_found(self):
        data = {}

        response = self.client.put(f'/api/v1/restaurant/change-plan/1/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)