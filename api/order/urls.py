from django.urls import path, include

from .views import OrderCreateView, OrderGetAllView, OrderGetView, OrderPutView, \
    OrderDeleteView, TakesCreateView, TakesGetAllView, TakesGetView, TakesPutView, \
    TakesDeleteView

current_version = 'v1'

# Order
order_urlpatterns = [
    # Create
    path('create/', OrderCreateView.as_view(), name='order_create'),
    # Read
    path('', OrderGetAllView.as_view(), name='order_get_all'),
    path('get/<int:pk>/', OrderGetView.as_view(), name='order_get'),
    # Update
    path('put/<int:pk>/', OrderPutView.as_view(), name='order_put'),
    # Delete
    path('delete/<int:pk>/', OrderDeleteView.as_view(), name='order_delete'),
]

# Takes
takes_urlpatterns = [
    # Create
    path('create/', TakesCreateView.as_view(), name='takes_create'),
    # Read
    path('', TakesGetAllView.as_view(), name='takes_get_all'),
    path('get/<int:pk>/', TakesGetView.as_view(), name='takes_get'),
    # Update
    path('put/<int:pk>/', TakesPutView.as_view(), name='takes_put'),
    # Delete
    path('delete/<int:pk>/', TakesDeleteView.as_view(), name='takes_delete'),
]

# ALL URLS
urlpatterns = [
    path(current_version + '/order/', include(order_urlpatterns)),
    path(current_version + '/takes/', include(takes_urlpatterns)),
]
