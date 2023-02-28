from django_countries.serializers import CountryFieldMixin
from rest_framework import serializers
from dememoriam_api import settings
from django.contrib.auth import get_user_model
from dj_rest_auth.serializers import LoginSerializer as DefaultLoginSerializer

UserModel = get_user_model()


class UserProfileSerializer(CountryFieldMixin, serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('flow_address', 'username', 'email', 'avatar',
                  'about_me', 'country', "birth_date", 'first_name', "last_name")
        extra_kwargs = {'username': {'required': False}}
        read_only_fields = ('email', 'avatar',)

    @staticmethod
    def validate_username(username):
        if 'allauth.account' not in settings.INSTALLED_APPS:
            return username

        from allauth.account.adapter import get_adapter
        username = get_adapter().clean_username(username)
        return username


class UserProfilePublicSerializer(CountryFieldMixin, serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('username', 'email', 'avatar',
                  'about_me', 'country', "birth_date", 'first_name', "last_name")
        

class UserAvatarSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        extra_kwargs = {'avatar': {'required': True}}
        fields = ('avatar', )


class CustomLoginSerializer(DefaultLoginSerializer):
    def get_auth_user(self, username, email, password):
        user = super().get_auth_user(username, email, password)
        return user

