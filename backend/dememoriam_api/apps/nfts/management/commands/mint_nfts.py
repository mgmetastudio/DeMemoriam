from django.core.management.base import BaseCommand
import asyncio
from flow_py_sdk import flow_client, ProposalKey, Tx, cadence
from dememoriam_api.apps.nfts.flow_config import Config
from dememoriam_api.settings import FLOW_MINTER_ADDRESS, FLOW_MINTER_HASH_ALGO, FLOW_MINTER_SIGN_ALGO, FLOW_MINTER_PRIVATE_KEY

async def mint_nft(name, description, image_url):
    config = Config(FLOW_MINTER_ADDRESS, FLOW_MINTER_HASH_ALGO, FLOW_MINTER_SIGN_ALGO, FLOW_MINTER_PRIVATE_KEY)

    async with flow_client(host=config.access_node_host, port=config.access_node_port) as client:
        latest_block = await client.get_latest_block()
        proposer = await client.get_account_at_latest_block(address=config.service_account_address.bytes)
      
        code_private = """
                    import DememoriamNFT from 0x978d3ebbe5c33999
                    import NonFungibleToken from 0x631e88ae7f1d7c20
                    import MetadataViews from 0x631e88ae7f1d7c20

                    transaction(name: String, description: String, url: String){
                        let recipientCollection: &DememoriamNFT.Collection{NonFungibleToken.CollectionPublic}
                        let minterRef: &DememoriamNFT.NFTMinter

                        prepare(signer: AuthAccount){
                            if signer.borrow<&DememoriamNFT.Collection>(from: DememoriamNFT.CollectionStoragePath) == nil {
                                signer.save(<- DememoriamNFT.createEmptyCollection(), to: DememoriamNFT.CollectionStoragePath)
                                signer.link<&DememoriamNFT.Collection{NonFungibleToken.CollectionPublic, MetadataViews.ResolverCollection}>(DememoriamNFT.CollectionPublicPath, target: DememoriamNFT.CollectionStoragePath)
                            }

                            self.minterRef = signer.borrow<&DememoriamNFT.NFTMinter>(from: DememoriamNFT.MinterStoragePath)!

                            self.recipientCollection = signer.getCapability(DememoriamNFT.CollectionPublicPath).borrow<&DememoriamNFT.Collection{NonFungibleToken.CollectionPublic}>()!
                        }
                        execute{
                            self.minterRef.mintNFT(recipient: self.recipientCollection, name: name, description: description, thumbnail: url, royalties: [])
                        }
                    }
                """    

        arg1 = cadence.String(name)
        arg2 = cadence.String(description)
        arg3 = cadence.String(image_url)
        transaction = (
            Tx(
                code=code_private,
                reference_block_id=latest_block.id,
                payer=config.service_account_address,
                proposal_key=ProposalKey(
                    key_address=config.service_account_address,
                    key_id=0,
                    key_sequence_number=proposer.keys[0].sequence_number,
                ),
            )
            .add_authorizers(config.service_account_address)
            .add_arguments(arg1)
            .add_arguments(arg2)
            .add_arguments(arg3)
            .with_envelope_signature(
                config.service_account_address,
                0,
                config.service_account_signer,
            )
        )

        await client.execute_transaction(transaction)
    

class Command(BaseCommand):
    help = 'Mints nft on Flow blockchain'

    def handle(self, *args, **options):
        # asyncio.run(mint_nft(name, description, image_url))
        pass


            