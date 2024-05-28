from Crypto.PublicKey import RSA

import imgTrng

def generate_keypair(bits=2048):
    #print(len(Random.get_random_bytes(bits*2)))
    print(len(imgTrng.get_random_bytes_from_IMG_TRNG(bits*2)))
    # print(Random.new().read)
    # random_generator = Random.new().read
    rsa_key = RSA.generate(bits,  randfunc=imgTrng.get_random_bytes_from_IMG_TRNG, e=65537)
    print(repr(rsa_key))
    print(repr(rsa_key.publickey()))

generate_keypair()