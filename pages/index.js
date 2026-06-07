import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import AnimeCard from '../components/AnimeCard';
import SearchBar from '../components/SearchBar';

export default function Home({ initialAnime }) {
  const [animeList, setAnimeList] = useState(initialAnime);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAnime = animeList.filter(anime =>
    anime.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const featured = animeList.find(a => a.featured === true) || animeList[0];

  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        {/* Featured Section */}
        {featured && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold border-l-4 border-pink-500 pl-3 mb-4">FEATURED ANIME</h2>
            <div className="bg-gray-800 rounded-lg p-4 flex flex-col md:flex-row gap-4">
              <img src={featured.imageUrl || 'https://via.placeholder.com/200x300'} alt={featured.title} className="w-full md:w-48 h-64 object-cover rounded" />
              <div>
                <h3 className="text-2xl font-bold">{featured.title}</h3>
                <p className="text-gray-300 mt-2">{featured.description}</p>
                <div className="mt-3 text-sm text-gray-400">{featured.year} • 👁️ {featured.views} views • 💬 {featured.comments} comments</div>
                <a href={featured.watchLink} target="_blank" className="mt-4 inline-block bg-pink-500 px-5 py-2 rounded">Watch</a>
              </div>
            </div>
          </div>
        )}

        {/* Search */}
        <div className="mb-8">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        {/* Anime Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredAnime.map(anime => (
            <AnimeCard key={anime._id} anime={anime} />
          ))}
          {filteredAnime.length === 0 && <p className="text-gray-400 col-span-full text-center">No anime found.</p>}
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(${process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : 'http://localhost:3000'}/api/anime);
  const data = await res.json();
  return { props: { initialAnime: data } };
}
