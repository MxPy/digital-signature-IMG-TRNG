from fastapi import FastAPI
from RSAkeyPairs import generate_keypair

app = FastAPI()

@app.get("/")
async def read_root():
	key = await generate_keypair()
	return {"Hello": key.publickey()}
