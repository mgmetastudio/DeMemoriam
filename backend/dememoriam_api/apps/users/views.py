from allauth.account.models import EmailAddress
from dj_rest_auth.registration.views import ResendEmailVerificationView as OriginalResendEmailVerificationView
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.generics import RetrieveUpdateAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from dememoriam_api.apps.users.serializers import UserProfilePublicSerializer, UserProfileSerializer, UserAvatarSerializer
from django.http import Http404
from rest_framework.permissions import AllowAny
from dememoriam_api.apps.users.models import User

class UserProfileView(RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserProfileSerializer    
    
    def get_object(self):
        return self.request.user
    

class UserProfilePublicView(RetrieveUpdateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserProfilePublicSerializer

    def get_object(self):
        user = User.objects.filter(username__iexact=self.kwargs['username']).first()
        if not user:
            raise Http404
        return user


class UserAvatarView(UpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserAvatarSerializer
    parser_classes = (MultiPartParser, FormParser)

    def get_object(self):
        return self.request.user


class ResendEmailVerificationView(OriginalResendEmailVerificationView):
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = EmailAddress.objects.filter(**serializer.validated_data).first()
        if email and not email.verified:
            email.send_confirmation(request)
            return Response({'detail': 'Verification email sent'}, status=status.HTTP_200_OK)
        elif email and email.verified:
            return Response({'detail': 'Email already verified'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'detail': 'Email not found try registering'}, status=status.HTTP_400_BAD_REQUEST)
