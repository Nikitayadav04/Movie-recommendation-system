import { Movie, User, UserRole, Review } from '../types';
import { MOCK_MOVIES, MOCK_ADMIN } from '../constants';

// Local Storage Keys
const LS_KEYS = {
  MOVIES: 'cinesense_movies',
  USERS: 'cinesense_users',
  REVIEWS: 'cinesense_reviews',
  CURRENT_USER: 'cinesense_current_user'
};

// Initialize Mock Data
const initializeData = () => {
  if (!localStorage.getItem(LS_KEYS.MOVIES)) {
    localStorage.setItem(LS_KEYS.MOVIES, JSON.stringify(MOCK_MOVIES));
  }
  if (!localStorage.getItem(LS_KEYS.USERS)) {
    // Add default admin
    const users = [MOCK_ADMIN];
    localStorage.setItem(LS_KEYS.USERS, JSON.stringify(users));
  }
  if (!localStorage.getItem(LS_KEYS.REVIEWS)) {
    localStorage.setItem(LS_KEYS.REVIEWS, JSON.stringify([]));
  }
};

initializeData();

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// --- API Services ---

export const api = {
  auth: {
    login: async (email: string, password: string): Promise<User> => {
      await delay(800);
      const users: User[] = JSON.parse(localStorage.getItem(LS_KEYS.USERS) || '[]');
      // In a real app, password should be hashed. Here we just check if user exists.
      // For demo: ANY password works if email matches.
      const user = users.find(u => u.email === email);
      if (!user) throw new Error('Invalid credentials');
      return user;
    },
    
    signup: async (name: string, email: string, password: string, genres: string[]): Promise<User> => {
      await delay(800);
      const users: User[] = JSON.parse(localStorage.getItem(LS_KEYS.USERS) || '[]');
      if (users.find(u => u.email === email)) throw new Error('Email already exists');
      
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        role: UserRole.USER,
        preferredGenres: genres,
        avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
        watchlist: [],
        watchedHistory: []
      };
      
      users.push(newUser);
      localStorage.setItem(LS_KEYS.USERS, JSON.stringify(users));
      return newUser;
    },

    updateUser: async (updatedUser: User): Promise<User> => {
       await delay(500);
       const users: User[] = JSON.parse(localStorage.getItem(LS_KEYS.USERS) || '[]');
       const index = users.findIndex(u => u.id === updatedUser.id);
       if(index !== -1) {
         users[index] = updatedUser;
         localStorage.setItem(LS_KEYS.USERS, JSON.stringify(users));
         return updatedUser;
       }
       throw new Error('User not found');
    }
  },

  movies: {
    getAll: async (): Promise<Movie[]> => {
      await delay(500);
      return JSON.parse(localStorage.getItem(LS_KEYS.MOVIES) || '[]');
    },

    getById: async (id: string): Promise<Movie | undefined> => {
      await delay(300);
      const movies: Movie[] = JSON.parse(localStorage.getItem(LS_KEYS.MOVIES) || '[]');
      return movies.find(m => m.id === id);
    },

    add: async (movie: Omit<Movie, 'id' | 'rating' | 'viewCount'>): Promise<Movie> => {
      await delay(600);
      const movies: Movie[] = JSON.parse(localStorage.getItem(LS_KEYS.MOVIES) || '[]');
      const newMovie: Movie = {
        ...movie,
        id: Math.random().toString(36).substr(2, 9),
        rating: 0,
        viewCount: 0
      };
      movies.push(newMovie);
      localStorage.setItem(LS_KEYS.MOVIES, JSON.stringify(movies));
      return newMovie;
    },

    getRecommended: async (userId: string): Promise<Movie[]> => {
      await delay(1000); // Recommendation engine takes time!
      const users: User[] = JSON.parse(localStorage.getItem(LS_KEYS.USERS) || '[]');
      const movies: Movie[] = JSON.parse(localStorage.getItem(LS_KEYS.MOVIES) || '[]');
      const user = users.find(u => u.id === userId);

      if (!user) return movies.slice(0, 5); // Fallback

      // RECOMMENDATION ALGORITHM:
      // 1. Filter out movies already watched (in history - mock implementation assumes watchlist is history for now)
      // 2. Score movies based on Genre match
      // 3. Score based on Rating
      
      const scoredMovies = movies.map(movie => {
        let score = 0;
        
        // Content-Based Filtering: Genre Match
        const genreMatchCount = movie.genres.filter(g => user.preferredGenres.includes(g)).length;
        score += genreMatchCount * 5; // High weight for genre preference

        // Collaborative/Popularity: Rating Weight
        score += movie.rating * 2;

        return { movie, score };
      });

      // Sort by score desc
      scoredMovies.sort((a, b) => b.score - a.score);

      return scoredMovies.map(item => item.movie);
    },

    toggleWatchlist: async (userId: string, movieId: string): Promise<string[]> => {
      await delay(300);
      const users: User[] = JSON.parse(localStorage.getItem(LS_KEYS.USERS) || '[]');
      const userIndex = users.findIndex(u => u.id === userId);
      if (userIndex === -1) throw new Error('User not found');

      const user = users[userIndex];
      const isInList = user.watchlist.includes(movieId);
      
      let newWatchlist;
      if (isInList) {
        newWatchlist = user.watchlist.filter(id => id !== movieId);
      } else {
        newWatchlist = [...user.watchlist, movieId];
      }

      users[userIndex] = { ...user, watchlist: newWatchlist };
      localStorage.setItem(LS_KEYS.USERS, JSON.stringify(users));
      
      // Update current user session if handled there, but we return the list
      return newWatchlist;
    }
  },

  stats: {
    getAdminStats: async () => {
      await delay(600);
      const movies: Movie[] = JSON.parse(localStorage.getItem(LS_KEYS.MOVIES) || '[]');
      const users: User[] = JSON.parse(localStorage.getItem(LS_KEYS.USERS) || '[]');
      const reviews: Review[] = JSON.parse(localStorage.getItem(LS_KEYS.REVIEWS) || '[]');

      return {
        totalMovies: movies.length,
        totalUsers: users.length,
        totalReviews: reviews.length,
        avgRating: movies.reduce((acc, m) => acc + m.rating, 0) / (movies.length || 1)
      };
    }
  }
};