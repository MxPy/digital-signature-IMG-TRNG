import numpy as np
import io
import hashlib
from Crypto import Random

def get_random_bytes_from_IMG_TRNG(size: int, /) -> bytes:
    print(size)
    path = 'kitkuthechild.jpg'

    with open(path, 'rb') as f:
        image_data = f.read()
        
    bit_stream = ''.join(format(byte, '08b') for byte in image_data)
    bit_array = np.array([int(bit) for bit in bit_stream])
    flattened_bit_array = bit_array.flatten()
    #print(len(flattened_bit_array))

    # PHASE 2
    for i in range(0, len(flattened_bit_array)):
            if i % 200 == 0:
                flattened_bit_array[i] = 1 if flattened_bit_array[i] == 0 else 0

    byteStream = b''

    for i in range(1920, len(flattened_bit_array), 1920):
        block = flattened_bit_array[i -18750: i]
        md5_hash = hashlib.md5()
        md5_hash.update(block)
        hash_hex = md5_hash.hexdigest()
        byteStream+= bytes.fromhex(hash_hex)
        if len (byteStream) >= size:
            break
        
        
    byteStream = byteStream[:size]
    # data = np.array(bytearray(byteStream))
    print(len(byteStream))
    return byteStream

def test(size: int, /) -> bytes:
    print(size)
    byts = Random.get_random_bytes(size)
    print (len(byts))
    return byts

