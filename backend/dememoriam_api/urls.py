"""dememoriam_api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from rest_framework import routers
from dememoriam_api.apps.nfts.views import PostNftImageView, PostNftPublicView, PostNftVideoView, PostNftViewSet
from dememoriam_api import settings
from dememoriam_api.apps.users.views import ResendEmailVerificationView, UserAvatarView, UserProfilePublicView, UserProfileView

router = routers.SimpleRouter()
router.register('posts', PostNftViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('rest-auth/', include('dj_rest_auth.urls')),
    path('rest-auth/registration/', include('dj_rest_auth.registration.urls')),

    path('rest-auth/registration/resend-email/', ResendEmailVerificationView.as_view(), name="rest_resend_email"),
    path('password-reset/confirm/<uidb64>/<token>/', TemplateView.as_view(), name='password_reset_confirm'),
    path('account-confirm-email/<key>/', TemplateView.as_view(), name='account_confirm_email'),

    path('user/profile/', UserProfileView.as_view()),  
    path('user/profile/avatar/', UserAvatarView.as_view()),
    path('user/profile/<username>/', UserProfilePublicView.as_view()),  

    path('posts/<pk>/image/', PostNftImageView.as_view()),
    path('posts/<pk>/video/', PostNftVideoView.as_view()),

    path('feed/', PostNftPublicView.as_view()),

    path('', include(router.urls)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)