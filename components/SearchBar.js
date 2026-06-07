export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <input
      type="text"
      placeholder="Search anime..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
    />
  );
}
