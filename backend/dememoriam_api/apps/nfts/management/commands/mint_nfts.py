import json
import logging
import traceback
from django.core.management.base import BaseCommand
import asyncio
from dememoriam_api.apps.nfts.flow import mint_nft
from dememoriam_api.apps.nfts.models import PostNft
from dememoriam_api.settings import MEDIA_URL

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = 'Mints nft on Flow blockchain'

    def add_media_url(self, url):
        return MEDIA_URL + url

    def handle(self, *args, **options):
        for post in PostNft.objects.filter(status=PostNft.Status.REQUESTED):

            post.status = PostNft.Status.PROCESSING
            post.save()

            try:
                result = asyncio.run(mint_nft("Dememoriam AI Life Story", post.description, self.add_media_url(post.image.name), self.add_media_url(post.video.name)))
            except Exception as e:
                logger.error("Failed to mint NFT", traceback.format_exc())
                continue
            else:
                post.status = PostNft.Status.MINTED

            try:
                token_id = None
                for event in result.events:
                    # if is deposit event
                    if ".Deposit" in event.type:
                        payload = json.loads(event.payload)
                        for field in payload["value"]["fields"]:
                            if field["name"] == "id":
                                token_id = int(field["value"]["value"])

            except Exception as e:
                logger.error("Failed find minted NFT id", traceback.format_exc())
                continue
            else:
                post.token_id = token_id

            post.save()



            
                
            
        


            