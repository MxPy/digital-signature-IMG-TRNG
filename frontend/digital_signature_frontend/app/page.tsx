'use client'
import { useState } from 'react';

async function fetchKeys() {
  const res = await fetch('http://127.0.0.1:8000/getKeys');
  return res.json();
}

export default function Home() {
  const [keys, setKeys] = useState({ PublicKey: '', PrivateKey: '' });
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  const handleGetKeys = async () => {
    setLoading(true);
    const fetchedKeys = await fetchKeys();
    setKeys(fetchedKeys);
    setLoading(false);
    setFetched(true);
  };

  return (
    <main className="">
      <div className="hero min-h-screen" style={{backgroundImage: 'url(https://www.purepc.pl/image/news/2023/03/09_discord_testuje_mozliwosci_sztucznej_inteligencji_ai_odpowie_na_pytania_uzytkownikow_i_pomoze_w_moderacji_serwera_1_b.png)'}}>
        <div className="hero-overlay bg-opacity-70"></div>
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            {!fetched && !loading && <h1>Click "Get Keys" to fetch keys</h1>}
            {loading && <span className="loading loading-infinity loading-lg"></span>}
            <h1>{keys.PublicKey}</h1>
            <h1>{keys.PrivateKey}</h1>
            <button className="btn btn-wide btn-primary" onClick={handleGetKeys}>Get Keys</button>
            <label className="form-control w-full max-w-xs">
            <input type="file" className="my-2 file-input file-input-bordered w-full max-w-xs" />
          </label>
          </div>
        </div>
      </div>
    </main>
  );
}
