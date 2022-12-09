from rest_framework.test import APITestCase
from rest_framework import status

from restaurant.models.restaurant import Restaurant

class RestaurantGetTest(APITestCase):

    def test_restaurant_get_zero(self):
        response = self.client.get(f'/api/v1/restaurant/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)
    
    def test_restaurant_get_all(self):
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
        response = self.client.get('/api/v1/restaurant/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_restaurant_get_all_multiple(self):
        data = {
            "name": "test",
            "plan": 1,
            "location": "test",
            "phone": "test",
            "description": "test"
        }
        i = 0
        number_of_restaurants = 10
        for i in range(number_of_restaurants):
            data['name'] = 'test' + str(i)
            response = self.client.post('/api/v1/restaurant/create/', data, format='json')
            self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        response = self.client.get('/api/v1/restaurant/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), number_of_restaurants)

    def test_restaurant_get_one(self):
        data = {
            "name": "test",
            "plan": 1,
            "location": "test",
            "phone": "test",
            "description": "test"
        }
        response = self.client.post('/api/v1/restaurant/create/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        identifier = response.data['id']
        response = self.client.get(f'/api/v1/restaurant/{identifier}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        restaurant = response.data

        self.assertEqual(restaurant['name'], 'test')
        self.assertEqual(restaurant['plan'], 1)
        self.assertEqual(restaurant['location'], 'test')
        self.assertEqual(restaurant['phone'], 'test')
        self.assertEqual(restaurant['description'], 'test')
    
    def test_restaurant_get_one_not_found(self):
        response = self.client.get('/api/v1/restaurant/1/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)