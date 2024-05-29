'use client'
import { useState } from 'react';

async function fetchKeys() {
  const res = await fetch('http://127.0.0.1:8000/getKeys');
  return res.json();
}

export default function Home() {
  const [keys, setKeys] = useState({ PublicKey: '', PrivateKey: '' });

  const handleGetKeys = async () => {
    const fetchedKeys = await fetchKeys();
    setKeys(fetchedKeys);
  };

  return (
    <main className="">
      <div className="hero min-h-screen" style={{backgroundImage: 'url(https://www.purepc.pl/image/news/2023/03/09_discord_testuje_mozliwosci_sztucznej_inteligencji_ai_odpowie_na_pytania_uzytkownikow_i_pomoze_w_moderacji_serwera_1_b.png)'}}>
        <div className="hero-overlay bg-opacity-70"></div>
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1>{keys.PublicKey}</h1>
            <h1>{keys.PrivateKey}</h1>
            <button className="btn btn-wide btn-primary" onClick={handleGetKeys}>Get Keys</button>
          </div>
        </div>
      </div>
    </main>
  );
}
