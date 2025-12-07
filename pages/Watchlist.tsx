import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/mockBackend';
import { Movie } from '../types';
import MovieCard from '../components/MovieCard';
import { Loader2, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Watchlist() {
  const { user } = useAuth();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (user && user.watchlist.length > 0) {
        setLoading(true);
        // In a real API, we'd have a getWatchlist endpoint. Here we fetch all and filter.
        // Or fetch individually.
        const all = await api.movies.getAll();
        const watchlistMovies = all.filter(m => user.watchlist.includes(m.id));
        setMovies(watchlistMovies);
        setLoading(false);
      } else {
        setMovies([]);
        setLoading(false);
      }
    };
    fetchWatchlist();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-10 w-10 text-brand-red" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
      <div className="flex items-center gap-3 mb-8">
        <Bookmark className="w-8 h-8 text-brand-red" />
        <h1 className="text-3xl font-bold">My Watchlist</h1>
      </div>

      {movies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-900/50 rounded-lg border border-gray-800">
          <p className="text-xl text-gray-400 mb-4">Your watchlist is empty.</p>
          <Link to="/dashboard" className="text-brand-red hover:underline">
            Browse movies to add some!
          </Link>
        </div>
      )}
    </div>
  );
}