from Crypto.PublicKey import RSA

from imgTrng import TRNG

async def generate_keypair(bits=2048):
    #print(len(Random.get_random_bytes(bits*2)))
    print(len(imgTrng.get_random_bytes_from_IMG_TRNG(bits*2)))
    # print(Random.new().read)
    # random_generator = Random.new().read
    rsa_key = RSA.generate(bits,  randfunc=imgTrng.test, e=65537)
    print(repr(rsa_key))
    print(repr(rsa_key.publickey()))
    return rsa_key


def debug_generate_keypair(bits=2048):
    #print(len(Random.get_random_bytes(bits*2)))
    rng = TRNG()
    print(len(rng.get_random_bytes_from_IMG_TRNG(bits*2)))
    # print(Random.new().read)
    # random_generator = Random.new().read
    rsa_key = RSA.generate(bits,  randfunc=rng.get_random_bytes_from_IMG_TRNG, e=65537)
    #print(repr(rsa_key))
    #print(repr(rsa_key.publickey()))
    return rsa_key

if __name__ == "__main__":
    debug_generate_keypair()