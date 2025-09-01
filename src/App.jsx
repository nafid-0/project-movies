import {useEffect, useState} from 'react'
import './App.css'
import Search from "./components/Search.jsx";
import hero from "./components/Hero.jsx";
import Hero from "./components/Hero.jsx";

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log(searchTerm)
       const delay = setTimeout(() => {
           if (!searchTerm  || searchTerm.trim().length < 2) {
               console.log(searchTerm)
               setResults([]);
               setLoading(false);
               setError("");
               return;
           }

           const controller = new AbortController();

           console.log("controller", controller);

           const run = async () => {
               try{
                   setLoading(true);
                   setError("");

                   const res = await fetch(
                       `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(searchTerm)}&limit=10&sfw`,
                       { signal: controller.signal }
                   );

                  // console.log(res);

                   if ( !res.ok ) throw new error(`HTTP ${res.status}`);
                   const data = await res.json();
                   console.log(data);
                   setResults(data?.data ?? []);

               } catch(e) {
                   if (e.name !== "AbortError") setError("Failed to fetch results.");
               } finally {
                   setLoading(false);
               }
           };
           run();
           return () => controller.abort();
        },400)

        return () => clearTimeout(delay);

    }, [searchTerm]);

    return (
        <main>
            <div className="pattern" />

            <div className="wrapper">
                <header className="header">
                    <Hero leftImage = {"./Most Powerful Duo in Naruto Shipudden ♥️⚡🔥….jpeg" }
                          centerImage = {"Romantic Manga, Cute Anime Pics, Emo Pfp, Anime….jpeg"}
                          rightImage = {"./Happy new Year from Zenitsu….jpeg"}
                    />
                    <h1 className="py-15">
                     Find <span className="text-gradient">Anime</span> You’ll Love Without the Hassle
                    </h1>
                </header>

                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

                {loading && <p className="mt-6 opacity-70">Searching…</p>}
                {error && <p className="mt-6 text-red-500">{error}</p>}

                {!loading && !error && results.length > 0 && (
                    <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {results.map((item) => (
                            <li key={item.mal_id} className="rounded-xl border p-3 bg-white/5">
                                <img
                                    src={item.images?.jpg?.large_image_url ?? item.images?.jpg?.image_url}
                                    alt={item.title}
                                    className="w-full h-56 object-cover rounded-lg"
                                />
                                <h3 className="mt-3 font-semibold">{item.title}</h3>
                                <p className="text-sm opacity-70">
                                    {item.type} • {item.episodes ?? "?"} eps • {item.score ?? "N/A"}⭐
                                </p>
                            </li>
                        ))}
                    </ul>
                )}

            </div>
        </main>
    )
}

export default App;

