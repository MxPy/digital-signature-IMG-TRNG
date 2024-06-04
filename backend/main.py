from fastapi import FastAPI, UploadFile
from fastapi.responses import HTMLResponse, Response, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from RSAkeyPairs import generate_keypair, get_signature, verify_signature
import base64


app = FastAPI()


origins = ["http://localhost:3000"
            ]
app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/getKeys")
async def read_root():
	key = await generate_keypair()
	return {"PublicKey": key.publickey().exportKey(),
		 	"PrivateKey": key.exportKey()}

@app.post("/verifyFile")
async def veify(file: UploadFile, signature: UploadFile, key: UploadFile):
    data = await file.read()
    sig = await signature.read()
    k = await key.read()
    if await verify_signature(data, sig, k):
        return {"verified": True}
    else:
        return {"verified": False}


@app.post("/uploadFile")
async def upload(file: UploadFile):
    data = await file.read()
    sign = await get_signature(data)
    
    # Zakodowanie danych pliku w base64
    encoded_data = base64.b64encode(sign["signature"]).decode('utf-8')
    encoded_key = base64.b64encode(sign["public_key"])
    return {
        "file": {
            "filename": "YourFileSignature.sig",
            "content_type": "text/plain",
            "data": encoded_data
        },
        "file2": {
            "filename": "YourPublicKey.key",
            "content_type": "text/plain",
            "data": encoded_key
        },
    }
    
