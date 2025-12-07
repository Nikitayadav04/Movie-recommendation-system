import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Film, User, LogOut, Menu, X, Shield } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-black/90 sticky top-0 z-50 border-b border-gray-800 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Film className="h-8 w-8 text-brand-red" />
            <span className="text-2xl font-bold tracking-tight text-brand-red">CineSense</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {!user ? (
                <>
                  <Link to="/login" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">Login</Link>
                  <Link to="/signup" className="bg-brand-red hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition">Sign Up</Link>
                </>
              ) : (
                <>
                  <Link to="/dashboard" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
                  <Link to="/watchlist" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Watchlist</Link>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="text-brand-red hover:text-red-400 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1">
                      <Shield size={14}/> Admin
                    </Link>
                  )}
                  <div className="ml-4 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <img 
                        src={user.avatarUrl} 
                        alt={user.name} 
                        className="h-8 w-8 rounded-full border border-gray-600"
                      />
                      <span className="text-sm font-medium text-white">{user.name}</span>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-800 transition"
                      title="Logout"
                    >
                      <LogOut size={20} />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 border-b border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {!user ? (
              <>
                <Link to="/login" className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">Login</Link>
                <Link to="/signup" className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">Sign Up</Link>
              </>
            ) : (
              <>
                <div className="px-3 py-2 flex items-center gap-3 border-b border-gray-800 mb-2">
                  <img src={user.avatarUrl} alt={user.name} className="h-8 w-8 rounded-full" />
                  <span className="text-white font-medium">{user.name}</span>
                </div>
                <Link to="/dashboard" className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">Dashboard</Link>
                <Link to="/watchlist" className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">Watchlist</Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="block text-brand-red hover:text-red-400 px-3 py-2 rounded-md text-base font-medium">Admin Panel</Link>
                )}
                <button 
                  onClick={handleLogout}
                  className="w-full text-left text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium flex items-center gap-2"
                >
                  <LogOut size={16} /> Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}