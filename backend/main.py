from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from RSAkeyPairs import generate_keypair


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
