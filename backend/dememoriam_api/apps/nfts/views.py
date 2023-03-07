from django.shortcuts import get_object_or_404
from rest_framework import mixins, viewsets
from rest_framework.exceptions import ValidationError
from rest_framework.generics import ListAPIView, UpdateAPIView
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated
from dememoriam_api.apps.nfts.models import PostNft
from dememoriam_api.apps.nfts.serializers import PostNftImageSerializer, PostNftSerializer, PostNftVideoSerializer
from dememoriam_api.permissions import IsOwnerOrAuthenticatedReadOnly


class CRUViewSet(mixins.CreateModelMixin,
                 mixins.ListModelMixin,
                 mixins.RetrieveModelMixin,
                 mixins.UpdateModelMixin,
                 viewsets.GenericViewSet):
    pass

class PostNftViewSet(CRUViewSet):
    permission_classes = (IsOwnerOrAuthenticatedReadOnly,)
    serializer_class = PostNftSerializer
    queryset = PostNft.objects.all()

    def get_queryset(self):
        return PostNft.objects.filter(owner=self.request.user)

    def create(self, request, *args, **kwargs):
        if PostNft.objects.filter(owner=self.request.user.id).count() >= 5:
            raise ValidationError("Max amount of posts created")
        return super().create(request, *args, **kwargs)
        
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class PostNftImageView(UpdateAPIView):
    permission_classes = (IsOwnerOrAuthenticatedReadOnly,)
    serializer_class = PostNftImageSerializer
    parser_classes = (MultiPartParser, FormParser)
    
    def get_queryset(self):
        return PostNft.objects.filter(owner=self.request.user)


class PostNftVideoView(UpdateAPIView):
    permission_classes = (IsOwnerOrAuthenticatedReadOnly,)
    serializer_class = PostNftVideoSerializer
    parser_classes = (MultiPartParser, FormParser)

    def get_queryset(self):
        return PostNft.objects.filter(owner=self.request.user)


class PostNftPublicView(ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = PostNftSerializer

    def get_queryset(self):
        return PostNft.objects.filter(access=PostNft.Access.PUBLIC).order_by("date_created")