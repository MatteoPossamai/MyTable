from rest_framework.test import APITestCase
from rest_framework import status

from restaurant.models.category import Category
from restaurant.models.restaurant import Restaurant

class CategoryReadSigleTest(APITestCase):
    
    def setUp(self):
        self.restaurant = Restaurant.objects.create(
            name="test",
            plan=1,
            location="test",
            phone="test",
        )
        self.identificator = self.restaurant.id

    def test_restaurant_get_single(self):
        data = {
            "name": "test",
            "number": 1,
            "iconId": 1,
            "isActive": True,
            "restaurant": self.identificator,
            "description": "test"
        }
        response = self.client.post('/api/v1/category/create/', data, format='json')
        identifier = response.data['id']
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Category.objects.count(), 1)
        self.assertEqual(Category.objects.get(id=identifier).name, 'test')

        response = self.client.get(f'/api/v1/category/{identifier}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'test')

    def test_restaurant_get_single_not_found(self):
        response = self.client.get('/api/v1/category/1/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_restaurant_get_single_invalid_id(self):
        response = self.client.get('/api/v1/category/invalid_id/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_restaurant_get_all_zero(self):
        response = self.client.get('/api/v1/category/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

class CategoryReadAllTest(APITestCase):

    def setUp(self):
        self.restaurant = Restaurant.objects.create(
            name="test",
            plan=1,
            location="test",
            phone="test",
        )
        for i in range(10):
            Category.objects.create(
                name="test",
                number=i,
                iconId=1,
                isActive=True,
                restaurant=self.restaurant,
                description="test"
            )

    def test_restaurant_get_all(self):
        response = self.client.get('/api/v1/category/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 10)


class CategoryReadAllActive(APITestCase):

    def setUp(self):
        self.restaurant = Restaurant.objects.create(
            name="test",
            plan=1,
            location="test",
            phone="test",
        )
        self.identificator = self.restaurant.id
        for i in range(10):
            Category.objects.create(
                name="test",
                number=i,
                iconId=1,
                isActive=True if i % 2 == 0 else False,
                restaurant=self.restaurant,
                description="test"
            )

    def test_restaurant_get_all_active(self):
        response = self.client.get('/api/v1/category/active/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 5)
    
    def test_restaurant_get_all_active_zero(self):
        Category.objects.all().update(isActive=False)
        response = self.client.get('/api/v1/category/active/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

    