import React, { useEffect, useState } from 'react';
import { api } from '../services/mockBackend';
import { GENRES } from '../constants';
import { Movie } from '../types';
import { Plus, BarChart2, Film, Users, MessageSquare } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Form State
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    director: '',
    year: new Date().getFullYear(),
    duration: 120,
    posterUrl: '',
    genres: [] as string[],
    cast: ''
  });

  const fetchData = async () => {
    setLoading(true);
    const [statsData, moviesData] = await Promise.all([
      api.stats.getAdminStats(),
      api.movies.getAll()
    ]);
    setStats(statsData);
    setMovies(moviesData);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddMovie = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.movies.add({
      ...newMovie,
      cast: newMovie.cast.split(',').map(c => c.trim())
    });
    setShowAddModal(false);
    fetchData(); // refresh list
    // Reset form
    setNewMovie({
      title: '',
      description: '',
      director: '',
      year: new Date().getFullYear(),
      duration: 120,
      posterUrl: '',
      genres: [],
      cast: ''
    });
  };

  const handleGenreChange = (genre: string) => {
    if (newMovie.genres.includes(genre)) {
      setNewMovie({ ...newMovie, genres: newMovie.genres.filter(g => g !== genre) });
    } else {
      setNewMovie({ ...newMovie, genres: [...newMovie.genres, genre] });
    }
  };

  if (loading) return <div className="p-10 text-center">Loading Admin Panel...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard title="Total Movies" value={stats.totalMovies} icon={<Film />} color="bg-blue-600" />
        <StatCard title="Total Users" value={stats.totalUsers} icon={<Users />} color="bg-green-600" />
        <StatCard title="Avg Rating" value={stats.avgRating.toFixed(1)} icon={<BarChart2 />} color="bg-yellow-600" />
        <StatCard title="Reviews" value={stats.totalReviews} icon={<MessageSquare />} color="bg-purple-600" />
      </div>

      {/* Movie Management Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Movie Management</h2>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-brand-red hover:bg-red-700 text-white px-4 py-2 rounded flex items-center gap-2 transition"
        >
          <Plus size={20} /> Add Movie
        </button>
      </div>

      <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-800 text-gray-400 text-xs uppercase">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Director</th>
                <th className="px-6 py-4">Year</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Views</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {movies.map(movie => (
                <tr key={movie.id} className="hover:bg-gray-800/50">
                  <td className="px-6 py-4 font-medium">{movie.title}</td>
                  <td className="px-6 py-4 text-gray-400">{movie.director}</td>
                  <td className="px-6 py-4 text-gray-400">{movie.year}</td>
                  <td className="px-6 py-4 text-yellow-500 font-bold">{movie.rating.toFixed(1)}</td>
                  <td className="px-6 py-4 text-gray-400">{movie.viewCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Movie Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-gray-900 w-full max-w-2xl rounded-xl border border-gray-700 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="p-6 border-b border-gray-800 flex justify-between items-center">
              <h3 className="text-xl font-bold">Add New Movie</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white">&times;</button>
            </div>
            
            <form onSubmit={handleAddMovie} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Title</label>
                  <input required type="text" className="w-full bg-gray-800 rounded p-2 text-white border border-gray-700"
                    value={newMovie.title} onChange={e => setNewMovie({...newMovie, title: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Director</label>
                  <input required type="text" className="w-full bg-gray-800 rounded p-2 text-white border border-gray-700"
                    value={newMovie.director} onChange={e => setNewMovie({...newMovie, director: e.target.value})} />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Description</label>
                <textarea required rows={3} className="w-full bg-gray-800 rounded p-2 text-white border border-gray-700"
                  value={newMovie.description} onChange={e => setNewMovie({...newMovie, description: e.target.value})} />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Year</label>
                  <input required type="number" className="w-full bg-gray-800 rounded p-2 text-white border border-gray-700"
                    value={newMovie.year} onChange={e => setNewMovie({...newMovie, year: parseInt(e.target.value)})} />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Duration (min)</label>
                  <input required type="number" className="w-full bg-gray-800 rounded p-2 text-white border border-gray-700"
                    value={newMovie.duration} onChange={e => setNewMovie({...newMovie, duration: parseInt(e.target.value)})} />
                </div>
                 <div>
                  <label className="block text-sm text-gray-400 mb-1">Poster URL</label>
                  <input required type="text" className="w-full bg-gray-800 rounded p-2 text-white border border-gray-700"
                    placeholder="https://..."
                    value={newMovie.posterUrl} onChange={e => setNewMovie({...newMovie, posterUrl: e.target.value})} />
                </div>
              </div>

              <div>
                 <label className="block text-sm text-gray-400 mb-1">Cast (comma separated)</label>
                 <input required type="text" className="w-full bg-gray-800 rounded p-2 text-white border border-gray-700"
                    value={newMovie.cast} onChange={e => setNewMovie({...newMovie, cast: e.target.value})} />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Genres</label>
                <div className="flex flex-wrap gap-2">
                  {GENRES.map(g => (
                    <button 
                      key={g} 
                      type="button" 
                      onClick={() => handleGenreChange(g)}
                      className={`px-3 py-1 rounded-full text-xs border ${newMovie.genres.includes(g) ? 'bg-brand-red border-brand-red text-white' : 'border-gray-600 text-gray-400'}`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-4">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-gray-300 hover:text-white">Cancel</button>
                <button type="submit" className="bg-brand-red hover:bg-red-700 text-white px-6 py-2 rounded font-bold">Add Movie</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, icon, color }: { title: string, value: string | number, icon: React.ReactNode, color: string }) {
  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 flex items-center justify-between">
      <div>
        <p className="text-gray-400 text-sm mb-1">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
      </div>
      <div className={`p-4 rounded-lg ${color} bg-opacity-20 text-white`}>
        {icon}
      </div>
    </div>
  );
}