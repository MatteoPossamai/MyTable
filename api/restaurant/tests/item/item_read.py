from rest_framework.test import APITestCase
from rest_framework import status

from restaurant.models.category import Category
from restaurant.models.item import Item
from restaurant.models.restaurant import Restaurant

class ItemReadSingleTest(APITestCase):

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

    def test_restaurant_read(self):
        response = self.client.get(f'/api/v1/item/{self.item_id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], self.item_id)
        self.assertEqual(response.data['name'], 'test')
        self.assertEqual(response.data['description'], 'test')
        self.assertEqual(response.data['price'], '1.00')
        self.assertEqual(response.data['iconId'], 1)
        self.assertEqual(response.data['isActive'], True)
        self.assertEqual(response.data['number'], 1)
        self.assertEqual(response.data['facts'], {})

    def test_restaurant_read_no_id(self):
        response = self.client.get('/api/v1/item/0/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_restaurant_read_wrong_id(self):
        response = self.client.get('/api/v1/item/read/999/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_restaurant_read_multiple_single(self):
        response = self.client.get('/api/v1/item/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)


class ItemReadItemMultiple(APITestCase):

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
        self.num = 10

        for i in range(self.num):
            self.item = Item.objects.create(
                restaurant=self.restaurant,
                category=self.category,
                name="test" + str(i),
                description="test",
                price=1.00,
                iconId=1,
                isActive=True,
                number=1,
                facts={}
            )

    def test_restaurant_read(self):
        response = self.client.get('/api/v1/item/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]['name'], 'test0')
        self.assertEqual(response.data[0]['description'], 'test')
        self.assertEqual(response.data[0]['price'], '1.00')
        self.assertEqual(response.data[0]['iconId'], 1)
        self.assertEqual(response.data[0]['isActive'], True)
        self.assertEqual(response.data[0]['number'], 1)
        self.assertEqual(response.data[0]['facts'], {})
        self.assertEqual(len(response.data), self.num)


class ItemReadItemActive(APITestCase):

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
        self.num = 10

        for i in range(self.num):
            self.item = Item.objects.create(
                restaurant=self.restaurant,
                category=self.category,
                name="test" + str(i),
                description="test",
                price=1.00,
                iconId=1,
                isActive=True if i % 2 == 0 else False,
                number=1,
                facts={}
            )

    def test_restaurant_read(self):
        response = self.client.get('/api/v1/item/active/')
        self.assertEqual(len(response.data), self.num//2)