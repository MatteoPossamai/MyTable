from rest_framework.test import APITestCase
from rest_framework import status

from restaurant.models.restaurant import Restaurant

class RestaurantDeleteTest(APITestCase):

    def test_restaurant_delete(self):
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
        response = self.client.delete(f'/api/v1/restaurant/delete/{identification}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_restaurant_delete_not_found(self):
        response = self.client.delete('/api/v1/restaurant/delete/1/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)