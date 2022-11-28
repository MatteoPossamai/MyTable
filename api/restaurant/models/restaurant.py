from django.db import models

class Restaurant(models.Model):
    name = models.CharField(max_length=100)
    plan = models.IntegerField(default=0)
    location = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
