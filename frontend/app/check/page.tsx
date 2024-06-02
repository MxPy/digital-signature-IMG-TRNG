'use client';
import { useState } from 'react';

async function uploadFile(file: any, signature: any, key: any) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('signature', signature);
  formData.append('key', key);
  const res = await fetch('http://127.0.0.1:8000/verifyFile', {
    method: 'POST',
    body: formData,
  });
  return res.json();
}

export default function Home() {
  const [keys, setKeys] = useState({ verified: '' });
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedSignature, setSelectedSignature] = useState(null);
  const [selectedKey, setSelectedKey] = useState(null);

  const handleFileChange = (event: any, type: string) => {
    switch (type) {
      case 'file':
        setSelectedFile(event.target.files[0]);
        break;
      case 'signature':
        setSelectedSignature(event.target.files[0]);
        break;
      case 'key':
        setSelectedKey(event.target.files[0]);
        break;
      default:
        break;
    }
  };

  const handleUploadFile = async () => {
    if (!selectedFile || !selectedSignature || !selectedKey) return;
    setLoading(true);
    const fetchedKeys = await uploadFile(selectedFile, selectedSignature, selectedKey);
    setKeys(fetchedKeys);
    setLoading(false);
    setFetched(true);
  };

  return (
    <main className="">
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            'url(https://www.purepc.pl/image/news/2023/03/09_discord_testuje_mozliwosci_sztucznej_inteligencji_ai_odpowie_na_pytania_uzytkownikow_i_pomoze_w_moderacji_serwera_1_b.png)',
        }}
      >
        <div className="hero-overlay bg-opacity-70"></div>
        <div className="hero-content text-center">
          <div className="max-w-2xl text-wrap">
            {!fetched && !loading && (
              <div className="flex flex-col items-center">
                <h1>Put Your file, signature, and public key then Click "Check" to verify the signature</h1>
                <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-white">File</span>
                </div>
                  <input
                    type="file"
                    className="file-input file-input-bordered w-full max-w-xs"
                    onChange={(e) => handleFileChange(e, 'file')}
                  />
                </label>
                <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-white">Signature</span>
                </div>
                  <input
                    type="file"
                    className="file-input file-input-bordered w-full max-w-xs"
                    onChange={(e) => handleFileChange(e, 'signature')}
                  />
                
                </label>
                <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-white">Key</span>
                </div>
                  <input
                    type="file"
                    className="file-input file-input-bordered w-full max-w-xs"
                    onChange={(e) => handleFileChange(e, 'key')}
                  />
              
                </label>
                <button className="btn btn-wide btn-primary" onClick={handleUploadFile}>
                  Check
                </button>
              </div>
            )}
            {loading && <span className="loading loading-infinity loading-lg"></span>}
            {fetched && !loading && (
              <div>
                  {keys.verified ? <div className="card w-96 bg-base-100 shadow-xl">
                                    <figure><img src="https://i.pinimg.com/originals/14/12/54/1412540665c343d81925325d41d3db0f.gif" alt="Shoes" /></figure>
                                    <div className="card-body">
                                      <h2 className="card-title text-green-500">Signature is valid!!!11!111!!!</h2>
                                    </div>
                                  </div> 
                                  : 
                                    <div className="card w-96 bg-base-100 shadow-xl">
                                    <figure><img src="https://media.tenor.com/ww6svxpx7koAAAAC/sadcat.gif" alt="Shoes" /></figure>
                                    <div className="card-body">
                                      <h2 className="card-title text-red-500">Signature is invalid D:</h2>
                                    </div>
                                  </div>}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}