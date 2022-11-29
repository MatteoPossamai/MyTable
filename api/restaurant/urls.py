from django.urls import path, include

from .views import RestaurantCreateView, RestaurantGetAllView, RestaurantGetView, \
    RestaurantPutView, RestaurantDeleteView, ItemCreateView, ItemGetAllView, ItemGetView, \
    ItemPutView, ItemDeleteView, CategoryCreateView, CategoryGetAllView, CategoryGetView, \
    CategoryPutView, CategoryDeleteView

current_version = 'v1'

# Category
category_urlpatterns = [
    # Create
    path('create/', CategoryCreateView.as_view(), name='category_create'),
    # Read
    path('', CategoryGetAllView.as_view(), name='category_get_all'),
    path('get/<int:pk>/', CategoryGetView.as_view(), name='category_get'),
    # Update
    path('put/<int:pk>/', CategoryPutView.as_view(), name='category_put'),
    # Delete
    path('delete/<int:pk>/', CategoryDeleteView.as_view(), name='category_delete'),
]

# Item
item_urlpatterns = [
    # Create
    path('create/', ItemCreateView.as_view(), name='item-create'),
    # Read
    path('', ItemGetAllView.as_view(), name='item-get-all'),
    path('get/<int:pk>/', ItemGetView.as_view(), name='item-get'),
    # Update
    path('put/<int:pk>/', ItemPutView.as_view(), name='item-put'),
    # Delete
    path('delete/<int:pk>/', ItemDeleteView.as_view(), name='item-delete'),
]

# Restaurant
restaurant_urlpatterns = [
    # Create
    path('create/', RestaurantCreateView.as_view(), name='restaurant-create'),
    # Read
    path('', RestaurantGetAllView.as_view(), name='restaurant-get-`all'),
    path('<int:pk>/', RestaurantGetView.as_view(), name='restaurant-detail'),
    # Update
    path('put/<int:pk>/', RestaurantPutView.as_view(), name='restaurant-put'),
    # Delete
    path('delete/<int:pk>/', RestaurantDeleteView.as_view(), name='restaurant-delete'),
]

# ALL URLS
urlpatterns = [
    path(current_version + '/category/', include(category_urlpatterns)),
    path(current_version +'/item/', include(item_urlpatterns)),
    path(current_version +'/restaurant/', include(restaurant_urlpatterns)),
]