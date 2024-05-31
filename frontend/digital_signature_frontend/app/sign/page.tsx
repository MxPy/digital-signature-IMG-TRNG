'use client';
import { useState } from 'react';

async function uploadFile(file: any) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch('http://127.0.0.1:8000/uploadFile', {
    method: 'POST',
    body: formData,
  });
  const data = await res.json();
  return { file: data.file, file2: data.file2 };
}

export default function Home() {
  const [keys, setKeys] = useState<{ file: { filename: string, content_type: string, data: string } | null, file2: { filename: string, content_type: string, data: string } | null }>({ file: null, file2: null });
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadFile = async () => {
    if (!selectedFile) return;
    setLoading(true);
    const fetchedData = await uploadFile(selectedFile);
    setKeys(fetchedData);
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
              <>
                <h1>Put Your file then Click "Sign" to sign Your file</h1>
                <button className="btn btn-wide btn-primary" onClick={handleUploadFile}>
                  Sign
                </button>
                <label className="form-control w-full max-w-xs">
                  <input
                    type="file"
                    className="my-2 file-input file-input-bordered w-full max-w-xs"
                    onChange={handleFileChange}
                  />
                </label>
              </>
            )}
            {loading && <span className="loading loading-infinity loading-lg"></span>}
            {fetched && !loading && (
              <div className='flex flex-col items-center'>
                {keys.file && (
                  <div>
                    <a className="btn btn-wide btn-primary m-2" href={`data:${keys.file.content_type};base64,${keys.file.data}`} download={keys.file.filename}>
                      Download Signature
                    </a>
                  </div>
                )}
                {keys.file2 && (
                  <div>
                    <a className="btn btn-wide btn-primary" href={`data:${keys.file2.content_type};base64,${keys.file2.data}`} download={keys.file2.filename}>
                      Download Public Key
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}