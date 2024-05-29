'use client'
import { useState } from 'react';

async function uploadFile(file: any) {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch('http://127.0.0.1:8000/uploadFile', {
    method: 'POST',
    body: formData,
  });

  return res.json();
}

export default function Home() {
  const [keys, setKeys] = useState({ signature: '', publc_key: ''});
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadFile = async () => {
    if (!selectedFile) return;
    setLoading(true);
    const fetchedKeys = await uploadFile(selectedFile);
    setKeys(fetchedKeys);
    setLoading(false);
    setFetched(true);
  };


  return (
    <main className="">
      <div className="hero min-h-screen" style={{backgroundImage: 'url(https://www.purepc.pl/image/news/2023/03/09_discord_testuje_mozliwosci_sztucznej_inteligencji_ai_odpowie_na_pytania_uzytkownikow_i_pomoze_w_moderacji_serwera_1_b.png)'}}>
        <div className="hero-overlay bg-opacity-70"></div>
        <div className="hero-content text-center">
          <div className="max-w-2xl text-wrap">
            {!fetched && !loading && <><h1>Put Your file then Click "Get Keys" to fetch keys</h1><button className="btn btn-wide btn-primary" onClick={handleUploadFile}>Get Keys</button><label className="form-control w-full max-w-xs">
                                        <input type="file" className="my-2 file-input file-input-bordered w-full max-w-xs" onChange={handleFileChange} />
                                      </label></>}
            {loading && <span className="loading loading-infinity loading-lg"></span>}
            {fetched && !loading && <div>
                                      <div className="mockup-code">
                                        <pre><code>{keys.signature}</code></pre>
                                      </div>
                                      <div className="mockup-code">
                                        <pre><code>{keys.publc_key}</code></pre>
                                      </div>
                                    </div>}
            
            
          </div>
        </div>
      </div>
    </main>
  );
}
