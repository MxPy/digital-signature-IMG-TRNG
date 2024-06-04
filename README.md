# Digital Signature

This is a full-stack implementation of a file signing tool, utilizing the Next.js and FastAPI frameworks along with the pycryptodome library. However, the True Number Generator function for generating RSA key pairs was manually implemented by me. It's a function that generates random numbers from an image source.

## Installation

### Use the package manager [pip](https://pip.pypa.io/en/stable/) to install back-end requiemants (I recommend using python virtual environment).

windows
```bash
cd backend
python -m venv .venv
.venv\Scripts\Activate
pip install -r requirements.txt
```
linux/macos
```bash
cd backend
python -m venv .venv
source .venv/Bin/Activate
pip3 install -r requirements.txt
```

### Use the package manager [npm](https://www.npmjs.com/) to install front-end requiemants.

windows/linux/macos
```bash
cd frontend
npm install
```

## Usage

### Run back-end server.

windows
```bash
cd backend
.venv\Scripts\Activate
uvicorn main:app
```
linux/macos
```bash
cd backend
python -m venv .venv
source .venv/Bin/Activate
uvicorn main:app
```
### Run front-end server.
windows/linux/macos
```bash
cd frontend
npm run dev
```


## License

[MIT](https://choosealicense.com/licenses/mit/)
