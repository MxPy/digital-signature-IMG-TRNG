from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from RSAkeyPairs import generate_keypair, get_signature


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

@app.post("/uploadFile")
async def upload(file: UploadFile):
	data = await file.read()
	sign = await get_signature(data)
	return sign
