from django.db import models
from django_resized import ResizedImageField


class PostNft(models.Model):
    class Status(models.TextChoices):
        EDITING = 'EDITING'
        REQUESTED = 'REQUESTED'
        PROCESSING = 'PROCESSING'
        MINTED = 'MINTED'
        TRANSFERED = 'TRANSFERED'

    class Access(models.TextChoices):
        PUBLIC = 'PUBLIC'
        PRIVATE = 'PRIVATE'

    owner = models.ForeignKey("users.User", on_delete=models.PROTECT, related_name="posts")
    status = models.CharField(max_length=32, null=False, blank=True, choices=Status.choices, default=Status.EDITING)
    access = models.CharField(max_length=32, null=False, blank=True, choices=Access.choices, default=Access.PUBLIC)
    creator = models.CharField(max_length=164, null=True, blank=True)
    collection = models.CharField(max_length=64, null=True, blank=True)
    description = models.CharField(max_length=512,null=True, blank=True)
    image = ResizedImageField(size=[1000, 1000], crop=['middle', 'center'], upload_to='images', blank=True, null=True)
    video = models.FileField(upload_to='videos', blank=True, null=True)

    internal_id = models.CharField(max_length=32, blank=True, null=True)
    contract = models.CharField(max_length=64, null=True, blank=True)
    chain = models.CharField(max_length=64, null=True, blank=True, default="FLOW")
    standart = models.CharField(max_length=64, null=True, blank=True, default="FLOW_NFT")
    token_id = models.PositiveIntegerField(null=True, blank=True)
    
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    

