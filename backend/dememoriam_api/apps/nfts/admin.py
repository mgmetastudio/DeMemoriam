from django.contrib import admin
from dememoriam_api.apps.nfts.models import PostNft


@admin.register(PostNft)
class PostNftAdmin(admin.ModelAdmin):
    list_display = ['owner', 'creator', 'status', 'access', 'image', 'video', 'description', 'token_id']
    date_hierarchy = 'date_created'
    exclude = ["date_created", "date_updated", "contract", "standart", "chain"]