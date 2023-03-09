from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from dememoriam_api.apps.users.serializers import UserProfilePublicSerializer
from dememoriam_api.apps.nfts.models import PostNft
from django.contrib.auth import get_user_model

UserModel = get_user_model()


class PostNftOwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('id', 'username', 'avatar', 'first_name', "last_name",)


class PostNftSerializer(serializers.ModelSerializer):
    owner = PostNftOwnerSerializer(read_only=True)

    class Meta:
        model = PostNft
        fields = ('id', 'owner', 'status', 'access', 'creator', 'collection', 'description', "image", 'video', 
                  "internal_id", "contract", "chain", "standart", "token_id", "date_created", "date_updated")
        read_only_fields = ('owner', 'date_created', 'date_updated', 'image', 'video', 'token_id', "contract", "chain", "standart")

    def validate_status(self, status):
        if status not in [PostNft.Status.EDITING, PostNft.Status.REQUESTED]:
            raise ValidationError("Invalid post status")
        return status
    
    def validate(self, data):
        if self.instance and  self.instance.status not in [PostNft.Status.EDITING, PostNft.Status.REQUESTED]:
            raise ValidationError("Can't edit post after minting")
        return data


class PostNftImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostNft
        extra_kwargs = {'image': {'required': True}}
        fields = ('image', )


class PostNftVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostNft
        extra_kwargs = {'video': {'required': True}}
        fields = ('video', )