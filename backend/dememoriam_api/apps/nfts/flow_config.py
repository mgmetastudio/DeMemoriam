import logging
from flow_py_sdk.cadence import Address
from flow_py_sdk.signer import InMemorySigner, HashAlgo, SignAlgo

log = logging.getLogger(__name__)


class Config(object):
    def __init__(self, address, hash_algo, sign_algo, private_key) -> None:
        super().__init__()

        self.access_node_host: str = "access.devnet.nodes.onflow.org"
        self.access_node_port: int = 9000

        self.service_account_key_id: int = 0
        # noinspection PyBroadException
        try:
            self.service_account_address = Address.from_hex(address)
            self.service_account_signer = InMemorySigner(
                hash_algo=HashAlgo.from_string(hash_algo),
                sign_algo=SignAlgo.from_string(sign_algo),
                private_key_hex=private_key,
            )
        except Exception:
            log.warning(
                f"Cannot create flow config using default settings",
                exc_info=True,
                stack_info=True,
            )
