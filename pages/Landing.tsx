import React from 'react';
import { Link } from 'react-router-dom';
import { Play, TrendingUp, Award, Monitor } from 'lucide-react';
import { MOCK_MOVIES } from '../constants';

export default function Landing() {
  const featuredMovie = MOCK_MOVIES[0]; // Inception

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={featuredMovie?.posterUrl} 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-50 blur-sm scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/60 to-transparent" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Unlimited movies, TV shows, and more.
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Experience the next generation of intelligent movie recommendations. 
              CineSense understands your taste better than you do.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/signup" 
                className="bg-brand-red hover:bg-red-700 text-white px-8 py-4 rounded-md text-lg font-bold flex items-center justify-center gap-2 transition transform hover:scale-105"
              >
                Get Started <Play size={20} fill="currentColor"/>
              </Link>
              <Link 
                to="/login" 
                className="bg-gray-800/80 hover:bg-gray-700 text-white px-8 py-4 rounded-md text-lg font-bold text-center transition backdrop-blur-sm"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Why CineSense?</h2>
            <p className="text-gray-400">Powered by advanced algorithms to bring you the best entertainment.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Monitor className="w-12 h-12 text-brand-red" />}
              title="Watch Everywhere"
              description="Stream on your phone, tablet, laptop, and TV without paying more."
            />
            <FeatureCard 
              icon={<Award className="w-12 h-12 text-brand-red" />}
              title="Personalized For You"
              description="Our recommendation engine learns from your watch history to suggest hidden gems."
            />
            <FeatureCard 
              icon={<TrendingUp className="w-12 h-12 text-brand-red" />}
              title="Trending Content"
              description="Stay up to date with the most popular movies and shows globally."
            />
          </div>
        </div>
      </div>

      {/* Newsletter / CTA */}
      <div className="py-20 border-t border-gray-800 bg-black">
         <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to watch?</h2>
            <p className="text-gray-400 mb-8">Enter your email to create or restart your membership.</p>
            <Link to="/signup" className="inline-block bg-brand-red text-white px-8 py-3 rounded text-lg font-semibold hover:bg-red-700 transition">
              Join CineSense Now
            </Link>
         </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-gray-900 p-8 rounded-xl text-center hover:bg-gray-800 transition border border-gray-800">
      <div className="flex justify-center mb-6">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}