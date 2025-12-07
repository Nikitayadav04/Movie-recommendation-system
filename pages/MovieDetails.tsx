import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/mockBackend';
import { useAuth } from '../context/AuthContext';
import { Movie } from '../types';
import { Star, Clock, Calendar, Play, Plus, Check, ThumbsUp } from 'lucide-react';

export default function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  const { user, updateUserWatchlist } = useAuth();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    const fetchMovie = async () => {
      if (id) {
        setLoading(true);
        const data = await api.movies.getById(id);
        if (data) setMovie(data);
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  useEffect(() => {
    if (user && movie) {
      setInWatchlist(user.watchlist.includes(movie.id));
    }
  }, [user, movie]);

  const handleToggleWatchlist = async () => {
    if (user && movie) {
      const newList = await api.movies.toggleWatchlist(user.id, movie.id);
      setInWatchlist(!inWatchlist);
      updateUserWatchlist(newList);
    }
  };

  if (loading) return <div className="p-20 text-center">Loading...</div>;
  if (!movie) return <div className="p-20 text-center">Movie not found</div>;

  return (
    <div className="relative min-h-screen">
      {/* Background Backdrop */}
      <div className="absolute inset-0 h-[70vh]">
         <img 
           src={movie.posterUrl} 
           alt={movie.title} 
           className="w-full h-full object-cover blur-md opacity-30"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          {/* Poster Card */}
          <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
             <img 
               src={movie.posterUrl} 
               alt={movie.title} 
               className="w-full rounded-lg shadow-2xl border border-gray-800"
             />
          </div>

          {/* Details */}
          <div className="flex-grow pt-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{movie.title}</h1>
            
            <div className="flex flex-wrap items-center gap-6 text-gray-300 mb-6 text-sm md:text-base">
              <span className="flex items-center gap-1 text-yellow-500 font-bold">
                <Star size={20} fill="currentColor" /> {movie.rating.toFixed(1)}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={18} /> {movie.year}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={18} /> {movie.duration}m
              </span>
              <span className="border border-gray-600 px-2 py-0.5 rounded text-xs uppercase">
                HD
              </span>
            </div>

            <div className="flex gap-4 mb-8">
              <button className="bg-white text-black px-8 py-3 rounded font-bold hover:bg-gray-200 transition flex items-center gap-2">
                <Play size={20} fill="currentColor" /> Play
              </button>
              <button 
                onClick={handleToggleWatchlist}
                className={`px-8 py-3 rounded font-bold border transition flex items-center gap-2
                  ${inWatchlist 
                    ? 'bg-gray-800 border-gray-800 text-white hover:bg-gray-700' 
                    : 'bg-gray-600/50 border-gray-500 text-white hover:bg-gray-600'
                  }`}
              >
                {inWatchlist ? <Check size={20} /> : <Plus size={20} />} 
                {inWatchlist ? 'In Watchlist' : 'Add to List'}
              </button>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 backdrop-blur-sm mb-8">
              <p className="text-lg leading-relaxed text-gray-200 mb-6">{movie.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
                <div>
                  <span className="block text-gray-500 font-bold mb-1">Director</span>
                  {movie.director}
                </div>
                <div>
                  <span className="block text-gray-500 font-bold mb-1">Cast</span>
                  {movie.cast.join(', ')}
                </div>
                <div>
                  <span className="block text-gray-500 font-bold mb-1">Genres</span>
                  {movie.genres.join(', ')}
                </div>
              </div>
            </div>

            {/* Mock Rating System */}
            <div className="border-t border-gray-800 pt-8">
              <h3 className="text-xl font-bold mb-4">Rate this movie</h3>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setUserRating(star)}
                    className={`transition ${star <= userRating ? 'text-yellow-500' : 'text-gray-600 hover:text-yellow-500/50'}`}
                  >
                    <Star size={32} fill={star <= userRating ? "currentColor" : "none"} />
                  </button>
                ))}
              </div>
              {userRating > 0 && <p className="text-sm text-gray-400 mt-2">Thanks for rating!</p>}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}