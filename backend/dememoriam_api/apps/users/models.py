from django.contrib.auth.validators import UnicodeUsernameValidator
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models import Sum
from django_countries.fields import CountryField
from django_resized import ResizedImageField
from rest_framework import serializers
from django.utils.translation import gettext_lazy as _
from rest_framework.fields import RegexValidator


class User(AbstractUser):
    username_validator = UnicodeUsernameValidator()
    username = models.CharField(
        _('username'),
        max_length=16,
        unique=True,
        help_text=_('Required. 16 characters or fewer. Letters, digits and @/./+/-/_ only.'),
        validators=[username_validator],
        error_messages={
            'unique': _("A user with that username already exists."),
        },
    )

    flow_address = models.CharField(max_length=64, null=True, blank=True)
    avatar = ResizedImageField(size=[500, 500], crop=['middle', 'center'], upload_to='avatars', blank=True, null=True)
    about_me = models.TextField(null=True, blank=True)
    country = CountryField(blank=True)
    birth_date = models.DateField(null=True, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=64, null=True, blank=True)
    phone_number = models.CharField(max_length=64, null=True, blank=True, validators=[RegexValidator(regex="^[0-9]*$", message="Enter a phone number. Only numbers allowed")])

    def __str__(self):
        return self.email


