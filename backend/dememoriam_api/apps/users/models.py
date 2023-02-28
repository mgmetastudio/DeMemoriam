from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models import Sum
from django_countries.fields import CountryField
from django_resized import ResizedImageField
from rest_framework import serializers


class User(AbstractUser):
    flow_address = models.CharField(max_length=64, null=True, blank=True)
    avatar = ResizedImageField(size=[500, 500], crop=['middle', 'center'], upload_to='avatars', blank=True, null=True)
    about_me = models.TextField(null=True, blank=True)
    country = CountryField(blank=True)
    birth_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.email


