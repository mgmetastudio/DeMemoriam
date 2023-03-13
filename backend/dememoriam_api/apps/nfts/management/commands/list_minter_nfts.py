from django.core.management.base import BaseCommand
import asyncio
from dememoriam_api.apps.nfts.flow import get_nft, get_nfts


class Command(BaseCommand):
    help = 'Lists minter nft on Flow blockchain'    
    
    def add_arguments(self, parser):
        parser.add_argument('id', type=int, nargs='?')

    def handle(self, *args, **options):
        if options["id"]:
            asyncio.run(get_nft(options["id"]))
        else:
            asyncio.run(get_nfts())

            