from Crypto.PublicKey import RSA
from Crypto.Hash import SHA3_256
from Crypto.Cipher import PKCS1_OAEP
from Crypto.Signature import PKCS1_v1_5
from Crypto.PublicKey import DSA
import binascii

from imgTrng import TRNG

async def generate_keypair(bits=2048):
    #print(len(Random.get_random_bytes(bits*2)))
    #print(len(imgTrng.get_random_bytes_from_IMG_TRNG(bits*2)))
    # print(Random.new().read)
    # random_generator = Random.new().read
    rng = TRNG()
    rsa_key = RSA.generate(bits,  randfunc=rng.get_random_bytes_from_IMG_TRNG, e=65537)
    #print(repr(rsa_key))
    #print(repr(rsa_key.publickey()))
    return rsa_key


def debug_generate_keypair(bits=2048):
    #print(len(Random.get_random_bytes(bits*2)))
    rng = TRNG()
    print(len(rng.get_random_bytes_from_IMG_TRNG(bits*2)))
    # print(Random.new().read)
    # random_generator = Random.new().read
    rsa_key = RSA.generate(bits,  randfunc=rng.get_random_bytes_from_IMG_TRNG, e=65537)
    print (type(rsa_key.publickey().exportKey()))
    #print(repr(rsa_key))
    #print(repr(rsa_key.publickey()))
    return rsa_key

async def get_signature(file_content):
    key = await generate_keypair(bits=2048)
    h_obj = SHA3_256.new(file_content)
    signer = PKCS1_v1_5.new(key)
    signature =  signer.sign(h_obj)
    return {"signature": binascii.hexlify(signature).decode('ascii'),
            "public_key": key.publickey().exportKey()}

if __name__ == "__main__":
    debug_generate_keypair()