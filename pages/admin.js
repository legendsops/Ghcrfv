import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [animeList, setAnimeList] = useState([]);
  const [form, setForm] = useState({
    title: '', description: '', year: '', views: 0, comments: 0, genres: '', imageUrl: '', watchLink: '', featured: false
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('adminToken');
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
      fetchAnime();
    }
  }, []);

  const handleLogin = () => {
    if (passwordInput === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || passwordInput === 'admin123') { // fallback for dev
      const fakeToken = 'loggedin';
      localStorage.setItem('adminToken', fakeToken);
      setToken(fakeToken);
      setIsLoggedIn(true);
      fetchAnime();
    } else {
      alert('Wrong password');
    }
  };

  const fetchAnime = async () => {
    const res = await fetch('/api/anime');
    const data = await res.json();
    setAnimeList(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      genres: form.genres.split(',').map(g => g.trim()),
      views: Number(form.views),
      comments: Number(form.comments),
      year: Number(form.year),
    };
    const url = editingId ? /api/anime/${editingId} : '/api/anime';
    const method = editingId ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', 'admin-token': token },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      alert(editingId ? 'Updated!' : 'Added!');
      setForm({ title: '', description: '', year: '', views: 0, comments: 0, genres: '', imageUrl: '', watchLink: '', featured: false });
      setEditingId(null);
      fetchAnime();
    } else {
      alert('Error saving anime');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this anime?')) {
      await fetch(/api/anime/${id}, { method: 'DELETE', headers: { 'admin-token': token } });
      fetchAnime();
    }
  };

  const editAnime = (anime) => {
    setEditingId(anime._id);
    setForm({
      title: anime.title,
      description: anime.description,
      year: anime.year,
      views: anime.views,
      comments: anime.comments,
      genres: anime.genres.join(', '),
      imageUrl: anime.imageUrl,
      watchLink: anime.watchLink,
      featured: anime.featured,
    });
  };

  if (!isLoggedIn) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-10 max-w-md">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Admin Login</h2>
            <input type="password" placeholder="Enter password" value={passwordInput} onChange={e => setPasswordInput(e.target.value)} className="w-full p-2 rounded bg-gray-700 mb-4" />
            <button onClick={handleLogin} className="bg-pink-500 px-4 py-2 rounded w-full">Login</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Anime' : 'Add New Anime'}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="p-2 rounded bg-gray-700" required />
            <input placeholder="Year" value={form.year} onChange={e => setForm({...form, year: e.target.value})} className="p-2 rounded bg-gray-700" required />
            <input placeholder="Views" value={form.views} onChange={e => setForm({...form, views: e.target.value})} className="p-2 rounded bg-gray-700" required />
            <input placeholder="Comments" value={form.comments} onChange={e => setForm({...form, comments: e.target.value})} className="p-2 rounded bg-gray-700" required />
            <input placeholder="Genres (comma separated)" value={form.genres} onChange={e => setForm({...form, genres: e.target.value})} className="p-2 rounded bg-gray-700" required />
            <input placeholder="Image URL" value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} className="p-2 rounded bg-gray-700" />
            <input placeholder="Watch Link" value={form.watchLink} onChange={e => setForm({...form, watchLink: e.target.value})} className="p-2 rounded bg-gray-700" required />
            <textarea placeholder="Description" rows="3" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="p-2 rounded bg-gray-700" required />
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})} />
              Featured Anime
            </label>
            <div className="md:col-span-2 flex gap-3">
              <button type="submit" className="bg-green-600 px-4 py-2 rounded">{editingId ? 'Update' : 'Add'}</button>
              {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ title: '', description: '', year: '', views: 0, comments: 0, genres: '', imageUrl: '', watchLink: '', featured: false }); }} className="bg-gray-600 px-4 py-2 rounded">Cancel</button>}
            </div>
          </form>
        </div>
        <h2 className="text-xl font-bold mb-4">Existing Anime</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {animeList.map(anime => (
            <div key={anime._id} className="bg-gray-800 p-4 rounded flex justify-between items-center">
              <div><strong>{anime.title}</strong> ({anime.year})</div>
              <div className="space-x-2">
                <button onClick={() => editAnime(anime)} className="bg-blue-600 px-3 py-1 rounded">Edit</button>
                <button onClick={() => handleDelete(anime._id)} className="bg-red-600 px-3 py-1 rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
                  }
