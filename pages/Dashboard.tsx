import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/mockBackend';
import { Movie } from '../types';
import MovieCard from '../components/MovieCard';
import { Loader2, Sparkles, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        setLoading(true);
        try {
          const [recs, all] = await Promise.all([
            api.movies.getRecommended(user.id),
            api.movies.getAll()
          ]);
          setRecommendedMovies(recs);
          setAllMovies(all);
        } catch (error) {
          console.error("Failed to fetch dashboard data", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-10 w-10 text-brand-red" />
      </div>
    );
  }

  // Group movies by genre for "Browse by Genre" rows
  const genres = Array.from(new Set(allMovies.flatMap(m => m.genres))).slice(0, 4);

  return (
    <div className="pb-20">
      {/* Featured / Hero for Dashboard */}
      <div className="relative h-[50vh] w-full mb-10">
         <div className="absolute inset-0">
           <img 
             src={recommendedMovies[0]?.posterUrl || 'https://picsum.photos/1200/600'} 
             alt="Featured" 
             className="w-full h-full object-cover opacity-60 mask-image-gradient"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent"></div>
           <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/40 to-transparent"></div>
         </div>
         <div className="relative max-w-7xl mx-auto px-4 h-full flex items-end pb-12">
            <div className="max-w-2xl">
              <span className="bg-brand-red/80 text-white text-xs font-bold px-2 py-1 rounded mb-2 inline-block">
                #1 Top Recommendation for You
              </span>
              <h1 className="text-4xl font-bold text-white mb-2">{recommendedMovies[0]?.title}</h1>
              <p className="text-gray-300 line-clamp-3 mb-4">{recommendedMovies[0]?.description}</p>
              <button className="bg-white text-black px-6 py-2 rounded font-bold hover:bg-gray-200 transition">
                Play Now
              </button>
            </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Personalized Recommendations */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-yellow-500" />
            <h2 className="text-2xl font-bold text-white">Recommended For You</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {recommendedMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        {/* Trending */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="text-brand-red" />
            <h2 className="text-2xl font-bold text-white">Trending Now</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {allMovies.slice(0, 5).map(movie => (
              <MovieCard key={`trending-${movie.id}`} movie={movie} />
            ))}
          </div>
        </section>

        {/* Genre Rows */}
        {genres.map(genre => {
          const moviesInGenre = allMovies.filter(m => m.genres.includes(genre));
          if (moviesInGenre.length === 0) return null;
          
          return (
            <section key={genre}>
              <h2 className="text-xl font-bold text-gray-200 mb-4">{genre} Movies</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {moviesInGenre.slice(0, 5).map(movie => (
                  <MovieCard key={`${genre}-${movie.id}`} movie={movie} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}