from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

# Models 
from accounts.models import CustomUser
from accounts.models import RestaurantUser

# Forms
from accounts.forms import CustomUserCreationForm, CustomUserChangeForm

class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = ['email', 'is_superuser']

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(RestaurantUser)
