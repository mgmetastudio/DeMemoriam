from django.core.management.base import BaseCommand
import asyncio
from flow_py_sdk import flow_client, cadence
from dememoriam_api.apps.nfts.flow_config import Config
from flow_py_sdk import flow_client, cadence, Script
from dememoriam_api.settings import FLOW_MINTER_ADDRESS, FLOW_MINTER_HASH_ALGO, FLOW_MINTER_SIGN_ALGO, FLOW_MINTER_PRIVATE_KEY


async def list_nfts():    
    config = Config(FLOW_MINTER_ADDRESS, FLOW_MINTER_HASH_ALGO, FLOW_MINTER_SIGN_ALGO, FLOW_MINTER_PRIVATE_KEY)    
       
    code_private = """
                    import DememoriamNFT from 0x978d3ebbe5c33999
                    import NonFungibleToken from 0x631e88ae7f1d7c20
                    import MetadataViews from 0x631e88ae7f1d7c20

                    pub fun main(address: Address): {
                        let collection = getAccount(address).getCapability(DememoriamNFT.CollectionPublicPath)
                                            .borrow<&{MetadataViews.ResolverCollection}>()
                                            ?? panic("Could not borrow a reference to the nft collection")

                        let ids = collection.getIDs()
                    
                        let answer: [DememoriamNFT.DememoriamNFTData] = []
                        
                        for id in ids {
                            let nft = collection.borrowExampleNFT(id: id) ?? panic("Could not borrow a reference to the NFT")

                            if let view = nft.resolveView(Type<MetadataViews.Display>()) {
                                let display = view as! MetadataViews.Display

                                log(display.name)
                                log(display.description)
                                log(display.thumbnail)
                            }

                            let owner: Address = nft.owner!.address!
                            let nftType = nft.getType()
                        }
                    }
                """

    script = Script(
        code=code_private,
        arguments=[config.service_account_address]
    )

    async with flow_client(host=config.access_node_host, port=config.access_node_port) as client:
        complex_script = await client.execute_script(
            script=script
        )

        if not complex_script:
            raise Exception("Script execution failed")

        script_result: cadence.Value = complex_script

        print(script_result)


class Command(BaseCommand):
    help = 'Lists minter nft on Flow blockchain'

    def handle(self, *args, **options):
        asyncio.run(list_nfts())


            