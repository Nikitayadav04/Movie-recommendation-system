import React from 'react';
import { Star, Clock } from 'lucide-react';
import { Movie } from '../types';
import { Link } from 'react-router-dom';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`} className="group relative block bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105 hover:shadow-2xl hover:z-10">
      {/* Poster */}
      <div className="aspect-[2/3] w-full overflow-hidden">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover transition-opacity group-hover:opacity-75"
        />
      </div>

      {/* Content Overlay (Visible on Hover for desktop, or simplified bottom for mobile) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
        <h3 className="text-lg font-bold text-white line-clamp-1">{movie.title}</h3>
        
        <div className="flex items-center gap-2 mt-1 mb-2">
          <span className="bg-brand-red text-white text-xs px-2 py-0.5 rounded font-bold">
            {movie.rating.toFixed(1)}
          </span>
          <span className="text-gray-300 text-xs">{movie.year}</span>
          <span className="text-gray-300 text-xs flex items-center gap-1">
            <Clock size={10} /> {movie.duration}m
          </span>
        </div>

        <p className="text-gray-300 text-xs line-clamp-2 mb-2">
          {movie.description}
        </p>
        
        <div className="flex gap-1 flex-wrap">
          {movie.genres.slice(0, 2).map(g => (
            <span key={g} className="text-[10px] text-gray-400 border border-gray-600 px-1 rounded">
              {g}
            </span>
          ))}
        </div>
      </div>
      
      {/* Default footer info always visible if not hovering (Optional, usually cleaner to just show image and have info on hover or below) */}
      <div className="p-3 bg-gray-900 group-hover:hidden">
        <h3 className="text-sm font-semibold text-white truncate">{movie.title}</h3>
        <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
           <Star size={12} className="text-yellow-500 fill-yellow-500"/>
           <span>{movie.rating}</span>
           <span className="mx-1">•</span>
           <span>{movie.year}</span>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;