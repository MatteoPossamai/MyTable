from django.urls import path, include

from .views import CustomUserCreateView, CustomUserGetAllView, CustomUserGetView, \
    CustomUserPutView, CustomUserDeleteView, RestaurantUserCreateView, \
    RestaurantUserGetAllView, RestaurantUserGetView, RestaurantUserPutView, \
    RestaurantUserDeleteView


current_version = 'v1'

# Custom User
custom_user_urlpatterns = [
    # Create
    path('create/', CustomUserCreateView.as_view(), name='custom_user_create'),
    # Read
    path('', CustomUserGetAllView.as_view(), name='custom_user_get_all'),
    path('get/<int:pk>/', CustomUserGetView.as_view(), name='custom_user_get'),
    # Update
    path('put/<int:pk>/', CustomUserPutView.as_view(), name='custom_user_put'),
    # Delete
    path('delete/<int:pk>/', CustomUserDeleteView.as_view(), name='custom_user_delete'),
]

# Restaurant User
restaurant_user_urlpatterns = [
    # Create
    path('create/', RestaurantUserCreateView.as_view(), name='restaurant_user_create'),
    # Read
    path('', RestaurantUserGetAllView.as_view(), name='restaurant_user_get_all'),
    path('get/<int:pk>/', RestaurantUserGetView.as_view(), name='restaurant_user_get'),
    # Update
    path('put/<int:pk>/', RestaurantUserPutView.as_view(), name='restaurant_user_put'),
    # Delete
    path('delete/<int:pk>/', RestaurantUserDeleteView.as_view(), name='restaurant_user_delete'),
]

# ALL URLS
urlpatterns = [
    path(current_version + '/custom_user/', include(custom_user_urlpatterns)),
    path(current_version + '/restaurant_user/', include(restaurant_user_urlpatterns)),
]