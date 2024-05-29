import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
    <div className="hero min-h-screen" style={{backgroundImage: 'url(https://www.purepc.pl/image/news/2023/03/09_discord_testuje_mozliwosci_sztucznej_inteligencji_ai_odpowie_na_pytania_uzytkownikow_i_pomoze_w_moderacji_serwera_1_b.png)'}}>
      <div className="hero-overlay bg-opacity-70"></div>
      <div className="hero-content text-center">
        <div className="max-w-2xl">
          
          <button className="btn btn-wide btn-primary">Get Keys</button>
        </div>
      </div>
    </div>
  </main>
  );
}
