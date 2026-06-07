export default function AnimeCard({ anime }) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform">
      <img src={anime.imageUrl || 'https://via.placeholder.com/300x400?text=No+Image'} alt={anime.title} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{anime.title}</h3>
        <div className="flex flex-wrap gap-2 mb-2">
          {anime.genres?.map((g, i) => (
            <span key={i} className="bg-pink-600 text-xs px-2 py-1 rounded">{g}</span>
          ))}
        </div>
        <p className="text-gray-400 text-sm mb-2">{anime.year} • 👁️ {anime.views} views • 💬 {anime.comments} comments</p>
        <p className="text-gray-300 text-sm line-clamp-2">{anime.description}</p>
        <a href={anime.watchLink} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block bg-pink-500 px-4 py-2 rounded hover:bg-pink-600">Watch</a>
      </div>
    </div>
  );
}
